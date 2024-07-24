let selectedCell;
let puzzleArray;
let lowestFill; let indivCells;
let largestField;

function initializePage(){
	console.log("Page initialized!");    

	document.getElementById("solver").onclick = solve;
	document.getElementById("resizer").onclick = createGrid;
	document.getElementById("debug").onclick = debugFilledCells;

	document.getElementById("rowsInput").value = 10;
	document.getElementById("colsInput").value = 10;
	selectedCell = null;
	document.addEventListener("keydown", (event)=>{
		if(!selectedCell){return;}
		if(event.key >= '0' && event.key <= '9'){
			document.getElementById(selectedCell).innerHTML += event.key;
		}
		if(event.key == "Backspace"){
			document.getElementById(selectedCell).innerHTML = "";
		}
	});
	createGrid();
	puzzleArray = [];
	lowestFill = -1;
	indivCells = 0;

	initializeExampleButtons();
}

function createGrid(){
	destroyGrid();
	let rows = document.getElementById("rowsInput").value;
	let cols = document.getElementById("colsInput").value;
	let board = document.getElementById("board");

	for(let i = 0; i < rows; i++){
		console.log("creating row " + i);
		let row = document.createElement("div");
		row.id = "row" + i;
		row.classList.add("gridrow");
		board.appendChild(row);
		for(let j = 0; j < cols; j++){
			console.log("creating cell " + i + ", " + j);
			let cell = document.createElement("div");
			cell.id = i + ", " + j;
			cell.classList.add("cell");
			cell.addEventListener("click", ()=>{
				if(selectedCell){
					document.getElementById(selectedCell).classList.remove("selected");
					selectedCell = null;
				}
				selectedCell = cell.id;
				console.log(selectedCell);
				cell.classList.add("selected");
			});
			row.appendChild(cell);
		}
	}
}

function destroyGrid(){
	let board = document.getElementById("board");
	while(board.firstChild){
		console.log("Destroying child with ID " + board.firstChild.id + "!");
		while(board.firstChild.firstChild){
			console.log("Destroying child with ID " + board.firstChild.firstChild.id + "!");
			board.firstChild.firstChild.remove();
		}
		board.firstChild.remove();
	}
}

function initializeExampleButtons(){
	let examples = document.getElementById("examples");

	examples.childNodes.forEach(child => {
		if(child.nodeName == "BUTTON"){
			child.addEventListener("click", ()=>{
				setExampleBoard(child.id);
			});
		}
	});
}

function setExampleBoard(exampleName){
	console.log(exampleName);
	if(exampleName == "sample1"){
		

		document.getElementById("rowsInput").value = 5;
		document.getElementById("colsInput").value = 5;
		let board = [
						[3, 0, 0, 2, 0],
						[0, 0, 0, 0, 0],
						[0, 1, 0, 1, 0],
						[0, 0, 0, 0, 0],
						[0, 2, 0, 0, 1]
					];
		createPresetBoard(board);
	}
}

function createPresetBoard(board = []){
	createGrid();

	for (let row = 0; row < board.length; row++) {
		for (let col = 0; col < board[row].length; col++) {
			//If the cell is blank, skip.
			if(board[row][col] == 0){
				continue;
			}
			document.getElementById(row+', '+col).innerHTML = board[row][col];
		}
	}
}

function solve(){
	makeArray();
	console.log(puzzleArray);
	//Starting checks (fields which can be deduced from just the initial board state)
	runThroughOnes();
	checkDiagonals();
	checkNearAdjacency();
	
	//Start regular solving loop

	//First phase: Find all ways to fill cells that should be filled
	searchStarvedCells();

	//Second phase: Empty all cells that should be emptied.
	searchForFilled2x2s();

	//Continue with emptied cells
}

function makeArray(){
	let board = document.getElementById("board");
	let rows = board.lastChild.lastChild.id.split(',')[0];
	let cols = board.lastChild.lastChild.id.split(',')[1];

	largestField = 0;

	console.log(rows + " " + cols);
	puzzleArray = [];
	lowestFill = -1;
	indivCells = 0;
	for(let i = 0; i <= rows; i++){
		puzzleArray[i] = [];
		for(let j = 0; j <= cols; j++){
			puzzleArray[i][j] = 0;
			if(document.getElementById(i+', '+j).innerHTML){
				puzzleArray[i][j] = parseInt(document.getElementById(i+', '+j).innerHTML);
				markCellBlank(i, j);
				if(isNaN(puzzleArray[i][j])){
					alert("Invalid input in cell " + (i+1) + ", " + (j+1));
					return;
				}
				if(puzzleArray[i][j] > largestField){  largestField = puzzleArray[i][j];	}
			}
		}
	}
}

function runThroughOnes(){
	for (let row = 0; row < puzzleArray.length; row++) {
		for (let col = 0; col < puzzleArray[row].length; col++) {
			if(puzzleArray[row][col] == 1){
				console.log("Cell at (" + row + ', ' + col + ") contains a 1, therefore it shouldn't have any blank space adjacent to it.");
				markCell(row-1, col);
				markCell(row, col-1);
				markCell(row, col+1);
				markCell(row+1, col);
			}
		}
	}
}

function checkDiagonals(){
	for (let row = 0; row < puzzleArray.length; row++) {
		for (let col = 0; col < puzzleArray[row].length; col++) {
			if(puzzleArray[row][col] > 0){
				if(row > 0 && col > 0 && puzzleArray[row-1][col-1] > 0){ //Top-left
					console.log("Cells ("+ (row-1) + ", " + (col-1) + ") and (" +  row + ", " + col + ") are diagonally adjacent. Therefore the cells between them should be filled");
					markCell(row-1, col);		
					markCell(row, col-1);
				}
				if(row > 0 && col < puzzleArray[row].length-1 && puzzleArray[row-1][col+1] > 0){ //Top-right
					console.log("Cells ("+ (row-1) +", "+ (col+1) + ") and (" +  row + ", " + col + ") are diagonally adjacent. Therefore the cells between them should be filled");
					markCell(row-1, col);
					markCell(row, col+1);
				}
				if(row < puzzleArray.length-1 && col > 0 && puzzleArray[row+1][col-1] > 0){ //Bottom-left
					console.log("Cells ("+ (row+1) + ", " + (col-1) + ") and (" +  row + ", " + col + ") are diagonally adjacent. Therefore the cells between them should be filled");
					markCell(row+1, col);
					markCell(row, col-1);
				}
				if(row < puzzleArray.length-1 && col < puzzleArray[row].length-1 && puzzleArray[row+1][col+1] > 0){ //Bottom-right
					console.log("Cells ("+ (row+1) +", "+ (col+1) + ") and (" +  row + ", " + col + ") are diagonally adjacent. Therefore the cells between them should be filled");
					markCell(row+1, col);
					markCell(row, col+1);
				}
			}
		}
	}
}

function markCell(row, col){
	if(row >= 0 && row < puzzleArray.length){
		if(col >= 0 && col < puzzleArray[row].length){
			lowestFill--; indivCells++;
			puzzleArray[row][col] = lowestFill;
			if(puzzleArray[row][col] < -1){
				//Check cells around the marked one for other marked cells
				if(row > 0 && puzzleArray[row-1][col] < -1){
					if(puzzleArray[row-1][col] > puzzleArray[row][col])
					{
						puzzleArray[row][col] = puzzleArray[row-1][col];	
					}
				}
				if(row+1 < puzzleArray.length && puzzleArray[row+1][col] < -1)
				{
					if(puzzleArray[row+1][col] > puzzleArray[row][col])
					{
						puzzleArray[row][col] = puzzleArray[row+1][col];
					}
				}
				if(col > 0 && puzzleArray[row][col-1] < -1){
					if(puzzleArray[row][col-1] > puzzleArray[row][col])
					{
						puzzleArray[row][col] = puzzleArray[row][col-1];
					}
				}
				if(col+1 < puzzleArray.length && puzzleArray[row][col+1] < -1)
				{
					if(puzzleArray[row][col+1] > puzzleArray[row][col])
					{
						puzzleArray[row][col] = puzzleArray[row][col+1];
					}
				}
				if(puzzleArray[row][col] != lowestFill){
					lowestFill++; indivCells--;
				}
				if(!document.getElementById(row + ', ' + col).classList.contains('filled')){
					document.getElementById(row + ', ' + col).classList.add('filled');
					//console.log("cell " + row + ", " + col + " filled");
				}
				reMark(row, col);
			}
		}
	}
}

//Function to flood lesser cells with updated values
//This is called on a greater flooded cell (cell with a higher fillValue) to recursively flood nearby cells of lower values, if found.
function reMark(row, col){
	//Check cells around the marked one for other marked cells
	console.log("remarking around " +row+", "+col);
	if(row > 0 && puzzleArray[row-1][col] < -1){
		if(puzzleArray[row-1][col] < puzzleArray[row][col])
		{
			puzzleArray[row-1][col] = puzzleArray[row][col];
			reMark(row-1, col);	
		}
	}
	if(row+1 < puzzleArray.length && puzzleArray[row+1][col] < -1)
	{
		if(puzzleArray[row+1][col] < puzzleArray[row][col])
		{
			console.log(puzzleArray[row+1][col] + "<" + puzzleArray[row][col])
			puzzleArray[row+1][col] = puzzleArray[row][col];
			reMark(row+1, col);	
		}
	}
	if(col > 0 && puzzleArray[row][col-1] < -1){
		if(puzzleArray[row][col-1] < puzzleArray[row][col])
		{
			puzzleArray[row][col-1] = puzzleArray[row][col];
			reMark(row, col-1);	
		}
	}
	if(col+1 < puzzleArray.length && puzzleArray[row][col+1] < -1)
	{
		if(puzzleArray[row][col+1] < puzzleArray[row][col])
		{
			puzzleArray[row][col+1] = puzzleArray[row][col];
			reMark(row, col+1);	
		}
	}
	// This is way more hassle than it's worth. All we need to check is that no cell on the board is < -2 once the board is finished
	// if(puzzleArray[row][col] != lowestFill){
	// 	lowestFill++; indivCells--;
	// }
}

function debugFilledCells(){
	let filledCells = document.getElementsByClassName("filled");
	console.log(filledCells);
	for(let i = 0; i < filledCells.length; i++){
		console.log("Getting element of id " + parseInt(filledCells[i].id.split(',')[0]) + ", " + parseInt(filledCells[i].id.split(',')[1]));
		filledCells[i].innerHTML = puzzleArray[parseInt(filledCells[i].id.split(',')[0])][parseInt(filledCells[i].id.split(',')[1])];
	}
	console.log(puzzleArray);
}

function checkNearAdjacency(){
	for (let row = 0; row < puzzleArray.length-2; row++) {
		for (let col = 0; col < puzzleArray[row].length-2; col++) {
			if(puzzleArray[row][col] > 0){
				if(puzzleArray[row][col+2] > 0){ //2 spaces left
					console.log("Cells ("+ row + ", " + col + ") and (" +  row + ", " + (col+2) + ") are separated by a single cell. It should be filled, since neither region can contain it.");
					markCell(row, col+1);		
				}
				if(puzzleArray[row+2][col] > 0){ //2 spaces down
					console.log("Cells ("+ row +", "+ col + ") and (" +  (row+2) + ", " + col + ") are separated by a single cell. It should be filled, since neither region can contain it.");
					markCell(row+1, col);
				}
			}
		}
	}
}

function searchStarvedCells(){
	//Searches for any starved cells (cells which are too far away to belong to a field).
	
	//For each existing blank cell, run through cells within (largest cell - 1) cells of the blank cell
	//If this cell isn't in range of any other numbered cell, it can be automatically marked as filled
	//This check is, of course, limited by filled and empty cells. The easiest way to do it, then, is by cloning the puzzleArray

	for (let row = 0; row < puzzleArray.length; row++) {
		for (let col = 0; col < puzzleArray[row].length; col++) {
			
			//If the cell isn't blank, we don't care about it yet.
			if(puzzleArray[row][col] != 0){
				continue;
			}

			//console.log("cell (" + row + ", " + col + ") is blank.");
			//console.log("cell (" + row + ", " + col + ") " + (checkCellDistance(row, col)? "will" : "will not") + " starve.");

			if(checkCellDistance(row, col)){
				//If there are any starved cells, mark them
				markCell(row, col);
			}
		}
	}
	console.log(largestField);
}

function checkCellDistance(row, col, stepsMade = 0){
	//Check how far any hint-cells are from a selected empty cell. If there are valid candidates it returns true, false otherwise.

	//Order of checking is up, left, right, down.

	//Always checks fields as far away from the tested empty cell as possible (this means all cells largestField cells away).
	//It should respect filled cells as obstacles, of course. 
	//It will check some cells multiple times, but optimization is a topic for another day.

	//This function is recursive for now, but it shouldn't cause any issues for now (Nurikabe hardly has hints of > 100)
	//It also shouldn't be too hard to rewrite into an iterative loop if necessary

	let starves = true;

	if(stepsMade < largestField)
	{

		//Check upwards movement
		if(row > 0 && puzzleArray[row-1][col] > -2) 			
		{

			if(puzzleArray[row-1][col] > stepsMade+1){ 			//Check if the hint at the tested position is within reach of the blank space
				console.log("Hint of value " + puzzleArray[row-1][col] + " is within reach of the tested blank space (" + (stepsMade+1) + " steps away).")
				return false;
			}

			starves = checkCellDistance(row-1, col, stepsMade+1);
			if(!starves){
				return false;
			}
		}

		//Check leftwards movement
		if(col > 0 && puzzleArray[row][col-1] > -2) 			
		{
			
			if(puzzleArray[row][col-1] > stepsMade+1){ 			//Check if the hint at the tested position is within reach of the blank space
				console.log("Hint of value " + puzzleArray[row][col-1] + " is within reach of the tested blank space (" + (stepsMade+1) + " steps away).")
				return false;
			}

			starves = checkCellDistance(row, col-1, stepsMade+1);			
			if(!starves){
				return false;			
			}
		}

		//Check rightwards movement
		if(col < (puzzleArray[row].length-1) && puzzleArray[row][col+1] > -2) 	
		{
			
			if(puzzleArray[row][col+1] > stepsMade+1){ 			//Check if the hint at the tested position is within reach of the blank space
				console.log("Hint of value " + puzzleArray[row][col+1] + " is within reach of the tested blank space (" + (stepsMade+1) + " steps away).")
				return false;
			}

			starves = checkCellDistance(row, col+1, stepsMade+1);
			if(!starves){
				return false;
			}
		}

		//Check downwards movement
		if(row < (puzzleArray.length-1) && puzzleArray[row+1][col] > -2) 		
		{	
			
			if(puzzleArray[row+1][col] > stepsMade+1){ 			//Check if the hint at the tested position is within reach of the blank space
				console.log("Hint of value " + puzzleArray[row+1][col] + " is within reach of the tested blank space (" + (stepsMade+1) + " steps away).")
				return false;
			}

			starves = checkCellDistance(row+1, col, stepsMade+1);
			if(!starves){
				return false;
			}
		}
	}

	return starves;
}

function searchForFilled2x2s(){
	for (let row = 0; row < puzzleArray.length; row++) {
		for (let col = 0; col < puzzleArray[row].length; col++) {
			
			//If the cell isn't blank, we don't care about it yet.
			if(puzzleArray[row][col] >= -1){
				continue;
			}

			//console.log("cell (" + row + ", " + col + ") is blank.");
			//console.log("cell (" + row + ", " + col + ") " + (checkCellDistance(row, col)? "will" : "will not") + " starve.");

			if(row > 0 && puzzleArray[row-1][col] < 0){
				
				if(col > 0 && puzzleArray[row][col-1] < 0){
					if(puzzleArray[row-1][col-1] == 0){
						markCellBlank(row-1, col-1);
					}
				}

				if(col < (puzzleArray[row].length-1) && puzzleArray[row][col+1] < 0){
					if(puzzleArray[row-1][col+1] == 0){
						markCellBlank(row-1, col+1);
					}
				}
					
			}

			if(row < (puzzleArray.length-1) && puzzleArray[row+1][col] < 0){
				
				if(col > 0 && puzzleArray[row][col-1] < 0){
					if(puzzleArray[row+1][col-1] == 0){
						markCellBlank(row+1, col-1);
					}
				}

				if(col < (puzzleArray[row].length-1) && puzzleArray[row][col+1] < 0){
					if(puzzleArray[row+1][col+1] == 0){
						markCellBlank(row+1, col+1);
					}
				}
					
			}


		}
	}
}

function markCellBlank(row, col){
	if(!document.getElementById(row + ', ' + col).classList.contains('emptied')){
		document.getElementById(row + ', ' + col).classList.add('emptied');
	}
	if(puzzleArray[row][col] > 0){
		return;
	}
	puzzleArray[row][col] = -1;
	document.getElementById(row + ', ' + col).innerHTML = '.';
	//Check cells around the marked one for other marked cells
	if(row > 0 && puzzleArray[row-1][col] > 0){
		if(puzzleArray[row-1][col] > puzzleArray[row][col])
		{
			puzzleArray[row][col] = puzzleArray[row-1][col];	
		}
	}
	if(row+1 < puzzleArray.length && puzzleArray[row+1][col] > 0)
	{
		if(puzzleArray[row+1][col] > puzzleArray[row][col])
		{
			puzzleArray[row][col] = puzzleArray[row+1][col];
		}
	}
	if(col > 0 && puzzleArray[row][col-1] > 0){
		if(puzzleArray[row][col-1] > puzzleArray[row][col])
		{
			puzzleArray[row][col] = puzzleArray[row][col-1];
		}
	}
	if(col+1 < puzzleArray.length && puzzleArray[row][col+1] > 0)
	{
		if(puzzleArray[row][col+1] > puzzleArray[row][col])
		{
			puzzleArray[row][col] = puzzleArray[row][col+1];
		}
	}
}


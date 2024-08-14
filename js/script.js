let selectedCell;
let puzzleArray; let testingArray;
let lowestFill; let indivCells;
let largestField;
let changed;

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
	testingArray = [];
	console.log("Testing Array:");
	console.log(testingArray);

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
		// console.log("creating row " + i);
		let row = document.createElement("div");
		row.id = "row" + i;
		row.classList.add("gridrow");
		board.appendChild(row);
		for(let j = 0; j < cols; j++){
			// console.log("creating cell " + i + ", " + j);
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
		// console.log("Destroying child with ID " + board.firstChild.id + "!");
		while(board.firstChild.firstChild){
			// console.log("Destroying child with ID " + board.firstChild.firstChild.id + "!");
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
				console.log(testingArray);

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
	if(exampleName == "samplept5"){
		

		document.getElementById("rowsInput").value = 6;
		document.getElementById("colsInput").value = 6;
		let board = [
						[0, 1, 0, 1, 0, 1],
						[1, 0, 0, 0, 0, 0],
						[0, 0, 0, 0, 0, 0],
						[0, 0, 5, 0, 0, 1],
						[1, 0, 0, 0, 1, 0],
						[0, 1, 0, 1, 0, 0]
					];
		createPresetBoard(board);
	}
	if(exampleName == "sample2"){
		document.getElementById("rowsInput").value = 8;
		document.getElementById("colsInput").value = 8;
		let board = [
						[6, 0, 3, 0, 0, 0, 0, 0],
						[0, 0, 0, 0, 0, 4, 0, 0],
						[0, 0, 0, 0, 2, 0, 0, 0],
						[0, 0, 0, 0, 0, 0, 0, 0],
						[1, 0, 0, 0, 0, 0, 0, 0],
						[0, 2, 0, 2, 0, 1, 0, 0],
						[0, 0, 0, 0, 0, 0, 0, 0],
						[0, 0, 0, 0, 6, 0, 0, 0]
					];
		createPresetBoard(board);
	}
	if(exampleName == "sample3"){
		

		document.getElementById("rowsInput").value = 10;
		document.getElementById("colsInput").value = 10;
		let board = [
						[0, 2, 0, 0, 2, 0, 0, 0, 8, 0],
						[0, 0, 0, 0, 0, 1, 0, 7, 0, 0],
						[2, 0, 0, 0, 0, 0, 0, 0, 0, 0],
						[0, 0, 0, 0, 3, 0, 0, 0, 0, 0],
						[0, 0, 0, 0, 0, 5, 0, 0, 0, 0],
						[0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
						[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
						[0, 0, 0, 8, 0, 0, 0, 0, 0, 0],
						[0, 0, 0, 0, 0, 0, 0, 2, 0, 0],
						[0, 0, 0, 0, 0, 7, 0, 0, 0, 0]
					];
		createPresetBoard(board);
	}
	if(exampleName == "sample4"){
		

		document.getElementById("rowsInput").value = 10;
		document.getElementById("colsInput").value = 10;
		let board = [
						[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
						[5, 0, 0, 0, 5, 0, 0, 0, 0, 2],
						[0, 3, 0, 4, 0, 0, 0, 0, 0, 0],
						[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
						[0, 0, 0, 0, 0, 0, 1, 0, 1, 0],
						[0, 0, 0, 2, 0, 0, 0, 0, 0, 3],
						[3, 0, 1, 0, 0, 0, 0, 0, 0, 0],
						[0, 0, 0, 0, 0, 3, 0, 3, 0, 0],
						[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
						[4, 0, 0, 0, 0, 0, 0, 0, 0, 5],
					];
		createPresetBoard(board);
	}
	if(exampleName == "sample5"){
		//TBD: board difficulty between sample4 and sample6

		document.getElementById("rowsInput").value = 12;
		document.getElementById("colsInput").value = 12;
		let board = [
						[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
						[0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0],
						[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 0],
						[0, 0, 0, 0, 0, 0, 5, 0, 0, 1, 0, 1],
						[0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
						[0, 0, 0, 0, 0, 0, 0, 6, 0, 0, 0, 2],
						[7, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0],
						[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
						[1, 0, 2, 0, 0, 8, 0, 0, 0, 0, 0, 0],
						[0, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
						[0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
						[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
					];
		createPresetBoard(board);
	}
	if(exampleName == "sample6"){
		document.getElementById("rowsInput").value = 15;
		document.getElementById("colsInput").value = 15;
		let board = [
						[0, 0, 0, 2, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0],
						[0, 0, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
						[0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 3, 0, 0, 6, 0],
						[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
						[0, 0, 3, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
						[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0],
						[0, 0, 0, 0, 2, 0, 7, 0, 2, 0, 0, 0, 0, 0, 2],
						[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
						[5, 0, 0, 0, 0, 0, 2, 0, 2, 0, 2, 0, 0, 0, 0],
						[0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3],
						[0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 5, 0, 0],
						[3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
						[0, 4, 0, 0, 3, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0],
						[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0],
						[0, 0, 0, 0, 0, 3, 0, 0, 1, 0, 0, 3, 0, 0, 0]
					];
		createPresetBoard(board);
	}


	//Final boss of board examples
	if(exampleName == "samplefinal"){
		document.getElementById("rowsInput").value = 14;
		document.getElementById("colsInput").value = 24;
		let board = [
						[2, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0],
						[0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 3, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
						[0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 3, 0, 0, 0, 0, 0, 0, 6],
						[0, 1, 0, 0, 0, 0, 0, 0, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
						[0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0],
						[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 0, 7, 0, 3, 0, 0, 0, 0],
						[0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
						[0, 0, 9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
						[0, 7, 0, 1, 0, 0, 0, 4, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
						[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
						[0, 0, 0, 4, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0],
						[0, 0, 0, 0, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 0],
						[0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 5, 0, 0, 0, 0,11, 0, 0, 0, 0, 5],
						[0, 0, 0, 0, 0, 0, 0, 0, 6, 0, 2, 0, 0, 0, 0, 0, 5, 0, 0, 0, 0, 0, 0, 0],
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
	console.log("Solving started.");
	console.log(testingArray);

	makeArray();
	console.log(testingArray);

	console.log(puzzleArray);
	//Starting checks (fields which can be deduced from just the initial board state)
	runThroughOnes();
	checkDiagonals();
	checkNearAdjacency();
	console.log(testingArray);
	
	//Start regular solving loop

	changed = true;
	while(changed){
		changed = false;

		//Make sure we aren't creating any 2x2 filled spaces (simple check so it's good to run first and often)
		searchForFilled2x2s();
		
		if(!changed){
			//Find cells that cannot be marked blank, mark them as filled instead
			searchStarvedCells();
		}

		//For all hints, check if the hint can fill its own space
		if(!changed){
			expandHintAreas();	
		}
		
		//Make sure all filled areas can escape enclosed spaces
		if(!changed){
			checkAllFilledAreaEscapes();
		}

		//Make sure no blank (but claimable) cells can be trapped within filled cells
		if(!changed){
			checkTrappedClaimableCells();
		}
		
		//Check if any unassigned fields need to be connected to a field with value
		if(!changed){
			connectUnassignedFields();
		}
		
		//Check corners. This is just for the sake of completeness
		if(!changed){
			checkCorners();
		}
	}
	console.log(puzzleArray);
	

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
			if(puzzleArray[row][col] <= -2){return;}
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
	//Signal the program that something has changed.
	changed = true;
}

//Function to flood lesser cells with updated values
//This is called on a greater flooded cell (cell with a higher fillValue) to recursively flood nearby cells of lower values, if found.
function reMark(row, col){
	//Check cells around the marked one for other marked cells
	if(row > 0 && puzzleArray[row-1][col] < -1){
		if(puzzleArray[row-1][col] > puzzleArray[row][col])
		{
			reMark(row-1, col);	
			return;
		}
		if(puzzleArray[row-1][col] < puzzleArray[row][col])
		{
			puzzleArray[row-1][col] = puzzleArray[row][col];
			reMark(row-1, col);	
		}
	}
	if(row+1 < puzzleArray.length && puzzleArray[row+1][col] < -1)
	{
		if(puzzleArray[row+1][col] > puzzleArray[row][col])
		{
			reMark(row+1, col);	
			return;
		}
		if(puzzleArray[row+1][col] < puzzleArray[row][col])
		{
			puzzleArray[row+1][col] = puzzleArray[row][col];
			reMark(row+1, col);	
		}
	}
	if(col > 0 && puzzleArray[row][col-1] < -1){
		if(puzzleArray[row][col-1] > puzzleArray[row][col])
		{
			reMark(row, col-1);	
			return;
		}
		if(puzzleArray[row][col-1] < puzzleArray[row][col])
		{
			puzzleArray[row][col-1] = puzzleArray[row][col];
			reMark(row, col-1);	
		}
	}
	if(col+1 < puzzleArray.length && puzzleArray[row][col+1] < -1){		
		if(puzzleArray[row][col+1] > puzzleArray[row][col])
		{
			reMark(row, col+1);	
			return;
		}
		if(puzzleArray[row][col+1] < puzzleArray[row][col])
		{
			puzzleArray[row][col+1] = puzzleArray[row][col];
			reMark(row, col+1);	
		}
	}
	//...Might want to re-write it so that it doesn't use recursion to check cells...

	// This is way more hassle than it's worth. All we need to check is that no cell on the board is < -2 once the board is finished
	// if(puzzleArray[row][col] != lowestFill){
	// 	lowestFill++; indivCells--;
	// }
}

function debugFilledCells(){
	let filledCells = document.getElementsByClassName("filled");
	//console.log(filledCells);
	if(filledCells[0].innerHTML == ""){
		for(let i = 0; i < filledCells.length; i++){
			// console.log("Getting element of id " + parseInt(filledCells[i].id.split(',')[0]) + ", " + parseInt(filledCells[i].id.split(',')[1]));
			filledCells[i].innerHTML = puzzleArray[parseInt(filledCells[i].id.split(',')[0])][parseInt(filledCells[i].id.split(',')[1])];
		}
		console.log(puzzleArray);
		return;
	}
	else{
		for(let i = 0; i < filledCells.length; i++){
			// console.log("Getting element of id " + parseInt(filledCells[i].id.split(',')[0]) + ", " + parseInt(filledCells[i].id.split(',')[1]));
			filledCells[i].innerHTML = "";
		}
		console.log(puzzleArray);
		return;
	}
}

function checkNearAdjacency(){
	for (let row = 0; row < puzzleArray.length; row++) {
		for (let col = 0; col < puzzleArray[row].length; col++) {
			if(puzzleArray[row][col] > 0){
				if(col < puzzleArray[row].length && puzzleArray[row][col+2] > 0){ //2 spaces left
					console.log("Cells ("+ row + ", " + col + ") and (" +  row + ", " + (col+2) + ") are separated by a single cell. It should be filled, since neither region can contain it.");
					markCell(row, col+1);		
				}
				if(row < puzzleArray.length && puzzleArray[row+2][col] > 0){ //2 spaces down
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

			if(checkCellDistance(row, col)){
				//If there are any starved cells, mark them
				markCell(row, col);
				console.log("Cell at (" + row + ", " + col + ") is starved.");
			}
		}
	}
	// console.log(largestField);
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

	//Make an initial check whether the path would be adjacent to some cell which would block a path to a large enough field
	//Due to the field-adjacency rule
	if(	(row > 0 && puzzleArray[row-1][col] > 1 && puzzleArray[row-1][col] < stepsMade) || 
		(col > 0 && puzzleArray[row][col-1] > 1 && puzzleArray[row][col-1] < stepsMade) || 
		(col < (puzzleArray[row].length-1) && puzzleArray[row][col+1] > 1 && puzzleArray[row][col+1] < stepsMade) || 
		(row < (puzzleArray.length-1) && puzzleArray[row+1][col] > 1 && puzzleArray[row+1][col] < stepsMade)) 		
		{	
			return true;
		}

	if(stepsMade < largestField)
	{

		//Check upwards movement
		if(row > 0 && puzzleArray[row-1][col] > -2) 			
		{

			if((puzzleArray[row-1][col] - fieldSize(row-1, col)) > stepsMade){ 			//Check if the hint at the tested position is within reach of the blank space
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
			
			if((puzzleArray[row][col-1] - fieldSize(row, col-1)) > stepsMade){ 			//Check if the hint at the tested position is within reach of the blank space
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
			
			if((puzzleArray[row][col+1] - fieldSize(row, col+1)) > stepsMade){ 			//Check if the hint at the tested position is within reach of the blank space
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
			
			if((puzzleArray[row+1][col] - fieldSize(row+1, col)) > stepsMade){ 			//Check if the hint at the tested position is within reach of the blank space
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

			if(row > 0 && puzzleArray[row-1][col] < -1){
				
				if(col > 0 && puzzleArray[row][col-1] < -1){
					if(puzzleArray[row-1][col-1] == 0){
						markCellBlank(row-1, col-1);
						console.log("Cell at (" + (row-1) + ", " + (col-1) + ") is blank, else this area is a 2x2 of filled cells.");
						return;
					}
				}

				if(col < (puzzleArray[row].length-1) && puzzleArray[row][col+1] < -1){
					if(puzzleArray[row-1][col+1] == 0){
						markCellBlank(row-1, col+1);
						console.log("Cell at (" + (row-1) + ", " + (col+1) + ") is blank, else this area is a 2x2 of filled cells.");
						return;
					}
				}
					
			}

			if(row < (puzzleArray.length-1) && puzzleArray[row+1][col] < -1){
				
				if(col > 0 && puzzleArray[row][col-1] < -1){
					if(puzzleArray[row+1][col-1] == 0){						
						markCellBlank(row+1, col-1);
						console.log("Cell at (" + (row+1) + ", " + (col-1) + ") is blank, else this area is a 2x2 of filled cells.");
						return;
					}
				}

				if(col < (puzzleArray[row].length-1) && puzzleArray[row][col+1] < -1){
					if(puzzleArray[row+1][col+1] == 0){
						markCellBlank(row+1, col+1);
						console.log("Cell at (" + (row+1) + ", " + (col+1) + ") is blank, else this area is a 2x2 of filled cells.");
						return;
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
	if(row+1 < puzzleArray.length && puzzleArray[row+1][col] > 0){
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
	if(col+1 < puzzleArray.length && puzzleArray[row][col+1] > 0){
		if(puzzleArray[row][col+1] > puzzleArray[row][col])
		{
			puzzleArray[row][col] = puzzleArray[row][col+1];
		}
	}

	//Once this is done, make sure we connect up empty but unmarked cells
	if(puzzleArray[row][col] > 0){ 
		if(row > 0 && puzzleArray[row-1][col] == -1){
			markCellBlank(row-1, col);
		}
		if(row+1 < puzzleArray.length && puzzleArray[row+1][col] == -1){
			markCellBlank(row+1, col);
		}
		if(col > 0 && puzzleArray[row][col-1] == -1){
			markCellBlank(row, col-1);
		}
		if(col+1 < puzzleArray.length && puzzleArray[row][col+1] == -1){
			markCellBlank(row, col+1);
		}
	}
	//Signal the program that something has changed.
	changed = true;
}

function expandHintArea(dRow, dCol){

	testingArray = [];
	let protectedCells = [];
	let claimableCells = [];
	let claimableCellClusters = [];

	//Doing this with parse/stringify is all well and good, however copying the array this way allows for easier altering of the map 
	//This is mostly done to prevent collisions with other fields.
	for (let row = 0; row < puzzleArray.length; row++) {
		testingArray[row] = [];
		for (let col = 0; col < puzzleArray[row].length; col++) {
			testingArray[row][col] = puzzleArray[row][col];
			
			if(testingArray[row][col] < -1){
			
				testingArray[row][col] = 'X';
			}

			if(testingArray[row][col] == -1){
			
				testingArray[row][col] = 0;
				claimableCells.push([row, col]);
			}
			
			//If stumbling on a hint (or field) we want to interrogate, it will be listed here.
			if(row == dRow && col == dCol){
				// console.log("(" + dRow + ", " + dCol + ") = " + puzzleArray[dRow][dCol]);
				protectedCells.push([row, col]);
				//If the field is larger than one cell, get all of the connected cells contained within
				for(let i = 0; i < protectedCells.length && i < largestField; i++){
					if(	protectedCells[i][0] > 0 && 
						puzzleArray[protectedCells[i][0]-1][protectedCells[i][1]] == puzzleArray[protectedCells[i][0]][protectedCells[i][1]] && 
						JSON.stringify(protectedCells).indexOf(JSON.stringify([protectedCells[i][0]-1, protectedCells[i][1]])) == -1)
					{
						protectedCells.push([protectedCells[i][0]-1, protectedCells[i][1]]);
					}
					if(	protectedCells[i][0]+1 < puzzleArray.length && 
						puzzleArray[protectedCells[i][0]+1][protectedCells[i][1]] == puzzleArray[protectedCells[i][0]][protectedCells[i][1]] && 
						JSON.stringify(protectedCells).indexOf(JSON.stringify([protectedCells[i][0]+1, protectedCells[i][1]])) == -1)
					{
						protectedCells.push([protectedCells[i][0]+1, protectedCells[i][1]]);
					}
					if(	protectedCells[i][1] > 0 && 
						puzzleArray[protectedCells[i][0]][protectedCells[i][1]-1] == puzzleArray[protectedCells[i][0]][protectedCells[i][1]] && 
						JSON.stringify(protectedCells).indexOf(JSON.stringify([protectedCells[i][0], protectedCells[i][1]-1])) == -1)
					{
						protectedCells.push([protectedCells[i][0], protectedCells[i][1]-1]);
					}
					if(	protectedCells[i][1]+1 < puzzleArray.length && 
						puzzleArray[protectedCells[i][0]][protectedCells[i][1]+1] == puzzleArray[protectedCells[i][0]][protectedCells[i][1]] && 
						JSON.stringify(protectedCells).indexOf(JSON.stringify([protectedCells[i][0], protectedCells[i][1]+1])) == -1)
					{
						protectedCells.push([protectedCells[i][0], protectedCells[i][1]+1]);
					}
				}
			}
		}
	}

	//Group all joined cells together before moving on
	for(let i = 0; i < claimableCells.length; i++){
		claimableCellClusters.push([claimableCells[i]]);
		for(let j = 0; j < claimableCellClusters[claimableCellClusters.length-1].length; j++){
			//For every cell, check if the surrounding cells are also claimable. If so, list the entire bunch as one cluster.
			//No need for out of bounds checks, as it's performed before these are added to the list
			let indexUp = claimableCells.findIndex(	function(element) { //Up				
					return JSON.stringify(element) == JSON.stringify([claimableCellClusters[claimableCellClusters.length-1][j][0]-1, claimableCellClusters[claimableCellClusters.length-1][j][1]]);
				});
			if(indexUp > i){
					claimableCellClusters[claimableCellClusters.length-1].push(JSON.parse(JSON.stringify(claimableCells[indexUp])));
					claimableCells.splice(indexUp, 1);
			}
			let indexDown = claimableCells.findIndex(function(element) { //Down				
				return JSON.stringify(element) == JSON.stringify([claimableCellClusters[claimableCellClusters.length-1][j][0]+1, claimableCellClusters[claimableCellClusters.length-1][j][1]])
			});
			if(indexDown > i){
					claimableCellClusters[claimableCellClusters.length-1].push(JSON.parse(JSON.stringify(claimableCells[indexDown])));
					claimableCells.splice(indexDown, 1);
			}
			let indexLeft = claimableCells.findIndex(	function(element) { //Up				
				return JSON.stringify(element) == JSON.stringify([claimableCellClusters[claimableCellClusters.length-1][j][0], claimableCellClusters[claimableCellClusters.length-1][j][1]-1])
			});
			if(indexLeft > i){
					claimableCellClusters[claimableCellClusters.length-1].push(JSON.parse(JSON.stringify(claimableCells[indexLeft])));
					claimableCells.splice(indexLeft, 1);
			}
			let indexRight = claimableCells.findIndex(	function(element) { //Up				
				return JSON.stringify(element) == JSON.stringify([claimableCellClusters[claimableCellClusters.length-1][j][0], claimableCellClusters[claimableCellClusters.length-1][j][1]+1])
			});
			if(indexRight > i){
					claimableCellClusters[claimableCellClusters.length-1].push(JSON.parse(JSON.stringify(claimableCells[indexRight])));
					claimableCells.splice(indexRight, 1);
			}
		}
	}

	//Second pass to catch and isolate all of the hints
	for (let row = 0; row < puzzleArray.length; row++) {
		for (let col = 0; col < puzzleArray[row].length; col++) {
			if(JSON.stringify(protectedCells).indexOf(JSON.stringify([row, col])) != -1){
				continue;
			}

			//We already assume that adjacent cells of the field are not other hints
			if(testingArray[row][col] > 0){
				if(row > 0 && puzzleArray[row-1][col] != testingArray[row][col])
				{
					testingArray[row-1][col] = 'X';
				}
				if(row+1 < puzzleArray.length && puzzleArray[row+1][col] != testingArray[row][col])
				{
					testingArray[row+1][col] = 'X';
				}
				if(col > 0 && puzzleArray[row][col-1] != testingArray[row][col])
				{
					testingArray[row][col-1] = 'X';
				}
				if(col+1 < puzzleArray.length && puzzleArray[row][col+1] != testingArray[row][col])
				{
					testingArray[row][col+1] = 'X';
				}
			}
		}
	}

	//Setup done!
	// console.log(testingArray);
	// console.log("protected cells");
	// console.log(protectedCells);
	//
	let expansion = JSON.parse(JSON.stringify(protectedCells));
	// console.log("expansion from (" + expansion[0][0] + ", " + expansion[0][1] + ")");
	// console.log(expansion);
	let possibleStates = [];
	expand(expansion, possibleStates, claimableCellClusters);

	// console.log(possibleStates[0]);
	let commonFields = JSON.parse(JSON.stringify(possibleStates[0]));
	for(let i = 0; i < possibleStates.length; i++) {
		for(let j = 0; j < commonFields.length; j++) {
			if(JSON.stringify(possibleStates[i]).indexOf(JSON.stringify(commonFields[j])) == -1) {
				commonFields.splice(j, 1);
			}
		}
	}

	// console.log("Fields left");
	// console.log(commonFields);
	for(let i = 0; i < commonFields.length; i++){
		//Whatever fields are left, we mark them as empty. If they touch the original field, mark it as a part
		if(puzzleArray[commonFields[i][0]][commonFields[i][1]] == 0){
			puzzleArray[commonFields[i][0]][commonFields[i][1]] = -1;
			markCellBlank(commonFields[i][0], commonFields[i][1]);		
		}
		//This may require an external relation for tougher boards?
	}

	//If a field has been expanded completely, fill the empty cells around it
	if(commonFields.length == puzzleArray[commonFields[0][0]][commonFields[0][1]]){
		for(let i = 0; i < commonFields.length; i++){
			if(commonFields[i][0] > 0 && puzzleArray[commonFields[i][0]-1][commonFields[i][1]] == 0){
				markCell(commonFields[i][0]-1,[commonFields[i][1]]);
			}
			if(commonFields[i][0] < puzzleArray.length-1 && puzzleArray[commonFields[i][0]+1][commonFields[i][1]] == 0){
				markCell(commonFields[i][0]+1,[commonFields[i][1]]);
			}
			if(commonFields[i][1] > 0 && puzzleArray[commonFields[i][0]][commonFields[i][1]-1] == 0){
				markCell(commonFields[i][0],[commonFields[i][1]-1]);
			}
			if(commonFields[i][1] < puzzleArray[0].length-1 && puzzleArray[commonFields[i][0]][commonFields[i][1]+1] == 0){
				markCell(commonFields[i][0],[commonFields[i][1]+1]);
			}
		}
	}
}

function expandHintAreas(){
	for (let row = 0; row < puzzleArray.length; row++) {
		for (let col = 0; col < puzzleArray[row].length; col++) {
			if(puzzleArray[row][col] > 1){
				expandHintArea(row, col);
			}
		}
	}
}

function expand(expansion, possibleStates, claimableCellClusters){

	/*
	 * Overall process:
	 * Consider the source cell being a field
	 * Try to expand to the furthest point up, then left available for that field.
	 * Once the field is as large as it can be, note down the configuration
	 * Then, try to move the newest cell to the next highest, then leftmost field not interrogated.
	 * 
	 *  
	 */

	let finished = false;
	let test_cell = 0;
	//The first cell in the expansion array is always the source hint
	limitedFlood: while(!finished){
		finished = true;
		/*
		 * 0 = up 
		 * 1 = left
		 * 2 = right
		 * 3 = down
		 */
		if(expansion.length >= testingArray[expansion[0][0]][expansion[0][1]]){
			//printPermutation(testingArray);
			console.log(possibleStates);
			//if(possibleStates.length > 500){console.log("500");	}
			//if(possibleStates.length > 1000){possibleStates = []; return;}
			possibleStates.push(JSON.parse(JSON.stringify(expansion)));
			if(testingArray[expansion[expansion.length-1][0]][expansion[expansion.length-1][1]] == 1){
				testingArray[expansion[expansion.length-1][0]][expansion[expansion.length-1][1]] = -1;
				expansion.pop();
			}
		}

		for(let direction = 0; direction <= 3; direction++)
		{
			for (let cell = expansion.length-1; cell >= 0; cell--) 
			{
				switch(direction)
				{
					case 0:	//up
						//Check: within bounds?	
						if(expansion[cell][0] > 0){
							test_cell = testingArray[expansion[cell][0] - 1][expansion[cell][1]];
							// console.log("Test cell: " + test_cell);
							if( test_cell <= 0 && 																	//Is the cell empty?
								test_cell > (expansion.length - testingArray[expansion[0][0]][expansion[0][1]]))	//OR has the cell only been occupied by 
																													//a lower rank cell? (one further away from the source)
							{	
								testingArray[expansion[cell][0] - 1][expansion[cell][1]] = testingArray[expansion[0][0]][expansion[0][1]] - expansion.length;
								expansion.push([expansion[cell][0] - 1, expansion[cell][1]]);
								//console.log(expansion);
								finished = false;
								continue limitedFlood;
							} else {
								// console.log("Up unavailable! Occupied by " + testingArray[expansion[cell][0] - 1][expansion[cell][1]] + 
								// 									" at (" + (expansion[cell][0] - 1) + ", " + expansion[cell][1] + ").");
							}
						} else {
							// console.log("Up out of bounds! Row: " + expansion[cell][0]);
						}
						break;
					case 1:
						//Check: within bounds?	
						if(expansion[cell][1] > 0){
							test_cell = testingArray[expansion[cell][0]][expansion[cell][1] - 1];
							// console.log("Test cell: " + test_cell);
							if( test_cell <= 0 && 																	//Is the cell empty?
								test_cell > (expansion.length - testingArray[expansion[0][0]][expansion[0][1]]))	//OR has the cell only been occupied by 
																													//a lower rank cell? (one further away from the source)
							{	
								testingArray[expansion[cell][0]][expansion[cell][1] - 1] = testingArray[expansion[0][0]][expansion[0][1]] - expansion.length;
								expansion.push([expansion[cell][0], expansion[cell][1] - 1]);
								//console.log(expansion);
								finished = false;
								continue limitedFlood;
							} else {
								// console.log("Left unavailable! Occupied by " + testingArray[expansion[cell][0]][expansion[cell][1] - 1] + 
								// 									" at (" + expansion[cell][0] + ", " + (expansion[cell][1] - 1) + ").");
							}
						} else {
							// console.log("Left out of bounds! Column: " + expansion[cell][1]);
						}
						break;
					case 2:
						//Check: within bounds?	
						if(expansion[cell][1] < testingArray[expansion[cell][0]].length-1){
							test_cell = testingArray[expansion[cell][0]][expansion[cell][1] + 1];
							// console.log("Test cell: " + test_cell);
							if( test_cell <= 0 && 																	//Is the cell empty?
								test_cell > (expansion.length - testingArray[expansion[0][0]][expansion[0][1]]))	//OR has the cell only been occupied by 
																													//a lower rank cell? (one further away from the source)
							{	
								testingArray[expansion[cell][0]][expansion[cell][1] + 1] = testingArray[expansion[0][0]][expansion[0][1]] - expansion.length;
								expansion.push([expansion[cell][0], expansion[cell][1] + 1]);
								//console.log(expansion);
								finished = false;
								continue limitedFlood;
							} else {
								// console.log("Right unavailable! Occupied by " + testingArray[expansion[cell][0]][expansion[cell][1] + 1] + 
								// 									" at (" + expansion[cell][0] + ", " + (expansion[cell][1] + 1) + ").");
							}
						} else {
							// console.log("Right out of bounds! Column: " + expansion[cell][1]);
						}
						break;
					case 3:
						//Check: within bounds?	
						if(expansion[cell][0] < testingArray.length - 1){
							test_cell = testingArray[expansion[cell][0] + 1][expansion[cell][1]];
							// console.log("Test cell: " + test_cell);
							if( test_cell <= 0 && 																	//Is the cell empty?
								test_cell > (expansion.length - testingArray[expansion[0][0]][expansion[0][1]]))	//OR has the cell only been occupied by 
																													//a lower rank cell? (one further away from the source)
							{	
								testingArray[expansion[cell][0] + 1][expansion[cell][1]] = testingArray[expansion[0][0]][expansion[0][1]] - expansion.length;
								expansion.push([expansion[cell][0] + 1, expansion[cell][1]]);
								//console.log(expansion);
								finished = false;
								continue limitedFlood;
							} else {
								// console.log("Down unavailable! Occupied by " + testingArray[expansion[cell][0] + 1][expansion[cell][1]] + 
								// 									" at (" + (expansion[cell][0] + 1) + ", " + expansion[cell][1] + ").");
							}
						} else {
							// console.log("Down out of bounds! Row: " + expansion[cell][0]);
						}
						break;
					default:
						alert("Invalid direction.");
						break;
					
				}
			}
		}
		//If the last cell added was within a cluster of free cells, add them all to the expansion
		for(let i = 0; i < claimableCellClusters.length; i++){
			if(JSON.stringify(claimableCellClusters[i]).indexOf(JSON.stringify(expansion[expansion.length-1])) != -1){
				let clusterVal = testingArray[expansion[expansion.length-1][0]][expansion[expansion.length-1][1]]; 	
				for(let j = 0; j < claimableCellClusters[i].length; j++){
					if(JSON.stringify(expansion).indexOf(JSON.stringify(claimableCellClusters[i][j])) == -1){
						expansion.push(claimableCellClusters[i][j]);
						testingArray[claimableCellClusters[i][j][0]][claimableCellClusters[i][j][1]] = clusterVal;
					}
				}
				//If this expansion exceeds the total area a field can take up, we remove all of these values and don't count the expansion attempt, 
				//marking the cells accordingly.
				if(expansion.length > testingArray[expansion[0][0]][expansion[0][1]]){
					while(JSON.stringify(claimableCellClusters[i]).indexOf(JSON.stringify(expansion[expansion.length-1]))){
						testingArray[expansion[expansion.length-1][0]][expansion[expansion.length-1][1]] *= -1;
						expansion.pop();
					}
				}
			}
		}
		

		//If the direction check fails, disable the last cell in the expansion (unless that cell is contained within the original field).
		if(testingArray[expansion[expansion.length-1][0]][expansion[expansion.length-1][1]] != testingArray[expansion[0][0]][expansion[0][1]]){	
			let deletedCell = testingArray[expansion[expansion.length-1][0]][expansion[expansion.length-1][1]];
			while(testingArray[expansion[expansion.length-1][0]][expansion[expansion.length-1][1]] == deletedCell){
				testingArray[expansion[expansion.length-1][0]][expansion[expansion.length-1][1]] = -deletedCell;
				expansion.pop();
			}
			// console.log("Resetting cell of rank " + deletedCell);
			for(let i = 0; i < testingArray.length; i++){
				for(let j = 0; j < testingArray.length; j++){
					if(testingArray[i][j] < 0 && testingArray[i][j] > -deletedCell){
						testingArray[i][j] = 0;
					}
				}	
			}
			finished = false;
		}
	}
	// console.log("possibleStates");
	// console.log(possibleStates);
}

function printPermutation(array){
	let output = "";
	for(let i = 0; i < array.length; i++){
		for(let j = 0; j < array[i].length; j++){
			if(array[i][j] == 'X'){
				output += "██";
			}
			if(array[i][j] <= 0){
				output += "  ";
			}
			if(array[i][j] > 0){
				output += "░░";
			}
		}	
		output += '\n';
	}
	console.log(output);
}

function checkAllFilledAreaEscapes(){
	if(!puzzleArray.some((row) => row.some((cell) => cell < -2))){
		console.log("No filled cells are separate from the main area");
		return;
	}

	let testedAreas = [];

	for (let row = 0; row < puzzleArray.length; row++) {
		for (let col = 0; col < puzzleArray[row].length; col++) {
			if(puzzleArray[row][col] < -1 && testedAreas.indexOf(puzzleArray[row][col]) == -1){
				testedAreas.push(puzzleArray[row][col]);
				checkFilledAreaEscape(row, col);
			}
		}
	}
	console.log((changed ? "Something's " : "Nothing's ") + "changed!");
}


function checkFilledAreaEscape(row, col){
	let filledArea = [[row, col]];
	let escapes = [];

	for(let i = 0; i < filledArea.length; i++){
		//This check is fairly cheap when called on a cell not adjacent to one of unequal value, so it's fine to check this for every surrounding cell.
		reMark(filledArea[i][0], filledArea[i][1]);
		if(	filledArea[i][0] > 0){
			if(	puzzleArray[filledArea[i][0]-1][filledArea[i][1]] == puzzleArray[filledArea[i][0]][filledArea[i][1]] && 
				JSON.stringify(filledArea).indexOf(JSON.stringify([filledArea[i][0]-1, filledArea[i][1]])) == -1)
			{
				filledArea.push([filledArea[i][0]-1, filledArea[i][1]]);
			}
			if(	puzzleArray[filledArea[i][0]-1][filledArea[i][1]] == 0 && 
				JSON.stringify(escapes).indexOf(JSON.stringify([filledArea[i][0]-1, filledArea[i][1]])) == -1)
			{
				escapes.push([filledArea[i][0]-1, filledArea[i][1]]);
			}
		}
		if(	filledArea[i][0]+1 < puzzleArray.length){
			if(	puzzleArray[filledArea[i][0]+1][filledArea[i][1]] == puzzleArray[filledArea[i][0]][filledArea[i][1]] && 
				JSON.stringify(filledArea).indexOf(JSON.stringify([filledArea[i][0]+1, filledArea[i][1]])) == -1)
			{
				filledArea.push([filledArea[i][0]+1, filledArea[i][1]]);
			}
			if(	puzzleArray[filledArea[i][0]+1][filledArea[i][1]] == 0 && 
				JSON.stringify(escapes).indexOf(JSON.stringify([filledArea[i][0]+1, filledArea[i][1]])) == -1)
			{
				escapes.push([filledArea[i][0]+1, filledArea[i][1]]);
			}
		}
		if(	filledArea[i][1] > 0 ){
			if( puzzleArray[filledArea[i][0]][filledArea[i][1]-1] == puzzleArray[filledArea[i][0]][filledArea[i][1]] && 
				JSON.stringify(filledArea).indexOf(JSON.stringify([filledArea[i][0], filledArea[i][1]-1])) == -1)
			{
				filledArea.push([filledArea[i][0], filledArea[i][1]-1]);
			}
			if( puzzleArray[filledArea[i][0]][filledArea[i][1]-1] == 0 && 
				JSON.stringify(escapes).indexOf(JSON.stringify([filledArea[i][0], filledArea[i][1]-1])) == -1)
			{
				escapes.push([filledArea[i][0], filledArea[i][1]-1]);
			}
		}
		if(	filledArea[i][1]+1 < puzzleArray.length){
			if(	puzzleArray[filledArea[i][0]][filledArea[i][1]+1] == puzzleArray[filledArea[i][0]][filledArea[i][1]] && 
				JSON.stringify(filledArea).indexOf(JSON.stringify([filledArea[i][0], filledArea[i][1]+1])) == -1)
			{
				filledArea.push([filledArea[i][0], filledArea[i][1]+1]);
			}
			if(	puzzleArray[filledArea[i][0]][filledArea[i][1]+1] == 0 && 
				JSON.stringify(escapes).indexOf(JSON.stringify([filledArea[i][0], filledArea[i][1]+1])) == -1)
			{
				escapes.push([filledArea[i][0], filledArea[i][1]+1]);
			}
		}
	}
	console.log("filledArea");
	console.log(filledArea);
	console.log("escapes");
	console.log(escapes);
	if(escapes.length == 1){
		markCell(escapes[0][0], escapes[0][1]);
		//If marking the cell combined it with another cell, we can stop investigating.
		if(puzzleArray[escapes[0][0]][escapes[0][1]] != puzzleArray[filledArea[0][0]][filledArea[0][1]])
		{
			return;
		}
		for(let i = 0; i < escapes.length; i++){
			if(	escapes[i][0] > 0 && puzzleArray[escapes[i][0]-1][escapes[i][1]] == 0){
				escapes.push([escapes[i][0]-1, escapes[i][1]]);
			}
			if(	escapes[i][0]+1 < puzzleArray.length && puzzleArray[escapes[i][0]+1][escapes[i][1]] == 0){
				escapes.push([escapes[i][0]+1, escapes[i][1]]);
			}
			if(	escapes[i][1] > 0 && puzzleArray[escapes[i][0]][escapes[i][1]-1] == 0){
				escapes.push([escapes[i][0], escapes[i][1]-1]);
			}
			if(	escapes[i][1] > puzzleArray[0].length  && puzzleArray[escapes[i][0]][escapes[i][1]+1] == 0){
				escapes.push([escapes[i][0], escapes[i][1]+1]);
			}

			if(escapes.length > i+1){
				break;
			}
		}
	}
}

function checkTrappedClaimableCells(){
	for (let row = 0; row < puzzleArray.length; row++) {
		for (let col = 0; col < puzzleArray[row].length; col++) {
			if(puzzleArray[row][col] == -1){
				checkClaimableAreaEscape(row, col);
			}
		}
	}
}

function checkClaimableAreaEscape(row, col){
	let filledArea = [[row, col]];
	let escapes = [];

	for(let i = 0; i < filledArea.length; i++){
		if(	filledArea[i][0] > 0){
			if(	puzzleArray[filledArea[i][0]-1][filledArea[i][1]] == puzzleArray[filledArea[i][0]][filledArea[i][1]] && 
				JSON.stringify(filledArea).indexOf(JSON.stringify([filledArea[i][0]-1, filledArea[i][1]])) == -1)
			{
				filledArea.push([filledArea[i][0]-1, filledArea[i][1]]);
			}
			if(	puzzleArray[filledArea[i][0]-1][filledArea[i][1]] == 0 && 
				JSON.stringify(escapes).indexOf(JSON.stringify([filledArea[i][0]-1, filledArea[i][1]])) == -1)
			{
				escapes.push([filledArea[i][0]-1, filledArea[i][1]]);
			}
		}
		if(	filledArea[i][0]+1 < puzzleArray.length){
			if(	puzzleArray[filledArea[i][0]+1][filledArea[i][1]] == puzzleArray[filledArea[i][0]][filledArea[i][1]] && 
				JSON.stringify(filledArea).indexOf(JSON.stringify([filledArea[i][0]+1, filledArea[i][1]])) == -1)
			{
				filledArea.push([filledArea[i][0]+1, filledArea[i][1]]);
			}
			if(	puzzleArray[filledArea[i][0]+1][filledArea[i][1]] == 0 && 
				JSON.stringify(escapes).indexOf(JSON.stringify([filledArea[i][0]+1, filledArea[i][1]])) == -1)
			{
				escapes.push([filledArea[i][0]+1, filledArea[i][1]]);
			}
		}
		if(	filledArea[i][1] > 0 ){
			if( puzzleArray[filledArea[i][0]][filledArea[i][1]-1] == puzzleArray[filledArea[i][0]][filledArea[i][1]] && 
				JSON.stringify(filledArea).indexOf(JSON.stringify([filledArea[i][0], filledArea[i][1]-1])) == -1)
			{
				filledArea.push([filledArea[i][0], filledArea[i][1]-1]);
			}
			if( puzzleArray[filledArea[i][0]][filledArea[i][1]-1] == 0 && 
				JSON.stringify(escapes).indexOf(JSON.stringify([filledArea[i][0], filledArea[i][1]-1])) == -1)
			{
				escapes.push([filledArea[i][0], filledArea[i][1]-1]);
			}
		}
		if(	filledArea[i][1]+1 < puzzleArray.length){
			if(	puzzleArray[filledArea[i][0]][filledArea[i][1]+1] == puzzleArray[filledArea[i][0]][filledArea[i][1]] && 
				JSON.stringify(filledArea).indexOf(JSON.stringify([filledArea[i][0], filledArea[i][1]+1])) == -1)
			{
				filledArea.push([filledArea[i][0], filledArea[i][1]+1]);
			}
			if(	puzzleArray[filledArea[i][0]][filledArea[i][1]+1] == 0 && 
				JSON.stringify(escapes).indexOf(JSON.stringify([filledArea[i][0], filledArea[i][1]+1])) == -1)
			{
				escapes.push([filledArea[i][0], filledArea[i][1]+1]);
			}
		}
	}
	console.log("filledArea");
	console.log(filledArea);
	console.log("escapes");
	console.log(escapes);
	if(escapes.length == 1){
		markCellBlank(escapes[0][0], escapes[0][1]);
		//If marking the cell combined it with another cell, we can stop investigating.
		if(puzzleArray[escapes[0][0]][escapes[0][1]] != puzzleArray[filledArea[0][0]][filledArea[0][1]])
		{
			return;
		}
		for(let i = 0; i < escapes.length; i++){
			if(	escapes[i][0] > 0 && puzzleArray[escapes[i][0]-1][escapes[i][1]] == 0){
				escapes.push([escapes[i][0]-1, escapes[i][1]]);
			}
			if(	escapes[i][0]+1 < puzzleArray.length && puzzleArray[escapes[i][0]+1][escapes[i][1]] == 0){
				escapes.push([escapes[i][0]+1, escapes[i][1]]);
			}
			if(	escapes[i][1] > 0 && puzzleArray[escapes[i][0]][escapes[i][1]-1] == 0){
				escapes.push([escapes[i][0], escapes[i][1]-1]);
			}
			if(	escapes[i][1] > puzzleArray[0].length  && puzzleArray[escapes[i][0]][escapes[i][1]+1] == 0){
				escapes.push([escapes[i][0], escapes[i][1]+1]);
			}

			if(escapes.length > i+1){
				break;
			}
		}
	}
}

function fieldSize(row, col){
	if(puzzleArray[row][col] == 0 || puzzleArray[row][col] <= -2){
		return 0;
	}
	
	//Not sure if this is optimal for such a simple function, but it may help with cells being listed multiple times
	fieldCells = [];

	fieldCells.push([row, col]);
	//If the field is larger than one cell, get all of the connected cells contained within
	for(let i = 0; i < fieldCells.length && i < largestField; i++){
		if(	fieldCells[i][0] > 0 && 
			puzzleArray[fieldCells[i][0]-1][fieldCells[i][1]] == puzzleArray[fieldCells[i][0]][fieldCells[i][1]] && 
			JSON.stringify(fieldCells).indexOf(JSON.stringify([fieldCells[i][0]-1, fieldCells[i][1]])) == -1)
		{
			fieldCells.push([fieldCells[i][0]-1, fieldCells[i][1]]);
		}
		if(	fieldCells[i][0]+1 < puzzleArray.length && 
			puzzleArray[fieldCells[i][0]+1][fieldCells[i][1]] == puzzleArray[fieldCells[i][0]][fieldCells[i][1]] && 
			JSON.stringify(fieldCells).indexOf(JSON.stringify([fieldCells[i][0]+1, fieldCells[i][1]])) == -1)
		{
			fieldCells.push([fieldCells[i][0]+1, fieldCells[i][1]]);
		}
		if(	fieldCells[i][1] > 0 && 
			puzzleArray[fieldCells[i][0]][fieldCells[i][1]-1] == puzzleArray[fieldCells[i][0]][fieldCells[i][1]] && 
			JSON.stringify(fieldCells).indexOf(JSON.stringify([fieldCells[i][0], fieldCells[i][1]-1])) == -1)
		{
			fieldCells.push([fieldCells[i][0], fieldCells[i][1]-1]);
		}
		if(	fieldCells[i][1]+1 < puzzleArray.length && 
			puzzleArray[fieldCells[i][0]][fieldCells[i][1]+1] == puzzleArray[fieldCells[i][0]][fieldCells[i][1]] && 
			JSON.stringify(fieldCells).indexOf(JSON.stringify([fieldCells[i][0], fieldCells[i][1]+1])) == -1)
		{
			fieldCells.push([fieldCells[i][0], fieldCells[i][1]+1]);
		}
	}

	return fieldCells.length;
}

function connectUnassignedFields(){
	//Same premise as a cross between checking filled area escapes and expanding hint areas
	//All empty unassigned fields are going to be grouped together, then each one is going to search for all paths leading to a (valid) field
	//Then all common cells between the two are going to be marked as empty

	console.log("CUF");

	let claimableCells = [];
	let claimableCellClusters = [];

	for (let row = 0; row < puzzleArray.length; row++) {
		for (let col = 0; col < puzzleArray[row].length; col++) {
			if(puzzleArray[row][col] == -1){
				claimableCells.push([row, col]);
			}
		}
	}

	console.log(claimableCells);


	//Group all joined cells together before moving on
	for(let i = 0; i < claimableCells.length; i++){
		claimableCellClusters.push([claimableCells[i]]);
		for(let j = 0; j < claimableCellClusters[claimableCellClusters.length-1].length; j++){
			//For every cell, check if the surrounding cells are also claimable. If so, list the entire bunch as one cluster.
			//No need for out of bounds checks, as it's performed before these are added to the list
			let indexUp = claimableCells.findIndex(	function(element) { //Up				
					return JSON.stringify(element) == JSON.stringify([claimableCellClusters[claimableCellClusters.length-1][j][0]-1, claimableCellClusters[claimableCellClusters.length-1][j][1]]);
				});
			if(indexUp > i){
					claimableCellClusters[claimableCellClusters.length-1].push(JSON.parse(JSON.stringify(claimableCells[indexUp])));
					claimableCells.splice(indexUp, 1);
			}
			let indexDown = claimableCells.findIndex(function(element) { //Down				
				return JSON.stringify(element) == JSON.stringify([claimableCellClusters[claimableCellClusters.length-1][j][0]+1, claimableCellClusters[claimableCellClusters.length-1][j][1]])
			});
			if(indexDown > i){
					claimableCellClusters[claimableCellClusters.length-1].push(JSON.parse(JSON.stringify(claimableCells[indexDown])));
					claimableCells.splice(indexDown, 1);
			}
			let indexLeft = claimableCells.findIndex(	function(element) { //Up				
				return JSON.stringify(element) == JSON.stringify([claimableCellClusters[claimableCellClusters.length-1][j][0], claimableCellClusters[claimableCellClusters.length-1][j][1]-1])
			});
			if(indexLeft > i){
					claimableCellClusters[claimableCellClusters.length-1].push(JSON.parse(JSON.stringify(claimableCells[indexLeft])));
					claimableCells.splice(indexLeft, 1);
			}
			let indexRight = claimableCells.findIndex(	function(element) { //Up				
				return JSON.stringify(element) == JSON.stringify([claimableCellClusters[claimableCellClusters.length-1][j][0], claimableCellClusters[claimableCellClusters.length-1][j][1]+1])
			});
			if(indexRight > i){
					claimableCellClusters[claimableCellClusters.length-1].push(JSON.parse(JSON.stringify(claimableCells[indexRight])));
					claimableCells.splice(indexRight, 1);
			}
		}
		// Need to fix this in that other spot too... Don't know how it worked otherwise. Completely exclusionary?
	}
	
	claimableCellClusters.forEach(cluster => {
		findUFieldConnection(cluster);
	});
}

function findUFieldConnection(claimableCellCluster){
	let edgeCells = [];
	claimableCellCluster.forEach(cell => {
		if(	(cell[0] > 0 && puzzleArray[cell[0]-1][cell[1]] == 0) ||
			(cell[1] > 0 && puzzleArray[cell[0]][cell[1]-1] == 0) ||
			(cell[1] < puzzleArray[cell[0]].length-1 && puzzleArray[cell[0]][cell[1]+1] == 0) ||
			(cell[0] < puzzleArray.length-1 && puzzleArray[cell[0]+1][cell[1]] == 0))
		{
			edgeCells.push(cell);
		}
	});

	let size = fieldSize(edgeCells[0][0], edgeCells[0][1]);
	let validPaths = [];

	edgeCells.forEach((cell) => {
		console.log("pathing from cell " + cell[0] + ", " + cell[1]);
		pathToValidHint(cell[0], cell[1], validPaths, size);
	});


	//If some fields are common among all paths, they'll have to be filled in
	let commonFields = JSON.parse(JSON.stringify(validPaths[0]));
	for(let i = 0; i < validPaths.length; i++) {
		for(let j = 0; j < commonFields.length; j++) {
			if(JSON.stringify(validPaths[i]).indexOf(JSON.stringify(commonFields[j])) == -1) {
				commonFields.splice(j, 1);
			}
		}
	}

	// console.log("Fields left");
	// console.log(commonFields);
	for(let i = 0; i < commonFields.length; i++){
		//Whatever fields are left, we mark them as empty. If they touch the original field, mark it as a part
		if(puzzleArray[commonFields[i][0]][commonFields[i][1]] == 0){
			markCellBlank(commonFields[i][0], commonFields[i][1]);		
		}
	}
}	

function pathToValidHint(row, col, paths, distance){
	let startIndex = paths.length;
	//Avoid linking together unmarked fields if we can help it
	if(row > 0 && puzzleArray[row-1][col] >= 0){
		//If we're reaching the limit with next field expanded into, there's no point continuing.
		if(puzzleArray[row-1][col] == 0 && distance < (largestField-1)){
			pathToValidHint(row-1, col, paths, distance+1);
		}
		if(puzzleArray[row-1][col] > 0)
		{
			//If we still have enough cells left to connect to that field, we note it down
			if(distance <= (puzzleArray[row-1][col] - fieldSize(row-1, col))){
				paths.push([[row, col]]);
			}
			return;	//Make sure we stop searching around this spot to save resources (it shouldn't be adjacent to anything anyway)
		}
	}	
	if(col > 0 && puzzleArray[row][col-1] >= 0){
		//If we're reaching the limit with next field expanded into, there's no point continuing.
		if(puzzleArray[row][col-1] == 0 && distance < (largestField-1)){
			pathToValidHint(row, col-1, paths, distance+1);
		}
		if(puzzleArray[row][col-1] > 0)
		{
			//If we still have enough cells left to connect to that field, we note it down
			if(distance <= (puzzleArray[row][col-1] - fieldSize(row, col-1))){
				paths.push([[row, col]]);
			}
			return;	//Make sure we stop searching around this spot to save resources (it shouldn't be adjacent to anything anyway)
		}
	}	
	if(col < puzzleArray[row].length && puzzleArray[row][col+1] >= 0){
		//If we're reaching the limit with next field expanded into, there's no point continuing.
		if(puzzleArray[row][col+1] == 0 && distance < (largestField-1)){
			pathToValidHint(row, col+1, paths, distance+1);
		}
		if(puzzleArray[row][col+1] > 0)
		{
			//If we still have enough cells left to connect to that field, we note it down
			if(distance <= (puzzleArray[row][col+1] - fieldSize(row, col+1))){
				paths.push([[row, col]]);
			}
			return;	//Make sure we stop searching around this spot to save resources (it shouldn't be adjacent to anything anyway)
		}
	}
	if(row < puzzleArray.length && puzzleArray[row+1][col] >= 0){
		//If we're reaching the limit with next field expanded into, there's no point continuing.
		if(puzzleArray[row+1][col] == 0 && distance < (largestField-1)){
			pathToValidHint(row+1, col, paths, distance+1);
		}
		if(puzzleArray[row+1][col] > 0)
		{
			//If we still have enough cells left to connect to that field, we note it down
			if(distance <= (puzzleArray[row+1][col] - fieldSize(row+1, col))){
				paths.push([[row, col]]);
			}
			return;	//Make sure we stop searching around this spot to save resources (it shouldn't be adjacent to anything anyway)
		}
	}	


	//If any paths have been found, list the path taken there from the edge cell
	for(let i = startIndex; i < paths.length; i++){
		paths[i].push([row, col]);
	}
}

function checkCorners(){
	if(puzzleArray[0][0] == 0){
		if(	(puzzleArray[0][1] == -1 || puzzleArray[0][1] > 0) && (puzzleArray[1][0] == -1 || puzzleArray[1][0] > 0)){
			markCellBlank(0, 0);
		}
		if(	puzzleArray[0][1] <= -2 && puzzleArray[1][0] <= -2){
			markCell(0,0);
		}
	}
	if(puzzleArray[0][puzzleArray[0].length-1] == 0){
		if(	(puzzleArray[0][puzzleArray[0].length-2] == -1 || puzzleArray[0][puzzleArray[0].length-2] > 0) && 
			(puzzleArray[1][puzzleArray[0].length-1] == -1 || puzzleArray[1][puzzleArray[0].length-1] > 0)){
			markCellBlank(0, puzzleArray[0].length-1);
		}
		if(	puzzleArray[0][puzzleArray[0].length-2] <= -2 && puzzleArray[1][puzzleArray[0].length-1] <= -2){
			markCell(0,puzzleArray[0].length-1);
		}
	}

	if(puzzleArray[puzzleArray.length-1][0] == 0){
		if(	(puzzleArray[puzzleArray.length-1][1] == -1 || puzzleArray[puzzleArray.length-1][1] > 0) && 
			(puzzleArray[puzzleArray.length-2][0] == -1 || puzzleArray[puzzleArray.length-2][0] > 0)){
			markCellBlank(puzzleArray.length-1, 0);
		}
		if(	puzzleArray[puzzleArray.length-1][1] <= -2 && puzzleArray[puzzleArray.length-2][0] <= -2){
			markCell(puzzleArray.length-1,0);
		}
	}
	if(puzzleArray[puzzleArray.length-1][puzzleArray[0].length-1] == 0){
		if(	(puzzleArray[puzzleArray.length-1][puzzleArray[0].length-2] == -1 || puzzleArray[puzzleArray.length-1][puzzleArray[0].length-2] > 0) && 
			(puzzleArray[puzzleArray.length-2][puzzleArray[0].length-1] == -1 || puzzleArray[puzzleArray.length-2][puzzleArray[0].length-1] > 0)){
			markCellBlank(puzzleArray.length-1, puzzleArray[0].length-1);
		}
		if(	puzzleArray[puzzleArray.length-1][puzzleArray[0].length-2] <= -2 && puzzleArray[puzzleArray.length-2][puzzleArray[0].length-1] <= -2){
			markCell(puzzleArray.length-1,puzzleArray[0].length-1);
		}
	}
}
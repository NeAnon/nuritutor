let selectedCell;
let puzzleArray;
let lowestFill; let indivCells;

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

function solve(){
	makeArray();
	console.log(puzzleArray);
	runThroughOnes();
	checkDiagonals();
}

function makeArray(){
	let board = document.getElementById("board");
	let rows = board.lastChild.lastChild.id.split(',')[0];
	let cols = board.lastChild.lastChild.id.split(',')[1];
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
				if(isNaN(puzzleArray[i][j])){alert("Invalid input in cell " + (i+1) + ", " + (j+1));return;}
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
	if(puzzleArray[row][col] != lowestFill){
		lowestFill++; indivCells--;
	}
}

function debugFilledCells(){
	let filledCells = document.getElementsByClassName("filled");
	console.log(filledCells);
	for(let i = 0; i < filledCells.length; i++){
		console.log("Getting element of id " + parseInt(filledCells[i].id.split(',')[0]) + ", " + parseInt(filledCells[i].id.split(',')[1]));
		filledCells[i].innerHTML = puzzleArray[parseInt(filledCells[i].id.split(',')[0])][parseInt(filledCells[i].id.split(',')[1])];
	}
}
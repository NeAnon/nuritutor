let selectedCell;
let puzzleArray;

function initializePage(){
	console.log("Page initialized!");    

	document.getElementById("solver").onclick = solve;
	document.getElementById("resizer").onclick = createGrid;

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
	console.log(array);
	runThroughOnes();
	checkDiagonals();
}

function makeArray(){
	let board = document.getElementById("board");
	let rows = board.lastChild.lastChild.id.split(',')[0];
	let cols = board.lastChild.lastChild.id.split(',')[1];
	console.log(rows + " " + cols);
	array = [];
	for(let i = 0; i <= rows; i++){
		array[i] = [];
		for(let j = 0; j <= cols; j++){
			array[i][j] = 0;
			if(document.getElementById(i+', '+j).innerHTML){
				array[i][j] = parseInt(document.getElementById(i+', '+j).innerHTML);
				if(isNaN(array[i][j])){alert("Invalid input in cell " + (i+1) + ", " + (j+1));return;}
			}
		}
	}
}

function runThroughOnes(){
	for (let row = 0; row < array.length; row++) {
		for (let col = 0; col < array[row].length; col++) {
			if(array[row][col] == 1){
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
	for (let row = 0; row < array.length; row++) {
		for (let col = 0; col < array[row].length; col++) {
			if(array[row][col] > 0){
				if(row > 0 && col > 0 && array[row-1][col-1] > 0){ //Top-left
					console.log("Cells ("+ (row-1) + ", " + (col-1) + ") and (" +  row + ", " + col + ") are diagonally adjacent. Therefore the cells between them should be filled");
					markCell(row-1, col);		
					markCell(row, col-1);
				}
				if(row > 0 && col < array[row].length-1 && array[row-1][col+1] > 0){ //Top-right
					console.log("Cells ("+ (row-1) +", "+ (col+1) + ") and (" +  row + ", " + col + ") are diagonally adjacent. Therefore the cells between them should be filled");
					markCell(row-1, col);
					markCell(row, col+1);
				}
				if(row < array.length-1 && col > 0 && array[row+1][col-1] > 0){ //Bottom-left
					console.log("Cells ("+ (row+1) + ", " + (col-1) + ") and (" +  row + ", " + col + ") are diagonally adjacent. Therefore the cells between them should be filled");
					markCell(row+1, col);
					markCell(row, col-1);
				}
				if(row < array.length-1 && col < array[row].length-1 && array[row+1][col+1] > 0){ //Bottom-right
					console.log("Cells ("+ (row+1) +", "+ (col+1) + ") and (" +  row + ", " + col + ") are diagonally adjacent. Therefore the cells between them should be filled");
					markCell(row+1, col);
					markCell(row, col+1);
				}
			}
		}
	}
}

function markCell(row, col){
	if(row >= 0 && row < array.length){
		if(col >= 0 && col < array[row].length){
			if(!document.getElementById(row+ ', ' + col).classList.contains('filled')){
				document.getElementById(row + ', ' + col).classList.add('filled');
				//console.log("cell " + row + ", " + col + " filled");
			}
		}
	}
}
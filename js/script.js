let selectedCell;

function initializePage(){
	console.log("Page initialized!");    
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
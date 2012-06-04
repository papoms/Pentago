//Represents a single move. use .parse(notation) to parse a String notation
function Move() {
}


// Returns whether or not a notation is Valid
Move.prototype.isValid = function (notation) {

	// Notation should be 5 characters long
	if (notation.length !== 5) {
		return false;
	}

	// Valid Data for the different Positions
	var validData = [
	['W', 'B'],
	['a', 'b', 'c', 'd', 'e', 'f'],
	['1', '2', '3', '4', '5', '6'], //using char representation for the validation only. 
	['A', 'B', 'C', 'D'],
	['r', 'l']                                 
	];

	// Check if notation[i] is in array of validData for this Position
	for (var i=0; i < 5; i++) {
		// if Character is not allowed return false;
		if ( validData[i].indexOf( notation.charAt( i )) === -1 ){
			return false;  
		}
	}

	return true; 
};

// Parse a notation String and fill object with the data
Move.prototype.parse = function(notation){

	if ( ! this.isValid( notation )) {
		return false;
	}

	this.notation = notation;
	this.player = notation.charAt(0);
	this.x = notation.charAt(1);
	this.y = parseInt(notation.charAt(2), 10);
	this.block = notation.charAt(3);
	this.direction = notation.charAt(4);    

	return true;
}; 

//Return the "serial" (0-35) Field number of a move
Move.prototype.getFieldNumber = function(){

	var s = this.x.charCodeAt(0) - 97;
	return (s + (this.y-1) * 6);
};


Move.prototype.print = function(){

	return this.notation;
};

//Represents the Board
function Board(){   

	this.reset();           

	//Index of Block items		
	this.blocks = {
		'A' : [0,1,2,6,7,8,12,13,14],
		'B' : [3,4,5,9,10,11,15,16,17],
		'C' : [18,19,20,24,25,26,30,31,32],
		'D' : [21,22,23,27,28,29,33,34,35]
	};
	//rotation Left and right
	this.mix = {
		'l' : [2,7,12,-5,0,5,-12,-7,-2],
		'r' : [12,5,-2,7,0,-7,2,-5,-12]
	};
}                    


Board.prototype.reset = function(){

	this.state = [];

	for (var i = 0; i < 36; i++){
		this.state[i] = 0;
	}                    
};


Board.prototype.rotateBlock = function(block, direction){

	//Copy the current state   
	var oldState = this.state.slice();                

	//Rotate the Block using our predefinded rules
	for (var i=0; i < 9; i++) {
		var posIndex = this.blocks[block][i];
		var addIndex = this.mix[direction][i];   
		this.state[posIndex] = oldState[ posIndex + addIndex ];
	}
	return true;
};


Board.prototype.fieldIsFree = function(fieldNumber){

	//0 = free => !
	return !this.state[fieldNumber];
};            


// Set the Color of a Field
Board.prototype.setFieldColor = function (fieldNumber, color){

	this.state[fieldNumber] = color; 
};


Board.prototype.print = function(s){

	//0 = free => !
	var line = "";
	for (var i = 0; i < 36; i++){
		line += this.state[i];
		if ((i+1) % 3 === 0) { line += ' ';  }
		if ((i+1) % 6 === 0) { line += "\n"; }     
		if ((i+1) % 18 === 0) { line += "\n"; }     
	}                                
	return line;
}; 


// Represents the Game and its state
function Game(){
	this.board = new Board();
	this.moves = [];
}


Game.prototype.getLastMove = function(){

	if (! this.moves.length ) {
		return false;
	}

	return this.moves[ this.moves.length - 1 ];
};  


Game.prototype.currentPlayer = function(){

	var lastMove = this.getLastMove();

	//White starts the game
	if (!lastMove) {
		return 'W';
	}

	//otherwise return current Player
	return lastMove.player === 'W' ? 'B' : 'W';
};


//Takes either a move object or the string notation and tries to execute the move, if valid;
Game.prototype.makeMove = function(move){

	// make move an object if neccessary 
	if (typeof (move) === 'string' ){
		var moveObject = new Move();
		//up up and away if not parseable
		if (!moveObject.parse(move)) {
			return false;
		}
		move = moveObject;
	}   

	//Check if its the players turn
	if (move.player !== this.currentPlayer()) {
		return false;
	}

	//Check if the target Field is free
	if (! this.board.fieldIsFree( move.getFieldNumber() )) {
		return false; 
	}

	// Put the Marble
	this.board.setFieldColor( move.getFieldNumber(), move.player); 

	//Check for winning condition before rotating the Block

	//Rotate the Block         
	this.board.rotateBlock(move.block, move.direction);

	this.moves.push(move);

};


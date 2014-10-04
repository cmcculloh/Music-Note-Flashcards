window.flashCards = {
	canvas:{
		dom:null,
		color:'#EEEEEE',
		height:500,
		width:500
	},
	staff:{
		shortLines:{
			startX:120,
			stopX:180,
			number: 2
		},
		lines:{
			startX:0,
			stopX:375
		},
		startY:25.5,
		stopY:250,
		spacing:25,
		color:"#333"
	},
	currentNote:{
		noteNumber:null,
		clef:null
	},
	getCurrentNote: function getCurrentNote() {
		return flashCards.notes.list[flashCards.currentNote.noteNumber].noteByClef[flashCards.currentNote.clef].note;
	},
	init: function init(){
		flashCards.canvas.dom = document.getElementById('paint_area').getContext('2d');
		flashCards.refresh();
		$('.answer').on('click', flashCards.clickAnswer);
	},
	clickAnswer: function clickAnswer(e) {
		e.preventDefault();

		var guess = $(e.currentTarget).val();
		var answer = flashCards.getCurrentNote();

		var correct = guess === answer;

		var message = correct ? 'Right!' : 'Wrong!';

		$('#results').html(message + ' guess: ' + guess + '; answer: ' + answer);

		flashCards.refresh(correct);
	},
	resetCanvas: function resetCanvas() {
		var cvs, props, staff, shortLines, lines;
		props = flashCards.canvas;
		cvs = props.dom;
		staff = flashCards.staff;
		shortLines = staff.shortLines;
		lines = staff.lines;

		//create and fill the rectangle
		cvs.fillStyle = props.color;
		cvs.fillRect(0,0,props.height,props.width);

		cvs.beginPath();
		//make the staff lines
		for (var y = staff.startY, l = 1; y < staff.stopY; y += staff.spacing, l++) {
			//account for outer lines
			if(l <= shortLines.number || l > (shortLines.number + 5)){
				//we only want these lines to be long enough to hold the note. They shouldn't stretch across the whole screen
				cvs.moveTo(shortLines.startX, y);
				cvs.lineTo(shortLines.stopX, y);
			}else{
				cvs.moveTo(lines.startX, y);
				cvs.lineTo(lines.stopX, y);
			}
		}
		cvs.strokeStyle = staff.color;
		cvs.stroke();
		cvs.closePath();

		return cvs;
	},
	/**
	 * Class: notes
	 *
	 * @param x: distance from left of screen for note to appear
	 * @param spacing: distance between each note (multiply by steps to determine y, or distance from top)
	 * @param radius: how big the note should be
	 * @param sA: idk
	 * @param eA: idk
	 * @param acw: Anti-clockwise maybe? idk...
	 * @param color: What color to make the note
	 * @param list: Array of individual note objects
	 *
	 * Class: note
	 * @param steps: multiply by spacing to determine "y" (distance from top)
	 * @param noteByClef: note - what not this space on treble clef represents, answered - how many times the user has gotten this "right". Corresponds with "clefs" table.
	 */
	notes:{
		x:150,
		spacing:12.5,
		radius:15,
		sA:0,/*idk what sA stands for...*/
		eA:Math.PI * 2,/*idk what eA stands for...*/
		acw:false,/*idk what acw stands for...*/
		color:"#000",
		list:[
			{steps:1, noteByClef:[{note:"D",answered:0}, {note:"F",answered:0}]},
			{steps:2, noteByClef:[{note:"C",answered:0}, {note:"E",answered:0}]},
			{steps:3, noteByClef:[{note:"B",answered:0}, {note:"D",answered:0}]},
			{steps:4, noteByClef:[{note:"A",answered:0}, {note:"C",answered:0}]},
			{steps:5, noteByClef:[{note:"G",answered:0}, {note:"B",answered:0}]},
			{steps:6, noteByClef:[{note:"F",answered:0}, {note:"A",answered:0}]},
			{steps:7, noteByClef:[{note:"E",answered:0}, {note:"G",answered:0}]},
			{steps:8, noteByClef:[{note:"D",answered:0}, {note:"F",answered:0}]},
			{steps:9, noteByClef:[{note:"C",answered:0}, {note:"E",answered:0}]},
			{steps:10, noteByClef:[{note:"B",answered:0}, {note:"D",answered:0}]},
			{steps:11, noteByClef:[{note:"A",answered:0}, {note:"C",answered:0}]},
			{steps:12, noteByClef:[{note:"G",answered:0}, {note:"B",answered:0}]},
			{steps:13, noteByClef:[{note:"F",answered:0}, {note:"A",answered:0}]},
			{steps:14, noteByClef:[{note:"E",answered:0}, {note:"G",answered:0}]},
			{steps:15, noteByClef:[{note:"D",answered:0}, {note:"F",answered:0}]},
			{steps:16, noteByClef:[{note:"C",answered:0}, {note:"E",answered:0}]},
			{steps:17, noteByClef:[{note:"B",answered:0}, {note:"D",answered:0}]},
			{steps:18, noteByClef:[{note:"A",answered:0}, {note:"C",answered:0}]},
			{steps:19, noteByClef:[{note:"G",answered:0}, {note:"B",answered:0}]}
		]
	},
	clefs : [
		{name:"treble", x:10, y:50, width:50, height:175},
		{name:"bass", x:10, y:75, width:60, height:87}
	],
	noteLetter:{
		color:"#000",
		font:"bold 30px sans-serif",
		x:10,/*text x,y represents bottom left, NOT top left*/
		y:275,
		backgroundSquare:{
			x:5,
			y:245,
			width:35,
			height:35
		}
	},
	/*redraw the notes. This needs a lot of clean up and abstraction still*/
	refreshNotes: function refreshNotes() {
		var cvs, notes, note, clef, clefDOM, noteNumber, clefName;
		cvs = flashCards.canvas.dom;
		notes = flashCards.notes;

		//start a new path to make the notes with
		cvs.beginPath();

		//draw a random note
		noteNumber = Math.floor(Math.random() * notes.list.length);
		flashCards.currentNote.noteNumber = noteNumber;
		note = notes.list[noteNumber];
		cvs.arc(notes.x, (notes.spacing * note.steps), notes.radius, notes.sA, notes.eA, notes.acw);
		cvs.closePath();
		cvs.strokeStyle = notes.color;
		cvs.stroke();
		cvs.fillStyle = notes.color;
		cvs.fill();



		//draw one random clef
		clefNumber = Math.floor(Math.random() * flashCards.clefs.length);
		flashCards.currentNote.clef = clefNumber;
		clef = flashCards.clefs[clefNumber];
		clefDOM = document.getElementById(clef.name);
		cvs.drawImage(clefDOM, clef.x, clef.y, clef.width, clef.height);


		cvs.canvas.addEventListener('mousedown', function mousedown() {
			var letter, bg;
			letter = flashCards.noteLetter;
			bg = letter.backgroundSquare;

			//Draw the note letter associated with randomly chosen note
			cvs.fillStyle = flashCards.canvas.color;
			cvs.fillRect(bg.x,bg.y,bg.width,bg.height);
			cvs.font = letter.font;
			cvs.fillStyle = letter.color;
			cvs.fillText(note.noteByClef[flashCards.currentNote.clef].note, letter.x, letter.y);
		}, false);
	},
	refresh: function refresh(answeredCorrect) {
		/*don't update score the first time*/
		if(typeof answeredCorrect !== "undefined"){
			flashCards.score(answeredCorrect);
		}

		flashCards.resetCanvas();
		flashCards.refreshNotes();
	},
	score: function score(answeredCorrect) {
		var score = 0;

		if(answeredCorrect){
			flashCards.notes.list[flashCards.currentNote.noteNumber].noteByClef[flashCards.currentNote.clef].answered++;
		}else{
			flashCards.notes.list[flashCards.currentNote.noteNumber].noteByClef[flashCards.currentNote.clef].answered = 0;
		}

		for(var i = 0, ii = flashCards.notes.list.length; i < ii; i++){
			for(var nbcN = 0, nbcTN = flashCards.notes.list[i].noteByClef.length; nbcN < nbcTN; nbcN++){
				score += flashCards.notes.list[i].noteByClef[nbcN].answered;
			}
		}

		document.getElementById("currScore").innerHTML = score;
	}
};

flashCards.init();
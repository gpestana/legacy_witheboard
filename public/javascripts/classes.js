//CLASSES

/**
 *  - User
 *  Class that represents user and its definitions (name, stroke, color) in
 * each of his orders.
 *  To be sent to the Witheboard class.
 *
 */

function User(){
	this.name = "guest"+Math.floor(Math.random()*1001);
	this.color = "#6a5acd";
	this.lineJoin = "round";
	this.lineWidth = 3;
	
	this.getName = function(){
		return this.name;};
	this.getLineWidth = function(){
		return this.lineWidth;};
	this.getColor = function(){
		return this.color;};
	this.getLineJoin = function(){
		return this.lineJoin;};

	this.setName = function(newName){
		this.name=newName;};
	this.setLineWidth = function(newLineWidth){
		this.lineWidth=newLineWidth;};
	this.setColor = function(newColor){
		this.color=newColor;};
	this.setLineJoin = function(newLineJoin){
		this.lineJoin=newLineJoin;};
}

/**
 *  - Line
 *  Class used to encapsulate coordinates for a new line.
 *  This object ig going to be used by the Witheboard class to update the board
 * according to the user's orders.
 *
 */

function Line(){
	this.Xcoords = [];
	this.Ycoords = [];
	
	this.getXcoords = function(){
		return this.Xcoords;};
	this.getYcoords = function(){
		return this.Ycoords;};

	this.setXcoords = function(Xcoords){
		return this.Xcoords = Xcoords;};
	this.setYcoords = function(Ycoords){
		return this.Ycoords = Ycoords;};

	this.addXcoord = function(Xcoord){
		this.Xcoords.push(Xcoord);};
	this.addYcoord = function(Ycoord){
		this.Ycoords.push(Ycoord);};
};

/**
 *  - Request
 *  Class used to encapsulate the request for Whiteboard (local and remote)
 *  A request contains the user how does the request and a new line to be
 * processed
 *  Initially, the a random user is created (with default definitions)
 */

function Request(user){
	this.user = user;
	this.line = new Line();

	this.getUser = function() {
		return this.user;};
	this.getLine = function() {
		return this.line;};

	this.setUser = function(newUser) {
		this.user = newUser;};
	this.setLine = function(newLine) {
		this.line = newLine;};

}

/**
 *  - Board
 *  Class that encapsulates the board itself
 */		
function Board() {
	this.drawing = false;
	this.canvasContext = "";

	this.fetchCanvas = function() {
		var DOMcanvas = document.getElementById('board');
    	this.canvasContext = DOMcanvas.getContext('2d');
	};
	this.isDrawing = function(){
		return this.drawing;};
	this.setDrawing = function(boolean){
		this.drawing = boolean;};


	this.draw = function(request) {
		//set new lines' definitions
		this.canvasContext.strokeStyle = request.getUser().getColor();
		this.canvasContext.lineJoin = request.getUser().getLineJoin();
		this.canvasContext.lineWidth = request.getUser().getLineWidth();

		Xcoords = request.getLine().getXcoords();
		Ycoords = request.getLine().getYcoords();

		for(var i=0; i < Xcoords.length; i++) {		
			this.canvasContext.beginPath();
			this.canvasContext.moveTo(Xcoords[i-1], Ycoords[i-1]);
			this.canvasContext.lineTo(Xcoords[i], Ycoords[i]);
			this.canvasContext.closePath();
			this.canvasContext.stroke();
		}
	}
} 

/**
 *  - Proxy
 *  Class that handles communication with the server
 */	

 function Proxy() {

 	this.sendRequest = function(req, socket){

 		data = [req.getLine().getXcoords(),req.getLine().getYcoords()];
 		socket.emit('send', { data: data, req: req });
 	}
 
	this.handleRequest = function(data){
 		//update request with data coming from server
 		req.getLine().setXcoords(data.data[0]);
		req.getLine().setYcoords(data.data[1]);
		req.getUser().setName(data.req.user.name);
		req.getUser().setColor(data.req.user.color);
		req.getUser().setLineWidth(data.req.user.lineWidth);

		//draw updates
		board.draw(req);
		board.setDrawing(false);
		req = new Request(user)

		//just to use the user's name!
		if(data.data[0].length !=0) {
			console.log(req.getUser().getName()+"'s writting...");}
 	}
 }
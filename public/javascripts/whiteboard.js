
/**
 *  - Whiteboard
 *  Application's main function (objects' inits, mouse handlers, reqs handlers)
 *
 */

function whiteboard() {

	//start socket.io
	var socket = io.connect('http://localhost:3700');
	
	//init objects
	board = new Board();
	board.fetchCanvas();
	user = new User();
	proxy = new Proxy();
	req = new Request(user);

	//forwards incoming requests from server to the Proxy object
	socket.on('message', function (data) {
		proxy.handleRequest(data);
	});


    /*
 	 * - MOUSE handlers and triggers
 	 *
 	 * Triggers and handlers for when:
 	 * i)   Mouse is clicked: updates request's line; Draw line;
 	 * ii)  Mouse is clicked and moving: updates request's line; Draw line;
	 * iii) Mouse's button is unhold: sends request to server;
	 * iv)  Mouse leaves canvas' zone: stops and sends request to server;
 	 *
 	 * Note: Code was not refactored to the maximum so that can be clear to
 	 *      understand the different canses.
 	 */
	$('#board').mousedown(
		function(ev) {
			req.getLine().addXcoord(ev.pageX-this.offsetLeft);
			req.getLine().addYcoord(ev.pageY-this.offsetTop);
			board.setDrawing(true);		
			board.draw(req);
		});
	$('#board').mousemove(
		function(ev){
		if(board.isDrawing()){
			req.getLine().addXcoord(ev.pageX-this.offsetLeft);
			req.getLine().addYcoord(ev.pageY-this.offsetTop);
			board.draw(req);}
	});
	$('#board').mouseup(
		function(ev) {
			proxy.sendRequest(req, socket);
			req = new Request(user);
	});
	$('#board').mouseleave(
		function(ev){
			proxy.sendRequest(req, socket);
			req = new Request(user);
	});

}


/**
 *  - UI
 *  Simple function that changes values in User object according to user's
 * preferences
 *
 *	(Note: simple and straight-forward. Proof of concept)
 */

function ui() {
	
	//change user's name
	$('#nameButton').click(function() {
     	user.setName($('#name').val());});

	//change line's width
    $('#lineWidthButton').click(function() {
		user.setLineWidth($('#width').val());});
	
	//change line's color
    $('#lineColorButton').click(function() {
		user.setColor($('#color').val());});
}
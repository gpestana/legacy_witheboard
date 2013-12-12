// Let's test this function
function isEven(val) {
	return val % 2 === 0;
}

test('userCreation', function() {
	user = new User();
	deepEqual(user.getColor(),"#6a5acd", "Initial color is correct");

	user.setName("testName");
	user.setColor("#ffffff");
	user.setLineJoin("square");
	user.setLineWidth(5);

	deepEqual(user.getName(),"testName", "Name set and get correct!");
	deepEqual(user.getColor(),"#ffffff", "Color set and get correct!");
	deepEqual(user.getLineJoin(),"square", "LineJoin set and get correct!");
	deepEqual(user.getLineWidth(),5, "LineWidth set and get correct!");
})

test('addXcordinates', function() {
	line = new Line();

	line.addXcoord(1);
	line.addXcoord(2);
	line.addXcoord(3);
	line.addXcoord(4);

	deepEqual(line.getXcoords(),[1,2,3,4], "Add X coordinates functions correct!")
})

test('addYcordinates', function() {
	line = new Line();

	line.addYcoord(1);
	line.addYcoord(2);
	line.addYcoord(3);
	line.addYcoord(4);

	deepEqual(line.getYcoords(),[1,2,3,4], "Add Y coordinates functions correct!")
})

test('boardFetchCanvas', function() {
	board = new Board();
	board.fetchCanvas();

	notEqual(board.fetchCanvas, null, "Canvas well fetched by the board!");

})

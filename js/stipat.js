window.onload = function() {
	
	var canvas = document.getElementById('stipat');

	$("#stipat").css("background-size", stitchwidth+"px");
	
	paper.setup(canvas);
	
	drawCrosses();

// -----------------EventListener
	canvas.addEventListener('mousemove', function(evt) {
		console.log("move");
		if (drawing){
			console.log("draw");
			var currentPoint = posToPoint(getMousePos(canvas, evt));
			if (!lastPoint.equals(currentPoint)) {
				lastPoint = currentPoint;
				setPoint(lastPoint);
			};
		}
	}, false);

	canvas.addEventListener('mousedown', function(evt) {
		console.log("down");
		drawing = true;
		console.log("mouse= "+getMousePos(canvas, evt).x +"/"+getMousePos(canvas, evt).y);
		lastPoint = posToPoint(getMousePos(canvas, evt));
		setPoint(lastPoint);
	}, false);

	canvas.addEventListener('mouseup', function(evt) {
		console.log("up");
		drawing = false;
	}, false);
};

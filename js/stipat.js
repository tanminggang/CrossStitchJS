window.onload = function() {

	$("#stipat").css("background-size", stitchwidth+"px");
	
	//paper.setup(canvas);
	
	drawCrosses();

// -----------------EventListener
	canvas.addEventListener('mousemove', function(evt) {
		console.log("move");
		if (drawing){
			console.log("draw");
			var currentCross = posToCross(getMousePos(canvas, evt));
			if (!lastCross.equals(currentCross)) {
				lastCross = currentCross;
				setCross(lastCross);
			}
		}
	}, false);

	canvas.addEventListener('mousedown', function(evt) {
		console.log("down");
		drawing = true;
		console.log("mouse= "+getMousePos(canvas, evt).x +"/"+getMousePos(canvas, evt).y);
		lastCross = posToCross(getMousePos(canvas, evt));
		setCross(lastCross);
	}, false);

	canvas.addEventListener('mouseup', function(evt) {
		console.log("up");
		drawing = false;
	}, false);
};

$(window).bind("resize", function(){
    canvas.width = $(window).width();
    canvas.height = $(window).height();
    context.lineWidth = 3;
    drawCrosses();
});

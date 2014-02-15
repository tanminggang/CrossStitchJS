window.onload = function() {

	$("#stipat").css("background-size", stitchwidth+"px");
	
	//paper.setup(canvas);
	
	drawCrosses();


  // Touchstuff
  function touchHandler(event) {
    var touch = event.changedTouches[0];

    var simulatedEvent = document.createEvent("MouseEvent");
        simulatedEvent.initMouseEvent({
        touchstart: "mousedown",
        touchmove: "mousemove",
        touchend: "mouseup"
    }[event.type], true, true, window, 1,
        touch.screenX, touch.screenY,
        touch.clientX, touch.clientY, false,
        false, false, false, 0, null);

    touch.target.dispatchEvent(simulatedEvent);
    event.preventDefault();
  }

// -----------------EventListener
	canvas.addEventListener('mousemove', function(evt) {
    event.preventDefault();
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
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.lineWidth = stitchwidth/4;
    context.lineCap = 'round';
    drawCrosses();
});

$("#saveButton").click(function() {
	console.log("klick");
	$(this).css("background-color","#008800");
  // var myImage = canvas.toDataURL();
  // //document.getElementById('canvasImg').src = dataURL;
  // var imageElement = document.getElementById("stipat");
  // imageElement.src = myImage;

  canvas.toBlob(function(blob) {
    saveAs(blob, "pretty image.png");
	});
});




function getMousePos(canvas, evt) {
  var rect = canvas.getBoundingClientRect();
    return {
      x: evt.clientX - rect.left,
      y: evt.clientY - rect.top
    };
}

function posToPoint(pos){
	var x = (pos.x - pos.x % stitchwidth)/stitchwidth;
	var y = (pos.y - pos.y % stitchwidth)/stitchwidth;
	return new paper.Point(x, y);
}

function setPoint(point){
	console.log("set cross: "+point);
	crosses.push({point: point, color: currentColor});
	drawCross(point, currentColor);
}
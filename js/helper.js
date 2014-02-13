function getMousePos(canvas, evt) {
  var rect = canvas.getBoundingClientRect();
    return {
      x: evt.clientX - rect.left,
      y: evt.clientY - rect.top
    };
}

function posToCross(pos){
	var x = (pos.x - pos.x % stitchwidth)/stitchwidth;
	var y = (pos.y - pos.y % stitchwidth)/stitchwidth;
	return new Cross(x, y, currentColor);
}

function setCross(cross){
	console.log("set "+cross.getInfo());
	crosses.push(cross);
	cross.draw();
}

function drawCrosses(){
  for (var i = 0; i < crosses.length; i++) {
    crosses[i].draw();
  }
  console.log("stichDiff " +stichDiff);
}
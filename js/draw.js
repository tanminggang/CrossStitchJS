function drawCross(point, color){
	point = new paper.Point(point.x*stitchwidth+2, point.y*stitchwidth+2);
	var point2 = new paper.Point(point.x+stitchwidth-4, point.y+stitchwidth-4);
	var point3 = new paper.Point(point.x+stitchwidth-4, point.y);
	var point4 = new paper.Point(point.x, point.y+stitchwidth-4);

	var path = new paper.Path();
	path.strokeColor = color;
	path.strokeWidth = 3;
	path.strokeCap = 'round';
	path.add(point);
	path.add(point2);
	path = new paper.Path();
	path.strokeColor = color;
	path.strokeWidth = 3;
	path.strokeCap = 'round';
	path.add(point3);
	path.add(point4);
}

function drawCrosses(){
	for (var i = 0; i < crosses.length; i++) {
		//console.log("drawing: "+points[i].point);
		drawCross(crosses[i].point, crosses[i].color); 
	};
	paper.view.draw();
}
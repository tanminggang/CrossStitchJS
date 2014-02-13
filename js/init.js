var canvas = document.getElementById('stipat');
var context = canvas.getContext('2d');

canvas.width = document.body.clientWidth;
canvas.height = document.body.clientHeight;

context.lineWidth = 3;
context.lineCap = 'round';

var stitchwidth = 20;
var stichDiff = 2;
var currentColor = "#ff0000";
var drawing = false;
var lastCross;

// Cross Class
function Cross(x, y, color){
  this.x = x;
  this.y = y;
  this.color = color;
}

// Cound put this into cross, but that would receate the function with every cross object
Cross.prototype.draw = function(){
  context.strokeStyle = this.color;

  context.beginPath();
  context.moveTo(this.x*stitchwidth+stichDiff, this.y*stitchwidth+stichDiff);
  context.lineTo((this.x+1)*stitchwidth-stichDiff, (this.y+1)*stitchwidth-stichDiff);
  context.stroke();

  context.beginPath();
  context.moveTo((this.x+1)*stitchwidth-stichDiff, this.y*stitchwidth+stichDiff);
  context.lineTo(this.x*stitchwidth+stichDiff, (this.y+1)*stitchwidth-stichDiff);
  context.stroke();
};

Cross.prototype.equals = function(cross){
  if ((this.x === cross.x) && (this.y === cross.y) && (this.color === cross.color)){
    return true;
  }
  return false;
};

Cross.prototype.getInfo = function(){
  return "cross: " + this.x +"/" + this.y + "/" + this.color;
};

var crosses = [
  new Cross(3, 5, "red"),
  new Cross(16, 5, "blue")
];
var canvas = document.getElementById('stipat');
var context = canvas.getContext('2d');

var crosses = [];

canvas.width = document.body.clientWidth;
canvas.height = document.body.clientHeight;

var stitchwidth = 10;
var stichDiff = stitchwidth/7;
context.lineWidth = stitchwidth/4;

context.lineCap = 'round';

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

$(".sliderText").html("cross size: "+stitchwidth+" px");
$(".sliderBall").css("margin-left", stitchwidth+"px");
//$(".slider").slider();

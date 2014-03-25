/*jslint browser: true*/
/*global $, jQuery, stitchwidth, drawCrosses, canvas, drawing, posToCross, getMousePos, lastCross, saveAs, setCross, context */

window.onload = function () {

  $("#stipat").css("background-size", stitchwidth + "px");

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
  canvas.addEventListener('mousemove', function (evt) {
    event.preventDefault();
    //console.log("move");
    if (drawing) {
      //console.log("draw");
      var currentCross = posToCross(getMousePos(canvas, evt));
      if (!lastCross.equals(currentCross)) {
        lastCross = currentCross;
        setCross(lastCross);
      }
    }
  }, false);

  canvas.addEventListener('mousedown', function (evt) {
    //console.log("down");
    drawing = true;
    //console.log("mouse= " + getMousePos(canvas, evt).x + "/" + getMousePos(canvas, evt).y);
    lastCross = posToCross(getMousePos(canvas, evt));
    setCross(lastCross);
  }, false);

  canvas.addEventListener('mouseup', function (evt) {
    //console.log("up");
    drawing = false;
  }, false);

  // -----------------Slider
  var sliderDragging = false, sliding = false, delta;

  $('.sliderBall').mousedown(function () {
    console.log('slider click');
    sliding = true;
  });
  $('#sizeSlider').mousemove(function (evt){
    if (sliding){
      console.log("sliding");
      //var set_perc = ((((event.clientX - bar.offsetLeft) / bar.offsetWidth)).toFixed(2));
      //$("elementA").offset().top - $("elementB").offset().top;
      //console.log("client: " + evt.clientX);
      delta = evt.clientX - 6 - $('#sizeSlider').offset().left;
      stitchwidth = (delta < 148) ? delta : 148;
      if (stitchwidth < 5) stitchwidth = 5;
      //console.log(delta);
      $(".sliderBall").css("margin-left", stitchwidth+"px");
      $("#stipat").css("background-size", stitchwidth + "px");
      console.log('slider dragging'); 
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.lineWidth = stitchwidth / 4;
      $(".sliderText").html("cross size: "+stitchwidth+" px")
      drawCrosses();
    }
  });
  $(window).mouseup(function () {
    console.log("slider un-click");
    sliding = false;
  });


  $(window).bind("resize", function () {
    canvas.width = $(window).width();
    canvas.height = $(window).height();
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.lineWidth = stitchwidth / 4;
    context.lineCap = 'round';
    drawCrosses();
  });

  $("#saveButton").click(function () {
    canvas.toBlob(function (blob) {
      saveAs(blob, "CrossStitchJS.png");
    });
  });

  $("#clearButton").click(function () {
    context.clearRect(0, 0, canvas.width, canvas.height);
    crosses = [];
  });

};
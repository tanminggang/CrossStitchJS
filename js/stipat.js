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
    console.log("move");
    if (drawing) {
      console.log("draw");
      var currentCross = posToCross(getMousePos(canvas, evt));
      if (!lastCross.equals(currentCross)) {
        lastCross = currentCross;
        setCross(lastCross);
      }
    }
  }, false);

  canvas.addEventListener('mousedown', function (evt) {
    console.log("down");
    drawing = true;
    console.log("mouse= " + getMousePos(canvas, evt).x + "/" + getMousePos(canvas, evt).y);
    lastCross = posToCross(getMousePos(canvas, evt));
    setCross(lastCross);
  }, false);

  canvas.addEventListener('mouseup', function (evt) {
    console.log("up");
    drawing = false;
  }, false);

  // -----------------Slider
  var sliderDragging = false;

  $('.sliderBall').mousedown(function () {
    console.log('slider click');
    $(window).mousemove(function () {
      sliderDragging = true;
      $(window).unbind("mousemove");
      stitchwidth++;
      $(".sliderBall").css("margin-left", stitchwidth+"px");
      console.log('slider dragging');
    });
  }).mouseup(function () {
    var wasDragging = sliderDragging;
    sliderDragging = false;
    $(window).unbind("mousemove");
    if (!wasDragging) { //was clicking
      console.log('slider just a click');
    }
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
    // var myImage = canvas.toDataURL();
    // //document.getElementById('canvasImg').src = dataURL;
    // var imageElement = document.getElementById("stipat");
    // imageElement.src = myImage;
    canvas.toBlob(function (blob) {
      saveAs(blob, "pretty image.png");
    });
  });

  $("#clearButton").click(function () {
    context.clearRect(0, 0, canvas.width, canvas.height);
    crosses = [];
  });

};
window.addEventListener("load", start, true);

var squareContainer = null;
var svg = null;

function start() {
  squareContainer = document.querySelector(".square-container");
  svg = document.querySelector("svg");
  spinCircle();
}

function spinCircle() {
  var rotation = 360;

  squareContainer.style.transform = "rotate(" + rotation + "deg)";

  setInterval(function() {
    rotation += 360;
    svg.classList.toggle("open");
    squareContainer.style.transform = "rotate(" + rotation + "deg)";
  }, 800);
}

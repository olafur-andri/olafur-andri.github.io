window.addEventListener('load', start, true);

var circle = document.querySelector(".circle");
var counter = 0;

function start() {
  requestAnimationFrame(update);
}

function update() {
  var requestId = requestAnimationFrame(update);

  if (counter % 4 === 0) {
    counter++;
    return;
  }

  var scale = 1;
  rnd = Math.floor(Math.random() * 11);
  
  if (rnd > 5) {
    scale += 0.015;
  } else {
    scale -= 0.015;
  }

  circle.style.transform = `scale(${scale})`;
  counter++;
}
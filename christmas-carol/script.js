window.addEventListener("load", function() {
  var logo = document.getElementById("logo");
  var cursor = document.getElementById("cursor");
  var container = document.querySelector(".container");
  var bells = document.getElementById("bells");
  var audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  var oscillator = audioCtx.createOscillator();
  var gainNode = audioCtx.createGain();

  // Fade in for logo
  setTimeout(function() {
    logo.classList.add("visible");

    setTimeout(function() {
      container.removeChild(logo);
    }, 3000);
  }, 1000);

  // Dynamic cursor opacity changes
  cursor.classList.add("invisible");

  cursor.addEventListener("transitionend", function() {
    setTimeout(function() {
      cursor.classList.toggle("invisible");
    }, 200);
  }, true);

  // Playing sounds with the Web Sound API
  var dogBarkingBuffer = null;
  // Fix up prefixing
  window.AudioContext = window.AudioContext || window.webkitAudioContext;
  var context = new AudioContext();
  loadDogSound("https://olafur-andri.github.io/christmas-carol/sounds/bells.mp3");

  function loadDogSound(url) {
    var request = new XMLHttpRequest();
    request.open('GET', url, true);
    request.responseType = 'arraybuffer';

    // Decode asynchronously
    request.onload = function() {
      context.decodeAudioData(request.response, function(buffer) {
        dogBarkingBuffer = buffer;
      });
    }
    request.send();
  }
}, true);

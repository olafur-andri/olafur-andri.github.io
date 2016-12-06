window.addEventListener("load", function() {
  var logo = document.getElementById("logo");
  var cursor = document.getElementById("cursor");
  var container = document.querySelector(".container");

  // Fade in for logo
  setTimeout(function() {
    logo.classList.add("visible");

    setTimeout(function() {
      container.removeChild(logo);
    }, 3000);
  }, 1000);

  cursor.classList.add("invisible");

  cursor.addEventListener("transitionend", function() {
    setTimeout(function() {
      cursor.classList.toggle("invisible");
    }, 200);
  }, true);

}, true);

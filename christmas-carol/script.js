window.addEventListener("load", function() {
  var logo = document.getElementById("logo");
  var cursor = document.getElementById("cursor");

  logo.classList.add("visible");
  cursor.classList.add("invisible");

  cursor.addEventListener("transitionend", function() {
    setTimeout(function() {
      cursor.classList.toggle("invisible");
    }, 200);
  }, true);
}, true);

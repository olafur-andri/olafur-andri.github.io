window.addEventListener("load", function() {
  var languagesButton = document.getElementById("languages");
  var footer = document.querySelector(".footer");
  var footerContent = document.querySelector(".footer-content");

  languagesButton.addEventListener("click", function(e) {
    e.preventDefault();

    this.classList.toggle("grow");
    footerContent.classList.toggle("make-visible");
  }, true);
}, true);

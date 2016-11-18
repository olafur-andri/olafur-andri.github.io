window.addEventListener("load", function() {
  var languagesButton = document.getElementById("languages");
  var footer = document.querySelector(".footer");
  var footerContent = document.querySelector(".footer-content");
  var footerIcon = document.querySelector(".footer i");
  var hamburger = document.querySelector(".navbar-header i");
  var navbar = document.querySelector(".navbar");
  var navbarContent = document.querySelector(".navbar-content");
  var icelandic = document.getElementById("icelandic");
  var footerIconText = "";
  var counter = 1;

  languagesButton.addEventListener("click", function(e) {
    footerIconText = footerIcon.textContent;

    e.preventDefault();
    this.classList.toggle("grow");
    footerContent.classList.toggle("make-visible");
  }, true);

  hamburger.addEventListener("click", function(e) {
    e.preventDefault();
    navbarContent.classList.toggle("make-visible");
    navbar.classList.toggle("grow");
  }, true);

  icelandic.addEventListener("click", function() {
    
  }, true);
}, true);

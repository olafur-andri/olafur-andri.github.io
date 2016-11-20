window.addEventListener("load", function() {
  var main = document.querySelector("main.main");
  var languagesButton = document.getElementById("languages");
  var footer = document.querySelector(".footer");
  var footerContent = document.querySelector(".footer-content");
  var footerIcon = document.querySelector(".footer i");
  var hamburger = document.querySelector(".navbar-header i");
  var navbar = document.querySelector(".navbar");
  var navbarContent = document.querySelector(".navbar-content");
  var icelandic = document.getElementById("icelandic");
  var english = document.getElementById("english")
  var englishContent = document.querySelectorAll(".english");
  var icelandicContent = document.querySelectorAll(".icelandic");
  var counter = 1;
  var englishText = [];

  for (var i = 0; i < englishContent.length; i++) {
    englishText[i] = englishContent[i].textContent;
  }

  main.addEventListener("click", function() {
    navbar.classList.remove("grow");
    navbarContent.classList.remove("make-visible");
  }, true);

  languagesButton.addEventListener("click", function(e) {
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
    languagesButton.classList.remove("grow");
    footerContent.classList.remove("make-visible");
    english.classList.remove("disabled");
    icelandic.classList.add("disabled");

    for (var i = 0; i < englishContent.length; i++) {
      englishContent[i].classList.add("fade-out");
    }

    setTimeout(function() {
      for (var i = 0; i < englishContent.length; i++) {
        englishContent[i].textContent = icelandicContent[i].textContent;
        englishContent[i].classList.remove("fade-out");
      }
    }, 400);
  }, true);

  english.addEventListener("click", function() {
    languagesButton.classList.remove("grow");
    footerContent.classList.remove("make-visible");
    english.classList.add("disabled");
    icelandic.classList.remove("disabled");

    for (var i = 0; i < englishContent.length; i++) {
      englishContent[i].classList.add("fade-out");
    }

    setTimeout(function() {
      for (var i = 0; i < englishContent.length; i++) {
        englishContent[i].textContent = englishText[i];
        englishContent[i].classList.remove("fade-out");
      }
    }, 500);
  }, true);
}, true);

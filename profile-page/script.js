window.addEventListener("load", function(e) {
  var target = null;
  var languagesFab = document.querySelector(".fab#languages");
  var languagesIcon = document.querySelector("#languages i");
  var menuIcon = document.querySelector(".navbar i");
  var navbar = document.querySelector(".navbar");
  var navbarContent = document.querySelector(".navbar-content");
  var navbarContentUl = document.querySelector(".navbar-content ul");

  document.addEventListener("touchstart", function(e) {
    target = e.target;

    switch (target) {
      case languagesFab:
        languagesFabOnStart(e);
        break;
      case menuIcon:
        menuIconOnStart();
        break;
    }
  }, true);

  function languagesFabOnStart(e) {
    e.preventDefault();

    languagesIcon.classList.add("fade");
    //languagesFab.classList.add("grow");
  }

  function menuIconOnStart() {
    navbar.classList.toggle("active");
    navbarContent.classList.toggle("grow");
    navbarContentUl.classList.toggle("visible");
  }
}, true);

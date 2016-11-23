window.addEventListener("load", function(e) {
  var hamburger = document.getElementById("hamburger");
  var hamburgerBackground = document.getElementById("hamburger_background");
  var sideNav = document.getElementById("side_nav");
  var sideNavClose = document.getElementById("side_nav_close");

  hamburger.addEventListener("touchstart", function(e) {
    hamburgerOnStart(e);
  }, true);
  hamburger.addEventListener("click", function(e) {
    hamburgerOnStart(e);
  }, true);

  function hamburgerOnStart(e) {
    e.preventDefault();
    hamburgerBackground.classList.toggle("visible");
    sideNav.classList.toggle("visible");
  }

  sideNavClose.addEventListener("touchstart", function(e) {
    sideNavCloseOnStart(e);
  }, true);
  sideNavClose.addEventListener("click", function(e) {
    sideNavCloseOnStart(e);
  }, true);

  function sideNavCloseOnStart(e) {
    e.preventDefault();
    sideNav.classList.remove("visible");
    hamburgerBackground.classList.remove("visible");
  }
}, true);

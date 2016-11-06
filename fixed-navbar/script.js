window.addEventListener("load", function() {
  var hamburger = document.getElementById("hamburger");
  var target = null;
  var sideNav = document.querySelector(".side-navbar");
  var sideNavHeader = document.querySelector(".side-navbar__header");
  var button = document.querySelectorAll(".btn");
  var obfuscator = document.querySelector(".obfuscator");
  var close = document.getElementById("close");
  var requestId = null;
  var startX = 0;
  var currentX = 0;
  var transformX = 0;
  var isDragging = false;

  console.log("window loaded");

  document.addEventListener("touchstart", function (e) {
    target = e.target;

    switch (target) {
      case hamburger:
        hamburgerOnClick();
        break;
      case close:
        closeOnClick();
        break;
      case sideNav:
      case sideNavHeader:
        sideNavOnClick(e);
        break;
      case obfuscator:
        obfuscatorOnClick();
        break;
    }
  }, true);

  function hamburgerOnClick () {
    hamburger.classList.add("clicked");
    sideNav.classList.remove("closed");
    sideNav.style.transform = "translateX(0)";
    sideNav.style.transition = "transform 400ms ease";
    obfuscator.classList.add("active");

    setTimeout(function () {
      sideNav.style.transition = "initial";
      hamburger.style.pointerEvents = "none";
    }, 600);
  }

  function closeOnClick () {
    cancelAnimationFrame(requestId);
    sideNav.style.transform = "translateX(-102%)";
    sideNav.style.transition = "transform 400ms ease";
    hamburger.style.pointerEvents = "initial";
    obfuscator.classList.remove("active");
  }

  function sideNavOnClick (e) {
    e.preventDefault();

    sideNav.style.transition = "initial";
    startX = e.touches[0].pageX;
    currentX = startX;
    isDragging = true;
    requestAnimationFrame(update);
  }

  function obfuscatorOnClick () {
    obfuscator.classList.remove("active");
    cancelAnimationFrame(requestId);
    sideNav.style.transform = "translateX(-102%)";
    sideNav.style.transition = "transform 400ms ease";
    hamburger.style.pointerEvents = "auto";
  }

  document.addEventListener("touchmove", function (e) {
    switch (target) {
      case sideNav:
        sideNavOnMove(e);
        break;
    }
  }, true);

  function sideNavOnMove (e) {
    currentX = e.touches[0].pageX;
  }

  document.addEventListener("touchend", function (e) {
    switch (target) {
      case hamburger:
        hamburgerOnEnd();
        break;
      case sideNav:
        sideNavOnEnd();
        break;
    }
  }, true);

  function hamburgerOnEnd () {
    hamburger.classList.remove("clicked");
  }

  function sideNavOnEnd() {
    isDragging = false;
    setTimeout(function () {
      cancelAnimationFrame(requestId);
    }, 400);
  }

  function update () {
    requestId = requestAnimationFrame(update);

    if (isDragging) {
      transformX = currentX - startX;
    } else {
     if (Math.abs(transformX) > 100) {
       transformX = (0 - 310);
       sideNav.style.transition = "transform 400ms ease";
       obfuscator.classList.remove("active");

        setTimeout(function () {
          hamburger.style.pointerEvents = "initial";
          cancelAnimationFrame(requestId);
        }, 500);
      } else {
        transformX += (0 - transformX) / 5;
      }
    }

    if (!(transformX <= 0)) {
      return;
    }

    sideNav.style.transform = `translateX(${transformX}px)`;

  }

  for (var i = 0; i < button.length; i++) {
    button[i].ontouchstart = function(e) {
      var newRipple =
      document.createElement("span");
      newRipple.className = "ripple";
      var x = e.targetTouches[0].clientX;
      var y = e.targetTouches[0].clientY;
      var btnOffset = this.getBoundingClientRect();
      this.insertBefore(newRipple);

      setTimeout(function() {
        newRipple.style.left = ((x - 40) - btnOffset.left) + "px";
        newRipple.style.top = ((y - 40) - btnOffset.top) + "px";
        newRipple.classList.add("grow");

        setTimeout(function() {
          newRipple.classList.remove("grow");
        }, 5000);
      }, 1);
    }
  }
}, true);

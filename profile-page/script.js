'use strict';

document.addEventListener("DOMContentLoaded", function() {
  var wrapper = document.querySelector(".wrapper");
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
  var cards = document.querySelectorAll(".card");
  var cardObfuscators = document.querySelectorAll(".card .obfuscator");
  var thumbnails = document.querySelectorAll(".card .header .thumbnail");
  var counter = 1;
  var englishText = [];
  var icelandicText = [];
  var db;
  var idbSupported = false;
  var languageSelection = {
    icelandic: false
  }
  var numRows = 0;
  var isIcelandic = false;

  // Get all English and Icelandic text
  for (var i = 0; i < englishContent.length; i++) {
    englishText[i] = englishContent[i].textContent;
    icelandicText[i] = icelandicContent[i].textContent;
  }

  // IndexedDB for language selections
  if ("indexedDB" in window) {
    console.log("indexedDB supported");
    idbSupported = true;
  } else {
    console.log("indexedDB not supported");
    alert("Your browser does not support indexed databases, meaning you might have difficulties with the language selection");
    idbSupported = false;
  }

  if (idbSupported) {
    var openRequest = indexedDB.open("olafur", 2);

    openRequest.onupgradeneeded = function(e) {
      console.log("Upgrading and creating object stores...");
      db = e.target.result;

      if (!db.objectStoreNames.contains("languages")) {
        db.createObjectStore("languages", { autoIncrement: true });
      }
    }

    openRequest.onsuccess = function(e) {
      console.log("Open request was a success!");
      db = e.target.result;
      var transaction = db.transaction(["languages"], "readonly");
      var store = transaction.objectStore("languages");
      var request = store.count();

      request.onsuccess = function(e) {
        numRows = e.target.result;

        request = store.get(numRows);

        request.onsuccess = function(e) {
          var results = e.target.result;
          try {
            isIcelandic = results.icelandic;
            console.dir(isIcelandic);
          } catch (e) {

          }

          if (isIcelandic) {
            for (var i = 0; i < englishContent.length; i++) {
              englishContent[i].textContent = icelandicText[i];
            }

            english.classList.remove("disabled");
            icelandic.classList.add("disabled");
          }
        };

        request.onerror = function(e) {
          console.log("Error", e);
        }
      }
    }

    openRequest.onerror = function(e) {
      console.log("Error");
      console.dir(e);
    }
  }

  // Make the wrapper fade-in on load
  setTimeout(function() {
    wrapper.classList.add("visible");
  }, 100);

  // Service Worker!!!
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("/profile-page/sw.js").then(function(registration) {
      // Registration was successful
      console.log("ServiceWorker registration successful with scope: ", registration.scope);
    }).catch(function(err) {
      // Registration failed :(
      console.log("ServiceWorker registration failed: ", err);
    });
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

    // Update DB
    var transaction = db.transaction(["languages"], "readwrite");
    var store = transaction.objectStore("languages");
    languageSelection.icelandic = true;
    var request = store.add(languageSelection);

    request.onerror = function(e) {
      console.log("Error", e.target.error.name);
      // Some type of error handler
    }

    request.onsuccess = function(e) {
      console.log("Icelandic changed to: " + languageSelection.icelandic);
    }
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

    languageSelection.icelandic = false;
    var transaction = db.transaction(["languages"], "readwrite");
    var store = transaction.objectStore("languages");
    var request = store.add(languageSelection);

    request.onsuccess = function(e) {
      console.log("Icelandic changed to false");
    }
  }, true);

  var thumbnails = document.querySelectorAll(".thumbnail");
  /*
  for (var i = 0; i < thumbnails.length; i++) {
    thumbnails[i].addEventListener("load", function() {
      this.classList.add("visible");
    }, true);
  }
  */

  // Portfolio images fade-in
  requestAnimationFrame(imagesOnLoad);

  function imagesOnLoad() {
    var requestId = requestAnimationFrame(imagesOnLoad);
    var loaded = [];
    var counter = 0;

    for (var i = 0; i < thumbnails.length; i++) {
      loaded[i] = false;
    }

    for (var i = 0; i < thumbnails.length; i++) {
      if (thumbnails[i].complete) {
        thumbnails[i].classList.add("visible");
        loaded[i] = true;
      } else {
        loaded[i] = false;
      }
    }

    for (var i = 0; i < loaded.length; i++) {
      if (loaded[i] == true) {
        counter++;
      }
    }

    if (counter == 3) {
      cancelAnimationFrame(requestId);
    }
  }

  if ("object-fit" in thumbnails[0].style) {
    alert(true);
  } else {
    alert(false);
  }
}, true);

window.addEventListener("load", function() {
  var logo = document.getElementById("logo");
  var cursor = document.getElementById("cursor");
  var container = document.querySelector(".container");
  var wrapper = document.querySelector(".wrapper");
  var bells = document.getElementById("bells");
  var text = document.createElement("P");
  var content = "Þessi saga fjallar um fjölskyldu sem býr í Lóuási 20 er lendir í jólaævintýri. Meðlimir hennar læra meira um sjálfa sig eftir á og kynnast betur þeirra hlutverkum innan fjölskyldunnar.";
  var counter = 0;
  var scene = 0;

  // Preperations for text
  text.id = "story";
  // text.innerHTML = "&bdquo;&rdquo;";

  // Fade in for logo
  setTimeout(function() {
    logo.classList.add("visible");

    setTimeout(function() {
      container.removeChild(logo);

      setTimeout(function() {
        wrapper.style.display = "block";
        container.style.display = "block";
        container.insertBefore(text, null);

        setTimeout(function() {
          text.classList.add("visible");

          type();
        }, 200);
      }, 900);
    }, 3000);
  }, 1000);

  // Dynamic cursor opacity changes
  cursor.classList.add("invisible");

  cursor.addEventListener("transitionend", function() {
    setTimeout(function() {
      cursor.classList.toggle("invisible");
    }, 200);
  }, true);

  bells.play();

  function type() {
    text.innerHTML += content.substring(counter, (counter + 1));

    if (counter < content.length) {
      setTimeout(function() {
        type();
      }, 40);
    } else {
      scene++;
    }

    if (scene === 1) {
      var space = document.createElement("P");
      space.id = "space";
      space.textContent = "Press space or touch screen to continue...";

      text.appendChild(space, null);

      setTimeout(function() {
        space.classList.add("visible");
      }, 2000);
    }

    counter++;
  }

  document.addEventListener("keypress", function(e) {
    if (e.keyCode === 32) {
      wrapper.classList.add("fade-out");
    }
  }, true);

  document.addEventListener("touchstart", function() {
    wrapper.classList.add("fade-out");
  }, true);
}, true);

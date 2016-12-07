window.addEventListener("load", function() {
  var logo = document.getElementById("logo");
  var cursor = document.getElementById("cursor");
  var container = document.querySelector(".container");
  var wrapper = document.querySelector(".wrapper");
  var bells = document.getElementById("bells");
  var windHowling = document.getElementById("wind_howling");
  var clickSound = document.getElementById("click");
  var adventureMusic = document.getElementById("adventure");
  var text = document.createElement("P");

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
        windHowling.play();

        setTimeout(function() {
          text.classList.add("visible");
          type(text, "Saga þessi fjallar um fjölskyldu sem býr í Lóuási 20 er lendir í jólaævintýri. Meðlimir hennar læra meira um sjálfa sig eftir á og kynnast betur þeirra hlutverkum innan fjölskyldunnar.", 0, function() {
            /**********************************************************
             HEYYYYY
            ***********************************************************/
            var space = document.createElement("P");
            space.id = "space";
            space.textContent = "Press space or touch screen to continue...";

            text.appendChild(space, null);

            setTimeout(function() {
              space.classList.add("visible");

              document.addEventListener("touchstart", scene1EventListener, true);
              document.addEventListener("keypress", scene1EventListener, true);
            }, 2000);
          });
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

  wrapper.addEventListener("transitionend", function(e) {
    if (e.target !== this) {
      return;
    }

    scene2();
  }, true);

  function scene1EventListener(e) {

    if (!e.keyCode) {
      wrapper.classList.add("fade-out");
      clickSound.play();
    } else {

      if (e.keyCode === 32) {
        wrapper.classList.add("fade-out");
        clickSound.play();
      }
    }
  }

  function scene2() {
    // Remove document event listeners!!!
    document.removeEventListener("touchstart", scene1EventListener, true);
    document.removeEventListener("keypress", scene1EventListener, true);

    // Change background
    wrapper.style.backgroundColor = "#4CAF50";

    // Delete all child element of the container
    container.innerHTML = "";

    // Fade wrapper in again and play song!!
    setTimeout(function() {
      wrapper.classList.remove("fade-out");
      adventureMusic.play();
    }, 400);

    // Create another paragraph and type() content
    var text = document.createElement("P");
    text.id = "story";
    container.insertBefore(text, null);

    setTimeout(function() {
      text.classList.add("visible");

      setTimeout(function() {
        type(text, "Fjölskyldumeðlimirnir eru sex talsins. Ein mamma, einn pabbi, þrír synir og þar á meðal, einn hundur. Öll sátu þau í hring og héldu sér kvöldstund.", 0, function() {
          console.log("Búinn að skrifa!");
          console.log("Hananú");
        });
      }, 200);
    }, 1000);
  }

  function type(element, content, counter, callback) {
    var char = content.substring(counter, (counter + 1));
    element.innerHTML += char;

    if (counter < (content.length - 1)) {
      if (char === ".") {
        setTimeout(function() {
          type(element, content, counter, callback);
        }, 800);
      } else {
        setTimeout(function() {
          type(element, content, counter, callback);
        }, 40);
      }
      counter++;
    } else {
      counter = 0;
      callback();
      return;
    }
  }
}, true);

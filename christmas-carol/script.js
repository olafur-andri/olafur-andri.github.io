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
  var i = 0;

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
    i++;

    if (i === 2) {
      return;
    }

    console.log("Scene over");

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
    text = document.createElement("P");
    text.id = "story";
    container.insertBefore(text, null);

    setTimeout(function() {
      text.classList.add("visible");
    }, 1000);

    setTimeout(function() {
     type(text, "Fjölskyldumeðlimirnir eru sex talsins. Ein mamma, einn pabbi, þrír synir og þar á meðal, einn hundur. Tveir sonanna eru tvíburabræður. Á þeim tiltekna degi sem sagan gerist var fjölskyldan mjög upptekin. Mamman var á ferð út um allt hús að þrífa allt sem hún fann. Pabbinn var að róta í gegnum allt dótið sitt inni í bílskúr til að finna fjöltengi. Einn tvíburanna var hlustandi á tónlist á fullu en hinn að forrita eins og enginn væri morgundagurinn. Yngsti bróðirinn var á fullu að leika sér að tölvuleikjum og vera truflaður af fjölskylduhundinum.", 0, scene2Paragraph2);
    }, 1200);
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
      callback();
      counter = 0;
      return;
    }
  }

  function scene2Paragraph2() {
    // Test for debugging
    console.log("Búinn að skrifa!");

    // Create another paragraph and type() content
    var text2 = document.createElement("P");
    text2.id = "story";
    container.appendChild(text2, null);

    setTimeout(function() {
      text2.classList.add("visible");
    }, 200);

    setTimeout(function() {
      type(text2, "Að loknu þrifi stekkur mamman upp og stingur upp á að allir komi sér saman í hring og haldi smá kvöldstund.", 0, scene2Choice);
    }, 1000);
  }

  function scene2Choice() {
    // Create container
    var choiceContainer = document.createElement("DIV");
    choiceContainer.classList.add("container");
    var noButton = document.createElement("BUTTON");
    var yesButton = document.createElement("BUTTON");
    var fartButton = document.createElement("BUTTON");
    var answer = document.createElement("P");

    noButton.classList.add("choice");
    yesButton.classList.add("choice");
    fartButton.classList.add("choice");
    answer.id = "story";

    noButton.textContent = "Tökum ekki þátt";
    yesButton.textContent = "Tökum smá kvöldstund";
    fartButton.textContent = "Borðum fullt af nammi";

    noButton.style.color = "#4CAF50";
    yesButton.style.color = "#4CAF50";
    fartButton.style.color = "#4CAF50";

    container.appendChild(choiceContainer);
    container.appendChild(answer);
    choiceContainer.appendChild(noButton);
    choiceContainer.appendChild(yesButton);
    choiceContainer.appendChild(fartButton);

    setTimeout(function() {
      noButton.classList.add("visible");
      yesButton.classList.add("visible");
      fartButton.classList.add("visible");
      answer.classList.add("visible");

      noButton.addEventListener("click", scene2NoButton, true);
      yesButton.addEventListener("click", scene2YesButton, true);
      fartButton.addEventListener("click", scene2FartButton, true);
    }, 1000);

    function scene2NoButton() {

      // Fade out buttons
      noButton.classList.remove("visible");
      yesButton.classList.remove("visible");
      fartButton.classList.remove("visible");

      // Type content to paragraph
      setTimeout(function() {
        type(answer, "Það verður ákveðið að halda ekki kvöldstund. Mamman stendur þó fast á sínu og skipar öllum að koma sér í hring.", 0, function() {
          console.log("Þú valdir nei");
        });
      }, 1000);
    }
  }
}, true);

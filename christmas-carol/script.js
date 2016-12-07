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
            addSpace(1);
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

  /*function scene1EventListener(e) {

    if (!e.keyCode) {
      wrapper.classList.add("fade-out");
      clickSound.play();
    } else {

      if (e.keyCode === 32) {
        wrapper.classList.add("fade-out");
        clickSound.play();
      }
    }
  }*/

  function sceneTwo(e) {
    if (e.keyCode !== 32) {
      return;
    }
    console.log("Scene 2 ready");
    clickSound.play();

    // Remove document event listeners!!!
    document.removeEventListener("keypress", sceneTwo, true);

    wrapper.classList.add("fade-out");

    setTimeout(function() {
      wrapper.style.backgroundColor = "#4CAF50";
      container.innerHTML = "";

      setTimeout(function() {
        wrapper.classList.remove("fade-out");
        adventureMusic.play();

        setTimeout(function() {
          var text = document.createElement("P");

          text.classList.add("story");
          container.appendChild(text, null);

          setTimeout(function() {
            text.classList.add("visible");
            type(text, "Fjölskyldumeðlimirnir eru sex talsins. Ein mamma, einn pabbi, þrír synir og þar á meðal, einn hundur. Tveir sonanna eru tvíburabræður. Á þeim tiltekna degi sem sagan gerist var fjölskyldan mjög upptekin. Mamman var á ferð út um allt hús að þrífa allt sem hún fann. Pabbinn var að róta í gegnum allt dótið sitt inni í bílskúr til að finna fjöltengi. Einn tvíburanna var hlustandi á tónlist á fullu en hinn að forrita eins og enginn væri morgundagurinn. Yngsti bróðirinn var á fullu að leika sér að tölvuleikjum og vera truflaður af fjölskylduhundinum.", 0, sceneTwoParagraph2);
          }, 200);
        }, 1000);
      }, 200);
    }, 500);
  }

  function type(element, content, counter, callback) {
    var char = content.substring(counter, (counter + 1));
    element.innerHTML += char;

    if (counter < (content.length - 1)) {
      if (char === ".") {
        setTimeout(function() {
          type(element, content, counter, callback);
        }, 400);
      } else {
        setTimeout(function() {
          type(element, content, counter, callback);
        }, 20);
      }
      counter++;
    } else {
      callback();
      counter = 0;
    }
  }

  function sceneTwoParagraph2() {
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
      type(text2, "Að loknu þrifi stekkur mamman upp og stingur upp á að allir komi sér saman í hring og haldi smá kvöldstund.", 0, sceneTwoChoice);
    }, 1000);
  }

  function sceneTwoChoice() {
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

    noButton.textContent = "(1) Tökum ekki þátt";
    yesButton.textContent = "(2) Tökum smá kvöldstund";
    fartButton.textContent = "(3) Borðum fullt af nammi";

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

      noButton.addEventListener("click", sceneTwoNoButton, true);
      document.addEventListener("keypress", sceneTwoKeypress, true);
      yesButton.addEventListener("click", sceneTwoYesButton, true);
      fartButton.addEventListener("click", sceneTwoFartButton, true);
    }, 1000);

    function sceneTwoKeypress(e) {
      if (e.keyCode === 49) {
        sceneTwoNoButton();
      } else if (e.keyCode === 50) {
        sceneTwoYesButton();
      } else if (e.keyCode === 51) {
        sceneTwoFartButton();
      }
    }

    function sceneTwoNoButton() {

      // Fade out buttons
      noButton.classList.remove("visible");
      yesButton.classList.remove("visible");
      fartButton.classList.remove("visible");

      // Type content to paragraph
      setTimeout(function() {
        type(answer, "Það verður ákveðið að halda ekki kvöldstund. Mamman stendur þó fast á sínu og fær fjölskyldu sína til að skipta um skoðun. Þið haldið þá kvöldstund eftir allt saman.", 0, function() {
          addSpace(2);
        });
      }, 1000);

      // Remove all event listeners!!
      noButton.removeEventListener("click", sceneTwoNoButton, true);
      document.removeEventListener("keypress", sceneTwoKeypress, true);
      yesButton.removeEventListener("click", sceneTwoYesButton, true);
      fartButton.removeEventListener("click", sceneTwoFartButton, true);
    }

    function sceneTwoYesButton() {

      // Fade out buttons
      noButton.classList.remove("visible");
      yesButton.classList.remove("visible");
      fartButton.classList.remove("visible");

      // Type content to paragraph
      setTimeout(function() {
        type(answer, "Þið eruð öll samtaka þessari góðri hugmynd og eru spennt fyrir því að fá að setjast niður og spjalla saman. Til allra hamingju er boðið upp á nammi með og er kvöldstundin skemmtileg.", 0, function() {
          addSpace(2);
        });
      }, 1000);

      // Remove all event listeners!!
      noButton.removeEventListener("click", sceneTwoNoButton, true);
      document.removeEventListener("keypress", sceneTwoKeypress, true);
      yesButton.removeEventListener("click", sceneTwoYesButton, true);
      fartButton.removeEventListener("click", sceneTwoFartButton, true);
    }

    function sceneTwoFartButton() {

      // Fade out buttons
      noButton.classList.remove("visible");
      yesButton.classList.remove("visible");
      fartButton.classList.remove("visible");

      // Type content to paragraph
      setTimeout(function() {
        type(answer, "Meðlimir fjölskyldunnar ákveða að halda kvöldstundina en aðeins ef boðið eru upp á eitthvað gotterí með. Til allra hamingju er nóg til af nammi og er kvöldstundin fín.", 0, function() {
          addSpace(2);
        });
      }, 1000);

      // Remove all event listeners!!
      noButton.removeEventListener("click", sceneTwoNoButton, true);
      document.removeEventListener("keypress", sceneTwoKeypress, true);
      yesButton.removeEventListener("click", sceneTwoYesButton, true);
      fartButton.removeEventListener("click", sceneTwoFartButton, true);
    }
  }

  function addSpace(scene) {
    // Initiate space sequence!
    var space = document.createElement("P");
    space.id = "space";
    space.classList.add("story");
    space.textContent = "Press space or touch screen to continue...";

    container.appendChild(space, null);

    setTimeout(function() {
      space.classList.add("visible");
    }, 1000);

    // Add event listener for space relative to current scene
    switch (scene) {
      case 1:
        document.addEventListener("keypress", sceneTwo, true);
        break;
      case 2:
        document.addEventListener("keypress", sceneThree, true);
        break;
    }
  }

  function sceneThree(e) {

    if (e.keyCode !== 32) {
      return;
    }

    clickSound.currentTime = 0;
    clickSound.play();
    adventureMusic.pause();

    // Remove event listeners
    document.removeEventListener("keypress", sceneThree, true);

    wrapper.classList.add("fade-out");

    setTimeout(function() {
      wrapper.style.backgroundColor = "#000";
      container.innerHTML = "";

      setTimeout(function() {
        wrapper.classList.remove("fade-out");
      }, 500);
    }, 500);
  }
}, true);

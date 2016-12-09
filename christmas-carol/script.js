window.addEventListener("load", function() {
  var logo = document.getElementById("logo");
  var cursor = document.getElementById("cursor");
  var container = document.querySelector(".container");
  var wrapper = document.querySelector(".wrapper");
  var bells = document.getElementById("bells");
  var windHowling = document.getElementById("wind_howling");
  var clickSound = document.getElementById("click");
  var adventureMusic = document.getElementById("adventure");
  var lullabyMusic = document.getElementById("lullaby");
  var dangerMusic = document.getElementById("danger");
  var heroMusic = document.getElementById("hero");
  var fairyFountain = document.getElementById("fairy");
  var voyageMusic = document.getElementById("voyage");
  var endMusic = document.getElementById("end");
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
          type(text, "Saga þessi fjallar um fjölskyldu sem býr í Lóuási 20 er lendir í jólaævintýri. Meðlimir hennar læra meira um sjálfa sig eftir á og kynnast betur töfrum jólanna.", 0, function() {
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
            type(text, "Fjölskyldumeðlimirnir eru sex talsins. Ein mamma, einn pabbi, þrír synir og þar á meðal, einn hundur. Tveir sonanna eru tvíburabræður. Á þeim tiltekna degi sem sagan gerist var fjölskyldan mjög upptekin. Mamman var á ferð út um allt hús að þrífa hvað sem hún fann. Pabbinn var að róta í gegnum allt dótið sitt inni í bílskúr til að finna fjöltengi. Einn tvíburanna var hlustandi á tónlist á fullu en hinn að forrita eins og enginn væri morgundagurinn. Yngsti bróðirinn lék sér að tölvuleikjum og hundurinn svaf vært og rótt.", 0, sceneTwoParagraph2);
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

      document.addEventListener("keypress", sceneTwoKeypress, true);
      noButton.addEventListener("click", sceneTwoNoButton, true);
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
      // Play sound
      clickSound.currentTime = 0;
      clickSound.play();

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

      // Play sound
      clickSound.currentTime = 0;
      clickSound.play();

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

      // Play sound
      clickSound.currentTime = 0;
      clickSound.play();

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
      case 3:
        document.addEventListener("keypress", sceneFour, true);
        break;
      case 4:
        document.addEventListener("keypress", sceneFive, true);
        break;
      case 5:
        document.addEventListener("keypress", sceneSix, true);
        break;
      case 6:
        document.addEventListener("keypress", sceneSeven, true);
        break;
      case 7:
        document.addEventListener("keypress", sceneEight, true);
        break;
      case 8:
        document.addEventListener("keypress", sceneNine, true);
        break;
      case 9:
        document.addEventListener("keypress", sceneTen, true);
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

    setTimeout(function() {
      lullabyMusic.play();
    }, 1000);

    // Remove event listeners!!
    document.removeEventListener("keypress", sceneThree, true);

    wrapper.classList.add("fade-out");

    setTimeout(function() {
      wrapper.style.backgroundColor = "#000";
      container.innerHTML = "";

      setTimeout(function() {
        wrapper.classList.remove("fade-out");

        scene3Paragraph1();
      }, 500);
    }, 500);
  }

  function scene3Paragraph1() {
    var text = document.createElement("P");

    text.classList.add("story");
    container.appendChild(text, null);

    setTimeout(function() {
      text.classList.add("visible");
      type(text, "Nú er kominn tími til að sofa. Það er áliðið og eftir góða kvöldstund er fjölskyldan orðin yfir sig þreytt. Allir taka til eftir sig og labba upp á efri hæð hússins. Þau bursta í sér tennurnar og klæða sig í náttföt. Yngsti sonurinn virðist þó eiga mjög erfitt með að fara að sofa...", 0, scene3Paragraph2);
    }, 200);
  }

  function scene3Paragraph2() {
    var text = document.createElement("P");
    text.classList.add("story");
    container.appendChild(text, null);

    setTimeout(function() {
      text.classList.add("visible");
      type(text, "Þeim tekst þó öllum að koma sér í rúmið.", 0, function() {
        addSpace(3);
      });
    }, 800);
  }

  function sceneFour(e) {

    if (e.keyCode !== 32) {
      return;
    }

    document.removeEventListener("keypress", sceneFour, true);

    clickSound.currentTime = 0;
    clickSound.play();
    lullabyMusic.pause();

    wrapper.classList.add("fade-out");

    setTimeout(function() {
      container.innerHTML = "";
      wrapper.style.backgroundColor = "#F44336";
      dangerMusic.play();

      setTimeout(function() {
        wrapper.classList.remove("fade-out");

        setTimeout(function() {
          var text = document.createElement("P");
          text.classList.add("story");
          container.appendChild(text, null);

          setTimeout(function() {
            text.classList.add("visible");
            type(text, "Lífið er samt ekki svo gott. Á neðri hæðinni heyrast einhver skringileg hljóð, eins og einhver sé þar... Fjölskyldan reynir að átta sig á hvað skyldi gera.", 0, scene4Choice);
          }, 200);
        }, 500);
      }, 500);
    }, 500);
  }

  function scene4Choice() {
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

    noButton.textContent = "(1) Gerum ekkert";
    yesButton.textContent = "(2) Kíkjum á þetta!";
    fartButton.textContent = "(3) Tökum kvöldstund til að ræða þetta";

    noButton.style.color = "#F44336";
    yesButton.style.color = "#F44336";
    fartButton.style.color = "#F44336";

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

      document.addEventListener("keypress", sceneFourKeypress, true);
      noButton.addEventListener("click", sceneFourNoButton, true);
      yesButton.addEventListener("click", sceneFourYesButton, true);
      fartButton.addEventListener("click", sceneFourFartButton, true);
    }, 1000);

    function sceneFourKeypress(e) {

      switch (e.keyCode) {
        case 49:
          sceneFourNoButton();
          break;
        case 50:
          sceneFourYesButton();
          break;
        case 51:
          sceneFourFartButton();
          break;
      }
    }

    function sceneFourNoButton() {
      clickSound.currentTime = 0;
      clickSound.play();

      document.removeEventListener("keypress", sceneFourKeypress, true);
      noButton.removeEventListener("click", sceneFourNoButton, true);
      yesButton.removeEventListener("click", sceneFourYesButton, true);
      fartButton.removeEventListener("click", sceneFourFartButton, true);

      noButton.classList.remove("visible");
      yesButton.classList.remove("visible");
      fartButton.classList.remove("visible");

      setTimeout(function() {
        type(answer, "Allir fjölskyldumeðlimirnir ákveða að gera ekkert í þessu... nema pabbinn! Hann stekkur niður og ætlar að góma innbrotsmanninn!!!! Allir aðrir verða svo fyrir áhrifum pabbans að þau hlaupa niður með honum.", 0, scene4Paragraph2);
      }, 1000);
    }

    function sceneFourYesButton() {
      clickSound.currentTime = 0;
      clickSound.play();

      document.removeEventListener("keypress", sceneFourKeypress, true);
      noButton.removeEventListener("click", sceneFourNoButton, true);
      yesButton.removeEventListener("click", sceneFourYesButton, true);
      fartButton.removeEventListener("click", sceneFourFartButton, true);

      noButton.classList.remove("visible");
      yesButton.classList.remove("visible");
      fartButton.classList.remove("visible");

      setTimeout(function() {
        type(answer, "Pabbinn er fyrstur til að koma sér niður til að kíkja á málið. Hinir fylgja eftir en þora alls ekki að fara á undan pabbanum.", 0, scene4Paragraph2);
      }, 1000);
    }

    function sceneFourFartButton() {
      clickSound.currentTime = 0;
      clickSound.play();

      document.removeEventListener("keypress", sceneFourKeypress, true);
      noButton.removeEventListener("click", sceneFourNoButton, true);
      yesButton.removeEventListener("click", sceneFourYesButton, true);
      fartButton.removeEventListener("click", sceneFourFartButton, true);

      noButton.classList.remove("visible");
      yesButton.classList.remove("visible");
      fartButton.classList.remove("visible");

      setTimeout(function() {
        type(answer, "Allir fjölskyldumeðlimirnir hringa sig saman og gefa sér tíma til að spjalla saman aftur. Þau fara yfir sálfræðileg viðhorf gagnvart þeim vanda sem þau standa fyrir og tjá sig með mikillri innlifun. Pabbinn vill ekki taka neinn þátt í þessu og stekkur upp í miðri tjáningu. Hann fer á harðaspretti niður stigann og ætlar að góma kauða! Hinir fylgja fast á eftir.", 0, scene4Paragraph2);
      }, 1000);
    }

    function scene4Paragraph2() {
      var text = document.createElement("P");
      text.classList.add("story");
      container.appendChild(text, null);

      setTimeout(function() {
        text.classList.add("visible");

        setTimeout(function() {
          type(text, ".......", 0, scene4Paragraph3);
        }, 900);
      }, 100);
    }

    function scene4Paragraph3() {
      var text = document.createElement("P");
      text.classList.add("story");
      container.appendChild(text, null);

      setTimeout(function() {
        text.classList.add("visible");

        setTimeout(function() {
          type(text, "Þau sjá einhvern skugga.. í horninu niðri í stofu... Þau labba upp að honum.. þau vita samt ekkert hvað skal gera.", 0, scene4Choice2);
        }, 900);
      }, 100);
    }

    function scene4Choice2() {
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

      noButton.textContent = "(1) Lemjum skuggann!";
      yesButton.textContent = "(2) Öskrum á hann!";
      fartButton.textContent = "(3) Förum aftur upp að sofa";

      noButton.style.color = "#F44336";
      yesButton.style.color = "#F44336";
      fartButton.style.color = "#F44336";

      container.appendChild(choiceContainer);
      choiceContainer.appendChild(noButton);
      choiceContainer.appendChild(yesButton);
      choiceContainer.appendChild(fartButton);

      setTimeout(function() {
        noButton.classList.add("visible");
        yesButton.classList.add("visible");
        fartButton.classList.add("visible");
        answer.classList.add("visible");

        document.addEventListener("keypress", sceneFourKeypress2, true);
        noButton.addEventListener("click", sceneFourNoButton2, true);
        yesButton.addEventListener("click", sceneFourYesButton2, true);
        fartButton.addEventListener("click", sceneFourFartButton2, true);
      }, 1000);

      function sceneFourKeypress2(e) {

        switch (e.keyCode) {
          case 49:
            sceneFourNoButton2();
            break;
          case 50:
            sceneFourYesButton2();
            break;
          case 51:
            sceneFourFartButton2();
            break;
        }
      }

      function sceneFourNoButton2() {
        clickSound.currentTime = 0;
        clickSound.play();

        document.removeEventListener("keypress", sceneFourKeypress2, true);
        noButton.removeEventListener("click", sceneFourNoButton2, true);
        yesButton.removeEventListener("click", sceneFourYesButton2, true);
        fartButton.removeEventListener("click", sceneFourFartButton2, true);

        noButton.classList.remove("visible");
        yesButton.classList.remove("visible");
        fartButton.classList.remove("visible");
        container.classList.add("fade-out");

        setTimeout(function() {
          container.innerHTML = "";
          container.appendChild(answer);

          setTimeout(function() {
            container.classList.remove("fade-out");
          }, 500);
        }, 500);

        setTimeout(function() {
          type(answer, "Pabbinn labbar upp að skugganum.. og lemur hann!!! Skugginn hefur ekki hugmynd um hvað kom yfir sig og fellur á jörðina með miklum dunk. \"Vá hvað hann er feitur!\" segir yngsti sonurinn og horfir furðulega á skuggann.", 0, function() {
            addSpace(4);
          });
        }, 1500);
      }

      function sceneFourYesButton2() {
        clickSound.currentTime = 0;
        clickSound.play();

        document.removeEventListener("keypress", sceneFourKeypress2, true);
        noButton.removeEventListener("click", sceneFourNoButton2, true);
        yesButton.removeEventListener("click", sceneFourYesButton2, true);
        fartButton.removeEventListener("click", sceneFourFartButton2, true);

        noButton.classList.remove("visible");
        yesButton.classList.remove("visible");
        fartButton.classList.remove("visible");
        container.classList.add("fade-out");

        setTimeout(function() {
          container.innerHTML = "";
          container.appendChild(answer);

          setTimeout(function() {
            container.classList.remove("fade-out");
          }, 500);
        }, 500);

        setTimeout(function() {
          type(answer, "Öll fjölskyldan byrjar að öskra með miklum æsingi. Skugginn var greinilega ekki að búast við þessu þar sem hann byrjar líka að öskra. Þið öskrið öll saman í kór þar til þið róið ykkur aðeins niður. \"Vá hvað hann er feitur!\" segir yngsti sonurinn og horfir skringilega á þessa veru sem stendur fyrir framan hann.", 0, function() {
            addSpace(4);
          });
        }, 1500);
      }

      function sceneFourFartButton2() {
        clickSound.currentTime = 0;
        clickSound.play();

        document.removeEventListener("keypress", sceneFourKeypress2, true);
        noButton.removeEventListener("click", sceneFourNoButton2, true);
        yesButton.removeEventListener("click", sceneFourYesButton2, true);
        fartButton.removeEventListener("click", sceneFourFartButton2, true);

        noButton.classList.remove("visible");
        yesButton.classList.remove("visible");
        fartButton.classList.remove("visible");
        container.classList.add("fade-out");

        setTimeout(function() {
          container.innerHTML = "";
          container.appendChild(answer);

          setTimeout(function() {
            container.classList.remove("fade-out");
          }, 500);
        }, 500);

        setTimeout(function() {
          type(answer, "Fjölskyldan horfir á hvert annað og skilur ekkert í þessu. Yngsti sonurinn stingur upp á hvort þau eigi bara ekki bara öll að fara að sofa. Fjölskyldan tekur undir því og gleymir öllu því sem þau höfðu lent í seinustu mínúturnar... Æi! Einn tvíburanna rekur sig í á leiðinni upp aftur og nær þannig athygli skuggans. Það er ekki fyrr en þá þar sem fjölskyldan virðir skuggann vel fyrir sér. \"Vá hvað þú ert feitur!\" segir yngsta barnið og byrjar að hlæja eins og ekkert sé.", 0, function() {
            addSpace(4);
          });
        }, 1500);
      }
    }
  }

  function sceneFive(e) {
    if (e.keyCode !== 32) {
      return;
    }

    document.removeEventListener("keypress", sceneFive, true);

    dangerMusic.pause();
    clickSound.currentTime = 0;
    clickSound.play();

    setTimeout(function() {
      fairyFountain.play();
    }, 500);

    wrapper.classList.add("fade-out");

    setTimeout(function() {
      wrapper.style.backgroundColor = "#9C27B0";
      container.innerHTML = "";

      setTimeout(function() {
        wrapper.classList.remove("fade-out");

        setTimeout(scene5Paragraph1, 750);
      }, 500);
    }, 500);

    function scene5Paragraph1() {
      var text = document.createElement("P");
      text.classList.add("story");
      container.appendChild(text, null);

      setTimeout(function() {
        text.classList.add("visible");

        setTimeout(function() {
          type(text, "Pabbinn kveikir á ljósunum og þá sjáum við að þetta er jólasveinninn. Litli bróðirinn stekkur upp af gleði og segir “Ég sagði ykkur að hann væri til! Ég sagði ykkur það!” en Jólasveinninn gleðst ekki. Hann verður mjög fúll. Fjölskyldan átti aldrei að hitta hann og kennir þeim um. Fjölskyldan verður öskureið á móti og kennir honum um þetta. Einn tvíburanna öskrar skyndilega hærra en allir svo það verður hljótt. Hann segir “Jesús kristur, slakið freaking á!”. Þá róast allir aðeins niður en að lokum segir hann “Vitið þið hvað snjókörlum finnst gott að gera um helgar?”. Allir horfa ringlaðir á tvíburann og spyrja “Hvað?”. “Að chilla!”. Þetta rosalega fyndna grín lét þau öll fara að hlæja og þá léttist andrúmsloftið mjög.", 0, scene5Paragraph2);
        }, 900);
      }, 100);
    }

    function scene5Paragraph2() {
      var text = document.createElement("P");
      text.classList.add("story");
      container.appendChild(text, null);

      setTimeout(function() {
        text.classList.add("visible");

        setTimeout(function() {
          type(text, "Eftir gott spjall við jólasveininn komst fjölskyldan að því að jólasveinninn er ekki að nenna að gefa gjafir í ár þar sem hann fær ekki neitt til baka. Fjölskyldan hugsar sig vel um…", 0, scene5Choice);
        }, 900);
      }, 100);
    }

    function scene5Choice() {
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

      noButton.textContent = "(1) Jólasveinninn hefur rangt fyrir sér!";
      yesButton.textContent = "(2) Sammála...";
      fartButton.textContent = "(3) Berjum hann!!";

      noButton.style.color = "#9C27B0";
      yesButton.style.color = "#9C27B0";
      fartButton.style.color = "#9C27B0";

      container.appendChild(choiceContainer);
      choiceContainer.appendChild(noButton);
      choiceContainer.appendChild(yesButton);
      choiceContainer.appendChild(fartButton);

      setTimeout(function() {
        noButton.classList.add("visible");
        yesButton.classList.add("visible");
        fartButton.classList.add("visible");
        answer.classList.add("visible");

        document.addEventListener("keypress", sceneFourKeypress2, true);
        noButton.addEventListener("click", sceneFourNoButton2, true);
        yesButton.addEventListener("click", sceneFourYesButton2, true);
        fartButton.addEventListener("click", sceneFourFartButton2, true);
      }, 1000);

      function sceneFourKeypress2(e) {

        switch (e.keyCode) {
          case 49:
            sceneFourNoButton2();
            break;
          case 50:
            sceneFourYesButton2();
            break;
          case 51:
            sceneFourFartButton2();
            break;
        }
      }

      function sceneFourNoButton2() {
        clickSound.currentTime = 0;
        clickSound.play();

        document.removeEventListener("keypress", sceneFourKeypress2, true);
        noButton.removeEventListener("click", sceneFourNoButton2, true);
        yesButton.removeEventListener("click", sceneFourYesButton2, true);
        fartButton.removeEventListener("click", sceneFourFartButton2, true);

        noButton.classList.remove("visible");
        yesButton.classList.remove("visible");
        fartButton.classList.remove("visible");
        container.classList.add("fade-out");

        setTimeout(function() {
          container.innerHTML = "";
          container.appendChild(answer);

          setTimeout(function() {
            container.classList.remove("fade-out");
            fairyFountain.pause();
            heroMusic.play();
          }, 500);
        }, 500);

        setTimeout(function() {
          type(answer, "Litli bróðirinn hleypur til Jólasveinsins og segir “Hvað ertu að bulla, maður?! Taktu þér tak! Þú ert Jólasveinninn! Allir krakkar elska þig um allan heim. Að þú fáir ekki neitt er algjör lygi. Þú færð ást okkar allra og það ert þú sem heldur upp meiningu jólanna!”", 0, scene5Paragraph3);
        }, 1500);
      }

      function sceneFourYesButton2() {
        clickSound.currentTime = 0;
        clickSound.play();

        document.removeEventListener("keypress", sceneFourKeypress2, true);
        noButton.removeEventListener("click", sceneFourNoButton2, true);
        yesButton.removeEventListener("click", sceneFourYesButton2, true);
        fartButton.removeEventListener("click", sceneFourFartButton2, true);

        noButton.classList.remove("visible");
        yesButton.classList.remove("visible");
        fartButton.classList.remove("visible");
        container.classList.add("fade-out");

        setTimeout(function() {
          container.innerHTML = "";
          container.appendChild(answer);

          setTimeout(function() {
            container.classList.remove("fade-out");
            fairyFountain.pause();
            heroMusic.play();
          }, 500);
        }, 500);

        setTimeout(function() {
          type(answer, "Allir taka undir Jólasveininum og skilja hann vel… nema yngsti sonurinn. Hann hleypur til Jólasveinsins og segir “Hvað er að ykkur öllum?! Sveinki, þú er Jólasveinninn! Allir krakkar elska þig um allan heim. Að þú fáir ekki neitt er algjör lygi. Þú færð ást okkar allra og það ert þú sem heldur upp meiningu jólanna!”", 0, scene5Paragraph3);
        }, 1500);
      }

      function sceneFourFartButton2() {
        clickSound.currentTime = 0;
        clickSound.play();

        document.removeEventListener("keypress", sceneFourKeypress2, true);
        noButton.removeEventListener("click", sceneFourNoButton2, true);
        yesButton.removeEventListener("click", sceneFourYesButton2, true);
        fartButton.removeEventListener("click", sceneFourFartButton2, true);

        noButton.classList.remove("visible");
        yesButton.classList.remove("visible");
        fartButton.classList.remove("visible");
        container.classList.add("fade-out");

        setTimeout(function() {
          container.innerHTML = "";
          container.appendChild(answer);

          setTimeout(function() {
            container.classList.remove("fade-out");
            fairyFountain.pause();
            heroMusic.play();
          }, 500);
        }, 500);

        setTimeout(function() {
          type(answer, "Allir í fjölskyldunni horfa á hvort annað og eru tilbúin til að berja hann í kássu… nema yngsti sonurinn. Hann stendur upp og segir “Bíðið aðeins, hvað er að ykkur! Sveinki, þú ert Jólasveinninn! Allir krakkar elska þig um allan heim. Að þú fáir ekki neitt er algjör lygi. Þú færð ást okkar allra og það ert þú sem heldur upp meiningu jólanna!”", 0, scene5Paragraph3);
        }, 1500);
      }
    }

    function scene5Paragraph3() {
      var text = document.createElement("P");
      text.classList.add("story");
      container.appendChild(text, null);

      setTimeout(function() {
        text.classList.add("visible");

        setTimeout(function() {
          type(text, "Jólasveinninn stendur upp og segir með miklum ákafa “Það er rétt! Ég er Jólasveinninn og það er skylda mín að gefa gjafir!” Fjölskyldan öskrar af gleði og þetta er mjög tilfinningaþrungin stund og þess vegna fékk fjölskyldan að koma með. Þau öll hittu hreindýrin hans Sveinka og hoppuðu upp á sleðann hans.", 0, function() {
            addSpace(5);
          });
        }, 900);
      }, 100);
    }
  }

  function sceneSix(e) {
    if (e.keyCode !== 32) {
      return;
    }


    document.removeEventListener("keypress", sceneSix, true);
    clickSound.currentTime = 0;
    clickSound.play();
    heroMusic.pause();
    wrapper.classList.add("fade-out");

    setTimeout(function() {
      wrapper.style.backgroundColor = "#2196F3";
      container.innerHTML = "";
      voyageMusic.play();

      setTimeout(function() {
        wrapper.classList.remove("fade-out");
        setTimeout(scene6Paragraph1, 750);
      }, 500);
    }, 500);

    function scene6Paragraph1() {
      var text = document.createElement("P");
      text.classList.add("story");
      container.appendChild(text, null);

      setTimeout(function() {
        text.classList.add("visible");

        setTimeout(function() {
          type(text, "Sleðinn skaust af stað með svo miklu afli að fjölskyldan öskraði af miklum krafti á meðan Jólasveinninn hló “hó hó hó!”. Það var einmitt á því tímabili þar sem einn tvíburanna fattaði að hann væri lofthræddur og gat ekki notið jólatöfrana sem blasti við þeim eins mikið og allir hinir. Eftir að hafa flogið yfir Bretland og Spán taka þau eftir gjöfunum á sleðanum. Þar voru einmitt fimm pakkar í gjafahrúgunni sem fjölskyldumeðlimina langaði mjög í. Einnig var fullt af hundanammi þarna svo hundurinn var líka mjög spenntur. Það er mjög freistandi að taka með sér gjafirnar og stela þeim, ég meina enginn mun taka eftir því... ", 0, scene6Choice);
        }, 900);
      }, 100);
    }

    function scene6Choice() {
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

      noButton.textContent = "(1) Stela þeim";
      yesButton.textContent = "(2) Láta þær vera";
      fartButton.textContent = "(3) Stela bara einni";

      noButton.style.color = "#2196F3";
      yesButton.style.color = "#2196F3";
      fartButton.style.color = "#2196F3";

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

        document.addEventListener("keypress", sceneSixKeypress, true);
        noButton.addEventListener("click", sceneSixNoButton, true);
        yesButton.addEventListener("click", sceneSixYesButton, true);
        fartButton.addEventListener("click", sceneSixFartButton, true);
      }, 1000);

      function sceneSixKeypress(e) {
        if (e.keyCode === 49) {
          sceneSixNoButton();
        } else if (e.keyCode === 50) {
          sceneSixYesButton();
        } else if (e.keyCode === 51) {
          sceneSixFartButton();
        }
      }

      function sceneSixNoButton() {
        // Play sound
        clickSound.currentTime = 0;
        clickSound.play();

        // Fade out buttons
        noButton.classList.remove("visible");
        yesButton.classList.remove("visible");
        fartButton.classList.remove("visible");

        // Type content to paragraph
        setTimeout(function() {
          type(answer, "Fjölskyldan býr sig undir að stela gjöfunum þangað til að eldri tvíburinn segir þeim öllum að hætta. “Við erum ekki þjófar og sérstaklega um jólin, leyfum þeim sem eiga að fá gjafirnar að fá þær”", 0, function() {
            addSpace(6);
          });
        }, 1000);

        // Remove all event listeners!!
        noButton.removeEventListener("click", sceneSixNoButton, true);
        document.removeEventListener("keypress", sceneSixKeypress, true);
        yesButton.removeEventListener("click", sceneSixYesButton, true);
        fartButton.removeEventListener("click", sceneSixFartButton, true);
      }

      function sceneSixYesButton() {

        // Play sound
        clickSound.currentTime = 0;
        clickSound.play();

        // Fade out buttons
        noButton.classList.remove("visible");
        yesButton.classList.remove("visible");
        fartButton.classList.remove("visible");

        // Type content to paragraph
        setTimeout(function() {
          type(answer, "Eldri tvíburinn segir að við séum ekki þjófar og við ættum ekki að stela þeim “Jólin væru ekki jafn góð ef við myndum stela þeim heldur en að láta þær vera”", 0, function() {
            addSpace(6);
          });
        }, 1000);

        // Remove all event listeners!!
        noButton.removeEventListener("click", sceneSixNoButton, true);
        document.removeEventListener("keypress", sceneSixKeypress, true);
        yesButton.removeEventListener("click", sceneSixYesButton, true);
        fartButton.removeEventListener("click", sceneSixFartButton, true);
      }

      function sceneSixFartButton() {

        // Play sound
        clickSound.currentTime = 0;
        clickSound.play();

        // Fade out buttons
        noButton.classList.remove("visible");
        yesButton.classList.remove("visible");
        fartButton.classList.remove("visible");

        // Type content to paragraph
        setTimeout(function() {
          type(answer, "Yngsti bróðirinn tekur utan um gjöfina sem honu langar í en þá segir eldri bróðirinn honum að hætta. “Við erum ekki þjófar og heldur ekki þú. Það að stela gjöfum gerir jólunum engan greiða” og leggur pakkann niður.", 0, function() {
            addSpace(6);
          });
        }, 1000);

        // Remove all event listeners!!
        noButton.removeEventListener("click", sceneSixNoButton, true);
        document.removeEventListener("keypress", sceneSixKeypress, true);
        yesButton.removeEventListener("click", sceneSixYesButton, true);
        fartButton.removeEventListener("click", sceneSixFartButton, true);
      }
    }
  }

  function sceneSeven(e) {
    if (e.keyCode !== 32) {
      return;
    }

    clickSound.currentTime = 0;
    clickSound.play();

    document.removeEventListener("keypress", sceneSeven, true);
    container.classList.add("fade-out");

    setTimeout(function() {
      container.innerHTML = "";

      setTimeout(function() {
        container.classList.remove("fade-out");

        setTimeout(paragraph1, 500);
      }, 500);
    }, 500);

    function paragraph1() {
      var text = document.createElement("P");
      text.classList.add("story");
      container.appendChild(text, null);

      setTimeout(function() {
        text.classList.add("visible");

        setTimeout(function() {
          type(text, "Allir láta pakkana vera fyrir fullt og allt og fylgjast meira með hvað Jólasveinninn er góður að gefa gjafir og jólatöfrana sem umkringja þau.", 0, paragraph2);
        }, 900);
      }, 100);
    }

    function paragraph2() {
      var text = document.createElement("P");
      text.classList.add("story");
      container.appendChild(text, null);

      setTimeout(function() {
        text.classList.add("visible");

        setTimeout(function() {
          type(text, "Seinna um nóttina lenda þau aftur heima hjá sér og þá mælir Jólasveinninn “Þið sýnduð mér aftur meiningu jólanna og hvað það er mikilvægt að ég held áfram með starf mitt, takk kærlega fyrir. Ég er einnig búinn að taka eftir frábærum persónuleikum ykkar”.", 0, function() {
            addSpace(7);
          });
        }, 900);
      }, 100);
    }
  }

  function sceneEight(e) {
    if (e.keyCode !== 32) {
      return;
    }

    clickSound.currentTime = 0;
    clickSound.play();
    document.removeEventListener("keypress", sceneEight, true);
    wrapper.classList.add("fade-out");

    setTimeout(function() {
      wrapper.style.backgroundColor = "#E65100";
      container.innerHTML = "";
      voyageMusic.pause();
      endMusic.play();

      setTimeout(function() {
        wrapper.classList.remove("fade-out");

        setTimeout(paragraph1, 750);
      }, 500);
    }, 500);

    function paragraph1() {
      var text = document.createElement("P");
      text.classList.add("story");
      container.appendChild(text, null);

      setTimeout(function() {
        text.classList.add("visible");

        setTimeout(function () {
          type(text, "Hann labbar upp til mömmunnar og segir:", 0, paragraph2);
        }, 900);
      }, 100);
    }

    function paragraph2() {
      var text = document.createElement("P");
      text.classList.add("story");
      container.appendChild(text, null);

      setTimeout(function() {
        text.classList.add("visible");

        setTimeout(function () {
          type(text, "“Það ert þú sem heldur fjölskyldunni saman og passar upp á að þið eruð heilbrigð og náið vel saman”", 0, paragraph3);
        }, 900);
      }, 100);
    }

    function paragraph3() {
      var text = document.createElement("P");
      text.classList.add("story");
      container.appendChild(text, null);

      setTimeout(function() {
        text.classList.add("visible");

        setTimeout(function () {
          type(text, "Næst fer hann til pabbans:", 0, paragraph4);
        }, 900);
      }, 100);
    }

    function paragraph4() {
      var text = document.createElement("P");
      text.classList.add("story");
      container.appendChild(text, null);

      setTimeout(function() {
        text.classList.add("visible");

        setTimeout(function () {
          type(text, "“Þú ert sá sem verndar og passar upp á fjölskylduna og alltaf sá fyrsti sem kemur til bjargar”", 0, paragraph5);
        }, 900);
      }, 100);
    }

    function paragraph5() {
      var text = document.createElement("P");
      text.classList.add("story");
      container.appendChild(text, null);

      setTimeout(function() {
        text.classList.add("visible");

        setTimeout(function () {
          type(text, "Við annan tvíburabróðirinn:", 0, paragraph6);
        }, 900);
      }, 100);
    }

    function paragraph6() {
      var text = document.createElement("P");
      text.classList.add("story");
      container.appendChild(text, null);

      setTimeout(function() {
        text.classList.add("visible");

        setTimeout(function () {
          type(text, "“Þú ert sá vitrasti af bræðrum þínum og hjálpar þeim og kennir”", 0, function() {
            addSpace(8);
          });
        }, 900);
      }, 100);
    }
  }

  function sceneNine(e) {
    if (e.keyCode !== 32) {
      return;
    }

    clickSound.currentTime = 0;
    clickSound.play();

    container.classList.add("fade-out");
    document.removeEventListener("keypress", sceneNine, true);

    setTimeout(function() {
      container.innerHTML = "";

      setTimeout(function() {
        container.classList.remove("fade-out");
        setTimeout(paragraph1, 200);
      }, 200);
    }, 500);

    function paragraph1() {
      var text = document.createElement("P");
      text.classList.add("story");
      container.appendChild(text, null);

      setTimeout(function() {
        text.classList.add("visible");

        setTimeout(function() {
          type(text, "Við hinn tvíburann:", 0, paragraph2);
        }, 900);
      }, 100);
    }

    function paragraph2() {
      var text = document.createElement("P");
      text.classList.add("story");
      container.appendChild(text, null);

      setTimeout(function() {
        text.classList.add("visible");

        setTimeout(function() {
          type(text, "“Þú notar húmorinn þinn mjög vel til að halda fjölskyldunni hlæjandi og glaðari”", 0, paragraph3);
        }, 900);
      }, 100);
    }

    function paragraph3() {
      var text = document.createElement("P");
      text.classList.add("story");
      container.appendChild(text, null);

      setTimeout(function() {
        text.classList.add("visible");

        setTimeout(function() {
          type(text, "Við yngsta soninn segir hann:", 0, paragraph4);
        }, 900);
      }, 100);
    }

    function paragraph4() {
      var text = document.createElement("P");
      text.classList.add("story");
      container.appendChild(text, null);

      setTimeout(function() {
        text.classList.add("visible");

        setTimeout(function() {
          type(text, "“Þú heldur lífinu uppi í fjölskyldunni með því að vera þú sjálfur”", 0, paragraph5);
        }, 900);
      }, 100);
    }

    function paragraph5() {
      var text = document.createElement("P");
      text.classList.add("story");
      container.appendChild(text, null);

      setTimeout(function() {
        text.classList.add("visible");

        setTimeout(function() {
          type(text, "Og að lokum við hundinn:", 0, paragraph6);
        }, 900);
      }, 100);
    }

    function paragraph6() {
      var text = document.createElement("P");
      text.classList.add("story");
      container.appendChild(text, null);

      setTimeout(function() {
        text.classList.add("visible");

        setTimeout(function() {
          type(text, "“Þú ert djásn og ást fjölskyldunnar.”", 0, paragraph7);
        }, 900);
      }, 100);
    }

    function paragraph7() {
      var text = document.createElement("P");
      text.classList.add("story");
      container.appendChild(text, null);

      setTimeout(function() {
        text.classList.add("visible");

        setTimeout(function() {
          type(text, "Hundurinn geltir mjög ánægður og sömuleiðis faðmast fjölskyldan og kveðja Jólasveininn.", 0, function() {
            addSpace(9);
          });
        }, 900);
      }, 100);
    }
  }

  function sceneTen(e) {
    if (e.keyCode !== 32) {
      return;
    }

    document.removeEventListener("keypress", sceneTen, true);

    clickSound.currentTime = 0;
    clickSound.play();
    container.classList.add("fade-out");

    setTimeout(function() {
      container.innerHTML = "";

      setTimeout(function() {
        container.classList.remove("fade-out");

        setTimeout(paragraph1, 100);
      }, 500);
    }, 500);

    function paragraph1() {
      var text = document.createElement("P");
      text.classList.add("story");
      container.appendChild(text, null);

      setTimeout(function() {
        text.classList.add("visible");

        setTimeout(function() {
          type(text, "Þau vakna eftir þessa löngu nótt og það fyrsta sem þau taka eftir er að gjafirnar sem þau líkuðu mjög við voru undir jólatrénu þeirra og á þeirri stundu vissu þau að þetta yrðu góð jól.", 0, function() {
            setTimeout(end, 2000);
          });
        }, 900);
      }, 100);
    }
  }

  function end() {
    wrapper.classList.add("fade-out-slow");
    wrapper.style.transition = "opacity 2s ease";

    setTimeout(function() {
      wrapper.style.backgroundColor = "#FFF";
      wrapper.innerHTML = "";
      var title = document.createElement("H1");
      var small = document.createElement("SMALL");
      title.id = "thank_you";
      wrapper.appendChild(title, null);
      title.textContent = "Takk Fyrir!";
      title.appendChild(small, null);
      small.textContent = "Að vera fjölskyldan okkar";

      setTimeout(function() {
        wrapper.classList.remove("fade-out-slow");
      }, 500);
    }, 2000);
  }
}, true);

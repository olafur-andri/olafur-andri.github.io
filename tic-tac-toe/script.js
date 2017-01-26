document.addEventListener("DOMContentLoaded", load, true);

function load() {
  var gridContainer = document.querySelector(".grid-container");
  var columnContainers = document.querySelectorAll(".column-container");
  var p = document.querySelector("p");
  var refreshButton = document.querySelector(".refresh");
  var activeTiles = 0;
  var hasWon = false;
  var hasLost = false;
  var winningMessage = "HUMAN WINS";
  var losingMessage = "HUMAN LOSES";

  gridContainer.style.height = gridContainer.getBoundingClientRect().width + "px";

  window.addEventListener("resize", function() {
    gridContainer.style.height = gridContainer.getBoundingClientRect().width + "px";
  }, true);

  for (var i = 0; i < columnContainers.length; i++) {
  var tile = document.createElement("DIV");
  tile.classList.add("tile");
    columnContainers[i].appendChild(tile, null);
  }

var tiles = document.querySelectorAll(".tile");

  for (var i = 0; i < tiles.length; i++) {
    var circle = document.createElement("DIV");
    var close = document.createElement("I");
    var background = document.createElement("DIV");

    circle.classList.add("circle");
    close.classList.add("material-icons");
    close.textContent = "close";
    background.classList.add("background");

    tiles[i].appendChild(circle, null);
    tiles[i].appendChild(close, null);
    tiles[i].appendChild(background, null);
    tiles[i].addEventListener("touchend", onclick, true);
    tiles[i].addEventListener("touchstart", onstart, true);
    tiles[i].addEventListener("mouseup", onclick, true);
  }

  function onstart(e) {
    e.preventDefault();
  }

  function onclick() {
    var target = this;

    target.classList.add("active");
    target.childNodes[1].classList.add("show");
    p.textContent = "Wait for the computer...";

    activeTiles++;

    endOfTurnEvaluation();

    // Remove tile event listeners
    for (var i = 0; i < tiles.length; i++) {
      tiles[i].removeEventListener("touchend", onclick, true);
      tiles[i].removeEventListener("touchstart", onstart, true);
      tiles[i].removeEventListener("mouseup", onclick, true);
    }

    artificialDecicionMakingTime();

    function artificialDecicionMakingTime() {
      var allowedNumbers = [];

      for (var i = 0; i < tiles.length; i++) {
        if (!tiles[i].classList.contains("active")) {
          allowedNumbers[i] = i;
        }
      }

      var randomNumber = Math.floor(Math.random() * 9 + 1);
      randomNumber--;

      if (allowedNumbers[randomNumber] === undefined) {
        if (activeTiles < 9) {
          artificialDecicionMakingTime();
        } else {
          endOfTurnEvaluation();
        }
      } else {
        setTimeout(function() {
          tiles[randomNumber].classList.add("active");
          tiles[randomNumber].childNodes[0].classList.add("show");
          tiles[randomNumber].childNodes[2].style.backgroundColor = "#F44336";
          tiles[randomNumber].childNodes[2].classList.add("show");
          activeTiles++;

          endOfTurnEvaluation();

          for (var i = 0; i < tiles.length; i++) {
            tiles[i].addEventListener("touchend", onclick, true);
            tiles[i].addEventListener("touchstart", onstart, true);
            tiles[i].addEventListener("mouseup", onclick, true);

            p.textContent = "Your turn";
          }
        }, 200);
      }
    }

    function endOfTurnEvaluation() {

      for (var i = 0; i < tiles.length; i++) {
        if (tiles[i].childNodes[1].classList.contains("show")) {
          tiles[i].childNodes[2].style.backgroundColor = "#4CAF50";
          tiles[i].childNodes[2].classList.add("show");
        }
      }

      if (activeTiles >= 5) {
        for (var i = 0; i < tiles.length; i++) {
          if (i === 0 || i === 3 || i === 6) {
            if (tiles[i].childNodes[2].style.backgroundColor && tiles[i].childNodes[2].style.backgroundColor === tiles[i + 1].childNodes[2].style.backgroundColor && tiles[i].childNodes[2].style.backgroundColor === tiles[i + 2].childNodes[2].style.backgroundColor) {
              if (tiles[i].childNodes[2].style.backgroundColor === "rgb(76, 175, 80)") {
                hasWon = true;
              } else {
                hasLost = true;
              }
            }
          }

          if (i === 0 || i === 1 || i === 2) {
            if (tiles[i].childNodes[2].style.backgroundColor && tiles[i].childNodes[2].style.backgroundColor === tiles[i + 3].childNodes[2].style.backgroundColor && tiles[i].childNodes[2].style.backgroundColor === tiles[i + 6].childNodes[2].style.backgroundColor) {
              if (tiles[i].childNodes[2].style.backgroundColor === "rgb(76, 175, 80)") {
                hasWon = true;
              } else {
                hasLost = true;
              }
            }
          }

          if (i === 0) {
            if (tiles[i].childNodes[2].style.backgroundColor && tiles[i].childNodes[2].style.backgroundColor === tiles[4].childNodes[2].style.backgroundColor && tiles[i].childNodes[2].style.backgroundColor === tiles[8].childNodes[2].style.backgroundColor) {
              if (tiles[i].childNodes[2].style.backgroundColor === "rgb(76, 175, 80)") {
                hasWon = true;
              } else {
                hasLost = true;
              }
            }
          }

          if (i === 2) {
            if (tiles[i].childNodes[2].style.backgroundColor && tiles[i].childNodes[2].style.backgroundColor === tiles[4].childNodes[2].style.backgroundColor && tiles[i].childNodes[2].style.backgroundColor === tiles[6].childNodes[2].style.backgroundColor) {
              if (tiles[i].childNodes[2].style.backgroundColor === "rgb(76, 175, 80)") {
                hasWon = true;
              } else {
                hasLost = true;
              }
            }
          }
        }
      }

      if (hasWon) {
        p.textContent = winningMessage;
        throw new Error("This really isn't an error. Just trying to stop execution of JS code.");
      }

      if (hasLost) {
        p.textContent = losingMessage;
        throw new Error("This really isn't an error. Just trying to stop execution of JS code.");
      }

      if (!hasWon && !hasLost && activeTiles === 9) {
        p.textContent = "DRAW";
        throw new Error("This really isn't an error. Just trying to stop execution of JS code.");
      }
    }

    refreshButton.addEventListener("touchstart", preventDefault, true);
    refreshButton.addEventListener("touchend", refresh, true);
    refreshButton.addEventListener("mouseup", refresh, true);

    function preventDefault(e) {
      e.preventDefault();
    }

    function refresh() {
      location.reload();
    }

    /*requestAnimationFrame(update);

    function update() {
      var requestId = requestAnimationFrame(update);

      p.textContent = tiles[8].childNodes[2].style.backgroundColor;
    }*/
  }
}

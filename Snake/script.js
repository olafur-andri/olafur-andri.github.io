let startX = 0;
let endX = 0;
let startY = 0;
let endY = 0;
let moveX = 0;
let moveY = 0;
let startMessage = null;
let startMessageHeading = null;
let requestId = null;
let right = 0;
let up = 0;
let limbs = null;
let transformX = 0;
let transformY = 0;
let positionX = 0;
let positionY = 0;
let windowWidth = 0;
let windowHeight = 0;
let primaryLimb = null;
let primaryLimbBCR = null;
let testP = null;
let cookieContainer = null;
let activeCookie = null;
let activeCookieX = 0;
let activeCookieY = 0;
let points = 0;
let pointsP = null;
let snakeContainer = null;
let direction = "";
let cacheX = [];
let cacheY = [];
let startingPointX;
let startingPointY;
let restartButton = null;
let pauseButton = null;
let toucharea = null;
let playButton = null;
let backgroundColors = ["white", "red", "green", "pink", "purple", "blue", "yellow", "black"];
let currentBackground = 0;
let fadeInBackground = null;
let snakeColors = ["blue", "yellow", "red", "white", "cyan", "orange", "green", "white"];
let currentSnakeColor = 0;
let limbContainers = [];
let firstLimbContainer = null;
let windowDiv = null;
let windowDivBCR = null;
const SPEED = 2.5;

function start() {
  windowDiv = document.getElementById("window");
  firstLimbContainer = document.getElementById("first_limb_container");
  limbContainers = document.querySelectorAll(".limb-container");
  playButton = document.getElementById("play");
  toucharea = document.getElementById("touch_area");
  pauseButton = document.getElementById("pause");
  restartButton = document.getElementById("restart");
  snakeContainer = document.getElementById("snake_container");
  pointsP = document.querySelector("#score p");
  cookieContainer = document.getElementById("cookie_container");
  testP = document.getElementById("test");
  startMessage = document.getElementById("start_message");
  startMessageHeading = document.querySelector("#start_message h2");
  primaryLimb = document.getElementById("primary_limb");
  limbs = document.querySelectorAll(".limb");
  
  startMessage.classList.add("show");

  addEventListeners();
  requestAnimationFrame(update);
  getWindowSize();
  primaryLimbBCR = primaryLimb.getBoundingClientRect();
  positionX = primaryLimbBCR.left - windowDivBCR.left;
  positionY = primaryLimbBCR.top - windowDivBCR.top;
  startingPointX = getStartingPointX();
  startingPointY = getStartingPointY();
  generateCookie();
}

function addEventListeners() {
  toucharea.addEventListener("touchstart", onStart, true);
  toucharea.addEventListener("touchmove", onMove, true);
  toucharea.addEventListener("touchend", onEnd, true);

  document.addEventListener("keydown", onPress, true);

  restartButton.addEventListener("touchstart", createRipple, true);
  restartButton.addEventListener("touchstart", restartGame, true);
  restartButton.addEventListener("mousedown", createRipple, true);
  restartButton.addEventListener("click", restartGame, true);

  pauseButton.addEventListener("touchstart", pauseGame, true);
  pauseButton.addEventListener("click", pauseGame, true);

  window.addEventListener("resize", getWindowSize, true);
}

function getWindowSize() {
  windowDivBCR = windowDiv.getBoundingClientRect();
  windowWidth = windowDivBCR.width;
  windowHeight = windowDivBCR.height;
}

function onPress(e) {
  if (e.key) {
    switch (e.key) {
      case "ArrowUp":
        swipeUp();
        break;
      case "ArrowRight":
        swipeRight();
        break;
      case "ArrowDown":
        swipeDown();
        break;
      case "ArrowLeft":
        swipeLeft();
        break;
      case "p":
        pauseGame();
        break;
    }
  } else if (e.keyCode) {
    switch (e.keyCode) {
      case 38:
        swipeUp();
        break;
      case 40:
        swipeDown();
        break;
      case 37:
        swipeLeft();
        break;
      case 39:
        swipeRight();
        break;
      case 80:
        pauseGame();
        break;
    }
  } else {
    console.log("Need to add another event handling for event argument for keydown event");
  }
}

function onStart(e) {
  e.preventDefault();
  startX = e.pageX || e.touches[0].pageX;
  startY = e.pageY || e.touches[0].pageY;
  endX = startX;
  endY = startY;
}

function onMove(e) {
  endX = e.pageX || e.touches[0].pageX;
  endY = e.pageY || e.touches[0].pageY;
}

function onEnd(e) {
  moveX = endX - startX;
  moveY = endY - startY;

  if (Math.abs(moveX) > Math.abs(moveY)) {
    if (moveX > 0) {
      if (points === 0) {
        swipeRight();
      } else if (direction !== "left") {
        swipeRight();
      }
    } else if (moveX < 0) {
      if (points === 0) {
        swipeLeft();
      } else if (direction !== "right") {
        swipeLeft();
      }
    }
  } else {
    if (moveY > 0) {
      if (points === 0) {
        swipeDown();
      } else if (direction !== "up") {
        swipeDown();
      }
    } else {
      if (points === 0) {
        swipeUp();
      } else if (direction !== "down") {
        swipeUp();
      }
    }
  }
}

function swipeRight() {
  if (points > 0 && direction === "left") {
    return;
  }

  if (startMessage.classList.contains("show")) {
    startMessage.classList.remove("show");
  }

  right = 1;
  up = 0;
  direction = "right";
}

function swipeLeft() {
  if (points > 0 && direction === "right") {
    return;
  }

  if (startMessage.classList.contains("show")) {
    startMessage.classList.remove("show");
  }

  right = -1;
  up = 0;
  direction = "left";
}

function swipeUp() {
  if (points > 0 && direction === "down") {
    return;
  }

  if (startMessage.classList.contains("show")) {
    startMessage.classList.remove("show");
  }

  right = 0;
  up = 1;
  direction = "up";
}

function swipeDown() {
  if (points > 0 && direction === "up") {
    return;
  }

  if (startMessage.classList.contains("show")) {
    startMessage.classList.remove("show");
  }

  right = 0;
  up = -1;
  direction = "down";
}

function update() {
  requestId = requestAnimationFrame(update);
  transformX += (right * SPEED);
  transformY -= (up * SPEED);
  positionX += (right * SPEED);
  positionY -= (up * SPEED);

  cacheX.unshift(transformX);
  cacheY.unshift(transformY);

  for (let i = 0; i < limbs.length; i++) {
    limbs[i].style.transform = `translateX(${cacheX[i * 12]}px) translateY(${cacheY[i * 12]}px)`;
  }

  // Check if snake hits walls
  if (positionX <= 0 || positionX >= (windowWidth - 22) || positionY <= 0 || positionY >= (windowHeight - 22)) {
    endGame();
  }

  checkCookieCollision();
  checkLimbCollision();
}

function generateCookie() {
  let newCookie = document.createElement("div");
  newCookie.classList.add("cookie");
  let rndX = Math.random();
  let rndY = Math.random();
  rndX = Math.floor(rndX * (windowWidth - 15));
  rndY = Math.floor(rndY * (windowHeight - 15));
  newCookie.style.left = `${rndX}px`;
  newCookie.style.top = `${rndY}px`;
  activeCookie = newCookie;
  activeCookieX = rndX;
  activeCookieY = rndY;

  if (backgroundColors[currentBackground] === "purple") {
    newCookie.style.backgroundColor = "#FFFFFF";
  }

cookieContainer.appendChild(newCookie, null);
}

function checkCookieCollision() {
  let positionCX = positionX + 13.5;
  let positionCY = positionY + 13.5;
  let activeCookieCX = activeCookieX + 7.5;
  let activeCookieCY = activeCookieY + 7.5;
  let differenceX = positionCX - activeCookieCX;
  let differenceY = positionCY - activeCookieCY;
  
  if (Math.abs(differenceX) <= 21 && Math.abs(differenceY) <= 21) {
    cookieContainer.removeChild(activeCookie);
    points++;
    pointsP.textContent = `${points}`;
    generateLimb();

    if (points % 10 === 0) {
      changeBackground();
    }

    generateCookie();
  }
}

function generateLimb() {
  let newLimb = document.createElement("div");
  let newLimbContainer = document.createElement("div");
  newLimb.classList.add("limb");
  newLimbContainer.classList.add("limb-container");
  newLimbContainer.classList.add(snakeColors[currentSnakeColor]);
  let blueColor = document.createElement("div");
  blueColor.classList.add("snake-color");
  blueColor.classList.add("blue");
  let yellowColor = document.createElement("div");
  yellowColor.classList.add("snake-color");
  yellowColor.classList.add("yellow");
  let whiteColor = document.createElement("div");
  whiteColor.classList.add("snake-color");
  whiteColor.classList.add("white");
  let redColor = document.createElement("div");
  redColor.classList.add("snake-color");
  redColor.classList.add("red");
  let cyanColor = document.createElement("div");
  cyanColor.classList.add("snake-color");
  cyanColor.classList.add("cyan");
  let orangeColor = document.createElement("div");
  orangeColor.classList.add("snake-color");
  orangeColor.classList.add("orange");
  let greenColor = document.createElement("div");
  greenColor.classList.add("snake-color");
  greenColor.classList.add("green");

  newLimb.appendChild(blueColor, null);
  newLimb.appendChild(yellowColor, null);
  newLimb.appendChild(redColor, null);
  newLimb.appendChild(whiteColor, null);
  newLimb.appendChild(cyanColor, null);
  newLimb.appendChild(orangeColor, null);
  newLimb.appendChild(greenColor, null);
  newLimbContainer.insertBefore(newLimb, newLimbContainer.firstChild);
  snakeContainer.appendChild(newLimbContainer, snakeContainer.lastChild);

  setTimeout(function() {
    newLimbContainer.classList.add("show");
  }, 50);

  limbs = document.querySelectorAll(".limb");
}

function checkLimbCollision() {
  let currentX;

  for (let i = 2; i <= points; i++) {
    let positionCX = positionX + 13.5;
    let positionCY = positionY + 13.5;
    currentX = startingPointX + cacheX[i * 12];
    let currentY = startingPointY + cacheY[i * 12];
    let currentCX = currentX + 10;
    let currentCY = currentY + 10;
    let differenceCX = Math.abs(currentCX - positionCX);
    let differenceCY = Math.abs(currentCY - positionCY);

    if (differenceCX <= 23.5 && differenceCY <= 23.5) {
      endGame();
    }
  }
}

function endGame() {
  startMessageHeading.textContent = "Sorry, you lost :(";
  toucharea.removeEventListener("touchstart", onStart, true);
  toucharea.removeEventListener("touchmove", onMove, true);
  toucharea.removeEventListener("touchend", onEnd, true);
  document.removeEventListener("keydown", onPress, true);
  document.addEventListener("keydown", restartGameIfEnter, true);
  cancelAnimationFrame(requestId);

  let counter = 0;
  let limbContainers = document.querySelectorAll(".limb-container");

  let removeSnake = setInterval(function() {
    limbContainers[counter].classList.remove("show");
    counter++;

    if (counter === limbContainers.length) {
      clearInterval(removeSnake);
    }
  }, 40);

  setTimeout(function() {
    startMessage.classList.add("show");
    restartButton.classList.add("show");
  }, 30 * points);
}

function restartGameIfEnter(e) {
  if (e.key) {
    if (e.key === "Enter") {
      restartGame();
    }
  } else if (e.keyCode) {
    if (e.keyCode === 32) {
      restartGame();
    }
  } else {
    console.log("Need to create another event handler for event argument of keydown");
  }
}

function getStartingPointX() {
  return windowWidth / 2 - 10;
}

function getStartingPointY() {
  return windowHeight / 2 - 10;
}

function createRipple(e) {
  e.preventDefault();
  let buttonBCR = this.getBoundingClientRect();
  let newRipple = document.createElement("div");
  newRipple.classList.add("ripple");
  let x = (e.pageX || e.touches[0].pageX);
  let y = (e.pageY || e.touches[0].pageY);
  let color = getComputedStyle(this).color;
  newRipple.style.backgroundColor = color;
  newRipple.style.left = `${x - 75 - buttonBCR.left}px`;
  newRipple.style.top = `${y - 75 - buttonBCR.top}px`;
  this.appendChild(newRipple, null);

  requestAnimationFrame(function() {
    newRipple.classList.add("grow");
  });
}

function restartGame() {
  setTimeout(function() {
    restartButton.classList.remove("show");
  startMessage.classList.remove("show");
  snakeContainer.innerHTML = `
    <div class="limb-container show blue" id="first_limb_container">
      <div class="limb" id="primary_limb">
        <div class="snake-color blue"></div>
          <div class="snake-color yellow"></div>
          <div class="snake-color red"></div>
          <div class="snake-color white"></div>
          <div class="snake-color cyan"></div>
          <div class="snake-color orange"></div>
          <div class="snake-color green"></div>
      </div>
    </div>
  `;

  limbs = document.querySelectorAll(".limb");
  right = 0;
  up = 0;
  direction = "";
  points = 0;
  positionX = getStartingPointX();
  positionY = getStartingPointY();
  transformX = 0;
  transformY = 0;
  cacheX = [0];
  cacheY = [0];
  primaryLimb = document.getElementById("primary_limb");
  primaryLimb.style.transform = "translateX(0) translateY(0)";
  toucharea.addEventListener("touchstart", onStart, true);
  toucharea.addEventListener("touchmove", onMove, true);
  toucharea.addEventListener("touchend", onEnd, true);
  document.removeEventListener("keydown", restartGameIfEnter, true);
  document.addEventListener("keydown", onPress, true);
  requestAnimationFrame(update);
  }, 400);

  pointsP.textContent = "0";
  currentBackground = 0;

  snakeContainer.classList.remove(snakeColors[currentSnakeColor]);

  currentSnakeColor = 0;

  snakeContainer.classList.add(snakeColors[currentSnakeColor]);
  
  if (fadeInBackground) {
    fadeInBackground.classList.remove("show");
  }
}

function pauseGame(e) {

  if (e) {
    e.preventDefault();
  }

  document.removeEventListener("keydown", onPress, true);
  document.addEventListener("keydown", resumeGameIfEnter, true);

  startMessage.classList.add("show");
  cancelAnimationFrame(requestId);
  startMessageHeading.textContent = "";
  toucharea.removeEventListener("touchstart", onStart, true);
  toucharea.removeEventListener("touchmove", onMove, true);
  toucharea.removeEventListener("touchend", onEnd, true);
  playButton.classList.add("show");
  playButton.addEventListener("touchstart", resumeGame, true);
  playButton.addEventListener("click", resumeGame, true);
}

function resumeGameIfEnter(e) {
  if (e.key) {
    switch (e.key) {
      case "Enter":
        resumeGame();
        break;
      case " ":
        resumeGame();
        break;
    }
  } else if (e.keyCode) {
    switch (e.keyCode) {
      case 13:
        resumeGame();
        break;
      case 32:
        resumeGame();
        break;
    }
  } else {
    console.log("need to see if keydown event argument has anything else than e.key and e.keyCode")
  }
}

function resumeGame(e) {

  if (e) {
    e.preventDefault();
  }

  playButton.removeEventListener("touchstart", resumeGame, true);
  playButton.classList.remove("show");
  document.removeEventListener("keydown", resumeGameIfEnter, true);
  document.addEventListener("keydown", onPress, true);
  
  setTimeout(function() {
    startMessage.classList.remove("show");
  }, 200);

  toucharea.addEventListener("touchstart", onStart, true);
  toucharea.addEventListener("touchmove", onMove, true);
  toucharea.addEventListener("touchend", onEnd, true);

  requestAnimationFrame(update);
}

function changeBackground() {
  let color = backgroundColors[currentBackground];

  let fadeOutBackground = document.querySelector(`#backgrounds .background#${color}`);

  currentBackground++;
  
  if (currentBackground >= backgroundColors.length) {
    currentBackground = 1;
  }

  color = backgroundColors[currentBackground];

  fadeInBackground = document.querySelector(`#backgrounds .background#${color}`);
  
  fadeOutBackground.classList.remove("show");
  fadeInBackground.classList.add("show");

  setTimeout(changeSnakeColor, 200);
}

function changeSnakeColor() {
  let counter = 0;
  let oldSnakeColor = currentSnakeColor;
  currentSnakeColor++;

  if (currentSnakeColor >= snakeColors.length) {
    currentSnakeColor = 1;
  }
  
  limbContainers = document.querySelectorAll(".limb-container");
  let fadeSnakeOut = setInterval(function() {
    limbContainers[counter].classList.remove(snakeColors[oldSnakeColor]);
    counter++;

    if (counter >= limbContainers.length) {
      clearInterval(fadeSnakeOut);
    }
  }, 50);

  setTimeout(function() {
    let anotherCounter = 0;
    let fadeSnakeIn = setInterval(function() {
      limbContainers[anotherCounter].classList.add(snakeColors[currentSnakeColor]);
      anotherCounter++;

      if (anotherCounter >= limbContainers.length) {
        clearInterval(fadeSnakeIn);
      }
    }, 50);
  }, 0);

  let classes = "";
}

window.addEventListener("load", start, true);
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

const SPEED = 2.5;

function start() {
  snakeContainer = document.getElementById("snake_container");
  pointsP = document.getElementById("score");
  cookieContainer = document.getElementById("cookie_container");
  testP = document.getElementById("test");
  startMessage = document.getElementById("start_message");
  startMessageHeading = document.querySelector("#start_message h2");
  primaryLimb = document.getElementById("primary_limb");
  limbs = document.querySelectorAll(".limb");
  
  startMessage.classList.add("show");

  addEventListeners();
  requestAnimationFrame(update);
  windowWidth = window.innerWidth;
  windowHeight = window.innerHeight;
  primaryLimbBCR = primaryLimb.getBoundingClientRect();
  positionX = primaryLimbBCR.left;
  positionY = primaryLimbBCR.top;
  startingPointX = getStartingPointX();
  startingPointY = getStartingPointY();
}

function addEventListeners() {
  document.addEventListener("touchstart", onStart, true);
  document.addEventListener("touchmove", onMove, true);
  document.addEventListener("touchend", onEnd, true);
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
  if (startMessage.classList.contains("show")) {
    startMessage.classList.remove("show");
    generateCookie();
  }

  right = 1;
  up = 0;
  direction = "right";
}

function swipeLeft() {
  if (startMessage.classList.contains("show")) {
    startMessage.classList.remove("show");
    generateCookie();
  }

  right = -1;
  up = 0;
  direction = "left";
}

function swipeUp() {
  if (startMessage.classList.contains("show")) {
    startMessage.classList.remove("show");
    generateCookie();
  }

  right = 0;
  up = 1;
  direction = "up";
}

function swipeDown() {
  if (startMessage.classList.contains("show")) {
    startMessage.classList.remove("show");
    generateCookie();
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
  if (positionX <= 0 || positionX >= (windowWidth - 27) || positionY <= 0 || positionY >= (windowHeight - 27)) {
    endGame();
  }

  //testP.textContent = positionX + " - " + positionY;

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
    pointsP.textContent = `Score: ${points}`;
    generateCookie();
    generateLimb();
  }
}

function generateLimb() {
  let newLimb = document.createElement("div");
  let newLimbContainer = document.createElement("div");
  newLimb.classList.add("limb");
  newLimbContainer.classList.add("limb-container");

  newLimbContainer.appendChild(newLimb, null);
  snakeContainer.appendChild(newLimbContainer, snakeContainer.lastChild);

  setTimeout(function() {
    newLimbContainer.classList.add("show");
  }, 50);

  limbs = document.querySelectorAll(".limb");
}

function checkLimbCollision() {
  let currentX;

  for (let i = 2; i < points; i++) {
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
    document.removeEventListener("touchstart", onStart, true);
    document.removeEventListener("touchmove", onMove, true);
    document.removeEventListener("touchend", onEnd, true);
  cancelAnimationFrame(requestId);

  let counter = 0;
  let limbContainers = document.querySelectorAll(".limb-container");

  setInterval(function() {
    limbContainers[counter].classList.remove("show");
    counter++;
  }, 40);

  setTimeout(function() {
    startMessage.classList.add("show");
  }, 30 * points);
}

function getStartingPointX() {
  return windowWidth / 2 - 10;
}

function getStartingPointY() {
  return windowHeight / 2 - 10;
}

window.addEventListener("load", start, true);

'use strict';

class Bubble {
  constructor() {
    this.bubbleContainer = document.getElementById("bubbles");
    this.bubbleWrapper = document.querySelector(".bubble-wrapper");
    this.title = document.querySelector("#title .bubble");
    this.titleBCR = this.title.getBoundingClientRect();
    this.wrapper = document.querySelector(".wrapper");
    this.bubbleBackgrounds = document.querySelectorAll(".bubble .background");
    this.svg = document.querySelector("svg");
    this.addBubbleIcon = document.getElementById("add");
    this.removeBubbleIcon = document.getElementById("remove");
    this.addRemoveInstructions = document.getElementById("add_remove_instructions");
    this.randomColors = ["#F44336", "#9C27B0", "#1976D2", "#009688", "#4CAF50", "#FF9800", "#795548", "#E91E63"];
    this.activeBackgroundWidth = 0;
    this.activeBubbleTextWidth = 0;
    this.bubblesOnRight = 0;
    this.bubblesOnLeft = 0;
    this.containersOnRight = 0;
    this.containersOnLeft = 0;
    this.scroll = 0;
    this.removeId = 0;
    this.createId = 1;
    this.originId = 0;
    this.subCount = 0;
    this.isColorRandom = false;
    this.activeBubble = null;
    this.activeTextarea = null;
    this.activeBackground = null;
    this.activeBubbleText = null;
    this.activeContainer = null;
    this.connectedBubbles = null;
    this.activeSVG = null;
    this.containerOnRight = null;

    this.prepareBubbleWrapper = this.prepareBubbleWrapper.bind(this);
    this.shortcutKeys = this.shortcutKeys.bind(this);
    this.showTextarea = this.showTextarea.bind(this);
    this.hideTextarea = this.hideTextarea.bind(this);
    this.updateBubbleText = this.updateBubbleText.bind(this);
    this.resizeBubble = this.resizeBubble.bind(this);
    this.prepareToAddBubble = this.prepareToAddBubble.bind(this);
    this.prepareBubbleRemoval = this.prepareBubbleRemoval.bind(this);
    this.removeBubble = this.removeBubble.bind(this);
    this.cancelBubbleRemoval = this.cancelBubbleRemoval.bind(this);
    this.removeContainer = this.removeContainer.bind(this);
    this.appendBubble = this.appendBubble.bind(this);
    this.createNewBubble = this.createNewBubble.bind(this);
    this.cancelBubbleCreation = this.cancelBubbleCreation.bind(this);
    this.createNewContainer = this.createNewContainer.bind(this);
    this.positionContainer = this.positionContainer.bind(this);
    this.addContainerOnRight = this.addContainerOnRight.bind(this);
    this.addContainerOnLeft = this.addContainerOnLeft.bind(this);
    this.addNoContainer = this.addNoContainer.bind(this);
    this.scrollBubblesIntoView = this.scrollBubblesIntoView.bind(this);
    this.enforceTextarea = this.enforceTextarea.bind(this);
    this.insertBubbleOnLeft = this.insertBubbleOnLeft.bind(this);
    this.maybeScrollViewport = this.maybeScrollViewport.bind(this);
    this.scrollViewport = this.scrollViewport.bind(this);
    this.insertBubbleOnRight = this.insertBubbleOnRight.bind(this);
    this.removeConnectedBubbles = this.removeConnectedBubbles.bind(this);
    this.createNewSVG = this.createNewSVG.bind(this);

    // this.positionTitle();
    this.fadeInDocument();
    this.addEventListeners();
    this.prepareBubbleWrapper();
  }

  addEventListeners() {
    document.addEventListener("keypress", this.shortcutKeys, true);
    this.addBubbleIcon.addEventListener("click", this.prepareToAddBubble, true);
    this.removeBubbleIcon.addEventListener("click", this.prepareBubbleRemoval, true);

    for (let i = 0; i < this.bubbleBackgrounds.length; i++) {
      this.bubbleBackgrounds[i].addEventListener("click", this.showTextarea, true);
    }
  }

  prepareBubbleWrapper() {
    this.bubbleWrapper.style.transform = "translateX(0px)";
  }

  shortcutKeys(e) {
    switch (e.key) {
      case "a":
        this.prepareToAddBubble();
        break;
      case "r":
        this.prepareBubbleRemoval();
        break;
    }
  }

  positionTitle() {
    this.windowHeight = window.innerHeight;
    this.windowWidth = window.innerWidth;
    this.title.style.left = `${(window.innerWidth / 2) - (this.titleBCR.width / 2)}px`;
    this.title.style.top = `${(window.innerHeight / 2) - (this.titleBCR.height / 2)}px`;
    this.title.setAttribute("data-subcount", "0");
    this.titleRight = this.titleBCR.left + this.titleBCR.width;
  }

  fadeInDocument() {
    this.wrapper.classList.add("show");
  }

  showTextarea(e) {
    this.activeBackground = e.target;
    this.activeBubble = this.activeBackground.parentNode;
    this.activeBubbleText = this.activeBubble.childNodes[1];
    this.activeTextarea = this.activeBubble.childNodes[5];
    this.activeUnderline = this.activeBubble.childNodes[7];
    this.activeBubble.classList.add("show");
    this.activeTextarea.focus();
    this.activeTextarea.value = this.activeBubbleText.textContent;
    this.activeTextarea.select();

    this.activeTextarea.addEventListener("blur", this.hideTextarea, true)
    this.activeTextarea.addEventListener("keydown", this.updateBubbleText, true);
    this.activeBackground.removeEventListener("click", this.showTextarea, true);
    document.removeEventListener("keypress", this.shortcutKeys, true);
  }

  hideTextarea() {
    if (!this.activeBubble) {
      return;
    }

    this.activeBubble.classList.remove("show");
    this.activeBackground.addEventListener("click", this.showTextarea, true);
    this.activeTextarea.removeEventListener("keydown", this.updateBubbleText, true);
    document.addEventListener("keypress", this.shortcutKeys, true);
  }

  updateBubbleText(e) {
    if (e.key !== "Enter" && e.key !== "Escape") {
      return;
    }

    if (e.key === "Escape") {
      this.hideTextarea();
      return;
    }

    this.activeBubble.classList.remove("show");
    this.activeTextarea.blur();
    this.activeBubbleText.textContent = this.activeTextarea.value;
    this.activeBubbleTextWidth = this.activeBubbleText.offsetWidth;
    this.activeBubbleTextHeight = this.activeBubbleText.offsetHeight;
    this.resizeBubble();
  }

  resizeBubble() {
    /*this.activeBackgroundBCR = this.activeBackground.getBoundingClientRect();
    this.activeBubbleTextBCR = this.activeBubbleText.getBoundingClientRect();

    let scaleY = 1;
    let translateY = 0;

    if (this.activeBubble === this.title) {
      scaleY = (this.activeBubbleTextBCR.height + 36) / 58;
    }

    let scaleX = (this.activeBubbleTextBCR.width + 6) / 127;

    if (scaleX > 2.1) {
      scaleX = 2.1;
    }

    this.activeBackground.style.transform = `scale(${scaleX}, ${scaleY}) translateY(${translateY}px)`; */
  }

  prepareToAddBubble() {
    for (let i = 0; i < this.bubbleBackgrounds.length; i++) {
      this.bubbleBackgrounds[i].removeEventListener("click", this.showTextarea, true);
      this.bubbleBackgrounds[i].addEventListener("click", this.appendBubble, false);
    }

    this.addRemoveInstructions.classList.add("show");
    document.removeEventListener("keydown", this.shortcutKeys, true);
    document.addEventListener("keydown", this.cancelBubbleCreation, true);
  }

  appendBubble(e) {
    document.removeEventListener("keydown", this.cancelBubbleCreation, true);
    this.target = e.target;
    this.targetBCR = this.target.getBoundingClientRect();
    this.activeBubble = this.target.parentNode;
    this.activeContainer = this.activeBubble.parentNode;

    if (Number(this.activeBubble.id)) {
      this.originId = Number(this.activeBubble.id);
    }

    if (this.activeBubble === this.title) {
      this.isColorRandom = true;
    } else {
      this.isColorRandom = false;
    }

    if (this.activeBubble === this.title) {
      if (this.containersOnRight == 0 && this.containersOnLeft === 0) {
        // Add a container to the right
        this.bubblesOnRight++;
        this.addContainerOnRight();
      } else if (this.containersOnRight > 0 && this.containersOnLeft === 0) {
        // Add a container to the left
        this.bubblesOnLeft--;
        this.addContainerOnLeft();
      } else {
        // Add no container
        this.addNoContainer();
      }
    } else {
      let subCount = Number(this.activeContainer.getAttribute("data-subcount"));

      if (subCount < 0) {

        if (subCount > this.containersOnLeft) {
          this.insertBubbleOnLeft();
        } else {
          this.addContainerOnLeft();
        }

      } else {

        if (subCount < this.containersOnRight) {
          this.insertBubbleOnRight();
        } else {
          this.addContainerOnRight();
        }

      }
    }

    if (this.bubblesOnRight <= Math.abs(this.bubblesOnLeft)) {

    } else {

    }
  }

  addContainerOnRight() {
    let newContainer = this.createNewContainer();
    newContainer.classList.add("align-left");
    this.subCount = Number(this.activeContainer.getAttribute("data-subcount"));
    this.subCount++;
    let newBubble = this.createNewBubble();
    let bubbleCount = 1;
    let newSVG = this.createNewSVG(true, newContainer);
    this.activeSVG = newSVG;
    newContainer.setAttribute("data-subcount", this.subCount);
    newContainer.setAttribute("data-bubblecount", bubbleCount);
    let a = Number(this.activeContainer.getAttribute("data-subcount"));
    let b = Number(newContainer.getAttribute("data-subcount"));
    this.containersOnRight++;
    this.bubbleWrapper.appendChild(newContainer, null);
    this.positionContainer(true, newContainer);
    newContainer.appendChild(newBubble, null);
    this.cancelBubbleCreation();
    this.maybeScrollViewport();
    this.activeContainer.appendChild(newSVG, this.activeContainer.lastChild);
    new Line("right", this.activeBubble, newBubble);
    this.enforceTextarea(newBubble);
  }

  addContainerOnLeft() {
    let newContainer = this.createNewContainer();
    newContainer.classList.add("align-right");
    let newBubble = this.createNewBubble();
    let newSVG = this.createNewSVG(false, newContainer);
    this.activeSVG = newSVG;
    let subCount = Number(this.activeContainer.getAttribute("data-subcount"));
    subCount--;
    let bubbleCount = 1;
    newContainer.setAttribute("data-subcount", subCount);
    newContainer.setAttribute("data-bubblecount", bubbleCount);
    let a = Number(this.activeContainer.getAttribute("data-subcount"));
    let b = Number(newContainer.getAttribute("data-subcount"));
    this.containersOnLeft--;
    this.bubbleWrapper.insertBefore(newContainer, this.bubbleWrapper.firstChild);
    this.positionContainer(false, newContainer);
    newContainer.appendChild(newBubble, null);
    this.activeContainer.appendChild(newSVG, this.activeContainer.lastChild);
    this.cancelBubbleCreation();
    this.scrollBubblesIntoView();
    new Line("left", this.activeBubble, newBubble);
    this.enforceTextarea(newBubble);
  }

  createNewSVG(isRight, newContainer) {
    let newSVG = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    let subCount = Number(this.activeContainer.getAttribute("data-subcount"));

    if (isRight) {
      newSVG.style.left = "50%";
      newSVG.setAttribute("data-id", `${subCount}_${subCount + 1}`);
    } else {
      newSVG.style.right = "50%";
      newSVG.setAttribute("data-id", `${subCount}_${subCount - 1}`);
    }

    return newSVG;
  }

  addNoContainer() {
    let newBubble = this.createNewBubble();

    if (this.bubblesOnRight <= Math.abs(this.bubblesOnLeft)) {
      // Add a bubble to the container on your right
      this.bubblesOnRight++;
      let subCount = Number(this.activeContainer.getAttribute("data-subcount"));
      subCount++;
      let containerOnRight = document.querySelector(".container[data-subcount='" + subCount + "']");
      let bubbleCount = Number(containerOnRight.getAttribute("data-bubblecount"));
      bubbleCount++;
      containerOnRight.setAttribute("data-bubblecount", bubbleCount);
      containerOnRight.appendChild(newBubble, null);
      new Line("right", this.activeBubble, newBubble);
    } else {
      // Add a bubble to the container on your left
      this.bubblesOnLeft--;
      let subCount = Number(this.activeContainer.getAttribute("data-subcount"));
      subCount--;
      let containerOnLeft = document.querySelector(`.container[data-subcount='${subCount}']`);
      let bubbleCount = Number(containerOnLeft.getAttribute("data-bubblecount"));
      bubbleCount++;
      containerOnLeft.setAttribute("data-bubblecount", bubbleCount);
      containerOnLeft.appendChild(newBubble, null);
      new Line("left", this.activeBubble, newBubble);
    }

    this.cancelBubbleCreation();
    this.enforceTextarea(newBubble);
  }

  insertBubbleOnRight() {
    this.subCount = Number(this.activeContainer.getAttribute("data-subcount"));
    this.subCount++;
    let newBubble = this.createNewBubble();
    let containerOnRight = document.querySelector(`.container[data-subcount='${subCount}']`);
    let bubbleCount = Number(containerOnRight.getAttribute("data-bubblecount"));
    this.activeSVG = this.activeContainer.childNodes[1];
    bubbleCount++;
    containerOnRight.setAttribute("data-bubblecount", bubbleCount);

    let dataOrigin = Number(newBubble.getAttribute("data-origin"));
    for (let i = 0; i < containerOnRight.childNodes.length; i++) {
      let currentDataOrigin = Number(containerOnRight.childNodes[i].getAttribute("data-origin"));

      if (currentDataOrigin > dataOrigin) {
        containerOnRight.insertBefore(newBubble, containerOnRight.childNodes[i]);
        break;
      }

      if (i === containerOnRight.childNodes.length - 1) {
        containerOnRight.appendChild(newBubble, containerOnRight.lastChild);
        break;
      }
    }

    this.cancelBubbleCreation();
    new Line("right", this.activeBubble, newBubble);
    this.enforceTextarea(newBubble);
  }

  insertBubbleOnLeft() {
    let newBubble = this.createNewBubble();
    let subCount = Number(this.activeContainer.getAttribute("data-subcount"));
    subCount--;
    let containerOnLeft = document.querySelector(`.container[data-subcount='${subCount}']`);
    let bubbleCount = Number(containerOnLeft.getAttribute("data-bubblecount"));
    bubbleCount++;
    containerOnLeft.setAttribute("data-bubblecount", bubbleCount);
    this.activeSVG = this.activeContainer.childNodes[1];
    this.cancelBubbleCreation();

    let dataOrigin = Number(newBubble.getAttribute("data-origin"));
    for (let i = 0; i < containerOnLeft.childNodes.length; i++) {
      let currentDataOrigin = Number(containerOnLeft.childNodes[i].getAttribute("data-origin"));

      if (currentDataOrigin > dataOrigin) {
        containerOnLeft.insertBefore(newBubble, containerOnLeft.childNodes[i]);
        break;
      }

      if (i === containerOnLeft.childNodes.length - 1) {
        containerOnLeft.appendChild(newBubble, containerOnLeft.lastChild);
        break;
      }
    }

    new Line(this.activeBubble, newBubble);
    this.enforceTextarea(newBubble);
  }

  createNewContainer() {
    let newContainer = document.createElement("DIV");
    newContainer.classList.add("container");
    return newContainer;
  }

  createNewBubble() {
    let rnd = 0;
    let color = "";
    let newBubble = document.createElement("DIV");
    let background = document.createElement("DIV");
    let p = document.createElement("P");
    background.classList.add("background");

    if (this.isColorRandom) {
      rnd = Math.floor(Math.random() * 8);
      color = this.randomColors[rnd];
    }

    if (Math.abs(this.subCount) === 1) {
      background.style.backgroundColor = color;
      p.style.color = "white";
    } else if (Math.abs(this.subCount) === 2) {
      color = this.activeBackground.style.backgroundColor;
      background.style.border = `2px solid ${color}`;
      p.style.color = color;
    }

    let textarea = document.createElement("TEXTAREA");
    let bubbleSquare = document.createElement("DIV");
    bubbleSquare.classList.add("bubble-square");
    textarea.placeholder = "Write something for this bubble...";
    textarea.spellcheck = false;
    newBubble.classList.add("bubble");
    newBubble.id = this.createId;
    newBubble.setAttribute("data-id", this.createId);
    this.createId++;

    if (this.originId) {
      newBubble.setAttribute("data-origin", this.originId);
    }

    newBubble.appendChild(document.createElement("SPAN"), null);
    newBubble.appendChild(p, null);
    newBubble.appendChild(document.createElement("SPAN"), null);
    newBubble.appendChild(background, null);
    newBubble.appendChild(document.createElement("SPAN"), null);
    newBubble.appendChild(textarea, null);
    newBubble.appendChild(bubbleSquare, null);
    return newBubble;
  }

  positionContainer(isRight, newContainer) {
    let comMarginLeft = window.getComputedStyle(newContainer).marginLeft;
    let subCount = Number(newContainer.getAttribute("data-subcount"));
    let marginLeft = 0;

    // BEFORE: marginLeft += (320 * subCount) - 160;
    marginLeft += (350 * subCount) - 160;

    newContainer.style.marginLeft = `${marginLeft}px`;
  }

  enforceTextarea(bubble) {
    this.activeBubble = bubble;
    this.activeBackground = this.activeBubble.childNodes[3];
    this.activeBubbleText = this.activeBubble.childNodes[1];
    this.activeTextarea = this.activeBubble.childNodes[5];
    this.activeUnderline = this.activeBubble.childNodes[7];

    let activeBubble = this.activeBubble;
    let activeTextarea = this.activeTextarea;
    let activeBubbleText = this.activeBubbleText;

    setTimeout(function() {
      activeBubble.classList.add("show");
      activeTextarea.focus();
      activeTextarea.value = activeBubbleText.textContent;
      activeTextarea.select();
    }, 200);

    this.activeTextarea.addEventListener("blur", this.hideTextarea, true)
    this.activeTextarea.addEventListener("keydown", this.updateBubbleText, true);
    this.activeBackground.removeEventListener("click", this.showTextarea, true);
    document.removeEventListener("keypress", this.shortcutKeys, true);
  }

  prepareBubbleRemoval() {
    this.bubbleBackgrounds = document.querySelectorAll(".bubble .background");

    for (let i = 0; i < this.bubbleBackgrounds.length; i++) {
      this.bubbleBackgrounds[i].removeEventListener("click", this.showTextarea, true);
      this.bubbleBackgrounds[i].addEventListener("click", this.removeBubble, true);
    }

    document.removeEventListener("keydown", this.shortcutKeys, true);
    document.addEventListener("keydown", this.cancelBubbleRemoval, true);

    this.addRemoveInstructions.classList.add("show");
  }

  removeBubble(e) {
    this.activeBackground = e.target;
    this.activeBubble = this.activeBackground.parentNode;
    this.originId = Number(this.activeBubble.id);
    console.log(this.activeBackground);

    if (this.activeBubble === this.title) {
      this.cancelBubbleRemoval();
      return;
    }

    this.activeContainer = this.activeBubble.parentNode;
    this.activeContainer.removeChild(this.activeBubble);
    this.removeId = Number(this.activeBubble.id);
    let bubbleCount = Number(this.activeContainer.getAttribute("data-bubblecount"));
    bubbleCount--;
    this.activeContainer.setAttribute("data-bubblecount", bubbleCount);

    if (bubbleCount === 0) {
      this.removeContainer();
    }

    this.removeConnectedBubbles();
    this.cancelBubbleRemoval();
  }

  removeContainer() {
    this.bubbleWrapper.removeChild(this.activeContainer);
  }

  removeConnectedBubbles() {
    this.connectedBubbles = document.querySelectorAll(`.bubble[data-origin="${this.originId}"]`);

    for (let i = 0; i < this.connectedBubbles.length; i++) {
      let container = this.connectedBubbles[i].parentNode;
      container.removeChild(this.connectedBubbles[i]);
      let bubbleCount = Number(container.getAttribute("data-bubblecount"));
      bubbleCount--;
      container.setAttribute("data-bubblecount", bubbleCount);

      if (bubbleCount === 0) {
        this.bubbleWrapper.removeChild(container);
      }
    }
  }

  cancelBubbleRemoval(e) {
    if (e && e.key !== "Escape") {
      return;
    }

    this.addRemoveInstructions.classList.remove("show");

    for (let i = 0; i < this.bubbleBackgrounds.length; i++) {
      this.bubbleBackgrounds[i].removeEventListener("click", this.removeBubble, true);
      this.bubbleBackgrounds[i].addEventListener("click", this.showTextarea, true);
    }

    document.addEventListener("keydown", this.shortcutKeys, true);
    document.removeEventListener("keydown", this.cancelBubbleRemoval, true);
  }

  cancelBubbleCreation(e) {
    if (e && e.keyCode !== 27) {
      return;
    }

    this.addRemoveInstructions.classList.remove("show");
    document.addEventListener("keypress", this.shortcutKeys, true);
    this.bubbleBackgrounds = document.querySelectorAll(".bubble .background")

    for (let i = 0; i < this.bubbleBackgrounds.length; i++) {
      this.bubbleBackgrounds[i].addEventListener("click", this.showTextarea, true);
      this.bubbleBackgrounds[i].removeEventListener("click", this.appendBubble, false);
    }

    document.removeEventListener("keydown", this.cancelBubbleCreation, true);
  }

  scrollBubblesIntoView() {
    let container = document.querySelector(".container");
    let containerBCR = container.getBoundingClientRect();

    if (containerBCR.left >= 0) {
      return;
    }

    let transform = this.bubbleWrapper.style.transform;
    transform = transform.replace("translateX(", "");
    transform = transform.replace("px)", "");
    transform = Number(transform);
    transform += 300;
    this.bubbleWrapper.style.transform = `translateX(${transform}px)`;
  }

  maybeScrollViewport() {
    let container = document.querySelector(".container:last-child");
    let containerBCR = container.getBoundingClientRect();

    if (window.innerWidth - containerBCR.right >= 0) {
      return;
    }

    this.maxScroll = this.bubbleContainer.scrollWidth - this.bubbleContainer.clientWidth;
    this.scroll = this.bubbleContainer.scrollLeft;
    requestAnimationFrame(this.scrollViewport);
  }

  scrollViewport() {
    this.requestId = requestAnimationFrame(this.scrollViewport);

    if (this.scroll >= (this.maxScroll - 10)) {
      cancelAnimationFrame(this.requestId);
    }

    this.scroll += (this.maxScroll - this.scroll) / 5;
    this.bubbleContainer.scrollLeft = this.scroll;
  }
}

window.addEventListener("load", () => new Bubble(), true);


// Remove connencted bubbles!!!!!!!!!!!!!

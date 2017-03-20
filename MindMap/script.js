'use strict';

class App {
  constructor() {
    this.bubbleContainer = document.getElementById("bubbles");
    this.title = document.getElementById("title");
    this.titleBCR = this.title.getBoundingClientRect();
    this.wrapper = document.querySelector(".wrapper");
    this.bubbleBackgrounds = document.querySelectorAll(".bubble .background");
    this.svg = document.querySelector("svg");
    this.addBubbleIcon = document.getElementById("add");
    this.removeBubbleIcon = document.getElementById("remove");
    this.addRemoveInstructions = document.getElementById("add_remove_instructions");
    this.randomColors = ["#F44336", "#9C27B0", "#1976D2", "#009688", "#4CAF50", "#FF9800", "#795548"];
    this.activeBackgroundWidth = 0;
    this.activeBubbleTextWidth = 0;
    this.bubblesOnRight = 0;
    this.bubblesOnLeft = 0;
    this.activeBubble = null;
    this.activeTextarea = null;
    this.activeBackground = null;
    this.activeBubbleText = null;

    this.shortcutKeys = this.shortcutKeys.bind(this);
    this.showTextarea = this.showTextarea.bind(this);
    this.hideTextarea = this.hideTextarea.bind(this);
    this.updateBubbleText = this.updateBubbleText.bind(this);
    this.resizeBubble = this.resizeBubble.bind(this);
    this.addBubble = this.addBubble.bind(this);
    this.removeBubble = this.removeBubble.bind(this);
    this.appendBubble = this.appendBubble.bind(this);
    this.createNewBubble = this.createNewBubble.bind(this);
    this.cancelBubbleCreation = this.cancelBubbleCreation.bind(this);
    this.repositionBubble = this.repositionBubble.bind(this);

    this.positionTitle();
    this.fadeInDocument();
    this.addEventListeners();
  }

  addEventListeners() {
    document.addEventListener("keypress", this.shortcutKeys, true);
    this.addBubbleIcon.addEventListener("click", this.addBubble, true);
    this.removeBubbleIcon.addEventListener("click", this.removeBubble, true);

    for (let i = 0; i < this.bubbleBackgrounds.length; i++) {
      this.bubbleBackgrounds[i].addEventListener("click", this.showTextarea, true);
    }
  }

  shortcutKeys(e) {
    // console.log(e.keyCode);

    switch (e.keyCode) {
      case 97:
        this.addBubble();
        break;
      case 114:
        this.removeBubble();
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
    this.activeBubble.classList.add("show");
    this.activeTextarea.focus();
    this.activeTextarea.value = this.activeBubbleText.textContent;
    this.activeTextarea.select();

    this.activeTextarea.addEventListener("blur", this.hideTextarea, true)
    this.activeTextarea.addEventListener("keypress", this.updateBubbleText, true);
    this.activeBackground.removeEventListener("click", this.showTextarea, true);
    document.removeEventListener("keypress", this.shortcutKeys, true);
  }

  hideTextarea() {
    if (!this.activeBubble) {
      return;
    }

    this.activeBubble.classList.remove("show");
    this.activeBackground.addEventListener("click", this.showTextarea, true);
    document.addEventListener("keypress", this.shortcutKeys, true);
  }

  updateBubbleText(e) {
    if (e.keyCode !== 13) {
      return;
    }

    this.activeBubble.classList.remove("show");
    this.activeTextarea.blur();
    this.activeBubbleText.textContent = this.activeTextarea.value;
    this.activeBubbleTextWidth = this.activeBubbleText.offsetWidth;

    // Add a resizing method that resizes the bubble if text is too large!!!!
    this.resizeBubble();
  }

  resizeBubble() {
    this.activeBackgroundWidth = this.activeBackground.offsetWidth;
    let scale = (this.activeBubbleTextWidth + 50) / this.activeBackgroundWidth;
    this.activeBackground.style.transform = `scaleX(${scale})`;
    this.repositionBubble(this.activeBubble);
    this.activeBubble = null;
    this.activeBackground = null;
  }

  addBubble() {
    this.addRemoveInstructions.classList.add("show");
    document.removeEventListener("keypress", this.shortcutKeys, true);
    document.addEventListener("keydown", this.cancelBubbleCreation, true);

    for (let i = 0; i < this.bubbleBackgrounds.length; i++) {
      this.bubbleBackgrounds[i].removeEventListener("click", this.showTextarea, true);
      this.bubbleBackgrounds[i].addEventListener("click", this.appendBubble, true);
    }
  }

  appendBubble(e) {
    document.removeEventListener("keydown", this.cancelBubbleCreation, true);
    this.target = e.target;
    this.targetBCR = this.target.getBoundingClientRect();
    this.activeBubble = this.target.parentNode;
    let newBubble = this.createNewBubble();
    let topOffset = 0;
    let leftOffset;

    if (this.bubblesOnRight <= this.bubblesOnLeft) {
      this.bubblesOnRight++;
      leftOffset = this.targetBCR.left + this.targetBCR.width + 60;
    } else {
      this.bubblesOnLeft++;
    }

    topOffset = this.targetBCR.top;

    newBubble.style.left = `${leftOffset}px`;
    newBubble.style.top = `${topOffset}px`;
    this.bubbleContainer.appendChild(newBubble, null);
    this.cancelBubbleCreation();
  }

  createNewBubble() {
    let newBubble = document.createElement("DIV");
    let p = document.createElement("P");
    let background = document.createElement("DIV");
    let textarea = document.createElement("TEXTAREA");
    let bubbleSquare = document.createElement("DIV");
    let subCount = Number(this.activeBubble.getAttribute("data-subcount"));
    let rnd = Math.floor(Math.random() * 7);
    let color = this.randomColors[rnd];
    subCount++;
    p.style.color = color;
    bubbleSquare.classList.add("bubble-square");
    background.classList.add("background");
    background.style.borderBottom = `2px solid ${color}`;
    textarea.placeholder = "Write something for this bubble...";
    textarea.spellcheck = false;
    newBubble.classList.add("bubble");
    newBubble.setAttribute("data-subcount", subCount);
    newBubble.appendChild(document.createElement("SPAN"), null);
    newBubble.appendChild(p, null);
    newBubble.appendChild(background, null);
    newBubble.appendChild(document.createElement("SPAN"), null);
    newBubble.appendChild(document.createElement("SPAN"), null);
    newBubble.appendChild(textarea, null);
    newBubble.appendChild(bubbleSquare, null);

    return newBubble;
  }

  removeBubble() {
    console.log("Remove bubble");
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
      this.bubbleBackgrounds[i].removeEventListener("click", this.appendBubble, true);
    }

    document.removeEventListener("keydown", this.cancelBubbleCreation, true);
  }

  repositionBubble(bubbl) {
    let bubble = bubbl;

    if (bubble.id == "title") {
      return;
    }

    let bubbleBCR = bubble.getBoundingClientRect();
    let offset = bubbleBCR.left - this.titleRight;
    console.log(bubbleBCR.left + " - " + this.titleRight);
    let subCount = Number(bubble.getAttribute("data-subcount"));

    if (offset < (60 * subCount)) {
      let transform = 60 - offset;
      bubble.style.transform = "translateX(" + offset + "px)";
    }
  }
}

window.addEventListener("load", () => new App(), true);

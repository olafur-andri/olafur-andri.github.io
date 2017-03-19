'use strict';

class App {
  constructor() {
    this.title = document.getElementById("title");
    this.titleBCR = this.title.getBoundingClientRect();
    this.wrapper = document.querySelector(".wrapper");
    this.bubbleBackgrounds = document.querySelectorAll(".bubble .background");
    this.svg = document.querySelector("svg");
    this.addBubbleIcon = document.getElementById("add");
    this.removeBubbleIcon = document.getElementById("remove");
    this.activeBubble = null;
    this.activeTextarea = null;
    this.activeBackground = null;
    this.activeBackgroundWidth = 0;
    this.activeBubbleText = null;
    this.activeBubbleTextWidth = 0;

    this.shortcutKeys = this.shortcutKeys.bind(this);
    this.showTextarea = this.showTextarea.bind(this);
    this.hideTextarea = this.hideTextarea.bind(this);
    this.updateBubbleText = this.updateBubbleText.bind(this);
    this.resizeBubble = this.resizeBubble.bind(this);
    this.addBubble = this.addBubble.bind(this);
    this.removeBubble = this.removeBubble.bind(this);

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
    this.activeBubble = null;
    this.activeBackground = null;
  }

  addBubble() {
    console.log("Add Bubble");
  }

  removeBubble() {
    console.log("Remove bubble");
  }
}

window.addEventListener("load", () => new App(), true);

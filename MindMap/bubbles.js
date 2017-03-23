'use strict';

class Bubbles {
  constructor() {
    this.bubbleContainer = document.getElementById("bubbles");
    this.title = document.querySelector("#title .bubble");
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
    this.containersOnRight = 0;
    this.containersOnLeft = 0;
    this.activeBubble = null;
    this.activeTextarea = null;
    this.activeBackground = null;
    this.activeBubbleText = null;
    this.activeContainer = null;

    this.shortcutKeys = this.shortcutKeys.bind(this);
    this.showTextarea = this.showTextarea.bind(this);
    this.hideTextarea = this.hideTextarea.bind(this);
    this.updateBubbleText = this.updateBubbleText.bind(this);
    this.resizeBubble = this.resizeBubble.bind(this);
    this.prepareToAddBubble = this.prepareToAddBubble.bind(this);
    this.removeBubble = this.removeBubble.bind(this);
    this.appendBubble = this.appendBubble.bind(this);
    this.createNewBubble = this.createNewBubble.bind(this);
    this.cancelBubbleCreation = this.cancelBubbleCreation.bind(this);
    this.createNewContainer = this.createNewContainer.bind(this);
    this.positionContainer = this.positionContainer.bind(this);
    this.addContainerOnRight = this.addContainerOnRight.bind(this);
    this.addContainerOnLeft = this.addContainerOnLeft.bind(this);
    this.addNoContainer = this.addNoContainer.bind(this);
    this.resizePageIfNeeded = this.resizePageIfNeeded.bind(this);
    this.enforceTextarea = this.enforceTextarea.bind(this);
    this.insertBubbleOnLeft = this.insertBubbleOnLeft.bind(this);

    // this.positionTitle();
    this.fadeInDocument();
    this.addEventListeners();
  }

  addEventListeners() {
    document.addEventListener("keypress", this.shortcutKeys, true);
    this.addBubbleIcon.addEventListener("click", this.prepareToAddBubble, true);
    this.removeBubbleIcon.addEventListener("click", this.removeBubble, true);

    for (let i = 0; i < this.bubbleBackgrounds.length; i++) {
      this.bubbleBackgrounds[i].addEventListener("click", this.showTextarea, true);
    }
  }

  shortcutKeys(e) {
    switch (e.key) {
      case "a":
        this.prepareToAddBubble();
        break;
      case "r":
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
    this.activeBackgroundBCR = this.activeBackground.getBoundingClientRect();
    this.activeBubbleTextBCR = this.activeBubbleText.getBoundingClientRect();

    let scaleY = 1;
    let translateY = 0;

    if (this.activeBubble !== this.title) {
      /*translateY = this.activeBubbleTextBCR.height - 19;
      translateY /= 2;*/
      // FLIP the animation
    } else {
      scaleY = (this.activeBubbleTextBCR.height + 31) / 50;
    }

    let scaleX = (this.activeBubbleTextBCR.width + 50) / 127;

    if (scaleX > 2.36) {
      scaleX = 2.36;
    }

    this.activeBackground.style.transform = `scale(${scaleX}, ${scaleY}) translateY(${translateY}px)`;
  }

  prepareToAddBubble() {
    for (let i = 0; i < this.bubbleBackgrounds.length; i++) {
      this.bubbleBackgrounds[i].removeEventListener("click", this.showTextarea, true);
      this.bubbleBackgrounds[i].addEventListener("click", this.appendBubble, false);
    }

    this.addRemoveInstructions.classList.add("show");
    document.removeEventListener("keydown", this.shortcutKeys, true);
    document.addEventListener("keydown", this.cancelBubbleCreation, true);
    isAdding = true;
  }

  appendBubble(e) {
    document.removeEventListener("keydown", this.cancelBubbleCreation, true);
    this.target = e.target;
    this.targetBCR = this.target.getBoundingClientRect();
    this.activeBubble = this.target.parentNode;
    this.activeContainer = this.activeBubble.parentNode;

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
          console.log("Don't add a new container to your left");
          this.insertBubbleOnLeft();
        } else {
          console.log("Add a new container to your left");
          this.addContainerOnLeft();
        }

      } else {

        if (subCount < this.containersOnRight) {
          console.log("Don't add a new container on your right");
          this.addNoContainer();
        } else {
          console.log("Add a new container on your right");
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
    let newBubble = this.createNewBubble();
    let subCount = Number(this.activeContainer.getAttribute("data-subcount"));
    subCount++;
    let bubbleCount = 1;
    newContainer.setAttribute("data-subcount", subCount);
    newContainer.setAttribute("data-bubblecount", bubbleCount);
    this.containersOnRight++;
    this.bubbleContainer.appendChild(newContainer, null);
    this.positionContainer(true, newContainer);
    newContainer.appendChild(newBubble, null);
    this.cancelBubbleCreation();
    this.enforceTextarea(newBubble);
  }

  addContainerOnLeft() {
    let newContainer = this.createNewContainer();
    let newBubble = this.createNewBubble();
    let subCount = Number(this.activeContainer.getAttribute("data-subcount"));
    subCount--;
    let bubbleCount = 1;
    newContainer.setAttribute("data-subcount", subCount);
    newContainer.setAttribute("data-bubblecount", bubbleCount);
    this.containersOnLeft--;
    this.bubbleContainer.insertBefore(newContainer, this.bubbleContainer.firstChild);
    this.positionContainer(false, newContainer);
    newContainer.appendChild(newBubble, null);
    this.cancelBubbleCreation();
    this.resizePageIfNeeded();
    this.enforceTextarea(newBubble);
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
    }

    this.cancelBubbleCreation();
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
    containerOnLeft.appendChild(newBubble, null);
    this.cancelBubbleCreation();
    this.enforceTextarea(newBubble);
  }

  createNewContainer() {
    let newContainer = document.createElement("DIV");
    newContainer.classList.add("container");
    return newContainer;
  }

  createNewBubble() {
    let newBubble = document.createElement("DIV");
    let p = document.createElement("P");
    let background = document.createElement("DIV");
    let textarea = document.createElement("TEXTAREA");
    let bubbleSquare = document.createElement("DIV");
    let rnd = Math.floor(Math.random() * 7);
    let color = this.randomColors[rnd];
    p.style.color = color;
    bubbleSquare.classList.add("bubble-square");
    background.classList.add("background");
    background.style.borderBottom = `2px solid ${color}`;
    textarea.placeholder = "Write something for this bubble...";
    textarea.spellcheck = false;
    newBubble.classList.add("bubble");
    newBubble.appendChild(document.createElement("SPAN"), null);
    newBubble.appendChild(p, null);
    newBubble.appendChild(background, null);
    newBubble.appendChild(document.createElement("SPAN"), null);
    newBubble.appendChild(document.createElement("SPAN"), null);
    newBubble.appendChild(textarea, null);
    newBubble.appendChild(bubbleSquare, null);
    return newBubble;
  }

  positionContainer(isRight, newContainer) {
    let comMarginLeft = window.getComputedStyle(newContainer).marginLeft;
    let subCount = Number(newContainer.getAttribute("data-subcount"));
    let marginLeft = 0;

    marginLeft += (300 * subCount) - 150;
    newContainer.style.marginLeft = `${marginLeft}px`;
  }

  enforceTextarea(bubble) {
    this.activeBackground = bubble.childNodes[2];
    this.activeBubble = bubble;
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
      this.bubbleBackgrounds[i].removeEventListener("click", this.appendBubble, false);
    }

    document.removeEventListener("keydown", this.cancelBubbleCreation, true);
  }

  resizePageIfNeeded() {
    let newContainer = document.querySelector(".container");
    let newContainerBCR = newContainer.getBoundingClientRect();

    if (newContainerBCR.left < 0) {
      let initialWidth = this.bubbleContainer.offsetWidth;
      let newWidth = initialWidth + 300;
      this.bubbleContainer.style.width = `${newWidth}px`;
    }
  }
}

window.addEventListener("load", () => new Bubbles(), true);

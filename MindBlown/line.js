'use strict';

class Line {
  constructor(direction, activeBubble, newBubble) {
    this.bubbleBackgrounds = document.querySelectorAll(".bubble .background");
    this.activeBubble = activeBubble;
    this.newBubble = newBubble;
    this.activeSVG = null;
    this.direction = direction;
    this.activeSVGBCR = null;
    this.activeBackground = null;
    this.newBackground = null;
    this.activeBackgroundBCR = null;
    this.newBackgroundBCR = null;
    this.newPath = null;
    this.requestId = null;
    this.newBackgroundText = null;
    this.newBackgroundTextBCR = null;
    this.activeContainer = null;
    this.activeContainerSubCount = 0;
    this.newContainer = null;
    this.activePath = null;
    this.newContainerSubCount = 0;
    this.newContainerBubbleCount = 0;
    this.startX = 0;
    this.secondX = 0;
    this.thirdX = 0;
    this.endX = 0;
    this.startY = 0;
    this.secondY = 0;
    this.thirdY = 0;
    this.endY = 0;
    this.numOfPaths = 0;
    this.pathColor = "";
    this.dataConnection = "";
    this.splitDataConnection = [];
    this.leftHandID = "";
    this.rightHandID = "";

    this.createNewConnection = this.createNewConnection.bind(this);
    this.drawNewConnection  = this.drawNewConnection.bind(this);
    this.drawLineEffect = this.drawLineEffect.bind(this);
    this.getCoordinatesForLeft = this.getCoordinatesForLeft.bind(this);
    this.getCoordinatesForRight = this.getCoordinatesForRight.bind(this);

    this.createNewConnection();
  }

  createNewConnection() {
    this.activeContainer = this.activeBubble.parentNode;
    this.activeContainerSubCount = Number(this.activeContainer.getAttribute("data-subcount"));
    this.newContainer = this.newBubble.parentNode;
    this.newContainerSubCount = Number(this.newContainer.getAttribute("data-subcount"));
    this.activeSVG = document.querySelector(`svg[data-id="${this.activeContainerSubCount}_${this.newContainerSubCount}`);
    this.newPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
    this.activeBackground = this.activeBubble.childNodes[3];
    this.newBackground = this.newBubble.childNodes[3];
    this.newBackgroundBCR = this.newBackground.getBoundingClientRect();
    this.newBackgroundText = this.newBubble.childNodes[1];
    this.newBackgroundTextBCR = this.newBackgroundText.getBoundingClientRect();
    this.pathColor = this.newBackground.style.backgroundColor;
    this.activeBubbleBCR = this.activeBubble.getBoundingClientRect();
    this.activeBackgroundBCR = this.activeBackground.getBoundingClientRect();
    this.newBubbleBCR = this.newBubble.getBoundingClientRect();
    this.activeSVGBCR = this.activeSVG.getBoundingClientRect();

    // Add an if statement that checks whether this is the first line that is being drawn in this certain container!!
    this.newContainerBubbleCount = Number(this.newContainer.getAttribute("data-bubblecount"));

    if (this.direction === "right") {
      this.getCoordinatesForRight();
    } else if (this.direction === "left") {
      this.getCoordinatesForLeft();
    } else {
      throw new SyntaxError("Parameter 1 in 'new Line()' is neither 'right' nor 'left'!");
    }

    this.leftHandID = this.activeBubble.id;
    this.rightHandID = this.newBubble.id;
    this.dataConnection = `${this.leftHandID}_${this.rightHandID}`;
    this.newPath.setAttribute("data-connection", this.dataConnection);
    this.newPath.setAttribute("d", `M${this.startX} ${this.startY} L${this.secondX} ${this.secondY} L${this.thirdX} ${this.thirdY} L${this.endX} ${this.endY}`);
    this.newPath.setAttribute("stroke", this.pathColor);
    this.activeSVG.appendChild(this.newPath, null);
    // this.drawNewConnection();

    this.numOfPaths = this.activeSVG.childNodes.length;
    
    if (this.numOfPaths === 1) {
      return;
    }

    for (let i = 0; i < this.numOfPaths - 1; i++) {
      this.activePath = this.activeSVG.childNodes[i];
      this.dataConnection = this.activePath.getAttribute("data-connection");
      this.splitDataConnection = this.dataConnection.split("_");
      this.leftHandID = this.splitDataConnection[0];
      this.rightHandID = this.splitDataConnection[1];
      this.activeBackground = document.querySelector(`.bubble[data-id="${this.leftHandID}"] .background`);
      this.activeBackgroundBCR = this.activeBackground.getBoundingClientRect();
      this.newBackground = document.querySelector(`.bubble[data-id="${this.rightHandID}"] .background`);
      this.newBackgroundBCR = this.newBackground.getBoundingClientRect();
      
      if (this.direction === "right") {
        this.getCoordinatesForRight();
      } else if (this.direction === "left") {
        this.getCoordinatesForLeft();
      } else {
        console.log("Direction in 'new Line()' is not correct!!!");
      }

      this.activePath.setAttribute("d", `M${this.startX} ${this.startY} L${this.secondX} ${this.secondY} L${this.thirdX} ${this.thirdY} L${this.endX} ${this.endY}`);
    }
  }

  getCoordinatesForRight() {
    this.startX = (this.activeBackgroundBCR.width / 2) + 12;
    this.startY = this.activeBubbleBCR.top + (this.activeBubbleBCR.height / 2) - (window.innerHeight / 2);
    this.secondX = this.startX + 60;
    this.secondY = this.startY;
    this.thirdX = this.secondX;
    this.thirdY = this.newBackgroundBCR.top + (this.newBackgroundBCR.height / 2) - (window.innerHeight / 2);
    this.endX = this.newBackgroundBCR.left + 1 - this.activeSVGBCR.left;
    this.endY = this.thirdY;
  }

  getCoordinatesForLeft() {
    this.startX = this.activeSVGBCR.width - (this.activeBubbleBCR.width / 2) - 12;
    this.startY = this.activeBackgroundBCR.top + (this.activeBackgroundBCR.height / 2) - (window.innerHeight / 2);
    this.secondX = this.startX - 60;
    this.secondY = this.startY;
    this.thirdX = this.secondX;
    this.thirdY = this.newBackgroundBCR.top + (this.newBackgroundBCR.height / 2) - (window.innerHeight / 2);
    this.endX = this.newBackgroundBCR.right - this.activeSVGBCR.left;
    this.endY = this.thirdY;
  }

  drawNewConnection() {
    /* this.pathLength = Math.round(this.newPath.getTotalLength(), 2);
    this.dashOffset = this.pathLength;
    this.newPath.style.strokeDasharray = this.pathLength;
    this.newPath.style.strokeDashoffset = this.pathLength;
    requestAnimationFrame(this.drawLineEffect); */
  }

  drawLineEffect() {
    /*this.requestId = requestAnimationFrame(this.drawLineEffect);
    this.dashOffset += (0 - this.dashOffset) / 8;
    this.newPath.style.strokeDashoffset = this.dashOffset;

    if (Math.abs(this.dashOffset) < 1) {
      cancelAnimationFrame(this.requestId);
    }*/
  }
}

'use strict';

class Line {
  constructor(activeBubble, newBubble, activeSVG) {
    this.bubbleBackgrounds = document.querySelectorAll(".bubble .background");
    this.activeBubble = activeBubble;
    this.newBubble = newBubble;
    this.activeSVG = activeSVG;
    this.activeSVGBCR = null;
    this.activeBackground = null;
    this.newBackground = null;
    this.activeBackgroundBCR = null;
    this.newBackgroundBCR = null;
    this.startX = 0;
    this.startY = 0;
    this.endX = 0;
    this.endY = 0;
    this.newPath = null;

    this.createNewConnection = this.createNewConnection.bind(this);
    this.drawNewConnection  = this.drawNewConnection.bind(this);

    this.createNewConnection();
  }

  createNewConnection() {
    this.newPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
    this.activeBackground = this.activeBubble.childNodes[3];
    this.newBackground = this.newBubble.childNodes[3];
    this.activeBackgroundBCR = this.activeBackground.getBoundingClientRect();
    this.newBackgroundBCR = this.newBackground.getBoundingClientRect();
    this.activeSVGBCR = this.activeSVG.getBoundingClientRect();
    this.startX = this.activeBackgroundBCR.right + 15 - this.activeSVGBCR.left;
    this.startY = this.activeBackgroundBCR.top + (this.activeBackgroundBCR.height / 2) - (window.innerHeight / 2);
    this.endX = this.newBackgroundBCR.left - 15 - this.activeSVGBCR.left;
    this.endY = this.newBackgroundBCR.top + (this.newBackgroundBCR.height / 2) - (window.innerHeight / 2);
    this.newPath.setAttribute("d", `M${this.startX} ${this.startY} L${this.endX} ${this.endY}`);
    this.activeSVG.appendChild(this.newPath, null);
    console.log(this.newPath);
    this.drawNewConnection();
  }

  drawNewConnection() {
    // Create the drawLineEffect!!!
  }
}

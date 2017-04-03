'use strict';

class Line {
  constructor(direction, activeBubble, newBubble, activeSVG) {
    this.bubbleBackgrounds = document.querySelectorAll(".bubble .background");
    this.activeBubble = activeBubble;
    this.newBubble = newBubble;
    this.activeSVG = activeSVG;
    this.direction = direction;
    this.activeSVGBCR = null;
    this.activeBackground = null;
    this.newBackground = null;
    this.activeBackgroundBCR = null;
    this.newBackgroundBCR = null;
    this.newPath = null;
    this.requestId = null;
    this.newBackgroundText = null;
    this.startX = 0;
    this.startY = 0;
    this.endX = 0;
    this.endY = 0;
    this.upperForkX = 0;
    this.upperForkY = 0;
    this.lowerForkX = 0;
    this.lowerForkY = 0;
    this.pathLength = 0;
    this.dashOffset = 0;
    this.pathColor = "";

    this.createNewConnection = this.createNewConnection.bind(this);
    this.drawNewConnection  = this.drawNewConnection.bind(this);
    this.drawLineEffect = this.drawLineEffect.bind(this);
    this.getCoordinatesForLeft = this.getCoordinatesForLeft.bind(this);
    this.getCoordinatesForRight = this.getCoordinatesForRight.bind(this);

    this.createNewConnection();
  }

  createNewConnection() {
    this.newPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
    this.activeBackground = this.activeBubble.childNodes[3];
    this.newBackground = this.newBubble.childNodes[3];
    this.newBackgroundText = this.newBubble.childNodes[1];
    this.pathColor = this.newBackgroundText.style.color;
    this.activeBackgroundBCR = this.activeBackground.getBoundingClientRect();
    this.newBackgroundBCR = this.newBackground.getBoundingClientRect();
    this.activeSVGBCR = this.activeSVG.getBoundingClientRect();

    if (this.direction === "right") {
      this.getCoordinatesForRight();
    } else if (this.direction === "left") {
      this.getCoordinatesForLeft();
    } else {
      throw new SyntaxError("Parameter 1 in 'new Line()' is neither 'right' nor 'left'!");
    }

    this.newPath.setAttribute("d", `M${this.startX} ${this.startY} L${this.endX} ${this.endY} L${this.upperForkX} ${this.upperForkY} L${this.lowerForkX} ${this.lowerForkY + 1}`);
    this.newPath.setAttribute("stroke", this.pathColor);
    this.activeSVG.appendChild(this.newPath, null);
    this.drawNewConnection();
  }

  getCoordinatesForRight() {
    this.startX = 0;
    this.startY = this.activeBackgroundBCR.top + (this.activeBackgroundBCR.height / 2) - (window.innerHeight / 2);
    this.endX = this.newBackgroundBCR.left - 0 - this.activeSVGBCR.left;
    this.endY = this.newBackgroundBCR.top + (this.newBackgroundBCR.height / 2) - (window.innerHeight / 2);
    this.upperForkX = this.endX;
    this.upperForkY = this.endY - (this.newBackgroundBCR.height / 2);
    this.lowerForkX = this.endX;
    this.lowerForkY = this.endY + (this.newBackgroundBCR.height / 2);
  }

  getCoordinatesForLeft() {
    this.startX = this.activeSVGBCR.width;
    this.startY = this.activeBackgroundBCR.top + (this.activeBackgroundBCR.height / 2) - (window.innerHeight / 2);
    this.endX = this.newBackgroundBCR.right + 15 - this.activeSVGBCR.left;
    this.endY = this.newBackgroundBCR.top + (this.newBackgroundBCR.height / 2) - (window.innerHeight / 2);
  }

  drawNewConnection() {
    this.pathLength = Math.round(this.newPath.getTotalLength(), 2);
    this.dashOffset = this.pathLength;
    this.newPath.style.strokeDasharray = this.pathLength;
    this.newPath.style.strokeDashoffset = this.pathLength;
    requestAnimationFrame(this.drawLineEffect);
  }

  drawLineEffect() {
    this.requestId = requestAnimationFrame(this.drawLineEffect);
    this.dashOffset += (0 - this.dashOffset) / 8;
    this.newPath.style.strokeDashoffset = this.dashOffset;

    if (Math.abs(this.dashOffset) < 1) {
      cancelAnimationFrame(this.requestId);
    }
  }
}

'use strict';

class Line {
  constructor(activeBubble, newBubble) {
    this.bubbleBackgrounds = document.querySelectorAll(".bubble .background");
    this.activeSVG = null;
    this.activeBubble = activeBubble;
    this.newBubble = newBubble;
    this.startX = 0;
    this.startY = 0;
    this.firstCurveX = 0;
    this.firstCurveY = 0;
    this.secondCurveX = 0;
    this.secondCurveY = 0;
    this.endX = 0;
    this.endY = 0;
    this.activeBackground = null;
    this.activeBackgroundBCR = null
    this.newBubbleBCR = null;
    this.newPath = null;

    this.createNewConnection = this.createNewConnection.bind(this);
    this.drawNewConnection  = this.drawNewConnection.bind(this);

    this.createNewConnection();
  }

  createNewConnection(e) {
    this.activeBackground = this.activeBubble.childNodes[3];
    this.activeBackgroundBCR = this.activeBackground.getBoundingClientRect();
    this.newBubbleBCR = this.newBubble.getBoundingClientRect();
    this.drawNewConnection();
  }

  drawNewConnection() {
    
  }
}

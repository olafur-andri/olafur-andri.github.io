class App {
  constructor() {
    this.latitudeLabel = document.getElementById("latitude");
    this.longitudeLabel = document.getElementById("longitude");
    this.geoLocation = this.geoLocation.bind(this);
    this.geoError = this.geoError.bind(this);

    this.geoOptions = {
      enableHighAccuracy: true,
      maximumAge: 30000,
      timeout: 10000
    };

    if ("geolocation" in navigator) {
      navigator.geolocation.watchPosition(this.geoLocation, this.geoError, this.geoOptions);
    } else {
      this.locationLabel.textContent = "Location not available";
    }
  }

  geoLocation(position) {
    this.latitudeLabel.textContent = position.coords.latitude;
    this.longitudeLabel.textContent = position.coords.longitude;
    this.latitudeLabel.classList.toggle("color");
  }

  geoError() {
    this.locationLabel.textContent = "No location available";
  }
}

window.addEventListener("load", () => new App(), true);

/*
class KeepAway {
  constructor() {
    this.toucharea = document.getElementById("toucharea");
    this.circle = document.querySelector(".circle");
    this.testP = document.querySelector("#test p");
    this.monsterContainer = document.getElementById("monsters");
    this.wrapper = document.querySelector(".wrapper");
    this.rippleContainer = document.querySelector(".ripple-container");
    this.ripple = document.querySelector(".ripple");
    this.fullscreenSVG = document.getElementById("fullscreen_svg");
    this.const = {};
    this.requestId = null;
    this.circleBCR = null;
    this.currentMonster = null;
    this.startX = 0;
    this.startY = 0;
    this.endX = 0;
    this.endY = 0;
    this.moveX = 0;
    this.moveY = 0;
    this.maxX = 0;
    this.maxY = 0;
    this.degPercent = 0;
    this.transformX = 0;
    this.transformY = 0;
    this.x = 0;
    this.y = 0;
    this.circleX = 0;
    this.circleY = 0;
    this.monsterX = 0;
    this.monsterY = 0;
    this.startingPointX = 0;
    this.startingPointY = 0;
    this.differenceX = 0;
    this.differenceY = 0;
    this.isAlreadyRipple = false;
    this.const.SPEED = 3;

    this.onStart = this.onStart.bind(this);
    this.onMove = this.onMove.bind(this);
    this.onEnd = this.onEnd.bind(this);
    this.update = this.update.bind(this);

    this.getMaxTranslation();
    this.addEventListeners();
    this.generateMonster();
    this.getCircleStartingPoint();
    requestAnimationFrame(this.update);
  }

  addEventListeners() {
    this.toucharea.addEventListener("touchstart", this.onStart, true);
  this.toucharea.addEventListener("touchmove", this.onMove, true);
  this.toucharea.addEventListener("touchend", this.onEnd, true);
  }

  getMaxTranslation() {
    this.maxX = window.innerWidth / 2;

*/
    this.maxY = window.innerHeight / 2;
    this.maxX += 13.5;
    this.maxY += 13.5;
  }

  onStart(e) {
    if (e) {
      e.preventDefault();
    }
  
    this.startX = e.pageX || e.touches[0].pageX;
    this.startY = e.pageY || e.touches[0].pageY;
    this.endX = this.startX;
    this.endY = this.startY;
    this.createRipple();
  }

  onMove(e) {
    this.endX = e.pageX || e.touches[0].pageX;
    this.endY = e.pageY || e.touches[0].pageY;
    this.moveX = this.startX - this.endX;
    this.moveY = this.startY - this.endY;
  }

  onEnd(e) {
    this.removeRipple();
    let corner = this.moveY / this.moveX;
    corner = Math.atan(corner) * 180 / Math.PI * (-1);

    if (this.moveX === 0 && this.moveY === 0) {
      return;
    }
  
    if ((this.moveX < 0 && this.moveY < 0) || (this.moveX < 0 && this.moveY > 0)) {
      corner += 180;
    } else if (this.moveX > 0 && this.moveY > 0) {
      corner += 360;
    }

    corner = Math.round(corner);
    this.degPercent = corner / 360;

    if (corner <= 45) {
      this.transformX = 1;
      this.transformY = 0 - (corner / 45);
    } else if (corner <= 90) {
      this.transformX = (90 - corner) / 45;
      this.transformY = -1;
    } else if (corner <= 135) {
      this.transformY = -1;
      this.transformX = 0 - ((corner - 90) / 45);
    } else if (corner <= 180) {
      this.transformX = -1;
      this.transformY = -(180 - corner) / 45;
    } else if (corner <= 225) {
      this.transformX = -1;
      this.transformY = (corner - 180) / 45;
    } else if (corner <= 270) {
      this.transformY = 1;
      this.transformX = -((270 - corner) / 45);
    } else if (corner <= 315) {
      this.transformY = 1;
      this.transformX = (corner - 270) / 45;
    } else {
      this.transformX = 1;
      this.transformY = (360 - corner) / 45;
    }

    corner += "°";

    if (Math.abs(this.moveX) > 20 || Math.abs(this.moveY) > 20) {
      this.transformX *= this.const.SPEED;
      this.transformY *= this.const.SPEED;
    }
  }

  createRipple() {
    let ripple = this.ripple;

    setTimeout(function() {
      ripple.classList.add("grow");
    }, 1);
  }

  removeRipple() {
    this.ripple.classList.remove("grow");
  }

  update() {
    this.requestId = requestAnimationFrame(this.update);

    if (!this.startX) {
      return;
    }

    this.x += this.transformX;
    this.y += this.transformY;
    this.circleX = this.startingPointX + this.x;
    this.circleY = this.startingPointY + this.y;
    this.circle.style.transform = `translate(${this.x}px, ${this.y}px)`;
    this.rippleContainer.style.transform = `translate(${-this.moveX}px, ${-this.moveY}px)`;

    this.checkWallCollision();
    this.checkMonsterCollision();
    this.drawLine();
  }

  removeCurrentMonster() {
    this.monsterContainer.removeChild(this.currentMonster);
  }

  checkMonsterCollision() {
    if (Math.abs(this.circleX - this.monsterX) < 19 && Math.abs(this.circleY - this.monsterY) < 19) {
      this.removeCurrentMonster();
      this.ricochetCircle();
      this.generateMonster();
    }
  }

  ricochetCircle() {
    let corner = this.getDegrees();
    this.testP.textContent = corner;

    if (corner <= 45) {
      this.transformX = 1;
      this.transformY = 0 - (corner / 45);
    } else if (corner <= 90) {
      this.transformX = (90 - corner) / 45;
      this.transformY = -1;
    } else if (corner <= 135) {
      this.transformY = -1;
      this.transformX = 0 - ((corner - 90) / 45);
    } else if (corner <= 180) {
      this.transformX = -1;
      this.transformY = -(180 - corner) / 45;
    } else if (corner <= 225) {
      this.transformX = -1;
      this.transformY = (corner - 180) / 45;
    } else if (corner <= 270) {
      this.transformY = 1;
      this.transformX = -((270 - corner) / 45);
    } else if (corner <= 315) {
      this.transformY = 1;
      this.transformX = (corner - 270) / 45;
    } else {
      this.transformX = 1;
      this.transformY = (360 - corner) / 45;
    }

    this.transformX *= this.const.SPEED;
    this.transformY *= this.const.SPEED;
  }

  getDegrees() {
    this.differenceX = this.circleX - this.monsterX;
    this.differenceY = this.circleY - this.monsterY;
    let corner = this.differenceY / this.differenceX;
    corner = Math.atan(corner) * 180 / Math.PI * (-1);
  
    if ((this.differenceX < 0 && this.differenceY < 0) || (this.differenceX < 0 && this.differenceY > 0)) {
      corner += 180;
    } else if (this.differenceX > 0 && this.differenceY > 0) {
      corner += 360;
    }

    corner = Math.round(corner);

    return corner;
  }

  checkWallCollision() {
    if (Math.abs(this.x) > this.maxX || Math.abs(this.y) > this.maxY) {
      cancelAnimationFrame(this.requestId);
    }
  }

  generateMonster() {
    let newMonster = document.createElement("div");
    let rndX = Math.random();
    let rndY = Math.random();
    rndX = Math.floor(rndX * window.innerWidth);
    rndY = Math.floor(rndY * window.innerHeight);
    this.currentMonster = newMonster;
    
    if (rndX >= this.startX - 13.5 && rndX <= this.startX + 13.5 && rndY >= this.startY - 13.5 && rndY <= this.startY + 13.5) {
      rndX += 40;
      rndY += 40;
    }

    newMonster.style.top = rndY + "px";
    newMonster.style.left = rndX + "px";
    this.monsterX = rndX + 7.5;
    this.monsterY = rndY + 7.5;
    newMonster.classList.add("monster");
    this.monsterContainer.appendChild(newMonster, null);
  }

  getCircleStartingPoint() {
    this.circleBCR = this.circle.getBoundingClientRect();
    this.startingPointX = this.circleBCR.left + (this.circleBCR.width / 2);
    this.startingPointY = this.circleBCR.top + (this.circleBCR.height / 2);
  }

  drawLine() {
    let line = document.createElementNS("line", "http://www.w3.org/2000/svg");
    line.setAttribute("x1", this.startingPointX);
    line.setAttribute("y1", this.startingPointY);
    line.setAttribute("x2", (this.startingPointX + 50));
    line.setAttribute("y2", (this.startingPointY + 50));
    this.fullscreenSVG.appendChild(line, null);
  }
}

window.addEventListener("load", () => new KeepAway(), true);

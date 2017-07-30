class AppSlideshow
extends HTMLElement {
  constructor() {
    super();

    // NODES
    this.wrapper =
      document
        .querySelector('.wrapper');
    this.scroll = document.querySelector('.scroll');

    // NODELISTS
    this.indicatorCircles =
      document.querySelectorAll(
        'app-indicator div'
      );

    // OBJECTS
      // Null
      this.requestId = null;

    // NUMBERS
      // 0's
      this.startX = 0;
      this.currentX = 0;
      this.translateX = 0;
      this.numSlides = 0;
      this.maxX = 0;
      this.snap = 0;

    // BOOLEANS
      // False
      this.isTouching = false;

    // OPTIONS
    this.SPEED = 1.5;

    this.documentOnStart =
      this
        .documentOnStart.bind(this);
    this.documentOnEnd =
      this
        .documentOnEnd.bind(this);
    this.onStart =
      this.onStart.bind(this);
    this.onMove =
      this.onMove.bind(this);
    this.onEnd =
      this.onEnd.bind(this);
    this.update =
      this.update.bind(this);

    this.addEventListeners();
    this.positionSlides();
    this.determineMaxTranslation();
    this.startUpdateFunction();
  }

  update() {
    this.requestId =
      window.requestAnimationFrame(
        this.update
      );

    if (this.isTouching) {
      this.moveX =
        (this.startX - this.currentX);
    this.moveX = this.translateX - this.moveX;
    } else {
      this.moveX += (this.translateX - this.moveX) / 5;
    }

    if (this.moveX >= 0) {
      this.scroll.style.transform =
        `translateX(0)`;
      return;
    }

    if (this.moveX * this.SPEED < -this.maxX) {
      this.scroll.style.transform =
        `translateX(${-this.maxX}px)`;
      return;
    }

    this.scroll.style.transform =
      `translateX(${this.moveX * this.SPEED}px)`;
  }

  determineMaxTranslation() {
    this.numSlides =
      document.querySelectorAll(
        'app-slide'
      ).length;
    
    this.maxX =
      window.innerWidth *
      (this.numSlides - 1);
  }

  startUpdateFunction() {
    window.requestAnimationFrame(
      this.update
    );
  }

  onStart(e) {
    this.startX =
      e.pageX || e.touches[0].pageX;
    this.currentX = this.startX;
  }

  onMove(e) {
    try {
      this.currentX =
        e.pageX || e.touches[0].pageX;
    } catch(e) {
      // Do nothing
    }
  }

  onEnd() {
    this.translateX = this.moveX;
    
    if (this.translateX > 0) {
      this.translateX = 0;
    }

    if (this.translateX * this.SPEED < -this.maxX) {
      this.translateX = -this.maxX / this.SPEED;
    }

    this.snapToNearestSlide();
  }

  snapToNearestSlide() {
    let translate =
      this.scroll.style.transform;
    translate = translate.replace(
      'translateX(', ''
    );
    translate = translate.replace(
      'px)', ''
    );
    
    let snap =
      translate / window.innerWidth;
    snap = Math.round(snap);
    this.snap = snap;
    this.translateX = snap * window.innerWidth / this.SPEED;
    this.updateIndicator();
  }

  updateIndicator() {
    const activeCircle =
      document.querySelector(
        'app-indicator div[active]'
      );

    activeCircle.removeAttribute(
      'active'
    );
    this.indicatorCircles =
      document.querySelectorAll(
        'app-indicator div'
      );

    this
      .indicatorCircles[Math.abs(this.snap)]
      .setAttribute('active', '');
  }

  positionSlides() {
    const slides =
      document.querySelectorAll(
        'app-slide'
      );
    
    let counter = 0;
    slides.forEach((slide) => {
      slide.style.left =
        (100 * counter) + '%';

      counter++;
    });
  }

  addEventListeners() {
    window.addEventListener(
      'resize',
      this.determineMaxTranslation,
      true,
    );
    document.addEventListener(
      'touchstart',
      this.documentOnStart,
      {passive: false}
    );
    document.addEventListener(
      'touchend',
      this.documentOnEnd,
      true,
      {passive: false}
    );
    document.addEventListener(
      'mousedown',
      this.documentOnStart,
      true
    );
    document.addEventListener(
      'mouseup',
      this.documentOnEnd,
      true
    );
    this.addEventListener(
      'touchstart',
      this.onStart,
      true,
      {passive: false}
    );
    this.addEventListener(
      'mousedown',
      this.onStart,
      true
    );
    this.addEventListener(
      'touchmove',
      this.onMove,
      true,
      {passive: false}
    );
    this.addEventListener(
      'mousemove',
      this.onMove,
      true
    );
    this.addEventListener(
      'touchend',
      this.onEnd,
      true,
      {passive: false}
    );
    this.addEventListener(
      'mouseup',
      this.onEnd,
      true
    )
  }

  documentOnStart(e) {
    if (e) {
      e.preventDefault();
    }

    this
      .wrapper
      .classList
      .add('active');
    this.isTouching = true;
  }

  documentOnEnd(e) {
    if (e) {
      e.preventDefault();
    }

    setTimeout(() => {
      this
      .wrapper
      .classList
      .remove('active');
    }, 150);
    this.isTouching = false;
  }
}

class AppSlide
extends HTMLElement {
  constructor() {
    super();

    this.appendBackground();
  }

  appendBackground() {
    const background =
      document.createElement(
        'app-background'
      );
    this.appendChild(
      background,
      this.lastChild
    );
  }
}

class AppBackground
extends HTMLElement {
  constructor() {
    super();
  }
}

class AppIndicator
extends HTMLElement {
  constructor() {
    super();

    this.appendCircles();
  }

  appendCircles() {
    const numOfSlides =
      document
        .querySelectorAll(
          'app-slide'
        )
        .length;

    for (
      let i = 0;
      i < numOfSlides;
      i++
    ) {
      const circle =
        document
          .createElement('div');

      if (i === 0) {
        circle.setAttribute('active', '');
      }

      this.appendChild(circle, null);
    }
  }
}

class DiagonalLine
extends HTMLElement {
  constructor() {
    super();

    this.style.left = `${this.x}%`;
    this.style.top = `${this.y}%`;
  }

  get x() {
    return this.getAttribute('x');
  }

  get y() {
    return this.getAttribute('y');
  }
}

class AppOrientationMessage
extends HTMLElement {
  constructor() {
    super();

    this.appendText();
  }

  appendText() {
    const i =
      document.createElement(
        'i'
      );
    i.classList.add(
      'material-icons'
    );
    i.textContent =
      'stay_current_portrait';
    this.appendChild(i, null);

    const h4 =
      document.createElement(
        'h4'
      );

    h4.textContent =
      'For the best possible experience, have your device in a portrait orientation.';
    this.appendChild(h4, null);
  }
}

customElements.define(
  'app-slideshow',
  AppSlideshow,
);

customElements.define(
  'app-slide',
  AppSlide
);

customElements.define(
  'app-background',
  AppBackground,
);

customElements.define(
  'app-indicator',
  AppIndicator,
);

customElements.define(
  'diagonal-line',
  DiagonalLine,
);

customElements.define(
  'app-orientation-message',
  AppOrientationMessage
);
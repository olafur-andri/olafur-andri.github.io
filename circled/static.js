class App {
  constructor() {
    // NODES
    this.main = document.querySelector('main');
    this.nav = document.querySelector('nav');
    this.container = document.querySelector('.container');
    this.arrow = document.querySelector('#scroll_arrow i');
    this.dynamicCSS = document.getElementById('dynamic_css');
    this.staticJS = document.getElementById('static_js');
    this.arrowContainer = document.getElementById('scroll_arrow');

    // NODELISTS
    this.links = document.querySelectorAll('nav .links button');
      
    // STRINGS
      // Prepopulated
      this.folder = 'home';

    // NUMBERS
      // 0's
      this.scrollTop = 0;

    this.onScroll = this.onScroll.bind(this);
    this.changeAddress = this.changeAddress.bind(this);
    this.animateArrow = this.animateArrow.bind(this);

    this.fadeInContainer();
    this.addEventListeners();
    this.startArrowAnimation();
  }

  startArrowAnimation() {
    setInterval(this.animateArrow, 2400);
  }

  animateArrow() {
    this.arrow.classList.add('up');
    setTimeout(() => {
      this.arrow.classList.add('down');
    }, 400);
    setTimeout(() => {
      this.arrow.classList.add('initial');
    }, 1200);
    setTimeout(() => {
      this.arrow.className = 'material-icons';
    }, 1600);
  }

  addEventListeners() {
    window.addEventListener('scroll', this.onScroll, true);
    
    this.links.forEach((link) => {
      link.addEventListener('click', this.changeAddress, true);
      link.addEventListener('touchend', this.changeAddress, true);
    });
  }

  onScroll() {
    this.scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (this.scrollTop) {
      this.nav.classList.add('scroll');
      this.arrowContainer.classList.add('hide');
    } else {
      this.nav.classList.remove('scroll');

      if (this.folder === 'home') {
        this.arrowContainer.classList.remove('hide');
      }
    }
  }

  changeAddress(e) {
    if (e.preventDefault) {
      e.preventDefault();
    }

    this.folder = e.target.getAttribute('data-url');
    this.updateActiveLink();

    const htmlUrl = `${this.folder}/index.html`;
    let xhr = null;

    if (window.XMLHttpRequest) {
      xhr = new XMLHttpRequest();
    } else {
      xhr = new ActiveXObject('Microsoft.XMLHTTP');
    }

    this.fadeOutContainer();

    xhr.onreadystatechange = () => {
      if (xhr.readyState !== 4 || xhr.status !== 200) {
        return;
      }

      const responseText = xhr.responseText;
      this.checkIfContainerHasFaded(responseText);
    };

    xhr.open('GET', htmlUrl, true);
    xhr.send();

    if (this.folder !== 'home') {
      this.arrowContainer.classList.add('hide');
    } else if (!this.scrollTop) {
      this.arrowContainer.classList.remove('hide');
    }
  }

  updateActiveLink() {
    this.links.forEach((link) => {
      link.className = '';

      if (link.getAttribute('data-url') === this.folder) {
        link.className = 'active';
      }
    });
  }

  checkIfContainerHasFaded(responseText) {
    const style = window.getComputedStyle(this.container);
    
    if (style.opacity > 0) {
      setTimeout(() => {this.checkIfContainerHasFaded(responseText);}, 200);
      return;
    }

    const CSSURL = `${this.folder}/style.css`;
    const JSURL = `${this.folder}/script.js`;

    this.dynamicCSS.href = CSSURL;

    this.main.innerHTML = responseText;
    this.container = document.querySelector('.container');


    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        this.fadeInContainer();
      });
    });
  }

  fadeInContainer() {
    this.container.classList.add('show');
    this.main.removeAttribute('data-hidden');
  }

  fadeOutContainer() {
    this.container.classList.remove('show');
    this.main.setAttribute('data-hidden', '');
  }
}

window.addEventListener('load', () => new App(), true);
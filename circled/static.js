class App {
  constructor() {
    // NODES
    this.main = document.querySelector('main');
    this.nav = document.querySelector('nav');
    this.container = document.querySelector('.container');
    this.arrow = document.querySelector('#scroll_arrow i');
    this.hamburger = document.querySelector('nav .hamburger i');
    this.dynamicCSS = document.getElementById('dynamic_css');
    this.staticJS = document.getElementById('static_js');
    this.arrowContainer = document.getElementById('scroll_arrow');
    this.obfuscator = document.getElementById('obfuscator');
    this.sidenav = document.getElementById('side_nav');

    // NODELISTS
    this.links = document.querySelectorAll('nav a');
      
    // STRINGS
      // Empty
      this.folder = '';

    // NUMBERS
      // 0's
      this.scrollTop = 0;

    // BOOLEANS
      // False
      this.isSub = false;

    this.onScroll = this.onScroll.bind(this);
    this.changeAddress = this.changeAddress.bind(this);
    this.animateArrow = this.animateArrow.bind(this);
    this.showSidenav = this.showSidenav.bind(this);
    this.hideSidenav = this.hideSidenav.bind(this);
    this.resizePresentation = this.resizePresentation.bind(this);
    this.fadeInContainer = this.fadeInContainer.bind(this);
    this.onPopstate = this.onPopstate.bind(this);

    this.getFolder();
    this.defineElements();
    this.fadeInContainer();
    this.addEventListeners();
    this.startArrowAnimation();
    this.resizePresentation();
  }

  getFolder() {
    this.folder = location.href.split('/');
    this.folder = this.folder[this.folder.length - 2];

    if (this.folder === 'circled') {
      this.folder = 'home';
    }

    if (this.folder !== 'home') {
      this.isSub = true;
    }
  }

  resizePresentation() {
    if (this.folder !== 'home') {
      return;
    }

    const presentation = document.getElementById('presentation');
    presentation.style.height = `${window.innerHeight}px`;
  }

  startArrowAnimation() {
    setInterval(this.animateArrow, 2400);
  }

  animateArrow() {
    if (this.isSub) {
      this.arrowContainer.classList.add('hide');
    }

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

    this.hamburger.addEventListener('click', this.showSidenav, {passive: false});
    this.hamburger.addEventListener('touchend', this.showSidenav, {passive: false});
    this.obfuscator.addEventListener('click', this.hideSidenav, {passive: false});
    this.obfuscator.addEventListener('touchend', this.hideSidenav, {passive: false});

    window.addEventListener('popstate', this.onPopstate, true);
  }

  onPopstate() {
    this.fadeOutContainer();
    this.getFolder();
    

    let xhr = null;

    if (window.XMLHttpRequest) {
      xhr = new XMLHttpRequest();
    } else {
      xhr = new ActiveXObject('Microsoft.XMLHTTP');
    }

    xhr.onreadystatechange = () => {
      if (xhr.readyState !== 4 || xhr.status !== 200) {
        return;
      }

      this.checkIfContainerHasFaded(xhr.responseText);
    };

    xhr.open('GET', 'partial.html', true);
    xhr.send();

    if (this.folder !== 'home') {
      this.arrowContainer.classList.add('hide');
    } else if (!this.scrollTop) {
      this.arrowContainer.classList.remove('hide');
    }

    this.updateActiveLink();
  }

  showSidenav(e) {
    if (e.preventDefault) {
      e.preventDefault();
    }

    this.nav.classList.add('show-sidenav');
  }

  hideSidenav(e) {
    if (e && e.preventDefault) {
      e.preventDefault();
    }

    this.nav.classList.remove('show-sidenav');
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
    if (e && e.preventDefault) {
      e.preventDefault();
    }

    this.hideSidenav();

    this.folder = e.target.getAttribute('data-url');
    this.updateActiveLink();

    let URL = '';

    if (this.folder !== 'home') {
      URL = this.folder + '/';
    }

    history.pushState({page: this.folder}, 'CIRCLED - ' + this.folder, '/circled/' + URL);

    let HTMLURL = null;
    let xhr = null;

    HTMLURL = 'partial.html';

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

    xhr.open('GET', HTMLURL, true);
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

    const CSSURL = 'style.css';

    this.dynamicCSS.href = CSSURL;

    this.main.innerHTML = responseText;
    this.container = document.querySelector('.container');

    if (this.folder === 'home') {
      const presentation = document.getElementById('presentation');
      presentation.style.height = `${window.innerHeight}px`;
    }

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        requestAnimationFrame(this.fadeInContainer);
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
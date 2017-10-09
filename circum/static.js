'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var App = function () {
  function App() {
    _classCallCheck(this, App);

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
    this.fadeInContainer();
    this.addEventListeners();
    this.startArrowAnimation();
    this.resizePresentation();
  }

  _createClass(App, [{
    key: 'getFolder',
    value: function getFolder() {
      this.folder = location.href.split('/');
      this.folder = this.folder[this.folder.length - 2];

      if (this.folder === 'circum') {
        this.folder = 'home';
      }

      if (this.folder !== 'home') {
        this.isSub = true;
      }
    }
  }, {
    key: 'resizePresentation',
    value: function resizePresentation() {
      if (this.folder !== 'home') {
        return;
      }

      var presentation = document.getElementById('presentation');
      presentation.style.height = window.innerHeight + 'px';
    }
  }, {
    key: 'startArrowAnimation',
    value: function startArrowAnimation() {
      setInterval(this.animateArrow, 2400);
    }
  }, {
    key: 'animateArrow',
    value: function animateArrow() {
      var _this = this;

      if (this.isSub) {
        this.arrowContainer.classList.add('hide');
      }

      this.arrow.classList.add('up');
      setTimeout(function () {
        _this.arrow.classList.add('down');
      }, 400);
      setTimeout(function () {
        _this.arrow.classList.add('initial');
      }, 1200);
      setTimeout(function () {
        _this.arrow.className = 'material-icons';
      }, 1600);
    }
  }, {
    key: 'addEventListeners',
    value: function addEventListeners() {
      var _this2 = this;

      window.addEventListener('scroll', this.onScroll, true);

      for (let i = 0; i < this.links.length; i++) {
        this.links[i].addEventListener('click', _this2.changeAddress, true);
        this.links[i].addEventListener('touchend', _this2.changeAddress, true);
      }

      this.hamburger.addEventListener('click', this.showSidenav, { passive: false });
      this.hamburger.addEventListener('touchend', this.showSidenav, { passive: false });
      this.obfuscator.addEventListener('click', this.hideSidenav, { passive: false });
      this.obfuscator.addEventListener('touchend', this.hideSidenav, { passive: false });

      window.addEventListener('popstate', this.onPopstate, true);
    }
  }, {
    key: 'onPopstate',
    value: function onPopstate() {
      var _this3 = this;

      this.fadeOutContainer();
      this.getFolder();

      var xhr = null;

      if (window.XMLHttpRequest) {
        xhr = new XMLHttpRequest();
      } else {
        xhr = new ActiveXObject('Microsoft.XMLHTTP');
      }

      xhr.onreadystatechange = function () {
        if (xhr.readyState !== 4 || xhr.status !== 200) {
          return;
        }

        _this3.checkIfContainerHasFaded(xhr.responseText);
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
  }, {
    key: 'showSidenav',
    value: function showSidenav(e) {
      if (e.preventDefault) {
        e.preventDefault();
      }

      this.nav.classList.add('show-sidenav');
    }
  }, {
    key: 'hideSidenav',
    value: function hideSidenav(e) {
      if (e && e.preventDefault) {
        e.preventDefault();
      }

      this.nav.classList.remove('show-sidenav');
    }
  }, {
    key: 'onScroll',
    value: function onScroll() {
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
  }, {
    key: 'changeAddress',
    value: function changeAddress(e) {
      var _this4 = this;

      if (e && e.preventDefault) {
        e.preventDefault();
      }

      this.hideSidenav();

      this.folder = e.target.getAttribute('data-url');
      this.updateActiveLink();

      var URL = '';

      if (this.folder !== 'home') {
        URL = this.folder + '/';
      }

      history.pushState({ page: this.folder }, 'CIRCUM - ' + this.folder, '/circum/' + URL);

      var HTMLURL = null;
      var xhr = null;

      HTMLURL = 'partial.html';

      if (window.XMLHttpRequest) {
        xhr = new XMLHttpRequest();
      } else {
        xhr = new ActiveXObject('Microsoft.XMLHTTP');
      }

      this.fadeOutContainer();

      xhr.onreadystatechange = function () {
        if (xhr.readyState !== 4 || xhr.status !== 200) {
          return;
        }

        var responseText = xhr.responseText;
        _this4.checkIfContainerHasFaded(responseText);
      };

      xhr.open('GET', HTMLURL, true);
      xhr.send();

      if (this.folder !== 'home') {
        this.arrowContainer.classList.add('hide');
      } else if (!this.scrollTop) {
        this.arrowContainer.classList.remove('hide');
      }
    }
  }, {
    key: 'updateActiveLink',
    value: function updateActiveLink() {
      var _this5 = this;

      for (let i = 0; i < this.links.length; i++) {
        this.links[i].className = '';

        if (this.links[i].getAttribute('data-url') === _this5.folder) {
          this.links[i].className = 'active';
        }
      }
    }
  }, {
    key: 'checkIfContainerHasFaded',
    value: function checkIfContainerHasFaded(responseText) {
      var _this6 = this;

      var style = window.getComputedStyle(this.container);

      if (style.opacity > 0) {
        setTimeout(function () {
          _this6.checkIfContainerHasFaded(responseText);
        }, 200);
        return;
      }

      var CSSURL = '';

      if (this.folder === 'home') {
        CSSURL = '/circum/style.css';
      } else {
        CSSURL = '/circum/' + this.folder + '/style.css';
      }

      this.dynamicCSS.href = CSSURL;

      this.main.innerHTML = responseText;
      this.container = document.querySelector('.container');

      if (this.folder === 'home') {
        var presentation = document.getElementById('presentation');
        presentation.style.height = window.innerHeight + 'px';
      }

      requestAnimationFrame(function () {
        requestAnimationFrame(function () {
          requestAnimationFrame(_this6.fadeInContainer);
        });
      });
    }
  }, {
    key: 'fadeInContainer',
    value: function fadeInContainer() {
      this.container.classList.add('show');
      this.main.removeAttribute('data-hidden');
    }
  }, {
    key: 'fadeOutContainer',
    value: function fadeOutContainer() {
      this.container.classList.remove('show');
      this.main.setAttribute('data-hidden', '');
    }
  }]);

  return App;
}();

window.addEventListener('load', function () {
  return new App();
}, true);
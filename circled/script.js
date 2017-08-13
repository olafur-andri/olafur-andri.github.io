class Circled {
  constructor() {
    // NODES
    this.main = document.querySelector('main');
    this.nav = document.querySelector('nav');

    this.onScroll = this.onScroll.bind(this);

    this.addEventListeners();
    this.populate('home');
  }

  addEventListeners() {
    window.addEventListener('scroll', this.onScroll, true);
  }

  onScroll() {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop >= 5) {
      this.nav.classList.add('scroll');
    } else {
      this.nav.classList.remove('scroll');
    }
  }

  populate(address) {
    let xhr = null;

    if (window.XMLHttpRequest) {
      xhr = new XMLHttpRequest();
    } else {
      xhr = new ActiveXObject('Microsoft.XMLHTTP');
    }

    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4 && xhr.status === 200) {
        return;
      }
      
      this.main.innerHTML = xhr.responseText;
    };

    xhr.open('GET', 'home.html', true);
    xhr.send();
  }
}

window.addEventListener("load", () => new Circled(), true);
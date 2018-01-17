class Amazed {
  constructor() {
    this.title = document.getElementById("big_title");
    this.aboutButton = document.getElementById("about_button");
    this.feedbackButton = document.getElementById("feedback_button");
    this.policyButton = document.getElementById("policy_button");
    this.homePage = document.getElementById("home");
    this.aboutPage = document.getElementById("about_page");
    this.feedbackPage = document.getElementById("feedback_page");
    this.policyPage = document.getElementById("policy_page");
    this.aboutBackButton = document.querySelector("#about_page .back-button");
    this.feedbackBackButton = document.querySelector("#feedback_page .back-button");
    this.policyBackButton = document.querySelector("#policy_page .back-button");
    this.requestId = null;
    this.translateY = 0;
    this.sin = 0;

    this.animateLogo = this.animateLogo.bind(this);
    this.showAboutPage = this.showAboutPage.bind(this);
    this.hideAboutPage = this.hideAboutPage.bind(this);
    this.showFeedbackPage = this.showFeedbackPage.bind(this);
    this.hideFeedbackPage = this.hideFeedbackPage.bind(this);
    this.showPolicyPage = this.showPolicyPage.bind(this);
    this.hidePolicyPage = this.hidePolicyPage.bind(this);

    this.animateLogo();
    this.preparePages();
    this.addEventListeners();
  }

  preparePages() {
    this.aboutPage.style.display = "none";
    this.feedbackPage.style.display = "none";
    this.policyPage.style.display = "none";
  }

  animateLogo() {
    this.translateY = Math.sin(this.sin) * 3;
    this.title.style.transform = `translateY(${this.translateY}px)`;
    this.sin += 0.05;
    this.requestId = window.requestAnimationFrame(this.animateLogo);

    if (this.sin >= 1000000) {
      this.sin = 0;
    }
  }

  addEventListeners() {
    this.aboutButton.addEventListener("click", this.showAboutPage, true);
    this.feedbackButton.addEventListener("click", this.showFeedbackPage, true);
    this.policyButton.addEventListener("click", this.showPolicyPage, true);
  }

  showAboutPage() {
    this.fadeHomeOut();

    setTimeout(() => {
      this.aboutPage.style.display = "block";
      
      window.requestAnimationFrame(() => {
        window.requestAnimationFrame(() => {
          window.requestAnimationFrame(() => {
            this.aboutPage.classList.add("fade-in");
            this.aboutBackButton.addEventListener("click", this.hideAboutPage, true);
          });
        });
      });
    }, 500);
  }

  hideAboutPage() {
    this.aboutBackButton.removeEventListener("click", this.hideAboutPage, true);
    this.aboutPage.classList.remove("fade-in");

    setTimeout(() => {
      this.aboutPage.style.display = "none";
      this.homePage.style.display = "block";

      window.requestAnimationFrame(() => {
        window.requestAnimationFrame(() => {
          window.requestAnimationFrame(() => {
            this.title.classList.remove("fade-out");
            this.aboutButton.classList.remove("fade-out");
            this.feedbackButton.classList.remove("fade-out");
            this.policyButton.classList.remove("fade-out");
          });
        });
      });
    }, 500);
  }

  showFeedbackPage() {
    this.fadeHomeOut();

    setTimeout(() => {
      this.feedbackPage.style.display = "block";
      
      window.requestAnimationFrame(() => {
        window.requestAnimationFrame(() => {
          window.requestAnimationFrame(() => {
            this.feedbackPage.classList.add("fade-in");
            this.feedbackBackButton.addEventListener("click", this.hideFeedbackPage, true);
          });
        });
      });
    }, 500);
  }

  hideFeedbackPage() {
    this.feedbackBackButton.removeEventListener("click", this.hideFeedbackPage, true);
    this.feedbackPage.classList.remove("fade-in");

    setTimeout(() => {
      this.feedbackPage.style.display = "none";
      this.homePage.style.display = "block";

      window.requestAnimationFrame(() => {
        window.requestAnimationFrame(() => {
          window.requestAnimationFrame(() => {
            this.title.classList.remove("fade-out");
            this.aboutButton.classList.remove("fade-out");
            this.feedbackButton.classList.remove("fade-out");
            this.policyButton.classList.remove("fade-out");
          });
        });
      });
    }, 500);
  }

  showPolicyPage() {
    this.fadeHomeOut();

    setTimeout(() => {
      this.policyPage.style.display = "block";
      
      window.requestAnimationFrame(() => {
        window.requestAnimationFrame(() => {
          window.requestAnimationFrame(() => {
            this.policyPage.classList.add("fade-in");
            this.policyBackButton.addEventListener("click", this.hidePolicyPage, true);
          });
        });
      });
    }, 500);
  }

  hidePolicyPage() {
    this.policyBackButton.removeEventListener("click", this.hidePolicyPage, true);
    this.policyPage.classList.remove("fade-in");

    setTimeout(() => {
      this.policyPage.style.display = "none";
      this.homePage.style.display = "block";

      window.requestAnimationFrame(() => {
        window.requestAnimationFrame(() => {
          window.requestAnimationFrame(() => {
            this.title.classList.remove("fade-out");
            this.aboutButton.classList.remove("fade-out");
            this.feedbackButton.classList.remove("fade-out");
            this.policyButton.classList.remove("fade-out");
          });
        });
      });
    }, 500);
  }

  fadeHomeOut() {
    this.title.classList.add("fade-out");
    this.aboutButton.classList.add("fade-out");
    this.feedbackButton.classList.add("fade-out");
    this.policyButton.classList.add("fade-out");

    setTimeout(() => {
      this.homePage.style.display = "none";
      this.sin = 0;
    }, 500);
  }
}

window.addEventListener("load", () => new Amazed(), true);
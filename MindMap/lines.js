class Lines {
  constructor() {
    this.bubbleBackgrounds = document.querySelectorAll(".bubble .background");

    this.addEventListeners = this.addEventListeners.bind(this);
    this.createNewConnection = this.createNewConnection.bind(this);

    this.addEventListeners();
  }

  addEventListeners() {
    for (let i = 0; i < this.bubbleBackgrounds.length; i++) {
      this.bubbleBackgrounds[i].addEventListener("click", this.createNewConnection, true);
    }
  }

  createNewConnection() {
    if (!isAdding) {
      return;
    }

    console.log("Create New Connection");
    isAdding = false;
  }
}

window.addEventListener("load", () => new Lines(), true);

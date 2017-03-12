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

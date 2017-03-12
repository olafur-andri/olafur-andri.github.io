class App {
  constructor() {
    this.locationLabel = document.getElementById("location_label");
    this.geoLocation = this.geoLocation.bind(this);
    this.geoError = this.geoError.bind(this);

    this.geoOptions = {
      enableHighAccuracy: true,
      maximumAge: 30000,
      timeout: 27000
    };

    if ("geolocation" in navigator) {
      navigator.geolocation.watchPosition(this.geoLocation, this.geoError, this.geoOptions);
    } else {
      this.locationLabel.textContent = "Location not available";
    }
  }

  geoLocation(position) {
    this.locationLabel.textContent = position.coords.latitude;
  }

  geoError() {
    this.locationLabel.textContent = "No location available";
  }
}

window.addEventListener("load", () => new App(), true);

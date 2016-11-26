var CACHE_NAME = "cache-v1";
var urlsToCache = [
  "/"
];

self.addEventListener("install", function(e) {
  // Perform install steps
  e.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log("Opened cache");
        return cache.addAll(urlsToCache);
      })
  );
}, true);

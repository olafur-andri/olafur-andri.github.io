var CACHE_NAME = "cache-v1";
var urlsToCache = [
  "/profile-page/",
  "/profile-page/img/thumbnail-1.jpg",
  "/profile-page/img/thumbnail-2.jpg",
  "/profile-page/img/thumbnail-3.jpg",
  "/profile-page/img/towers.jpg",
  "/profile-page/img/white-pepper-logo.jpg"
];

self.addEventListener('install', function(event) {
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener("fetch", function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        // Cache hit - return response
        if (response) {
          return response;
        }
        return fetch(event.request);
      }
    )
  );
});

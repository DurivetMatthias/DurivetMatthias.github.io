var CACHE = "v2";

self.addEventListener("install", function (evt) {
  evt.waitUntil(precache());
});

self.addEventListener("fetch", function (evt) {
  if (evt.request.url.toLowerCase() == "https://durivetmatthias.github.io/") {
    evt.respondWith(fromCache("index.html"));
  } else {
    evt.respondWith(fromCache(evt.request));
  }
});

async function precache() {
  const cache = await caches.open(CACHE);
  return cache.addAll([
    "./index.html",
    "./worker.js",
    "./favicon.ico",
    "./assets/stylesheets/reset.css",
    "./assets/stylesheets/screen.css",
    "./assets/javascripts/flashcard.js",
    "./assets/javascripts/script.js",
    "./assets/javascripts/localforage.min.js",
    "./assets/images/icons/icon-36.png",
    "./assets/images/icons/icon-48.png",
    "./assets/images/icons/icon-72.png",
    "./assets/images/icons/icon-96.png",
    "./assets/images/icons/icon-144.png",
    "./assets/images/icons/icon-192.png",
    "./assets/images/icons/icon-512.png",
    "./assets/manifest/manifest"
  ]);
}

async function fromCache(request) {
  const cache = await caches.open(CACHE);
  const matching = await cache.match(request);
  return matching || Promise.reject("no-match");
}

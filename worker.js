var CACHE = 'v16';

self.addEventListener('install', function (evt) {
    //console.log('The service worker is being installed.');
    evt.waitUntil(precache());
});

self.addEventListener('fetch', function (evt) {
    //console.log('The service worker is serving the asset.');
    evt.respondWith(fromCache(evt.request));
});

function precache() {
    return caches.open(CACHE).then(function (cache) {
        return cache.addAll([
            './index.html',
            './worker.js',
            './assets/stylesheets/reset.css',
            './assets/stylesheets/screen.css',
            './assets/javascripts/flashcard.js',
            './assets/javascripts/script.js',
            './assets/javascripts/localforage.min.js',
            './assets/javascripts/summary.js',
            './assets/images/cogwheel-transparant.png',
            './assets/images/dragon.png',
            './assets/images/flower.png',
            './assets/images/home-transparant.png',
            './assets/images/origami.png',
            './assets/images/icons/icon-72x72.png',
            './assets/images/icons/icon-96x96.png',
            './assets/images/icons/icon-128x128.png',
            './assets/images/icons/icon-144x144.png',
            './assets/images/icons/icon-152x152.png',
            './assets/images/icons/icon-192x192.png',
            './assets/images/icons/icon-384x384.png',
            './assets/images/icons/icon-512x512.png',
            './assets/manifest/manifest'

        ]);
    });
}

function fromCache(request) {
    return caches.open(CACHE).then(function (cache) {
        console.log(request);
        return cache.match(request).then(function (matching) {
            return matching || Promise.reject('no-match');
        });
    });
}
var CACHE = 'v7';

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
            './assets/manifest/manifest'
        ]);
    });
}

function fromCache(request) {
    return caches.open(CACHE).then(function (cache) {
        return cache.match(request).then(function (matching) {
            return matching || Promise.reject('no-match');
        });
    });
}
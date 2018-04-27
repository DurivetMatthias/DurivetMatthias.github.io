var CACHE = 'cache-only';

self.addEventListener('install', function (evt) {
    console.log('The service worker is being installed.');
    evt.waitUntil(precache());
});

self.addEventListener('fetch', function (evt) {
    console.log('The service worker is serving the asset.');
    evt.respondWith(fromCache(evt.request));
});

function precache() {
    return caches.open(CACHE).then(function (cache) {
        return cache.addAll([
            './index.html',
            './worker.js',
            './stylesheets/screen.css',
            './stylesheets/reset.css',
            './javascripts/flashcard.js',
            './javascripts/script.js',
            './images/cogwheel-transparant.png',
            './images/dragon.png',
            './images/flower.png',
            './images/flower2.png',
            './images/flower-original.png',
            './images/home-transparant.png',
            './images/origami.png'
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
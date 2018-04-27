/**
 * Created by Matthias on 27/04/2018.
 */
var version = 'v1::';

self.addEventListener("install", function (event) {
    console.log('WORKER: install event in progress.');
    event.waitUntil(
        /* The caches built-in is a promise-based API that helps you cache responses,
         as well as finding and deleting them.
         */
        caches
        /* You can open a cache by name, and this method returns a promise. We use
         a versioned cache name here so that we can remove old cache entries in
         one fell swoop later, when phasing out an older service worker.
         */
            .open(version + 'fundamentals')
            .then(function (cache) {
                /* After the cache is opened, we can fill it with the offline fundamentals.
                 The method below will add all resources we've indicated to the cache,
                 after making HTTP requests for each of them.
                 */
                return cache.addAll([
                    '/',
                    '/assets/stylesheets/screen.css',
                    '/assets/stylesheets/reset.css',
                    '/assets/javascripts/flashcard.js',
                    '/assets/javascripts/script.js',
                    '/assets/images/cogwheel-transparant.png',
                    '/assets/images/dragon.png',
                    '/assets/images/flower.png',
                    '/assets/images/flower2.png',
                    '/assets/images/flower-original.png',
                    '/assets/images/home-transparant.png',
                    '/assets/images/origami.png',
                ]);
            })
            .then(function () {
                console.log('WORKER: install completed');
            })
    );
});

self.addEventListener('fetch', function (event) {
    event.respondWith(
        caches.match(event.request).then(function (resp) {
            return resp || fetch(event.request).then(function (response) {
                    return caches.open('v1').then(function (cache) {
                        cache.put(event.request, response.clone());
                        return response;
                    });
                });
        })
    );
});

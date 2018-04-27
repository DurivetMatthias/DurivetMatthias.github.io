/**
 * Created by Matthias on 27/04/2018.
 */
self.addEventListener('install', function (event) {
    event.waitUntil(
        console.log('install event')
    );
});

self.addEventListener('fetch', function (event) {
    event.respondWith(
        console.log('fetch event')
    );
});

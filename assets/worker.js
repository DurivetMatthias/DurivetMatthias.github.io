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

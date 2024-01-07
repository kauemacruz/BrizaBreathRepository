self.addEventListener('fetch', function (event) {
    event.respondWith(
        caches.match(event.request).then(function (response) {
            // Return the cached response if available, otherwise fetch from the network
            return response || fetch(event.request);
        })
    );
});
// Define the cache name
const CACHE_NAME = 'v1-static-assets';

// List of URLs to cache
const URLS_TO_CACHE = [
    '/',
    '/css/site.css',
    '/BrizaBreath.styles.css',
    '/lib/bootstrap/dist/css/bootstrap.min.css',
    'https://fonts.googleapis.com/css?family=Playfair+Display',
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css',
    'https://code.jquery.com/jquery-3.6.0.min.js',
    '/lib/jquery/dist/jquery.min.js',
    '/lib/bootstrap/dist/js/bootstrap.bundle.min.js',
    'https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.9.4/Chart.js',
    '/js/global.js',
    '/js/results.js',
    '/js/brt.js',
    '/js/yogic.js',
    '/js/ahat.js',
    '/js/hat.js',
    '/js/hatc.js',
    '/js/apnea.js',
    '/js/bb.js',
    '/js/box.js',
    '/js/bre.js',
    '/js/brw.js',
    '/js/cb.js',
    '/js/co2.js',
    '/js/ct.js',
    '/js/extra.js',
    '/js/hum.js',
    '/js/kb.js',
    '/js/lungs.js',
    '/js/nb.js',
    '/js/o2.js',
    '/js/rb.js',
    '/js/sb.js',
    '/js/site.js',
    '/js/ub.js',
    '/js/wh.js',
];

// Install event: caches assets
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Opened cache');
                return cache.addAll(URLS_TO_CACHE);
            })
    );
});

// Fetch event: serve from cache, falling back to network
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                // Cache hit - return response
                if (response) {
                    return response;
                }

                // IMPORTANT: Clone the request. A request is a stream and
                // can only be consumed once. Since we are consuming this
                // once by cache and once by the browser for fetch, we need
                // to clone the response.
                var fetchRequest = event.request.clone();

                return fetch(fetchRequest).then(
                    response => {
                        // Check if we received a valid response
                        if (!response || response.status !== 200 || response.type !== 'basic') {
                            return response;
                        }

                        // IMPORTANT: Clone the response. A response is a stream
                        // and because we want the browser to consume the response
                        // as well as the cache consuming the response, we need
                        // to clone it so we have two streams.
                        var responseToCache = response.clone();

                        caches.open(CACHE_NAME)
                            .then(cache => {
                                cache.put(event.request, responseToCache);
                            });

                        return response;
                    }
                );
            })
    );
});

// Optional: Cleanup outdated caches in the activate event
self.addEventListener('activate', event => {
    var cacheWhitelist = [CACHE_NAME];

    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        console.log('Deleting old cache:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

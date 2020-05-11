const assets = [
    'index.html',
    'index.css',
    'index.js',
    'logo.svg',
    'fallback.html'
];

const cacheVersion = 'v1';

// caching assets
this.addEventListener('install', event => {
    console.log('service worker has been installed');

    event.waitUntil(
        caches.open(cacheVersion).then((cache) => {
            cache.addAll(assets);
            console.log('Caching Success');
        }).catch((err) => console.log(`Cache Open: Err ${err}`))
    )
});

// validating cache
this.addEventListener('activate', event => {
    console.log('service worker has been activated');

    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.filter(name => name != cacheVersion)
                    .map((name) => caches.delete(name))
            )
        })
    )
});

// fetching request from cache if offline
this.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request).then((cacheRes) => {
            return cacheRes || fetch(event.request).then((response) => {
                return caches.open(cacheVersion).then((cache) => {
                    cache.put(event.request.url, response.clone());
                    return response;
                });
            });
        }).catch((err) => {
            console.log(err);
            caches.match('/fallback.html')
        })
    )
});

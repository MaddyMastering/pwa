// registering service worker
if (navigator.serviceWorker) {
    navigator.serviceWorker.register('/pwa/sw.js')
        .then(() => console.log('SW Register Success'))
        .catch((err) => console.log(`SW Register: Error ${err}`));
}
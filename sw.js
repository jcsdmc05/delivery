const storage = "delivery";
const content = [
  "./",
  "./index.html",
  "./static/js/app.js",
  "./static/css/style.css",
  "./static/img/favicon.png",
  "./static/img/calc.svg",
  "./static/img/logo.svg",
  "./static/img/whatsapp.svg",
  "./static/img/icons/icon-192.png",
  "./static/img/icons/icon-384.png",
  "./static/img/icons/icon-512.png",
];

// Install the serviceWorker
self.addEventListener("install", (e) => {
  e.waitUntil(
    (async () => {
      const cache = await caches.open(storage);
      await cache.addAll(content);
    })()
  );
});

self.addEventListener("fetch", (e) => {
  e.respondWith(
    (async () => {
      // Return the request if already in the cache
      const request = await caches.match(e.request);
      if (request) return request;
      // Cache and return the updated request
      const response = await fetch(e.request);
      const cache = await caches.open(storage);
      cache.put(e.request, response.clone());
      return response;
    })()
  );
});

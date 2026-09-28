const CACHE_NAME = 'djs-full-music-v2';
const urlsToCache = [
  './',
  './index.html',
  './manifest.json'
];

// Instala el Service Worker y guarda los archivos base
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
      .then(() => self.skipWaiting())
  );
});

// Activa el Service Worker correctamente
self.addEventListener('activate', event => {
  event.waitUntil(self.clients.claim());
});

// Responde a las peticiones de forma transparente
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});

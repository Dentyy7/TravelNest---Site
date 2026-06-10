const CACHE_NAME = 'travelnest-cache-v1';
const ASSETS = [
  './',
  './index.html',
  './explorer.html',
  './planner.html',
  './generator.html',
  './mood.html',
  './feedback.html',
  './manifest.json',
  './TN logo.png',
  './css/styles.css',
  './css/index.css',
  './css/explorer.css',
  './css/planner.css',
  './css/generator.css',
  './css/mood.css',
  './css/feedback.css',
  './javascript/common.js',
  './javascript/index.js',
  './javascript/explorer.js',
  './javascript/planner.js',
  './javascript/generator.js',
  './javascript/mood.js',
  './javascript/feedback.js'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
    ))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(cached => cached || fetch(event.request))
  );
});

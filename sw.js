const cacheName = 'RGLightCache';
const appShellFiles = [
  '/',
  './index.html',
  './assets/icon/icon48.png',
  './assets/icon/icon72.png',
  './assets/icon/icon96.png',
  './assets/icon/icon144.png',
  './assets/icon/icon168.png',
  './assets/icon/icon192.png',
  './assets/icon/icon512.png',
  './assets/icon/favicon.ico',
  './assets/arrow-right.svg',
  './assets/computer-mouse-solid.svg',
  './assets/shoe-prints-solid.svg',
  './assets/traffic-light-solid-green.svg',
  './assets/traffic-light-solid-red.svg',
  './assets/star-solid.svg',
  './assets/ranking-star-solid.svg',
  './src/red-green-light.js',
  './src/components/Input.js',
  './src/views/GameView/GameView.js',
  './src/views/HomeView/HomeView.js',
  './src/views/RankingView/RankingView.js',
];

self.addEventListener('install', e => {
  console.log('[Service Worker] Install');
  e.waitUntil(
    (async () => {
      const cache = await caches.open(cacheName);
      console.log('[Service Worker] Caching all: app shell and content');
      await cache.addAll(appShellFiles);
    })()
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keyList => {
      return Promise.all(
        keyList.map(key => {
          if (key === cacheName) {
            return;
          }
          return caches.delete(key);
        })
      );
    })
  );
});

self.addEventListener('fetch', e => {
  e.respondWith(
    (async () => {
      const r = await caches.match(e.request);
      console.log(`[Service Worker] Fetching resource: ${e.request.url}`);
      if (r) {
        return r;
      }
      const response = await fetch(e.request);
      const cache = await caches.open(cacheName);
      console.log(`[Service Worker] Caching new resource: ${e.request.url}`);
      cache.put(e.request, response.clone());
      return response;
    })()
  );
});

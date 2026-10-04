// Offline: gra działa nawet przy słabym szkolnym Wi-Fi po pierwszym wczytaniu.
const CACHE = 'milionerzy-v6';
const CORE = [
  './', 'index.html', 'css/style.css', 'js/app.js', 'js/audio.js', 'js/fx.js', 'js/questions.js', 'js/scenarios.js', 'js/exam-sets.js', 'js/grade5-sets.js', 'js/percent-exam-sets.js', 'js/grade7-sets.js', 'js/results.js',
  'images/final-hubert.jpg', 'images/hubert-face.jpg',
  'images/roman/hold-pruski.jpg', 'images/roman/sobieski.jpg', 'images/roman/grunwald.jpg', 'images/roman/kolumna.jpg', 'images/roman/pkin.jpg', 'manifest.webmanifest', 'icons/icon.svg', 'icons/icon-192.png', 'icons/icon-512.png',
];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(CORE)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', (e) => {
  e.waitUntil(caches.keys()
    .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
    .then(() => self.clients.claim()));
});

// Najpierw sieć (świeża wersja po deployu), w razie braku – kopia z cache.
self.addEventListener('fetch', (e) => {
  if (e.request.method !== 'GET') return;
  e.respondWith(
    fetch(e.request)
      .then((res) => {
        if (res.ok || res.type === 'opaque') {
          const copy = res.clone();
          caches.open(CACHE).then((c) => c.put(e.request, copy));
        }
        return res;
      })
      .catch(() => caches.match(e.request, { ignoreSearch: true }))
  );
});

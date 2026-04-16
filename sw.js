import { registerRoute, setCatchHandler } from 'workbox-routing';
import { NetworkFirst, CacheFirst, StaleWhileRevalidate } from 'workbox-strategies';
import { ExpirationPlugin } from 'workbox-expiration';

/* =========================
   INSTALL (PRECACHE CORE FILES)
========================= */
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open('core-cache').then((cache) => {
      return cache.addAll([
        '/',
        '/index.html',
        '/offline.html',
        '/style.css',
        '/script.js'
      ]);
    })
  );
  self.skipWaiting();
});

/* =========================
   ACTIVATE
========================= */
self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

/* =========================
   HTML PAGES (NAVIGATION)
========================= */
registerRoute(
  ({ request }) => request.mode === 'navigate',
  new NetworkFirst({
    cacheName: 'pages-cache',
    networkTimeoutSeconds: 3,
    plugins: [
      new ExpirationPlugin({
        maxEntries: 50,
        maxAgeSeconds: 7 * 24 * 60 * 60,
      }),
    ],
  })
);

/* =========================
   STATIC FILES
========================= */
registerRoute(
  ({ request }) =>
    ['script', 'style', 'image', 'font', 'video'].includes(request.destination),
  new CacheFirst({
    cacheName: 'static-cache',
    plugins: [
      new ExpirationPlugin({
        maxEntries: 150,
        maxAgeSeconds: 30 * 24 * 60 * 60,
      }),
    ],
  })
);

/* =========================
   API
========================= */
registerRoute(
  ({ url }) => url.pathname.startsWith('/api/'),
  new StaleWhileRevalidate({
    cacheName: 'api-cache',
  })
);

/* =========================
   OFFLINE FALLBACK (ENG MUHIM)
========================= */
setCatchHandler(async ({ event }) => {
  if (event.request.destination === 'document') {
    return caches.match('/offline.html');
  }
  return Response.error();
});
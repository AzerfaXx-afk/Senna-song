// SENNA Official PWA Service Worker (Auto-Updating)
const CACHE_VERSION = "senna-pwa-v2.0.1";
const STATIC_CACHE = `senna-static-${CACHE_VERSION}`;
const DYNAMIC_CACHE = `senna-dynamic-${CACHE_VERSION}`;

// Core static assets to precache for instant offline launch
const PRECACHE_ASSETS = [
  "/",
  "/manifest.json",
  "/images/hero-artistic-cover.jpg",
  "/images/hero-artist.jpg",
  "/images/album-eclipse.jpg",
  "/images/mv-crimson-rain.jpg",
  "/images/merch-hoodie.jpg",
];

// 1. Install Event: Precache and immediately skip waiting to take over
self.addEventListener("install", (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(STATIC_CACHE).then((cache) => {
      return cache.addAll(PRECACHE_ASSETS).catch((err) => {
        console.warn("[SW] Precache asset fetch warning:", err);
      });
    })
  );
});

// 2. Activate Event: Clean up stale caches and claim all clients immediately
self.addEventListener("activate", (event) => {
  event.waitUntil(
    Promise.all([
      self.clients.claim(),
      caches.keys().then((keys) => {
        return Promise.all(
          keys
            .filter((key) => key !== STATIC_CACHE && key !== DYNAMIC_CACHE)
            .map((key) => caches.delete(key))
        );
      }),
    ])
  );
});

// 3. Fetch Event: Network-First for HTML/Navigations, Stale-While-Revalidate for assets
self.addEventListener("fetch", (event) => {
  const request = event.request;

  // Ignore non-GET requests and chrome-extension / non-http schemes
  if (request.method !== "GET" || !request.url.startsWith("http")) {
    return;
  }

  // Network-First for document / HTML navigation: ensures latest code is always loaded on refresh
  if (request.mode === "navigate") {
    event.respondWith(
      fetch(request)
        .then((response) => {
          if (response && response.status === 200) {
            const clone = response.clone();
            caches.open(DYNAMIC_CACHE).then((cache) => cache.put(request, clone));
          }
          return response;
        })
        .catch(async () => {
          const cached = await caches.match(request);
          if (cached) return cached;
          const fallback = await caches.match("/");
          if (fallback) return fallback;
          return new Response("Offline - SENNA Official Web App", {
            headers: { "Content-Type": "text/html" },
          });
        })
    );
    return;
  }

  // Stale-While-Revalidate for images, scripts, styles
  event.respondWith(
    caches.match(request).then((cachedResponse) => {
      const fetchPromise = fetch(request)
        .then((networkResponse) => {
          if (
            networkResponse &&
            networkResponse.status === 200 &&
            (request.url.startsWith(self.location.origin) ||
              request.url.includes("fonts.googleapis.com") ||
              request.url.includes("fonts.gstatic.com"))
          ) {
            const clone = networkResponse.clone();
            caches.open(DYNAMIC_CACHE).then((cache) => cache.put(request, clone));
          }
          return networkResponse;
        })
        .catch(() => cachedResponse);

      return cachedResponse || fetchPromise;
    })
  );
});

// 4. Message Event: Handle instant updates
self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});

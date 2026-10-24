// WCU-VirtuLab Progressive Web App (PWA) Service Worker
// Version: 3.2.0 (Full Offline & Background Caching Engine)
// Western Caspian University Virtual Laboratory & Anatomy Center
// Author: Suleiman M Hajizadeh <suleyman.hacizade1@gmail.com>
// License: Mozilla Public License 2.0 (MPL-2.0)

const CACHE_VERSION = 'v5.0.0';
const STATIC_CACHE_NAME = `wcu-virtulab-static-${CACHE_VERSION}`;
const RUNTIME_CACHE_NAME = `wcu-virtulab-runtime-${CACHE_VERSION}`;
const MODELS_CACHE_NAME = `wcu-virtulab-models-${CACHE_VERSION}`;

// Core assets required for instantaneous offline startup
const CRITICAL_PRECACHE_URLS = [
  '/',
  '/manifest.json',
  '/site.webmanifest',
  '/favicon.ico',
  '/favicon.png',
  '/favicon.svg',
  '/wcu-logo.png',
  '/logo.png',
  '/wcu-pwa-icon-192.png',
  '/wcu-pwa-icon-512.png',
  '/wcu-pwa-maskable-192.png',
  '/wcu-pwa-maskable-512.png',
  '/icon-192x192.png',
  '/icon-512x512.png',
  '/icon-maskable-192x192.png',
  '/icon-maskable-512x512.png',
  '/apple-touch-icon.png',
  '/models/atlas.json',
  '/draco/draco_decoder.js',
  '/draco/draco_decoder.wasm',
  '/draco/draco_wasm_wrapper.js',
];

// Complete 3D anatomy chunk list for background warming
const CHUNK_MODEL_URLS = [
  '/models/atlas.json',
  '/models/atlas-female.json',
  '/models/body.glb',
  ...Array.from({ length: 15 }, (_, i) => `/models/body-${i}.bin`),
  ...Array.from({ length: 15 }, (_, i) => `/models/female-${i}.bin`),
  '/draco/draco_decoder.js',
  '/draco/draco_decoder.wasm',
  '/draco/draco_wasm_wrapper.js',
];

// =========================================================================
// INSTALL EVENT: Precache shell with fault tolerance and skip waiting immediately
// =========================================================================
self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(STATIC_CACHE_NAME).then(async (cache) => {
      await Promise.allSettled(
        CRITICAL_PRECACHE_URLS.map(async (url) => {
          try {
            const response = await fetch(url, { cache: 'reload' });
            if (response && response.ok) {
              await cache.put(url, response);
            }
          } catch (err) {
            console.warn('[WCU-VirtuLab SW] Precache optional skip:', url, err);
          }
        })
      );
    })
  );
});

// =========================================================================
// ACTIVATE EVENT: Delete obsolete caches & claim clients immediately
// Broadcast auto-synchronization message to all windows
// =========================================================================
self.addEventListener('activate', (event) => {
  const currentCaches = [STATIC_CACHE_NAME, RUNTIME_CACHE_NAME, MODELS_CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((name) => {
          if (!currentCaches.includes(name)) {
            console.log('[WCU-VirtuLab SW] Removing legacy cache:', name);
            return caches.delete(name);
          }
        })
      );
    }).then(async () => {
      await self.clients.claim();
      const allClients = await self.clients.matchAll({ type: 'window', includeUncontrolled: true });
      for (const client of allClients) {
        client.postMessage({
          type: 'APP_VERSION_SYNCED',
          version: CACHE_VERSION,
          timestamp: Date.now(),
        });
      }
    })
  );
});

// =========================================================================
// FETCH EVENT: Multi-tiered offline strategies
// =========================================================================
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET and browser extensions
  if (request.method !== 'GET' || !url.protocol.startsWith('http')) {
    return;
  }

  // 1. Navigation Requests: Network-First with cache: 'no-cache' to always get newest deployment
  if (request.mode === 'navigate') {
    event.respondWith(
      (async () => {
        try {
          // When online, always fetch fresh HTML from network so PWA matches web deployment
          const networkResponse = await fetch(request, { cache: 'no-cache' });
          if (networkResponse && networkResponse.ok) {
            const cache = await caches.open(STATIC_CACHE_NAME);
            cache.put(request, networkResponse.clone());
            return networkResponse;
          }
        } catch (err) {
          console.warn('[WCU-VirtuLab SW] Network navigation failed, falling back to cache:', err);
        }

        // Offline fallback
        const cached = await caches.match(request);
        if (cached) return cached;
        const rootMatch = await caches.match('/');
        if (rootMatch) return rootMatch;

          // Inline emergency offline page if cache is empty
          return new Response(
            `<!DOCTYPE html>
            <html lang="az">
            <head>
              <meta charset="UTF-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <title>WCU VirtuLab | Oflayn Rejim</title>
              <style>
                body { background: #001D33; color: #fff; font-family: system-ui, -apple-system, sans-serif; display: flex; align-items: center; justify-content: center; height: 100vh; margin: 0; padding: 20px; box-sizing: border-box; text-align: center; }
                .card { background: #002B49; border: 1px solid rgba(6,182,212,0.3); padding: 32px; border-radius: 16px; max-width: 480px; box-shadow: 0 20px 40px rgba(0,0,0,0.5); }
                h1 { color: #38bdf8; font-size: 24px; margin-bottom: 12px; }
                p { color: #94a3b8; font-size: 14px; line-height: 1.6; margin-bottom: 24px; }
                button { background: linear-gradient(135deg, #0891b2, #2563eb); color: white; border: none; padding: 12px 24px; border-radius: 8px; font-weight: 600; cursor: pointer; transition: opacity 0.2s; font-size: 14px; }
                button:hover { opacity: 0.9; }
              </style>
            </head>
            <body>
              <div class="card">
                <h1>WCU VirtuLab Oflayn Rejim</h1>
                <p>İnternet bağlantısı yoxdur. Tətbiq oflayn rejimdədir. Quraşdırılmış keş vasitəsilə platformadan istifadə edə bilərsiniz.</p>
                <button onclick="window.location.reload()">Yenidən Cəhd Et</button>
              </div>
            </body>
            </html>`,
            { headers: { 'Content-Type': 'text/html; charset=utf-8' } }
          );
        }
      })()
    );
    return;
  }

  // 2. Heavy 3D Models, Binary Chunks & Draco Decoders: Cache-First
  if (
    url.pathname.includes('/models/') ||
    url.pathname.includes('/draco/') ||
    url.pathname.includes('/molecules/') ||
    url.pathname.includes('/data/')
  ) {
    event.respondWith(
      (async () => {
        const modelsCache = await caches.open(MODELS_CACHE_NAME);
        const cached = await modelsCache.match(request);
        if (cached) return cached;

        try {
          const networkResponse = await fetch(request);
          if (networkResponse && networkResponse.ok) {
            modelsCache.put(request, networkResponse.clone());
          }
          return networkResponse;
        } catch (err) {
          // Check static cache as secondary fallback
          const staticMatch = await caches.match(request);
          if (staticMatch) return staticMatch;
          return new Response('Offline 3D Model Not Found in Cache', { status: 503, statusText: 'Offline' });
        }
      })()
    );
    return;
  }

  // 2.5 Branding Assets & Manifest: Network-First so PWA installation and logo ALWAYS reflect latest branding
  if (
    url.pathname.includes('manifest') ||
    url.pathname.includes('icon') ||
    url.pathname.includes('logo') ||
    url.pathname.includes('favicon')
  ) {
    event.respondWith(
      (async () => {
        try {
          const networkResponse = await fetch(request, { cache: 'reload' });
          if (networkResponse && networkResponse.ok) {
            const cache = await caches.open(STATIC_CACHE_NAME);
            cache.put(request, networkResponse.clone());
            return networkResponse;
          }
        } catch (err) {
          // Offline fallback
        }
        const cached = await caches.match(request);
        if (cached) return cached;
        return fetch(request);
      })()
    );
    return;
  }

  // 3. Static Next.js Bundles, Scripts, Styles & Images: Stale-While-Revalidate
  if (
    url.pathname.startsWith('/_next/static/') ||
    url.pathname.endsWith('.js') ||
    url.pathname.endsWith('.css') ||
    url.pathname.endsWith('.svg') ||
    url.pathname.endsWith('.png') ||
    url.pathname.endsWith('.jpg') ||
    url.pathname.endsWith('.jpeg') ||
    url.pathname.endsWith('.webp') ||
    url.pathname.endsWith('.woff2') ||
    url.pathname.endsWith('.woff')
  ) {
    event.respondWith(
      (async () => {
        const runtimeCache = await caches.open(RUNTIME_CACHE_NAME);
        const cachedResponse = await runtimeCache.match(request) || await caches.match(request);

        const fetchPromise = fetch(request)
          .then((networkResponse) => {
            if (networkResponse && networkResponse.ok) {
              runtimeCache.put(request, networkResponse.clone());
            }
            return networkResponse;
          })
          .catch(() => null);

        // If in cache, return immediately
        if (cachedResponse) return cachedResponse;

        // Otherwise wait for network
        const networkResponse = await fetchPromise;
        if (networkResponse) return networkResponse;

        return new Response('', { status: 408, statusText: 'Offline' });
      })()
    );
    return;
  }

  // 4. Default Requests: Cache-First with Network Fallback
  event.respondWith(
    (async () => {
      const cached = await caches.match(request);
      if (cached) return cached;

      try {
        const networkResponse = await fetch(request);
        if (networkResponse && networkResponse.ok) {
          const runtimeCache = await caches.open(RUNTIME_CACHE_NAME);
          runtimeCache.put(request, networkResponse.clone());
        }
        return networkResponse;
      } catch (err) {
        return new Response('', { status: 408, statusText: 'Offline' });
      }
    })()
  );
});

// =========================================================================
// MESSAGE EVENT: Background Full-Offline Download & Cache Inspector
// =========================================================================
self.addEventListener('message', async (event) => {
  if (!event.data) return;

  if (event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }

  // User-requested full offline download of all 3D chunks
  if (event.data.type === 'DOWNLOAD_ALL_3D_CHUNKS') {
    const modelsCache = await caches.open(MODELS_CACHE_NAME);
    let downloaded = 0;
    const total = CHUNK_MODEL_URLS.length;

    for (const url of CHUNK_MODEL_URLS) {
      try {
        const existing = await modelsCache.match(url);
        if (!existing) {
          const res = await fetch(url);
          if (res && res.ok) {
            await modelsCache.put(url, res);
          }
        }
        downloaded++;
        if (event.source) {
          event.source.postMessage({
            type: 'OFFLINE_DOWNLOAD_PROGRESS',
            progress: Math.round((downloaded / total) * 100),
            total,
            completed: downloaded,
            currentUrl: url,
          });
        }
      } catch (err) {
        console.warn('[WCU-VirtuLab SW] Download chunk failed:', url, err);
      }
    }

    if (event.source) {
      event.source.postMessage({
        type: 'OFFLINE_DOWNLOAD_COMPLETE',
        total,
      });
    }
  }

  // Query cache entry count & status
  if (event.data.type === 'GET_CACHE_INFO') {
    try {
      let count = 0;
      const cacheNames = await caches.keys();
      for (const name of cacheNames) {
        const c = await caches.open(name);
        const keys = await c.keys();
        count += keys.length;
      }

      // Check if critical models are cached
      const modelsCache = await caches.open(MODELS_CACHE_NAME);
      const atlasCached = !!(await modelsCache.match('/models/atlas.json'));
      const body0Cached = !!(await modelsCache.match('/models/body-0.bin'));

      if (event.source) {
        event.source.postMessage({
          type: 'CACHE_INFO_RESULT',
          totalEntries: count,
          modelsCached: atlasCached && body0Cached,
        });
      }
    } catch (err) {
      console.warn('[WCU-VirtuLab SW] Error getting cache info:', err);
    }
  }
});

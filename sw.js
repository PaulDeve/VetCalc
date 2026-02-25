/**
 * SERVICE WORKER - Soporte Offline
 * Permite que la aplicación funcione sin conexión a internet
 * Archivo: sw.js
 */

const CACHE_NAME = 'vetcalc-v1.0.0';
const URLS_TO_CACHE = [
    '/',
    '/index.html',
    '/css/styles.css',
    '/js/app.js',
    '/js/drugs-core.js',
    '/js/calculator.js',
    '/js/vaccines.js',
    '/js/stats.js',
    '/manifest.json'
];

/**
 * Instala el service worker y cachea los recursos
 */
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(URLS_TO_CACHE).catch(() => {
                // Si algo falla, continuar de todas formas
            });
        }).then(() => {
            self.skipWaiting();
        })
    );
});

/**
 * Activa el service worker y limpia cachés antiguos
 */
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName !== CACHE_NAME) {
                        return caches.delete(cacheName);
                    }
                })
            );
        }).then(() => {
            self.clients.claim();
        })
    );
});

/**
 * Maneja las peticiones: usa cache primero, luego red
 */
self.addEventListener('fetch', (event) => {
    // Solo cachear GET requests
    if (event.request.method !== 'GET') {
        return;
    }

    event.respondWith(
        caches.match(event.request)
            .then((response) => {
                // Retornar del cache si está disponible
                if (response) {
                    return response;
                }

                return fetch(event.request).then((response) => {
                    // Si no es válido, retornar tal cual
                    if (!response || response.status !== 200 || response.type !== 'basic') {
                        return response;
                    }

                    // Clonar y guardar en cache
                    const responseToCache = response.clone();
                    caches.open(CACHE_NAME)
                        .then((cache) => {
                            cache.put(event.request, responseToCache);
                        });

                    return response;
                });
            })
            .catch(() => {
                // Si falla completamente, intentar retornar una respuesta offline
                // (para HTML al menos)
                if (event.request.destination === 'document') {
                    return caches.match('/index.html');
                }
            })
    );
});

/**
 * Maneja mensajes desde los clientes
 */
self.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }
});

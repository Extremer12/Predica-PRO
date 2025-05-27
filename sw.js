// Versión actualizada del cache
const CACHE_NAME = 'predicaciones-v3';
const STATIC_CACHE = 'predicaciones-static-v3';
const DYNAMIC_CACHE = 'predicaciones-dynamic-v3';
const SERMON_CACHE = 'predicaciones-sermons-v3';

// Recursos estáticos para almacenar en caché
const urlsToCache = [
  './',
  './index.html',
  './styles.css',
  './script.js',
  './pdf-generator.js',
  './pwa.js',
  './manifest.json',
  'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js'
];

// Instalar el service worker
self.addEventListener('install', (event) => {
  console.log('[Service Worker] Instalando...');
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then((cache) => {
        console.log('[Service Worker] Pre-caching archivos estáticos');
        return cache.addAll(urlsToCache);
      })
      .then(() => {
        // Forzar la activación inmediata del service worker
        return self.skipWaiting();
      })
  );
});

// Activar el service worker
self.addEventListener('activate', (event) => {
  console.log('[Service Worker] Activando...');
  // Limpiar caches antiguos
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (
            cacheName !== STATIC_CACHE &&
            cacheName !== DYNAMIC_CACHE &&
            cacheName !== SERMON_CACHE
          ) {
            console.log('[Service Worker] Eliminando cache antiguo:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
    .then(() => {
      // Asegurar que el service worker tome el control inmediatamente
      return self.clients.claim();
    })
  );
});

// Estrategia de caché: Cache First, luego Network
self.addEventListener('fetch', (event) => {
  // Ignorar solicitudes a APIs externas como bible-api.com
  if (event.request.url.includes('bible-api.com')) {
    return;
  }
  
  // Manejar solicitudes de recursos estáticos
  if (urlsToCache.some(url => event.request.url.endsWith(url.replace('./', '')))) {
    event.respondWith(
      caches.match(event.request)
        .then((response) => {
          // Devolver el recurso desde cache si está disponible
          if (response) {
            return response;
          }
          
          // Si no está en caché, obtenerlo de la red
          return fetch(event.request).then(networkResponse => {
            // Guardar una copia en caché para uso futuro
            return caches.open(STATIC_CACHE).then(cache => {
              cache.put(event.request, networkResponse.clone());
              return networkResponse;
            });
          });
        })
        .catch(() => {
          // Fallback para recursos que no se pueden obtener
          if (event.request.url.indexOf('.html') > -1) {
            return caches.match('./index.html');
          }
        })
    );
  } else {
    // Para otros recursos, usar Network First, luego Cache
    event.respondWith(
      fetch(event.request)
        .then(response => {
          // Guardar una copia en caché dinámica
          return caches.open(DYNAMIC_CACHE).then(cache => {
            // Solo almacenar en caché solicitudes GET exitosas
            if (event.request.method === 'GET' && response.status === 200) {
              cache.put(event.request, response.clone());
            }
            return response;
          });
        })
        .catch(() => {
          // Si la red falla, intentar desde caché
          return caches.match(event.request);
        })
    );
  }
});

// Sincronización en segundo plano para guardar sermones cuando se recupera la conexión
self.addEventListener('sync', (event) => {
  console.log('[Service Worker] Sincronización en segundo plano', event.tag);
  
  if (event.tag === 'sync-sermons') {
    event.waitUntil(
      // Aquí iría la lógica para sincronizar sermones con un servidor
      // Por ahora solo registramos el evento
      console.log('[Service Worker] Sincronizando sermones...')
    );
  }
});

// Manejar notificaciones push
self.addEventListener('push', (event) => {
  console.log('[Service Worker] Notificación push recibida', event);
  
  let notificationData = {};
  
  if (event.data) {
    notificationData = event.data.json();
  }
  
  const options = {
    body: notificationData.body || 'Nuevas actualizaciones disponibles',
    icon: notificationData.icon || './icon.png',
    badge: notificationData.badge || './badge.png',
    data: {
      url: notificationData.url || './',
    },
    actions: [
      {
        action: 'open',
        title: 'Abrir'
      },
      {
        action: 'close',
        title: 'Cerrar'
      }
    ]
  };
  
  event.waitUntil(
    self.registration.showNotification(
      notificationData.title || 'Predica PRO', 
      options
    )
  );
});

// Manejar clics en notificaciones
self.addEventListener('notificationclick', (event) => {
  console.log('[Service Worker] Notificación clickeada', event.notification.tag);
  
  event.notification.close();
  
  if (event.action === 'close') {
    return;
  }
  
  event.waitUntil(
    clients.matchAll({type: 'window'})
      .then((clientList) => {
        const url = event.notification.data.url || './';
        
        // Si ya hay una ventana abierta, enfocarla
        for (const client of clientList) {
          if (client.url === url && 'focus' in client) {
            return client.focus();
          }
        }
        
        // Si no hay ventana abierta, abrir una nueva
        if (clients.openWindow) {
          return clients.openWindow(url);
        }
      })
  );
});

// Mensaje desde la página principal
self.addEventListener('message', (event) => {
  console.log('[Service Worker] Mensaje recibido:', event.data);
  
  if (event.data.action === 'skipWaiting') {
    self.skipWaiting();
  }
});
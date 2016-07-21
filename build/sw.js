self.addEventListener('install', event => {
  event.waitUntil(
    caches
      .open('kirov-bus')
      .then(cache => {
        return cache.addAll([
          '/',
          '/index.html',
          '/app.js',
          '/vendor.bundle.js',
          '/manifest.json',
          '/icons'
        ])
      })
      .then(() => self.skipWaiting())
  )
})

self.addEventListener('activate', event => {
  event.waitUntil(self.clients.claim())
})

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request)
    })
  )
})
self.addEventListener('install', event => {
  event.waitUntil(
    caches
      .open('kirov-bus')
      .then(cache => {
        return cache.addAll([
          '/',
          '/index.html'
        ])
      })
      .then(() => self.skipWaiting())
  )
})
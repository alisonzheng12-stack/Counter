const CACHE_NAME = "study-counter-app-20260519-06";
const ASSETS = [
  "./",
  "./index.html",
  "./completed.html",
  "./routine.html",
  "./rewards.html",
  "./styles.css",
  "./app.js",
  "./nippon-colors.js",
  "./news.json",
  "./manifest.webmanifest",
  "./app-icon.svg"
  ,"./assets/icons/inspiration.png"
  ,"./assets/icons/music.png"
  ,"./assets/icons/reward.png"
  ,"./assets/icons/more.png"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS)).then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;
  event.respondWith(
    fetch(event.request)
      .then((response) => {
        const copy = response.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
        return response;
      })
      .catch(() => caches.match(event.request).then((cached) => cached || caches.match("./index.html")))
  );
});













// // const cacheName = "MyCache1";
// // const urlList = ["index.html", "/img1.png", "/img2.png", "/img3.png"];

// // self.addEventListener("install", (event) => {
// //   event.waitUntil(
// //     caches.open(cacheName).then((cache) => {
// //       return cache.addAll(urlList);
// //     })
// //   );
// // });


// // sw1.js
// const CACHE_NAME = "my-cache-v2"; // bump version when assets change
// const ASSETS_TO_CACHE = [
//   // Icons (from manifest.json)
//   "/icons/icon-48x48.png",
//   "/icons/icon-72x72.png",
//   "/icons/icon-96x96.png",
//   "/icons/icon-128x128.png",
//   "/icons/icon-144x144.png",
//   "/icons/icon-152x152.png",
//   "/icons/icon-192x192.png",
//   "/icons/icon-256x256.png",
//   "/icons/icon-384x384.png",
//   "/icons/icon-512x512.png",

//   // Screenshots (from manifest.json)
//   "/screenshots/auth.jpg",
//   "/screenshots/home.png",
//   "/screenshots/chatbot.png",
//   "/screenshots/crop_advisory.jpg",
//   "/screenshots/weather.png",
//   "/screenshots/scheme.png",
//   "/screenshots/timeline.png",
// ];

// // Install event - cache files
// self.addEventListener("install", (event) => {
//   event.waitUntil(
//     caches.open(CACHE_NAME).then((cache) => {
//       return cache.addAll(ASSETS_TO_CACHE);
//     })
//   );
//   self.skipWaiting();
// });

// // Activate event - clean old caches
// self.addEventListener("activate", (event) => {
//   event.waitUntil(
//     caches.keys().then((keys) =>
//       Promise.all(
//         keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
//       )
//     )
//   );
//   self.clients.claim();
// });

// // Fetch event - serve cached files if available
// self.addEventListener("fetch", (event) => {
//   // Avoid caching index.html to prevent reload loops
//   if (event.request.mode === "navigate") {
//     return;
//   }

//   event.respondWith(
//     caches.match(event.request).then((cached) => {
//       return cached || fetch(event.request);
//     })
//   );
// });

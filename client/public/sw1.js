const cacheName = "MyCache1";
const urlList = ["index.html", "/img1.png", "/img2.png", "/img3.png"];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(cacheName).then((cache) => {
      return cache.addAll(urlList);
    })
  );
});
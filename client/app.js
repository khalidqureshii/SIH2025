if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("/sw1.js")
    .then((reg) => {
      console.log("service worker registered successfully", reg);
    })
    .catch((err) => {
      console.log("service worker failed to register", err);
    });
}
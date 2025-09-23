// if ("serviceWorker" in navigator) {
//   navigator.serviceWorker
//     .register("/sw1.js")
//     .then((reg) => {
//       console.log("service worker registered successfully", reg);
//     })
//     .catch((err) => {
//       console.log("service worker failed to register", err);
//     });
// }

// app.js
if ("serviceWorker" in navigator) {
  if (import.meta.env.PROD) {
    navigator.serviceWorker
      .register("/sw1.js")
      .then((reg) => {
        console.log("Service Worker registered successfully", reg);
      })
      .catch((err) => {
        console.log("Service Worker failed to register", err);
      });
  } else {
    console.log("Service Worker not registered in development mode");
  }
}

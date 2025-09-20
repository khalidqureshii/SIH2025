// // src/pwaRegister.ts
// import { registerSW } from 'virtual:pwa-register';

// export const registerServiceWorker = (onNeedRefresh?: () => void, onOfflineReady?: () => void) => {
//   const update = registerSW({
//     onNeedRefresh() {
//       if (onNeedRefresh) onNeedRefresh();
//       window.dispatchEvent(new CustomEvent('sw:need-refresh'));
//     },
//     onOfflineReady() {
//       if (onOfflineReady) onOfflineReady();
//       window.dispatchEvent(new CustomEvent('sw:offline-ready'));
//     }
//   });
//   (window as any).__swUpdate = update;
//   return update;
// };

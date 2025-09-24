// import path from "path"
// import react from "@vitejs/plugin-react"
// import { defineConfig } from "vite"

// export default defineConfig({
//   plugins: [react()],
//   resolve: {
//     alias: {
//       "@": path.resolve(__dirname, "./src"),
//     },
//   },
// })


// vite.config.ts
// import path from "path";
// import react from "@vitejs/plugin-react";
// import { defineConfig } from "vite";
// import { VitePWA } from "vite-plugin-pwa";

// export default defineConfig({
//   plugins: [
//     react(),
//     VitePWA({
//       registerType: "autoUpdate", // auto-downloads updates; we'll prompt user to apply
//       includeAssets: ["favicon.ico", "robots.txt", "icons/*.png"],
//       manifest: {
//         name: "My React App",
//         short_name: "MyApp",
//         description: "My React app turned into a PWA",
//         start_url: "/",
//         display: "standalone",
//         background_color: "#ffffff",
//         theme_color: "#0d6efd",
//         scope: "/",
//         icons: [
//           { src: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
//           { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png" }
//         ]
//       },
//       workbox: {
//         // runtime caching rules — tweak as needed
//         runtimeCaching: [
//           {
//             urlPattern: /\.(?:png|jpg|jpeg|svg|gif)$/,
//             handler: "CacheFirst",
//             options: {
//               cacheName: "images-cache",
//               expiration: { maxEntries: 60, maxAgeSeconds: 30 * 24 * 60 * 60 }
//             }
//           },
//           {
//             // Example API rule: replace `your-api-domain.com` with your real API domain or remove
//             urlPattern: /^https:\/\/your-api-domain\.com\/.*$/,
//             handler: "NetworkFirst",
//             options: {
//               cacheName: "api-cache",
//               networkTimeoutSeconds: 10
//             }
//           }
//         ]
//       }
//     })
//   ],
//   resolve: {
//     alias: {
//       "@": path.resolve(__dirname, "./src")
//     }
//   }
// });

import path from "path"
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate', // SW auto-updates without forcing reloads
      includeAssets: [
        'favicon.ico',
        'icons/*.png',
        'screenshots/*.png',
        'screenshots/*.jpg'
      ],
      manifest: {
        name: 'Bhoomiबंधु',
        short_name: 'Bhoomiबंधु',
        start_url: '/',
        display: 'fullscreen',
        orientation: 'portrait',
        icons: [
          { src: 'icons/icon-192x192.png', sizes: '192x192', type: 'image/png' },
          { src: 'icons/icon-512x512.png', sizes: '512x512', type: 'image/png' }
        ],
        screenshots: [
          { src: 'screenshots/auth.jpg', sizes: '720x1600', type: 'image/jpg', label: 'Authentication screen' },
          { src: 'screenshots/home.png', sizes: '2880x1530', type: 'image/png', label: 'Home dashboard' },
          { src: 'screenshots/chatbot.png', sizes: '2880x1530', type: 'image/png', label: 'Chatbot assistant' },
          { src: 'screenshots/crop_advisory.jpg', sizes: '720x1600', type: 'image/jpg', label: 'Crop advisory' },
          { src: 'screenshots/weather.png', sizes: '2880x1530', type: 'image/png', label: 'Weather forecast' },
          { src: 'screenshots/scheme.png', sizes: '2880x1530', type: 'image/png', label: 'Scheme information' },
          { src: 'screenshots/timeline.png', sizes: '2880x1530', type: 'image/png', label: 'Timeline view' }
        ]
      },
      workbox: {
        navigateFallback: '/index.html', // SPA routing fallback
        globPatterns: ['**/*.{js,css,png,jpg,ico}'],
        maximumFileSizeToCacheInBytes: 20 * 1024 * 1024
      }
    })
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src")
    }
  }
});

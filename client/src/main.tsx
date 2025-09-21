// import React from 'react'
// import ReactDOM from 'react-dom/client'
// import App from './App.jsx'
// import './index.css'
// import { ToastContainer, Bounce} from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import store, { persister } from './store/Store.js'
// import { Provider } from 'react-redux'
// import { PersistGate } from "redux-persist/integration/react";
// import './i18n.js';

// ReactDOM.createRoot(document.getElementById('root')!).render(
//   <Provider store={store}>
//     <PersistGate loading={null} persistor={persister}>
//       <React.StrictMode>
//         <App />
//         <ToastContainer
//           position="bottom-right"
//           autoClose={2000}
//           hideProgressBar={false}
//           newestOnTop={false}
//           closeOnClick
//           rtl={false}
//           pauseOnFocusLoss
//           draggable
//           pauseOnHover
//           theme="dark"
//           transition={Bounce}
//         />
//       </React.StrictMode>
//       </PersistGate>
//     </Provider>
// )


// src/main.tsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ToastContainer, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import store, { persister } from "./store/Store.js";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { I18nextProvider } from "react-i18next";
import i18n from "./i18n"; // your config
// import { registerServiceWorker } from "./pwaRegister";
import UpdateToast from "./components/common/UpdateToast.js";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persister}>
      <React.StrictMode>
        <I18nextProvider i18n={i18n}>
          <App />
          {/* Update banner for PWA updates */}
          <UpdateToast />

          {/* toast notifications */}
          <ToastContainer
            position="bottom-right"
            autoClose={2000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
            transition={Bounce}
          />
        </I18nextProvider>
      </React.StrictMode>
    </PersistGate>
  </Provider>
);

// // Register SW (must have vite-plugin-pwa + src/pwaRegister.ts implemented)
// registerServiceWorker(
//   () => {
//     // onNeedRefresh callback (optional)
//     console.log("Service worker reports: need refresh");
//   },
//   () => {
//     // onOfflineReady callback (optional)
//     console.log("Service worker reports: offline ready");
//   }
// );

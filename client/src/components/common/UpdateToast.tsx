// src/components/UpdateToast.tsx
import { useEffect, useState } from "react";

export default function UpdateToast() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const show = () => setVisible(true);
    window.addEventListener("sw:need-refresh", show as EventListener);

    const reloadOnControllerChange = () => window.location.reload();
    navigator.serviceWorker.addEventListener("controllerchange", reloadOnControllerChange);

    return () => {
      window.removeEventListener("sw:need-refresh", show as EventListener);
      navigator.serviceWorker.removeEventListener("controllerchange", reloadOnControllerChange);
    };
  }, []);

  if (!visible) return null;

  const applyUpdate = async () => {
    const updateFn = (window as any).__swUpdate as (() => Promise<boolean>) | undefined;
    if (updateFn) {
      await updateFn(); // triggers new SW install → controllerchange listener will reload
    } else {
      window.location.reload();
    }
  };

  return (
    <div
      style={{
        position: "fixed",
        left: 16,
        right: 16,
        bottom: 16,
        zIndex: 9999,
        padding: 12,
        background: "#111827",
        color: "#fff",
        borderRadius: 8,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <div>New version available</div>
      <div>
        <button onClick={applyUpdate} style={{ marginRight: 8 }}>
          Update
        </button>
        <button onClick={() => setVisible(false)}>Dismiss</button>
      </div>
    </div>
  );
}

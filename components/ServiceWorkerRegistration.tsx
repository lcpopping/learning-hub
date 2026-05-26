"use client";

import { useEffect, useState } from "react";

export function ServiceWorkerRegistration() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showInstallButton, setShowInstallButton] = useState(false);

  useEffect(() => {
    // Register service worker
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/sw.js")
        .then((registration) => {
          console.log("SW registered:", registration.scope);
        })
        .catch((error) => {
          console.log("SW registration failed:", error);
        });
    }

    // Handle install prompt
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowInstallButton(true);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    console.log("Install outcome:", outcome);

    if (outcome === "accepted") {
      setDeferredPrompt(null);
      setShowInstallButton(false);
    }
  };

  // Show install button on mobile
  if (!showInstallButton || !deferredPrompt) return null;

  return (
    <button
      onClick={handleInstall}
      className="fixed bottom-4 right-4 z-50 bg-primary-600 text-white px-4 py-2 rounded-full shadow-lg text-sm font-medium hover:bg-primary-700 transition-colors lg:hidden"
      style={{ bottom: "80px" }}
    >
      安装应用
    </button>
  );
}
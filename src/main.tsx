import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

// The masterclass artifact was originally authored for the Claude.ai sandbox,
// which exposes a `window.storage` API for cross-session progress persistence.
// In a browser we shim it to localStorage so XP, badges, and chapter completion
// survive reloads exactly the same way.
if (typeof window !== "undefined" && !window.storage) {
  window.storage = {
    get: async (key: string) => {
      try {
        const v = window.localStorage.getItem(key);
        return v != null ? { value: v } : null;
      } catch {
        return null;
      }
    },
    set: async (key: string, value: string) => {
      try {
        window.localStorage.setItem(key, value);
      } catch {
        /* swallow quota / privacy-mode errors — progress just won't persist */
      }
    },
  };
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

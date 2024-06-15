import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App.tsx";
import "./index.css";
import { devTools } from "./verdux/devTools";

chrome.runtime.onMessage.addListener((message, sender) => {
  console.log(
    sender.tab
      ? "from a content script:" + sender.tab.url
      : "from the extension"
  );
  const { type, payload } = message;
  if (type === "graphStructure") {
    devTools.sendGraphStructure(payload);
  } else if (type === "graphRunOutput") {
    devTools.sendGraphRunOutput(payload);
  }
  return undefined;
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

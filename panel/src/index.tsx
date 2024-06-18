import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App.tsx";
import { Message } from "./Message";
import "./index.css";
import { setCurrentRunOutput, setGraphStructure } from "./rootVertexConfig.ts";
import { graph } from "./verdux/graph.ts";

chrome.runtime.onMessage.addListener((message: Message, sender) => {
  if (sender.tab) {
    const { type, payload } = message;
    if (type === "graphStructure") {
      graph.dispatch(setGraphStructure(payload));
    } else if (type === "graphRunOutput") {
      graph.dispatch(setCurrentRunOutput(payload));
    }
  }
  return undefined;
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

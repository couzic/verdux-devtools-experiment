import { createGraph } from "verdux";
import { flowVertexConfig } from "../flow/flowVertexConfig";
import {
  rootVertexConfig,
  setVerduxGraphState,
  setVerduxGraphStructure,
} from "../rootVertexConfig";
import { vertexDetailsVertexConfig } from "./vertexDetailsVertexConfig";

export const graph = createGraph({
  vertices: [rootVertexConfig, flowVertexConfig, vertexDetailsVertexConfig],
});

// graph.dispatch(setVerduxGraphStructure(verduxGraphStructure));

// graph.dispatch(setVerduxGraphState(verduxGraphState));

chrome.runtime.onMessage.addListener((message, sender) => {
  console.log(
    sender.tab
      ? "from a content script:" + sender.tab.url
      : "from the extension"
  );
  console.log("message", message);
  if (message.type === "graphStructure") {
    graph.dispatch(setVerduxGraphStructure(message.payload));
  } else if (message.type === "graphState") {
    graph.dispatch(setVerduxGraphState(message.payload));
  }
  return undefined;
});

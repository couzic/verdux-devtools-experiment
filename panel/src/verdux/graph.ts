import { createGraph } from "verdux";
import { flowVertexConfig } from "../flow/flowVertexConfig";
import { rootVertexConfig } from "../rootVertexConfig";
import { vertexDetailsVertexConfig } from "./vertexDetailsVertexConfig";

export const graph = createGraph({
  vertices: [rootVertexConfig, flowVertexConfig, vertexDetailsVertexConfig],
});

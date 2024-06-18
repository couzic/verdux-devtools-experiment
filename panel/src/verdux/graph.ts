import { createGraph } from "verdux";
import { flowVertexConfig } from "../flow/flowVertexConfig";
import { rootVertexConfig } from "../rootVertexConfig";
import { versionSliderVertexConfig } from "./version/versionSliderVertexConfig";
import { vertexDetailsVertexConfig } from "./vertexDetailsVertexConfig";

export const graph = createGraph({
  vertices: [
    rootVertexConfig,
    flowVertexConfig,
    versionSliderVertexConfig,
    vertexDetailsVertexConfig,
  ],
});

import { VerduxDevTools } from "verdux";
import { setGraphStructure, setLastRunOutput } from "../rootVertexConfig";
import { graph } from "./graph";

export const devTools: VerduxDevTools = {
  sendGraphStructure: (structure) => {
    graph.dispatch(setGraphStructure(structure));
  },
  sendGraphRunOutput: (runOutput) => {
    graph.dispatch(setLastRunOutput(runOutput));
  },
};

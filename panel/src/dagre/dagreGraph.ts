import { graphlib, layout } from "@dagrejs/dagre";

const width = 172;
const height = 36;

var g = new graphlib.Graph();

// Set an object for the graph label
g.setGraph({
  // align: "DL",
  marginx: 60,
  marginy: 50,
});

// Default to assigning a new object as a label for each new edge.
g.setDefaultEdgeLabel(function () {
  return {};
});

const addNode = (id: string) => g.setNode(id, { width, height });

addNode("1");
addNode("2");
addNode("3");
addNode("4");
addNode("5");
addNode("6");
addNode("7");
addNode("8");
addNode("9");

g.setEdge("1", "2");
g.setEdge("1", "3");
g.setEdge("1", "5");
g.setEdge("2", "4");
g.setEdge("5", "4");
g.setEdge("5", "6");
g.setEdge("3", "7");
g.setEdge("1", "8");
g.setEdge("7", "8");
g.setEdge("4", "9");

layout(g);

export const dagreGraph = g;

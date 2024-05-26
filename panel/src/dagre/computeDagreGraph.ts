import { graphlib, layout } from "@dagrejs/dagre";
import { VerduxGraphStructure } from "../verdux/VerduxGraphStructure";

export const computeDagreGraph = (
  verduxGraph: VerduxGraphStructure
): graphlib.Graph => {
  const width = 172;
  const height = 36;

  var g = new graphlib.Graph();

  g.setGraph({
    marginx: 60,
    marginy: 50,
  });

  g.setDefaultEdgeLabel(function () {
    return {};
  });

  verduxGraph.vertices.forEach((vertex) => {
    g.setNode(vertex.id, { width, height });
  });
  verduxGraph.edges.forEach((edge) => {
    g.setEdge(edge.upstream, edge.downstream);
  });

  layout(g);

  return g;
};

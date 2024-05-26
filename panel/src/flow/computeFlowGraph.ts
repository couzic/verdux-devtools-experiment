import { computeDagreGraph } from "../dagre/computeDagreGraph";
import { VerduxGraphSnapshot } from "../verdux/VerduxGraphSnapshot";
import { VertexId } from "../verdux/VertexId";
import { FlowEdge, FlowGraph, FlowNode } from "./FlowGraph";
import { colorByStatus } from "../common/colorByStatus";

export const computeFlowGraph = (
  verduxGraph: VerduxGraphSnapshot
): FlowGraph => {
  const dagreGraph = computeDagreGraph(verduxGraph.structure);

  const vertexHasDownstream: Record<VertexId, true | undefined> = {} as any;
  verduxGraph.structure.edges.forEach((edge) => {
    vertexHasDownstream[edge.upstream] = true;
  });

  const nodes = verduxGraph.structure.vertices.map((vertex): FlowNode => {
    const { x, y } = dagreGraph.node(vertex.id);
    const state = verduxGraph.state.vertices[vertex.id];
    return {
      id: vertex.id,
      data: { label: vertex.name },
      position: { x, y },
      type: vertex.isRoot
        ? "input"
        : vertexHasDownstream[vertex.id]
        ? undefined
        : "output",
      style: {
        borderColor: colorByStatus[state?.status],
        borderWidth: 2,
      },
    };
  });

  const edges = verduxGraph.structure.edges.map((edge): FlowEdge => {
    return {
      id: edge.upstream + "-" + edge.downstream,
      source: edge.upstream,
      target: edge.downstream,
      animated: true,
    };
  });

  return { nodes, edges };
};

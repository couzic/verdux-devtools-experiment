import { keys } from "ramda";
import { SerializedGraphRunData, SerializedGraphStructure } from "verdux";
import { colorByStatus } from "../common/colorByStatus";
import { computeDagreGraph } from "../dagre/computeDagreGraph";
import { VertexId } from "../verdux/VertexId";
import { FlowEdge, FlowGraph, FlowNode } from "./FlowGraph";

export const computeFlowGraph = (
  structure: SerializedGraphStructure,
  runOutput: SerializedGraphRunData
): FlowGraph => {
  const dagreGraph = computeDagreGraph(structure);

  const vertexHasDownstream: Record<VertexId, true | undefined> = {} as any;
  structure.edges.forEach((edge) => {
    vertexHasDownstream[edge.upstream] = true;
  });

  const nodes = structure.vertices.map((vertex): FlowNode => {
    const { x, y } = dagreGraph.node(vertex.id);
    const fields = runOutput.fieldsByVertexId[vertex.id];
    // TODO get status from verdux utility function (to export)
    const status = keys(fields).some(
      (field) => fields[field].status === "error"
    )
      ? "error"
      : keys(fields).some((field) => fields[field].status === "loading")
      ? "loading"
      : "loaded";
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
        color: "white",
        backgroundColor: colorByStatus[status],
        borderWidth: 0,
        borderRadius: 6,
      },
    };
  });

  const edges = structure.edges.map((edge): FlowEdge => {
    return {
      id: edge.upstream + "-" + edge.downstream,
      source: edge.upstream,
      target: edge.downstream,
      animated: true,
    };
  });

  return { nodes, edges };
};

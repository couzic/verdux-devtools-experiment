import ReactFlow, { ConnectionMode, NodeMouseHandler } from "reactflow";

import "reactflow/dist/style.css";

import { focusVertex } from "../rootVertexConfig";
import { loadableComponent } from "../util/loadableComponent";
import { graph } from "../verdux/graph";
import { flowVertexConfig } from "./flowVertexConfig";

const vertex = graph.getVertexInstance(flowVertexConfig);

const onNodeClick: NodeMouseHandler = (_, node) =>
  graph.dispatch(focusVertex(node.id));

export const Flow = loadableComponent(
  vertex.pick(["flowGraph"]),
  ({ flowGraph: { nodes, edges } }) => (
    <div style={{ width: "65vw", height: "100vh" }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        contentEditable={false}
        connectionMode={ConnectionMode.Strict}
        onNodeClick={onNodeClick}
      />
    </div>
  )
);

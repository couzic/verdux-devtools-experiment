import { CSSProperties } from "react";

export interface FlowGraph {
  nodes: FlowNode[];
  edges: FlowEdge[];
}

export interface FlowNode {
  id: string;
  position: { x: number; y: number };
  data: { label: string };
  type?: "input" | "output";
  style: CSSProperties;
}

export interface FlowEdge {
  id: string;
  source: string;
  target: string;
  animated: boolean;
}

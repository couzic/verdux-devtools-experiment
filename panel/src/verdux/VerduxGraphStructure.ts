import { VertexId } from "./VertexId";

export interface VerduxGraphStructure {
  vertices: VertexStructure[];
  edges: VerduxEdgeStructure[];
}

export interface VertexStructure {
  id: VertexId;
  name: string;
  isRoot: boolean;
}

export interface VerduxEdgeStructure {
  upstream: VertexId;
  downstream: VertexId;
  fields: string[];
}

import { VertexFieldState } from "verdux/lib/state/VertexFieldState";
import { VertexId } from "./VertexId";

export interface VerduxGraphState {
  vertices: Record<VertexId, VertexState>;
}

export interface VertexState {
  status: "loading" | "loaded" | "error";
  fields: Record<string, VertexFieldState>;
  error: Error | undefined;
}

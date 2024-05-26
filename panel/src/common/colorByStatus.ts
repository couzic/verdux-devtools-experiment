import { VertexStatus } from "../verdux/VertexStatus";

export const colorByStatus: Record<VertexStatus, string> = {
  loading: "blue",
  loaded: "green",
  error: "red",
};

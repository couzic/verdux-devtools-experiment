import { createSlice } from "@reduxjs/toolkit";
import { rootVertexConfig } from "../rootVertexConfig";

const slice = createSlice({
  name: "vertexDetails",
  initialState: {},
  reducers: {},
});

export const vertexDetailsVertexConfig = rootVertexConfig
  .configureDownstreamVertex({
    slice,
    upstreamFields: ["verduxGraph", "focusedVertexId"],
  })
  .computeFromFields(["verduxGraph", "focusedVertexId"], {
    focusedVertex: ({ verduxGraph, focusedVertexId }) =>
      !focusedVertexId
        ? undefined
        : {
            name: verduxGraph.structure.vertices.filter(
              (_) => _.id === focusedVertexId
            )[0].name,
            state: verduxGraph.state.vertices[focusedVertexId],
          },
  });

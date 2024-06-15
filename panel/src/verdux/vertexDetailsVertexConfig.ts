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
    upstreamFields: ["graphStructure", "lastRunOutput", "focusedVertexId"],
  })
  .computeFromFields(["graphStructure", "lastRunOutput", "focusedVertexId"], {
    focusedVertex: ({ graphStructure, lastRunOutput, focusedVertexId }) =>
      !focusedVertexId
        ? undefined
        : {
            name: graphStructure.vertices.filter(
              (_) => _.id === focusedVertexId
            )[0].name,
            fields: lastRunOutput.fieldsByVertexId[focusedVertexId],
          },
  });

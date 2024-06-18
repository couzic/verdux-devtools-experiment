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
    upstreamFields: ["graphStructure", "currentRunOutput", "focusedVertexId"],
  })
  .computeFromFields(
    ["graphStructure", "currentRunOutput", "focusedVertexId"],
    {
      focusedVertex: ({ graphStructure, currentRunOutput, focusedVertexId }) =>
        !focusedVertexId
          ? undefined
          : {
              name: graphStructure.vertices.filter(
                (_) => _.id === focusedVertexId
              )[0].name,
              fields: currentRunOutput.data.fieldsByVertexId[focusedVertexId],
            },
    }
  );

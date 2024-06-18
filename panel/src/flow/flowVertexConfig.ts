import { createSlice } from "@reduxjs/toolkit";
import { rootVertexConfig } from "../rootVertexConfig";
import { computeFlowGraph } from "./computeFlowGraph";

const slice = createSlice({
  name: "flow",
  initialState: {},
  reducers: {},
});

export const flowVertexConfig = rootVertexConfig
  .configureDownstreamVertex({
    slice,
    upstreamFields: ["graphStructure", "currentRunOutput"],
  })
  .computeFromFields(["graphStructure", "currentRunOutput"], {
    flowGraph: ({ graphStructure, currentRunOutput }) =>
      computeFlowGraph(graphStructure, currentRunOutput.data),
  });

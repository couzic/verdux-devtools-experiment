import { createSlice } from "@reduxjs/toolkit";
import { rootVertexConfig } from "../../rootVertexConfig";

const slice = createSlice({
  name: "versionSlider",
  initialState: {},
  reducers: {},
});

export const versionSliderVertexConfig =
  rootVertexConfig.configureDownstreamVertex({
    slice,
    upstreamFields: ["currentRunOutput", "latestVersion"],
  });

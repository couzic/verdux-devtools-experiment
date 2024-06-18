import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import {
  SerializedGraphRunOutput,
  SerializedGraphStructure,
  configureRootVertex,
} from "verdux";
import { VertexId } from "./verdux/VertexId";

const initialGraphStructure: SerializedGraphStructure = {
  vertices: [],
  edges: [],
};

const initialGraphRun: SerializedGraphRunOutput = {
  action: undefined,
  initialRun: true,
  reactions: [],
  fieldsReactions: [],
  reduxStateByVertexId: {},
  fieldsByVertexId: {},
  changedFieldsByVertexId: {},
  sideEffects: [],
};

const slice = createSlice({
  name: "root",
  initialState: {
    graphStructure: initialGraphStructure,
    currentRunOutput: { data: initialGraphRun, version: 1 },
    latestVersion: 1,
    focusedVertexId: undefined as string | undefined,
  },
  reducers: {
    setGraphStructure: (
      state,
      action: PayloadAction<SerializedGraphStructure>
    ) => {
      state.graphStructure = action.payload;
    },
    setCurrentRunOutput: (
      state,
      action: PayloadAction<{
        data: SerializedGraphRunOutput;
        version: number;
      }>
    ) => {
      state.currentRunOutput = action.payload;
      const { version } = action.payload;
      if (state.latestVersion < version) {
        state.latestVersion = version;
      }
    },
    focusVertex: (state, action: PayloadAction<VertexId>) => {
      state.focusedVertexId = action.payload;
    },
  },
});

export const rootVertexConfig = configureRootVertex({
  slice,
});

export const { setGraphStructure, setCurrentRunOutput, focusVertex } =
  slice.actions;

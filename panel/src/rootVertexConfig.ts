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
  initialRun: false,
  reactions: [],
  fieldsReactions: [],
  reduxStateByVertexId: {},
  fieldsByVertexId: {},
  changedFieldsByVertexId: {},
};

const slice = createSlice({
  name: "root",
  initialState: {
    graphStructure: initialGraphStructure,
    lastRunOutput: initialGraphRun,
    focusedVertexId: undefined as string | undefined,
  },
  reducers: {
    setGraphStructure: (
      state,
      action: PayloadAction<SerializedGraphStructure>
    ) => {
      state.graphStructure = action.payload;
    },
    setLastRunOutput: (
      state,
      action: PayloadAction<SerializedGraphRunOutput>
    ) => {
      state.lastRunOutput = action.payload;
    },
    focusVertex: (state, action: PayloadAction<VertexId>) => {
      state.focusedVertexId = action.payload;
    },
  },
});

export const rootVertexConfig = configureRootVertex({
  slice,
});

export const { setGraphStructure, setLastRunOutput, focusVertex } =
  slice.actions;

import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { configureRootVertex } from "verdux";
import { VerduxGraphSnapshot } from "./verdux/VerduxGraphSnapshot";
import { VerduxGraphState } from "./verdux/VerduxGraphState";
import { VerduxGraphStructure } from "./verdux/VerduxGraphStructure";
import { VertexId } from "./verdux/VertexId";

const slice = createSlice({
  name: "root",
  initialState: {
    verduxGraph: {
      structure: { vertices: [], edges: [] },
      state: { vertices: {} as any },
    } as VerduxGraphSnapshot,
    focusedVertexId: undefined as string | undefined,
  },
  reducers: {
    setVerduxGraphStructure: (
      state,
      action: PayloadAction<VerduxGraphStructure>
    ) => {
      state.verduxGraph.structure = action.payload;
    },
    setVerduxGraphState: (state, action: PayloadAction<VerduxGraphState>) => {
      state.verduxGraph.state = action.payload;
    },
    focusVertex: (state, action: PayloadAction<VertexId>) => {
      state.focusedVertexId = action.payload;
    },
  },
});

export const rootVertexConfig = configureRootVertex({
  slice,
});

export const { setVerduxGraphStructure, setVerduxGraphState, focusVertex } =
  slice.actions;

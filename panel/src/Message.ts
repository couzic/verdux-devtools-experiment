import { SerializedGraphRunData, SerializedGraphStructure } from "verdux";

export type Message =
  | {
      type: "graphStructure";
      payload: SerializedGraphStructure;
    }
  | {
      type: "graphRunOutput";
      payload: { data: SerializedGraphRunData; version: number };
    };

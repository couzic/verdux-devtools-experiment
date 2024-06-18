import { SerializedGraphRunOutput, SerializedGraphStructure } from "verdux";

export type Message =
  | {
      type: "graphStructure";
      payload: SerializedGraphStructure;
    }
  | {
      type: "graphRunOutput";
      payload: { data: SerializedGraphRunOutput; version: number };
    };

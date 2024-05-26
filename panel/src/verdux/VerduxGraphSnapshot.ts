import { VerduxGraphState } from "./VerduxGraphState";
import { VerduxGraphStructure } from "./VerduxGraphStructure";

export interface VerduxGraphSnapshot {
  structure: VerduxGraphStructure;
  state: VerduxGraphState;
}

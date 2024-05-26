import { Flow } from "./flow/Flow";
import { VertexDetails } from "./verdux/VertexDetails";

export const App = () => (
  <div
    style={{
      display: "flex",
      width: "100vw",
      height: "100vh",
    }}
  >
    <Flow />
    <VertexDetails />
  </div>
);

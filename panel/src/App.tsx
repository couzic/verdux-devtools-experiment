import { Flow } from "./flow/Flow";
import { theme } from "./theme";
import { VertexDetails } from "./verdux/VertexDetails";
import { VersionSlider } from "./verdux/version/VersionSlider";

export const App = () => (
  <div
    style={{
      width: "100vw",
      height: "100vh",
    }}
  >
    <div
      style={{
        display: "flex",
        height: `calc(100vh - ${theme.slider.height})`,
        backgroundColor: theme.backgroundColor,
      }}
    >
      <Flow />
      <VertexDetails />
    </div>
    <VersionSlider />
  </div>
);

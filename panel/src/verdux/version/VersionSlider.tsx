import { CSSProperties } from "react";
import { theme } from "../../theme";
import { loadableComponent } from "../../util/loadableComponent";
import { graph } from "../graph";
import "./versionSlider.css";
import { versionSliderVertexConfig } from "./versionSliderVertexConfig";

const sendVersion = async (version: number) => {
  const [tab] = await chrome.tabs.query({
    active: true,
    lastFocusedWindow: true,
  });
  chrome.tabs.sendMessage(tab.id!, {
    type: "selectRunOuptutVersion",
    payload: version,
  });
};

const handleSliderChange = (event: any) => {
  const version = parseInt(event.target.value, 10);
  sendVersion(version);
};

const previousButtonClicked = (currentVersion: number) => () => {
  const version = currentVersion - 1;
  sendVersion(version);
};

const nextButtonClicked = (currentVersion: number) => () => {
  const version = currentVersion + 1;
  sendVersion(version);
};

const vertex = graph.getVertexInstance(versionSliderVertexConfig);

const buttonStyle: CSSProperties = {
  display: "flex",
  alignItems: "center",
  padding: 0,
  border: "none",
  backgroundColor: "rgba(0, 0, 0, 0)",
};
const svgStyle: CSSProperties = {
  border: "none",
  cursor: "pointer",
  fill: "rgb(255, 255, 255)",
  width: "1.8rem",
  height: "1.8rem",
};

export const VersionSlider = loadableComponent(
  vertex.pick(["currentRunOutput", "latestVersion"]),
  ({ currentRunOutput, latestVersion }) => (
    <div
      style={{
        height: `calc(${theme.slider.height} - 2px)`, // Subtract 2px for border
        borderColor: "rgb(79, 90, 101)",
        borderStyle: "solid",
        borderWidth: "1px 0px",
        backgroundColor: "rgb(60, 68, 79)",
        color: "rgb(245, 245, 245)",
      }}
    >
      <label
        style={{
          display: "block",
          position: "relative",
          top: "0.5rem",
          width: "100%",
          textAlign: "center",
        }}
      >
        {currentRunOutput.data.action
          ? currentRunOutput.data.action.type + " "
          : "(partial run) "}
        {currentRunOutput.version} / {latestVersion}
      </label>
      <div style={{ display: "flex", padding: "0.2rem 1.4rem" }}>
        <input
          type="range"
          min="1"
          max={latestVersion}
          value={currentRunOutput.version}
          onChange={handleSliderChange}
          style={{
            width: "100%",
            cursor: "pointer",
          }}
        />
        <button
          aria-label="Go back"
          style={{
            ...buttonStyle,
            opacity: currentRunOutput.version === 1 ? 0.4 : 1,
          }}
          className="version-slider-button"
          onClick={previousButtonClicked(currentRunOutput.version)}
          disabled={currentRunOutput.version === 1}
        >
          <svg
            viewBox="0 0 24 24"
            preserveAspectRatio="xMidYMid meet"
            style={svgStyle}
          >
            <g>
              <path d="M15.41 16.09l-4.58-4.59 4.58-4.59-1.41-1.41-6 6 6 6z"></path>
            </g>
          </svg>
        </button>
        <button
          aria-label="Go forward"
          style={{
            ...buttonStyle,
            opacity: currentRunOutput.version === latestVersion ? 0.4 : 1,
          }}
          className="version-slider-button"
          onClick={nextButtonClicked(currentRunOutput.version)}
          disabled={currentRunOutput.version === latestVersion}
        >
          <svg
            viewBox="0 0 24 24"
            preserveAspectRatio="xMidYMid meet"
            style={svgStyle}
          >
            <g>
              <path d="M8.59 16.34l4.58-4.59-4.58-4.59 1.41-1.41 6 6-6 6z"></path>
            </g>
          </svg>
        </button>
      </div>
    </div>
  )
);

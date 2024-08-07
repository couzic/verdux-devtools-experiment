import { keys } from "ramda";
import { FC } from "react";
import { SerializedVertexFieldState } from "verdux";
import { colorByStatus } from "../common/colorByStatus";
import { loadableComponent } from "../util/loadableComponent";
import { graph } from "./graph";
import { vertexDetailsVertexConfig } from "./vertexDetailsVertexConfig";

const vertex = graph.getVertexInstance(vertexDetailsVertexConfig);

export const VertexDetails = loadableComponent(
  vertex.pick(["focusedVertex"]),
  ({ focusedVertex }) => (
    <div
      style={{
        width: "35vw",
        color: "white",
        overflowY: "auto",
        overflowX: "clip",
        textOverflow: "ellipsis",
      }}
    >
      <h2>Vertex: {focusedVertex?.name}</h2>

      <div>
        <h3>Fields:</h3>
        {focusedVertex &&
          keys(focusedVertex.fields).map((fieldName) => (
            <FieldDetails
              name={fieldName}
              state={focusedVertex.fields[fieldName]}
            />
          ))}
      </div>
    </div>
  )
);

const FieldDetails: FC<{
  name: string;
  state: SerializedVertexFieldState;
}> = ({ name, state: { status, value, errors } }) => (
  <div
    style={{
      border: "1px solid gray",
      borderRadius: 10,
      padding: "6px 12px",
      margin: "20px 12px",
    }}
  >
    <div style={{ fontSize: 18, marginBottom: 10 }}>{name}</div>
    <div>
      Status:
      <span
        style={{
          marginLeft: 10,
          color: "white",
          backgroundColor: colorByStatus[status],
          padding: "2px 4px",
          borderRadius: "6px",
        }}
      >
        {status}
      </span>
    </div>
    {status === "loaded" && <div>Value: {JSON.stringify(value)}</div>}
    {status === "error" && (
      <div>
        <div>Errors:</div>
        {errors.map((error) => (
          <>
            <div>{error.name}</div>
            <div>{error.message}</div>
            {error.stack && <div>{error.stack}</div>}
          </>
        ))}
      </div>
    )}
  </div>
);

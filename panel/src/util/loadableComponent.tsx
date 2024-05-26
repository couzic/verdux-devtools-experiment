import { state as componentState, useStateObservable } from "@react-rxjs/core";
import React from "react";
import { Observable } from "rxjs";
import { VertexLoadableState } from "verdux";
import { VertexFieldsDefinition } from "verdux/lib/config/VertexFieldsDefinition";

export function loadableComponent<Fields extends VertexFieldsDefinition>(
  loadableState$: Observable<VertexLoadableState<Fields>>,
  Component: React.FC<VertexLoadableState<Fields>["state"]>
): React.FC<{}> {
  const componentState$ = componentState(loadableState$, null);
  return () => {
    const loadableState = useStateObservable(componentState$);
    if (loadableState === null) return null;
    if (loadableState.status === "loading") return "Loading...";
    if (loadableState.status === "error")
      return (
        <h3>
          Errors:{" "}
          {JSON.stringify(loadableState.errors.map((error) => error.message))}
        </h3>
      );
    return <Component {...(loadableState.state as any)} />;
  };
}

const __createVerduxDevTools__ = () => {
  const runOutputs = [];

  document.addEventListener(
    "__VERDUX_CUSTOM_EVENT_ISOLATED_TO_MAIN__",
    (event) => {
      const { type, payload } = event.detail;
      if (forceGraphRunOutput && type === "selectRunOuptutVersion") {
        const version = payload;
        const runOutput = runOutputs[version - 1];
        dispatchGraphRunOutput(runOutput, version);
        forceGraphRunOutput(runOutput);
      }
    }
  );

  let forceGraphRunOutput;
  let serializeGraphRunData;

  const dispatchGraphRunOutput = (runOutput, version) => {
    const data = serializeGraphRunData(runOutput);
    document.dispatchEvent(
      new CustomEvent("__VERDUX_CUSTOM_EVENT_MAIN_TO_ISOLATED__", {
        detail: {
          type: "graphRunOutput",
          payload: { data, version },
        },
      })
    );
  };

  return {
    sendGraphStructure: (structure) => {
      document.dispatchEvent(
        new CustomEvent("__VERDUX_CUSTOM_EVENT_MAIN_TO_ISOLATED__", {
          detail: {
            type: "graphStructure",
            payload: structure,
          },
        })
      );
    },
    sendGraphRunOutput: (data) => {
      const version = runOutputs.push(data);
      dispatchGraphRunOutput(data, version);
    },
    provideForceGraphRunOutput(f) {
      forceGraphRunOutput = f;
    },
    provideSerializeGraphRunData(f) {
      serializeGraphRunData = f;
    },
  };
};

window.__VERDUX_DEVTOOLS_EXTENSION__ = __createVerduxDevTools__();

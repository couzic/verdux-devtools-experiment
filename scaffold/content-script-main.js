const __VERDUX_CUSTOM_EVENT__ = "__VERDUX_CUSTOM_EVENT__";

window.__VERDUX_DEVTOOLS_EXTENSION__ = {
  sendGraphStructure: (structure) => {
    document.dispatchEvent(
      new CustomEvent(__VERDUX_CUSTOM_EVENT__, {
        detail: {
          type: "graphStructure",
          payload: structure,
        },
      })
    );
  },
  sendGraphRunOutput: (output) => {
    document.dispatchEvent(
      new CustomEvent(__VERDUX_CUSTOM_EVENT__, {
        detail: {
          type: "graphRunOutput",
          payload: output,
        },
      })
    );
  },
};

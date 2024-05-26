const verduxGraphStructure = {
  vertices: [
    { id: "root", name: "Root", isRoot: true },
    { id: "downstream_1", name: "Downstream 1", isRoot: false },
    {
      id: "downstream_1.downstream_2",
      name: "Downstream 2",
      isRoot: false,
    },
    { id: "downstream_3", name: "Downstream 3", isRoot: false },
  ],
  edges: [
    {
      upstream: "root",
      downstream: "downstream_1",
      fields: [],
    },
    {
      upstream: "downstream_1",
      downstream: "downstream_1.downstream_2",
      fields: [],
    },
    {
      upstream: "root",
      downstream: "downstream_3",
      fields: [],
    },
  ],
};

const verduxGraphState = {
  vertices: {
    root: {
      status: "loaded",
      error: undefined,
      fields: {
        loggedUser: {
          status: "loaded",
          errors: [],
          value: { name: "Bob" },
        },
      },
    },
    downstream_1: {
      status: "loading",
      error: undefined,
      fields: {
        loggedUser: {
          status: "loaded",
          errors: [],
          value: { name: "Bob" },
        },
        loggedUserPermissions: {
          status: "loading",
          errors: [],
          value: undefined,
        },
      },
    },
    "downstream_1.downstream_2": {
      status: "loading",
      error: undefined,
      fields: {
        loggedUser: {
          status: "loaded",
          errors: [],
          value: { name: "Bob" },
        },
        loggedUserPermissions: {
          status: "loading",
          errors: [],
          value: undefined,
        },
      },
    },
    downstream_3: {
      status: "loaded",
      error: undefined,
      fields: {
        loggedUser: {
          status: "loaded",
          errors: [],
          value: { name: "Bob" },
        },
        userName: {
          status: "loaded",
          errors: [],
          value: "Bob",
        },
      },
    },
  },
};

(async () => {
  const response1 = await chrome.runtime.sendMessage({
    type: "graphStructure",
    payload: verduxGraphStructure,
  });
  console.log("response1", response1);

  const response2 = await chrome.runtime.sendMessage({
    type: "graphState",
    payload: verduxGraphState,
  });
  console.log("response2", response2);
})();

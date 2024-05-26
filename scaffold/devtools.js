// const log = (_) =>
//   (document.getElementById(`log`).innerHTML +=
//     JSON.stringify(_, null, 2) + "<br>");

// chrome.runtime.onConnect.addListener((connection) => {
//   console.log("onConnect from devtools page", connection);
//   log("onConnect from devtools page", connection);
//   connection.onMessage.addListener((message) => {
//     console.log("message from devtools page", message);
//     log("message from devtools page", message);
//   });
// });

chrome.devtools.panels.create(
  "Verdux Experiment", // title
  "icons/border-48.png", // icon
  "index.html" // content
);

// // getCurrentTab((tab) => {
// //   console.log(tab);
// //   chrome.runtime.onConnect.addListener(function (port) {
// //     console.log("port", port);
// //     port.onMessage.addListener(function (message) {
// //       console.log("message", message);
// //       if (message === "connected") {
// //         console.log("Connected to devtools panel!");
// //         chrome.tabs.sendMessage(tab.id, { data: "Hello from extension!" });
// //       }
// //     });
// //   });
// // });

document.addEventListener(
  "__VERDUX_CUSTOM_EVENT_MAIN_TO_ISOLATED__",
  (event) => {
    chrome.runtime.sendMessage(event.detail);
  }
);

chrome.runtime.onMessage.addListener((message, sender) => {
  if (!sender.tab) {
    document.dispatchEvent(
      new CustomEvent("__VERDUX_CUSTOM_EVENT_ISOLATED_TO_MAIN__", {
        detail: message,
      })
    );
  }
});

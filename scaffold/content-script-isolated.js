document.addEventListener("__VERDUX_CUSTOM_EVENT__", function (event) {
  chrome.runtime.sendMessage(event.detail);
});

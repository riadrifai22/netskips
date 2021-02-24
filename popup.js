const form = document.getElementById("popup-form");
const inputElements = ["whenToSkip", "secondsToSkip"];

form.addEventListener("submit", event => {
  event.preventDefault();
  const [whenToSkip, secondsToSkip] = [...inputElements.map(el => event.target[el].value)];

  chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
    chrome.storage.local.set({ whenToSkip, secondsToSkip});
    chrome.tabs.executeScript(tabs[0].id, {file: "script.js"}, () => {
        const error = chrome.runtime.lastError;
        if (error) "Error. Tab ID: " + tab.id + ": " + JSON.stringify(error);

        chrome.tabs.sendMessage(tabs[0].id, { whenToSkip, secondsToSkip});
      }
    );
  });
});
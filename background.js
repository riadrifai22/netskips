chrome.runtime.onInstalled.addListener(function() {
    // Fired when the extension is first installed, when the extension is updated to a new version, and when Chrome is updated to a new version.
    // chrome.storage.sync.set({color: '#3aa757'}, function() {
    //   console.log("The color is green.");
    // });

    // chrome.storage.local.set({ vPos: 300, fSize: 24, fColor: "#FFFFFF" });
    
    // Use the chrome.declarativeContent API to take actions depending on the content of a page, without requiring permission to read the page's content.
    chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
        chrome.declarativeContent.onPageChanged.addRules([{
          conditions: [
              new chrome.declarativeContent.PageStateMatcher({
                  pageUrl: { hostSuffix: "netflix.com" }
                })
            ],
            actions: [new chrome.declarativeContent.ShowPageAction()]
        }]);
    });

    // chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    //     if (changeInfo.status === "complete" && tab.active) {
    //       chrome.storage.local.get(["vPos", "fSize", "fColor"], data => {
    //         chrome.tabs.executeScript(tabId, {file: "script.js"}, () => {
    //           const error = chrome.runtime.lastError;
    //           if (error) "Error. Tab ID: " + tab.id + ": " + JSON.stringify(error);
    
    //           chrome.tabs.sendMessage(tabId, {
    //             vPos: data.vPos,
    //             fSize: data.fSize,
    //             fColor: data.fColor
    //           });
    //         });
    //       });
    //     }
    // });
});
chrome.action.onClicked.addListener((tab) => {
    if (!tab.url.startsWith("http")) return;

    chrome.tabs.sendMessage(tab.id, { action: "toggleToolbar"} )
    .catch(err => console.warn(err));;
});


import {isPage, isWatchPage} from "../../modules/conditions.ts";

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === 'complete' && tab.url) {
        const currentUrl = tab.url;
        if (isPage(currentUrl)) {
            setTimeout(function () {
                chrome.tabs.sendMessage(tabId, {message: "activateBlock", timestamp: Date.now()});
            }, 1000);
        } else if (isWatchPage(currentUrl)) {
            setTimeout(function () {
                chrome.tabs.sendMessage(tabId, {message: "saveVideoTitle"});
            }, 1000);
        }
    }
});
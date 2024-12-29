import {isPage} from "./conditions.ts";

export function reloadYouTubePage() {
    chrome.tabs.query({currentWindow: true}, function (tabs) {
        tabs.forEach(function (tab) {
            if (isPage(tab.url)) {
                chrome.tabs.reload(tab.id);
            }
        });
    });
}
// import { cloneDeep } from 'lodash-es'
import {reloadYouTubePage} from "./tabAction.ts";
import {functionSwitch, blockList, selectDefaultValue, appearedVideosParameter} from "../settings/settings.ts";
import {i} from "vite/dist/node/types.d-aGj9QkWt";

export function getPopupSwitch(callback) {
    fetchFromStorage({
        ...functionSwitch,
        ...selectDefaultValue
    }, callback);
}

export function getBlockList(callback) {
    fetchFromStorage(blockList, callback);
}

export function getPopupSwitchAndBlockList(callback) {
    fetchFromStorage({
        ...functionSwitch,
        ...selectDefaultValue,
        ...blockList
    }, callback);
}

export function getCountBlockedVideos(callback) {
    fetchFromStorage({
        countBlockedVideos: false
    }, callback);
}

export function saveSwitchChange(settingName) {
    const checked = event.target.checked;
    chrome.storage.local.set({
        [settingName]: checked,
        countBlockedVideos: null
    });

    if (!checked) {
        reloadYouTubePage();
    }
}

export function saveSelectChange(settingName, functionSwitch) {
    const selected = event.target.value;
    chrome.storage.local.set({
        [settingName]: selected,
        countBlockedVideos: null
    });

    if (functionSwitch) {
        reloadYouTubePage();
    }
}


export function saveInputToStorage(name, inputString) {
    chrome.storage.local.set({
        [name]: inputString,
        countBlockedVideos: null
    });
}

export function saveWatchedVideo(tryNumber?: number) {
    if (tryNumber && tryNumber > 0) {
        return;
    }

    const element = document.querySelector('h1.style-scope.ytd-watch-metadata yt-formatted-string');

    if (!element) {
        setTimeout(saveWatchedVideo(1), 3000);
        return;
    }

    const title = element.textContent;

    if (title) {
        chrome.storage.local.get({blockWatchedVideosList: null}, function (items) {
            if (!items.blockWatchedVideosList) {
                chrome.storage.local.set({
                    blockWatchedVideosList: title,
                    countBlockedVideos: null
                });
            } else {
                const list = items.blockWatchedVideosList.split('\n').filter(k => k.trim() !== '');

                if (!list.some(wvl => wvl == title)) {
                    chrome.storage.local.set({
                        blockWatchedVideosList: `${items.blockWatchedVideosList}\n${title}`,
                        countBlockedVideos: null
                    });
                }
            }
        });
    }
}

export function saveAppearedVideos(cards, timestamp) {
    chrome.storage.local.get(appearedVideosParameter, function(items) {
        let isProcessed = {};

        if (!items.appearedVideos) {
            let videos = {};

            cards.forEach((card) => {
                videos[card.title] = 1;
                isProcessed[card.title] = true;
            });
            chrome.storage.local.set({
                appearedVideosTimestamp: timestamp,
                appearedVideosExpired: new Date(timestamp).setMonth(new Date(timestamp).getDate() + 7),
                appearedVideos: videos,
                appearedIsProcessed: isProcessed
            });
        } else if (items.appearedVideosTimestamp == timestamp) {
            let videos = items.appearedVideos;

            cards.forEach((card) => {
                if (!videos[card.title]) {
                    videos[card.title] = 1;
                } else if (!items.appearedIsProcessed[card.title]) {
                    videos[card.title] += 1;
                }

                isProcessed[card.title] = true;
            });
            chrome.storage.local.set({
                appearedVideos: videos,
                appearedIsProcessed: isProcessed
            });
        } else if (items.appearedVideosTimestamp != timestamp) {
            let videos = items.appearedVideos;
            isProcessed = {};

            chrome.storage.local.remove("appearedIsProcessed");

            cards.forEach((card) => {
                if (!videos[card.title]) {
                    videos[card.title] = 1;
                } else {
                    videos[card.title] += 1;
                }

                isProcessed[card.title] = true;
            });
            chrome.storage.local.set({
                appearedVideosTimestamp: timestamp,
                appearedVideos: videos,
                appearedIsProcessed: isProcessed
            });
        }
        if (items.appearedVideosTimestamp > items.appearedVideosExpired) {
            chrome.storage.local.remove(["appearedVideosTimestamp", "appearedVideosExpired", "appearedVideos", "appearedIsProcessed"]);
        }
    });
}

export function addBlockVideoList(title) {
    chrome.storage.local.get({blockVideoList: null}, function (items) {
        if (!items.blockVideoList) {
            chrome.storage.local.set({
                blockVideoList: title,
                countBlockedVideos: null
            });
        } else {
            const list = items.blockVideoList.split('\n').filter(k => k.trim() !== '');

            if (!list.some(vkl => vkl == title)) {
                chrome.storage.local.set({
                    blockVideoList: `${items.blockVideoList}\n${title}`,
                    countBlockedVideos: null
                });
            }
        }
    });
}

export function addBlockChannelList(title) {
    chrome.storage.local.get({blockChannelList: null}, function (items) {
        if (!items.blockChannelList) {
            chrome.storage.local.set({
                blockChannelList: title,
                countBlockedVideos: null
            });
        } else {
            const list = items.blockChannelList.split('\n').filter(k => k.trim() !== '');

            if (!list.some(ckl => ckl == title)) {
                chrome.storage.local.set({
                    blockChannelList: `${items.blockChannelList}\n${title}`,
                    countBlockedVideos: null
                });
            }
        }
    });
}

function fetchFromStorage(keys, callback) {
    chrome.storage.local.get(keys, function (items) {
        if (typeof callback === 'function') {
            callback(items);
        }
    });
}
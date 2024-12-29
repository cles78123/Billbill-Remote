import {IndexVideoList} from '../../utils/IndexVideoList.ts';
import {
    getCountBlockedVideos,
    getPopupSwitchAndBlockList,
    saveWatchedVideo
} from '../../modules/storage.ts';
import {checkShouldBlock, loadVideoBlockConditions} from "../../modules/conditions.ts";

const videoList = new IndexVideoList();
let intervalId = null;

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.message === "activateBlock" && !intervalId) {
        intervalId = setInterval(function () {
            getCountBlockedVideos((items) => {
                if (checkShouldBlock(videoList.getVideos().length, items.countBlockedVideos)) {
                    getPopupSwitchAndBlockList((storage) => {
                        videoList.processVideos(loadVideoBlockConditions(videoList, storage), request.timestamp);
                    });
                }
            });
        }, 1000);
    }

    if (request.message === "saveVideoTitle") {
        setTimeout(function () {
            saveWatchedVideo();
        }, 1000);

        if (intervalId) {
            clearInterval(intervalId);
            intervalId = null;
        }
    }
});

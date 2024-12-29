import {ref} from "vue";

export let blockList = {
    blockVideoList:ref(null),
    blockVideoKeywordList: ref(null),
    blockViewCountList: ref(null),
    blockChannelList: ref(null),
    blockChannelKeywordList: ref(null),
    blockWatchedVideosList: ref(null)
};

export function initializeBlockList(items) {
    blockList.blockVideoList.value = items.blockVideoList;
    blockList.blockVideoKeywordList.value = items.blockVideoKeywordList;
    blockList.blockViewCountList.value = items.blockViewCountList;
    blockList.blockChannelList.value = items.blockChannelList;
    blockList.blockChannelKeywordList.value = items.blockChannelKeywordList;
    blockList.blockWatchedVideosList.value = items.blockWatchedVideosList;
}
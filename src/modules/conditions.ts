export function isPage(url) {
    return url === 'https://www.bilibili.com/';
}

export function isWatchPage(url) {
    return url.includes('https://www.bilibili.com/video/');
}

export function checkShouldBlock(countVideosOnPage, countBlockedVideos) {
    return countVideosOnPage != countBlockedVideos;
}

export function loadVideoBlockConditions(videoList, storage) {
    let conditions = [];

    if (storage.limitOccurrencesInChannel) {
        conditions.limitOccurrencesInChannel = storage.limitOccurrencesInChannelSelected;
    }

    if (storage.blockChannelKeyword && storage.blockChannelKeywordList) {
        conditions.push((video) => videoList.checkByChannelKeyword(video, splitKeywords(storage.blockChannelKeywordList)));
    }
    if (storage.triggerOnExceedCount) {
        conditions.push((video) => videoList.triggerOnExceedCount(video, storage.triggerOnExceedCountSelected, storage.appearedVideos));
    }
    if (storage.blockChannel && storage.blockChannelList) {
        conditions.push((video) => videoList.checkByChannelName(video, splitKeywords(storage.blockChannelList, true)));
    }
    if (storage.blockWatchedVideos && storage.blockWatchedVideosList) {
        conditions.push((video) => videoList.checkByWatched(video, splitKeywords(storage.blockWatchedVideosList, true)));
    }
    if (storage.blockVideo && storage.blockVideoList) {
        conditions.push((video) => videoList.checkByVideosName(video, splitKeywords(storage.blockVideoList, true)));
    }

    if (storage.blockViewCount && storage.blockViewCountList) {
        conditions.push((video) => videoList.checkByViewCount(video, splitKeywords(storage.blockViewCountList)));
    }
    if (storage.blockVideoKeyword && storage.blockVideoKeywordList) {
        conditions.push((video) => videoList.checkByKeyword(video, splitKeywords(storage.blockVideoKeywordList)));
    }


    return conditions;
}

function splitKeywords<T>(target: T, useSet: boolean = false): T[] | Set<T> {
    const keywords = target.split('\n').filter(vc => vc.trim() !== '');

    if (useSet) {
        return new Set(keywords);
    } else {
        return keywords;
    }
}
export function initLocalization() {
    return {
        extensionName: chrome.i18n.getMessage('extensionName'),
        blockVideo: chrome.i18n.getMessage('blockVideo'),
        blockVideoNote: chrome.i18n.getMessage('blockVideoNote'),
        blockVideoKeyword: chrome.i18n.getMessage('blockVideoKeyword'),
        blockVideoKeywordNote: chrome.i18n.getMessage('blockVideoKeywordNote'),
        blockViewCount: chrome.i18n.getMessage('blockViewCount'),
        blockViewCountNote: chrome.i18n.getMessage('blockViewCountNote'),
        blockChannelKeyword: chrome.i18n.getMessage('blockChannelKeyword'),
        blockChannelKeywordNote: chrome.i18n.getMessage('blockChannelKeywordNote'),
        blockChannel: chrome.i18n.getMessage('blockChannel'),
        blockChannelNote: chrome.i18n.getMessage('blockChannelNote'),
        blockWatchedVideos: chrome.i18n.getMessage('blockWatchedVideos'),
        limitOccurrencesInChannel: chrome.i18n.getMessage('limitOccurrencesInChannel'),
        limitOccurrencesInChannelNote: chrome.i18n.getMessage('limitOccurrencesInChannelNote'),
        triggerOnExceedCount: chrome.i18n.getMessage('triggerOnExceedCount'),
        triggerOnExceedCountNote: chrome.i18n.getMessage('triggerOnExceedCountNote'),
        optionsNote: chrome.i18n.getMessage('optionsNote'),
        textareaNote: chrome.i18n.getMessage('textareaNote'),
        cancel: chrome.i18n.getMessage('cancel'),
        confirm: chrome.i18n.getMessage('confirm'),
        count: chrome.i18n.getMessage('count')
    };
}
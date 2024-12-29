import {showCustomPopup} from "../pages/modal/main.ts";
import {saveAppearedVideos} from "../modules/storage.ts";

export class IndexVideoList {
    getVideos() {
        return document.querySelectorAll(".bili-video-card.is-rcmd.enable-no-interest");
    }

    checkByVideosName(video, videosName) {
        if (!video.title) return false;
        return videosName.has(video.title);
    }

    checkByKeyword(video, keyword) {
        if (!video.title) return false;
        return keyword.some(k => video.title.includes(k));
    }

    checkByViewCount(video, viewCounts) {
        if (!video.viewCount) return false;
        return viewCounts.some(vc => video.viewCount < parseInt(vc, 10));
    }

    checkByChannelName(video, channelNames) {
        if (!video.channelName) return false;
        return channelNames.has(video.channelName);
    }

    checkByChannelKeyword(video, channelNames) {
        if (!video.channelName) return false;
        return channelNames.some(cn => video.channelName.includes(cn));
    }

    checkByWatched(video, WatchedVideos) {
        if (!video.title) return false;
        return WatchedVideos.has(video.title);
    }

    checkLimitOccurrencesInChannel(cards, limitOccurrencesInChannel) {
        const groupedByChannel = cards.reduce((acc, card) => {
            if (!acc[card.channelName]) {
                acc[card.channelName] = [];
            }
            acc[card.channelName].push(card);
            return acc;
        }, {});

        let totalBlocked = 0;
        const titlesToRemove = new Set();

        Object.values(groupedByChannel).forEach(cardsGroup => {
            if (cardsGroup.length > limitOccurrencesInChannel) {
                const videosToRemove = cardsGroup.slice(limitOccurrencesInChannel);
                videosToRemove.forEach(video => {
                    this.removeElement(video.item);
                    titlesToRemove.add(video.title); // 将需要删除的视频标题添加到集合中
                });
                totalBlocked += videosToRemove.length;
            }
        });

        return [totalBlocked, cards.filter(card => !titlesToRemove.has(card.title))];
    }

    triggerOnExceedCount(video, exceedCount, appearedVideos) {
        if (!video.title||!appearedVideos) return false;
        const target = appearedVideos[video.title];
        return target && target > exceedCount;
    }

    removeElement(element) {
        if (element.parentNode.classList.contains("feed-card")) {
            element.parentNode.remove();
        } else {
            element.remove();
        }
    }

    processVideos(conditions, timestamp) {
        const videos = this.getVideos();

        let number = videos.length;
        let cards = [];
        let limitOccurrencesInChannel;

        if (conditions.limitOccurrencesInChannel) {
            limitOccurrencesInChannel = conditions.limitOccurrencesInChannel;
            delete conditions.limitOccurrencesInChannel;
        }

        videos.forEach((item) => {
            const videoTitleElement = item.querySelector('.bili-video-card__info--tit');
            const videoTitle = videoTitleElement.textContent;

            if (!videoTitle) {
                return;
            }

            const channelName = item.querySelector('.bili-video-card__info--author').textContent;
            const viewCount = item.querySelector('.bili-video-card__stats--text').textContent;

            const card = {
                item: item,
                title: videoTitle,
                viewCount: viewCount,
                channelName: channelName
            };

            let shouldRemove = conditions.some(condition => condition(card));

            if (shouldRemove) {
                this.removeElement(item);
                number--;
                return;
            }

            cards.push(card);
            this.injectButton(videoTitleElement, videoTitle, channelName);
        });

        if (limitOccurrencesInChannel) {
            let blockedNumber;

            [blockedNumber, cards] = this.checkLimitOccurrencesInChannel(cards, limitOccurrencesInChannel);
            number = number - blockedNumber;
        }

        saveAppearedVideos(cards, timestamp);
        chrome.storage.local.set({'countBlockedVideos': number.toString()});
    }


    injectButton(target, videoTitle, channelName) {
        if (!target) return;

        const existingButton = target.nextElementSibling;

        if (existingButton && existingButton.tagName === 'BUTTON' && existingButton.textContent === 'X') {
            return;
        }

        const button = document.createElement('button');
        button.textContent = 'X';
        button.style.border = '2px solid red';

        target.after(button);

        button.addEventListener('click', () => {
            showCustomPopup(videoTitle, channelName);
        });
    }
}
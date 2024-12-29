import { createApp } from 'vue';
import './style.css'
import App from './App.vue'; // 确保路径正确

export function showCustomPopup(videoTitle, channelName) {
    const vm = createApp(App, { videoTitle, channelName }).mount(document.createElement('div'));
    document.body.appendChild(vm.$el);
    return vm;
}
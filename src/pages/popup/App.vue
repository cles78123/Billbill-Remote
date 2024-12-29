<script setup lang="ts">
import {initLocalization} from '../../composables/localization.ts';
import {getPopupSwitch, saveSelectChange, saveSwitchChange} from '../../modules/storage.ts';
import {initializeSwitchStates, switchStates} from './composables/popup.ts';
import {onMounted} from "vue";

const localization = initLocalization();

onMounted(() => {
  getPopupSwitch(initializeSwitchStates);
});
</script>

<template>
  <div class="title">
    <label>
      {{ localization.extensionName }}
      <a href="../options/index.html" target="_blank" class="settings-icon">
        <i class="fa-solid fa-gear"></i>
      </a>
    </label>
  </div>
  <div class="switch-container">
    <div class="switch-item">
      <label class="switch">
        <input type="checkbox" v-model="switchStates.blockVideo.value" @change="saveSwitchChange('blockVideo')">
        <span class="slider round"></span>
      </label>
      <div class="switch-label">
        <span>{{ localization.blockVideo }}</span>
        <i class="fa-solid fa-circle-question" v-bind:title="localization.blockVideoNote"></i>
      </div>
    </div>
    <div class="switch-item">
      <label class="switch">
        <input type="checkbox" v-model="switchStates.blockVideoKeyword.value" @change="saveSwitchChange('blockVideoKeyword')">
        <span class="slider round"></span>
      </label>
      <div class="switch-label">
        <span>{{ localization.blockVideoKeyword }}</span>
        <i class="fa-solid fa-circle-question" v-bind:title="localization.blockVideoKeywordNote"></i>
      </div>
    </div>
    <div class="switch-item">
      <label class="switch">
        <input type="checkbox" v-model="switchStates.blockViewCount.value" @change="saveSwitchChange('blockViewCount')">
        <span class="slider round"></span>
      </label>
      <div class="switch-label">
        <span>{{ localization.blockViewCount }}</span>
        <i class="fa-solid fa-circle-question" v-bind:title="localization.blockViewCountNote"></i>
      </div>
    </div>
    <div class="switch-item">
      <label class="switch">
        <input type="checkbox" v-model="switchStates.blockChannel.value" @change="saveSwitchChange('blockChannel')">
        <span class="slider round"></span>
      </label>
      <div class="switch-label">
        <span>{{ localization.blockChannel }}</span>
        <i class="fa-solid fa-circle-question" v-bind:title="localization.blockChannelNote"></i>
      </div>
    </div>
    <div class="switch-item">
      <label class="switch">
        <input type="checkbox" v-model="switchStates.blockChannelKeyword.value" @change="saveSwitchChange('blockChannelKeyword')">
        <span class="slider round"></span>
      </label>
      <div class="switch-label">
        <span>{{ localization.blockChannelKeyword }}</span>
        <i class="fa-solid fa-circle-question" v-bind:title="localization.blockChannelKeywordNote"></i>
      </div>
    </div>
    <div class="switch-item">
      <label class="switch">
        <input type="checkbox" v-model="switchStates.blockWatchedVideos.value" @change="saveSwitchChange('blockWatchedVideos')">
        <span class="slider round"></span>
      </label>
      <div class="switch-label">
        <span>{{ localization.blockWatchedVideos }}</span>
      </div>
    </div>
    <div class="switch-item">
      <label class="switch">
        <input type="checkbox" v-model="switchStates.limitOccurrencesInChannel.value" @change="saveSwitchChange('limitOccurrencesInChannel')">
        <span class="slider round"></span>
      </label>
      <div class="switch-label">
        <span>{{ localization.limitOccurrencesInChannel }}</span>
        <select v-model="switchStates.limitOccurrencesInChannelSelected.value" @change="saveSelectChange('limitOccurrencesInChannelSelected', switchStates.limitOccurrencesInChannel.value)">
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
        </select>
        <span>{{ localization.count }}</span>
        <i class="fa-solid fa-circle-question" v-bind:title="localization.limitOccurrencesInChannelNote"></i>
      </div>
    </div>
    <div class="switch-item">
      <label class="switch">
        <input type="checkbox" v-model="switchStates.triggerOnExceedCount.value" @change="saveSwitchChange('triggerOnExceedCount')">
        <span class="slider round"></span>
      </label>
      <div class="switch-label">
        <span>{{ localization.triggerOnExceedCount }}</span>
        <select v-model="switchStates.triggerOnExceedCountSelected.value" @change="saveSelectChange('triggerOnExceedCountSelected', switchStates.triggerOnExceedCount.value)">
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
        </select>
        <span>{{ localization.count }}</span>
        <i class="fa-solid fa-circle-question" v-bind:title="localization.triggerOnExceedCountNote"></i>
      </div>
    </div>
  </div>
</template>
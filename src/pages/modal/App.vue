<script setup lang="ts">
import {ref} from 'vue';
import {initLocalization} from "../../composables/localization.js";
import {
  addBlockChannelKeywordList,
  addBlockChannelList,
  addBlockVideoKeywordList,
  addBlockVideoList
} from "../../modules/storage.ts";

const localization = initLocalization();

const props = defineProps<{
  videoTitle: string;
  channelName: string;
}>();

const popupContainer = ref<HTMLElement | null>(null);
const blockVideoCheckbox = ref<HTMLInputElement | null>(null);
const blockChannelCheckbox = ref<HTMLInputElement | null>(null);

function confirmAction() {
  const blockVideoStatus = blockVideoCheckbox.value?.checked;
  const blockChannelStatus = blockChannelCheckbox.value?.checked;

  if (blockVideoStatus) {
    addBlockVideoList(props.videoTitle);
  }
  if (blockChannelStatus) {
    addBlockChannelList(props.channelName);
  }

  if (popupContainer.value) {
    popupContainer.value.remove();
  }
}

function cancelAction() {
  if (popupContainer.value) {
    popupContainer.value.remove();
  }
}
</script>

<template>
  <div class="popup-container" ref="popupContainer">
    <div class="modal-overlay">
      <div class="modal">
        <div class="modal-content">
          <div class="switch-item">
            <label class="switch">
              <input type="checkbox" ref="blockVideoCheckbox"/>
              <span class="slider round"></span>
            </label>
            <label class="switch-label">
              {{ localization.blockVideo }}
            </label>
          </div>
          <div class="switch-item">
            <label class="switch">
              <input type="checkbox" ref="blockChannelCheckbox"/>
              <span class="slider round"></span>
            </label>
            <label class="switch-label">
              {{ localization.blockChannel }}
            </label>
          </div>
        </div>
        <div class="modal-footer">
          <button class="modal-button cancel" @click="cancelAction">{{ localization.cancel }}</button>
          <button class="modal-button confirm" @click="confirmAction">{{ localization.confirm }}</button>
        </div>
      </div>
    </div>
  </div>
</template>
<template>
  <div class="input-group">
    <input
      v-model="videoId"
      type="text"
      class="form-control"
      placeholder="ID видео"
      aria-label="ID видео"
      aria-describedby="button"
      :disabled="isLoading"
    >
    <button
      class="btn btn-primary"
      type="button"
      id="button"
      :disabled="isBtnDisabled || isLoading"
      @click="createVideoItem"
    >
      Сохранить видео
    </button>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, watch } from 'vue';
import { useVideoStore } from '../store/modules/video';

export default defineComponent({
  name: 'Form',

  setup() {
    const videoId = ref('');
    const isBtnDisabled = ref(true);
    const videoStore = useVideoStore();
    const isLoading = computed(() => videoStore.isLoading);

    const createVideoItem = () => videoStore.handleVideoData(videoId.value);
    const setBtnDisabled = (value: string) => {
      isBtnDisabled.value = videoStore.isVideoDataExist(value) || !(value.length === 32);
    };

    watch(
      () => videoId.value,
      (value) => {
        setBtnDisabled(value);
      },
      { deep: false }
    );

    watch(
      () => isLoading.value,
      () => {
        videoId.value = '';
      },
      { deep: false }
    );

    return {
      videoId,
      isLoading,
      isBtnDisabled,
      createVideoItem
    };
  }
});
</script>

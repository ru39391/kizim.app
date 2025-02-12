<template>
  <CardsWrapper />
</template>

<script lang="ts">
import { onBeforeMount, defineComponent } from 'vue';
import { useVideoStore } from './store/modules/video';
import CardsWrapper from './components/CardsWrapper.vue';

export default defineComponent({
  name: 'App',

  components: {
    CardsWrapper
  },

  setup() {
    const videoStore = useVideoStore();

    onBeforeMount(() => {
      videoStore.fetchVideoList();
    });

    return {
    }
  }
});
</script>

<template>
  <Layout>
    <template #content>
      <div class="row align-items-center mb-4">
        <div class="col-md-4"><Form /></div>
        <div class="col-md-4 text-nowrap text-body-secondary">{{ alertMessage }}</div>
      </div>
      <div
        v-if="videoList.length > 0"
        class="row"
      >
        <Card
          v-for="item in videoList"
          :key="item.id"
          :item_id="item.item_id"
          :title="item.title"
          :thumbnail="item.thumbnail"
          :createdon="item.createdon"
          :channel="item.channel"
          :channel_id="item.channel_id.toString()"
          :channel_img="item.channel_img"
        />
      </div>
    </template>
  </Layout>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import { useVideoStore } from '../store/modules/video';
import Card from './Card.vue';
import Form from './Form.vue';
import Layout from './Layout.vue';

export default defineComponent({
  name: 'CardsWrapper',

  components: {
    Card,
    Form,
    Layout
  },

  setup() {
    const videoStore = useVideoStore();
    const videoList = computed(() => videoStore.videoList);
    const alertMessage = computed(() => videoStore.alertMessage);

    const handleVideo = () => {
      console.log('97de0bdec143450d09e257df4721ca66');
    };

    return {
      videoList,
      alertMessage
    }
  }
});
</script>

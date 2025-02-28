<template>
  <div class="col-md-6 mb-3">
    <div class="card h-100">
      <div class="row g-0 h-100">
        <div class="col-md-4">
          <a :href="`https://rutube.ru/video/${item_id}/`" target="_blank">
            <img
              :src="thumbnail"
              :alt="title"
              class="w-100 h-100 object-fit-cover rounded-start"
            />
          </a>
        </div>
        <div class="col-md-8 flex-grow-1">
          <div class="card-body d-flex flex-column h-100">
            <div class="flex-grow-1 mb-3">
              <p class="card-text mb-2">
                <small class="text-body-secondary">{{ item_id }}</small><br />
                {{ title }}
              </p>
              <p class="card-text"><small class="text-body-secondary">{{ createdon }}</small></p>
              <button
                class="btn btn-link card-text p-0"
                type="button"
                :disabled="isLoading"
                @click="checkVideoUpdate"
              >
                <small class="text-body-secondary">Обновить</small>
              </button>
            </div>
            <div class="d-flex align-items-center">
              <div class="col-md-2 me-3"><img class="img-fluid rounded-circle" :src="channel_img" :alt="channel" /></div>
              <p class="card-text col-md-10"><a :href="`https://rutube.ru/channel/${channel_id}/`" target="_blank">{{ channel }}</a></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import { useVideoStore } from '../store/modules/video';

export default defineComponent({
  name: 'Card',

  props: {
    id: {
      type: Number,
      required: true,
    },
    item_id: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: false,
    },
    thumbnail: {
      type: String,
      required: false,
    },
    createdon: {
      type: String,
      required: false,
    },
    channel: {
      type: String,
      required: false,
    },
    channel_id: {
      type: String,
      required: false,
    },
    channel_img: {
      type: String,
      required: false,
    },
  },

  setup(props) {
    const videoStore = useVideoStore();
    const isLoading = computed(() => videoStore.isLoading);

    const checkVideoUpdate = () => videoStore.checkVideoUpdate(props.item_id);

    return {
      isLoading,
      checkVideoUpdate
    };
  }
});
</script>

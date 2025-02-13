<template>
  <div class="d-flex justify-content-end">
    <nav class="d-flex flex-column fixed-top fixed-bottom col-2 text-white bg-dark">
      <div class="p-3 pb-0">
        <a class="fs-4 text-white text-decoration-none" href="/manager">К управлению сайтом</a>
        <hr />
      </div>
      <div class="position-relative flex-grow-1">
        <slot name="navbar"></slot>
      </div>
    </nav>

    <div class="col-10 p-5">
      <slot name="content"></slot>
    </div>
  </div>
  <Modal />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Modal from './Modal.vue';

export default defineComponent({
  name: 'Layout',

  components: {
    Modal
  },
});
</script>

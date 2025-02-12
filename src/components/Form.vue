<template>
  <div class="input-group mb-3">
    <input type="text" class="form-control" placeholder="ID видео" aria-label="ID видео" aria-describedby="button-addon2">
    <button class="btn btn-primary" type="button" id="button-addon2">Сохранить видео</button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Form',
});
</script>

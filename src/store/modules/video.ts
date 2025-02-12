import { defineStore } from 'pinia';
import { ref } from 'vue';
import {
  RUTUBE_API_URL,
  VIDEOLIST_API_URL,
  DATA_IS_LOADING_MESS,
  POSTS_ERROR_MESS
} from '../../utils/constants';

import type { TVideoData } from '../../utils/types';

const useVideoStore = defineStore('video', () => {
  const isLoading = ref<boolean>(true);
  const alertMessage = ref<string>(DATA_IS_LOADING_MESS);
  const videoList = ref<TVideoData[]>([]);

  const setLoading = (value: boolean) => {
    isLoading.value = value;
  };

  const setAlertMessage = (value: string) => {
    alertMessage.value = value;
  };

  const setVideoList = (arr: TVideoData[]) => {
    videoList.value = [...videoList.value, ...arr];
  };

  const fetchVideoList = async () => {
    setLoading(true);

    try {
      const response = await fetch(VIDEOLIST_API_URL);

      if(!response.ok) {
        setAlertMessage(POSTS_ERROR_MESS);
        return;
      }

      const { data } = await response.json();

      setVideoList(data);
    } catch (error) {
      setAlertMessage(POSTS_ERROR_MESS);
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return {
    isLoading,
    alertMessage,
    videoList,
    setLoading,
    fetchVideoList
  };
});

export { useVideoStore };

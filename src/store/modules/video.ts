import { defineStore } from 'pinia';
import { ref } from 'vue';
import {
  RUTUBE_API_URL,
  VIDEOLIST_API_URL,
  DATA_IS_LOADING_MESS,
  POSTS_ERROR_MESS,
  POSTS_WARNING_MESS
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

      const { data, success } = await response.json();

      if([...videoList.value].length === 0 && success) {
        setVideoList(data);
      }
    } catch (error) {
      setAlertMessage(POSTS_ERROR_MESS);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const createVideoItem = async (payload: TVideoData) => {
    setLoading(true);

    try {
      const response = await fetch(
        VIDEOLIST_API_URL,
        {
          method: 'POST',
          body: JSON.stringify([payload])
        }
      );

      if(!response.ok) {
        setAlertMessage(POSTS_ERROR_MESS);
        return;
      }

      const { data, success } = await response.json();

      if(success) {
        setVideoList(data.succeed);
      } else {
        setAlertMessage(POSTS_WARNING_MESS);
      }
    } catch (error) {
      setAlertMessage(POSTS_ERROR_MESS);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleVideoData = async (id: string) => {
    setLoading(true);

    try {
      const response = await fetch(`${RUTUBE_API_URL}/${id}`);

      if(!response.ok) {
        setAlertMessage(POSTS_ERROR_MESS);
        return;
      }

      const { data, success } = await response.json();

      if(success) {
        await createVideoItem(data);
      }
    } catch (error) {
      setAlertMessage(POSTS_ERROR_MESS);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return {
    isLoading,
    alertMessage,
    videoList,
    setLoading,
    fetchVideoList,
    handleVideoData
  };
});

export { useVideoStore };

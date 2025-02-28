import { defineStore } from 'pinia';
import { ref } from 'vue';
import {
  CREATEDON_KEY,
  RUTUBE_API_URL,
  VIDEOLIST_API_URL,
  DATA_IS_LOADING_MESS,
  LENGTH_ERROR_MESS,
  POSTS_ERROR_MESS,
  POSTS_WARNING_MESS,
  VIDEO_WARNING_MESS
} from '../../utils/constants';

import type { TVideoData } from '../../utils/types';

const useVideoStore = defineStore('video', () => {
  const isLoading = ref<boolean>(true);
  const alertMessage = ref<string>(DATA_IS_LOADING_MESS);
  const videoList = ref<TVideoData[]>([]);

  const setLoading = (value: boolean) => {
    isLoading.value = value;
  };

  const setAlertMessage = (value: string = '') => {
    alertMessage.value = value;
  };

  const setVideoList = (arr: TVideoData[]) => {
    videoList.value = [ ...arr, ...videoList.value];
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
        setVideoList(data.reverse());
        setAlertMessage();
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
        setAlertMessage();
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

  const updateVideoItem = async (payload: TVideoData[]) => {
    setLoading(true);

    try {
      const response = await fetch(
        VIDEOLIST_API_URL,
        {
          method: 'PATCH',
          body: JSON.stringify(payload)
        }
      );

      if(!response.ok) {
        setAlertMessage(POSTS_ERROR_MESS);
        return;
      }

      const { data, success } = await response.json();

      if(success) {
        setVideoList(data.succeed);
        setAlertMessage();
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
        setAlertMessage();
      }
    } catch (error) {
      setAlertMessage(POSTS_ERROR_MESS);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const isVideoDataExist = (id: string, isMessVisible: boolean = true) => {
    const data = [...videoList.value].find(({ item_id }) => item_id === id);
    const isDataExist = Boolean(data);
    const warningMess = id.length === 32
      ? isDataExist ? VIDEO_WARNING_MESS : ''
      : LENGTH_ERROR_MESS;

    if(isMessVisible) {
      setAlertMessage(id.length === 0 ? '' : warningMess);
    }

    return {
      data,
      isDataExist
    };
  }

  const checkVideoUpdate = async (item_id: string) => {
    const { data: currData } = isVideoDataExist(item_id, false);

    setLoading(true);

    if(!currData) {
      handleVideoData(item_id);
      return;
    }

    try {
      const response = await fetch(`${RUTUBE_API_URL}/${item_id}`);

      if(!response.ok) {
        setAlertMessage(POSTS_ERROR_MESS);
        return;
      }

      const { data, success } = await response.json();

      if(!success) {
        setAlertMessage(POSTS_ERROR_MESS);
        return;
      }

      const updatedData = Object.keys(data).reduce(
        (acc, key, index) => Object.values(data)[index] === currData[key] ? acc : {...acc, [key]: Object.values(data)[index]}, {}
      );
      const isDataUpdated = Object.keys(updatedData).length === 1 && Boolean(updatedData[CREATEDON_KEY]);

      if(isDataUpdated) {
        setAlertMessage('Ничего не изменилось');
      } else {
        await updateVideoItem([{
          ...currData,
          ...updatedData
        }]);
        setAlertMessage();
      }
    } catch (error) {
      setAlertMessage(POSTS_ERROR_MESS);
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  return {
    isLoading,
    alertMessage,
    videoList,
    setLoading,
    fetchVideoList,
    handleVideoData,
    isVideoDataExist,
    checkVideoUpdate
  };
});

export { useVideoStore };

import { setBaseUrl } from './';

const CREATEDON_KEY = 'createdon';
const DATA_IS_LOADING_MESS = 'Данные загружаются';
const LENGTH_ERROR_MESS = 'Неверная длина идентификатора';
const POSTS_ERROR_MESS = 'При обработке данных произошла ошибка, повторите попытку позже';
const POSTS_WARNING_MESS = 'Не удалось сохранить ресурс - возможно, он уже существует';
const VIDEO_WARNING_MESS = 'Видео уже существует';
const SITE_URL = setBaseUrl() || import.meta.env.VITE_SITE_URL;
const API_URL = import.meta.env.VITE_API_URL;
const RUTUBE_API_URL = `${SITE_URL}${API_URL}/rutube`
const VIDEOLIST_API_URL = `${SITE_URL}${API_URL}/videolist`

export {
  CREATEDON_KEY,
  SITE_URL,
  API_URL,
  RUTUBE_API_URL,
  VIDEOLIST_API_URL,
  LENGTH_ERROR_MESS,
  DATA_IS_LOADING_MESS,
  POSTS_ERROR_MESS,
  POSTS_WARNING_MESS,
  VIDEO_WARNING_MESS
 };

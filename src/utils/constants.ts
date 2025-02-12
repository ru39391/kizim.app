const DATA_IS_LOADING_MESS = 'Данные загружаются';
const POSTS_ERROR_MESS = 'При обработке данных произошла ошибка, повторите попытку позже';
const SITE_URL = import.meta.env.VITE_SITE_URL;
const API_URL = import.meta.env.VITE_API_URL;
const RUTUBE_API_URL = `${SITE_URL}/${API_URL}/rutube`
const VIDEOLIST_API_URL = `${SITE_URL}/${API_URL}/videolist`

export {
  SITE_URL,
  API_URL,
  RUTUBE_API_URL,
  VIDEOLIST_API_URL,
  DATA_IS_LOADING_MESS,
  POSTS_ERROR_MESS
 };

export type TVideoData = {
  item_id: string;
  title: string;
  thumbnail: string;
  createdon: string;
  channel: string;
  channel_id: number;
  channel_img: string;
};

export type TVideoDataKeys = keyof TVideoData;

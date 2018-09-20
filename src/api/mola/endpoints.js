/* eslint-disable import/prefer-default-export */
import config from '@global/config/api';
const { NODE_ENV } = process.env;

export const HOME_PLAYLIST_ENDPOINT =
  `${config[NODE_ENV].baseURL.molatv}/videos/playlists`;

export const VIDEOS_ENDPOINT =
`${config[NODE_ENV].baseURL.molatv}/videos/videos`;

export const HISTORY_ENDPOINT =
  'https://api-d.supersoccer.tv/v2/userdata/user/video/history-mola.json';
  //`${config[NODE_ENV].molatv.baseURL}/userdata/kareemlukitomo123/videos/histories`;

export const SEARCH_VIDEOS_ENDPOINT = `${config[NODE_ENV].baseURL.molatv}/videos/`;

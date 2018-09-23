/* eslint-disable import/prefer-default-export */
import config from '@global/config/api';
const { NODE_ENV } = process.env;

export const HOME_PLAYLIST_ENDPOINT =
  `${config[NODE_ENV].endpoints.molatv}/videos/playlists`;

export const VIDEOS_ENDPOINT =
`${config[NODE_ENV].endpoints.molatv}/videos/videos`;

export const HISTORY_ENDPOINT =
`${config[NODE_ENV].endpoints.molatv}/userdata`;

export const SEARCH_ENDPOINT = `${config[NODE_ENV].endpoints.molatv}/search/`;
export const SEARCH_GENRE_ENDPOINT = `${config[NODE_ENV].endpoints.molatv}/videos/playlists/genre`;

export const MOVIE_DETAIL_ENDPOINT = 'http://mola.lukitomo.com/v2/videos';

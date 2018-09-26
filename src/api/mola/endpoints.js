/* eslint-disable import/prefer-default-export */
import { api } from '@source/config';
const { config } = api;

export const HOME_PLAYLIST_ENDPOINT =
  `${config.endpoints.molatv}/videos/playlists`;

export const VIDEOS_ENDPOINT =
`${config.endpoints.molatv}/videos/videos`;

export const HISTORY_ENDPOINT =
`${config.endpoints.molatv}/userdata`;

export const SEARCH_ENDPOINT = `${config.endpoints.molatv}/search/`;
export const SEARCH_GENRE_ENDPOINT = `${config.endpoints.molatv}/videos/playlists/genre`;

export const MOVIE_DETAIL_ENDPOINT = 'http://mola.lukitomo.com/v2/videos';

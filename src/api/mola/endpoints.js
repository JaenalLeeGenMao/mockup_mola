/* eslint-disable import/prefer-default-export */
import { endpoints } from '@source/config';

export const HOME_PLAYLIST_ENDPOINT = `${endpoints.api}/videos/playlists`;

export const VIDEOS_ENDPOINT = `${endpoints.api}/videos/videos`;

export const HISTORY_ENDPOINT = `${endpoints.api}/userdata`;

export const SEARCH_ENDPOINT = 'https://private-2e8aa9-irene5.apiary-mocka.com/search'; //`${endpoints.api}/search/`;
export const SEARCH_GENRE_ENDPOINT = `${endpoints.api}/videos/playlists/genre`;
export const RECENT_SEARCH_ENDPOINT =
  'https://private-697ce-search103.apiary-mocka.com/recentsearch'; //`${SEARCH_ENDPOINT}histories`;

export const MOVIE_DETAIL_ENDPOINT = `${endpoints.api}/videos`;
export const MOVIE_STREAMING = `${endpoints.api}/videos`;

/* eslint-disable import/prefer-default-export */
import { api } from '@source/config';
const { config } = api;

export const HOME_PLAYLIST_ENDPOINT = `${config.endpoints.molatv}/videos/playlists`;

export const VIDEOS_ENDPOINT = `${config.endpoints.molatv}/videos/videos`;

export const HISTORY_ENDPOINT = `${config.endpoints.molatv}/userdata`;

export const SEARCH_ENDPOINT = 'https://private-2e8aa9-irene5.apiary-mock.com/search'; //`${config.endpoints.molatv}/search/`;
export const SEARCH_GENRE_ENDPOINT = `${config.endpoints.molatv}/videos/playlists/genre`;
export const RECENT_SEARCH_ENDPOINT =
  'https://private-697ce-search103.apiary-mock.com/recentsearch'; //`${SEARCH_ENDPOINT}histories`;
//'https://private-697ce-search103.apiary-mock.com/recentsearch'; //'http://lukitomo.com:1111/histories?project=molatv&sessionId=abc';

export const MOVIE_DETAIL_ENDPOINT = `${config.endpoints.molatv}/videos`;
export const MOVIE_STREAMING = `${config.endpoints.molatv}/videos`;

// export const MOVIE_DETAIL_ENDPOINT = 'https://private-55a17-molawebver3.apiary-mock.com/videos';
// export const MOVIE_STREAMING = 'https://private-55a17-molawebver3.apiary-mock.com/videos';

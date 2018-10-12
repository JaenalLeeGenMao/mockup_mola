/* eslint-disable import/prefer-default-export */
import { endpoints } from '@source/config';

export const HOME_PLAYLIST_ENDPOINT = `${endpoints.api}/videos/playlists`;

export const VIDEOS_ENDPOINT = `${endpoints.api}/videos/videos`;

export const HISTORY_ENDPOINT = `${endpoints.api}/userdata`;

export const SEARCH_ENDPOINT = `${endpoints.api}/search/`;
export const SEARCH_GENRE_ENDPOINT = `${endpoints.api}/videos/playlists/genre`;
export const RECENT_SEARCH_ENDPOINT = `${SEARCH_ENDPOINT}histories`;
//'https://private-697ce-search103.apiary-mock.com/recentsearch'; //'http://lukitomo.com:1111/histories?project=molatv&sessionId=abc';

export const MOVIE_DETAIL_ENDPOINT = `${endpoints.api}/videos`;
export const MOVIE_STREAMING = `${endpoints.api}/videos`;

// export const MOVIE_DETAIL_ENDPOINT = 'https://private-55a17-molawebver3.apiary-mock.com/videos';
// export const MOVIE_STREAMING = 'https://private-55a17-molawebver3.apiary-mock.com/videos';

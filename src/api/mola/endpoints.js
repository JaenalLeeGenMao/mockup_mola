/* eslint-disable import/prefer-default-export */
import config from '@global/config/api';
const { NODE_ENV } = process.env;

export const HOME_PLAYLIST_ENDPOINT =
  `${config[NODE_ENV].baseURL.molatv}/videos/playlists`;

export const VIDEOS_ENDPOINT =
`${config[NODE_ENV].baseURL.molatv}/videos/videos`;

export const HISTORY_ENDPOINT =
  'http://mola.lukitomo.com/v2/userdata/kareemlukitomo123/videos/histories';

export const SEARCH_ENDPOINT = 'http://mola.lukitomo.com/v2/search/';
export const SEARCH_GENRE_ENDPOINT = 'http://mola.lukitomo.com/v2/videos/playlists/genre';

export const MOVIE_DETAIL_ENDPOINT = 'http://mola.lukitomo.com/v2/videos';
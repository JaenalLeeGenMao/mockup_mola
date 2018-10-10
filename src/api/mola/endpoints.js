/* eslint-disable import/prefer-default-export */
import { api } from '@source/config';
const { config } = api;

// import { config as baseConfig } from 'gandalf';

// var options = {
//   development: {
//     api: {
//       timeout: 10000,
//       maxRedirects: 1
//     },
//     endpoints: {
//       api: 'http://test.example.com/v2',
//       auth: 'http://test.example.tv/accounts/_',
//       domain: 'http://test.example.tv'
//     }
//   },
//   staging: {
//     api: {
//       timeout: 10000,
//       maxRedirects: 1
//     },
//     endpoints: {
//       api: 'https://api.staging.test.example.tv/v2',
//       auth: 'http://staging.test.example.tv/accounts/_',
//       domain: 'https://staging.test.example.tv'
//     }
//   },
//   production: {
//     api: {
//       timeout: 10000,
//       maxRedirects: 1
//     },
//     endpoints: {
//       api: 'https://api.test.example.tv/v2',
//       auth: 'https://www.test.example.tv/accounts/_',
//       domain: 'https://www.test.example.tv'
//     }
//   }
// }

// baseConfig.updateConfig(options);
// const config = baseConfig.default[process.env.REACT_APP_ENV || "development"];

export const HOME_PLAYLIST_ENDPOINT = `${config.endpoints.api}/videos/playlists`;

export const VIDEOS_ENDPOINT = `${config.endpoints.api}/videos/videos`;

export const HISTORY_ENDPOINT = `${config.endpoints.api}/userdata`;

export const SEARCH_ENDPOINT = `${config.endpoints.api}/search/`;
export const SEARCH_GENRE_ENDPOINT = `${config.endpoints.api}/videos/playlists/genre`;
export const RECENT_SEARCH_ENDPOINT = `${SEARCH_ENDPOINT}histories`;
//'https://private-697ce-search103.apiary-mock.com/recentsearch'; //'http://lukitomo.com:1111/histories?project=molatv&sessionId=abc';

export const MOVIE_DETAIL_ENDPOINT = `${config.endpoints.api}/videos`;
export const MOVIE_STREAMING = `${config.endpoints.api}/videos`;

// export const MOVIE_DETAIL_ENDPOINT = 'https://private-55a17-molawebver3.apiary-mock.com/videos';
// export const MOVIE_STREAMING = 'https://private-55a17-molawebver3.apiary-mock.com/videos';

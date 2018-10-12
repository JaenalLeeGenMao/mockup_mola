/* eslint-disable camelcase */
const dotenv = require('dotenv');
dotenv.config();

const env = process.env.REACT_APP_ENV || 'staging';

// const options = {
//   development: {
//     port: 3000,
//     endpoints: {
//       clientUrl: '',
//       serverUrl: 'http://test.example.tv',
//       api: 'http://test.example.com/v2',
//       auth: 'http://test.example.tv/accounts/_',
//       domain: 'http://test.example.tv',
//       setting: {
//         timeout: 10000,
//         maxRedirects: 1
//       }
//     }
//   },
//   staging: {
//     port: 3000,
//     endpoints: {
//       clientUrl: '',
//       serverUrl: 'https://staging.test.example.tv',
//       api: 'https://api.staging.test.example.tv/v2',
//       auth: 'http://staging.test.example.tv/accounts/_',
//       domain: 'https://staging.test.example.tv',
//       setting: {
//         timeout: 10000,
//         maxRedirects: 1
//       }
//     }
//   },
//   production: {
//     port: 3000,
//     endpoints: {
//       clientUrl: '',
//       serverUrl: 'https://www.test.example.tv',
//       api: 'https://api.test.example.tv/v2',
//       auth: 'https://www.test.example.tv/accounts/_',
//       domain: 'https://www.test.example.tv',
//       setting: {
//         timeout: 10000,
//         maxRedirects: 1
//       }
//     }
//   }
// }

// const baseConfig = require('gandalf').config;
// baseConfig.updateConfig(options);
// const config = baseConfig.default[env];

const config = require('@source/global/config')[env];

module.exports = {
  // Node.js app
  ...config,
  trustProxy: process.env.TRUST_PROXY || 'loopback',
  port: process.env.PORT || 3000
};

/* eslint-disable camelcase */
const dotenv = require('dotenv');
dotenv.config();

const env = process.env.REACT_APP_ENV || 'staging';

// const options = {
//   development: {
//     setting: {
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
//     setting: {
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
//     setting: {
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

// const baseConfig = require('gandalf').config;
// baseConfig.updateConfig(options);
// const config = baseConfig.default[env];

const config = require('../src/global/config/api')[env];

module.exports = {
  // Node.js app
  port: process.env.PORT || 3000,

  // https://expressjs.com/en/guide/behind-proxies.html
  // trustProxy: process.env.TRUST_PROXY || 'loopback',

  // API Gateway
  api: {
    // API URL to be used in the client-side code
    clientUrl: process.env.API_CLIENT_URL || '',
    // API URL to be used in the server-side code
    serverUrl: config.endpoints.domain || 'http://jaenal.mola.tv',
    // serverUrl: 'http://jaenal.mola.tv',
    // `http://localhost:${process.env.PORT || 3000}`,
    ...config
  },

  // Database
  databaseUrl: process.env.DATABASE_URL || 'sqlite:database.sqlite',

  // Web analytics
  analytics: {
    // https://analytics.google.com/
    googleTrackingId: process.env.GOOGLE_TRACKING_ID // UA-XXXXX-X
  },

  // Authentication
  auth: {
    jwt: { secret: process.env.JWT_SECRET || 'React Starter Kit' },

    // https://developers.facebook.com/
    facebook: {
      id: process.env.FACEBOOK_APP_ID || '186244551745631',
      secret: process.env.FACEBOOK_APP_SECRET || 'a970ae3240ab4b9b8aae0f9f0661c6fc'
    },

    // https://cloud.google.com/console/project
    google: {
      id:
        process.env.GOOGLE_CLIENT_ID ||
        '251410730550-ahcg0ou5mgfhl8hlui1urru7jn5s12km.apps.googleusercontent.com',
      secret: process.env.GOOGLE_CLIENT_SECRET || 'Y8yR9yZAhm9jQ8FKAL8QIEcd'
    },

    // https://apps.twitter.com/
    twitter: {
      key: process.env.TWITTER_CONSUMER_KEY || 'Ie20AZvLJI2lQD5Dsgxgjauns',
      secret:
        process.env.TWITTER_CONSUMER_SECRET || 'KTZ6cxoKnEakQCeSpZlaUCJWGAlTEBJj0y2EMkUBujA7zWSvaQ'
    }
  }
};

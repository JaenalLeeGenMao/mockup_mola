// module.exports = {
//   development: {
//     setting: {
//       timeout: 10000,
//       maxRedirects: 1
//     },
//     endpoints: {
//       api: 'http://mola.lukitomo.com/v2',
//       auth: 'http://jaenal.mola.tv/accounts/_',
//       domain: 'http://jaenal.mola.tv'
//     }
//   },
//   staging: {
//     setting: {
//       timeout: 10000,
//       maxRedirects: 1
//     },
//     endpoints: {
//       api: 'https://api.staging.mola.tv/v2',
//       auth: 'https://staging.mola.tv/accounts/_',
//       domain: 'https://staging.mola.tv'
//     }
//   },
//   production: {
//     setting: {
//       timeout: 10000,
//       maxRedirects: 1
//     },
//     endpoints: {
//       api: 'https://api.supersoccer.tv/v2',
//       auth: 'https://www.mola.tv/accounts/_',
//       domain: 'https://www.mola.tv'
//     }
//   }
// };

module.exports = {
  development: {
    port: 3000,
    endpoints: {
      clientUrl: '',
      serverUrl: 'http://jaenal.mola.tv',
      api: 'http://mola.lukitomo.com/api/v2',
      auth: 'http://jaenal.mola.tv/accounts/_',
      domain: 'http://jaenal.mola.tv',
      setting: {
        timeout: 10000,
        maxRedirects: 1
      }
    }
  },
  staging: {
    port: 3000,
    endpoints: {
      clientUrl: '',
      serverUrl: 'https://staging.mola.tv',
      api: 'https://staging.mola.tv/api/v2',
      auth: 'https://staging.mola.tv/accounts/_',
      domain: 'https://staging.mola.tv',
      setting: {
        timeout: 10000,
        maxRedirects: 1
      }
    }
  },
  production: {
    port: 3000,
    endpoints: {
      clientUrl: '',
      serverUrl: 'https://mola.tv',
      api: 'https://mola.tv/api/v2',
      auth: 'https://mola.tv/accounts/_',
      domain: 'https://mola.tv',
      setting: {
        timeout: 10000,
        maxRedirects: 1
      }
    }
  }
};

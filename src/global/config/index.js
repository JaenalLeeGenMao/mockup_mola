module.exports = {
  development: {
    port: 3000,
    endpoints: {
      clientUrl: '',
      serverUrl: 'http://jaenal.mola.tv',
      api: 'http://mola.lukitomo.com/api/v2',
      auth: 'http://jaenal.mola.tv/accounts/_',
      domain: 'http://jaenal.mola.tv',
      ads: 'https://api.stag.supersoccer.tv',
      setting: {
        timeout: 10000,
        maxRedirects: 1,
      },
    },
  },
  staging: {
    port: 3000,
    endpoints: {
      clientUrl: '',
      serverUrl: 'https://stag.mola.tv',
      api: 'https://stag.mola.tv/api/v2',
      auth: 'https://stag.mola.tv/accounts/_',
      domain: 'https://stag.mola.tv',
      ads: 'https://api.stag.supersoccer.tv',
      setting: {
        timeout: 10000,
        maxRedirects: 1,
      },
    },
  },
  production: {
    port: 3000,
    endpoints: {
      clientUrl: '',
      serverUrl: 'https://mola.tv',
      api: 'https://mola.tv/api/v2',
      auth: 'https://mola.tv/accounts/_',
      domain: 'https://mola.tv',
      ads: 'https://api-beta.sent.tv',
      setting: {
        timeout: 10000,
        maxRedirects: 1,
      },
    },
  },
}

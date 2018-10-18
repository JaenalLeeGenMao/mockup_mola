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

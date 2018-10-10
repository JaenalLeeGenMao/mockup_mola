module.exports = {
  development: {
    api: {
      timeout: 10000,
      maxRedirects: 1
    },
    endpoints: {
      api: 'http://mola.lukitomo.com/v2',
      auth: 'http://jaenal.mola.tv/accounts/_',
      domain: 'http://jaenal.mola.tv'
    }
  },
  staging: {
    api: {
      timeout: 10000,
      maxRedirects: 1
    },
    endpoints: {
      molatv: 'https://api.staging.mola.tv/v2',
      auth: 'https://staging.mola.tv/accounts/_',
      domain: 'https://staging.mola.tv'
    }
  },
  production: {
    api: {
      timeout: 10000,
      maxRedirects: 1
    },
    endpoints: {
      api: 'https://api.supersoccer.tv/v2',
      auth: 'https://www.mola.tv/accounts/_',
      domain: 'https://www.mola.tv'
    }
  }
};

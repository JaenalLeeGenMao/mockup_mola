module.exports = {
  development: {
    api: {
      timeout: 10000,
      maxRedirects: 0
    },
    baseURL: {
      molatv: 'http://mola.lukitomo.com/v2/',
      auth: 'http://jaenal.mola.tv'
    }
  },
  production: {
    api: {
      timeout: 10000,
      maxRedirects: 0
    },
    baseURL: {
      molatv: 'https://api.supersoccer.tv/v2',
      auth: 'https://accounts.supersoccer.tv'
    }
  }
}

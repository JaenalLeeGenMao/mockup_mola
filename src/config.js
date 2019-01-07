/* eslint-disable camelcase */
const dotenv = require('dotenv')
dotenv.config()

const env = (process.env.REACT_APP_ENV || process.env.NODE_ENV) === 'production' ? 'production' : 'staging'

const options = {
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

const baseConfig = require('@supersoccer/gandalf').config
baseConfig.updateConfig(options)
const config = baseConfig.default[env]

// const config = require('@source/global/config')[env]

module.exports = {
  // Node.js app
  ...config,
  trustProxy: process.env.TRUST_PROXY || 'loopback',
  port: process.env.PORT || 3000,
}

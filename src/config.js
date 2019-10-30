/* eslint-disable camelcase */
const dotenv = require('dotenv')
dotenv.config()

const env = (process.env.REACT_APP_ENV || process.env.NODE_ENV) === 'production' ? 'production' : 'staging'
// const env = 'development'

const serverApi = {
  // VIDEO_API_URL: process.env.VIDEO_ENDPOINT,
  // AUTH_API_URL: process.env.AUTH_ENDPOINT,
  // SUBSCRIPTION_API_URL: process.env.SUBSCRIPTION_ENDPOINT,
  VIDEO_API_URL: 'http://videos.core.sstv.local',
  AUTH_API_URL: 'http://accounts-api.accounts.sstv.local',
  SUBSCRIPTION_API_URL: ' http://subscriptions.core.sstv.local',
  appId: 'molatv',
  xAppId: 2,
}

const uploader = {
  clientId: 'ef4723e0-b3b4-4ed9-a45f-fb1cd5a8f024',
  clientSecret: '289cf0055454348a172d1520c8c70eb9',
  ptoken: '3e0d9625b0ecc7a547ec853c76834d85',
}

const options = {
  development: {
    port: 3000,
    endpoints: {
      clientUrl: '',
      serverUrl: 'https://stag.mola.tv',
      api: 'https://stag.mola.tv/api/v2',
      apiArticles: 'https://stag.mola.tv/api/v2/articles',
      auth: '/accounts/_',
      domain: 'https://stag.mola.tv',
      uploader: 'https://up.stag.mola.tv',
      redeem: 'https://stag.mola.tv/api/v2/promos/voucher/redeem',
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
      api: 'https://stag.mola.tv/api/v2', //kalo mau push balikin lagi ke awal api: 'https://stag.mola.tv/api/v2',
      apiArticles: 'https://stag.mola.tv/api/v2/articles',
      auth: 'https://stag.mola.tv/accounts/_',
      domain: 'https://stag.mola.tv',
      uploader: 'https://up.stag.mola.tv',
      redeem: 'https://stag.mola.tv/api/v2/promos/voucher/redeem',
      ads: 'https://api.stag.supersoccer.tv',
      analytic: 'https://api.stag.supersoccer.tv',
      asset: 'https://cdn.stag.supersoccer.tv/mola/assets-global',
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
      apiArticles: 'https://mola.tv/api/v2/articles',
      auth: 'https://mola.tv/accounts/_',
      domain: 'https://mola.tv',
      uploader: 'https://up.mola.tv',
      redeem: 'https://mola.tv/api/v2/promos/voucher/redeem',
      ads: 'https://api-beta.sent.tv',
      analytic: 'https://api.sent.tv',
      asset: 'https://mola01.koicdn.com/assets-global',
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
  env,
  ...config,
  serverApi,
  trustProxy: process.env.TRUST_PROXY || 'loopback',
  port: process.env.PORT || 3000,
  uploader,
}

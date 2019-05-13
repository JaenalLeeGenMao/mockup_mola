/* eslint-disable camelcase */
const dotenv = require('dotenv')
dotenv.config()

const env = (process.env.REACT_APP_ENV || process.env.NODE_ENV) === 'production' ? 'production' : 'staging'
// const env = 'development'

const oauth = {
  endpoint: env === 'staging' ? 'https://stag.supersoccer.tv/accounts/_/oauth2/v1' : 'https://supersoccer.tv/accounts/_/oauth2/v1',
  appKey: 'wIHGzJhset',
  appSecret: 'vyxtMDxcrPcdl8BSIrUUD9Nt9URxADDWCmrSpAOMVli7gBICm59iMCe7iyyiyO9x',
  scope: [
    'https://internal.supersoccer.tv/users/users.profile.read',
    'https://internal.supersoccer.tv/subscriptions/users.read.global' /* DARI VINCENT */,
    'https://api.supersoccer.tv/subscriptions/subscriptions.read' /* DARI VINCENT */,
    'https://api.supersoccer.tv/orders/orders.create',
    'https://api.supersoccer.tv/videos/videos.read',
    'https://api.supersoccer.tv/orders/orders.read',
    'paymentmethods:read.internal',
    'payments:payment.dopay',
  ].join(' '),
}

const serverApi = {
  VIDEO_API_URL: env === 'staging' ? 'http://videos.global' : 'http://10.0.3.10', //'https://stag.mola.tv/api/v2/videos',
  AUTH_API_URL: env === 'staging' ? 'http://accounts-api.global' : 'http://10.0.6.5', //'https://stag.mola.tv/accounts',
  SUBSCRIPTION_API_URL: env === 'staging' ? 'http://subscriptions.global' : 'http://10.0.3.26', //'https://stag.mola.tv/api/v2/subscriptions',
  appId: 'molatv',
  xAppId: 2,
}

const oauthApp = {
  appKey: 'LDZJgphCc7',
  appSecret: '7NPI1ATIGGDpGrAKKfyroNNkGkMuTNhfBoew6ghy00rAjsANLvehhZi4EAbEta2D',
  scope: [
    'https://internal.supersoccer.tv/users/users.profile.read',
    'https://internal.supersoccer.tv/subscriptions/users.read.global' /* DARI VINCENT */,
    'https://api.supersoccer.tv/subscriptions/subscriptions.read' /* DARI VINCENT */,
    'https://api.supersoccer.tv/orders/orders.create',
    'https://api.supersoccer.tv/videos/videos.read',
    'https://api.supersoccer.tv/orders/orders.read',
    'paymentmethods:read.internal',
    'payments:payment.dopay',
  ].join(' '),
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
      auth: '/accounts/_',
      domain: 'https://stag.mola.tv',
      uploader: 'https://up.stag.mola.tv',
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
      auth: 'https://stag.mola.tv/accounts',
      domain: 'https://stag.mola.tv',
      uploader: 'https://up.stag.mola.tv',
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
      auth: 'https://mola.tv/accounts',
      domain: 'https://mola.tv',
      uploader: 'https://up.mola.tv',
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
  serverApi,
  trustProxy: process.env.TRUST_PROXY || 'loopback',
  port: process.env.PORT || 3000,
  oauth,
  oauthApp,
  uploader,
}

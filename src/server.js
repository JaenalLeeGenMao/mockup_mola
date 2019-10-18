/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */
import newrelic from 'newrelic'

import path from 'path'
import express from 'express'
import csurf from 'csurf'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'
import jwt from 'jsonwebtoken'
import proxy from 'express-http-proxy'
import url from 'url'
// import { graphql } from 'graphql';
import fetch from 'node-fetch'
import querystring from 'query-string'
import request from 'request'
import React from 'react'
import ReactDOM from 'react-dom/server'
import { renderStylesToString } from 'emotion-server'
import { IntlProvider } from 'react-intl'
import { isTablet } from 'react-device-detect'
import PrettyError from 'pretty-error'
import App from './components/App'
import Html from './components/Html'
import { ErrorPageWithoutStyle } from './routes/error/ErrorPage'
import errorPageStyle from './routes/error/ErrorPage.css'
// import createFetch from './createFetch';
import router from './router'
// import assets from './asset-manifest.json'; // eslint-disable-line import/no-unresolved
import chunks from './chunk-manifest.json' // eslint-disable-line import/no-unresolved
import configureStore from './store/configureStore'
import { setRuntimeVariable } from './actions/runtime'
// import { setUserVariable } from './actions/user';
import config from './config'
import Axios from 'axios'
import Crypto from 'crypto.js'
import _get from 'lodash/get'
import _isUndefined from 'lodash/isUndefined'
import _forEach from 'lodash/forEach'
import NodeCache from 'node-cache'
import utils from './api/mola/util'
// const videoCache = new NodeCache()
const molaCache = new NodeCache()

const dotenv = require('dotenv')
dotenv.config()

const oauth = {
  // endpoint: process.env.OAUTH_ENDPOINT,
  // appKey: process.env.OAUTH_APP_KEY_WEB,
  // appSecret: process.env.OAUTH_APP_SECRET_WEB,
  endpoint:
    config.env === 'staging' ? 'https://stag.mola.tv/accounts/_/oauth2/v1' : 'https://mola.tv/accounts/_/oauth2/v1',

  appKey: 'wIHGzJhset',
  appSecret: 'vyxtMDxcrPcdl8BSIrUUD9Nt9URxADDWCmrSpAOMVli7gBICm59iMCe7iyyiyO9x',
  appId: 'molatv',
  xAppId: 2,
  scope: [
    'https://internal.supersoccer.tv/users/users.profile.read',
    'https://internal.supersoccer.tv/subscriptions/users.read.global' /* DARI VINCENT */,
    'https://api.supersoccer.tv/subscriptions/subscriptions.read' /* DARI VINCENT */,
    'https://api.supersoccer.tv/orders/orders.create',
    'https://api.supersoccer.tv/videos/videos.read',
    'https://api.supersoccer.tv/orders/orders.read',
    'paymentmethods:read.internal',
    'payments:payment.dopay',
    'userdata:preference.read',
    'userdata:preference.insert',
  ].join(' '),
}

// console.log('ganteng', config)

const oauthApp = {
  // endpoint: process.env.OAUTH_ENDPOINT,
  // appKeyMobile: process.env.OAUTH_APP_KEY_MOBILE,
  // appSecretMobile: process.env.OAUTH_APP_SECRET_MOBILE,

  appKeyMobile: 'LDZJgphCc7',
  appSecretMobile: '7NPI1ATIGGDpGrAKKfyroNNkGkMuTNhfBoew6ghy00rAjsANLvehhZi4EAbEta2D',
  appId: 'molatv',
  xAppId: 2,
  scope: [
    'https://internal.supersoccer.tv/users/users.profile.read',
    'https://internal.supersoccer.tv/subscriptions/users.read.global' /* DARI VINCENT */,
    'https://api.supersoccer.tv/subscriptions/subscriptions.read' /* DARI VINCENT */,
    'https://api.supersoccer.tv/orders/orders.create',
    'https://api.supersoccer.tv/videos/videos.read',
    'https://api.supersoccer.tv/orders/orders.read',
    'paymentmethods:read.internal',
    'payments:payment.dopay',
    'userdata:preference.read',
    'userdata:preference.insert',
  ].join(' '),
}

process.on('unhandledRejection', (reason, p) => {
  console.error('Unhandled Rejection at:', p, 'reason:', reason)
  // send entire app down. Process manager will restart it
  process.exit(1)
})

//
// Tell any CSS tooling (such as Material UI) to use all vendor prefixes if the
// user agent is not known.
// -----------------------------------------------------------------------------
global.navigator = global.navigator || {}
global.navigator.userAgent = global.navigator.userAgent || 'all'

const app = express()

//
// If you are using proxy from external machine, you can set TRUST_PROXY env
// Default is to trust proxy headers only from loopback interface.
// -----------------------------------------------------------------------------
app.set('trust proxy', config.trustProxy)
app.get('/ping', (req, res) => {
  res.status(200)
  res.send('PONG')
})

// app.use(
//   '/api',
//   proxy(`${config.endpoints.domain}/api/`, {
//     proxyReqPathResolver: (req, res) => {
//       return '/api' + (url.parse(req.url).path === '/' ? '' : url.parse(req.url).path)
//     },
//   })
// )

// app.use(
//   '/accounts/_',
//   proxy(`${config.endpoints.domain}/accounts/_/`, {
//     proxyReqPathResolver: (req, res) => {
//       return '/accounts/_' + (url.parse(req.url).path === '/' ? '' : url.parse(req.url).path)
//     },
//   })
// )

//
// Register Node.js middleware
// -----------------------------------------------------------------------------
app.use(express.static(path.resolve(__dirname, 'public')))
app.use(cookieParser())
app.use(
  csurf({
    cookie: {
      path: '/accounts',
      httpOnly: true,
      secure: !__DEV__,
    },
  })
)

app.get('/page-redirect', (req, res) => {
  res.status(200)
  res.sendFile(path.join(__dirname, 'public/page-redirect.html'))
})

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
const {
  serverApi: { VIDEO_API_URL, AUTH_API_URL, SUBSCRIPTION_API_URL, appId, xAppId },
  endpoints: { domain },
} = config

const { appKey, appSecret, endpoint: oauthEndpoint } = oauth

const { appKeyMobile, appSecretMobile } = oauthApp

// let count = 0
// var inboxInterval;
// set a cookie
const OAUTH_USER_INFO_URL = `${AUTH_API_URL}/v1/profile`
const OAUTH_LOGOUT_URL = `${oauthEndpoint}/logout?app_key=${appKey}&redirect_uri=${encodeURIComponent(domain)}`
let userinfo = ''

/*
app.get('/sign-location', async (req, res) => {
  const locationUrl = `${config.endpoints.ads}/v1/ads/sentadv-ads-manager/api/v1/sign-location?app_id=mola_ads`
  const lat = req.query.lat
  const long = req.query.long

  if (typeof lat !== 'undefined' && typeof long !== 'undefined' && lat !== '' && long !== '') {
    const body = {
      lat: parseFloat(lat),
      long: parseFloat(long),
    }

    Axios.post(locationUrl, body)
      .then(response => {
        if (response.status === 200) {
          res.send(response.data)
        } else {
          res.send({
            status: response.status,
            statusText: response.statusText,
            data: {
              loc: '',
            },
          })
        }
      })
      .catch(err => {
        const response = err.response

        res.send({
          status: response.status,
          statusText: response.statusText,
          data: {
            loc: '',
          },
        })
      })
  }
})
*/
const extendToken = async token => {
  try {
    const rawResponse = await fetch(`${AUTH_API_URL}/v1/token/extend`, {
      method: 'POST',
      timeout: 5000,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'x-app-id': xAppId,
        'User-Agent': 'request',
      },
      body: JSON.stringify({
        app_key: appKey,
        app_secret: appSecret,
        access_token: token,
        expires_in: 3 * 86400,
      }),
    })
    const content = await rawResponse.json()
    return content
  } catch (err) {
    console.error('error extend token:', err)
    return { error: err }
  }
}

const requestGuestToken = async res => {
  // console.log(`${AUTH_API_URL}/v1/guest/token?app_key=${appKey}`)
  // console.log(domain)
  try {
    const rawResponse = await fetch(`${AUTH_API_URL}/v1/guest/token?app_key=${appKey}`, {
      method: 'GET',
      timeout: 5000,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'x-app-id': xAppId,
        Origin: domain,
        Referer: domain,
      },
      json: {
        app_key: appKey,
        app_secret: appSecret,
        scope: [
          'https://internal.supersoccer.tv/users/users.profile.read',
          'https://internal.supersoccer.tv/subscriptions/users.read.global' /* DARI VINCENT */,
          'https://api.supersoccer.tv/subscriptions/subscriptions.read' /* DARI VINCENT */,
          'https://api.supersoccer.tv/orders/orders.create',
          'https://api.supersoccer.tv/videos/videos.read',
          'paymentmethods:read.internal',
          'payments:payment.dopay',
          'userdata:preference.read',
          'userdata:preference.insert',
        ].join(' '),
      },
    })

    const content = await rawResponse.json()
    return content
  } catch (err) {
    console.error('error guest token:', err)
    return null
  }
}

const getUserInfo = async sid => {
  try {
    const rawResponse = await fetch(OAUTH_USER_INFO_URL, {
      method: 'GET',
      timeout: 5000,
      headers: {
        Cookie: `SID=${sid}`,
        'Content-Type': 'application/json',
      },
    })

    const content = await rawResponse.json()
    userinfo = content
    return content.data
  } catch (err) {
    console.error('error get user info:', err)
    return { error: err }
  }
}

const getUserSubscription = async (userId, accessToken) => {
  try {
    const rawResponse = await fetch(`${SUBSCRIPTION_API_URL}/users/${userId}?app_id=${appId}`, {
      method: 'GET',
      timeout: 5000,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })

    const content = await rawResponse.json()
    return content
  } catch (err) {
    console.error('error user subscription:', err)
    return { error: err }
  }
}

const requestLogout = async accessToken => {
  try {
    await fetch(OAUTH_LOGOUT_URL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })

    return true
  } catch {
    return null
  }
}

const requestCode = async (req, res) => {
  const randomState =
    Math.random()
      .toString()
      .substr(2) +
    Math.random()
      .toString()
      .substr(2)

  res.cookie('wstate', randomState, {
    maxAge: 86400 * 1000,
    httpOnly: true,
  })

  /* ini link ke web */
  let qs
  if (!_isUndefined(req.query) && !_isUndefined(req.query.app_key)) {
    let params = {}
    let queryParams = req.query

    _forEach(queryParams, (value, key) => {
      params[key] = value
    })

    qs = querystring.stringify(params)
  } else {
    qs = querystring.stringify({
      app_key: appKey,
      response_type: 'code',
      redirect_uri: `${domain}/oauth/callback`,
      scope: [
        'https://internal.supersoccer.tv/users/users.profile.read',
        'https://internal.supersoccer.tv/subscriptions/users.read.global' /* DARI VINCENT */,
        'https://api.supersoccer.tv/subscriptions/subscriptions.read' /* DARI VINCENT */,
        'https://api.supersoccer.tv/orders/orders.create',
        'https://api.supersoccer.tv/videos/videos.read',
        'https://api.supersoccer.tv/orders/orders.read',
        'paymentmethods:read.internal',
        'payments:payment.dopay',
        'userdata:preference.read',
        'userdata:preference.insert',
      ].join(' '),
      state: randomState,
    })
  }

  const oAuthAuthorizationEndpoint = `${oauthEndpoint}/authorize?${qs}`
  console.log('oAuth==>', oAuthAuthorizationEndpoint)

  return oAuthAuthorizationEndpoint
}

const getHeaderMenus = async () => {
  let hasCache = false
  let headerArr = []
  molaCache.get('headerMenu', function(err, value) {
    if (!err) {
      if (value == undefined) {
        // key not found
        hasCache = false
        // console.log('cache value header menu is undefined')
      } else {
        // console.log('cache value header menu is ', value)
        hasCache = true
        headerArr = value
      }
    }
  })

  if (!hasCache) {
    try {
      const headerUrl = `${domain}/api/v2/config/ui/menu`
      let response = null

      const rawResponse = await fetch(`${headerUrl}`, {
        timeout: 5000,
        maxRedirects: 1,
      })
      response = await rawResponse.json()
      console.log('RESPONSE HEADER', response)
      headerArr = response && response.data ? response.data : []
    } catch (err) {
      console.log('Error Get Header Menu', err)
    }
    if (headerArr.length > 0) {
      molaCache.set('headerMenu', headerArr, 10800, function(err, success) {
        if (!err && success) {
          console.log('success set cache node cache headermenu', headerArr)
        } else {
          console.log('failed set cache node cache headermenu', 'err:', err)
        }
      })
    }
  }

  return headerArr
}

const getConfigParams = async () => {
  let hasCache = false
  let configParams = null

  molaCache.get('configParams', function(err, value) {
    if (!err) {
      if (value == undefined) {
        // key not found
        hasCache = false
        // console.log('cache value header menu is undefined')
      } else {
        // console.log('cache value header menu is ', value)
        hasCache = true
        configParams = value
      }
    }
  })

  if (!hasCache) {
    try {
      const configUrl = `${domain}/api/v2/config/app-params`
      let response = null

      const rawResponse = await fetch(`${configUrl}`, {
        timeout: 5000,
        maxRedirects: 1,
      })
      response = await rawResponse.json()
      // console.log('response params', response)
      configParams = response && response.data && response.data.attributes ? response.data.attributes : null
    } catch (err) {
      // console.log('Error Get Paramss', err)
    }
    if (configParams) {
      molaCache.set('configParams', configParams, 300, function(err, success) {
        if (!err && success) {
          console.log('success set cache node cache config params', configParams)
        } else {
          console.log('failed set cache node cache config params', 'err:', err)
        }
      })
    }
  }
  return configParams
}

// set a cookie
app.use('*', async (req, res, next) => {
  // check if client sent cookie
  console.log('=========', oauth)

  const cookie = req.cookies
  if (`${cookie.SID}` !== 'undefined' || cookie.SID !== undefined) {
    res.cookie('SID', req.cookies.SID, {
      path: '/',
      maxAge: 7 * 24 * 3600 * 1000,
      httpOnly: true,
    })

    res.cookie('SIDX', req.cookies.SID, {
      path: '/',
      maxAge: 7 * 24 * 3600 * 1000,
      httpOnly: true,
    })
  }
  // if (`${cookie.__deviceId}` === 'undefined' || cookie.__deviceId === undefined) {
  //   const deviceId = Crypto.uuid() // 076d029f-4927-ec5f-5b06e35e
  //   res.cookie('__deviceId', deviceId, {
  //     path: '/',
  //     maxAge: 30 * 24 * 3600 * 1000,
  //     httpOnly: true,
  //   })
  // }
  next() // <-- important!
})

app.get('/oauth/callback', async (req, res) => {
  const code = req.query.code
  const state = req.query.state
  const storedState = req.cookies.wstate
  const sid = req.cookies.SID

  if (code && state && storedState && state === storedState) {
    try {
      await new Promise((resolve, reject) => {
        request.post(
          {
            ...config.endpoints.setting,
            url: `${AUTH_API_URL}/oauth2/v1/token`,
            timeout: 5000,
            headers: {
              'x-app-id': xAppId,
              'User-Agent': 'request',
            },
            json: {
              app_key: appKey,
              app_secret: appSecret,
              grant_type: 'authorization_code',
              redirect_uri: `${domain}/oauth/callback`,
              code,
            },
          },
          (error, response, body) => {
            if (error || response.statusCode !== 200) {
              console.error(error, response.statusCode, body)
              return reject({ error, statusCode: response.statusCode, body })
            }
            res.cookie('_at', body.access_token, {
              maxAge: body.expires_in * 1000,
              httpOnly: true,
              // secure: !__DEV__,
            })
            return resolve()
          }
        )
      })
    } catch (e) {
      console.log(`[/oauth/callback] error while fetching /oauth2/v1/token. err: ${e}`)
    }
  }

  if (req.cookies.redirectwatch) {
    const redirect = `/watch?v=${req.cookies.redirectwatch}`
    return res.redirect(domain + redirect)
  }

  return res.redirect(domain || 'https://stag.mola.tv')
})

app.get('/oauth/app-callback', async (req, res) => {
  const code = req.query.code
  const state = req.query.state
  // const storedState = req.cookies.wstate
  const sid = req.cookies.SID

  if (!code || !state) {
    return res.status(401)
  }

  try {
    const _at = await new Promise(resolve => {
      request.post(
        {
          ...config.endpoints.setting,
          url: `${AUTH_API_URL}/oauth2/v1/token`,
          timeout: 5000,
          headers: {
            'x-app-id': xAppId,
            'User-Agent': 'request',
          },
          json: {
            app_key: appKeyMobile,
            app_secret: appSecretMobile,
            grant_type: 'authorization_code',
            redirect_uri: `${domain}/oauth/app-callback`,
            code,
          },
        },
        (error, response, body) => {
          if (error || response.statusCode !== 200) {
            console.error(error, response.statusCode, body)
            reject({ error, statusCode: response.statusCode, body })
          }
          res.header('_at', body.access_token)
          resolve(response)
        }
      )
    })
    return res.json(_at)
  } catch (e) {
    console.log(`[/oauth/app-callback] error while fetching /oauth2/v1/token. err: ${e}`)
    return res.status(401)
  }
})

app.get('/accounts/signin', async (req, res) => {
  const storedState = Math.random()
    .toString()
    .substr(2)

  res.cookie('wstate', storedState, {
    maxAge: 86400 * 1000,
    httpOnly: true,
  })

  if (!req.cookies._at && req.query.redirect_watch) {
    res.cookie('redirectwatch', req.query.redirect_watch, {
      maxAge: 30 * 1000,
      httpOnly: true,
    })
  }

  if (!req.cookies._at) {
    const callbackCode = await requestCode(req, res)
    return res.redirect(callbackCode)
  }
  return res.redirect(domain || 'https://stag.mola.tv')
})

app.get('/accounts', async (req, res) => {
  if (!req.cookies._at) {
    const callbackCode = await requestCode(req, res)
    return res.redirect(callbackCode)
  }
  return res.redirect(domain || 'https://stag.mola.tv')
})

app.get('/signout', (req, res) => {
  res.clearCookie('_at')
  res.clearCookie('SID')
  return res.redirect(domain || 'http://jaenal.mola.tv')
})

//
// Register server-side rendering middleware
// -----------------------------------------------------------------------------
app.get('*', async (req, res, next) => {
  console.log('Server URL', req.path)
  var whitelisted = ['/accounts/profile', '/accounts/inbox', '/accounts/history', '/history-transactions']
  try {
    // global.clearInterval(inboxInterval);

    const css = new Set()

    // Enables critical path CSS rendering
    // https://github.com/kriasoft/isomorphic-style-loader
    const insertCss = (...styles) => {
      // eslint-disable-next-line no-underscore-dangle
      styles.forEach(style => css.add(style._getCss()))
    }

    // Get IP
    let ip =
      req.headers['x-forwarded-for'] ||
      req.connection.remoteAddress ||
      req.socket.remoteAddress ||
      (req.connection.socket ? req.connection.socket.remoteAddress : null)
    if (ip !== null) {
      if (ip.length >= 15) {
        ip = ip.replace(/^.*:/, '')
      }
    }

    var guestToken = '',
      errorToken = '',
      errorGtoken = ''
    const accessToken = req.cookies._at
    const idToken = req.cookies.SID
    if (idToken) {
      const decodedAccessToken = accessToken && jwt.decode(accessToken)

      let accessTokenLifespan = -1
      if (decodedAccessToken && decodedAccessToken.exp) {
        accessTokenLifespan = decodedAccessToken.exp - Date.now() / 1000
      }

      const decodedIdToken = idToken && jwt.decode(idToken)
      let idTokenLifespan = -1
      if (decodedIdToken && decodedIdToken.exp) {
        idTokenLifespan = decodedIdToken.exp - Date.now() / 1000
      }
      // // if lifespan of token is less than 12 hours then get new access token
      if (decodedAccessToken || decodedIdToken) {
        if (decodedAccessToken && decodedIdToken) {
          if (decodedAccessToken.sub !== decodedIdToken.sub || idTokenLifespan < 0 || accessTokenLifespan < 0) {
            // res.cookie('_at', '', { expires: new Date(0) })
            // return res.redirect(req.originalUrl);
          } else if (accessTokenLifespan < 12 * 3600) {
            let content = await extendToken(accessToken)
            if (content && content.error) {
              errorToken = content.error
              content = null
            }
            if (content && content.access_token) {
              res.cookie('_at', content.access_token, {
                maxAge: content.expires_in * 1000,
                httpOnly: true,
                // secure: !__DEV__,
              })
            }
          }
        } else if (decodedIdToken) {
          if (req.path !== '/accounts/consent') {
            // res.cookie('_at', '', { expires: new Date(0) });
            res.clearCookie('_at')
            res.clearCookie('SID')
            // return res.redirect('/accounts/login')
          } else {
            if (req.cookies.SID) {
              res.cookie('SIDX', req.cookies.SID, {
                path: '/',
                maxAge: 7 * 24 * 3600 * 1000,
                httpOnly: true,
              })
            }
          }
        }
      }
    } else {
      //if not logged in, get guest token
      if (req.cookies._gt) {
        guestToken = req.cookies._gt
      } else {
        let content = await requestGuestToken(res)
        if (content && content.error) {
          errorGtoken = content.error
          content = null
        }
        if (content && content.data) {
          guestToken = content.data.access_token
          res.cookie('_gt', content.data.access_token, {
            maxAge: content.data.expires_in * 1000,
            httpOnly: true,
            // secure: !__DEV__,
          })
        }
      }

      /* Must login before accessing these features */
      if (!__DEV__ && whitelisted.includes(req.url)) {
        if (req.path !== '/accounts/consent') {
          return res.redirect('/accounts/login')
        }
      }

      const decodedGuestToken = guestToken && jwt.decode(guestToken)

      let guestTokenLifespan = -1
      if (decodedGuestToken && decodedGuestToken.exp) {
        guestTokenLifespan = decodedGuestToken.exp - Date.now() / 1000
      }

      if (guestTokenLifespan < 12 * 3600) {
        let content = await extendToken(guestToken)
        if (content && content.error) {
          errorToken = content.error
          content = null
        }
        if (content && content.access_token) {
          res.cookie('_gt', content.access_token, {
            maxAge: content.expires_in * 1000,
            httpOnly: true,
            // secure: !__DEV__,
          })
        }
      }
    }

    const uid = req.cookies.SID ? jwt.decode(req.cookies.SID).uid : ''
    const expToken = req.cookies._at ? jwt.decode(req.cookies._at).exp : ''
    const expGToken = guestToken ? jwt.decode(guestToken).exp : ''

    let userInfo, userSubs, userSubsError, userInfoError
    if (req.cookies._at) {
      userInfo = await getUserInfo(req.cookies.SID)
      userSubs = await getUserSubscription(uid, req.cookies._at)
      if (userSubs && userSubs.error) {
        userSubsError = userSubs.error
        userSubs = null
      }

      if (userInfo && userInfo.error) {
        userInfoError = userInfo.error
        userInfo = null
      }
    }

    const responseHeaderMenu = await getHeaderMenus()
    const responseConfigParams = await getConfigParams()

    const mediaAnalyticUrl = {
      development: 'http://ma1435-r.analytics.edgesuite.net/config/beacon-25308.xml',
      staging: 'https://ma1439-r.analytics.edgekey.net/config/beacon-25436.xml',
      production: 'https://ma1439-r.analytics.edgekey.net/config/beacon-25462.xml',
    }

    const pathSplit = req.path.split('/')
    const firstPath = pathSplit.length > 1 ? pathSplit[1] : ''

    let articlesDetailData = {
      meta: {
        status: 'loading',
        error: '',
      },
      data: null,
    }

    if (firstPath === 'articles') {
      let articleId = pathSplit[2]
      if (!articleId) {
        articlesDetailData = {
          meta: {
            status: 'error',
            error: 'article detail error 404 cannot be found',
          },
          data: null,
        }
      } else {
        let articlesData = null
        let hasCache = false
        molaCache.get(articleId, function(err, value) {
          if (!err) {
            if (value == undefined) {
              // key not found
              hasCache = false
              // console.log('cache value is undefined', err)
            } else {
              hasCache = true
              articlesData = value
              // console.log('cache value is: ', value)
              //{ my: "Special", variable: 42 }
              // ... do something ...
            }
          }
        })
        if (!hasCache) {
          await Axios.get(`${config.endpoints.apiArticles}/articles/${articleId}`, {
            timeout: 5000,
            maxRedirects: 1,
          })
            .then(response => {
              if (response.status == 200) {
                const result = utils.normalizeArticles(response)
                articlesDetailData = {
                  meta: {
                    status: 'success',
                  },
                  data: result,
                }
                molaCache.set(articleId, result, 2700, function(err, success) {
                  if (!err && success) {
                    console.log('success set cache node cache', articleId, result)
                    // true
                    // ... do something ...
                  } else {
                    console.log('failed set cache node cache', articleId, ', err:', err)
                  }
                })
              } else {
                articlesDetailData = {
                  meta: {
                    status: 'error',
                    error: `Error SEO articles request failed with status ${response.status}`,
                  },
                  data: null,
                }
              }
            })
            .catch(err => {
              articlesDetailData = {
                meta: {
                  status: 'error',
                  error: 'Error SEO articles' + err,
                },
                data: null,
              }
            })
        } else {
          articlesDetailData = {
            meta: {
              status: 'success',
            },
            data: articlesData,
          }
        }
      }
    }

    const initialState = {
      user: req.user || {
        uid: uid === 'undefined' ? '' : uid,
        sid: req.cookies.SID === 'undefined' ? '' : req.cookies.SID,
        sessionId: req.cookies.__sessionId || '',
        firstName: userInfo ? userInfo.first_name : '',
        lastName: userInfo ? userInfo.last_name : '',
        email: userInfo ? userInfo.email : '',
        phoneNumber: userInfo ? userInfo.phone_number : '',
        birthdate: userInfo ? userInfo.birthdate : '',
        gender: userInfo ? userInfo.gender : '',
        location: userInfo ? userInfo.location : '',
        subscriptions: userSubs ? userSubs.data : [],
        token: accessToken,
        refreshToken: '',
        tokenExpired: expToken,
        type: '',
        lang: req.query.lang || 'en',
        clientIp: ip,
      },
      headerMenu: {
        data: responseHeaderMenu ? responseHeaderMenu : null,
      },
      configParams: {
        data: responseConfigParams ? responseConfigParams : '',
      },
      runtime: {
        appUrl: 'molaapp://mola.tv/watch',
        appPackage: config.env == 'staging' ? 'com.molademo' : 'tv.mola.app',
        gt: guestToken,
        tokenExpired: expGToken,
        csrf: req.csrfToken(),
        // vuid: req.cookies.VUID === 'undefined' ? '' : req.cookies.VUID,
        // deviceId: req.cookies.__deviceId === 'undefined' ? '' : req.cookies.__deviceId,
        debugError: {
          subs: userSubsError,
          userInfoErr: userInfoError,
          userInfo: userinfo,
          token: errorToken,
          gtoken: errorGtoken,
        },
        mediaAnalyticUrl: mediaAnalyticUrl[config.env],
      },
      articlesDetail: articlesDetailData,
    }

    // Auth.requestGuestToken({ csrf: initialState.runtime.csrf, appKey: payload.app_key }).then(response => console.log(response))

    const store = configureStore(initialState)

    store.dispatch(setRuntimeVariable({ name: 'start', value: Date.now() }))

    // inboxInterval = setInterval(() => {
    //   console.log(`server inbox interval ${count}`);
    //   count++;
    //   store.dispatch(setRuntimeVariable({ name: 'unread', value: count }));
    // }, 1000);

    const userAgent = req.get('User-Agent')
    /** /iPhone|iPad|iPod|Android|PlayBook|Kindle Fire|PalmSource|Palm|IEMobile|BB10/i */
    let isMobile = /iPhone|Android|PlayBook|Kindle Fire|PalmSource|Palm|IEMobile|BB10/i.test(userAgent) && !isTablet

    // Global (context) variables that can be easily accessed from any React component
    // https://facebook.github.io/react/docs/context.html
    const context = {
      insertCss,
      // fetch,
      // The twins below are wild, be careful!
      pathname: req.path,
      query: req.query,
      // You can access redux through react-redux connect
      store,
      storeSubscription: null,
      isMobile,
    }

    const route = await router.resolve(context)

    if (route.redirect) {
      res.redirect(route.status || 302, route.redirect)
      return
    }

    const data = { ...route }

    data.akamai_analytic_enabled = responseConfigParams
      ? _get(responseConfigParams, 'akamai_analytic_enabled', false)
      : false

    /*** ###Articles Detail data and SEO ### ***/
    data.url = config.endpoints.domain + req.path
    data.image = config.endpoints.domain + '/mola.png'
    // const pathSplit = req.path.split('/')
    // const firstPath = pathSplit.length > 1 ? pathSplit[1] : ''
    /*** SEO - start  ***/
    if (firstPath === 'watch') {
      let videoId = '',
        appLink = ''
      videoId = req.query.v
      appLink = 'watch?v=' + videoId
      let videoObj = {}
      let hasCache = false
      molaCache.get(videoId, function(err, value) {
        if (!err) {
          if (value == undefined) {
            // key not found
            hasCache = false
            // console.log('cache value is undefined', err)
          } else {
            hasCache = true
            videoObj = value
            // console.log('cache value is: ', value)
            //{ my: "Special", variable: 42 }
            // ... do something ...
          }
        }
      })
      if (!hasCache) {
        if (videoId) {
          let response = null
          try {
            const rawResponse = await fetch(`${VIDEO_API_URL}/${videoId}?app_id=${appId}`, {
              timeout: 5000,
              maxRedirects: 1,
            })
            response = await rawResponse.json()
          } catch (err) {
            console.log('error video api call for seo ', err)
          }
          const videoData = response && response.data ? response.data : null
          data.title = videoData ? videoData[0].attributes.title : 'Mola TV'
          data.description = videoData
            ? videoData[0].attributes.description
            : 'Watch TV Shows Online, Watch Movies Online or stream right to your smart TV, PC, Mac, mobile, tablet and more.'
          const background = videoData ? _get(videoData[0].attributes.images, 'cover', { landscape: '' }) : null
          data.image = videoData ? background.landscape : ''
          data.type = 'video.other'
          data.twitter_card_type = 'summary_large_image'
          data.appLinkUrl = appLink
          videoObj = {
            title: data.title,
            description: data.description,
            image: data.image,
            type: data.type,
            twitter_card_type: data.twitter_card_type,
            appLinkUrl: data.appLinkUrl,
          }
        }
        molaCache.set(videoId, videoObj, 2700, function(err, success) {
          if (!err && success) {
            console.log('success set cache node cache', videoId, videoObj)
            // true
            // ... do something ...
          } else {
            console.log('failed set cache node cache', videoId, ', err:', err)
          }
        })
      } else {
        data.title = videoObj.title
        data.description = videoObj.description
        data.image = videoObj.image
        data.type = videoObj.type
        data.twitter_card_type = videoObj.twitter_card_type
        data.appLinkUrl = videoObj.appLinkUrl
      }
    } else if (firstPath === 'articles') {
      const { status } = initialState.articlesDetail.meta
      if (status === 'success') {
        const articlesData = initialState.articlesDetail.data
        data.title = articlesData.title
        data.description = articlesData.summary
        data.image = `${articlesData.imageUrl}?w=300&h=300`
        data.type = articlesData.type
      }
    }
    /*** ### End Of Articles Detail ***/

    /*** SEO - end  ***/

    data.children = renderStylesToString(
      ReactDOM.renderToString(
        <IntlProvider locale={'id'}>
          <App context={context}>{route.component}</App>
        </IntlProvider>
      )
    )
    data.styles = [{ id: 'css', cssText: [...css].join('') }]

    const scripts = new Set()
    const addChunk = chunk => {
      if (chunks[chunk]) {
        chunks[chunk].forEach(asset => scripts.add(asset))
      } else if (__DEV__) {
        throw new Error(`Chunk with name '${chunk}' cannot be found`)
      }
    }
    addChunk('client')
    if (route.chunk) addChunk(route.chunk)
    if (route.chunks) route.chunks.forEach(addChunk)

    data.scripts = Array.from(scripts)
    data.app = {
      apiUrl: config.endpoints.clientUrl,
      state: context.store.getState(),
      isMobile: context.isMobile,
      // inbox: {
      //   unread: count
      // }
    }

    let isSmartTV = /.*SMART-TV*./i.test(userAgent)

    if (isSmartTV && req.url != '/404') {
      return res.redirect(domain + '/error/smart')
    }

    const html = ReactDOM.renderToStaticMarkup(<Html {...data} />)
    res.status(route.status || 200)
    res.send(`<!doctype html>${html}`)
  } catch (err) {
    next(err)
  }
})

//
// Error handling
// -----------------------------------------------------------------------------
const pe = new PrettyError()
pe.skipNodeFiles()
pe.skipPackage('express')

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  console.error(pe.render(err))
  const html = ReactDOM.renderToStaticMarkup(
    <Html
      title="Internal Server Error"
      description={err.message}
      styles={[{ id: 'css', cssText: errorPageStyle._getCss() }]} // eslint-disable-line no-underscore-dangle
    >
      {ReactDOM.renderToString(<ErrorPageWithoutStyle error={err} />)}
    </Html>
  )
  res.status(err.status || 500)
  res.send(`<!doctype html>${html}`)
})

//
// Launch the server
// -----------------------------------------------------------------------------
if (!module.hot) {
  app.listen(config.port, () => {
    console.info(`The server is running at http://localhost:${config.port}/`)
  })
}

//
// Hot Module Replacement
// -----------------------------------------------------------------------------
if (module.hot) {
  app.hot = module.hot
  module.hot.accept('./router')
}

export default app

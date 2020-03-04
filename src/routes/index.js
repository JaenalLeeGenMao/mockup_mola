/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

/* eslint-disable global-require */
/* eslint-disable */

import _get from 'lodash/get'
import queryString from 'query-string'
import UaParser from 'ua-parser-js'
import history from '../history'

import _isFunction from 'lodash/isFunction'
import tracker from '../lib/tracker'
import { globalTracker } from '@source/lib/globalTracker'

// let firstRender = true;
let currentLocation = history.location

// The top-level (parent) route
const routes = {
  path: '',

  // Keep in mind, routes are evaluated in order
  children: [
    {
      path: '',
      load: () => import(/* webpackChunkName: 'home' */ './home'),
    },
    {
      path: '/privacy',
      load: () => import(/* webpackChunkName: 'privacy' */ './privacy'),
    },
    {
      path: '/search',
      load: () => import(/* webpackChunkName: 'search' */ './search'),
    },
    {
      path: '/accounts/history',
      load: () => import(/* webpackChunkName: 'history' */ './accounts/history'),
    },
    {
      path: '/accounts/inbox',
      load: () => import(/* webpackChunkName: 'inbox' */ './accounts/inbox'),
    },
    {
      path: '/accounts/login',
      load: () => import(/* webpackChunkName: 'login' */ './accounts/login'),
    },
    {
      path: '/accounts/register',
      load: () => import(/* webpackChunkName: 'register' */ './accounts/register'),
    },
    {
      path: '/accounts/profile',
      load: () => import(/* webpackChunkName: 'profile' */ './accounts/profile'),
    },
    {
      path: '/accounts/forgotPassword',
      load: () => import(/* webpackChunkName: 'forgotPassword' */ './accounts/forgotPassword'),
    },
    {
      path: '/accounts/resetPassword',
      load: () => import(/* webpackChunkName: 'resetPassword' */ './accounts/resetPassword'),
    },
    {
      path: '/accounts/security',
      load: () => import(/* webpackChunkName: 'security' */ './accounts/security'),
    },
    {
      path: '/accounts/setting',
      load: () => import(/* webpackChunkName: 'setting' */ './accounts/setting'),
    },
    {
      path: '/accounts/thankyou',
      load: () => import(/* webpackChunkName: 'thankyou' */ './accounts/thankyou'),
    },
    {
      path: '/accounts/bca-subscribe',
      load: () => import(/* webpackChunkName: 'bca-subscribe' */ './accounts/bca-subscribe'),
    },
    {
      path: '/promo/bca',
      load: () => import(/* webpackChunkName: 'bca-promo' */ './accounts/bca-promo'),
    },
    {
      path: '/accounts/ordered',
      load: () => import(/* webpackChunkName: 'ordered' */ './accounts/ordered'),
    },
    {
      path: '/accounts/subscriptionsList',
      load: () => import(/* webpackChunkName: 'subscriptionsList' */ './accounts/subscriptionsList'),
    },
    {
      path: '/accounts/checkout',
      load: () => import(/* webpackChunkName: 'checkout' */ './accounts/checkout'),
    },
    {
      path: '/accounts/consent',
      load: () => import(/* webpackChunkName: 'consent' */ './accounts/consent'),
    },
    {
      path: '/accounts/login-bca',
      load: () => import(/* webpackChunkName: 'login-bca' */ './accounts/login-bca'),
    },
    {
      path: '/system-info',
      load: () => import(/* webpackChunkName: 'system-info' */ './system-info'),
    },
    {
      path: '/terms',
      load: () => import(/* webpackChunkName: 'terms' */ './terms'),
    },
    {
      path: '/get-app',
      load: () => import(/* webpackChunkName: 'get-app' */ './get-app'),
    },
    {
      path: '/get-app-desktop',
      load: () => import(/* webpackChunkName: 'get-app-desktop' */ './get-app-desktop'),
    },
    {
      path: '/promo',
      load: () => import(/* webpackChunkName: 'promo' */ './promo'),
    },
    {
      path: '/conditions',
      load: () => import(/* webpackChunkName: 'conditions' */ './conditions'),
    },
    // {
    //   path: '/history-transactions',
    //   load: () => import(/* webpackChunkName: 'history-transactions' */ './history-transactions'),
    // },
    // {
    //   path: '/history-transactions/:id',
    //   load: () => import(/* webpackChunkName: 'history-transactions' */ './history-transactions'),
    // },
    {
      path: '/matches',
      load: () => import(/* webpackChunkName: 'matches' */ './matches'),
      children: [
        {
          path: '/:id',
        },
      ],
    },
    {
      path: '/download-app',
      load: () => import(/* webpackChunkName: 'download-app' */ './download-app'),
      children: [
        {
          path: '/:id',
        },
      ],
    },
    {
      path: '/categories',
      load: () => import(/* webpackChunkName: 'categories' */ './playlist'),
      children: [
        {
          path: '/:id',
        },
      ],
    },
    {
      path: '/watch',
      load: () => import(/* webpackChunkName: 'watch' */ './watch'),
    },
    // {
    //   path: '/testvo',
    //   load: () => import(/* webpackChunkName: 'testvo' */ './testvo'),
    // },
    {
      path: '/channels',
      load: () => import(/* webpackChunkName: 'channels' */ './channels'),
      children: [
        {
          path: '/:id',
        },
      ],
    },
    {
      path: '/libraries',
      load: () => import(/* webpackChunkName: 'libraries' */ './feature'),
      children: [
        {
          path: '/:id',
        },
      ],
    },
    {
      path: '/articles',
      load: () => import(/* webpackChunkName: 'articles' */ './articles'),
      children: [
        {
          path: '/:id',
        },
      ],
    },
    {
      path: '/live-support',
      load: () => import(/* webpackChunkName: 'live-support' */ './live-support'),
    },
    {
      path: '/more',
      load: () => import(/* webpackChunkName: 'more' */ './more'),
    },
    // {
    //   path: '/notifications',
    //   load: () => import(/* webpackChunkName: 'notifications' */ './notifications'),
    // },
    {
      path: '/error/smart',
      load: () => import(/* webpackChunkName: 'smart' */ './error/smart'),
    },
    // Wildcard routes, e.g. { path: '(.*)', ... } (must go last)
    {
      path: '(.*)',
      load: () => import(/* webpackChunkName: 'not-found' */ './not-found'),
    },
  ],

  async action({ next, store }) {
    /* Timeout runs the method in parallel upon changing routes */
    setTimeout(async () => {
      track(store)
    })

    // Execute each child route until one of them return the result
    const route = await next()

    // ***TOOGLE ICON LIVE SUPPORT***

    const { configParams } = store.getState()

    const hideOffline = e => {
      const targetHide = document.getElementsByClassName('embeddedServiceHelpButton')[0]
      const labelChat = document.getElementById('headerTextLabel')
      if (labelChat && configParams.data.live_support_label) {
        labelChat.textContent = configParams.data.live_support_label
      }
      // if (e.target.innerText === 'Offline') {
      //   targetHide.style.visibility = 'hidden'
      // } else if (e.target.innerHTML === 'Online') {
      //   if (window) {
      //     if (window.location.pathname === '/') {
      //       targetHide.style.visibility = 'visible'
      //     }
      //   }
      // }
    }

    if (configParams.data) {
      if (configParams.data.live_support_enabled) {
        let elMessage = null
        setTimeout(function() {
          if (typeof document !== 'undefined') {
            const pathRoute = route.chunks[0]
            if (document.getElementsByClassName('embeddedServiceHelpButton')[0]) {
              elMessage = document.getElementsByClassName('message')[0]
              // elMessage.addEventListener('DOMSubtreeModified', hideOffline)
              if (elMessage.innerHTML === 'Online') {
                document.getElementsByClassName('embeddedServiceHelpButton')[0].style.visibility = 'visible'
              }

              if (pathRoute === 'live-support') {
                if (window.App.isMobile) {
                  document.getElementsByClassName('embeddedServiceHelpButton')[0].style.visibility = 'visible'
                  let _el = document.getElementsByClassName('helpButton')[0]
                  _el.style.left = '44.5vw'
                  _el.style.right = '-50vw'
                  _el.style.top = '50vh'
                  _el.style.visibility = 'visible'
                }
              }
            }
          }
        }, 3000)
      }
    }

    // ***END OF TOOTGLE ICON LIVE SUPPORT***

    // Provide default values for title, description etc.
    route.title = `${route.title || 'Untitled Page'}`
    route.description = route.description || ''
    return route
  },
}

function addListenerMulti(el, s, fn) {
  s.split(' ').forEach(e => el.addEventListener(e, fn, false))
}

const track = async store => {
  if (process.env.BROWSER) {
    var timer = null

    addListenerMulti(
      document,
      'click mousemove touchmove mouseup mousedown keydown keypress keyup submit change mouseenter scroll resize dblclick',
      function(e) {
        if (timer) clearTimeout(timer)
        timer = setTimeout(function(t) {
          // console.log("EVENT ALL")
          tracker.sessionId()
        }, 60000)
      }
    )
    const { location } = window
    // Parse Current URL
    const { search, pathname } = window.location
    const urlParams = queryString.parse(search)
    // Get & Parse UA
    const UA = new UaParser()
    UA.setUA(navigator.userAgent)

    // Try get user_id & subs
    const user = store.getState().user

    // Check if current path is in search page
    const inSearchPage = currentLocation.pathname === '/search' || currentLocation.pathname === '/get-app'

    // get the token
    const token = await tracker.getOrCreateToken()
    // Post to ds-feeder if there's token && not in search page
    if (token && !inSearchPage) {
      const payload = {
        window,
        user: user,
        event: 'event_pages',
      }
      globalTracker(payload)
    }
    //tracker.sendPubSub(payload, token)

    if (pathname.includes('watch')) {
      if (urlParams.v) {
        let checkEncoded = urlParams.v.split('u0026')
        let videoId = checkEncoded.length > 0 && checkEncoded[0]
        if (videoId.length === 10) {
          let checkRegex = RegExp('^[a-zA-Z0-9\\-]*$')
          let isValidId = checkRegex.test(videoId)
          if (isValidId) {
            if (token && !inSearchPage) {
              const payload = {
                window,
                videoId: videoId,
                user: user,
                event: 'event_videos',
              }
              globalTracker(payload)
            } //tracker.sendPubSub(payload, token)
          }
        }
      }
    }

    // HOTFIX need to find a way to get refferer in react
    currentLocation = location
  }
}

// The error page is available by permanent url for development mode
if (__DEV__) {
  routes.children.unshift({
    path: '/error',
    action: require('./error').default,
  })
}

export default routes

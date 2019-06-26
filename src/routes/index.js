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

import dateFormat from 'dateformat'
import _get from 'lodash/get'
import queryString from 'query-string'
import UaParser from 'ua-parser-js'
import history from '../history'

import tracker from '../lib/tracker'

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
    // Movie details
    {
      path: '/movie-detail',
      load: () => import(/* webpackChunkName: 'movie-detail' */ './movie-detail'),
      children: [
        {
          path: '/:id',
        },
      ],
    },
    // Movie Library
    {
      path: '/movie-library',
      load: () => import(/* webpackChunkName: 'movie-library' */ './movie-library'),
      children: [
        {
          path: '/:id',
        },
      ],
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
      path: '/system-info',
      load: () => import(/* webpackChunkName: 'system-info' */ './system-info'),
    },
    {
      path: '/terms',
      load: () => import(/* webpackChunkName: 'terms' */ './terms'),
    },
    {
      path: '/conditions',
      load: () => import(/* webpackChunkName: 'conditions' */ './conditions'),
    },
    {
      path: '/subscribe',
      load: () => import(/* webpackChunkName: 'subscribe' */ './subscribe'),
    },
    {
      path: '/history-transactions',
      load: () => import(/* webpackChunkName: 'history-transactions' */ './history-transactions'),
    },
    {
      path: '/history-transactions/:id',
      load: () => import(/* webpackChunkName: 'history-transactions' */ './history-transactions'),
    },
    {
      path: '/subscribe-detail',
      load: () => import(/* webpackChunkName: 'subscribe-detail' */ './subscribe-detail'),
      children: [
        {
          path: '/:id',
        },
      ],
    },
    {
      path: '/sport',
      load: () => import(/* webpackChunkName: 'sport' */ './sport'),
    },
    {
      path: '/switch-channels',
      load: () => import(/* webpackChunkName: 'switch-channels' */ './switch-channels'),
    },
    {
      path: '/matches',
      load: () => import(/* webpackChunkName: 'matches' */ './matches'),
    },
    {
      path: '/watch',
      load: () => import(/* webpackChunkName: 'watch' */ './watch-sport'),
    },
    {
      path: '/channels',
      load: () => import(/* webpackChunkName: 'channels' */ './channels'),
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

    addListenerMulti(document, 'click mousemove touchmove mouseup mousedown keydown keypress keyup submit change mouseenter scroll resize dblclick', function(e) {
      if (timer) clearTimeout(timer)
      timer = setTimeout(function(t) {
        // console.log("EVENT ALL")
        tracker.sessionId()
      }, 60000)
    })
    const { location } = window
    // Parse Current URL
    const { search, pathname } = window.location
    const urlParams = queryString.parse(search)
    // Get & Parse UA
    const UA = new UaParser()
    UA.setUA(navigator.userAgent)

    // Try get user_id & subs
    const user = store.getState().user

    let adjustedSubs = []
    // if (userId !== null || userId !== undefined) {
    //   adjustedSubs = await users.subscriptions.map(
    //     subs => `${_get(subs, 'subscriptionId', null)}`,
    //   );
    // } else {
    //   adjustedSubs = [null];
    // }

    // Try get platform and browser
    const platform = _get(UA.getDevice(), 'type', null)
    const osName = _get(UA.getOS(), 'name', null)
    const osVersion = _get(UA.getOS(), 'version', null)
    const os = osName !== null && osVersion !== null ? `${osName} ${osVersion}` : null
    const vendor = _get(UA.getDevice(), 'vendor', null)
    const device = vendor !== null ? `${vendor}` : null
    const browserName = _get(UA.getBrowser(), 'name', null)
    const browserVersion = _get(UA.getBrowser(), 'version', null)
    const browser = browserName !== null && browserVersion !== null ? `${browserName} ${browserVersion}` : null

    const geolocation = tracker.getLangLat() ? tracker.getLangLat() : ''
    const latitude = geolocation.split(',').length == 2 ? geolocation.split(',')[0] : ''
    const longitude = geolocation.split(',').length == 2 ? geolocation.split(',')[1] : ''

    // Initialize Payload
    const payload = {
      data: {
        project_id: 'molatv',
        referrer: `${window.location.host}${currentLocation.pathname}${currentLocation.search}`,
        host: `${window.location.host}`,
        path: `${window.location.host}${location.pathname}${location.search}`,
        session_id: tracker.sessionId(), // Try get+set session_id
        client_id: tracker.clientId(),
        page_content: document.title || null,
        ip: user.clientIp,
        platform,
        os,
        device,
        app: browser,
        client: 'mola-web',
        screen_resolution: `${window.screen.width}x${window.screen.height}`,
        current_subscription_id: adjustedSubs,
        hit_timestamp: dateFormat(new Date(), 'yyyy-mm-dd hh:MM:ss'),
        utm_source: urlParams.utm_source || undefined,
        utm_medium: urlParams.utm_medium || undefined,
        utm_campaign: urlParams.utm_campaign || undefined,
        latitude,
        longitude,
      },
      table: 'event_pages',
    }

    if (user.uid) {
      payload.data.user_id = user.uid
    }

    // if (firstRender) {
    //   firstRender = false;
    //   const referrer = _get(store.getState(), 'runtime.referer', null)
    //   payload.data.referrer = referrer;
    // }

    // Check if current path is in search page
    const inSearchPage = currentLocation.pathname === '/search'

    // get the token
    const token = await tracker.getOrCreateToken()
    // Post to ds-feeder if there's token && not in search page
    if (token && !inSearchPage) tracker.sendPubSub(payload, token)

    const paths = pathname.split('/')
    const lastPathIndex = paths.length - 1

    if (pathname.includes('movie-detail')) {
      payload.data.video_id = paths[lastPathIndex]
      payload.table = 'event_videos'
      if (token && !inSearchPage) tracker.sendPubSub(payload, token)
    } else if (pathname.includes('watch')) {
      payload.data.video_id = urlParams.v
      payload.table = 'event_videos'
      if (token && !inSearchPage) tracker.sendPubSub(payload, token)
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

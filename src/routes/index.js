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
    // {
    //   path: '/privacy',
    //   load: () => import(/* webpackChunkName: 'privacy' */ './privacy'),
    // },
    // // Movie details
    // {
    //   path: '/movie-detail',
    //   load: () => import(/* webpackChunkName: 'movie-detail' */ './movie-detail'),
    //   children: [
    //     {
    //       path: '/:id',
    //     },
    //   ],
    // },
    // // Movie Library
    // {
    //   path: '/movie-library',
    //   load: () => import(/* webpackChunkName: 'movie-library' */ './movie-library'),
    //   children: [
    //     {
    //       path: '/:id',
    //     },
    //   ],
    // },
    // {
    //   path: '/search',
    //   load: () => import(/* webpackChunkName: 'search' */ './search'),
    // },
    // {
    //   path: '/accounts/history',
    //   load: () => import(/* webpackChunkName: 'history' */ './accounts/history'),
    // },
    // {
    //   path: '/accounts/inbox',
    //   load: () => import(/* webpackChunkName: 'inbox' */ './accounts/inbox'),
    // },
    // {
    //   path: '/accounts/login',
    //   load: () => import(/* webpackChunkName: 'login' */ './accounts/login'),
    // },
    // {
    //   path: '/accounts/register',
    //   load: () => import(/* webpackChunkName: 'register' */ './accounts/register'),
    // },
    // {
    //   path: '/accounts/profile',
    //   load: () => import(/* webpackChunkName: 'profile' */ './accounts/profile'),
    // },
    // {
    //   path: '/accounts/forgotPassword',
    //   load: () => import(/* webpackChunkName: 'forgotPassword' */ './accounts/forgotPassword'),
    // },
    // {
    //   path: '/accounts/resetPassword',
    //   load: () => import(/* webpackChunkName: 'resetPassword' */ './accounts/resetPassword'),
    // },
    // {
    //   path: '/accounts/security',
    //   load: () => import(/* webpackChunkName: 'security' */ './accounts/security'),
    // },
    // {
    //   path: '/accounts/setting',
    //   load: () => import(/* webpackChunkName: 'setting' */ './accounts/setting'),
    // },
    // {
    //   path: '/system-info',
    //   load: () => import(/* webpackChunkName: 'system-info' */ './system-info'),
    // },
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

const track = async store => {
  if (process.env.BROWSER) {
    const { location } = window
    // Parse Current URL
    const { search, pathname } = window.location
    const urlParams = queryString.parse(search)

    // Get & Parse UA
    const UA = new UaParser()
    UA.setUA(navigator.userAgent)

    // Try get user_id & subs
    const users = _get(store.getState(), 'data.users', {})

    let userId

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
    const mobile = _get(UA.getDevice(), 'mobile', null)
    const device = vendor !== null && mobile !== null ? `${vendor} ${mobile}` : null

    const browserName = _get(UA.getBrowser(), 'name', null)
    const browserVersion = _get(UA.getBrowser(), 'version', null)
    const browser = browserName !== null && browserVersion !== null ? `${browserName} ${browserVersion}` : null

    // Initialize Payload
    const payload = {
      data: {
        project_id: 'molatv',
        referrer: `${window.location.host}${currentLocation.pathname}${currentLocation.search}`,
        host: `${window.location.host}`,
        path: `${window.location.host}${location.pathname}${location.search}`,
        session_id: tracker.sessionId(window), // Try get+set session_id
        // page_content: document.title || null,
        ip: _get(store.getState(), 'runtime.clientIp', null),
        platform,
        os,
        device,
        app: browser,
        client: 'mola-web',
        screen_resolution: `${window.screen.width}x${window.screen.height}`,
        user_id: userId,
        current_subscription_id: adjustedSubs,
        hit_timestamp: dateFormat(new Date(), 'yyyy-mm-dd hh:MM:ss'),
      },
      table: 'event_pages',
    }

    const paths = pathname.split('/')
    const lastPathIndex = paths.length - 1

    if (pathname.includes('movie-detail')) {
      payload.data.video_id = paths[lastPathIndex]
      payload.table = 'event_videos'
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

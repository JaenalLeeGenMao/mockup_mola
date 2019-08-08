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
      path: '/accounts/consent',
      load: () => import(/* webpackChunkName: 'consent' */ './accounts/consent'),
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
      path: '/history-transactions',
      load: () => import(/* webpackChunkName: 'history-transactions' */ './history-transactions'),
    },
    {
      path: '/history-transactions/:id',
      load: () => import(/* webpackChunkName: 'history-transactions' */ './history-transactions'),
    },
    {
      path: '/switch-channels',
      load: () => import(/* webpackChunkName: 'switch-channels' */ './switch-channels'),
    },
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
    // setTimeout(function() {
    //   if (typeof document !== 'undefined') {
    //     const pathRoute = route.chunks[0]
    //     if (document.getElementsByClassName('embeddedServiceHelpButton')[0]) {
    //       if (pathRoute === 'home' || pathRoute === 'sport') {
    //         document.getElementsByClassName('embeddedServiceHelpButton')[0].style.visibility = 'visible'
    //       } else {
    //         if (pathRoute === 'live-support') {
    //           if (window.App.isMobile) {
    //             document.getElementsByClassName('embeddedServiceHelpButton')[0].style.visibility = 'visible'
    //             let _el = document.getElementsByClassName('helpButton')[0]
    //             _el.style.left = '44.5vw'
    //             _el.style.right = '-50vw'
    //             _el.style.top = '50vh'
    //             _el.style.visibility = 'visible'
    //           }
    //         } else {
    //           document.getElementsByClassName('embeddedServiceHelpButton')[0].style.visibility = 'hidden'
    //         }
    //       }
    //     }
    //   }
    // }, 3000)
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
    const inSearchPage = currentLocation.pathname === '/search'

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
      if (token && !inSearchPage) {
        const payload = {
          window,
          videoId: urlParams.v,
          user: user,
          event: 'event_videos',
        }
        globalTracker(payload)
      } //tracker.sendPubSub(payload, token)
    }

    if (pathname.includes('channels')) {
      if (token && !inSearchPage) {
        const channelId = pathname.split('/')
        const payload = {
          window,
          videoId: channelId.length > 2 && channelId[2] != '' ? channelId[2] : 'mola-1',
          user: user,
          event: 'event_videos',
        }
        globalTracker(payload)
      } //tracker.sendPubSub(payload, token)
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

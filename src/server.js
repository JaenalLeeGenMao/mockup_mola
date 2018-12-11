/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import path from 'path'
import express from 'express'
import csurf from 'csurf'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'
// import { graphql } from 'graphql';
// import nodeFetch from 'node-fetch';
// import request from 'request';
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
// import Auth from '@api/auth';

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

//
// Register Node.js middleware
// -----------------------------------------------------------------------------
app.use(express.static(path.resolve(__dirname, 'public')))
app.use(cookieParser())
app.use(csurf({ cookie: true }))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

const domain = config.endpoints.domain
let count = 0
// var inboxInterval;
// set a cookie
app.use(function(req, res, next) {
  // check if client sent cookie
  var cookie = req.cookies
  if (`${cookie.UID}` === 'undefined' || cookie.UID === undefined) {
    if (req.query.uid) {
      res.cookie('UID', req.query.uid, {
        path: '/',
        maxAge: 7 * 24 * 3600 * 1000,
        httpOnly: true,
      })
    }
  }
  if (`${cookie.SID}` !== 'undefined' || cookie.SID !== undefined) {
    res.cookie('SID', req.cookies.SID, {
      path: '/',
      maxAge: 7 * 24 * 3600 * 1000,
      httpOnly: true,
    })
  }
  next() // <-- important!
})

app.get('/accounts/signin', (req, res) => {
  return res.redirect(domain || 'http://jaenal.mola.tv')
})

app.get('/accounts', (req, res) => {
  return res.redirect(domain || 'http://localhost:3000/')
})

app.get('/signout', (req, res) => {
  res.clearCookie('UID')
  res.clearCookie('SID')
  // res.clearCookie('_exp');
  return res.redirect(domain || 'http://jaenal.mola.tv')
})

//
// Register server-side rendering middleware
// -----------------------------------------------------------------------------
app.get('*', async (req, res, next) => {
  try {
    // global.clearInterval(inboxInterval);

    const css = new Set()

    // Enables critical path CSS rendering
    // https://github.com/kriasoft/isomorphic-style-loader
    const insertCss = (...styles) => {
      // eslint-disable-next-line no-underscore-dangle
      styles.forEach(style => css.add(style._getCss()))
    }

    const initialState = {
      user: req.user || {
        uid: req.cookies.UID === 'undefined' ? '' : req.cookies.UID,
        sid: req.cookies.SID === 'undefined' ? '' : req.cookies.SID,
        firstName: '',
        lastName: '',
        email: '',
        token: '',
        refreshToken: '',
        expire: '',
        type: '',
        lang: 'en',
      },
      runtime: {
        csrf: req.csrfToken(),
        // unread: count
      },
    }

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

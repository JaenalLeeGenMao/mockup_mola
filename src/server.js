/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import path from 'path';
import express from 'express';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import expressJwt, { UnauthorizedError as Jwt401Error } from 'express-jwt';
// import { graphql } from 'graphql';
import jwt from 'jsonwebtoken';
// import nodeFetch from 'node-fetch';
// import request from 'request';
import React from 'react';
import ReactDOM from 'react-dom/server';
import PrettyError from 'pretty-error';
import App from './components/App';
import Html from './components/Html';
import { ErrorPageWithoutStyle } from './routes/error/ErrorPage';
import errorPageStyle from './routes/error/ErrorPage.css';
// import createFetch from './createFetch';
// import passport from './passport';
import router from './router';
// import assets from './asset-manifest.json'; // eslint-disable-line import/no-unresolved
import chunks from './chunk-manifest.json'; // eslint-disable-line import/no-unresolved
import configureStore from './store/configureStore';
import { setRuntimeVariable } from './actions/runtime';
import { setUserVariable } from './actions/user';
import config from './config';
import Auth from '@api/auth';

process.on('unhandledRejection', (reason, p) => {
  console.error('Unhandled Rejection at:', p, 'reason:', reason);
  // send entire app down. Process manager will restart it
  process.exit(1);
});

//
// Tell any CSS tooling (such as Material UI) to use all vendor prefixes if the
// user agent is not known.
// -----------------------------------------------------------------------------
global.navigator = global.navigator || {};
global.navigator.userAgent = global.navigator.userAgent || 'all';

const app = express();

//
// If you are using proxy from external machine, you can set TRUST_PROXY env
// Default is to trust proxy headers only from loopback interface.
// -----------------------------------------------------------------------------
app.set('trust proxy', config.trustProxy);

//
// Register Node.js middleware
// -----------------------------------------------------------------------------
app.use(express.static(path.resolve(__dirname, 'public')));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//
// Authentication
// -----------------------------------------------------------------------------
app.use(
  expressJwt({
    secret: config.auth.jwt.secret,
    credentialsRequired: false,
    getToken: req => req.cookies.id_token
  })
);
// Error handler for express-jwt
app.use((err, req, res, next) => {
  // eslint-disable-line no-unused-vars
  if (err instanceof Jwt401Error) {
    console.error('[express-jwt-error]', req.cookies.id_token);
    // `clearCookie`, otherwise user can't use web-app until cookie expires
    res.clearCookie('id_token');
  }
  next(err);
});

// app.use(passport.initialize());

// app.get(
//   '/login/facebook',
//   passport.authenticate('facebook', {
//     scope: ['email', 'user_location'],
//     session: false,
//   }),
// );
// app.get(
//   '/login/facebook/return',
//   passport.authenticate('facebook', {
//     failureRedirect: '/login',
//     session: false,
//   }),
//   (req, res) => {
//     const expiresIn = 60 * 60 * 24 * 180; // 180 days
//     const token = jwt.sign(req.user, config.auth.jwt.secret, { expiresIn });
//     res.cookie('id_token', token, { maxAge: 1000 * expiresIn, httpOnly: true });
//     res.redirect('/');
//   },
// );
const domain = config.api.config.endpoints.domain;

app.get('/signout', (req, res) => {
  res.clearCookie('_at');
  res.clearCookie('_exp');
  return res.redirect(domain || 'http://jaenal.mola.tv');
});

//
// Register server-side rendering middleware
// -----------------------------------------------------------------------------
app.get('*', async (req, res, next) => {
  try {
    const css = new Set();

    // Enables critical path CSS rendering
    // https://github.com/kriasoft/isomorphic-style-loader
    const insertCss = (...styles) => {
      // eslint-disable-next-line no-underscore-dangle
      styles.forEach(style => css.add(style._getCss()));
    };

    // Universal HTTP client
    // const fetch = createFetch(nodeFetch, {
    //   baseUrl: config.api.serverUrl,
    //   cookie: req.headers.cookie,
    //   schema,
    //   graphql,
    // });

    const initialState = {
      user: req.user || {
        id: '',
        firstName: '',
        lastName: '',
        email: '',
        token: '',
        refreshToken: '',
        expire: '',
        type: '',
        lang: 'en'
      }
    };

    const store = configureStore(initialState);

    store.dispatch(setRuntimeVariable({ name: 'start', value: Date.now() }));
    store.dispatch(setUserVariable({ name: 'token', value: req.cookies._at || '' }));

    let apiCall;
    let result;
    let accessTokenLifespan = -1;
    const accessToken = req.cookies._at;
    const tokenExpiry = req.cookies._exp;
    const getUserInfo = async (token, updateCookie = true) => {
      apiCall = await Auth.getUserInfo(token);
      if (apiCall.meta.status === 'success') {
        result = { ...result, ...apiCall.data };
        Object.keys(result).forEach(function(key) {
          store.dispatch(setUserVariable({ name: key, value: result[key] }));
        });

        if (updateCookie) {
          const oneMonth = 30 * 24 * result.expire * 1000;
          res.cookie('_at', result.token, {
            maxAge: oneMonth,
            httpOnly: true
            // secure: !__DEV__,
          });
          res.cookie('_exp', oneMonth, {
            maxAge: oneMonth,
            httpOnly: true
            // secure: !__DEV__,
          });
        }
      }
    };

    if (accessToken && tokenExpiry) {
      accessTokenLifespan = tokenExpiry - Date.now() / 1000;
      if (accessTokenLifespan < 0) {
        res.cookie('_at', '', { expires: new Date(0) });
        res.cookie('_exp', '', { expires: new Date(0) });
        return res.redirect(req.originalUrl);
      } else if (accessTokenLifespan < 12 * 3600 * 1000) {
        // if lifespan of token is less than 12 hours then get new access token
        apiCall = await Auth.updateAuth(accessToken);

        if (apiCall.meta.status === 'success') {
          result = { ...apiCall.data };
          await getUserInfo(apiCall.data.token);
        }
      } else {
        /** GET EXISTING USER INFO  */
        await getUserInfo(accessToken, false);
      }
    } else if (req.query.code) {
      /** ON CLICK LOGIN  */
      apiCall = await Auth.getAuth({
        code: req.query.code,
        redirect_uri: domain || 'http://jaenal.mola.tv'
      });
      if (apiCall.meta.status === 'success') {
        result = { ...apiCall.data };
        await getUserInfo(apiCall.data.token);
      }
    }

    const userAgent = req.get('User-Agent');
    const isMobile = /iPhone|iPad|iPod|Android|PlayBook|Kindle Fire|PalmSource|Palm|IEMobile|BB10/i.test(
      userAgent
    );

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
      isMobile
    };

    const route = await router.resolve(context);

    if (route.redirect) {
      res.redirect(route.status || 302, route.redirect);
      return;
    }

    const data = { ...route };

    data.children = ReactDOM.renderToString(<App context={context}>{route.component}</App>);
    data.styles = [{ id: 'css', cssText: [...css].join('') }];

    const scripts = new Set();
    const addChunk = chunk => {
      if (chunks[chunk]) {
        chunks[chunk].forEach(asset => scripts.add(asset));
      } else if (__DEV__) {
        throw new Error(`Chunk with name '${chunk}' cannot be found`);
      }
    };
    addChunk('client');
    if (route.chunk) addChunk(route.chunk);
    if (route.chunks) route.chunks.forEach(addChunk);

    data.scripts = Array.from(scripts);
    data.app = {
      apiUrl: config.api.clientUrl,
      state: context.store.getState(),
      isMobile: context.isMobile
    };

    const html = ReactDOM.renderToStaticMarkup(<Html {...data} />);
    res.status(route.status || 200);
    res.send(`<!doctype html>${html}`);
  } catch (err) {
    next(err);
  }
});

//
// Error handling
// -----------------------------------------------------------------------------
const pe = new PrettyError();
pe.skipNodeFiles();
pe.skipPackage('express');

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  console.error(pe.render(err));
  const html = ReactDOM.renderToStaticMarkup(
    <Html
      title="Internal Server Error"
      description={err.message}
      styles={[{ id: 'css', cssText: errorPageStyle._getCss() }]} // eslint-disable-line no-underscore-dangle
    >
      {ReactDOM.renderToString(<ErrorPageWithoutStyle error={err} />)}
    </Html>
  );
  res.status(err.status || 500);
  res.send(`<!doctype html>${html}`);
});

//
// Launch the server
// -----------------------------------------------------------------------------
if (!module.hot) {
  app.listen(config.port, () => {
    console.info(`The server is running at http://localhost:${config.port}/`);
  });
}

//
// Hot Module Replacement
// -----------------------------------------------------------------------------
if (module.hot) {
  app.hot = module.hot;
  module.hot.accept('./router');
}

export default app;

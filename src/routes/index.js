/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

/* eslint-disable global-require */

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
      path: '/contact',
      load: () => import(/* webpackChunkName: 'contact' */ './contact'),
    },
    {
      path: '/accounts/login',
      load: () => import(/* webpackChunkName: 'accounts-login' */ './login'),
    },
    {
      path: '/register',
      load: () => import(/* webpackChunkName: 'register' */ './register'),
    },
    {
      path: '/about',
      load: () => import(/* webpackChunkName: 'about' */ './about'),
    },
    {
      path: '/privacy',
      load: () => import(/* webpackChunkName: 'privacy' */ './privacy'),
    },
    {
      path: '/admin',
      load: () => import(/* webpackChunkName: 'admin' */ './admin'),
    },
    // Movie details
    {
      path: '/movie-detail',
      load: () => import(/* webpackChunkName: 'admin' */ './movie-detail'),
      children: [
        {
          path: '/:id',
        }
      ]
    },
    // Movie Library
    {
      path: '/movie-library',
      load: () => import(/* webpackChunkName: 'admin' */ './movie-library'),
      children: [
        {
          path: '/:id',
        }
      ]
    },
    // Wildcard routes, e.g. { path: '(.*)', ... } (must go last)
    {
      path: '/history',
      load: () => import(/* webpackChunkName: 'history' */ './history'),
    },
    {
      path: '/search',
      load: () => import(/* webpackChunkName: 'search' */ './search'),
    },
    {
      path: '/accounts/profile',
      load: () => import(/* webpackChunkName: 'accounts-profile' */ './profile'),
    },
    // Movie-player
    {
      path: '/movie-player',
      load: () => import(/* webpackChunkName: 'movie-player' */ './movie-player'),
      children: [
        {
          path: '/:id',
        }
      ]
    },
    {
      path: '/forgotPassword',
      load: () => import(/* webpackChunkName: 'forgotPassword' */ './forgotPassword'),
    },
    {
      path: '/resetPassword',
      load: () => import(/* webpackChunkName: 'resetPassword' */ './resetPassword'),
    },
    {
      path: '/accounts/security',
      load: () => import(/* webpackChunkName: 'accounts-security' */ './security'),
    },
    {
      path: '/accounts/setting',
      load: () => import(/* webpackChunkName: 'accounts-setting' */ './setting'),
    },
    // Wildcard routes, e.g. { path: '(.*)', ... } (must go last)
    {
      path: '(.*)',
      load: () => import(/* webpackChunkName: 'not-found' */ './not-found'),
    },
  ],

  async action({ next }) {
    // Execute each child route until one of them return the result
    const route = await next();

    // Provide default values for title, description etc.
    route.title = `${route.title || 'Untitled Page'}`;
    route.description = route.description || '';
    return route;
  },
};

// The error page is available by permanent url for development mode
if (__DEV__) {
  routes.children.unshift({
    path: '/error',
    action: require('./error').default,
  });
}

export default routes;

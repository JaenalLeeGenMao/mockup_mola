/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import LoginMobile from './mobile/Login';
import LoginDesktop from './desktop/Login';
import Layout from '../../components/Layout';

const title = 'Log In';

function action({ isMobile }) {
  return {
    title,
    chunks: ['login'],
    component: isMobile ? (
      <Layout>
        <LoginMobile />
      </Layout>
    ) : (
      <Layout>
        <LoginDesktop />
      </Layout>
    )
  };
}

export default action;

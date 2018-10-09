/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import Layout from '../../components/Molalayout';
import ForgotDesktop from './desktop/Forgot';
import ForgotMobile from './mobile/Forgot';

const title = 'Forgot Password';

function action(isMobile) {
  return {
    chunks: ['forgotPassword'],
    title,
    component: isMobile.isMobile ? (
      <Layout>
        <ForgotMobile />
      </Layout>
    ) : (
      <Layout>
        <ForgotDesktop />
      </Layout>
    )
  };
}

export default action;

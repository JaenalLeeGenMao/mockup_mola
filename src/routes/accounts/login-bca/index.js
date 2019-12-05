/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react'
// import LoginMobile from './mobile/Login'
// import LoginDesktop from './desktop/Login'

import LoginBca from './login-bca'
import ReaderPromo from './reader-promo'

import Molalayout from '@components/Molalayout'

const title = 'Login BCA'
const description = 'Login to watch subscriptions bca'

function action({ isMobile }) {
  return {
    title,
    description,
    chunks: ['login-bca'],
    component: (
      <Molalayout>
        <ReaderPromo isMobile={isMobile} />
      </Molalayout>
    ),
  }
}

export default action

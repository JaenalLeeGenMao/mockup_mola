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

import Login from './login'

import Molalayout from '@components/Molalayout'
import MobileNavbar from '@components/MobileNavbar'

const title = 'Login'
const description = 'Login to watch premium HD videos'

function action({ isMobile }) {
  return {
    title,
    description,
    chunks: ['login'],
    component: (
      <Molalayout>
        <Login isMobile={isMobile} />
        {isMobile && <MobileNavbar routes={'accounts'} />}
      </Molalayout>
    ),
  }
}

export default action

/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react'
import Molalayout from '@components/Molalayout'
import RegisterDesktop from './desktop/Register'
import RegisterMobile from './mobile/Register'

const title = 'Register Page'
const description = 'New User Registration'

function action({ isMobile }) {
  return {
    chunks: ['register'],
    title,
    description,
    component: isMobile ? (
      <Molalayout>
        <RegisterMobile />
      </Molalayout>
    ) : (
      <Molalayout>
        <RegisterDesktop />
      </Molalayout>
    ),
  }
}

export default action

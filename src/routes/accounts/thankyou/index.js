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
import ThankyouDesktop from './desktop/Thankyou'
import ThankyouMobile from './mobile/Thankyou'

const title = 'Enjoy!'
const description = 'Your account has been verified'

function action({ isMobile }) {
  return {
    chunks: ['thankyou'],
    title,
    description,
    component: isMobile ? (
      <Molalayout>
        <ThankyouMobile />
      </Molalayout>
    ) : (
      <Molalayout>
        <ThankyouDesktop />
      </Molalayout>
    ),
  }
}

export default action

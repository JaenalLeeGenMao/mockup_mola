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
// import bcaSubscribeDesktop from './desktop/bca-subscribe'
import BcaSubscribeMobile from './mobile/bcaSubscribe'

const title = 'bca'
const description = 'Your Subscriptiona has been activated'

function action({ isMobile }) {
  return {
    chunks: ['bca-subscribe'],
    title,
    description,
    component: isMobile ? (
      <Molalayout>
        <BcaSubscribeMobile />
      </Molalayout>
    ) : (
      <Molalayout>
        <BcaSubscribeMobile />
      </Molalayout>
    ),
  }
}

export default action

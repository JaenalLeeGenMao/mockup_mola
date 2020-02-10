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
import BcaPromoMobile from './mobile/bcaPromo'

const title = 'bca'
const description = 'BCA promotion'

function action({ isMobile }) {
  return {
    chunks: ['bca-promo'],
    title,
    description,
    component: isMobile ? (
      <Molalayout>
        <BcaPromoMobile />
      </Molalayout>
    ) : (
      <Molalayout>
        <BcaPromoMobile />
      </Molalayout>
    ),
  }
}

export default action

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
import OrderedDesktop from './desktop/Ordered'
// import OrderedMobile from './mobile/Ordered'

const title = 'Order Status'
// const description = 'Your order has been verified'

function action({ isMobile }) {
  return {
    chunks: ['ordered'],
    title,
    component: (
      <Molalayout>
        <OrderedDesktop isMobile={isMobile} />
      </Molalayout>
    ),
  }
}

export default action

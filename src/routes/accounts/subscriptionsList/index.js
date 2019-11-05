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
import SubscriptionsListDesktop from './desktop/SubscriptionsList'
// import SubscriptionsMobile from './mobile/SubscriptionsList'

const title = 'Subscriptions'
const description = 'this is package list your packet'

function action({ isMobile }) {
  return {
    chunks: ['subscriptionsList'],
    title,
    description,
    component: isMobile ? (
      <Molalayout>
        <SubscriptionsListDesktop />
      </Molalayout>
    ) : (
      <Molalayout>
        <SubscriptionsListDesktop />
      </Molalayout>
    ),
  }
}

export default action

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
import ErrorPage from '@components/common/error'
import Compensation from './Compensation'
// import SubscriptionsMobile from './mobile/SubscriptionsList'

const title = 'Compensation'
const description = ''

function action({ isMobile, query }) {
  return {
    chunks: ['compensation'],
    title,
    description,
    component: isMobile ? (
      <Molalayout>
        <Compensation isMobile={isMobile} query={query} />
      </Molalayout>
    ) : (<ErrorPage status={404} />),
  }
}

export default action

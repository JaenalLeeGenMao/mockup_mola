/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react'
import LiveSupport from './live-support'
import NotFound from '../not-found/not-found'
import MolaLayout from '@components/Molalayout'

const title = 'Live Support'
const description = 'Watch TV Shows Online, Watch Movies Online or stream right to your smart TV, PC, Mac, mobile, tablet and more.'

async function action({ isMobile, store }) {
  return {
    title,
    description,
    chunks: ['live-support'],
    component: isMobile ? (
      <MolaLayout>
        <LiveSupport />
      </MolaLayout>
    ) : (
      <MolaLayout>
        <NotFound title={'Page Not Found'} />
      </MolaLayout>
    ),
  }
}

export default action

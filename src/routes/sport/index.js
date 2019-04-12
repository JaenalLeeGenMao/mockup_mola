/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react'
import SportDesktop from './desktop'
import SportMobile from './mobile'
import MolaLayout from '@components/Molalayout'

const title = 'Sport'
const description = 'Watch TV Shows Online, Watch Movies Online or stream right to your smart TV, PC, Mac, mobile, tablet and more.'

async function action({ isMobile, store }) {
  return {
    title,
    description,
    chunks: ['sport'],
    component: isMobile ? (
      <MolaLayout>
        <SportMobile {...store} />
      </MolaLayout>
    ) : (
      <MolaLayout>
        <SportDesktop {...store} />
      </MolaLayout>
    ),
  }
}

export default action

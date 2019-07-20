/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react'
import HomeDesktop from './desktop'
import HomeMobile from './mobile'
import MolaLayout from '@components/Molalayout'
import _ from 'lodash'

const title = 'Homepage'
const description = 'Watch TV Shows Online, Watch Movies Online or stream right to your smart TV, PC, Mac, mobile, tablet and more.'

async function action({ isMobile, store, pathname }) {
  return {
    title,
    description,
    chunks: ['home'],
    component: isMobile ? (
      <MolaLayout>
        <HomeMobile {...store} />
      </MolaLayout>
    ) : (
      <MolaLayout>
        <HomeDesktop {...store} />
      </MolaLayout>
    ),
  }
}

export default action

/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react'
import MolaLayout from '@components/Molalayout'
import Feature from './feature'
import _ from 'lodash'

const title = 'Landing page'
const description = 'Watch TV Shows Online, Watch Movies Online or stream right to your smart TV, PC, Mac, mobile, tablet and more.'

async function action({ isMobile, store, pathname }) {
  const featureId = _.get(pathname.split('/'), '[2]', '')

  return {
    title,
    description,
    chunks: ['libraries'],
    component: (
      <MolaLayout>
        <Feature {...store} id={featureId} isMobile={isMobile} pathname={pathname} />
      </MolaLayout>
    ),
  }
}

export default action

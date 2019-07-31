/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react'
import Layout from '@components/Molalayout'
import Privacy from './privacy'

// import Page from '../../components/Page'
// import privacy from './privacy.md'

const title = 'Privacy Page'
const description = 'Privacy Policy'

function action({ isMobile, query }) {
  const noHeader = query.noHeader ? true : false
  return {
    chunks: ['privacy'],
    title,
    description,
    component: (
      <Layout>
        <Privacy isMobile={isMobile} noHeader={noHeader} />
      </Layout>
    ),
  }
}

export default action

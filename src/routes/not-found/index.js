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
import NotFound from './not-found'

const title = 'Page Not Found'
const description = 'Missing page'

function action() {
  return {
    chunks: ['not-found'],
    title,
    description,
    component: (
      <Layout>
        <NotFound title={title} />
      </Layout>
    ),
    status: 404,
  }
}

export default action

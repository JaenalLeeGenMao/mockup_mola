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
import Page from '../../components/Page'
import about from './about.md'

const title = 'About Page'
const description = 'Daily dose of Mola TV'

function action() {
  return {
    chunks: ['about'],
    title,
    description,
    component: (
      <Layout>
        <Page {...about} />
      </Layout>
    ),
  }
}

export default action

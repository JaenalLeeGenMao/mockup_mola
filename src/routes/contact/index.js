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
import Contact from './Contact'

const title = 'Contact Page'
const description = 'List of Contacts'

function action() {
  return {
    chunks: ['contact'],
    title,
    description,
    component: (
      <Layout>
        <Contact title={title} />
      </Layout>
    ),
  }
}

export default action

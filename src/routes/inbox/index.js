/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react'
import InboxMobile from './mobile/Inbox'
import InboxDesktop from './desktop/Inbox'
import Molalayout from '@components/Molalayout'

const title = 'Inbox'
const description = 'Notification gets easier with Mola TV news'

function action({ isMobile }) {
  return {
    title,
    description,
    chunks: ['inbox'],
    component: isMobile ? (
      <Molalayout>
        <InboxMobile isMobile={isMobile} />
      </Molalayout>
    ) : (
      <Molalayout>
        <InboxDesktop isMobile={isMobile} />
      </Molalayout>
    ),
  }
}

export default action

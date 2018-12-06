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

function action({ isMobile }) {
  return {
    title,
    chunks: ['inbox'],
    component: isMobile ? (
      <Molalayout>
        <InboxMobile />
      </Molalayout>
    ) : (
      <Molalayout>
        <InboxDesktop />
      </Molalayout>
    ),
  }
}

export default action

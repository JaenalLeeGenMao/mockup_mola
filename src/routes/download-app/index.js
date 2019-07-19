/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react'
import DownloadApp from './downloadApp'
import MolaLayout from '@components/Molalayout'

async function action({ pathname }) {
  const pathnameArr = pathname.split('/'),
    id = pathnameArr[2]
  return {
    title: 'Mola TV - Download App',
    description: 'Watch TV Shows Online, Watch Movies Online or stream right to your smart TV, PC, Mac, mobile, tablet and more.',
    chunks: ['download-app'],
    component:
      <MolaLayout>
        <DownloadApp videoId={id} />
      </MolaLayout>
  }
}

export default action

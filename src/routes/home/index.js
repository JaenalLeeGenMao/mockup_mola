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
import MobileNavbar from '@components/MobileNavbar'

const title = 'Homepage'
const description =
  'Watch TV Shows Online, Watch Movies Online or stream right to your smart TV, PC, Mac, mobile, tablet and more.'

async function action({ isMobile, store, pathname }) {
  const Home = isMobile ? HomeMobile : HomeDesktop
  return {
    title,
    description,
    chunks: ['home'],
    component: (
      <MolaLayout>
        <Home {...store} pathname={pathname} isMobile={isMobile} />
        {isMobile && <MobileNavbar routes={'home'} />}
      </MolaLayout>
    ),
  }
}

export default action

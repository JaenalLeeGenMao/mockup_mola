import React from 'react'

import MolaLayout from '@components/Molalayout'
import Notifications from './notifications'
import NotFound from '../not-found/not-found'
// import Mola from '@api/mola'

async function action({ isMobile }) {
  return {
    chunks: ['notifications'],
    title: '',
    description: '',
    image: '',
    url: '',
    component: isMobile ? (
      <MolaLayout>
        <Notifications />
      </MolaLayout>
    ) : (
      <MolaLayout>
        {/* <NotFound title={'Page Not Found'} /> */}
        <Notifications />
      </MolaLayout>
    ),
  }
}

export default action

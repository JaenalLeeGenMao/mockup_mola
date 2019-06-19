import React from 'react'

import MolaLayout from '@components/Molalayout'

import ChannelsDesktop from './desktop'
import ChannelsMobile from './mobile'

async function action({ isMobile }) {
  return {
    chunks: ['channels'],
    title: '',
    description: '',
    image: '',
    url: '',
    component: isMobile ? (
      <MolaLayout>
        <ChannelsMobile />
      </MolaLayout>
    ) : (
      <MolaLayout>
        <ChannelsDesktop />
      </MolaLayout>
    ),
  }
}

export default action

import React from 'react'

import MolaLayout from '@components/Molalayout'

import ChannelsDesktop from './desktop'
import ChannelsMobile from './mobile'

async function action({ isMobile, pathname }) {
  const pathnameArr = pathname.split('/');
  const pathId = pathnameArr.length === 3 ? pathnameArr[pathnameArr.length - 1] : '';

  return {
    chunks: ['channels'],
    title: '',
    description: '',
    image: '',
    url: '',
    component: isMobile ? (
      <MolaLayout>
        <ChannelsMobile pathId={pathId} />
      </MolaLayout>
    ) : (
        <MolaLayout>
          <ChannelsDesktop pathId={pathId} />
        </MolaLayout>
      ),
  }
}

export default action

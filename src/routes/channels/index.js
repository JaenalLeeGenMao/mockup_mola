import React from 'react'
import _ from 'lodash'

import MolaLayout from '@components/Molalayout'
import MobileNavbar from '@components/MobileNavbar'

import ChannelsDesktop from './desktop'
import ChannelsMobile from './mobile'

async function action({ isMobile, pathname }) {
  const pathnameArr = pathname.split('/')
  const movieId =
    pathnameArr.length === 3 && pathnameArr[pathnameArr.length - 1] ? pathnameArr[pathnameArr.length - 1] : ''
  const routes = _.get(pathname.split('/'), '[1]', 'channels')

  return {
    chunks: ['channels'],
    title: 'Channels',
    description: '',
    image: '',
    url: '',
    component: isMobile ? (
      <MolaLayout>
        <ChannelsMobile movieId={movieId} pathname={pathname} />
        <MobileNavbar routes={routes} />
      </MolaLayout>
    ) : (
      <MolaLayout>
        <ChannelsDesktop movieId={movieId} pathname={pathname} />
      </MolaLayout>
    ),
  }
}

export default action

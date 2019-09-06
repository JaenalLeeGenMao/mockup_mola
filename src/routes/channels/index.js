import React from 'react'

import MolaLayout from '@components/Molalayout'

import ChannelsDesktop from './desktop'
import ChannelsMobile from './mobile'

async function action({ isMobile, pathname }) {
  const pathnameArr = pathname.split('/')
  const movieId =
    pathnameArr.length === 3 && pathnameArr[pathnameArr.length - 1] ? pathnameArr[pathnameArr.length - 1] : ''
  // const today = moment().format('YYYYMMDD')
  // await store.dispatch(fetchChannelPlaylists()).then(() => store.dispatch(fetchChannelSchedule(today)))
  return {
    chunks: ['channels'],
    title: 'Channels',
    description: '',
    image: '',
    url: '',
    component: isMobile ? (
      <MolaLayout>
        <ChannelsMobile movieId={movieId} pathname={pathname} />
      </MolaLayout>
    ) : (
      <MolaLayout>
        <ChannelsDesktop movieId={movieId} pathname={pathname} />
      </MolaLayout>
    ),
  }
}

export default action

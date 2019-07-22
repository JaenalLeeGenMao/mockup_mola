import React from 'react'
import MolaLayout from '@components/Molalayout'
import PlaylistDesktop from './playlist'

const title = 'Playlist Page'
const description = 'This is playlist page'

function action({ isMobile, store, pathname }) {
  const pathnameArr = pathname.split('/')
  const playlistId = pathnameArr.length === 3 ? pathnameArr[pathnameArr.length - 1] : ''
  return {
    chunks: ['playlist'],
    title,
    description,
    component: (
      <MolaLayout>
        <PlaylistDesktop playlistId={playlistId} title={title} />
      </MolaLayout>
    ),
  }
}

export default action

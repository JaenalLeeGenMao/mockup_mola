import React from 'react'

import MolaLayout from '@components/Molalayout'

import ChannelsDesktop from './desktop'

async function action({ isMobile, pathname, query }) {
  const pathnameArr = pathname.split('/'),
    id = pathnameArr[2]

  return {
    chunks: ['channels'],
    title: '',
    description: '',
    image: '',
    url: '',
    component: isMobile ? (
      <MolaLayout>
        {/* <MovieDetailMobile pathLoc={pathnameArr[1]} movieId={id} urlParams={query} /> */}
      </MolaLayout>
    ) : (
        <MolaLayout>
          <ChannelsDesktop />
        </MolaLayout>
      ),
  }
}

export default action

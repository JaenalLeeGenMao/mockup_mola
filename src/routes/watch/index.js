import React from 'react'
import MolaLayout from '@components/Molalayout'
import WatchError from '@components/common/error'
import Watch from './watch'

function action({ query, isMobile }) {
  let id = query.v
  var resultUrl = id ? id.split('u0026') : []

  if (resultUrl.length > 0) {
    id = resultUrl[0]
  }
  const isAutoPlay = query.autoplay ? query.autoplay : 0
  return {
    chunks: ['watch'],
    title: '',
    description: '',
    component: (
      <MolaLayout>
        {id ? (
          <Watch isMobile={isMobile} isAutoPlay={isAutoPlay} videoId={id} />
        ) : (
          <WatchError status={404} message={'Sorry, the page you were trying to view does not exist.'} />
        )}
      </MolaLayout>
    ),
  }
}

export default action

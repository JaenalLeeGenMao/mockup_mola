import React from 'react'
import MolaLayout from '@components/Molalayout'
import Watch from './watch'

function action({ query, isMobile }) {
  let id = query.v
  var resultUrl = id.split('u0026')

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
        <Watch isMobile={isMobile} isAutoPlay={isAutoPlay} videoId={id} />
      </MolaLayout>
    ),
  }
}

export default action

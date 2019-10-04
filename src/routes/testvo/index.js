import React from 'react'
import MolaLayout from '@components/Molalayout'
import Watch from './watch'

function action({ query, isMobile }) {
  const id = query.v
  const isAutoPlay = query.autoplay ? query.autoplay : 0
  return {
    chunks: ['testvo'],
    title: '',
    description: '',
    component: (
      <MolaLayout>
        <Watch isMobile={false} isAutoPlay={isAutoPlay} videoId={id} />
      </MolaLayout>
    ),
  }
}

export default action

import React from 'react'
import MolaLayout from '@components/Molalayout'
import Watch from './watch'

function action({ query, isMobile }) {
  const id = query.v
  return {
    chunks: ['watch-sport'],
    title: '',
    description: '',
    component: (
      <MolaLayout>
        <Watch isMobile={isMobile} videoId={id} />
      </MolaLayout>
    ),
  }
}

export default action

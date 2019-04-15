import React from 'react'
import MolaLayout from '@components/Molalayout'
import SwitchChannelsDesktop from './switch-channels'

const title = 'Search Page'
const description = 'Search your favourite movies via Mola'

function action({ query }) {
  return {
    chunks: ['switch-channels'],
    title,
    description,
    component: (
      <MolaLayout>
        <SwitchChannelsDesktop title={title} />
      </MolaLayout>
    ),
  }
}

export default action

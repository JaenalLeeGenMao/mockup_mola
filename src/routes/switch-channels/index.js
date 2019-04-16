import React from 'react'
import MolaLayout from '@components/Molalayout'
import SwitchChannelsDesktop from './switch-channels'

const title = 'Switch Channels Page'
const description = 'Choose your favourite movies channels via Mola'

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

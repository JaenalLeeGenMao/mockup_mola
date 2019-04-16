import React from 'react'
import MolaLayout from '@components/Molalayout'
import Matches from './matches'

const title = 'Match List Page'
const description = 'Choose your favourite Matches via Mola'

function action({ query }) {
  return {
    chunks: ['matches'],
    title,
    description,
    component: (
      <MolaLayout>
        <Matches title={title} />
      </MolaLayout>
    ),
  }
}

export default action

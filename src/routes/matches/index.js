import React from 'react'
import MolaLayout from '@components/Molalayout'
import MatchesDesktop from './desktop'
import MatchesMobile from './mobile'

const title = 'Match List Page'
const description = 'Choose your favourite Matches via Mola'

function action({ isMobile, store, pathname }) {
  return {
    chunks: ['matches'],
    title,
    description,
    component: isMobile ? (
      <MolaLayout>
        <MatchesMobile {...store} pathname={pathname} />
      </MolaLayout>
    ) : (
      <MolaLayout>
        <MatchesDesktop title={title} pathname={pathname} />
      </MolaLayout>
    ),
  }
}

export default action

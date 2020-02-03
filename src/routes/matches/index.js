import React from 'react'
import MolaLayout from '@components/Molalayout'
import _ from 'lodash'

import MobileNavbar from '@components/MobileNavbar'
import MatchesDesktop from './desktop'
import MatchesMobile from './mobile'

const title = 'Match List Page'
const description = 'Choose your favourite Matches via Mola'

function action({ isMobile, store, pathname }) {
  const routes = _.get(pathname.split('/'), '[1]', 'matches')

  return {
    chunks: ['matches'],
    title,
    description,
    component: isMobile ? (
      <MolaLayout>
        <MatchesMobile {...store} pathname={pathname} />
        <MobileNavbar routes={routes} />
      </MolaLayout>
    ) : (
      <MolaLayout>
        <MatchesDesktop title={title} pathname={pathname} />
      </MolaLayout>
    ),
  }
}

export default action

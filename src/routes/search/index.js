import React from 'react'
import _ from 'lodash'

import MolaLayout from '@components/Molalayout'
import MobileNavbar from '@components/MobileNavbar'
import SearchDesktop from './Search'

const title = 'Search Page'
const description = 'Search your favourite movies via Mola'

function action({ query, isMobile, pathname }) {
  const qs = query.q ? query.q : ''
  const routes = _.get(pathname.split('/'), '[1]', 'search')

  return {
    chunks: ['search'],
    title,
    description,
    component: (
      <MolaLayout>
        <SearchDesktop title={title} searchKeyword={qs} isMobile={isMobile} pathname={pathname} />
        {isMobile && <MobileNavbar routes={routes} />}
      </MolaLayout>
    ),
  }
}

export default action

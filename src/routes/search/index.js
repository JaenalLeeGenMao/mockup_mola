import React from 'react'
import MolaLayout from '@components/Molalayout'
import SearchDesktop from './Search'

const title = 'Search Page'
const description = 'Search your favourite movies via Mola'

function action({ query, isMobile }) {
  const qs = query.q ? query.q : ''
  return {
    chunks: ['search'],
    title,
    description,
    component: (
      <MolaLayout>
        <SearchDesktop title={title} searchKeyword={qs} isMobile={isMobile} />
      </MolaLayout>
    ),
  }
}

export default action

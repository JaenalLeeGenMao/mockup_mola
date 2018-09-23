import React from 'react'
import Layout from '../../components/Layout'
import SearchDesktop from './desktop/Search'
import SearchMobile from './mobile/Search'

const title = 'Search'

function action({ isMobile, query }) {
  const qs = query.q ? query.q : '';
  return {
    chunks: ['search'],
    title,
    component: (
      isMobile ?
        (<Layout>
          <SearchMobile title={title} searchKeyword={qs} />
        </Layout>)
        :
        (<Layout>
          <SearchDesktop title={title} searchKeyword={qs} />
        </Layout>
        )
    ),
  }
}

export default action

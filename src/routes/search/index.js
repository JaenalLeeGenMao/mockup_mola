import React from 'react'
import Layout from '../../components/Layout'
import Search from './Search'

const title = 'Search'

function action({ isMobile, query }) {
  const qs = query.q ? query.q : '';
  return {
    chunks: ['search'],
    title,
    component: (
      <Layout>
        <Search title={title} isMobile={isMobile} searchKeyword={qs} />
      </Layout>
    ),
  }
}

export default action

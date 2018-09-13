import React from 'react'
import Layout from '../../components/Layout'
import Search from './Search'

const title = 'Search'

function action({ isMobile }) {
  return {
    chunks: ['search'],
    title,
    component: (
      <Layout>
        <Search title={title} isMobile={isMobile} />
      </Layout>
    ),
  }
}

export default action

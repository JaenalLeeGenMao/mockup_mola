import React from 'react'
import Layout from '@components/Molalayout'
import History from './History'

const title = 'History'
const description = 'Your Favourite TV Shows history Online, History of Watched Movies Online'

function action({ isMobile }) {
  return {
    chunks: ['history'],
    title,
    description,
    component: (
      <Layout>
        <History isMobile={isMobile} />
      </Layout>
    ),
  }
}

export default action

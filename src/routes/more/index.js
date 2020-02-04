import React from 'react'
import Layout from '@components/Molalayout'
import MoreMobile from './mobile'
import MoreDesktop from './desktop'
import MobileNavbar from '@components/MobileNavbar'

const title = 'More'
const description = 'More page'

function action({ store, isMobile }) {
  return {
    chunks: ['more'],
    title,
    description,
    component: (
      <Layout>
        {isMobile && (
          <>
            <MoreMobile isMobile={isMobile} />
            <MobileNavbar routes={'more'} />
          </>
        )}
      </Layout>
    ),
    status: 404,
  }
}

export default action

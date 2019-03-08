import React from 'react'
import Container from './container'
import Profile from './profile'

import MolaLayout from '@components/Molalayout'

const title = 'Profile Page'
const description = 'Accounts and Personal Management'
function action({ isMobile, query }) {
  return {
    chunks: ['profile'],
    title,
    description,
    component: (
      <MolaLayout>
        <Profile isMobile={isMobile} query={query} />
      </MolaLayout>
    ),
  }
}

export default action

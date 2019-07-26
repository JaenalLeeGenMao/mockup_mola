import React from 'react'
import Profile from './profile'

import MolaLayout from '@components/Molalayout'

const title = 'Profile Page'
const description = 'Accounts and Personal Management'
function action({ isMobile, query, pathname }) {
  return {
    chunks: ['profile'],
    title,
    description,
    component: (
      <MolaLayout>
        <Profile isMobile={isMobile} query={query} pathname={pathname} />
      </MolaLayout>
    ),
  }
}

export default action

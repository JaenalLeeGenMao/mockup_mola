import React from 'react'
import Container from './container'

import MolaLayout from '@components/Molalayout'

const title = 'Profile Page'
const description = 'Accounts and Personal Management'
function action({ isMobile }) {
  return {
    chunks: ['profile'],
    title,
    description,
    component: (
      <MolaLayout>
        <Container isMobile={isMobile} />
      </MolaLayout>
    ),
  }
}

export default action

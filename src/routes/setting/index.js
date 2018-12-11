import React from 'react'
import Container from './container'

import MolaLayout from '@components/Molalayout'

const title = 'Setting Page'
const description = 'allows users flexibility to maintain accounts'

function action({ isMobile }) {
  return {
    chunks: ['setting'],
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

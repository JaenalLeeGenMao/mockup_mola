import React from 'react'
import Container from './container'

import MolaLayout from '@components/Molalayout'

const title = 'Security Page'
const description = 'Mola keeps your privacy 100% secured'

function action({ isMobile }) {
  return {
    chunks: ['security'],
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

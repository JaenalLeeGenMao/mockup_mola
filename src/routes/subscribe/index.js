import React from 'react'
import Subscribe from './subscribe'

import MolaLayout from '@components/Molalayout'

const title = 'Subscribe Page'
const description = 'Info Usage OS details'

async function action({ isMobile }) {
  return {
    chunks: ['subscribe'],
    title,
    description,
    component: (
      <MolaLayout>
        <Subscribe isMobile={isMobile} />
      </MolaLayout>
    ),
  }
}

export default action

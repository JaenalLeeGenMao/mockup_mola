import React from 'react'
import Conditions from './conditions'

import MolaLayout from '@components/Molalayout'

const title = 'Conditions Page'
const description = 'Info Usage OS details'

async function action({ isMobile }) {
  return {
    chunks: ['conditions'],
    title,
    description,
    component: (
      <MolaLayout>
        <Conditions isMobile={isMobile} />
      </MolaLayout>
    ),
  }
}

export default action

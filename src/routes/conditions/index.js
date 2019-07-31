import React from 'react'
import Conditions from './conditions'

import MolaLayout from '@components/Molalayout'

const title = 'Conditions Page'
const description = 'Info Usage OS details'

async function action({ isMobile, query }) {
  const noHeader = query.noHeader ? true : false
  return {
    chunks: ['conditions'],
    title,
    description,
    component: (
      <MolaLayout>
        <Conditions isMobile={isMobile} noHeader={noHeader} />
      </MolaLayout>
    ),
  }
}

export default action

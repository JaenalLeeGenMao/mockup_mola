import React from 'react'
import Terms from './terms'

import MolaLayout from '@components/Molalayout'

const title = 'Terms Page'
const description = 'Info Usage OS details'

async function action({ isMobile, query }) {
  const noHeader = query.noHeader ? true : false
  return {
    chunks: ['terms'],
    title,
    description,
    component: (
      <MolaLayout>
        <Terms isMobile={isMobile} noHeader={noHeader} />
      </MolaLayout>
    ),
  }
}

export default action

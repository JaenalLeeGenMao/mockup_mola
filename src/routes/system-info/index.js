import React from 'react'
import SystemInfo from './system-info'

import MolaLayout from '@components/Molalayout'

const title = 'SystemInfo Page'
const description = 'Info Usage OS details'

async function action({ isMobile }) {
  return {
    chunks: ['system-info'],
    title,
    description,
    component: (
      <MolaLayout>
        <SystemInfo isMobile={isMobile} />
      </MolaLayout>
    ),
  }
}

export default action

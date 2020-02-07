import React from 'react'
import Promo from './promo'
import MolaLayout from '@components/Molalayout'

const title = 'promo'

async function action({ isMobile }) {
  return {
    chunks: ['promo'],
    title,
    component: (
      <MolaLayout>
        <Promo isMobile={isMobile} />
      </MolaLayout>
    ),
  }
}

export default action

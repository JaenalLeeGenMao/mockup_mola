import React from 'react'
import SubscribeDetail from './subscribe-detail'
import MolaLayout from '@components/Molalayout'

const title = 'SubscribeDetail Page'
const description = 'Info Usage OS details'

async function action({ isMobile, pathname }) {
  const pathnameArr = pathname.split('/')
  return {
    chunks: ['subscribe-detail'],
    title,
    description,
    component: (
      <MolaLayout>
        <SubscribeDetail isMobile={isMobile} subscribeId={pathnameArr[2]} />
      </MolaLayout>
    ),
  }
}

export default action

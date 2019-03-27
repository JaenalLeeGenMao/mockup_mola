import React from 'react'
import HistoryTransactions from './history-transactions'

import MolaLayout from '@components/Molalayout'

const title = 'History Transaction Page'
const description = 'Info Transactions'

async function action({ isMobile }) {
  return {
    chunks: ['history-transactions'],
    title,
    description,
    component: (
      <MolaLayout>
        <HistoryTransactions isMobile={isMobile} />
      </MolaLayout>
    ),
  }
}

export default action

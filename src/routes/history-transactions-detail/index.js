import React from 'react'
import HistoryTransactionsDetail from './history-transactions-detail'

import MolaLayout from '@components/Molalayout'

const title = 'History Transaction Detail Page'
const description = 'Info Transactions Detail'

async function action({ isMobile }) {
  return {
    chunks: ['history-transactions-detail'],
    title,
    description,
    component: (
      <MolaLayout>
        <HistoryTransactionsDetail isMobile={isMobile} />
      </MolaLayout>
    ),
  }
}

export default action

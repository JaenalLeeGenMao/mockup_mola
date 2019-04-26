import React from 'react'
import HistoryTransactions from './history-transactions'
import HistoryTransactionsDetail from './detail'

import MolaLayout from '@components/Molalayout'

const title = 'History Transaction Page'
const description = 'Info Transactions'

async function action({ isMobile, pathname }) {
  const orderId = pathname.split('/')[2]
  return {
    chunks: ['history-transactions'],
    title,
    description,
    component: <MolaLayout>{orderId ? <HistoryTransactionsDetail isMobile={isMobile} orderId={orderId} /> : <HistoryTransactions isMobile={isMobile} />}</MolaLayout>,
  }
}

export default action

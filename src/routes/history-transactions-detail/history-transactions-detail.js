import React, { Component } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'

import withStyles from 'isomorphic-style-loader/lib/withStyles'
import HeaderSubscribe from '@components/Header'

import styles from './history-transactions-detail.css'
import { getLocale } from './locale'
import { SIGVTALRM } from 'constants'

class HistoryTransactionsDetail extends Component {
  state = {
    info: null,
    locale: getLocale(),
  }

  render() {
    const { data, locale } = this.state
    return (
      <div className={styles.historyTransactions_container}>
        <div className={styles.historyTransactions_Pagetitle}>Detail tanda terima 2133837440873487 {/* get id ovrhre*/}</div>
        <div className={styles.historyTransaction_borderline} />
        <div className={styles.historyTransaction_gridcontainer}>
          <div className={styles.historyTransactions_columngrid}>
            <div>Tanggal</div>
            <span>14/01/19</span>
            <div>Nomor referensi</div>
            <span>2133837440873487</span>
            <div>Metode pembayaran</div>
            <span>Card ( **** **** **** 1234 )</span>
            <div>Pengecer</div>
            <span>MOLA</span>
            <div>Paket Produk</div>
            <span>MOLA Premium</span>
            <div>Total</div>
            <span>IDR 139,000</span>
            <div />
          </div>
        </div>
      </div>
    )
  }
}

export default withStyles(styles)(HistoryTransactionsDetail)

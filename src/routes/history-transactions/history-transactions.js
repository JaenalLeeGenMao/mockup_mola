import React, { Component } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import Mola from '@api/mola'

import withStyles from 'isomorphic-style-loader/lib/withStyles'
import HeaderSubscribe from '@components/Header'

import styles from './history-transactions.css'
import { getLocale } from './locale'

class HistoryTransactions extends Component {
  constructor(props) {
    super(props)
    this.state = { data: [] }
  }
  state = {
    info: null,
  }
  componentDidMount() {
    this.getOrderHistoryTransactions()
  }

  getOrderHistoryTransactions = async () => {
    const { uid: userId, token } = this.props.user
    const getHistoryTrans = await Mola.getOrderHistoryTransactions({
      uid: userId,
      token,
    })
    console.log(getHistoryTrans)
  }

  render() {
    const { data, locale, info = null, userId, token } = this.state
    console.log(this.props.user)
    return (
      <div className={styles.historyTransactions_container}>
        <div className={styles.historyTransactions_Pagetitle}>Riwayat tanda terima berlangganan</div>
        <div className={styles.historyTransaction_borderline} />
        <div className={styles.historyTransaction_gridcontainer}>
          <div className={styles.historyTransactions_columngrid}>
            <div>Tanggal</div>
            <div>No.Referensi</div>
            <div>Harga</div>
            <div />
          </div>
          {info !== null && (
            <div className={styles.historyTransaction_valuelistitem}>
              <div> 14/01/19</div>
              <div>{info.token}</div>
              <div>IDR 139,000</div>
              <div>
                <span>
                  <a href="history-transactions-detail" className={styles.historyTransaction_viewlinkdetail}>
                    Lihat
                  </a>
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    ...state,
  }
}

export default compose(withStyles(styles), connect(mapStateToProps))(HistoryTransactions)

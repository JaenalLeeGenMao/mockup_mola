import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'

import withStyles from 'isomorphic-style-loader/lib/withStyles'
import HeaderSubscribe from '@components/Header'
import Mola from '@api/mola'
import moment from 'moment'

import styles from './history-transactions-detail.css'
import { getLocale } from './locale'
import { SIGVTALRM } from 'constants'
import Axios from 'axios'
import Header from '@components/Header'

class HistoryTransactionsDetail extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: [],
    }
  }

  componentDidMount() {
    // print(this.props.user.token)
    Axios.get(`/api/v2/orders/${this.props.orderId}`, {
      headers: {
        Authorization: `Bearer ${this.props.user.token}`,
      },
      body: {
        app_id: 2,
      },
    })
      .then(response => {
        // console.log(response)
        if (response.data.data.length > 0) {
          this.setState({
            data: response.data.data,
          })
        }
      })
      .catch(error => {
        console.error(error)
      })
  }

  componentDidUpdate() {
    // console(this.state.data.data)
    // console.log(this.state.response.data.data.data.attributes.paymentMethod)
    console.log(this.state.data)
  }

  render() {
    const { data } = this.state
    const isDark = false
    return (
      <Fragment>
        <div className={styles.headerContainer}>
          <Header stickyOff isDark={isDark} logoOff libraryOff backButtonOn {...this.props} />
        </div>
        <div className={styles.root}>
          <div className={styles.historyTransactionsDetail_container}>
            <div className={styles.historyTransaactionsDetail_wrappergrid}>
              <span />
              <div className={styles.historyTransactionsDetail_wrappercontent_center}>
                <div className={styles.historyTransactionsDetail_Pagetitle}>Detail tanda terima {this.props.orderId}</div>
                <div className={styles.historyTransactionDetail_borderline} />
                <div className={styles.historyTransactionDetail_gridcontainer}>
                  {data.map((rowData, i) => (
                    <div className={styles.historyTransactionsDetail_columngrid} key={i}>
                      <div>Tanggal</div>
                      <span>{moment(rowData.attributes.paidAt).format('L')}</span>
                      <div>Nomor referensi</div>
                      <span>{rowData.attributes.orderId}</span>
                      <div>Metode pembayaran</div>
                      <span>{rowData.attributes.paymentMethodName === null ? '-' : rowData.attributes.paymentMethodName}</span>
                      <div>Paket Produk</div>
                      <span>No ads</span>
                      <div>Total</div>
                      <span>IDR {rowData.attributes.totalPrice}</span>
                      <div />
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <span />
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    )
  }
}
const mapStateToProps = state => {
  return {
    ...state,
  }
}

export default compose(withStyles(styles), connect(mapStateToProps))(HistoryTransactionsDetail)

import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import Mola from '@api/mola'

import withStyles from 'isomorphic-style-loader/lib/withStyles'
import HeaderSubscribe from '@components/Header'
import moment from 'moment'

import styles from './history-transactions.css'
import { getLocale } from './locale'
import LazyLoad from '@components/common/Lazyload'
import Header from '@components/Header'

class HistoryTransactions extends Component {
  constructor(props) {
    super(props)

    this.state = {
      data: [],
    }
  }

  async componentDidMount() {
    const result = await this.getOrderHistoryTransactions()

    if (result.length > 0) {
      this.setState({
        data: result,
      })
    }
  }

  getOrderHistoryTransactions = async () => {
    const { uid: userId, token } = this.props.user

    const getHistoryTrans = await Mola.getOrderHistoryTransactions({
      uid: userId,
      token,
    })

    return getHistoryTrans.meta.status === 'success' ? getHistoryTrans.data : []
  }

  render() {
    const { data, print } = this.state
    // console.log(data)
    const isDark = false
    return (
      <Fragment>
        <div className={styles.headerContainer}>
          <Header stickyOff isDark={isDark} logoOff libraryOff backButtonOn {...this.props} />
        </div>
        <div className={styles.root}>
          <div className={styles.historyTransactions_container}>
            <div className={styles.historyTransaactions_wrappergrid}>
              <span />
              <div className={styles.historyTransactions_wrappercontent_center}>
                <div className={styles.historyTransactions_Pagetitle}>Riwayat tanda terima berlangganan</div>
                <div className={styles.historyTransaction_borderline} />
                <div className={styles.historyTransaction_gridcontainer}>
                  <div className={styles.historyTransactions_columngrid}>
                    <div>Tanggal</div>
                    <div>No.Referensi</div>
                    <div>Harga</div>
                    <div>Status</div>
                    <div />
                  </div>
                  {data.map((rowData, i) => (
                    <LazyLoad key={i} containerClassName={styles.historyTransaction_valuelistitem}>
                      {rowData.id !== null ? (
                        <div className={styles.wrapperData}>
                          <div>{moment(rowData.attributes.paidAt).format('L')}</div>
                          <div>{rowData.id}</div>
                          <div>IDR {rowData.attributes.totalPrice}</div>
                          <div>
                            {rowData.attributes.status === 0
                              ? 'Belum Dibayar'
                              : rowData.attributes.status === 1 ? 'Menunggu Verifikasi' : rowData.attributes.status === 2 ? 'Sudah Dibayar' : rowData.attributes.status === 3 ? 'Batal' : null}
                          </div>
                          <div>
                            <span>
                              <a href={`history-transactions/${rowData.id}`} className={styles.historyTransaction_dec}>
                                <button className={styles.historyTransaction_viewlinkdetail}>Lihat</button>
                              </a>
                            </span>
                          </div>
                        </div>
                      ) : (
                        <div className={styles.historyTransaction_NoTranSac}>Tidak Ada Transaksi</div>
                      )}
                    </LazyLoad>
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

export default compose(withStyles(styles), connect(mapStateToProps))(HistoryTransactions)

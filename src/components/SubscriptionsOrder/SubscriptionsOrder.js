import React, { Component } from 'react'
// import { connect } from 'react-redux'
// import { compose } from 'redux'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
// import { logoMolaBig } from '@global/imageUrl'
import history from '@source/history'

import styles from './SubscriptionsOrder.css'
import config from '@source/config'
// import { values } from 'fp-ts/lib/Map'

const getFormattedPrice = number => number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')

class SubscriptionsOrder extends Component {
  state = {
    result: [],
    value: '',
    monthName: '',
    priceName: '',
  }

  handleProses = () => {
    // this.setState({
    //   subsDong: true,
    //   isHidden: !this.state.isHidden,
    // })
    history.push({
      pathname: '/accounts/ordered',
      state: {
        isAccesible: true,
      },
    })
  }

  handleChangeCode = e => {
    const target = e.target
    // const { id, value } = target
    this.setState({
      value: target.value,
    })
  }

  handleClick = e => {
    const target = e.target
    this.setState({
      value: target.select(),
    })
  }

  render() {
    const { monthName, priceName } = this.props
    const { code } = this.state

    console.log('month', this.props.monthName)

    return (
      // <div className={styles.order__container}>
      // {/* <div className={styles.order__content_wrapper}> */}
      <div className={styles.order__content_list}>
        <div className={styles.order__content_title}> Pilih Paket Berlangganan Anda </div>

        <div className={styles.order__content_list_price}>
          <div className={styles.order__content_list_price_wrapper}>
            <div className={styles.order__content_list_price_title}>
              <h1>{monthName}</h1>
              <h2> berakhir pada 23-10-2019</h2>
              <a>ubah</a>
            </div>
            <div className={styles.order__content_list_price_count}>
              <sup>Rp</sup>
              {getFormattedPrice(priceName)}
            </div>
          </div>
        </div>

        <div className={styles.order__content_list_code}>
          <div className={styles.order__content_list_code_wrapper}>
            <div className={styles.order__content_list_code_text}>
              <p>Kode Promo</p>
              <a onClick={() => this.handleClick()} value={code} onFocus={this.handleClick}>
                ubah
              </a>
            </div>
            <div className={styles.order__content_list_code_input}>
              <input type="text" id="code" value={code} onChange={this.handleChangeCode} />
            </div>
            <div className={styles.order__content_list_code_text}>
              <p>Subtotal</p>
              <a>Rp150,000</a>
            </div>
            <div className={styles.order__content_list_code_text}>
              <p>Promo</p>
              <a>-Rp50,000</a>
            </div>

            <div className={styles.order__content_list_divider} />

            <div className={styles.order__content_list_code_text_total}>
              <p>Total</p>
              <a>Rp100,000</a>
            </div>
          </div>
        </div>

        <div className={styles.order__content_list_button}>
          <div className={styles.order__content_list_info}>
            Dengan menekan tombol Proses kamu menyetujui <a>Kebijakn Privasi</a>, <a>Syarat dan ketentuan</a> kami
          </div>
          <button type="submit" className={styles.order__content_submit} onClick={this.handleProses}>
            Proses
          </button>
        </div>
      </div>
      // {/* </div> */}
      // </div>
    )
  }
}

export default withStyles(styles)(SubscriptionsOrder)

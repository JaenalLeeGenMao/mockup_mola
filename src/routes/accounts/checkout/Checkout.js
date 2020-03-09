import React, { Component } from 'react'
import { toastr } from 'react-redux-toastr'
import ReactTooltip from 'react-tooltip'

import withStyles from 'isomorphic-style-loader/lib/withStyles'
import _isUndefined from 'lodash/isUndefined'
import _get from 'lodash/get'
import moment from 'moment'
import Countdown from 'react-countdown-now'
import jwt from 'jsonwebtoken'
import Header from '@components/Header'
import LazyLoad from '@components/common/Lazyload'
import MolaHandler from '@api/mola'
import Layout from '@components/Molalayout'
import Checkbox from '@components/Checkbox'

import history from '@source/history'

import '@global/style/css/reactReduxToastr.css'

import styles from './Checkout.css'

const getFormattedPrice = number => {
  if (!number || number == 0) {
    return 0
  }
  return number
    .toString()
    .split(/(?=(?:\d{3})+(?:\.|$))/g)
    .join(',')
}

const copyCodeToClipboard = props => {
  ReactTooltip.show(props.ref)
  var el = document.createElement('textarea')
  el.value = props.value ? props.value : props.content
  el.setAttribute('readonly', '')
  el.style = { position: 'absolute', left: '-9999px' }
  document.body.appendChild(el)
  el.select()
  document.execCommand('copy')
  document.body.removeChild(el)
}

const CheckoutItem = props => {
  return (
    <div className={styles.checkout_item__container}>
      <h3 className={styles.checkout_item__title}>{props.title}</h3>
      <div className={styles.checkout_item__wrap}>
        <h4 className={styles.checkout_item__content}>{props.content}</h4>
        <button
          ref={ref => (props.ref = ref)}
          data-tip={`Copied ${props.content}`}
          data-event="focus"
          onClick={() => copyCodeToClipboard(props)}
          onMouseLeave={() => {
            ReactTooltip.hide(props.ref)
          }}
          className={styles.checkout_item__action}
        >
          {props.actionTitle}
        </button>

        <ReactTooltip delayHide={1000} globalEventOff="leave" place="bottom" effect="solid" />
      </div>
    </div>
  )
}

class Checkout extends Component {
  state = {
    data: {},
    subscriptionId: '',
    accessToken: '',
    uid: '',
    loading: true,
    loadingCheckout: false,
    error: false,
    isShowCheckoutDetail: false,
    isCheckoutDetailLoading: false,
    checkboxCheckedOne: false,
    checkboxCheckedTwo: false,
    payment: {
      process_id: '',
      status_message: '',
      transaction_id: '',
      order_id: '',
      amount: 0,
      payment_code: '',
      transaction_time: '',
      expired_time: '',
    },
  }

  // handleCheckout = async () => {
  //   const { subscriptionId, accessToken, uid, data } = this.state
  //   const { isMobile } = this.props

  //   const order = await MolaHandler.createOrder({
  //     ...this.state.data,
  //     token: accessToken,
  //     uid,
  //     subscriptionId,
  //     package_expiry: data.expireAt,
  //   })
  //   if (order.meta.status !== 'success') {
  //     toastr.error('Notification', 'Failure upon generating new order')
  //     return
  //   }
  //   toastr.info('Notification', 'Redirecting you to Mola payment')
  //   const payment = await MolaHandler.createMidtransPayment({ token: this.state.accessToken, orderId: order.data.id })

  //   if (payment.meta.status === 'success') {
  //     window.open(`${payment.data.url}`, '_self')
  //   } else {
  //     toastr.error('Notification', 'Failed retrieving Mola payment')
  //   }
  // }

  handleCheckout = async () => {
    const { subscriptionId, accessToken, uid, data } = this.state

    this.setState({
      isCheckoutDetailLoading: !this.state.isCheckoutDetailLoading,
    })

    const order = await MolaHandler.createOrder({
      ...this.state.data,
      token: accessToken,
      uid,
      subscriptionId,
      package_expiry: data.expireAt,
    })

    if (order.meta.status !== 'success') {
      // toastr.error('Notification', 'Failure upon generating new order')
      this.setState({
        isCheckoutDetailLoading: !this.state.isCheckoutDetailLoading,
        error: true /** NOTE: gagal redirect ke halaman subscriptions list */,
      })
      return
    }

    const payment = await MolaHandler.createMCBillPayment({
      token: this.state.accessToken,
      orderId: order.data.id,
      amount: data.price,
      customerInfo: data.title,
    })

    if (payment.meta.status === 'success') {
      this.setState({
        isShowCheckoutDetail: !this.state.isShowCheckoutDetail,
        isCheckoutDetailLoading: !this.state.isCheckoutDetailLoading,
        payment: payment.data,
      })
    } else {
      this.setState({
        isCheckoutDetailLoading: !this.state.isCheckoutDetailLoading,
        error: true /** NOTE: gagal redirect ke halaman subscriptions list */,
      })

      toastr.error('Notification', 'Failed retrieving MCBill payment')
    }
  }

  async componentDidMount() {
    this.initialSubscription()
  }

  initialSubscription = async () => {
    const subscriptionId = this.readQueryParams('subsId')
    const accessToken = this.readQueryParams('at')

    let uid = ''

    // VALIDATION, SHOULD BE MADE SEPERATE FUNCTION
    if (!subscriptionId || !accessToken) {
      this.setState({ loading: false, error: true })
      // toastr.error('Notification', 'Please back to Subscription List page')
      return
    }

    const isAccessTokenValid = jwt.decode(accessToken) != undefined

    if (!isAccessTokenValid) {
      this.setState({ loading: false, error: true })
      // toastr.error('Technical Error', 'Please back to Subscription List page')
      return
    }
    const isAtHaveUid = jwt.decode(accessToken).sub != undefined

    if (!isAtHaveUid) {
      this.setState({ loading: false, error: true })
      // toastr.error('Technical Error', 'Please back to Subscription List page')
      return
    }
    // END OF VALIDATION

    uid = jwt.decode(accessToken).sub

    this.setState({ loading: true })

    document.cookie = `_at=${accessToken};path=/`

    this.setState({
      subscriptionId,
      accessToken,
      uid,
    })

    try {
      const resultSubscription = await MolaHandler.getSubscriptionById(subscriptionId)
      if (resultSubscription.meta.status === 'error') {
        return this.setState({ loading: false, error: true })
      } else {
        const data = _get(resultSubscription, 'data.attributes', {})
        return this.setState({ loading: false, data })
      }
    } catch (error) {
      this.setState({ loading: false, error: true })
    }
  }

  readQueryParams = query => {
    const uriSearch = location.search
    if (!_isUndefined(uriSearch) && uriSearch !== '') {
      const urlParams = new URLSearchParams(uriSearch)
      return urlParams.get(query)
    }
    return
  }

  formatDate = (quantity, uom, expireAt) => {
    let date = moment()
    const format = 'DD MMM YYYY'
    if (uom == 'm') {
      return date.add(quantity * 30, 'days').format(format)
    } else if (uom == 'd') {
      return date.add(quantity, 'days').format(format)
    } else if (uom == 's') {
      // pending for season uom, waiting for backend to update
      return moment(expireAt).format(format)
    }
    return date.format(format)
  }

  renderCheckoutDetail() {
    const { expired_time, amount, payment_code } = this.state.payment
    const date_exp = moment(expired_time).format('DD MMMM YYYY HH:mm')

    return (
      <div className={styles.checkout_container}>
        <div className={styles.order__content_list}>
          <div className={styles.order__content_title}> Menunggu Pembayaran </div>

          <div className={styles.warning}>
            <p>
              Harap selesaikan pembayaran sebelum: <strong>{`${date_exp} WIB`}</strong>.
            </p>
          </div>

          <div className={styles.detail_wrap}>
            <CheckoutItem
              ref={this.amountRef}
              title="Jumlah yang harus dibayar"
              content={`Rp${getFormattedPrice(amount)}`}
              value={amount}
              actionTitle="Salin Jumlah"
            />

            <CheckoutItem ref={this.rekRef} title="Nomor Rekening" content={payment_code} actionTitle="Salin Nomor" />
          </div>

          <div className={styles.info_wrap}>
            <h4 className={styles.info_title}>Intruksi Pembayaran</h4>
            <p className={styles.gray_text}>
              Klik tombol di bawah ini untuk informasi cara pembayaran BCA Virtual Acccount.
            </p>
          </div>

          <a
            rel="noopener noreferrer"
            target="_blank"
            href="https://www.bca.co.id/bisnis/produk-dan-layanan/e-banking/klikbca-bisnis/bca-virtual-account"
            className={styles.btn_submit}
          >
            Instruksi Pembayaran
          </a>
        </div>
      </div>
    )
  }

  renderErrorPage() {
    const { isMobile } = this.props
    const renderer = ({ days, hours, minutes, seconds, completed }) => {
      if (completed) {
        const origin = _get(document, 'location.origin', '')
        const redirectUri = `${origin}${
          isMobile ? '/accounts/subscriptionsList' : '/accounts/profile?tab=subscriptionPackage'
        }`
        history.push({
          pathname: '/accounts/login',
          search: `redirect_uri=${encodeURIComponent(redirectUri)}`,
        })
        return null
      }

      return (
        <div className={styles.checkout__error_wrapper}>
          <p>Your session has expired. Redirecting to login in {seconds} seconds.</p>
        </div>
      )
    }

    return <Countdown date={Date.now() + 5000} renderer={renderer} />
  }

  checkboxOnChange = e => {
    this.setState({
      checkboxCheckedOne: !this.state.checkboxCheckedOne,
    })
  }

  checkboxOnChangeTwo = e => {
    this.setState({
      checkboxCheckedTwo: !this.state.checkboxCheckedTwo,
    })
  }

  renderSubscription() {
    const { data, loading, isCheckoutDetailLoading, checkboxCheckedOne, checkboxCheckedTwo } = this.state

    const { isMobile } = this.props
    let price = ''

    return (
      <LazyLoad>
        <div className={styles.checkout_container}>
          <div className={styles.order__content_list}>
            <div className={styles.order__content_title}> Cek Pesanan Anda </div>

            <div className={styles.order__content_list_price}>
              <div className={styles.order__content_list_price_wrapper}>
                <div className={styles.order__content_list_price_title}>
                  <h1>{data.title}</h1>
                  <p>sampai {this.formatDate(data.quantity, data.uom, data.expireAt)}</p>
                  {/* <h1>1 MONTH PLAN</h1> */}
                  {/* <p>until 23 Oct 2019</p> */}
                </div>
                <div className={styles.order__content_list_price_count}>
                  {/* <sup>Rp</sup>
                  {getFormattedPrice(data.price)} */}
                  {(price = data.priceUnit !== '' ? data.priceUnit : 'Rp')}
                  {getFormattedPrice(data.price)}
                  {/* {getFormattedPrice(1321322)} */}
                </div>
              </div>
              <div className={styles.checkout_changePlan}>
                <a href={'/accounts/subscriptionsList'} target="_self">
                  {' '}
                  Ubah Paket{' '}
                </a>
              </div>
            </div>

            <div className={styles.order__content_list_button}>
              <div className={styles.order__content_list_info}>
                <p className={styles.big_mb}>
                  Kami hanya menerima pembayaran dengan BCA Virtual Account untuk paket ini.
                </p>
                <div className={styles.order__content_checkbox}>
                  <div className={styles.order__content_checkbox_list}>
                    <Checkbox value={checkboxCheckedOne} onChange={this.checkboxOnChange} />
                    <div className={styles.order__content_checkbox_text}>
                      <p>
                        Saya telah membaca, mengerti dan menerima
                        {/* </p>
                    <p> */}{' '}
                        {/* <a href={'/privacy'} target="_self" rel="noopener noreferrer"> */}
                        <a href={'/terms'} target="_self" rel="noopener noreferrer">
                          Ketentuan
                        </a>{' '}
                        &amp; {/* </a>{' '} */}
                        <a href={'/privacy'} target="_self" rel="noopener noreferrer">
                          Kebijakan Privasi
                        </a>{' '}
                        tentang Layanan Mola TV tersebut
                      </p>
                    </div>
                  </div>
                  <div className={styles.order__content_checkbox_list}>
                    <Checkbox value={checkboxCheckedTwo} onChange={this.checkboxOnChangeTwo} />
                    <div className={styles.order__content_checkbox_text}>
                      <p>
                        Saya telah memastikan dengan Customer Service Mola TV bahwa perangkat (Mobile Phone, Tab, &amp;
                        sejenisnya) yang saya gunakan kompatibel/ sesuai dengan aplikasi dan Layanan Mola TV
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {!isCheckoutDetailLoading && (
                <button
                  type="submit"
                  className={`${
                    checkboxCheckedOne && checkboxCheckedTwo
                      ? styles.order__content_submit
                      : styles.order__content_submit_false
                  }`}
                  onClick={this.handleCheckout}
                  disabled={!checkboxCheckedOne || !checkboxCheckedTwo}
                >
                  Bayar
                </button>
              )}
              {isCheckoutDetailLoading && (
                <button type="submit" className={styles.order__content_submit_disabled} onClick={this.handleCheckout}>
                  <div className={styles.loading__page}>
                    <div className={styles.loading__ring}>
                      <div />
                      <div />
                      <div />
                      <div />
                    </div>
                  </div>
                </button>
              )}
              {/* <div className={styles.big_mt}>{this.state.isCheckoutDetailLoading && <p>Loading...</p>}</div> */}
            </div>
          </div>
        </div>
      </LazyLoad>
    )
  }

  render() {
    const { loading, error, isShowCheckoutDetail } = this.state
    const { isMobile } = this.props

    return (
      <Layout>
        {!isMobile && <Header libraryOff leftMenuOff rightMenuOff isDark={0} activeMenuId={9} {...this.props} />}
        <div className={styles.wrapper}>
          {!loading && !error && !isShowCheckoutDetail && this.renderSubscription()}
          {!loading && !error && isShowCheckoutDetail && this.renderCheckoutDetail()}
          {error && this.renderErrorPage()}
        </div>
      </Layout>
    )
  }
}

export default withStyles(styles)(Checkout)

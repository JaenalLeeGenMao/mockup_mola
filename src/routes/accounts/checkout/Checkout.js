import React, { Component } from 'react'
import { toastr } from 'react-redux-toastr'

import withStyles from 'isomorphic-style-loader/lib/withStyles'
import _isUndefined from 'lodash/isUndefined'
import _get from 'lodash/get'
import moment from 'moment'
import jwt from 'jsonwebtoken'
import Header from '@components/Header'
import LazyLoad from '@components/common/Lazyload'
import MolaHandler from '@api/mola'
import Layout from '@components/Molalayout'
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

class Checkout extends Component {
  state = {
    data: {},
    subscriptionId: '',
    accessToken: '',
    uid: '',
    loading: true,
    loadingCheckout: false,
    error: false,
  }

  handleCheckout = async () => {
    const { subscriptionId, accessToken, uid, data } = this.state
    const { isMobile } = this.props

    const order = await MolaHandler.createOrder({
      ...this.state.data,
      token: accessToken,
      uid,
      subscriptionId,
      package_expiry: data.expireAt,
    })
    if (order.meta.status !== 'success') {
      toastr.error('Notification', 'Failure upon generating new order')
      return
    }
    toastr.info('Notification', 'Redirecting you to Mola payment')
    const payment = await MolaHandler.createMidtransPayment({ token: this.state.accessToken, orderId: order.data.id })

    if (payment.meta.status === 'success') {
      window.open(`${payment.data.url}`, '_self')
    } else {
      toastr.error('Notification', 'Failed retrieving Mola payment')
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
      toastr.error('Notification', 'Please back to Subscription List page')
      return
    }

    const isAccessTokenValid = jwt.decode(accessToken) != undefined

    if (!isAccessTokenValid) {
      this.setState({ loading: false, error: true })
      toastr.error('Technical Error', 'Please back to Subscription List page')
      return
    }
    const isAtHaveUid = jwt.decode(accessToken).sub != undefined

    if (!isAtHaveUid) {
      this.setState({ loading: false, error: true })
      toastr.error('Technical Error', 'Please back to Subscription List page')
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

  renderSubscription() {
    const { data } = this.state
    const { isMobile } = this.props
    return (
      <LazyLoad>
        <div className={styles.checkout_container}>
          <div className={styles.order__content_list}>
            <div className={styles.order__content_title}> Review your subscription </div>

            <div className={styles.order__content_list_price}>
              <div className={styles.order__content_list_price_wrapper}>
                <div className={styles.order__content_list_price_title}>
                  <h1>{data.title}</h1>
                  <p>until {this.formatDate(data.quantity, data.uom, data.expireAt)}</p>
                  {/* <h1>1 MONTH PLAN</h1> */}
                  {/* <p>until 23 Oct 2019</p> */}
                </div>
                <div className={styles.order__content_list_price_count}>
                  <sup>Rp</sup>
                  {getFormattedPrice(data.price)}
                  {/* {getFormattedPrice(1321322)} */}
                </div>
              </div>
              <div className={styles.checkout_changePlan}>
                <a href={'/accounts/subscriptionsList'} target="_self">
                  {' '}
                  Change Plan{' '}
                </a>
              </div>
            </div>

            <div className={styles.order__content_list_button}>
              <div className={styles.order__content_list_info}>
                <p>By clicking Checkout , you agree to our</p>
                <p>
                  {' '}
                  <a href={'/privacy'} target="_self" rel="noopener noreferrer">
                    {' '}
                    Privacy Policy
                  </a>{' '}
                  and our{' '}
                  <a href={'/terms'} target="_self" rel="noopener noreferrer">
                    Terms
                  </a>{' '}
                </p>
              </div>
              <button type="submit" className={styles.order__content_submit} onClick={this.handleCheckout}>
                Checkout
              </button>
            </div>
          </div>
        </div>
      </LazyLoad>
    )
  }

  render() {
    const { loading, error } = this.state
    const { isMobile } = this.props

    return (
      <Layout>
        {!isMobile && <Header libraryOff leftMenuOff rightMenuOff isDark={0} {...this.props} />}
        <div className={styles.wrapper}>{!loading && !error && this.renderSubscription()}</div>
      </Layout>

      // {/* </div> */}
      // </div>
    )
  }
}

export default withStyles(styles)(Checkout)

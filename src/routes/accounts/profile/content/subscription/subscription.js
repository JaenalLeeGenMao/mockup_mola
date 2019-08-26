import React, { Component, Fragment } from 'react'
import { toastr } from 'react-redux-toastr'
import { connect } from 'react-redux'
import moment from 'moment'

import withStyles from 'isomorphic-style-loader/lib/withStyles'

import { updatePassword } from '@actions/resetPassword'
import subscribeActions from '@actions/subscribe'
import Mola from '@api/mola'

import '@global/style/css/reactReduxToastr.css'

import LazyLoad from '@components/common/Lazyload'

import s from './subscription.css'

const getFormattedPrice = number => number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')

class Subscription extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isToggled: false,
    }
  }

  componentDidMount() {
    const { user, getAllSubscriptions } = this.props

    /* Semua subscription MOLA */
    getAllSubscriptions(user.token)
  }

  handleClick = async ({ id, attributes }) => {
    const { user } = this.props

    // this.setState({
    //   isToggled: !this.state.isToggled,
    // })

    toastr.light('Notification', 'Generating new order, please keep this window open!')
    const order = await Mola.createOrder({ ...user, subscriptionId: id, price: attributes.price })
    if (order.meta.status !== 'success') {
      toastr.error('Notification', 'Failure upon generating new order')
    }

    toastr.info('Notification', 'Redirecting you to Mola payment via Midtrans ')
    const payment = await Mola.createMidtransPayment({ ...user, orderId: order.data.id })

    if (payment.meta.status === 'success') {
      window.open(`${payment.data.url}?redirect_uri=${window.encodeURIComponent(payment.data.redirectUrl)}`, '_blank')
    } else {
      toastr.error('Notification', 'Failed retrieving Mola payment')
    }

    // this.props.onClick()
  }

  render() {
    const { isMobile, onClick, user, subscribe } = this.props
    const { uid, firstName, lastName, email, phoneNumber, birthdate, gender, location, subscriptions } = user
    // const { isToggled } = this.state

    return (
      <div>
        <div className={s.subscription__container}>
          {user.subscriptions.length > 0 &&
            user.subscriptions.map((subscription, index) => {
              const expiry = new Date(subscription.attributes.expireAt),
                today = new Date(),
                formattedExpiry = moment(expiry).format('DD/MM/YY'),
                subs = subscription.attributes.subscriptions

              return (
                <Fragment key={index}>
                  {subs.length > 0 &&
                    subs.map(sub => (
                      <LazyLoad
                        key={sub.id}
                        containerClassName={s.sideCenter}
                        containerStyle={{ display: today < expiry ? 'block' : 'none' }}
                      >
                        <div className={s.subscription__wrapper_active}>
                          <div className={s.subscription__section_left_active}>
                            <h1>PREMIUM</h1>
                            <div className={s.icon_cinema} />
                          </div>
                          <div className={s.subscription__section_right_active}>
                            <h1>
                              <span>{sub.attributes.currency}</span> {getFormattedPrice(sub.attributes.price)}/{sub
                                .attributes.priceUnit === 'm'
                                ? 'bulan'
                                : 'tahun'}
                            </h1>
                            <p>
                              {sub.attributes.title} - {sub.attributes.description}
                            </p>
                          </div>
                          <div className={s.icon_tick} />
                        </div>
                        <div className={s.subscription_expiry}>
                          Paketmu akan berakhir secara otomatis pada {formattedExpiry}.
                        </div>
                        <div className={s.subscription_button_wrapper}>
                          <button
                            className={s.subscription_button_active}
                            onClick={() => console.log(`${new Date(expiry - today).getDate()} days left`)}
                          >
                            {new Date(expiry - today).getDate()} days left
                          </button>
                        </div>
                      </LazyLoad>
                    ))}
                </Fragment>
              )
            })}

          {user.subscriptions.length === 0 &&
            subscribe.meta.status &&
            subscribe.data.length > 0 &&
            subscribe.data.map((sub, index) => (
              <LazyLoad
                key={sub.id}
                containerClassName={s.sideCenter}
                // containerStyle={{ display: isToggled ? 'none' : 'block' }}
              >
                <div className={s.subscription__wrapper}>
                  <div className={s.subscription__section_left}>
                    <h1>PREMIUM</h1>
                    <div className={s.icon_cinema_active} />
                  </div>
                  <div className={s.subscription__section_right}>
                    <h1>
                      <span>{sub.attributes.currency}</span> {getFormattedPrice(sub.attributes.price)}/{sub.attributes
                        .priceUnit === 'm'
                        ? 'bulan'
                        : 'tahun'}
                    </h1>
                    <p>
                      {sub.attributes.title} - {sub.attributes.description}
                    </p>
                  </div>
                  {!isMobile && <div className={s.icon_tick} style={{ opacity: 0 }} />}
                </div>
                <div className={s.subscription_user_info_wrapper}>
                  <h1>Data Pengguna</h1>
                  <div>
                    <p>Name Pengguna</p>
                    <p>
                      {firstName} {lastName}
                    </p>
                  </div>
                  <div>
                    <p>Email</p>
                    <p>{email}</p>
                  </div>
                  <div>
                    <p>Nomor Telephone</p>
                    <p>{phoneNumber}</p>
                  </div>
                </div>
                <div className={s.subscription_button_wrapper}>
                  <button className={s.subscription_button_active} onClick={() => this.handleClick(sub)}>
                    Mulai berlangganan
                  </button>
                </div>
              </LazyLoad>
            ))}
        </div>
      </div>
    )
  }
}
// .toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')
const mapStateToProps = state => {
  return {
    user: state.user,
    subscribe: state.subscribe,
  }
}
const mapDispatchToProps = dispatch => {
  return {
    handleUpdatePassword: params => dispatch(updatePassword(params)),
    getAllSubscriptions: token => dispatch(subscribeActions.getAllSubscriptions(token)),
  }
}

const Default = withStyles(s)(Subscription)
export default connect(mapStateToProps, mapDispatchToProps)(Default)

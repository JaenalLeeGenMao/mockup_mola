import React, { Component } from 'react'
import { toastr } from 'react-redux-toastr'
import { connect } from 'react-redux'
import moment from 'moment'

import withStyles from 'isomorphic-style-loader/lib/withStyles'

import { updatePassword } from '@actions/resetPassword'
// import subscribeActions from '@actions/subscribe'
import Mola from '@api/mola'

import history from '@source/history'

import '@global/style/css/reactReduxToastr.css'

import { logoBlue } from '@global/imageUrl'

import LazyLoad from '@components/common/Lazyload'
import OrderList from '@components/SubscriptionsOrder'

import s from './subscription.css'

// const getFormattedPrice = number => number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')

class Subscription extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isToggled: false,
      isSubscribe: false,
      isHidden: true,
    }
  }

  componentDidMount() {
    const { user, getAllSubscriptions, getUserSubscriptions } = this.props
    /* Semua subscription MOLA */
    // getAllSubscriptions(user.token)
  }

  handleClick = async ({ id, attributes }) => {
    const { user } = this.props

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

  handleClickSubs = () => {
    history.push('/accounts/subscriptionsList')
  }

  render() {
    // const { isMobile, onClick, user, subscribe, getUserSubscriptions } = this.props
    const { user, subscribe, data, meta } = this.props
    // const { uid, firstName, lastName, email, phoneNumber, birthdate, gender, location, subscriptions } = user
    // const { isToggled, subsDong, isHidden } = this.state
    const { isSubscribe, isHidden } = this.state

    return (
      <div>
        <div className={s.subscription__container}>
          {/* {meta.status === 'error' && (
            <>
              <div className={s.subscription_user_info_wrapper_no}>
                <img alt="molatv" src={logoBlue} className={s.header__logo} />
                <h1>Aww :(</h1>
                <h2>Tampaknya Anda Belum Memiliki Paket Apapun </h2>
              </div>
              <div className={s.subscription_button_wrapper_no}>
                    <button className={s.subscription_button_active} onClick={() => this.handleClickSubs()}>
                      {isHidden ? 'Mulai Berlangganan' : null}
                    </button>
                  </div>
            </>
          )} */}
          <div className={s.subscription_detail_title}>Active Package</div>
          <div className={s.subscription_detail_packet}>
            {data.map((subscription, index) => {
              const expiry = new Date(subscription.expireAt),
                today = new Date(),
                formattedExpiry = moment(expiry).format('DD MMM YYYY'),
                title = subscription.subscriptionList[0].title
              return (
                // <Fragment key={index}>
                <>
                  <LazyLoad
                    key={index}
                    containerClassName={s.sideCenter}
                    // containerStyle={{ display: today < expiry ? 'none' : 'none' }}
                  >
                    <div className={s.subscription__wrapper_active}>
                      <div className={s.subscription__section_left_active}>
                        <h1>{title}</h1>
                        <div className={s.subscription_expiry}>Valid Until {formattedExpiry}</div>
                      </div>
                      <div className={s.subscription__section_right_active}>
                        <p>Active</p>
                      </div>
                    </div>

                    {/* <div className={s.subscription_button_wrapper}> */}
                    {/* <button
                        className={s.subscription_button_active}
                        onClick={() => console.log(`${new Date(expiry - today).getDate()} days left`)}
                      >
                        {new Date(expiry - today).getDate()} days left
                      </button> */}
                    {/* </div> */}
                  </LazyLoad>
                  {/* </Fragment> */}
                </>
              )
            })}
          </div>

          {/* {!isHidden && isSubscribe && <OrderList />} */}
        </div>
      </div>
    )
  }
}
// .toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')
const mapStateToProps = state => {
  return {
    user: state.user,
    // subscribe: state.subscribe,
    userSubscription: state.userSubscription,
  }
}
const mapDispatchToProps = dispatch => {
  return {
    handleUpdatePassword: params => dispatch(updatePassword(params)),
    // getAllSubscriptions: token => dispatch(subscribeActions.getAllSubscriptions(token)),
    getUserSubscriptions: uid => dispatch(subscribeActions.getUserSubscriptions(uid)),
  }
}

const Default = withStyles(s)(Subscription)
export default connect(mapStateToProps, mapDispatchToProps)(Default)

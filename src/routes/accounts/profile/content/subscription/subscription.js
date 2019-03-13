import React from 'react'
import { connect } from 'react-redux'

import withStyles from 'isomorphic-style-loader/lib/withStyles'

import { updatePassword } from '@actions/resetPassword'
import subscribeActions from '@actions/subscribe'
import Mola from '@api/mola'

import '@global/style/css/reactReduxToastr.css'

import { UiInput, UiNavigation, UiButton, UiMobileNav } from '@components'
import LazyLoad from '@components/common/Lazyload'

import s from './subscription.css'

class Subscription extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isToggled: false,
    }
  }

  componentDidMount() {
    const { user, getAllSubscriptions } = this.props

    getAllSubscriptions(user.token)
  }

  handleClick = async e => {
    const { user } = this.props

    this.setState({
      isToggled: !this.state.isToggled,
    })

    const order = await Mola.createOrder(user)
    const payment = await Mola.createMidtransPayment({ ...user, orderId: order.data.id })
    console.log('USER', user)
    console.log('ORDER', order)
    console.log('PAYMENT', payment)

    this.props.onClick()
  }

  render() {
    const { isMobile, onClick, user } = this.props
    const { uid, firstName, lastName, email, phoneNumber, birthdate, gender, location, subscriptions } = user
    const { isToggled } = this.state
    const orderID = 26

    return (
      <div>
        <div className={s.subscription__container}>
          <LazyLoad containerClassName={s.sideCenter} containerStyle={{ display: !isToggled ? 'none' : 'block' }}>
            <div className={s.subscription__wrapper_active}>
              <div className={s.subscription__section_left_active}>
                <h1>PREMIUM</h1>
                <div className={s.icon_cinema} />
              </div>
              <div className={s.subscription__section_right_active}>
                <h1>IDR 139,000/tahun</h1>
                <p>Menonton semua streaming film tanpa harus terganggu dengan iklan.</p>
              </div>
              <div className={s.icon_tick} />
            </div>
            <div className={s.subscription_expiry}>Paketmu akan berakhir secara otomatis pada 14/02/19.</div>
            <div className={s.subscription_button_wrapper}>
              <button className={s.subscription_button_active} onClick={this.handleClick}>
                Berhenti berlangganan
              </button>
            </div>
          </LazyLoad>
          <LazyLoad containerClassName={s.sideCenter} containerStyle={{ display: isToggled ? 'none' : 'block' }}>
            <div className={s.subscription__wrapper}>
              <div className={s.subscription__section_left}>
                <h1>PREMIUM</h1>
                <div className={s.icon_cinema_active} />
              </div>
              <div className={s.subscription__section_right}>
                <h1>IDR 139,000/tahun</h1>
                <p>Menonton semua streaming film tanpa harus terganggu dengan iklan.</p>
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
              <button className={s.subscription_button_active} onClick={this.handleClick}>
                Mulai berlangganan
              </button>
            </div>
          </LazyLoad>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
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

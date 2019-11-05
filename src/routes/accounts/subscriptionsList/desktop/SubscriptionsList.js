import React, { Fragment } from 'react'
// import { toastr } from 'react-redux-toastr'
import { connect } from 'react-redux'
// import moment from 'moment'

import withStyles from 'isomorphic-style-loader/lib/withStyles'

import { updatePassword } from '@actions/resetPassword'
import subscribeActions from '@actions/subscribe'
// import Mola from '@api/mola'

// import '@global/style/css/reactReduxToastr.css'

// import { logoBlue, logoMobile } from '@global/imageUrl'

// import LazyLoad from '@components/common/Lazyload'
import OrderList from '@components/SubscriptionsOrder'
// import history from '@source/history'
import Header from '@components/Header'

import s from './SubscriptionsList.css'

const getFormattedPrice = number => number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')

class SubscriptionsList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isToggled: false,
      subsDong: false,
      isHidden: true,
      monthName: '',
    }

    this.data = {
      kucing: [
        {
          type: 'subscription',
          id: 23,
          attributes: {
            title: '1 Season Plan',
            description: 'Tonton Hingga 10 pertandingan/minggu dalam 1 musim penuh',
            permission: 2,
            chargingBase: 1,
            maxQty: 1,
            ads: 0,
            price: 1350000,
            currency: '',
            displayOrder: 0,
            recommended: 0,
            icon: '',
            enabled: 1,
            baseColor: '',
            textColor: '',
            priceUnit: '',
            status: 1,
            isGlobal: 0,
          },
        },
        {
          type: 'subscription',
          id: 23,
          attributes: {
            title: '1 Month Plan',
            description: 'Tonton program favorit anda dalam 1 bulan',
            permission: 2,
            chargingBase: 1,
            maxQty: 1,
            ads: 0,
            price: 150000,
            currency: '',
            displayOrder: 0,
            recommended: 0,
            icon: '',
            enabled: 1,
            baseColor: '',
            textColor: '',
            priceUnit: '',
            status: 1,
            isGlobal: 0,
          },
        },
        {
          type: 'subscription',
          id: 23,
          attributes: {
            title: '1 Week Plan',
            description: 'Tonton program favorit anda dalam 1 minggu',
            permission: 2,
            chargingBase: 1,
            maxQty: 1,
            ads: 0,
            price: 75000,
            currency: '',
            displayOrder: 0,
            recommended: 0,
            icon: '',
            enabled: 1,
            baseColor: '',
            textColor: '',
            priceUnit: '',
            status: 1,
            isGlobal: 0,
          },
        },
      ],
    }
  }

  handleClick = () => {
    // this.setState({
    //   S,
    // })
  }

  handleClickSubs = (monthName, priceName) => {
    this.setState({
      subsDong: true,
      isHidden: !this.state.isHidden,
      monthName: monthName,
      priceName: priceName,
    })
  }

  render() {
    // const { gg } = this.data.kucing[0]
    // const { isMobile, onClick, user, subscribe, monthName } = this.props
    // const { uid, firstName, lastName, email, phoneNumber, birthdate, gender, location, subscriptions } = user
    const { subsDong, isHidden } = this.state

    console.log('ini data', this.data.kucing)

    return (
      <Fragment>
        <Header libraryOff leftMenuOff rightMenuOff isDark={0} {...this.props} />
        <div className={s.subscription__container_wrapper}>
          <div className={s.subscription__title}>{isHidden ? 'Pilih Paket Berlangganan Anda' : ''} </div>
          <div className={s.subscriptions__main_container}>
            {isHidden &&
              this.data.kucing.map(sub => (
                <div className={s.subscription__wrapper}>
                  <div className={s.subscription__wrapper_line} />
                  <div className={s.subscription__section_plan}>
                    <h1>{sub.attributes.title}</h1>
                    {/* <div className={s.icon_cinema_active} /> */}
                  </div>

                  <div className={s.subscriptions__section_detail}>
                    <p>Premiere league</p>
                    <p>Euro 2020</p>
                    <p>Formula E</p>
                    <p>Premiere Movies</p>
                  </div>

                  <div className={s.subscription__section_list}>
                    <h1>
                      <span>
                        <sup>Rp</sup>
                        {sub.attributes.currency}
                      </span>{' '}
                      {getFormattedPrice(sub.attributes.price)}
                      {/* /{sub.attributes
                    .priceUnit === 'm'
                    ? 'bulan'
                    : 'tahun'} */}
                    </h1>
                    <p>{sub.attributes.description}</p>
                  </div>

                  <div className={s.subscription_button_wrapper}>
                    <button
                      className={s.subscription_button_active}
                      onClick={() => this.handleClickSubs(sub.attributes.title, sub.attributes.price)}
                      monthName={sub.attributes.title}
                    >
                      {isHidden ? 'Pilih' : null}
                    </button>
                  </div>
                </div>
              ))}
            )
            {subsDong && <OrderList monthName={this.state.monthName} priceName={this.state.priceName} />}
          </div>
        </div>
      </Fragment>
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

const Default = withStyles(s)(SubscriptionsList)
export default connect(mapStateToProps, mapDispatchToProps)(Default)

import React, { Fragment } from 'react'
// import { toastr } from 'react-redux-toastr'
import { connect } from 'react-redux'
// import moment from 'moment'

import withStyles from 'isomorphic-style-loader/lib/withStyles'

import { updatePassword } from '@actions/resetPassword'
import subscribeActions from '@actions/subscribe'
import _isUndefined from 'lodash/isUndefined'
import _get from 'lodash/get'
import moment from 'moment'
import jwt from 'jsonwebtoken'
import { forbidIcon, checkIconSubs, crossIconSubs } from '@global/imageUrl'

import LazyLoad from '@components/common/Lazyload'
// import OrderList from '@components/SubscriptionsOrder'
import history from '@source/history'
import Header from '@components/Header'

import s from './SubscriptionsList.css'
// const getFormattedPrice = number => number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')
const getFormattedPrice = number => {
  if (!number || number == 0) {
    return 0
  }
  return number
    .toString()
    .split(/(?=(?:\d{3})+(?:\.|$))/g)
    .join(',')
}
class SubscriptionsList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isToggled: false,
      subsDong: false,
      // isHidden: true,
      monthName: '',
      dataListSubs: [],
      aksesToken: '',
      subsId: '',
      accessToken: '',
      checkAt: '',
      isHeader: false,
      // sid: '',
    }

    // this.data = {
    //   kucing: [
    //     {
    //       type: 'subscription',
    //       id: 23,
    //       attributes: {
    //         title: '1 Season Plan',
    //         description: 'watch up to 10 matches/week in 1 season',
    //         permission: 2,
    //         chargingBase: 1,
    //         maxQty: 1,
    //         ads: 0,
    //         price: 1350000,
    //         currency: '',
    //         displayOrder: 0,
    //         recommended: 0,
    //         icon: '',
    //         enabled: 1,
    //         baseColor: '',
    //         textColor: '',
    //         priceUnit: '',
    //         status: 1,
    //         isGlobal: 0,
    //       },
    //     },
    //     {
    //       type: 'subscription',
    //       id: 23,
    //       attributes: {
    //         title: '1 Month Plan',
    //         description: 'watch up to 10 matches/week in 1 season',
    //         permission: 2,
    //         chargingBase: 1,
    //         maxQty: 1,
    //         ads: 0,
    //         price: 150000,
    //         currency: '',
    //         displayOrder: 0,
    //         recommended: 0,
    //         icon: '',
    //         enabled: 1,
    //         baseColor: '',
    //         textColor: '',
    //         priceUnit: '',
    //         status: 1,
    //         isGlobal: 0,
    //       },
    //     },
    //     {
    //       type: 'subscription',
    //       id: 23,
    //       attributes: {
    //         title: '1 Week Plan',
    //         description: 'watch up to 10 matches/week in 1 season',
    //         permission: 2,
    //         chargingBase: 1,
    //         maxQty: 1,
    //         ads: 0,
    //         price: 75000,
    //         currency: '',
    //         displayOrder: 0,
    //         recommended: 0,
    //         icon: '',
    //         enabled: 1,
    //         baseColor: '',
    //         textColor: '',
    //         priceUnit: '',
    //         status: 1,
    //         isGlobal: 0,
    //       },
    //     },
    //   ],
    // }
  }

  componentDidMount() {
    this.setSubscription()
  }

  setSubscription = () => {
    const { user, getAllSubscriptions } = this.props
    // const { isHeader } = false
    const checkAt = this.readQueryParams('at')

    //desktop
    if (!checkAt) {
      this.setState(
        {
          accessToken: user.token,
          isHeader: true,
        },
        () => {
          return getAllSubscriptions(this.state.accessToken)
        }
      )
      return
    }
    //mobile
    const isAccessTokenValid = jwt.decode(checkAt) != undefined

    if (!isAccessTokenValid) {
      return getAllSubscriptions(this.state.accessToken)
    }

    document.cookie = `_at=${checkAt};path=/`

    this.setState(
      {
        accessToken: checkAt,
      },
      () => {
        return getAllSubscriptions(this.state.accessToken)
      }
    )
    return
  }

  readQueryParams = query => {
    const uriSearch = location.search
    if (!_isUndefined(uriSearch) && uriSearch !== '') {
      const urlParams = new URLSearchParams(uriSearch)
      return urlParams.get(query)
    }
    return
  }

  handleClickSubs = (aksesToken, subsId) => {
    const redirectUri = _get(document, 'location.href', '/')
    if (aksesToken) {
      history.push({
        pathname: '/accounts/checkout',
        search: `at=${aksesToken}&subsId=${subsId}`,
        state: {
          aksesToken: aksesToken,
          subsId: subsId,
          // sid: sid,
        },
      })
    } else {
      history.push({
        pathname: '/accounts/login',
        search: `redirect_uri=${encodeURIComponent(redirectUri)}`,
      })
    }
  }

  handleOnBack = () => {
    history.push('/accounts/profile?tab=subscription')
  }

  render() {
    const { subscribe, user } = this.props
    const { accessToken, isHeader } = this.state
    const isData = subscribe.data.length > 0
    let price = ''

    // const  = subscribe.length > 0
    // console.log('lol', isData)

    // console.log('atRender', accessToken)
    // console.log('ini data', subscribe.data)

    return (
      <LazyLoad>
        <Fragment>
          {isHeader ? <Header libraryOff leftMenuOff rightMenuOff isDark={0} activeMenuId={9} {...this.props} /> : ''}
          <div className={s.subscription__container_wrapper}>
            <div className={s.subscription__title}>
              <h1>Pilih Paket Langganan</h1>
            </div>
            {isData &&
              subscribe.meta.status === 'success' && (
                <div className={s.subscriptions__main_container}>
                  {subscribe.data.map((sub, index) => (
                    <div key={'subs' + index} className={s.subscription__main_wrapper}>
                      <div className={s.subscription__wrapper}>
                        <div className={s.subscription__section_plan}>
                          <h1>{sub.attributes.title}</h1>
                        </div>

                        <div className={s.subscriptions__section_detail}>
                          {sub.attributes.description.features.map((desc, index) => (
                            <div
                              key={'att' + index}
                              className={`${
                                desc.status === true
                                  ? s.subscriptions__section_detail_list
                                  : s.subscriptions__section_detail_list_false
                              }`}
                            >
                              <img src={`${desc.status === true ? checkIconSubs : crossIconSubs}`} />
                              <p>{desc.name}</p>
                            </div>
                          ))}
                        </div>

                        <div className={s.subscription__section_list}>
                          <div className={s.subscription__section_list_price}>
                            <h1>
                              <sup>{(price = sub.attributes.priceUnit !== '' ? sub.attributes.priceUnit : 'Rp')}</sup>
                              {/* {sub.attributes.currency} */}

                              {getFormattedPrice(sub.attributes.price)}
                            </h1>
                            <p>{sub.attributes.description.miniDescription}</p>
                          </div>

                          <div className={s.subscription_button_wrapper}>
                            <button
                              className={s.subscription_button_active}
                              onClick={() => this.handleClickSubs(accessToken, sub.id)}
                            >
                              Pilih Paket
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                  {/* </div> */}
                </div>
              )}
            {!isData &&
              subscribe.meta.status === 'success' && (
                <LazyLoad>
                  <div className={s.subscriptions__unavailable_container}>
                    <div className={s.subscriptions__unavailable_wrapper}>
                      <div className={s.subscriptions__unavailable_flip}>
                        <div className={s.subscriptions__unavailable_logo}>
                          <img src={forbidIcon} />
                        </div>
                        <h1>Whoops, maaf paket ini tidak tersedia</h1>
                        <div className={s.subscriptions__unavailable_flip_description}>
                          <p>Anda telah memiliki paket ini. Lihat halaman paket berlangganan</p>
                        </div>
                      </div>
                      <div className={s.subscription_button_go_back_wrapper}>
                        <button className={s.subscription_button_go_back} onClick={() => this.handleOnBack()}>
                          Kembali
                        </button>
                      </div>
                    </div>
                  </div>
                </LazyLoad>
              )}
            {subscribe.meta.status === 'error' && (
              <LazyLoad>
                <div className={s.subscriptions__main_container}>
                  <h2>Tidak ada paket yang tersedia</h2>
                </div>
              </LazyLoad>
            )}
          </div>
        </Fragment>
      </LazyLoad>
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

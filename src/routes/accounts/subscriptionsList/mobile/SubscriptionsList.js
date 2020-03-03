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
      monthName: '',
      dataListSubs: [],
      aksesToken: '',
      subsId: '',
      accessToken: '',
      checkAt: '',
      isHeader: false,
      numberOfPackage: 0,
      titlePackage: '',
    }
  }

  componentDidMount() {
    this.setSubscription()
  }

  setSubscription = () => {
    const { user, getAllSubscriptions } = this.props
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

  getAvailablePackage = data => {
    const { numberOfPackage, titlePackage } = this.state
    const availablePackage = data.filter(el => {
      const expiry = new Date(el.attributes.expireAt)
      const today = new Date()
      return today < expiry
    })

    let title = data[0].attributes.subscriptions[0].attributes.title
    this.setState({
      numberOfPackage: availablePackage.length - 1,
      titlePackage: title,
    })
  }

  componentDidUpdate(prevProps) {
    if (prevProps.user !== this.props.user) {
      if (this.props.user.subscriptions.length > 0) {
        this.getAvailablePackage(this.props.user.subscriptions)
      }
    }
  }

  render() {
    const { user: { uid = '', sid = '' }, subscribe, user, configParams } = this.props
    const isLogin = uid || sid
    const { accessToken, isHeader, titlePackage, numberOfPackage } = this.state
    const isData = subscribe.data.length > 0
    const Background = configParams && configParams.data ? configParams.data.subscriptions_list_background : ''
    let showPackageList = numberOfPackage > 1
    let price = ''

    return (
      <LazyLoad>
        <Fragment>
          {isHeader ? <Header libraryOff leftMenuOff rightMenuOff isDark={0} activeMenuId={9} {...this.props} /> : ''}
          <div className={s.subscription__container_wrapper} style={{ backgroundImage: `url(${Background})` }}>
            <div className={s.subscription__background_wrapper}>
              <div className={s.subscription__title}>
                {isLogin && (
                  <>
                    <h1>Status Berlangganan Anda</h1>
                    <div className={s.subscriptions__contents_status_wrapper_inline}>
                      <h1 onClick={() => (window.location.href = '/accounts/profile?tab=subscription')}>
                        {titlePackage}
                      </h1>
                      <div>{showPackageList ? <p>&amp; {numberOfPackage} paket lainnya</p> : ''}</div>
                    </div>
                  </>
                )}
              </div>
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
                              {/* <sup>Rp</sup> */}
                              {/* {sub.attributes.currency} */}
                              {(price = sub.attributes.priceUnit !== '' ? sub.attributes.priceUnit : 'Rp')}{' '}
                              {getFormattedPrice(sub.attributes.price)}
                            </h1>
                            {/* <p>{sub.attributes.description.miniDescription}</p> */}
                          </div>

                          <div className={s.subscription_button_wrapper}>
                            <button
                              className={s.subscription_button_active}
                              onClick={() => this.handleClickSubs(accessToken, sub.id)}
                            >
                              Beli Paket
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
    ...state,
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

import React, { Component, Fragment } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { toastr } from 'react-redux-toastr'

import '@global/style/css/reactReduxToastr.css'
import withStyles from 'isomorphic-style-loader/lib/withStyles'

import history from '@source/history'

import Header from '@components/Header'
import LazyLoad from '@components/common/Lazyload'
import ContentProfile from './content/profile'
import ContentSecurity from './content/security'
import ContentSubscription from './content/subscription'
import subscribeActions from '@actions/subscribe'
import DropdownList from '@components/DropdownList'
import _get from 'lodash/get'

import { getPaymentDesc } from './util'

import styles from './profile.css'

class Profile extends Component {
  state = {
    whitelistedTabs: ['security', 'subscription', 'setting'],
    switch: false,
    isTabMobile: false,
    isActiveMenu: '',
    titleMenu: '',
    showSubs: false,
    // showSubscriptionTab: true,
  }
  componentDidMount() {
    const { getUserSubscriptions, user } = this.props

    getUserSubscriptions(user.uid)
    // getUserSubscriptions('E1tNwQpJZ0VP5TzsjDf7U6rZkk4qV9Uk')

    const { data } = this.props.subscribe

    const { query } = this.props,
      tab = this.state.whitelistedTabs.includes(query.tab)

    /* direct user to default tabs */
    // if (!tab) {
    //   setTimeout(() => {
    //     history.push('/accounts/profile')
    //   }, query.status_code ? 8000 : 0)
    // }

    /* flag to notify user once */
    this.flag = true

    /* switching tabs text */
    this.setState({
      switch: false,
    })
  }

  componentDidUpdate(prevProps) {
    const { query } = this.props

    const { data, meta } = this.props.subscribe
    const metaStatus = _get(meta, 'status', null)

    if (data.length !== prevProps.subscribe.data.length) {
      if (metaStatus === 'success') {
        // this.checkStatus()
      }
    }

    /* Notify user with payment details (.e.g success / failed) */
    if (this.flag && query.status_code) {
      if (query.status_code === '200') {
        toastr.info(
          'Notification',
          `Payment Successful! status ${query.transaction_status} with order ID ${query.order_id}`
        )
      } else {
        toastr.warning('Notification', getPaymentDesc(query.status_code))
      }
      this.flag = false
    }
  }

  // checkConfig() {
  //   const { configParams } = this.props

  //   console.log(enableSubs)

  //   if (enableSubs) {
  //     this.setState({
  //       showSubs: true,
  //     })
  //   } else {
  //     this.setState({
  //       showSubs: false,
  //     })
  //   }
  // }

  getCurrentActionTitle() {
    const { query } = this.props,
      tab = query.tab

    /* pindah tab tanpa ganti url */
    switch (tab) {
      case 'security':
        return 'Ubah sandi'
      case 'setting':
        return 'Ubah pengaturan'
      case 'subscription':
        return 'Aktifasi Premium'
      default:
        return 'Ubah profil'
    }
  }

  handleTabClick(tab) {
    history.push(`/accounts/profile${tab ? `?tab=${tab}` : ''}`)
  }

  // checkStatus() {
  //   const { data, meta } = this.props.subscribe
  //   let showSubscription = false

  //   if (data.length > 0) {
  //     showSubscription = data.find(x => x.subscriptionList[0].subscriptionId != 24)

  //     if (showSubscription) {
  //       this.setState({
  //         showSubscriptionTab: true,
  //       })
  //     } else {
  //       this.setState({
  //         showSubscriptionTab: false,
  //       })
  //     }
  //   }
  // }

  renderTabs() {
    const { data, meta } = this.props.subscribe
    // const metaStatus = _get(meta, 'status', null)

    const { query, isMobile, configParams } = this.props,
      tab = query.tab
    const enableSubs = configParams && configParams.data ? configParams.data.subscriptions_enabled : ''
    const { isTabMobile } = this.state

    return (
      <>
        {!isMobile && (
          <div className={styles.profile__tabs_container}>
            <div className={styles.profile__tabs_wrapper}>
              {this.state.switch ? (
                <LazyLoad containerClassName={styles.active}>{this.getCurrentActionTitle()}</LazyLoad>
              ) : (
                <Fragment>
                  <div
                    onClick={() => this.handleTabClick()}
                    className={!this.state.whitelistedTabs.includes(tab) ? styles.active : ''}
                  >
                    Profile
                  </div>
                  <div
                    onClick={() => this.handleTabClick('security')}
                    className={tab === 'security' ? styles.active : ''}
                  >
                    Security
                  </div>
                  {/* {this.state.showSubscriptionTab && ( */}
                  {enableSubs && (
                    <div
                      onClick={() => this.handleTabClick('subscription')}
                      className={tab === 'subscription' ? styles.active : ''}
                    >
                      Subscription
                    </div>
                  )}

                  {/* // )} */}
                  {/* <div onClick={() => this.handleTabClick('setting')} className={tab === 'setting' ? styles.active : ''}>
                Setelan
              </div> */}
                </Fragment>
              )}
            </div>
            {/* <button onClick={() => this.setState({ switch: !this.state.switch })}>TEST</button> */}
          </div>
        )}
      </>
    )
  }

  renderContents() {
    // const filterList = [
    //   { id: 1, title: 'Profile', value: 'profile' },
    //   { id: 2, title: 'Security', value: 'security' },
    //   { id: 3, title: 'Subscription', value: 'subscription' },
    // ]

    const { query } = this.props,
      tab = query.tab

    const { data, meta } = this.props.subscribe
    const { selectedTab } = this.state

    const metaStatus = _get(meta, 'status', null)

    return (
      <div className={styles.profile__contents_container}>
        {/* {this.props.isMobile && (
          <DropdownList
            className={styles.matches_dropdown_container}
            dataList={filterList}
            activeId={selectedTab}
            onClick={this.handleSelectClick}
          />
        )} */}

        <div className={styles.profile__contents_wrapper}>
          {tab === 'security' && (
            <ContentSecurity
              onClick={() => this.setState({ switch: !this.state.switch })}
              isMobile={this.props.isMobile}
            />
          )}
          {tab === 'subscription' && (
            <ContentSubscription
              onClick={() => this.setState({ switch: !this.state.switch })}
              isMobile={this.props.isMobile}
              data={this.props.subscribe.data}
            />
          )}
          {/* {tab === 'setting' && <div>setting</div>} */}
          {!this.state.whitelistedTabs.includes(tab) && (
            <ContentProfile
              onClick={() => this.setState({ switch: !this.state.switch })}
              isMobile={this.props.isMobile}
            />
          )}
        </div>
      </div>
    )
  }

  // jan di hapus yaw
  // renderContentsMobile() {
  //   const { query } = this.props,
  //     tab = query.tab

  //   const { data, meta } = this.props.subscribe
  //   const { selectedTab } = this.state

  //   const filterList = [
  //     { id: 1, title: 'Profile', value: 'profile' },
  //     { id: 2, title: 'Security', value: 'security' },
  //     { id: 3, title: 'Subscription', value: 'subscription' },
  //   ]
  //   const filterListNoSub = [
  //     { id: 1, title: 'Profile', value: 'profile' },
  //     { id: 2, title: 'Security', value: 'security' },
  //   ]

  //   return (
  //     <>
  //       <div className={styles.profile__contents_dropdown}>
  //         {this.props.isMobile && (
  //           <DropdownList
  //             className={styles.profile__contents_dropdown_container}
  //             dataList={this.state.showSubscriptionTab ? filterList : filterListNoSub}
  //             dataList={filterList}
  //             onClick={this.handleSelectClick}
  //             activeId={this.state.isActiveMenu}
  //           />
  //         )}
  //       </div>
  //     </>
  //   )
  // }

  handleSelectClick = value => {
    const { data, meta } = this.props.subscribe
    const { isActiveMenu } = this.state

    const metaStatus = _get(meta, 'status', null)

    this.setState({
      isActiveMenu: value,
    })
  }

  // jan di hapus yaw
  // renderMenuTab() {
  //   switch (this.state.isActiveMenu) {
  //     case 1:
  //       return (
  //         <>
  //           <div className={styles.profile__contents_container}>
  //             <div className={styles.profile__contents_wrapper}>
  //               <ContentProfile
  //                 onClick={() => this.setState({ switch: !this.state.switch })}
  //                 isMobile={this.props.isMobile}
  //               />
  //             </div>
  //           </div>
  //         </>
  //       )

  //     case 2:
  //       return (
  //         <>
  //           <div className={styles.profile__contents_container}>
  //             <div className={styles.profile__contents_wrapper}>
  //               <ContentSecurity
  //                 onClick={() => this.setState({ switch: !this.state.switch })}
  //                 isMobile={this.props.isMobile}
  //               />
  //             </div>
  //           </div>
  //         </>
  //       )

  //     case 3:
  //       return (
  //         <>
  //           <div className={styles.profile__contents_container}>
  //             <div className={styles.profile__contents_wrapper}>
  //               <ContentSubscription
  //                 data={this.props.subscribe.data}
  //                 onClick={() => this.setState({ switch: !this.state.switch })}
  //                 isMobile={this.props.isMobile}
  //               />
  //             </div>
  //           </div>
  //         </>
  //       )

  //     default:
  //       return (
  //         <>
  //           <div className={styles.profile__contents_container}>
  //             <ContentProfile
  //               onClick={() => this.setState({ switch: !this.state.switch })}
  //               isMobile={this.props.isMobile}
  //             />
  //           </div>
  //         </>
  //       )
  //   }
  // }

  renderQuery() {
    let titleMenu = 'Profile'
    const { query } = this.props
    if (query.tab === 'subscription') {
      titleMenu = 'Subscription'
    }
    if (query.tab === 'security') {
      titleMenu = 'Security'
    }
    return titleMenu
  }

  render() {
    const { isMobile, query } = this.props
    const titleHeader = this.renderQuery()
    // this.renderQuery()
    const { titleMenu } = this.state

    return (
      <div>
        {isMobile ? (
          <Header isMobile title={titleHeader} />
        ) : (
          <Header className={styles.placeholder__header} {...this.props} activeMenuId={9} />
        )}
        <div className={styles.profile__main_container}>
          {this.renderTabs()}
          {/* {this.props.isMobile && this.renderTabsMobile()} */}
          {this.renderContents()}
          {/* {!this.props.isMobile && this.renderTabs()} */}
          {/* {!this.props.isMobile && this.renderContents()} */}
          {/* {this.props.isMobile && this.renderContentsMobile()} */}
          {/* {this.props.isMobile && this.renderMenuTab()} */}
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    ...state,
    toaster: state.toastr.toastrs,
    subscribe: state.subscribe,
    user: state.user,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getUserSubscriptions: uid => dispatch(subscribeActions.getUserSubscriptions(uid)),
  }
}

export default compose(withStyles(styles), connect(mapStateToProps, mapDispatchToProps, null))(Profile)

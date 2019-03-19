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

import { getPaymentDesc } from './util'

import styles from './profile.css'

class Profile extends Component {
  state = {
    whitelistedTabs: ['security', 'subscription', 'setting'],
    switch: false,
  }
  componentDidMount() {
    const { query } = this.props,
      tab = this.state.whitelistedTabs.includes(query.tab)

    /* direct user to default tabs */
    if (!tab) {
      setTimeout(() => {
        history.push('/accounts/profile')
      }, query.status_code ? 8000 : 0)
    }

    /* flag to notify user once */
    this.flag = true

    /* switching tabs text */
    this.setState({
      switch: false,
    })
  }

  componentDidUpdate() {
    const { query } = this.props

    /* Notify user with payment details (.e.g success / failed) */
    if (this.flag && query.status_code) {
      if (query.status_code === '200') {
        toastr.info('Notification', `Payment Successful! status ${query.transaction_status} with order ID ${query.order_id}`)
      } else {
        toastr.warning('Notification', getPaymentDesc(query.status_code))
      }
      this.flag = false
    }
  }

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

  renderTabs() {
    const { query } = this.props,
      tab = query.tab

    return (
      <div className={styles.profile__tabs_container}>
        <div className={styles.profile__tabs_wrapper}>
          {this.state.switch ? (
            <LazyLoad containerClassName={styles.active}>{this.getCurrentActionTitle()}</LazyLoad>
          ) : (
            <Fragment>
              <div onClick={() => this.handleTabClick()} className={!this.state.whitelistedTabs.includes(tab) ? styles.active : ''}>
                Profil
              </div>
              <div onClick={() => this.handleTabClick('security')} className={tab === 'security' ? styles.active : ''}>
                Keamanan
              </div>
              <div onClick={() => this.handleTabClick('subscription')} className={tab === 'subscription' ? styles.active : ''}>
                Status
              </div>
              {/* <div onClick={() => this.handleTabClick('setting')} className={tab === 'setting' ? styles.active : ''}>
                Setelan
              </div> */}
            </Fragment>
          )}
        </div>
        {/* <button onClick={() => this.setState({ switch: !this.state.switch })}>TEST</button> */}
      </div>
    )
  }

  renderContents() {
    const { query } = this.props,
      tab = query.tab

    return (
      <div className={styles.profile__contents_container}>
        <div className={styles.profile__contents_wrapper}>
          {tab === 'security' && <ContentSecurity onClick={() => this.setState({ switch: !this.state.switch })} isMobile={this.props.isMobile} />}
          {tab === 'subscription' && <ContentSubscription onClick={() => this.setState({ switch: !this.state.switch })} isMobile={this.props.isMobile} />}
          {/* {tab === 'setting' && <div>setting</div>} */}
          {!this.state.whitelistedTabs.includes(tab) && <ContentProfile onClick={() => this.setState({ switch: !this.state.switch })} isMobile={this.props.isMobile} />}
        </div>
      </div>
    )
  }

  render() {
    return (
      <div>
        <Header libraryOff className={styles.placeholder__header} isDark={0} {...this.props} />
        {this.renderTabs()}
        {this.renderContents()}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    ...state,
    toaster: state.toastr.toastrs,
  }
}

export default compose(withStyles(styles), connect(mapStateToProps, null))(Profile)

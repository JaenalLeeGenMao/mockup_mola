import React, { Component, Fragment } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'

import withStyles from 'isomorphic-style-loader/lib/withStyles'

import history from '@source/history'

import Header from '@components/Header'
import LazyLoad from '@components/common/Lazyload'
import ContentSecurity from './content/security'
import ContentSubscription from './content/subscription'

import styles from './profile.css'

class Profile extends Component {
  state = {
    whitelistedTabs: ['security', 'subscription', 'setting'],
    switch: false,
  }
  componentDidMount() {
    const { query } = this.props,
      tab = this.state.whitelistedTabs.includes(query.tab)

    if (!tab) {
      history.push('/accounts/profile')
    }

    this.setState({
      switch: false,
    })
  }

  getCurrentActionTitle() {
    const { query } = this.props,
      tab = query.tab

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
              <div onClick={() => this.handleTabClick('setting')} className={tab === 'setting' ? styles.active : ''}>
                Setelan
              </div>
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
          {tab === 'setting' && <div>setting</div>}
          {!this.state.whitelistedTabs.includes(tab) && <div>profile</div>}
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
  }
}

export default compose(withStyles(styles), connect(mapStateToProps, null))(Profile)

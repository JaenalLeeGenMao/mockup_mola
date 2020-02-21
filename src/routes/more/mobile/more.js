import React, { Component } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import withStyles from 'isomorphic-style-loader/lib/withStyles'

import { fetchProfile } from '@actions/user'
import Link from '@components/Link'
import Header from '@components/Header'

import pkg from '../../../../package.json'
import LoginBox from './loginBox'
import styles from './more.css'
import { moreContent, footers } from './const'
export class More extends Component {
  state = {
    isLogin: false,
    content: [],
    email: '',
    isLoading: true,
  }
  componentDidMount() {
    this.filteredContent(this.props)
  }

  // componentDidUpdate(prevProps) {
  //   if (prevProps.user && this.props.user) {
  //     if (prevProps.user.uid !== this.props.user.uid || prevProps.user.sid !== this.props.user.sid) {
  //       this.filteredContent(this.props)
  //     }
  //   }
  // }

  filteredContent = props => {
    const { fetchProfile, user: { uid = '', sid = '' }, configParams, sidebarMenu } = props,
      isLogin = uid || sid ? true : false,
      isApple = /iPad|iPhone|iPod/.test(navigator.userAgent),
      subscriptions_enabled = configParams && configParams.data ? configParams.data.subscriptions_enabled : false,
      android_store_url = configParams && configParams.data ? configParams.data.store_url : '',
      ios_store_url = configParams && configParams.data ? configParams.data.ios_store_url : '',
      storeUrl = isApple ? ios_store_url : android_store_url,
      downloadText = isApple ? 'Available on Appstore' : 'Available on Playstore'

    let arrContent = []
    if (sidebarMenu && sidebarMenu.data) {
      arrContent = isLogin
        ? sidebarMenu.data.filter(dt => dt.visibility.login)
        : sidebarMenu.data.filter(dt => dt.visibility.not_login)
      arrContent = subscriptions_enabled ? arrContent : arrContent.filter(dt => !dt.visibility.subscribe)
      arrContent = isApple ? arrContent.filter(dt => dt.platform.ios) : arrContent.filter(dt => dt.platform.android)

      // changing store url and text for download app
      const idxDownloadApp = arrContent.findIndex(dt => dt.label.toLowerCase().includes('download'))
      if (idxDownloadApp !== -1) {
        arrContent[idxDownloadApp].description = downloadText
        arrContent[idxDownloadApp].menuAction.action = storeUrl
      }
    }

    fetchProfile()
      .then(() => {
        const { user: { email = '' } } = this.props
        this.setState({
          content: arrContent,
          isLogin,
          email,
          isLoading: false,
        })
      })
      .catch(() => {
        this.setState({
          content: arrContent,
          isLogin,
          isLoading: false,
        })
      })
  }

  render() {
    const { isLogin, content, email, isLoading } = this.state
    return (
      <>
        {!isLoading && (
          <>
            <div className={styles.header__container}>
              <Header isMobile {...this.props} />
            </div>
            <div style={{ height: '60px' }} />
            <LoginBox isLogin={isLogin} email={email} />
            <div className={styles.menu__container}>
              {content.length > 0 &&
                content.map(dt => (
                  <div key={dt.label} className={styles.menu__wrapper}>
                    <a href={dt.menuAction.action} className={styles.img__wrapper}>
                      <img className={styles.img__menu} src={dt.icon} />
                    </a>
                    <div className={styles.info__wrapper}>
                      <a href={dt.menuAction.action} className={styles.menu__title}>
                        {' '}
                        {dt.label}{' '}
                      </a>
                      <div className={styles.menu__info}> {dt.description} </div>
                    </div>
                  </div>
                ))}
            </div>
            <div className={styles.footer__container}>
              {footers.map(footer => (
                <div key={footer.id} className={styles.footer__wrapper}>
                  <Link to={footer.url} className={styles.footer__list}>
                    {' '}
                    {footer.list}{' '}
                  </Link>
                </div>
              ))}
              <div>
                <div className={styles.system__info}> Version </div>
                <div className={styles.system__info}> {pkg.version} </div>
              </div>
              {isLogin && (
                <a href="/signout" className={styles.btn__logout}>
                  {' '}
                  Logout{' '}
                </a>
              )}
            </div>
          </>
        )}
      </>
    )
  }
}

const mapStateToProps = state => {
  return {
    ...state,
  }
}

const mapDispatchToProps = dispatch => ({
  fetchProfile: () => dispatch(fetchProfile()),
})

export default compose(withStyles(styles), connect(mapStateToProps, mapDispatchToProps))(More)

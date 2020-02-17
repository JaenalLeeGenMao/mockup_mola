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
    showSubs: false,
    isLoading: true,
  }
  async componentDidMount() {
    const { fetchProfile, user: { uid = '', sid = '' }, configParams } = this.props,
      android_store_url = configParams && configParams.data ? configParams.data.store_url : '',
      ios_store_url = configParams && configParams.data ? configParams.data.ios_store_url : '',
      subscriptions_enabled = configParams && configParams.data ? configParams.data.subscriptions_enabled : '',
      isApple = /iPad|iPhone|iPod/.test(navigator.userAgent),
      storeUrl = isApple ? ios_store_url : android_store_url,
      downloadText = isApple ? 'Available on Appstore' : 'Available on Playstore',
      isLogin = sid ? true : false,
      content = moreContent(storeUrl, downloadText, isLogin)

    await fetchProfile()
      .then(() => {
        const { user: { email = '' } } = this.props
        this.setState({
          content,
          isLogin: uid || sid ? true : false,
          showSubs: subscriptions_enabled ? true : false,
          email,
          isLoading: false,
        })
      })
      .catch(() => {
        this.setState({
          content,
          isLogin: uid || sid ? true : false,
          showSubs: subscriptions_enabled ? true : false,
          isLoading: false,
        })
      })
  }

  render() {
    const { isLogin, content, email, showSubs, isLoading } = this.state
    let filteredMoreContent = !isLogin ? content.filter(content => content.id !== 3) : content

    if (!showSubs) {
      filteredMoreContent = !isLogin ? content.filter(content => content.id !== 3) : content
    }

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
              {filteredMoreContent.length > 0 &&
                filteredMoreContent.map(dt => (
                  <div key={dt.id} className={styles.menu__wrapper}>
                    <a href={dt.url} className={styles.img__wrapper}>
                      <div className={`${styles.img__menu} ${dt.img}`} />
                    </a>
                    <div className={styles.info__wrapper}>
                      <a href={dt.url} className={styles.menu__title}>
                        {' '}
                        {dt.title}{' '}
                      </a>
                      <div className={styles.menu__info}> {dt.info} </div>
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

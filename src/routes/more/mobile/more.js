import React, { Component } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import withStyles from 'isomorphic-style-loader/lib/withStyles'

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
  }
  componentDidMount() {
    const { user: { uid = '', sid = '' }, configParams: { store_url = '', ios_store_url = '' } } = this.props
    const isApple = /iPad|iPhone|iPod/.test(navigator.userAgent),
      storeUrl = isApple ? ios_store_url : store_url,
      downloadText = isApple ? 'gratis di Appstore' : 'gratis di Playstore',
      content = moreContent(storeUrl, downloadText)
    this.setState({
      content,
      isLogin: uid || sid ? true : false,
    })
  }

  render() {
    const { isLogin, content } = this.state
    const { user } = this.props
    const filteredMoreContent = !isLogin ? content.filter(content => content.id !== 2 && content.id !== 3) : content
    return (
      <>
        <div className={styles.header__container}>
          <Header isMobile {...this.props} />
        </div>
        <div style={{ height: '60px' }} />
        <LoginBox isLogin={isLogin} user={user} />
        <div className={styles.menu__container}>
          {filteredMoreContent.length > 0 &&
            filteredMoreContent.map(dt => (
              <div key={dt.id} className={styles.menu__wrapper}>
                <Link to={dt.url} className={styles.img__wrapper}>
                  <div className={`${styles.img__menu} ${dt.img}`} />
                </Link>
                <div className={styles.info__wrapper}>
                  <Link to={dt.url} className={styles.menu__title}>
                    {' '}
                    {dt.title}{' '}
                  </Link>
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
          <div className={styles.system__info}> Web Version </div>
          <div className={styles.system__info}> {pkg.version} </div>
          {isLogin && (
            <Link to={'/signout'} className={styles.btn__logout}>
              {' '}
              Logout{' '}
            </Link>
          )}
        </div>
      </>
    )
  }
}

const mapStateToProps = state => {
  return {
    ...state,
  }
}

export default compose(withStyles(styles), connect(mapStateToProps, null))(More)

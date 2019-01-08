import React, { Component } from 'react'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import $ from 'jquery'

import Auth from '@api/auth'

import LazyLoad from '@components/common/Lazyload'
import Link from '@components/Link'

import { getLocale } from '../locale'

import styles from './right-menu.css'

class RightMenu extends Component {
  state = {
    link: '',
    locale: getLocale(),
  }

  componentDidMount() {
    this.setState({ link: window.location.href })
  }

  handleSignOut = e => {
    e.preventDefault()
    const { user: { uid }, runtime: { csrf } } = this.props
    Auth.requestLogout({ uid, csrf }).then(response => {
      if (response.meta.status === 'success') {
        window.location.href = '/signout'
      }
    })
  }

  handleCopyToClipboard = e => {
    e.preventDefault()
    var copyText = document.getElementById('myInput')
    copyText.select()
    copyText.disabled = true
    document.execCommand('copy')

    var tooltip = document.getElementById('myTooltip')
    tooltip.innerHTML = 'Copied'
  }

  outFunc = e => {
    e.preventDefault()
    var tooltip = document.getElementById('myTooltip')
    tooltip.innerHTML = 'Copy to clipboard'
  }

  render() {
    const { locale } = this.state
    const { color, searchOff, profileOff, shareButtonOn, user: { uid = '', sid = '', firstName = '' } } = this.props,
      userID = uid || sid
    return (
      <div className={styles.right__menu}>
        {!searchOff && (
          <span className={styles.right__menu_wrapper}>
            <LazyLoad className={styles.right__menu_icon_wrapper}>
              <Link className={color === 'black' ? styles.right__menu_search_black : styles.right__menu_search_white} to="/search" />
            </LazyLoad>
          </span>
        )}
        {!profileOff && (
          <span className={styles.right__menu_wrapper}>
            {/* <LazyLoad><FaUserCircle size='32' color={color} /></LazyLoad> */}
            <LazyLoad className={styles.right__menu_icon_wrapper}>
              <div className={color === 'black' ? styles.right__menu_profile_black : styles.right__menu_profile_white} />
            </LazyLoad>
            <div className={styles.right__menu_dropdown_wrapper}>
              <div className={styles.right__menu_dropdown} style={{ color, backgroundColor: color === 'black' ? 'rgba(255, 255, 255, .85)' : 'rgba(0, 0, 0, .85)' }}>
                {userID ? (
                  <Link style={{ color }} to="/signout" onClick={this.handleSignOut}>
                    {firstName ? `${firstName},` : ''} {locale['sign_out']}
                  </Link>
                ) : (
                  <Link style={{ color }} to="/accounts/login">
                    {locale['login']}
                  </Link>
                )}
                {userID && (
                  <Link style={{ color }} to="/accounts/profile">
                    {locale['account']}
                  </Link>
                )}
                {/* {userID && (
                <Link style={{ color }} to="/accounts/history">
                  {locale['history']}
                </Link>
              )}
              {userID && (
                <Link style={{ color }} to="/accounts/inbox">
                  {locale['inbox']}
                </Link>
              )} */}
                <Link style={{ color }} to="/system-info">
                  {locale['system_info']}
                </Link>
                <div className={styles.right__menu_dropdown_footer}>
                  <Link style={{ color }} to="/">
                    {locale['privacy']}
                  </Link>
                  &bull;
                  <Link style={{ color }} to="/">
                    {locale['terms']}
                  </Link>
                  &bull;
                  <Link style={{ color }} to="/">
                    {locale['help']}
                  </Link>
                </div>
              </div>
            </div>
          </span>
        )}
        {shareButtonOn && (
          <span className={styles.right__menu_wrapper}>
            <LazyLoad className={styles.right__menu_icon_wrapper}>
              <input type="text" value={this.state.link} id="myInput" style={{ position: 'fixed', transform: 'translate(-100%, -500%)' }} />
              <div className={styles.right__menu_tooltip}>
                <button onClick={this.handleCopyToClipboard} onMouseOut={this.outFunc} to="">
                  <link className={color === 'black' ? styles.right__menu_share_black : styles.right__menu_share_white} />
                  <span className={styles.right__menu_tooltip_text} id="myTooltip">
                    Copy to clipboard
                  </span>
                </button>
              </div>
            </LazyLoad>
          </span>
        )}
      </div>
    )
  }
}

export default withStyles(styles)(RightMenu)

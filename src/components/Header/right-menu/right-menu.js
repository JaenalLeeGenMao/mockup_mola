import React, { Component } from 'react'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import $ from 'jquery'

import Auth from '@api/auth'

import LazyLoad from '@components/common/Lazyload'
import Footer from '@components/Footer'
import Link from '@components/Link'

import { getLocale } from '../locale'

import styles from './right-menu.css'

const PopupMenu = ({ user, locale, onClick, onSignOut }) => {
  const { uid = '', sid = '', firstName = '', lastName = '', photo = '' } = user
  const isLogin = uid || sid
  return (
    <LazyLoad containerClassName={styles.popup__menu_container}>
      <div className={styles.popup__menu_header}>
        <span className={styles.popup__menu_close} onClick={onClick} />
      </div>
      <div className={styles.popup__menu_content}>
        {isLogin && (
          <>
            <div className={styles.popup__menu_profile_container}>
              <Link to="/accounts/profile" className={styles.popup__menu_image_wrapper}>
                <img alt="mola user profile" src={photo} className={styles.popup__menu_image} />
              </Link>
              <h2 className={styles.popup__menu_username}>{`${firstName} ${lastName}`}</h2>
            </div>
            <Link to="/accounts/profile">{locale['profile']}</Link>
            <Link to="/accounts/inbox">{locale['inbox']}</Link>
            <Link to="/accounts/history">{locale['video_history']}</Link>
            <Link to="/accounts/profile?tab=subscription">{locale['paket_MOLA']}</Link>
            <Link to="/accounts/profile?tab=transaction">{locale['transaction_history']}</Link>
          </>
        )}
        <Link to="/signout" className={styles.popup__menu_signout} onClick={onSignOut}>
          {locale['sign_out']}
        </Link>
        <Footer />
      </div>
    </LazyLoad>
  )
}

class RightMenu extends Component {
  state = {
    link: '',
    toggle: false /* Toggle profile */,
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

  handleMouseOut = e => {
    e.preventDefault()
    var tooltip = document.getElementById('myTooltip')
    tooltip.innerHTML = 'Copy to clipboard'
  }

  handleToggle = () => {
    const { user: { uid = '', sid = '' } } = this.props
    const isLogin = uid || sid
    if (isLogin) {
      const { toggle } = this.state
      this.setState({ toggle: !toggle })
    } else {
      window.location.href = '/accounts/login'
    }
  }

  render() {
    const { toggle } = this.state
    const { color, searchOff, profileOff, shareButtonOn } = this.props

    return (
      <>
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
              <LazyLoad className={styles.right__menu_icon_wrapper} onClick={this.handleToggle}>
                <div className={color === 'black' ? styles.right__menu_profile_black : styles.right__menu_profile_white} />
              </LazyLoad>
            </span>
          )}
          {shareButtonOn && (
            <span className={styles.right__menu_wrapper}>
              <LazyLoad className={styles.right__menu_icon_wrapper}>
                <input type="text" value={this.state.link} id="myInput" style={{ position: 'fixed', transform: 'translate(-100%, -500%)' }} />
                <div className={styles.right__menu_tooltip}>
                  <button onClick={this.handleCopyToClipboard} onMouseOut={this.handleMouseOut} to="">
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
        {toggle && <PopupMenu onClick={this.handleToggle} user={this.props.user} locale={this.state.locale} onSignOut={this.handleSignOut} />}
      </>
    )
  }
}

withStyles(styles)(PopupMenu)

export default withStyles(styles)(RightMenu)

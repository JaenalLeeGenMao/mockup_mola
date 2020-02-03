import React, { Component } from 'react'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import _ from 'lodash'

import LazyLoad from '@components/common/Lazyload'
import Footer from '@components/Footer'
import Link from '@components/Link'

import { getLocale } from '../locale'

import styles from './new-header.css'
import history from '@source/history'
import DropdownMenu from '../dropdown-menu'

import { get } from 'axios'

const PopupMenu = ({ user, locale, onClick, onProfileClick, onSignOut }) => {
  const { uid = '', sid = '', firstName = '', lastName = '', photo = '' } = user
  const isLogin = uid || sid

  let name = `${firstName} ${lastName}`
  if (firstName == null) {
    name = ''
  }
  return (
    <LazyLoad containerClassName={styles.popup__menu_container}>
      <div className={styles.popup__menu_header}>
        <div className={styles.popup__menu_close} onClick={onClick} />
      </div>
      <div className={styles.popup__menu_content}>
        {isLogin && (
          <>
            <div className={styles.popup__menu_profile_container}>
              <h2 className={styles.popup__menu_username}>{name}</h2>
            </div>
            <Link onClick={onProfileClick}>{locale['profile']}</Link>
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
class NewHeader extends Component {
  state = {
    locale: getLocale(),
    headerMenuList: [],
    toggle: false /* Toggle profile */,
    newNotif: {
      status: false,
      totalNewNotif: 0,
    },
    filters: '/libraries',
  }

  handleProfileClick = () => {
    const { toggle } = this.state
    this.setState({ toggle: !toggle })
    history.push('/accounts/profile')
  }

  handleToggle = e => {
    const { user: { uid = '', sid = '' } } = this.props
    const isLogin = uid || sid
    if (isLogin) {
      const { toggle } = this.state
      this.setState({ toggle: !toggle })
    } else {
      window.location.href = '/accounts/login'
    }
    e.preventDefault()
  }

  handleSignOut = e => {
    e.preventDefault()
    window.location.href = '/signout'
  }

  handleNavigation = (e, id) => {
    const { menu: { data: headerMenu } } = this.props
    const filteredMenu = headerMenu
      ? headerMenu.filter(dt => {
          return dt.id == id
        })
      : []

    if (filteredMenu.length > 0) {
      const absMenuUrl = filteredMenu[0].attributes.url
      const absMenuArray = absMenuUrl.split('/')
      const isHome = absMenuArray.length <= 3
      const relMenuUrl = isHome ? '/' : '/' + absMenuUrl.replace(/^(?:\/\/|[^\/]+)*\//, '')

      if (filteredMenu[0].id == 9) {
        this.handleToggle(e)
      } else {
        history.push(relMenuUrl)
      }
    }
  }

  render() {
    const { isMobile = false, isLandscape, pathname = '/', menu: { data: headerMenu }, activeMenuId } = this.props
    const { toggle, newNotif, filters } = this.state
    const headerMenuList = headerMenu ? headerMenu : []
    return (
      <>
        <div className={styles.header__menu}>
          <LazyLoad className={styles.header__menu_icon_wrapper}>
            <div className={styles.header_menu_outer}>
              {!isMobile && (
                <>
                  {headerMenuList.map((dts, index) => {
                    const absMenuUrl = dts.attributes.url
                    const absMenuArray = absMenuUrl.split('/')
                    const isHome = absMenuArray.length <= 3
                    const relMenuUrl = isHome ? '/' : '/' + absMenuUrl.replace(/^(?:\/\/|[^\/]+)*\//, '')
                    let isActive = ''

                    if (activeMenuId) {
                      isActive = dts.id == activeMenuId
                    } else {
                      isActive = isHome ? pathname == relMenuUrl : pathname.indexOf(relMenuUrl) > -1
                    }

                    const title = _.get(dts, 'attributes.title.en', '')
                    if (dts.id === 1) {
                      return (
                        <>
                          <Link
                            key={dts.id}
                            title={title}
                            className={`tourCategory${dts.id} ${isActive ? styles.header_menu__active : ''}`}
                            to={relMenuUrl}
                          >
                            {title}
                          </Link>
                          <Link
                            key={'promo-bca'}
                            title={'Promo BCA'}
                            to={'/promo/bca?utm_source=molatv&utm_medium=web-header'}
                          >
                            Promo BCA
                          </Link>
                        </>
                      )
                    }
                  })}

                  {headerMenuList.length > 0 && (
                    <div className="tourCategory" style={{ display: 'inline-block' }}>
                      {headerMenuList.map((dts, index) => {
                        const absMenuUrl = dts.attributes.url
                        const absMenuArray = absMenuUrl.split('/')
                        const isHome = absMenuArray.length <= 3
                        const relMenuUrl = isHome ? '/' : '/' + absMenuUrl.replace(/^(?:\/\/|[^\/]+)*\//, '')
                        let isActive = ''

                        if (activeMenuId) {
                          isActive = dts.id == activeMenuId
                        } else {
                          isActive = isHome ? pathname == relMenuUrl : pathname.indexOf(relMenuUrl) > -1
                        }

                        const title = _.get(dts, 'attributes.title.en', '')
                        if (dts.id > 1 && dts.id < 6) {
                          return (
                            <Link
                              key={dts.id}
                              title={title}
                              className={`tourCategory${dts.id} ${isActive ? styles.header_menu__active : ''}`}
                              to={relMenuUrl}
                            >
                              {title}
                            </Link>
                          )
                        }
                      })}
                    </div>
                  )}
                  {headerMenuList.map((dts, index) => {
                    const absMenuUrl = dts.attributes.url
                    const absMenuArray = absMenuUrl.split('/')
                    const isHome = absMenuArray.length <= 3
                    const relMenuUrl = isHome ? '/' : '/' + absMenuUrl.replace(/^(?:\/\/|[^\/]+)*\//, '')
                    let isActive = ''

                    if (activeMenuId) {
                      isActive = dts.id == activeMenuId
                    } else {
                      isActive = isHome ? pathname == relMenuUrl : pathname.indexOf(relMenuUrl) > -1
                    }

                    const title = _.get(dts, 'attributes.title.en', '')
                    if (dts.id >= 6 && dts.id != 9) {
                      return (
                        <Link
                          key={dts.id}
                          title={title}
                          className={`tourCategory${dts.id} ${isActive ? styles.header_menu__active : ''}`}
                          to={relMenuUrl}
                        >
                          {title}
                        </Link>
                      )
                    } else if (dts.id == 9) {
                      return (
                        <Link
                          key={dts.id}
                          title={title}
                          className={`tourCategory${dts.id} ${isActive ? styles.header_menu__active : ''}`}
                          onClick={this.handleToggle}
                        >
                          {title}
                        </Link>
                      )
                    }
                  })}
                </>
              )}
            </div>
            {isMobile && (
              <>
                <div
                  className={`${styles.header__menu_wrapper_m} tourHamburger ${
                    isLandscape ? styles.header_menu_select_wrapper__ls : ''
                  }`}
                >
                  {/* <Link to="/live-support">
                    <div className={styles.icon_livechat} />
                  </Link> */}
                </div>
              </>
            )}
            {toggle && (
              <PopupMenu
                onClick={this.handleToggle}
                onProfileClick={this.handleProfileClick}
                user={this.props.user}
                locale={this.state.locale}
                onSignOut={this.handleSignOut}
              />
            )}
          </LazyLoad>
        </div>
      </>
    )
  }
}

export default withStyles(styles)(NewHeader)

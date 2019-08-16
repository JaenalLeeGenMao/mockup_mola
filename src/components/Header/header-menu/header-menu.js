import React, { Component } from 'react'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import _ from 'lodash'
// import $ from 'jquery'

// import Auth from '@api/auth'

import LazyLoad from '@components/common/Lazyload'
import Footer from '@components/Footer'
import Link from '@components/Link'

import { getLocale } from '../locale'

import styles from './header-menu.css'
import history from '@source/history'
// import { IoIosArrowDown } from 'react-icons/io'
import DropdownMenu from '../dropdown-menu'
// import { connect } from 'tls'

import { get } from 'axios'

const PopupMenu = ({ user, locale, onClick, onSignOut }) => {
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
              <Link to="/accounts/profile" className={styles.popup__menu_image_wrapper}>
                {photo && <img alt="mola user profile" src={photo} className={styles.popup__menu_image} />}
              </Link>
              <h2 className={styles.popup__menu_username}>{name}</h2>
            </div>
            <Link to="/accounts/profile">{locale['profile']}</Link>
            {/* <Link to="/accounts/inbox" onClick={onClick}>{locale['inbox']}</Link> */}
            {/* <Link to="/accounts/history" onClick={onClick}>{locale['video_history']}</Link> */}
            {/* <Link to="/accounts/profile?tab=subscription" onClick={onClick}>{locale['paket_MOLA']}</Link> */}
            {/* <Link to="/accounts/profile?tab=transaction" onClick={onClick}>{locale['transaction_history']}</Link> */}
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
class HeaderMenu extends Component {
  state = {
    locale: getLocale(),
    headerMenuList: [],
    toggle: false /* Toggle profile */,
  }

  componentDidMount() {
    // this.getHeaderMenus()
  }

  // getHeaderMenus = () => {
  //   const headerUrl =
  //     config.env === 'production'
  //       ? 'https://mola01.koicdn.com/dev/json/menu.json'
  //       : 'https://cdn.stag.mola.tv/mola/dev/json/menu.json'
  //   get(headerUrl).then(({ data }) => {
  //     this.setState({ headerMenuList: data ? data.data : [] })
  //   })
  // }

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

  handleNavigation = id => {
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
      // const isActive = isHome ? pathname == relMenuUrl : pathname.indexOf(relMenuUrl) > -1

      if (filteredMenu[0].id == 9) {
        this.handleToggle()
      } else {
        history.push(relMenuUrl)
      }
    }
  }

  render() {
    const { isMobile = false, isLandscape, pathname = '/', menu: { data: headerMenu } } = this.props
    const { toggle } = this.state
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
                    const isActive = isHome ? pathname == relMenuUrl : pathname.indexOf(relMenuUrl) > -1
                    const title = _.get(dts, 'attributes.title.en', '')
                    if (dts.id === 1) {
                      return (
                        <Link
                          key={dts.id}
                          title={title}
                          className={`tourCategory${title} ${isActive ? styles.header_menu__active : ''}`}
                          to={relMenuUrl}
                        >
                          {title}
                        </Link>
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
                        const isActive = isHome ? pathname == relMenuUrl : pathname.indexOf(relMenuUrl) > -1
                        const title = _.get(dts, 'attributes.title.en', '')
                        if (dts.id > 1 && dts.id < 6) {
                          return (
                            <Link
                              key={dts.id}
                              title={title}
                              className={`tourCategory${title} ${isActive ? styles.header_menu__active : ''}`}
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
                    const isActive = isHome ? pathname == relMenuUrl : pathname.indexOf(relMenuUrl) > -1
                    const title = _.get(dts, 'attributes.title.en', '')
                    if (dts.id >= 6 && dts.id != 9) {
                      return (
                        <Link
                          key={dts.id}
                          title={title}
                          className={`tourCategory${title} ${isActive ? styles.header_menu__active : ''}`}
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
                          className={`tourCategory${title} ${isActive ? styles.header_menu__active : ''}`}
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
              <div
                className={`${styles.header__menu_wrapper_m} tourHamburger ${
                  isLandscape ? styles.header_menu_select_wrapper__ls : ''
                }`}
              >
                <DropdownMenu
                  className={styles.header_menu_dropdown_container}
                  pathname={pathname}
                  dataList={headerMenuList}
                  // activeId={activeMenuDropdown}
                  onClick={this.handleNavigation}
                />
              </div>
            )}
            {/* <div
                  className={`${styles.header__menu_wrapper_m} tourHamburger ${
                    isLandscape ? styles.header_menu_select_wrapper__ls : ''
                  }`}
                >
                  <DropdownMenu
                    className={styles.header_menu_dropdown_container}
                    pathname={pathname}
                    dataList={headerMenuList}
                    activeId={activeMenuDropdown}
                    onClick={this.handleNavigation}
                  />
                </div> */}
            {toggle && (
              <PopupMenu
                onClick={this.handleToggle}
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

export default withStyles(styles)(HeaderMenu)

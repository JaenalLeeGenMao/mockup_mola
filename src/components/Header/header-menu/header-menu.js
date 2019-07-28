import React, { Component } from 'react'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import _ from 'lodash'
// import $ from 'jquery'

// import Auth from '@api/auth'

import LazyLoad from '@components/common/Lazyload'
// import Footer from '@components/Footer'
import Link from '@components/Link'

import { getLocale } from '../locale'

import styles from './header-menu.css'
import history from '@source/history'
// import { IoIosArrowDown } from 'react-icons/io'
import DropdownMenu from '../dropdown-menu'

import { compose } from 'redux'
import { connect } from 'react-redux'

// import { connect } from 'tls'

import { get } from 'axios'

let menu = []
class HeaderMenu extends Component {
  state = {
    locale: getLocale(),
    activeMenu: this.props.activeMenu ? this.props.activeMenu : 'movie',
    headerMenuList: [],
  }

  componentDidMount() {
    this.getHeaderMenus()
  }

  getHeaderMenus = () => {
    // link w/ libraries
    get('https://mola01.koicdn.com/dev/json/menu.json').then(({ data }) => {
      this.setState({ headerMenuList: data ? data.data : [] })
    })
  }

  handleNavigation = id => {
    const { headerMenuList: menu } = this.state
    const filteredMenu = menu.filter(dt => {
      return dt.id == id
    })

    if (filteredMenu.length > 0) {
      const absMenuUrl = filteredMenu[0].attributes.url
      const absMenuArray = absMenuUrl.split('/')
      const isHome = absMenuArray.length <= 3
      const relMenuUrl = isHome ? '/' : '/' + absMenuUrl.replace(/^(?:\/\/|[^\/]+)*\//, '')
      // const isActive = isHome ? pathname == relMenuUrl : pathname.indexOf(relMenuUrl) > -1
      history.push(relMenuUrl)
    }
  }

  render() {
    const {
      headerMenuOff,
      activeMenu = 'movie',
      isMobile = false,
      isLandscape,
      pathname = '/',
    } = this.props
    const { headerMenuList } = this.state

    let activeMenuDropdown = ''
    activeMenuDropdown = activeMenu
    return (
      <>
        <div className={styles.header__menu}>
          {!headerMenuOff && (
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
                      if (index === 0) {
                        return (
                          <Link key={dts.id} title={title}
                            className={`tourCategory${title} ${isActive ? styles.header_menu__active : ''}`}
                            to={relMenuUrl}>
                            {title}
                          </Link>
                        )
                      }
                    }
                    )}
                    <div className='tourCategory' style={{ display: 'inline-block' }}>
                      {headerMenuList.map((dts, index) => {
                        const absMenuUrl = dts.attributes.url
                        const absMenuArray = absMenuUrl.split('/')
                        const isHome = absMenuArray.length <= 3
                        const relMenuUrl = isHome ? '/' : '/' + absMenuUrl.replace(/^(?:\/\/|[^\/]+)*\//, '')
                        const isActive = isHome ? pathname == relMenuUrl : pathname.indexOf(relMenuUrl) > -1
                        const title = _.get(dts, 'attributes.title.en', '')
                        if (index > 0 && index < 5) {
                          return (
                            <Link key={dts.id} title={title}
                              className={`tourCategory${title} ${isActive ? styles.header_menu__active : ''}`}
                              to={relMenuUrl}>
                              {title}
                            </Link>
                          )
                        }
                      }
                      )}
                    </div>
                    {headerMenuList.map((dts, index) => {
                      const absMenuUrl = dts.attributes.url
                      const absMenuArray = absMenuUrl.split('/')
                      const isHome = absMenuArray.length <= 3
                      const relMenuUrl = isHome ? '/' : '/' + absMenuUrl.replace(/^(?:\/\/|[^\/]+)*\//, '')
                      const isActive = isHome ? pathname == relMenuUrl : pathname.indexOf(relMenuUrl) > -1
                      const title = _.get(dts, 'attributes.title.en', '')
                      if (index >= 5) {
                        return (
                          <Link key={dts.id} title={title}
                            className={`tourCategory${title} ${isActive ? styles.header_menu__active : ''}`}
                            to={relMenuUrl}>
                            {title}
                          </Link>
                        )
                      }
                    }
                    )}
                  </>
                )}
                {isMobile && (
                  <div
                    className={`${styles.header__menu_wrapper_m} ${
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
                  </div>
                )}
              </div>
            </LazyLoad>
          )}
        </div>
      </>
    )
  }
}

function mapStateToProps(state) {
  // console.log('see state', state)
  return {
    ...state,
  }
}
const mapDispatchToProps = dispatch => ({
  getHeaderMenu: () => dispatch(getHeaderMenu()),
})

export default compose(withStyles(styles), connect(mapStateToProps, mapDispatchToProps))(HeaderMenu)

import React, { Component } from 'react'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
// import $ from 'jquery'

// import Auth from '@api/auth'

import LazyLoad from '@components/common/Lazyload'
// import Footer from '@components/Footer'
import Link from '@components/Link'

import { getLocale } from '../locale'

import styles from './header-menu.css'
import history from '@source/history'
// import { IoIosArrowDown } from 'react-icons/io'
import DropdownList from '@components/DropdownList'

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
    const { activePlaylist, activeMenu, isMobile } = this.props
    this.getHeaderMenus()
  }

  getHeaderMenus = () => {
    // link w/ libraries
    get('https://mola01.koicdn.com/dev/json/menu-stag.json').then(({ data }) => {
      this.setState({ headerMenuList: data ? data.data : [] })
    })
  }

  handleNavigation = id => {
    const filteredMenu = menu.filter(dt => {
      return dt.id == id
    })
    history.push(filteredMenu.length > 0 && filteredMenu[0].linkUrl)
  }

  render() {
    const { color, headerMenuOff, isMovie, activeMenu = 'movie', activePlaylist, isMobile, isLandscape, pathname } = this.props
    const { uid, sid } = this.props.user
    const menuTemp = this.state.headerMenuList

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
                    {menuTemp.map(dts => {
                      return (
                        <Link key={dts.id} title={dts.attributes.title.en} className={pathname === dts.attributes.url ? styles.header_menu__active : ''} to={dts.attributes.url}>
                          {dts.attributes.title.en}
                        </Link>
                      )
                    })}
                  </>
                )}
                {isMobile && (
                  <div className={`${styles.header__menu_wrapper_m} ${isLandscape ? styles.header_menu_select_wrapper__ls : ''}`}>
                    <DropdownList className={styles.header_menu_dropdown_container} dataList={menu} activeId={activeMenuDropdown} onClick={this.handleNavigation} />
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

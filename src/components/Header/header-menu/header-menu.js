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
    menu = [
      {
        id: 'movie',
        title: 'Movie',
        linkUrl: '/',
      },
      {
        id: 'sport',
        title: 'Sports',
        linkUrl: '/sports',
      },
      {
        id: 'channels',
        title: 'Channels',
        linkUrl: '/channels',
      },
      {
        id: 'matches',
        title: 'Matches',
        linkUrl: '/matches',
      },
      // {
      //   id: 'library',
      //   title: 'library',
      //   linkUrl: `movie-library${activePlaylist ? `/${activePlaylist.id.replace('f-', '')}` : ''}`,
      // },
    ]

    // const showLibrary = !isMobile && (activeMenu === 'movie' || activeMenu === 'library' || activeMenu === 'channels')
    // if (showLibrary) {
    //   const libraryUrl = `movie-library${activePlaylist ? `/${activePlaylist.id.replace('f-', '')}` : ''}`
    //   menu.push({ id: 'library', title: 'Library', linkUrl: libraryUrl })
    // }

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
    const { color, headerMenuOff, isMovie, activeMenu = 'movie', activePlaylist, isMobile, isLandscape } = this.props
    const { uid, sid } = this.props.user
    const menuTemp = this.state.headerMenuList

    let activeMenuDropdown = ''
    activeMenuDropdown = activeMenu
    // if (activeMenu === 'library') {
    //   activeMenuDropdown = 'movie'
    // } else if (activeMenu === 'matches') {
    //   activeMenuDropdown = 'sport'
    // } else {
    //   activeMenuDropdown = activeMenu
    // }
    // let libraryUrl = ''
    // const showLibrary = activeMenu === 'movie' || activeMenu === 'library' || activeMenu === 'channels' || activeMenu === 'search' || activeMenu === 'profile'
    //  activeMenu === 'signout'
    // if (showLibrary) {
    //   libraryUrl = `movie-library${activePlaylist ? `/${activePlaylist.id.replace('f-', '')}` : ''}`
    // }
    return (
      <>
        <div className={styles.header__menu}>
          {!headerMenuOff && (
            <span>
              <LazyLoad className={styles.header__menu_icon_wrapper}>
                <div className={styles.header_menu_outer}>
                  {!isMobile && (
                    <>
                      {menuTemp.map(dts => {
                        return (
                          <Link key={dts.id} className={activeMenu === dts.id ? styles.header_menu__active : ''} to={dts.attributes.url}>
                            {dts.attributes.title.en}
                          </Link>
                        )
                      })}
                      {/* {menu.map(dt => {
                        return (
                          <Link key={dt.id} className={activeMenu === dt.id ? styles.header_menu__active : ''} to={dt.linkUrl}>
                            {dt.title}
                          </Link>
                        )
                      })} */}
                    </>
                  )}
                  {isMobile && (
                    <div className={`${styles.header__menu_wrapper_m} ${isLandscape ? styles.header_menu_select_wrapper__ls : ''}`}>
                      <DropdownList className={styles.header_menu_dropdown_container} dataList={menu} activeId={activeMenuDropdown} onClick={this.handleNavigation} />
                      {/* {showLibrary && (
                        <Link className={activeMenu === 'library' ? styles.header_menu__active : ''} to={libraryUrl}>
                          Library
                        </Link>
                      )}
                      {(activeMenu === 'sport' || activeMenu === 'matches') && (
                        <Link className={activeMenu === 'matches' ? styles.header_menu__active : ''} to={'/matches'}>
                          Matches
                        </Link>
                      )} */}
                    </div>
                  )}
                </div>
              </LazyLoad>
            </span>
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

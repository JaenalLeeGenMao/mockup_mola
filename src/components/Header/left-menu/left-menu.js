import React, { Component } from 'react'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
// import $ from 'jquery'

// import Auth from '@api/auth'

import LazyLoad from '@components/common/Lazyload'
// import Footer from '@components/Footer'
import Link from '@components/Link'

import { getLocale } from '../locale'

import styles from './left-menu.css'
import history from '@source/history'
// import { IoIosArrowDown } from 'react-icons/io'
import DropdownList from '@components/DropdownList'

let menu = []
class LeftMenu extends Component {
  state = {
    locale: getLocale(),
    activeMenu: this.props.activeMenu ? this.props.activeMenu : 'movie',
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
        title: 'matches',
        linkUrl: 'matches',
      },
      {
        id: 'library',
        title: 'library',
        linkUrl: `movie-library${activePlaylist ? `/${activePlaylist.id.replace('f-', '')}` : ''}`,
      },
    ]

    // const showLibrary = !isMobile
    // if (showLibrary) {
    //   const libraryUrl = `movie-library${activePlaylist ? `/${activePlaylist.id.replace('f-', '')}` : ''}`
    //   menu.push({ id: 'library', title: 'Library', linkUrl: libraryUrl })
    // }
  }

  handleNavigation = id => {
    const filteredMenu = menu.filter(dt => {
      return dt.id == id
    })
    history.push(filteredMenu.length > 0 && filteredMenu[0].linkUrl)
  }

  render() {
    const { color, leftMenuOff, isMovie, activeMenu = 'movie', activePlaylist, isMobile, isLandscape } = this.props

    let activeMenuDropdown = ''
    // if (activeMenu === 'library') {
    //   activeMenuDropdown = 'movie'
    // } else if (activeMenu === 'matches') {
    //   activeMenuDropdown = 'sport'
    // } else {
    //   activeMenuDropdown = activeMenu
    // }

    activeMenuDropdown = activeMenu
    // let libraryUrl = ''
    // const showLibrary = activeMenu === 'movie' || activeMenu === 'library' || activeMenu === 'channels'
    // if (showLibrary) {
    //   libraryUrl = `movie-library${activePlaylist ? `/${activePlaylist.id.replace('f-', '')}` : ''}`
    // }
    return (
      <>
        <div className={`${styles.left__menu} tourOtherCategory`}>
          {!leftMenuOff && (
            <span>
              <LazyLoad className={styles.left__menu_icon_wrapper}>
                <div className={styles.left_menu_outer}>
                  {!isMobile && (
                    <>
                      {menu.map(dt => {
                        return (
                          <Link key={dt.id} className={activeMenu === dt.id ? styles.left_menu__active : ''} to={dt.linkUrl}>
                            {dt.title}
                          </Link>
                        )
                      })}
                    </>
                  )}
                  {isMobile && (
                    <div className={`${styles.left__menu_wrapper_m} ${isLandscape ? styles.left_menu_select_wrapper__ls : ''} tourOtherCategory`}>
                      <DropdownList className={styles.left_menu_dropdown_container} dataList={menu} activeId={activeMenuDropdown} onClick={this.handleNavigation} />
                      {/* {showLibrary && (
                        <Link className={activeMenu === 'library' ? styles.left_menu__active : ''} to={libraryUrl}>
                          Library
                        </Link>
                      )} */}
                      {/* {(activeMenu === 'sport' || activeMenu === 'matches') && (
                        <Link className={activeMenu === 'matches' ? styles.left_menu__active : ''} to={'/matches'}>
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

export default withStyles(styles)(LeftMenu)

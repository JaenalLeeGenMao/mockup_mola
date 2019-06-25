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
    toggle: false /* Toggle profile */,
    locale: getLocale(),
    activeMenu: this.props.activeMenu ? this.props.activeMenu : 'movie',
  }

  componentDidMount() {
    const { activePlaylist, activeMenu } = this.props;
    menu = [
      { id: 'movie', title: 'Movie', linkUrl: '/' },
      { id: 'sport', title: 'Sport', linkUrl: '/sport' },
      { id: 'channels', title: 'Channels', linkUrl: '/channels' },
    ]

    if (activeMenu === 'movie') {
      const libraryUrl = `movie-library${activePlaylist ? `/${activePlaylist.id.replace('f-', '')}` : ''}`
      menu.push({ id: 'library', title: 'Library', linkUrl: libraryUrl })
    }
  }

  handleNavigation = id => {
    const filteredMenu = menu.filter((dt) => {
      return dt.id == id
    })
    history.push(filteredMenu.length > 0 && filteredMenu[0].linkUrl)
  }

  render() {
    const { toggle } = this.state
    const { color, leftMenuOff, isMenuToggled = false, isMovie, activeMenu = 'movie', isMobile } = this.props

    return (
      <>
        <div className={styles.left__menu}>
          {!leftMenuOff && (
            <span className={styles.left__menu_wrapper}>
              <LazyLoad className={styles.left__menu_icon_wrapper}>
                <div className={styles.left_menu_outer}>
                  {!isMobile && (
                    <>
                      {menu.map((dt) => {
                        return (
                          <Link className={activeMenu === dt.id ? styles.left_menu__active : ''} to={dt.linkUrl}>
                            {dt.title}
                          </Link>
                        )
                      })
                      }
                    </>
                  )}
                  {isMobile && (
                    <div className={styles.left_menu_select_wrapper}>
                      <DropdownList
                        className={styles.left_menu_dropdown_container}
                        dataList={menu}
                        activeId={activeMenu}
                        onClick={this.handleNavigation} />
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

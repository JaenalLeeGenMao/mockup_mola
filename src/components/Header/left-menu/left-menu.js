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
import { IoIosArrowDown } from 'react-icons/io'

class LeftMenu extends Component {
  state = {
    link: '',
    toggle: false /* Toggle profile */,
    locale: getLocale(),
    activeMenu: this.props.activeMenu ? this.props.activeMenu : 'movie',
  }

  componentDidMount() {
    this.setState({ link: window.location.href })
  }

  handleNavigation = e => {
    const menu = e.target.options[e.target.options.selectedIndex].innerText
    this.setState({ activeMenu: menu })
    history.push(`/${e.target.value}`)
  }

  render() {
    const { toggle } = this.state
    const { color, leftMenuOff, isMenuToggled = false, isMovie, activePlaylist, activeMenu = 'movie', isMobile } = this.props

    const libraryUrl = `movie-library${activePlaylist ? `/${activePlaylist.id.replace('f-', '')}` : ''}`

    return (
      <>
        <div className={styles.left__menu}>
          {!leftMenuOff && (
            <span className={styles.left__menu_wrapper}>
              <LazyLoad className={styles.left__menu_icon_wrapper}>
                <div className={styles.left_menu_outer}>
                  {!isMobile && (
                    <>
                      <Link className={activeMenu === 'movie' ? styles.left_menu__active : ''} to="/">
                        Movie
                      </Link>
                      <Link className={activeMenu === 'sport' ? styles.left_menu__active : ''} to="/sport">
                        Sport
                      </Link>
                      <Link className={`${activeMenu === 'channels' ? styles.left_menu__active : ''}`} to={'/channels'}>
                        Channels
                      </Link>
                      {activeMenu === 'movie' && (
                        <Link className={`${activeMenu === 'library' ? styles.left_menu__active : ''}`} to={libraryUrl}>
                          Library
                        </Link>
                      )}
                      {/*comment sementara <div className={styles.left_menu_guide}>Guide</div> */}
                    </>
                  )}
                  {isMobile && (
                    <div className={styles.left_menu_select_wrapper}>
                      <select
                        onChange={event => {
                          this.handleNavigation(event)
                        }}
                        value={activeMenu == 'movie-library' ? libraryUrl : activeMenu}
                      >
                        <option value="">Movie</option>
                        <option value="sport">Sport</option>
                        <option value="channels">Channels</option>
                        {activeMenu === 'movie' && <option value={libraryUrl}>Movie Library</option>}
                      </select>
                      <div className={styles.left_menu_title}>{this.state.activeMenu}</div>
                      <IoIosArrowDown className={styles.select_icon} />
                    </div>
                  )}
                </div>
                {/* <Link className={color === 'black' ? styles.right__menu_search_black : styles.right__menu_search_white} /> */}
              </LazyLoad>
            </span>
          )}
        </div>
      </>
    )
  }
}

export default withStyles(styles)(LeftMenu)

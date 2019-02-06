/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React, { Component } from 'react'
import { IoIosArrowDown } from 'react-icons/io'
import withStyles from 'isomorphic-style-loader/lib/withStyles'

import LazyLoad from '@components/common/Lazyload'
// import { getComponent } from '../../../../gandalf';
// const LazyLoad = getComponent('LazyLoad')

import history from '../../history'
import logoBlue from '@global/style/icons/mola-blue.svg'
import logoLandscapeBlue from '@global/style/icons/mola-landscape-blue.svg'

import Link from '../Link'

import RightMenu from './right-menu'
import styles from './Header.css'

class Header extends Component {
  state = {
    genre: { data: [] },
  }

  handleGoBack = () => {
    const { goBack } = history
    if (goBack) {
      goBack()
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const genre = nextProps.search.genre

    return { ...prevState, genre }
  }

  findGenreDataById = (genreData = this.props.search.genre.data, genreId = this.props.genreId) => {
    return genreData.filter(genre => {
      return genre.id === genreId
    })[0]
  }

  getCurrentGenre(genreData) {
    const { genre: { data: genreDt } } = this.state

    if (typeof genreData === 'undefined' || genreData === '') {
      return genreDt[0]
    }

    return genreData
  }

  renderHeaderLibrary() {
    const { isDark = 1, isMobile = false, isLibraryCopy = false, handleMenuToggleClick, isMenuToggled = false, genreId } = this.props

    const { genre: { data: genreDt } } = this.state
    const currentGenre = this.getCurrentGenre(this.findGenreDataById(this.props.search.genre.data, genreId))
    const iconToggleStyle = {
      transform: 'rotate(180deg) translateY(0%)',
      top: '-3px',
    }
    const color = isDark ? 'black' : 'white'

    return (
      isLibraryCopy && (
        <div className={styles.header__copy_library}>
          <LazyLoad>
            <div className={styles.header__logo_wrap}>
              <Link to="/">
                <img alt="molatv" src={isMobile ? logoLandscapeBlue : logoBlue} className={styles.header__logo} />
              </Link>
              {genreDt.length <= 0 ? null : (
                <button className={styles.header__action_button} onClick={handleMenuToggleClick}>
                  {genreId ? currentGenre.title : genreDt[0].title} <IoIosArrowDown className={styles.header__action_dropdown} size={32} color={color} style={isMenuToggled ? iconToggleStyle : ''} />
                </button>
              )}
            </div>
          </LazyLoad>
        </div>
      )
    )
  }

  render() {
    const {
      activePlaylist,
      isDark = 1,
      logoOff = false,
      libraryOff = false,
      rightMenuOff = false,
      searchOff = false,
      isMobile = false,
      stickyOff = false,
      profileOff = false,
      backButtonOn = false,
      shareButtonOn = false,
    } = this.props

    const color = isDark ? 'black' : 'white'
    const typeHeader = stickyOff ? styles.header__container + ' ' + styles.header__notsticky : styles.header__container

    return (
      <div className={typeHeader}>
        <div className={styles.header__logo_wrapper} style={{ left: backButtonOn ? '0' : '2.5%' }}>
          {!logoOff && (
            <LazyLoad>
              <Link to="/">
                <img alt="molatv" src={isMobile ? logoLandscapeBlue : logoBlue} className={styles.header__logo} />
              </Link>
            </LazyLoad>
          )}
          {backButtonOn && (
            <LazyLoad>
              <div className={styles.header__back_button} onClick={this.handleGoBack}>
                <button className={styles.header__back_arrow} style={{ color }} />
              </div>
            </LazyLoad>
          )}
        </div>
        {!libraryOff && (
          <LazyLoad>
            <Link className={styles.header__library_link_wrapper} to={`/movie-library${activePlaylist ? `/${activePlaylist.id.replace('f-', '')}` : ''}`} style={{ color }}>
              <span className={`${styles[`header__library_logo_${color}`]} tourLibrary`} alt="library" />
            </Link>
          </LazyLoad>
        )}

        {this.renderHeaderLibrary()}

        {!rightMenuOff && <RightMenu color={color} searchOff={searchOff} profileOff={profileOff} shareButtonOn={shareButtonOn} {...this.props} />}
      </div>
    )
  }
}

export default withStyles(styles)(Header)

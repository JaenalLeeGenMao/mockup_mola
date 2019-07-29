/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React, { Component } from 'react'
import withStyles from 'isomorphic-style-loader/lib/withStyles'

import LazyLoad from '@components/common/Lazyload'
// import { getComponent } from '../../../../gandalf';
// const LazyLoad = getComponent('LazyLoad')

import history from '../../history'

import { logoBlue, logoMobile } from '@global/imageUrl'

import Link from '../Link'

// import RightMenu from './right-menu'
// import LeftMenu from './left-menu'
import HeaderMenu from './header-menu'
import styles from './Header.css'

class Header extends Component {
  // state = {
  //   genre: { data: [] },
  // }

  handleGoBack = () => {
    // const { goBack } = history
    // if (goBack) {
    //   goBack()
    // }
    history.push('/')
  }

  // static getDerivedStateFromProps(nextProps, prevState) {
  //   const genre = nextProps.search.genre

  //   return { ...prevState, genre }
  // }

  // findGenreDataById = (genreData = this.props.search.genre.data, genreId = this.props.genreId) => {
  //   return genreData.filter(genre => {
  //     return genre.id === genreId
  //   })[0]
  // }

  // getCurrentGenre(genreData) {
  //   const { genre: { data: genreDt } } = this.state

  //   if (typeof genreData === 'undefined' || genreData === '') {
  //     return genreDt[0]
  //   }

  //   return genreData
  // }

  // renderHeaderLibrary() {
  //   const { isDark = 1, isMobile = false, isLibraryCopy = false, handleMenuToggleClick, isMenuToggled = false, genreId, cardTitle } = this.props

  //   const { genre: { data: genreDt } } = this.state
  //   const currentGenre = this.getCurrentGenre(this.findGenreDataById(this.props.search.genre.data, genreId))
  //   const color = isDark ? 'black' : 'white'
  //   return (
  //     isLibraryCopy && (
  //       <div className={styles.header__copy_library}>
  //         <LazyLoad>
  //           <div className={styles.header__logo_wrap}>
  //             {/* <Link to="/">
  //               <img alt="molatv" src={isMobile ? logoLandscapeBlue : logoBlue} className={styles.header__logo} />
  //             </Link> */}
  //             {genreDt.length <= 0 ? null : (
  //               <button className={styles.header__action_button} onClick={handleMenuToggleClick}>
  //                 {currentGenre.title} <IoIosArrowDown className={styles.header__action_dropdown} size={32} color={color} />
  //               </button>
  //             )}
  //           </div>
  //           <div />
  //         </LazyLoad>
  //       </div>
  //     )
  //   )
  // }

  render() {
    const {
      isDark = 1,
      headerMenuOff = false,
      isMobile = false,
      isLandscape = false,
    } = this.props
    const color = isDark ? 'black' : 'white'
    const headerStyle = isMobile ? styles.header__container_m : styles.header__container
    const logoWrapper = isLandscape ? { left: 0, width: '4rem' } : { left: '2.5%', width: '4rem' }

    return (
      <div className={`${headerStyle} ${isLandscape ? styles.header__cnt_landscape : ''}`}>
        <div className={styles.header__shadow} />
        <div className={styles.header__logo_wrapper} style={logoWrapper}>
          <LazyLoad>
            <Link to="/">
              <img alt="molatv" src={isMobile ? logoMobile : logoBlue} className={styles.header__logo} />
            </Link>
          </LazyLoad>
        </div>
        {!headerMenuOff && <HeaderMenu color={color} headerMenuOff={headerMenuOff} {...this.props} />}
      </div>
    )
  }
}

export default withStyles(styles)(Header)

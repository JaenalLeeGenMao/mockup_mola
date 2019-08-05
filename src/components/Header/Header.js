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

import { logoBlue, logoMobile, logoHorizontal } from '@global/imageUrl'

import Link from '../Link'

// import RightMenu from './right-menu'
// import LeftMenu from './left-menu'
import HeaderMenu from './header-menu'
import styles from './Header.css'

class Header extends Component {
  state = {
    width: this.props.isMobile ? 640 : 1200,
    isLandscape: false,
  }

  componentDidMount() {
    if (process.env.BROWSER) {
      this.setState({
        width: window.innerWidth,
        isLandscape: window.innerHeight < window.innerWidth,
      })
      window.addEventListener('resize', this.handleWindowSizeChange)
    }
  }

  componentWillUnmount() {
    if (process.env.BROWSER) {
      window.removeEventListener('resize', this.handleWindowSizeChange)
    }
  }

  handleWindowSizeChange = () => {
    this.setState({
      width: window.innerWidth,
      isLandscape: window.innerHeight < window.innerWidth,
    })
  }

  render() {
    const { pathname } = this.props
    const { width, isLandscape } = this.state
    let isMobileView = width < 778
    if (/iPad/i.test(navigator.userAgent)) {
      isMobileView = true
    }

    const headerStyle = isMobileView ? styles.header__container_m : styles.header__container
    return (
      <div className={`${headerStyle} ${isLandscape ? styles.header__cnt_landscape : ''}`}>
        <div className={styles.header__shadow} />
        <div className={`${isMobileView ? styles.header__logo_wrapper_m : styles.header__logo_wrapper}`}>
          <LazyLoad>
            <Link to="/">
              <img alt="molatv" src={isMobileView ? logoHorizontal : logoBlue} className={styles.header__logo} />
            </Link>
          </LazyLoad>
        </div>
        <HeaderMenu isMobile={isMobileView} isLandscape={isLandscape} pathname={pathname} />
      </div>
    )
  }
}

export default withStyles(styles)(Header)

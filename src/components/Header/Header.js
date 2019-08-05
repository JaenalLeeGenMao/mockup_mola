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
  constructor() {
    super()
    this.state = {
      width: 0,
    }
  }

  handleGoBack = () => {
    // const { goBack } = history
    // if (goBack) {
    //   goBack()
    // }
    history.push('/')
  }

  componentDidMount() {
    if (process.env.BROWSER) {
      this.setState({ width: window.innerWidth })
      window.addEventListener('resize', this.handleWindowSizeChange)
    }
  }

  componentWillUnmount() {
    if (process.env.BROWSER) {
      window.removeEventListener('resize', this.handleWindowSizeChange)
    }
  }

  handleWindowSizeChange = () => {
    this.setState({ width: window.innerWidth })
  }

  render() {
    const { isDark = 1, isMobile = false, isLandscape = false } = this.props
    const color = isDark ? 'black' : 'white'
    const headerStyle = isMobile ? styles.header__container_m : styles.header__container
    const logoWrapper = isLandscape ? { left: 0, width: '4rem' } : { left: '2.5%', width: '4rem' }
    const { width } = this.state
    let isMobileView = width < 640
    if (/iPad/i.test(navigator.userAgent) && width > 768) {
      isMobileView = true
    }

    return (
      <div className={`${headerStyle} ${isLandscape ? styles.header__cnt_landscape : ''}`}>
        <div className={styles.header__shadow} />
        <div className={styles.header__logo_wrapper} style={logoWrapper}>
          <LazyLoad>
            <Link to="/">
              <img alt="molatv" src={isMobileView ? logoHorizontal : logoBlue} className={styles.header__logo} />
            </Link>
          </LazyLoad>
        </div>
        <HeaderMenu color={color} isMobile={isMobileView} {...this.props} />
      </div>
    )
  }
}

export default withStyles(styles)(Header)

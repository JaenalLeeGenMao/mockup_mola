/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React, { Component } from 'react';
import { IoIosArrowRoundBack } from 'react-icons/io';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import LazyLoad from '@components/common/Lazyload';
import history from '../../history';
import logo from '@global/style/icons/Mola.png';
import logoGrey from '@global/style/icons/Mola_grey.png';

import Link from '../Link'

import RightMenu from './right-menu'
import styles from './Header.css'

class Header extends Component {
  handleGoBack = () => {
    const { goBack } = history;
    if (goBack) {
      goBack();
    }
  }
  render() {
    const {
      isDark = 1,
      logoOff = false,
      libraryOff = false,
      rightMenuOff = false,
      searchOff = false,
      backButtonOn = false,
      title = '',
    } = this.props
    const color = isDark ? 'black' : 'white';

    return (
      <div className={styles.header__container}>
        <div className={styles.header__logo_wrapper}>
          {!logoOff &&
            <Link to="/">
              {isDark
                ? <LazyLoad image={logo} className={styles.header__logo} lazyloadOff />
                : <LazyLoad image={logoGrey} className={styles.header__logo} lazyloadOff />
              }
            </Link>
          }
          {backButtonOn && (
            <LazyLoad>
              <div className={styles.header__back_button} onClick={this.handleGoBack}>
                <IoIosArrowRoundBack size={32} color={color} />
              </div>
            </LazyLoad>
          )}
        </div>
        <div className={styles.header__library_wrapper} style={{ color }}>
          {!libraryOff && (
            <LazyLoad lazyloadOff>
              <Link
                className={styles.header__library_link_wrapper}
                to="/movie-library"
                style={{ color }}
              >
                <span
                  className={styles[`header__library_logo_${color}`]}
                  alt="library"
                  style={{ width: '32px', height: '32px' }}
                />
              </Link>
            </LazyLoad>
          )}
          {title}
        </div>
        {!rightMenuOff && <RightMenu color={color} searchOff={searchOff} />}
      </div>
    )
  }
}

export default withStyles(styles)(Header)

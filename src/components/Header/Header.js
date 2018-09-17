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

import LazyLoadBeta from '@components/common/LazyloadBeta';
import LazyLoad from '@components/common/Lazyload';
import history from '../../history';
import logoBlue from '@global/style/icons/mola_blue.png';
import logoGrey from '@global/style/icons/mola_grey.png';
import logoLandscapeBlue from '@global/style/icons/mola_landscape_blue.png';
import logoLandscapeGrey from '@global/style/icons/mola_landscape_grey.png';

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
      isMobile = false,
      title = '',
    } = this.props
    const color = isDark ? 'black' : 'white';

    return (
      <div className={styles.header__container}>
        <div className={styles.header__logo_wrapper}>
          {!logoOff &&
            <Link to="/">
              {isDark
                ? <LazyLoadBeta src={isMobile ? logoLandscapeBlue : logoBlue} containerClassName={styles.header__logo}/>
                : <LazyLoadBeta src={isMobile ? logoLandscapeGrey : logoGrey} containerClassName={styles.header__logo}/>
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
            <LazyLoadBeta>
              <Link
                className={styles.header__library_link_wrapper}
                to="/movie-library"
                style={{ color }}
              >
                <span
                  className={styles[`header__library_logo_${color}`]}
                  alt="library"
                  style={{ width: '32px', height: '32px', }}
                />
              </Link>
            </LazyLoadBeta>
          )}
          {title}
        </div>
        {!rightMenuOff && <RightMenu color={color} searchOff={searchOff} />}
      </div>
    )
  }
}

export default withStyles(styles)(Header)

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
import logoBlue from '@global/style/icons/mola_blue.png';
import logoGrey from '@global/style/icons/Mola_grey.png';
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
      isLibrary = false,
      isLibraryCopy = false,
      isMobileMovDetail = false,
      home: {
        playlists = {
          data: []
        }
      }
    } = this.props;

    const color = isDark ? 'black' : 'white';
    const logoDark = isDark ? true : false;
    const typeHeader = isLibrary || isMobileMovDetail ? styles.header__container + ' ' + styles.movie_library :  styles.header__container;
    const isActivePlaylist = playlists.data.length > 1 && playlists.data.filter(playlist => playlist.isActive)[0]
    return (
      <div className={typeHeader}>
        <div className={styles.header__logo_wrapper}>
          {!logoOff &&
            <LazyLoad>
              <Link to="/">
                {
                  logoDark &&
                    <img alt='MOLA' src={isMobile ? logoLandscapeBlue : logoBlue} className={styles.header__logo} />
                }

                {
                  !logoDark &&
                    <img alt='MOLA' src={isMobile ? logoLandscapeGrey : logoGrey} className={styles.header__logo}/>
                }
              </Link>
            </LazyLoad>
          }
          {backButtonOn && (
            <LazyLoad>
              <div className={styles.header__back_button} onClick={this.handleGoBack}>
                <IoIosArrowRoundBack size={32} color={color} />
              </div>
            </LazyLoad>
          )}
        </div>
        {/* <div className={styles.header__library_wrapper}> */}
        {!libraryOff && (
          <LazyLoad>
            <Link
              className={styles.header__library_link_wrapper}
              to={`/movie-library${isActivePlaylist ? `/${isActivePlaylist.id}` : ""}`}
              style={{ color }}
            >
              <span
                className={styles[`header__library_logo_${color}`]}
                alt="library"
                style={{ width: '32px', height: '32px', }}
              />
            </Link>
          </LazyLoad>
        )}
        {isLibraryCopy && <span className={styles.header__copy_library}>{title}</span>}
        {/* </div> */}
        {!rightMenuOff && <RightMenu color={color} searchOff={searchOff} {...this.props} />}
      </div>
    )
  }
}

export default withStyles(styles)(Header)

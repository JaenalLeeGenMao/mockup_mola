/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React, { Component } from 'react';
import { IoIosArrowRoundBack, IoIosArrowDown } from 'react-icons/io';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { endpoints } from '@source/config';

import LazyLoad from '@components/common/Lazyload';
// import { getComponent } from '../../../../gandalf';
// const LazyLoad = getComponent('LazyLoad')

import history from '../../history';
import logoBlue from '@global/style/icons/mola_blue.svg';
import logoGrey from '@global/style/icons/mola_grey.svg';
import logoLandscapeBlue from '@global/style/icons/mola_landscape_blue.svg';
import logoLandscapeGrey from '@global/style/icons/mola_landscape_grey.svg';

import Link from '../Link';

import RightMenu from './right-menu';
import styles from './Header.css';

class Header extends Component {
  state = {
    isMenuToggled: false,
    genre: { data: [] }
  };

  constructor(props) {
    super(props);

    this.headerContainerRef = React.createRef();
  }

  handleMenuToggleClick = () => {
    const genreData = this.state.genre.data;

    if (genreData.length > 0) {
      this.setState(prevState => ({
        isMenuToggled: !prevState.isMenuToggled
      }));
    }
  };

  handleGoBack = () => {
    const { goBack } = history;
    if (goBack) {
      goBack();
    }
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    const genre = nextProps.search.genre;

    return { ...prevState, genre };
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
      isLibraryCopy = false,
      activePlaylist,
      stickyOff = false,
      handleMenuToggleClick,
      search = { genre: { data: [] } }
    } = this.props;

    const { isMenuToggled, genre: { data: genreDt } } = this.state;
    const color = isDark ? 'black' : 'white';
    const logoDark = isDark ? true : false;
    const typeHeader = stickyOff ? styles.header__container + ' ' + styles.header__notsticky : styles.header__container;

    return (
      <div className={typeHeader} ref={this.headerContainerRef}>
        <div className={styles.header__logo_wrapper}>
          {!logoOff && (
            <LazyLoad>
              <Link to="/">
                <img alt="MOLA" src={isMobile ? logoLandscapeBlue : logoBlue} className={styles.header__logo} />
                {/* {logoDark && <img alt="MOLA" src={isMobile ? logoLandscapeBlue : logoBlue} className={styles.header__logo} />}

            {!logoDark && <img alt="MOLA" src={isMobile ? logoLandscapeGrey : logoGrey} className={styles.header__logo} />} */}
              </Link>
            </LazyLoad>
          )}
          {backButtonOn && (
            <LazyLoad>
              <div className={styles.header__back_button} onClick={this.handleGoBack}>
                <IoIosArrowRoundBack size={'2rem'} color={color} />
              </div>
            </LazyLoad>
          )}
        </div>
        {!libraryOff && (
          <LazyLoad>
            <Link className={styles.header__library_link_wrapper} to={`/movie-library${activePlaylist ? `/${activePlaylist.id.replace('f-', '')}` : ''}`} style={{ color }}>
              <span className={styles[`header__library_logo_${color}`]} alt="library" />
            </Link>
          </LazyLoad>
        )}
        {isLibraryCopy && (
          <div className={styles.header__copy_library}>
            <LazyLoad>
              <div className={styles.header__logo_wrap}>
                <Link to="/">
                  <img alt="MOLA" src={isMobile ? logoLandscapeBlue : logoBlue} className={styles.header__logo} />
                  {/* {logoDark && <img alt="MOLA" src={isMobile ? logoLandscapeBlue : logoBlue} className={styles.header__logo} />}

              {!logoDark && <img alt="MOLA" src={isMobile ? logoLandscapeGrey : logoGrey} className={styles.header__logo} />} */}
                </Link>
                {genreDt.length <= 0 ? null : (
                  <button className={styles.header__action_button} onClick={handleMenuToggleClick}>
                    {this.props.title ? this.props.title : genreDt[0].title}{' '}
                    <IoIosArrowDown className={styles.header__action_dropdown} size={32} color={color} style={isMenuToggled ? { transform: 'rotate(180deg) translateY(0%)', top: 0 } : ''} />
                  </button>
                )}
              </div>
            </LazyLoad>
          </div>
        )}
        {!rightMenuOff && <RightMenu color={color} searchOff={searchOff} {...this.props} />}
      </div>
    );
  }
}

export default withStyles(styles)(Header);

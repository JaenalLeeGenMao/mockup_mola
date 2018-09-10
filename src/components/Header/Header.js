/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React, { Component } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import LazyLoad from '@components/common/Lazyload';
import logo from '@global/style/icons/Mola.png';

import Link from '../Link';

import RightMenu from './right-menu';
import styles from './Header.css';

class Header extends Component {

    render() {
        const {
            isDark = 1,
            logoOff = false,
            libraryOff = false,
            rightMenuOff = false,
        } = this.props;
        const color = isDark ? 'black' : 'white';
        return (
            <div className={styles.header__container}>
                <div className={styles.header__logo_wrapper}>
                    {!logoOff && (
                        <Link to="/">
                            <LazyLoad image={logo} className={styles.header__logo} />
                        </Link>
                    )}
                </div>
                <div className={styles.header__library_wrapper}>
                    {!libraryOff && (
                        <LazyLoad>
                            <Link
                                className={styles.header__library_link_wrapper}
                                to="/category"
                                style={{ color }}
                            >
                                <span
                                    className={styles[`header__library_logo_${color}`]}
                                    alt="library"
                                    style={{ width: '32px', height: '32px' }}
                                />
                                {/* <div className={styles.header__library_text}>
                                    <p>CLICK TO SEE</p>
                                    <p className={styles.header__library_underlined}>
                                        MOVIE LIBRARY
                                    </p>
                                </div> */}
                            </Link>
                        </LazyLoad>
                    )}
                </div>
                {!rightMenuOff && <RightMenu color={color} />}
            </div>
        );
    }
}

export default withStyles(styles)(Header);

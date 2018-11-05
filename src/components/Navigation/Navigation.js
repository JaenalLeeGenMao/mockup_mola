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
import Link from '../Link';
// import { Link } from 'react-router-dom';

import styles from './Navigation.css';

class Navigation extends Component {
  handleNavigation = e => {
    const { onClick, href } = this.props;

    if(!href || href !== "" ) {
      onClick(e.currentTarget.id);
      e.preventDefault();
    }
  };

  render() {
    const { isDark = 1, playlists = [] } = this.props,
      color = isDark ? 'black' : 'white';
    return (
      <div className={styles.navigation__wrapper} style={{ color }}>
        {playlists &&
          playlists.map(
            ({ id, isActive, title, href }) => (
              <Link
                key={id}
                id={id}
                to={href}
                onClick={this.handleNavigation}
                className={[
                  styles.navigation__links,
                  isActive ? styles.isActive : '',
                ].join(' ')}
                style={{ color }}
              >
                {isActive && (
                  <LazyLoad>
                    <hr style={{ borderBottom: `1px solid ${color}` }} />
                  </LazyLoad>
                )}
                {title.toUpperCase()}
              </Link>
            ),
          )}
      </div>
    );
  }
}

export default withStyles(styles)(Navigation);

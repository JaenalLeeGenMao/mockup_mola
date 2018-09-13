/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Header from '@components/header'
import Navbar from '@components/navigation'
import s from './Profile.css';

class Profile extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
  };

  render() {
    const isDark = false;
    const playlist = [
      {
        id: 1,
        isActive: false,
        title: 'Profile Data',
      },
      {
        id: 2,
        isActive: true,
        title: 'History',
      },
    ]
    return (
      <Fragment>
        <Fragment>
          <Navbar
            isDark={isDark}
            playlists={playlist}
            onClick={this.handleScrollToIndex}
            title='Profile Data'
          />
        </Fragment>
        <Header isDark={isDark} libraryOff rightMenuOff/>
        <div className={s.wrapper}>
          <div className={s.root}>
            <div className={s.container}>
              <h1>{this.props.title}</h1>
              <p>...</p>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default withStyles(s)(Profile);

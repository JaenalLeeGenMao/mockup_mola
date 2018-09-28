/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import HomeError from '@components/common/error';
import styles from './NotFound.css';

class NotFound extends React.Component {

  render() {
    return (
      <HomeError status={400} message={'Sorry, the page you were trying to view does not exist.'} />
    );
  }
}

export default withStyles(styles)(NotFound);

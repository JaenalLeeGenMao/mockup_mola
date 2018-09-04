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
import s from './SearchSuggestion.css';

class SearchSuggestion extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
  };

  render() {
    return (
      <div className={s.root}>
        <div className={s.container}>
          <div className={s.searchInputWrapper}>
            <input className={s.searchInput} />
          </div>
          <div className={s.sectionContainer}>
            <div className={s.sectionTitle}>Recent Search</div>
            <div />
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(s)(SearchSuggestion);

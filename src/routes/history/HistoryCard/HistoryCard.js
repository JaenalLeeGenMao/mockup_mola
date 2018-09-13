/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import LazyLoad from '@components/common/Lazyload';
import s from './HistoryCard.css';

class HistoryCard extends React.Component {
  static propTypes = {
    videos: PropTypes.object,
    barStyle: PropTypes.object,
  };

  render() {
    const { videos, barStyle } = this.props;
    console.log("videos", videos.coverUrl)
    return (
      <div className={s.movieContainer}>
        <a className={s.movieImageWrapper}>
          <LazyLoad image={videos.coverUrl} width='100%' lazyloadOff>
            <div className={s.movieDurationBar}>
              <span className={s.moviePlayedBar} style={barStyle} />
            </div>
          </LazyLoad>
        </a>
        <div className={s.movieDetailWrapper}>
          <div className={s.movieTitle}>{videos.title}</div>
          <div className={s.movieChapter}>{videos.chapter}</div>
          <div className={s.movieDuration}>{videos.duration / 60} min.</div>
        </div>
      </div>
    );
  }
}

export default withStyles(s)(HistoryCard);

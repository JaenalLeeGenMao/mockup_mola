import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import LazyLoadBeta from '@components/common/LazyLoadBeta';
import Link from '@components/Link';
// import LazyLoad from '@components/common/LazyLoad';
import s from './HistoryCard.css';

class HistoryCard extends React.Component {
  static propTypes = {
    videos: PropTypes.object,
    barStyle: PropTypes.object,
  };

  render() {
    const { videos, barStyle } = this.props;
    return (
      <div className={s.movieContainer}>
        <Link className={s.movieImageWrapper} to={`/movie-detail/${videos.videoId}`}>
          <LazyLoadBeta src={videos.coverUrl} style={{ width: '100%', }}>
            <div className={s.movieDurationBar}>
              <span className={s.moviePlayedBar} style={barStyle} />
            </div>
          </LazyLoadBeta>
        </Link>
        <div className={s.movieDetailWrapper}>
          <div className={s.movieTitle}>{videos.title}</div>
          {/* <div className={s.movieChapter}>{videos.chapter}</div> */}
          <div className={s.movieDuration}>{videos.duration ? videos.duration / 60 : 0} min.</div>
        </div>
      </div>
    );
  }
}

export default withStyles(s)(HistoryCard);

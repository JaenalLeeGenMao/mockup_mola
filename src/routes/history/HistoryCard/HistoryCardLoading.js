import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import LoadingPlaceholder from '@components/common/LoadingPlaceholder';
import s from './HistoryCard.css';

const HistoryCardLoading = () => {
  return (
    <div className={s.movieContainer}>
      <LoadingPlaceholder className={s.movieImageWrapperLoading}/>
      <div className={s.movieDetailWrapper}>
        <LoadingPlaceholder className={s.movieTitleLoading}/>
        <LoadingPlaceholder className={s.movieDurationLoading}/>
      </div>
    </div>
  )
}

export default withStyles(s)(HistoryCardLoading)

import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import LoadingPlaceholder from '@components/common/LoadingPlaceholder';

import s from './MovieSuggestion.css';

const MovieSuggestionLoading = () => {
  return (
    <div className={s.resultRowWrap}>
      <LoadingPlaceholder className={s.resultTitleLoading} />
      <div className={s.resultContent}>
        <div className={s.movieBox}>
          <div className={s.movieBoxInner}>
            <LoadingPlaceholder className={s.movieImgLoading} />
            <LoadingPlaceholder className={s.movieTitleLoading} />
          </div>
        </div>
        <div className={s.movieBox}>
          <div className={s.movieBoxInner}>
            <LoadingPlaceholder className={s.movieImgLoading} />
            <LoadingPlaceholder className={s.movieTitleLoading} />
          </div>
        </div>
        <div className={s.movieBox}>
          <div className={s.movieBoxInner}>
            <LoadingPlaceholder className={s.movieImgLoading} />
            <LoadingPlaceholder className={s.movieTitleLoading} />
          </div>
        </div>
        <div className={s.movieBox}>
          <div className={s.movieBoxInner}>
            <LoadingPlaceholder className={s.movieImgLoading} />
            <LoadingPlaceholder className={s.movieTitleLoading} />
          </div>
        </div>
        <div className={s.movieBox}>
          <div className={s.movieBoxInner}>
            <LoadingPlaceholder className={s.movieImgLoading} />
            <LoadingPlaceholder className={s.movieTitleLoading} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default withStyles(s)(MovieSuggestionLoading);

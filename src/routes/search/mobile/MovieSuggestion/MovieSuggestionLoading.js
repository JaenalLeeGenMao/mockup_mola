import React from 'react'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import LoadingPlaceholder from '@components/common/LoadingPlaceholder';

import s from './MovieSuggestion.css'

const MovieSuggestionLoading = () => {
  return (
    <div className={s.resultRowWrap}>
      <LoadingPlaceholder className={s.resultTitleLoading}/>
      <div className={s.resultContent__movieflex}>
        <LoadingPlaceholder className={s.movieflex__movieboxLoading}/>
        <LoadingPlaceholder className={s.movieflex__movieboxLoadingSec}/>
        <LoadingPlaceholder className={s.movieflex__movieboxLoadingThird}/>
        <LoadingPlaceholder className={s.movieflex__movieboxLoading}/>
      </div>
    </div>
  )
}

export default withStyles(s)(MovieSuggestionLoading)

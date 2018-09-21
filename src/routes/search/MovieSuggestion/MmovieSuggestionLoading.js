import React from 'react'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import LoadingPlaceholder from '@components/common/LoadingPlaceholder';

import s from './MovieSuggestion.css'

const MmovieSuggestionLoading = () => {
  return (
    <div className={s.resultRowWrap__mobile}>
      <LoadingPlaceholder className={s.resultTitleLoading}/>
      <div className={s.resultContent__movieflex}>
        <LoadingPlaceholder className={s.movieflex__movieboxLoading}/>
        <LoadingPlaceholder className={s.movieflex__movieboxLoading}/>
        <LoadingPlaceholder className={s.movieflex__movieboxLoading}/>
      </div>
    </div>
  )
}

export default withStyles(s)(MmovieSuggestionLoading)

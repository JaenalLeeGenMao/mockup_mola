import React, { Component } from 'react'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import LoadingPlaceholder from '@components/common/LoadingPlaceholder'

import s from './MovieSuggestion.css'

const MovieSuggestionLoading = ({ isMobile }) => {
  return (
    <div className={s.resultRowWrap}>
      <LoadingPlaceholder className={s.resultTitleLoading} />
      <div className={s.resultContent}>
        <>
          {isMobile ? (
            <>
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
            </>
          ) : (
            <>
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
            </>
          )}
        </>
      </div>
    </div>
  )
}

export default withStyles(s)(MovieSuggestionLoading)

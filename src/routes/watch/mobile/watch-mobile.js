import React, { Component } from 'react'
import { connect } from 'react-redux'
import _get from 'lodash/get'
import { get } from 'axios'

import { defaultVideoSetting } from '@source/lib/theoplayerConfig.js'
import config from '@source/config'
import Tracker from '@source/lib/tracker'
import { isMovie, getContentTypeName } from '@source/lib/globalUtil'
import recommendationActions from '@actions/recommendation'
import { getVUID_retry } from '@actions/vuid'
import watchPermission from '@source/lib/watchPermission'

import Header from '@components/Header'
import CountDown from '@components/CountDown'
import MovieDetailError from '@components/common/error'
// import { Synopsis as ContentSynopsis, Review as ContentReview, Creator as ContentCreator, Suggestions as ContentSuggestions, Trailer as ContentTrailer } from './content'

import {
  movieDetailContainer,
  movieDetailNotAvailableContainer,
  videoPlayerContainer,
  videoTitle,
  countdownWinfobar,
  countdownWOinfobar,
  infoBar,
  infoBarContainer,
  infoBarClose,
  infoBarText,
  posterWrapper,
  playIcon,
  movieDetailNotAllowed,
  headerContainer,
} from './style'

import { customTheoplayer } from './theoplayer-style'
// const { getComponent } = require('../../../../../gandalf')
const { getComponent } = require('@supersoccer/gandalf')
const Theoplayer = getComponent('theoplayer')

import MovieContent from './movie'
import SportContent from './sport'

class MovieDetail extends Component {
  state = {
    loc: '',
    countDownStatus: true,
    toggleInfoBar: true,
    android_redirect_to_app: false,
    ios_redirect_to_app: false,
    notice_bar_message: 'Siaran Percobaan',
  }

  subtitles() {
    const { movieDetail } = this.props
    const subtitles =
      movieDetail.data.length > 0 && movieDetail.data[0].subtitles ? movieDetail.data[0].subtitles : null

    const myTheoPlayer =
      subtitles &&
      subtitles.map(({ subtitleUrl, country }) => ({
        kind: 'subtitles',
        src: subtitleUrl,
        label: country,
        type: 'srt',
      }))

    return myTheoPlayer
  }

  disableAds = (status, videoSettings) => {
    status === 'success' && (videoSettings.adsBannerOptions.ipaEnabled = false)
    status === 'success' && (videoSettings.adsBannerOptions.araEnabled = false)
    status === 'success' && (videoSettings.adsSource = '')
    status === 'success' && (videoSettings.adsBannerUrl = '')

    return videoSettings
  }

  getLoc = async () => {
    const geolocation = Tracker.getLangLat()
    const latitude = geolocation && geolocation.split(',').length == 2 ? geolocation.split(',')[0] : ''
    const longitude = geolocation && geolocation.split(',').length == 2 ? geolocation.split(',')[1] : ''

    const locationPayload = await get(`/sign-location?lat=${latitude}&long=${longitude}`)

    const loc = locationPayload.data.data.loc

    this.setState({
      loc: loc,
    })
  }

  getConfig = async () => {
    await get('/api/v2/config/app-params').then(result => {
      if (result.data) {
        const {
          android_redirect_to_app,
          ios_redirect_to_app,
          notice_bar_enabled,
          notice_bar_message,
        } = result.data.data.attributes
        this.setState({
          android_redirect_to_app,
          ios_redirect_to_app,
          toggleInfoBar: notice_bar_enabled,
          notice_bar_message,
        })
      }
    })
  }

  componentDidMount() {
    // const { fetchRecommendation } = this.props

    this.getLoc()
    this.getConfig()
    // fetchRecommendation(movieId)
  }

  handlePlayMovie = () => {
    const { videoId } = this.props
    const domain = config.endpoints.domain
    const url = encodeURIComponent(`${domain}/download-app/${videoId}`)
    document.location = `intent://mola.tv/watch?v=${videoId}/#Intent;scheme=molaapp;package=tv.mola.app;S.browser_fallback_url=${url};end`
  }

  handlePlayMovieApple = () => {
    const { videoId } = this.props
    const domain = config.endpoints.domain
    const url = `${domain}/download-app/${videoId}`
    document.location = `molaapp://mola.tv/watch?v=${videoId}`
    setTimeout(function() {
      window.location.href = url
    }, 250)
  }

  renderVideo = dataFetched => {
    const { user, getMovieDetail, videoId } = this.props
    if (dataFetched) {
      const { loc } = this.state
      const { data: vuid, meta: { status: vuidStatus } } = this.props.vuid

      const poster = dataFetched ? dataFetched.background.landscape : ''

      const adsFlag = dataFetched ? _get(dataFetched, 'dataFetched.ads', null) : null
      user.loc = loc

      const defaultVidSetting = dataFetched
        ? defaultVideoSetting(user, dataFetched, vuidStatus === 'success' ? vuid : '')
        : {}

      const checkAdsSettings =
        adsFlag !== null && adsFlag <= 0 ? this.disableAds('success', defaultVidSetting) : defaultVidSetting

      const videoSettings = {
        ...checkAdsSettings,
      }

      const permission = watchPermission(dataFetched.permission, this.props.user.sid)
      const isAllowed = permission.isAllowed
      let watchPermissionErrorCode = permission.errorCode

      const isApple = /iPad|iPhone|iPod/.test(navigator.userAgent)

      const { toggleInfoBar, ios_redirect_to_app, android_redirect_to_app } = this.state
      let isMatchPassed = false
      if (dataFetched.endTime < Date.now() / 1000) {
        isMatchPassed = true
      }

      const countDownClass = toggleInfoBar && !isMatchPassed ? countdownWinfobar : countdownWOinfobar
      if (
        this.state.countDownStatus &&
        getContentTypeName(dataFetched.contentType) === 'live' &&
        dataFetched.startTime * 1000 > Date.now()
      ) {
        return (
          <CountDown
            className={countDownClass}
            hideCountDown={this.hideCountDown}
            startTime={dataFetched.startTime}
            videoId={videoId}
            getMovieDetail={getMovieDetail}
            isMobile={true}
          />
        )
      } else {
        if (isApple) {
          //ios
          if (ios_redirect_to_app) {
            return (
              <div className={posterWrapper}>
                <img src={poster} />
                <span className={playIcon} onClick={this.handlePlayMovieApple} />
              </div>
            )
          } else {
            if (!isAllowed) {
              if (watchPermissionErrorCode == 'login_first') {
                return (
                  <div className={movieDetailNotAllowed}>
                    <p>
                      Silahkan{' '}
                      <a style={{ color: '#005290' }} href="/accounts/login">
                        {' '}
                        login
                      </a>{' '}
                      untuk menyaksikan tayangan ini.
                    </p>
                  </div>
                )
              }
            }

            return (
              <Theoplayer
                className={customTheoplayer}
                subtitles={this.subtitles()}
                poster={poster}
                autoPlay={false}
                // certificateUrl="test"
                // handleOnVideoLoad={this.handleOnVideoLoad}
                // handleOnVideoPause={this.handleOnVideoPause}
                // handleOnLoadedData={this.handleOnLoadedData}
                // handleOnReadyStateChange={this.handleOnReadyStateChange}
                {...videoSettings}
                isMobile
              />
            )
          }
        } else {
          //android
          if (android_redirect_to_app) {
            return (
              <div className={posterWrapper}>
                <img src={poster} />
                <span className={playIcon} onClick={this.handlePlayMovie} />
              </div>
            )
          } else {
            if (!isAllowed) {
              if (watchPermissionErrorCode == 'login_first') {
                return (
                  <div className={movieDetailNotAllowed}>
                    <p>
                      Silahkan{' '}
                      <a style={{ color: '#005290' }} href="/accounts/login">
                        {' '}
                        login
                      </a>{' '}
                      untuk menyaksikan tayangan ini.
                    </p>
                  </div>
                )
              }
            }
            return (
              <Theoplayer
                className={customTheoplayer}
                subtitles={this.subtitles()}
                poster={poster}
                autoPlay={false}
                // certificateUrl="test"
                // handleOnVideoLoad={this.handleOnVideoLoad}
                // handleOnVideoPause={this.handleOnVideoPause}
                // handleOnLoadedData={this.handleOnLoadedData}
                // handleOnReadyStateChange={this.handleOnReadyStateChange}
                {...videoSettings}
                isMobile
              />
            )
          }
        }
      }
    }
  }

  hideCountDown = () => {
    this.setState({
      countDownStatus: false,
    })
  }

  handleCloseInfoBar = () => {
    this.setState({
      toggleInfoBar: false,
    })
  }

  render() {
    const { loc } = this.state
    const { meta: { status, error }, data } = this.props.movieDetail
    const apiFetched = status === 'success' && data.length > 0
    const dataFetched = apiFetched ? data[0] : undefined

    const { user, movieDetail: { data: movieDetailData } } = this.props
    const { data: vuid, meta: { status: vuidStatus } } = this.props.vuid
    // user.loc = loc
    // const adsFlag = status === 'success' ? _get(movieDetailData, 'movieDetailData[0].ads', null) : null
    // const defaultVidSetting = status === 'success' ? defaultVideoSetting(user, dataFetched, vuidStatus === 'success' ? vuid : '') : {}

    // const checkAdsSettings = adsFlag !== null && adsFlag <= 0 ? this.disableAds(status, defaultVidSetting) : defaultVidSetting

    // const videoSettings = {
    //   ...checkAdsSettings,
    // }

    let drmStreamUrl = '',
      isDRM = false
    const isSafari = /.*Version.*Safari.*/.test(navigator.userAgent)
    if (status === 'success' && dataFetched.drm && dataFetched.drm.widevine && dataFetched.drm.fairplay) {
      drmStreamUrl = isSafari ? dataFetched.drm.fairplay.streamUrl : dataFetched.drm.widevine.streamUrl
    }
    isDRM = drmStreamUrl ? true : false

    const loadPlayer = status === 'success' && ((isDRM && vuidStatus === 'success') || !isDRM)
    const isMovieBool = isMovie(dataFetched.contentType)

    const { toggleInfoBar, notice_bar_message } = this.state
    let isMatchPassed = false
    if (dataFetched && dataFetched.endTime < Date.now() / 1000) {
      isMatchPassed = true
    }

    return (
      <>
        {dataFetched && (
          <>
            <div className={headerContainer}>
              <Header isMobile {...this.props} />
            </div>
            <div className={movieDetailContainer}>
              {toggleInfoBar &&
                !isMatchPassed && (
                  <div className={infoBar}>
                    <div className={infoBarContainer}>
                      <div className={infoBarText}>{notice_bar_message}</div>
                      <div className={infoBarClose} onClick={this.handleCloseInfoBar}>
                        <span />
                      </div>
                    </div>
                  </div>
                )}
              <div className={videoPlayerContainer}>
                {loadPlayer ? (
                  <>{this.renderVideo(dataFetched)}</>
                ) : (
                  <div className={movieDetailNotAvailableContainer}>Video Not Available</div>
                )}
              </div>
              <h1 className={videoTitle}>{dataFetched.title}</h1>
              {isMovieBool && <MovieContent dataFetched={dataFetched} />}
              {!isMovieBool && <SportContent dataFetched={dataFetched} />}
            </div>
          </>
        )}
        {!dataFetched && status === 'error' && <MovieDetailError message={error} />}
      </>
    )
  }
}

const mapStateToProps = state => {
  return {
    ...state,
  }
}

const mapDispatchToProps = dispatch => ({
  fetchRecommendation: movieId => dispatch(recommendationActions.getRecommendation(movieId)),
  getVUID_retry: () => dispatch(getVUID_retry()),
})

export default connect(mapStateToProps, mapDispatchToProps)(MovieDetail)

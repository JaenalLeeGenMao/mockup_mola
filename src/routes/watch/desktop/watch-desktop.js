import React, { Component } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import _get from 'lodash/get'
import { get } from 'axios'

import { defaultVideoSetting } from '@source/lib/theoplayerConfig.js'
import { isMovie, getContentTypeName } from '@source/lib/globalUtil'
import Tracker from '@source/lib/tracker'
import recommendationActions from '@actions/recommendation'
import { getVUID_retry } from '@actions/vuid'

import Header from '@components/Header'
import CountDown from '@components/CountDown'
import MovieDetailError from '@components/common/error'
// import Link from '@components/Link'
// import { Overview as ContentOverview, Review as ContentReview, Trailer as ContentTrailer, Suggestions as ContentSuggestions } from './content'

import {
  headerContainer,
  movieDetailContainer,
  movieDetailNotAvailableContainer,
  videoPlayerWrapper,
  videoPlayerContainer,
  videoPlayerContainer__nobar,
  movieDetailBottom,
  infoBar,
  infoBarContainer,
  infoBarText,
  infoBarClose,
  countdownWinfobar,
} from './style'

import { customTheoplayer } from './theoplayer-style'
// const { getComponent } = require('../../../../../gandalf')
const { getComponent } = require('@supersoccer/gandalf')
const Theoplayer = getComponent('theoplayer')

import MovieContent from './movie'
import SportContent from './sport'

class WatchDesktop extends Component {
  state = {
    movieDetail: [],
    loc: '',
    toggleInfoBar: true,
    countDownStatus: true,
    notice_bar_message: 'Siaran Percobaan',
  }

  handleOnVideoLoad = player => {
    const playerButton = document.querySelector('.vjs-button')
    /** handle keyboard pressed */
    document.onkeyup = event => {
      switch (event.which || event.keyCode) {
        case 13 /* enter */:
          if (player.src) {
            playerButton.click()
          }
          break
        case 32 /* space */:
          if (player.src) {
            playerButton.click()
          }
          break
        default:
          event.preventDefault()
          break
      }
    }

    this.player = player

    player.addEventListener('contentprotectionerror', e => {
      if (e.error.toLowerCase() == 'error during license server request') {
        this.props.getVUID_retry()
      } else {
        // console.log('ERROR content protection', e)
        // this.handleVideoError(e);
      }
    })
    // player.addEventListener('error', e => {
    //   console.log('error', e, '======', player.error.code)
    //   // this.handleVideoError(e);
    // })
  }

  subtitles() {
    const { movieDetail } = this.props
    const subtitles = movieDetail.data.length > 0 && movieDetail.data[0].subtitles ? movieDetail.data[0].subtitles : null

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
    let loc = ''

    if (typeof latitude !== 'undefined' && typeof longitude !== 'undefined' && latitude !== '' && longitude !== '') {
      const locationPayload = await get(`/sign-location?lat=${latitude}&long=${longitude}`)
      loc = typeof locationPayload.data.data.loc !== 'undefined' ? locationPayload.data.data.loc : ''
    }

    this.setState({
      loc: loc,
    })
  }

  getConfig = async () => {
    await get('/api/v2/config/app-params').then(result => {
      if (result.data) {
        const { notice_bar_enabled, notice_bar_message } = result.data.data.attributes
        this.setState({
          toggleInfoBar: notice_bar_enabled,
          notice_bar_message,
        })
      }
    })
  }

  componentDidMount() {
    const {
      // getMovieDetail,
      // movieId, //passed as props from index.js,
      // fetchRecommendation,
      // user,
      // getVUID,
    } = this.props

    this.getLoc()
    this.getConfig()
  }

  renderVideo = dataFetched => {
    const { user, getMovieDetail, videoId } = this.props

    if (dataFetched) {
      const { loc } = this.state
      const { data: vuid, meta: { status: vuidStatus } } = this.props.vuid

      const poster = dataFetched ? dataFetched.background.landscape : ''

      const adsFlag = dataFetched ? _get(dataFetched, 'dataFetched.ads', null) : null
      user.loc = loc

      const defaultVidSetting = dataFetched ? defaultVideoSetting(user, dataFetched, vuidStatus === 'success' ? vuid : '') : {}

      const checkAdsSettings = adsFlag !== null && adsFlag <= 0 ? this.disableAds('success', defaultVidSetting) : defaultVidSetting

      const videoSettings = {
        ...checkAdsSettings,
      }

      const { toggleInfoBar } = this.state
      let isMatchPassed = false
      if (dataFetched.endTime < Date.now() / 1000) {
        isMatchPassed = true
      }
      // const countDownClass = toggleInfoBar && !isMatchPassed ? countdownWinfobar : ''
      if (this.state.countDownStatus && getContentTypeName(dataFetched.contentType) === 'live' && dataFetched.startTime * 1000 > Date.now()) {
        return <CountDown hideCountDown={this.hideCountDown} startTime={dataFetched.startTime} videoId={videoId} getMovieDetail={getMovieDetail} isMobile={false} />
      } else if (dataFetched.streamSourceUrl) {
        return <Theoplayer className={customTheoplayer} subtitles={this.subtitles()} poster={poster} autoPlay={false} handleOnVideoLoad={this.handleOnVideoLoad} {...videoSettings} />
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
    const { isControllerActive, loc } = this.state
    const { meta: { status: videoStatus, error }, data } = this.props.movieDetail
    const { user } = this.props
    const { data: vuid, meta: { status: vuidStatus } } = this.props.vuid

    const dataFetched = videoStatus === 'success' && data.length > 0 ? data[0] : undefined

    let drmStreamUrl = '',
      isDRM = false
    const isSafari = /.*Version.*Safari.*/.test(navigator.userAgent)
    if (videoStatus === 'success' && dataFetched.drm && dataFetched.drm.widevine && dataFetched.drm.fairplay) {
      drmStreamUrl = isSafari ? dataFetched.drm.fairplay.streamUrl : dataFetched.drm.widevine.streamUrl
    }
    isDRM = drmStreamUrl ? true : false

    const loadPlayer = dataFetched && ((isDRM && vuidStatus === 'success') || !isDRM)
    let hiddenController = []
    if (dataFetched && dataFetched.trailers.length === 0) {
      hiddenController.push('trailers')
    }

    if (dataFetched && dataFetched.quotes.length === 0) {
      hiddenController.push('review')
    }
    const isMovieBool = isMovie(dataFetched.contentType)

    const { toggleInfoBar, notice_bar_message } = this.state
    let isMatchPassed = false
    if (dataFetched && dataFetched.endTime < Date.now() / 1000) {
      isMatchPassed = true
    }

    const playerClass = toggleInfoBar && !isMatchPassed ? videoPlayerContainer : videoPlayerContainer__nobar
    return (
      <>
        {dataFetched && (
          <>
            <div className={headerContainer}>
              <Header stickyOff libraryOff {...this.props} />
            </div>
            <div className={movieDetailContainer}>
              <div className={videoPlayerWrapper}>
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
                <div className={playerClass}>{loadPlayer ? <>{this.renderVideo(dataFetched)}</> : <div className={movieDetailNotAvailableContainer}>Video Not Available</div>}</div>
              </div>
              <div className={movieDetailBottom}>
                {isMovieBool && <MovieContent dataFetched={dataFetched} />}
                {!isMovieBool && <SportContent dataFetched={dataFetched} />}
              </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(WatchDesktop)

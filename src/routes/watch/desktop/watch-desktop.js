import React, { Component } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import _get from 'lodash/get'
import { get } from 'axios'

import { defaultVideoSetting } from '@source/lib/theoplayerConfig.js'
import { isMovie } from '@source/lib/globalUtil'
import Tracker from '@source/lib/tracker'
import recommendationActions from '@actions/recommendation'
import { getVUID_retry } from '@actions/vuid'

import MovieDetailError from '@components/common/error'
// import Link from '@components/Link'
// import { Overview as ContentOverview, Review as ContentReview, Trailer as ContentTrailer, Suggestions as ContentSuggestions } from './content'

import { movieDetailContainer, movieDetailNotAvailableContainer, controllerContainer, videoPlayerContainer, movieDetailBottom } from './style'

import styles from '@global/style/css/grainBackground.css'
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

  componentDidMount() {
    const {
      // getMovieDetail,
      // movieId, //passed as props from index.js,
      // fetchRecommendation,
      // user,
      // getVUID,
    } = this.props

    this.getLoc()
    // getMovieDetail(movieId)
    // fetchRecommendation(movieId)

    // this.updateEncryption()
    // const deviceId = user.uid ? user.uid : DRMConfig.getOrCreateDeviceId()
    // getVUID(deviceId)
  }

  // componentDidUpdate(prevProps) {
  //   const {
  //     getMovieDetail,
  //     movieDetail,
  //     movieId, //passed as props from index.js,
  //     fetchRecommendation,
  //   } = this.props

  //   if (movieDetail.meta.status === 'success' && movieDetail.data[0].id != movieId) {
  //     this.getLoc()
  //     getMovieDetail(movieId)
  //     // fetchRecommendation(movieId)
  //     this.setState({
  //       toggleSuggestion: false,
  //     })
  //   }

  //   if (prevProps.movieDetail.meta.status !== movieDetail.meta.status && movieDetail.meta.status === 'success') {
  //     if (!isMovie(movieDetail.data[0].contentType)) {
  //       history.push(`/watch?v=${movieDetail.data[0].id}`)
  //     }
  //   }
  //   this.updateMetaTag()
  // }

  render() {
    const { isControllerActive, loc } = this.state
    const { meta: { status: videoStatus, error }, data } = this.props.movieDetail
    const { user } = this.props
    const { data: vuid, meta: { status: vuidStatus } } = this.props.vuid

    const dataFetched = videoStatus === 'success' && data.length > 0 ? data[0] : undefined
    const poster = dataFetched ? dataFetched.background.landscape : ''

    const adsFlag = videoStatus === 'success' ? _get(dataFetched, 'movieDetailData[0].ads', null) : null
    user.loc = loc
    const defaultVidSetting = videoStatus === 'success' ? defaultVideoSetting(user, dataFetched, vuidStatus === 'success' ? vuid : '') : {}

    const checkAdsSettings = adsFlag !== null && adsFlag <= 0 ? this.disableAds(videoStatus, defaultVidSetting) : defaultVidSetting

    const videoSettings = {
      ...checkAdsSettings,
    }

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
    const isTrailer = dataFetched && dataFetched.contentType === 8 ? true : false
    return (
      <>
        {dataFetched && (
          <div className={movieDetailContainer}>
            <div style={{ width: '100vw', background: '#000' }}>
              <div className={videoPlayerContainer}>
                {loadPlayer ? (
                  <Theoplayer
                    className={customTheoplayer}
                    subtitles={this.subtitles()}
                    poster={poster}
                    autoPlay={false}
                    handleOnVideoLoad={this.handleOnVideoLoad}
                    {...videoSettings}
                    showChildren
                    showBackBtn
                  />
                ) : (
                  <div className={movieDetailNotAvailableContainer}>Video Not Available</div>
                )}
              </div>
            </div>
            <div className={movieDetailBottom}>
              {isMovie(dataFetched.contentType) && <MovieContent dataFetched={dataFetched} />}

              {!isMovie(dataFetched.contentType) && <SportContent dataFetched={dataFetched} />}
              {/* {isTrailer && <ContentOverview data={dataFetched} />} */}
              {/* {!isTrailer && (
                <>
                  {isControllerActive === 'overview' && <ContentOverview data={dataFetched} />}
                  {isControllerActive === 'trailers' && <ContentTrailer data={dataFetched.trailers} />}
                  {isControllerActive === 'review' && <ContentReview data={dataFetched} />}
                  {isControllerActive === 'suggestions' && <ContentSuggestions videos={this.props.recommendation.data} />}
                  <Controller isActive={isControllerActive} onClick={this.handleControllerClick} hiddenController={hiddenController} />
                </>
              )} */}
            </div>
          </div>
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

export default compose(withStyles(styles), connect(mapStateToProps, mapDispatchToProps))(WatchDesktop)

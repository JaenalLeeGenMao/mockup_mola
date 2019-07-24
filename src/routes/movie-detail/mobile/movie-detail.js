import React, { Component } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import _get from 'lodash/get'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import { Helmet } from 'react-helmet'
import { get } from 'axios'

import { notificationBarBackground, logoLandscapeBlue } from '@global/imageUrl'
import { defaultVideoSetting } from '@source/lib/theoplayerConfig.js'
import { updateCustomMeta } from '@source/DOMUtils'
import DRMConfig from '@source/lib/DRMConfig'
import config from '@source/config'

import Tracker from '@source/lib/tracker'
import { isMovie } from '@source/lib/globalUtil'
import watchPermission from '@source/lib/watchPermission'

import * as movieDetailActions from '@actions/movie-detail'
import recommendationActions from '@actions/recommendation'
import { getVUID, getVUID_retry } from '@actions/vuid'

import Header from '@components/Header'
import MovieDetailError from '@components/common/error'
import { Synopsis as ContentSynopsis, Review as ContentReview, Creator as ContentCreator, Suggestions as ContentSuggestions, Trailer as ContentTrailer } from './content'

import { movieDetailContainer, movieDetailNotAvailableContainer, videoPlayerContainer, videoTitle, playMovieButton, playMovieIcon, posterWrapper, playIcon, movieDetailNotAllowed } from './style'
import styles from '@global/style/css/grainBackground.css'

import { customTheoplayer } from './theoplayer-style'
// const { getComponent } = require('../../../../../gandalf')
const { getComponent } = require('@supersoccer/gandalf')
const Theoplayer = getComponent('theoplayer')
class MovieDetail extends Component {
  state = {
    loc: '',
    android_redirect_to_app: false,
    ios_redirect_to_app: false,
  }

  uuidADS = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = (Math.random() * 16) | 0,
        v = c == 'x' ? r : (r & 0x3) | 0x8
      return v.toString(16)
    })
  }

  updateMetaTag() {
    const { movieDetail } = this.props
    if (movieDetail.data.length > 0) {
      const { title, description, background } = movieDetail.data[0]
      updateCustomMeta('og:title', title)
      updateCustomMeta('og:image', background.landscape)
      updateCustomMeta('og:description', description)
      updateCustomMeta('og:url', window.location.href)
    }
    /* When audio starts playing... */
    if ('mediaSession' in navigator) {
      const currentMovie = movieDetail.data.length > 0 ? movieDetail.data[0] : { title: 'Mola TV' }
      navigator.mediaSession.metadata = new MediaMetadata({
        title: currentMovie.title,
        artist: 'Mola TV',
        album: 'Watch Movies & Streaming Online',
        artwork: [
          { src: notificationBarBackground, sizes: '96x96', type: 'image/png' },
          { src: notificationBarBackground, sizes: '128x128', type: 'image/png' },
          { src: notificationBarBackground, sizes: '192x192', type: 'image/png' },
          { src: notificationBarBackground, sizes: '256x256', type: 'image/png' },
          { src: notificationBarBackground, sizes: '384x384', type: 'image/png' },
          { src: notificationBarBackground, sizes: '512x512', type: 'image/png' },
        ],
      })
    }
  }

  handleOnVideoPause = (payload = false, player) => {
    this.isAds = document.querySelector('.theoplayer-ad-nonlinear-content') /* important to determine suggestion box position */
    this.setState({ toggleSuggestion: true })
  }

  // handleOnVideoPlay = (payload = true, player) => {
  //   // window.removeEventListener('beforeunload', () => this.handleOnTimePerMinute({ action: 'closed' }))
  //   // window.addEventListener('beforeunload', () => this.handleOnTimePerMinute({ action: 'closed' }))
  //   this.isPlay = true
  //   this.setState({ toggleSuggestion: false })

  //   const { movieId, runtime: { appPackage } } = this.props
  //   const isSafari = /.*Version.*Safari.*/.test(navigator.userAgent)
  //   if (!isSafari) {
  //     const domain = config.endpoints.domain
  //     const url = encodeURIComponent(`${domain}/download-app/${movieId}`)
  //     document.location = `intent://scan/#Intent;scheme=molaapp;package=com.molademo;S.browser_fallback_url=${url};end`
  //   }
  // }

  handleOnVideoLoad = player => {
    this.player = player
  }

  handleOnReadyStateChange = player => {
    this.player = player
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

    const locationPayload = await get(`/sign-location?lat=${latitude}&long=${longitude}`)

    const loc = locationPayload.data.data.loc

    this.setState({
      loc: loc,
    })
  }

  getConfig = async () => {
    await get('/api/v2/config/app-params').then(result => {
      if (result.data) {
        const { android_redirect_to_app, ios_redirect_to_app } = result.data.data.attributes
        this.setState({
          android_redirect_to_app: android_redirect_to_app,
          ios_redirect_to_app: ios_redirect_to_app,
        })
      }
    })
  }

  componentDidMount() {
    const {
      getMovieDetail,
      movieId, //passed as props from index.js,
      fetchRecommendation,
      user,
      getVUID,
    } = this.props

    this.getLoc()
    this.getConfig()
    getMovieDetail(movieId)
    fetchRecommendation(movieId)

    // this.updateEncryption()

    const deviceId = user.uid ? user.uid : DRMConfig.getOrCreateDeviceId()
    getVUID(deviceId)
  }

  componentDidUpdate(prevProps) {
    const {
      getMovieDetail,
      movieDetail,
      movieId, //passed as props from index.js,
      fetchRecommendation,
      urlParams,
    } = this.props

    if (movieDetail.meta.status === 'success' && movieDetail.data[0].id != movieId) {
      this.getLoc()
      getMovieDetail(movieId)
      fetchRecommendation(movieId)
      this.setState({
        toggleSuggestion: false,
      })
    }

    if (prevProps.movieDetail.meta.status !== movieDetail.meta.status && movieDetail.meta.status === 'success') {
      if (!isMovie(movieDetail.data[0].contentType)) {
        const params = Object.keys(urlParams)
          .map(function(key) {
            return key + '=' + urlParams[key]
          })
          .join('&')
        window.location.href = `/watch?v=${movieDetail.data[0].id}&${params}`
      }
    }

    this.updateMetaTag()
  }

  componentWillUnmount() {
    updateCustomMeta('og:title', 'Mola TV')
    updateCustomMeta('og:image', logoLandscapeBlue)
    updateCustomMeta('og:description', 'Watch TV Shows Online, Watch Movies Online or stream right to your smart TV, PC, Mac, mobile, tablet and more.')
    updateCustomMeta('og:url', window.location.href || 'https://mola.tv/')
  }

  handlePlayMovie = () => {
    const { movieId } = this.props
    const domain = config.endpoints.domain
    const url = encodeURIComponent(`${domain}/download-app/${movieId}`)
    document.location = `intent://mola.tv/watch?v=${movieId}/#Intent;scheme=molaapp;package=tv.mola.app;S.browser_fallback_url=${url};end`
  }

  handlePlayMovieApple = () => {
    const { movieId } = this.props
    const domain = config.endpoints.domain
    const url = `${domain}/download-app/${movieId}`
    document.location = `molaapp://mola.tv/watch?v=${movieId}`
    setTimeout(function() {
      window.location.href = url
    }, 250)
  }

  renderVideo = (poster, videoSettings, permission) => {
    const { android_redirect_to_app, ios_redirect_to_app } = this.state
    const isApple = /iPad|iPhone|iPod/.test(navigator.userAgent)
    const isAllowed = permission ? permission.isAllowed : true
    let watchPermissionErrorCode = permission ? permission.errorCode : ''

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
            handleOnVideoLoad={this.handleOnVideoLoad}
            handleOnVideoPause={this.handleOnVideoPause}
            handleOnLoadedData={this.handleOnLoadedData}
            handleOnReadyStateChange={this.handleOnReadyStateChange}
            showBackBtn={false}
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
            handleOnVideoLoad={this.handleOnVideoLoad}
            handleOnVideoPause={this.handleOnVideoPause}
            handleOnLoadedData={this.handleOnLoadedData}
            handleOnReadyStateChange={this.handleOnReadyStateChange}
            showBackBtn={false}
            {...videoSettings}
            isMobile
          />
        )
      }
    }
  }

  render() {
    const { loc } = this.state
    const { meta: { status, error }, data } = this.props.movieDetail
    const apiFetched = status === 'success' && data.length > 0
    const dataFetched = apiFetched ? data[0] : undefined
    const poster = apiFetched ? dataFetched.background.landscape : ''
    const permission = apiFetched ? watchPermission(dataFetched.permission, this.props.user.sid) : null

    const { user, recommendation, movieDetail: { data: movieDetailData } } = this.props
    const { data: vuid, meta: { status: vuidStatus } } = this.props.vuid
    user.loc = loc
    const adsFlag = status === 'success' ? _get(movieDetailData, 'movieDetailData[0].ads', null) : null
    const defaultVidSetting = status === 'success' ? defaultVideoSetting(user, dataFetched, vuidStatus === 'success' ? vuid : '') : {}

    const checkAdsSettings = adsFlag !== null && adsFlag <= 0 ? this.disableAds(status, defaultVidSetting) : defaultVidSetting

    const videoSettings = {
      ...checkAdsSettings,
    }

    let drmStreamUrl = '',
      isDRM = false
    const isSafari = /.*Version.*Safari.*/.test(navigator.userAgent)
    if (status === 'success' && dataFetched.drm && dataFetched.drm.widevine && dataFetched.drm.fairplay) {
      drmStreamUrl = isSafari ? dataFetched.drm.fairplay.streamUrl : dataFetched.drm.widevine.streamUrl
    }
    isDRM = drmStreamUrl ? true : false

    const loadPlayer = status === 'success' && ((isDRM && vuidStatus === 'success') || !isDRM)
    return (
      <>
        {' '}
        {dataFetched && (
          <>
            <Helmet>
              <title>{dataFetched.title}</title>
            </Helmet>
            <Header logoOff stickyOff libraryOff searchOff profileOff isMobile isDark={0} backButtonOn leftMenuOff shareButtonOn {...this.props} />
            <div className={movieDetailContainer}>
              <div className={videoPlayerContainer}>
                {loadPlayer ? <>{this.renderVideo(poster, videoSettings, permission)}</> : <div className={movieDetailNotAvailableContainer}>Video Not Available</div>}
              </div>
              <h1 className={videoTitle}>{dataFetched.title}</h1>
              {dataFetched.trailers && dataFetched.trailers.length > 0 && <ContentTrailer videos={dataFetched.trailers} />}
              <ContentSynopsis content={dataFetched.description} />
              {dataFetched.people && dataFetched.people.length > 0 && <ContentCreator people={dataFetched.people} />}
              {dataFetched.quotes && dataFetched.quotes.length > 0 && <ContentReview review={dataFetched} />}
              {recommendation.meta.status === 'success' && <ContentSuggestions videos={recommendation.data} />}
            </div>
            {/* <div className={playMovieButton} onClick={this.handlePlayMovie}>
              <div className={playMovieIcon} />
              <span>Play Movie</span>
            </div> */}
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
  getMovieDetail: movieId => dispatch(movieDetailActions.getMovieDetail(movieId)),
  fetchRecommendation: movieId => dispatch(recommendationActions.getRecommendation(movieId)),
  getVUID: deviceId => dispatch(getVUID(deviceId)),
  getVUID_retry: () => dispatch(getVUID_retry()),
})

export default compose(withStyles(styles), connect(mapStateToProps, mapDispatchToProps))(MovieDetail)

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import _get from 'lodash/get'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import { Helmet } from 'react-helmet'

import { notificationBarBackground, logoLandscapeBlue } from '@global/imageUrl'
import { defaultVideoSetting } from '@source/lib/theoplayerConfig.js'
import { updateCustomMeta } from '@source/DOMUtils'
import DRMConfig from '@source/lib/DRMConfig'

import * as movieDetailActions from '@actions/movie-detail'
import notFoundActions from '@actions/not-found'
import { getVUID, getVUID_retry } from '@actions/vuid'

import Header from '@components/Header'
import MovieDetailError from '@components/common/error'
import { Synopsis as ContentSynopsis, Review as ContentReview, Creator as ContentCreator, Suggestions as ContentSuggestions, Trailer as ContentTrailer } from './content'

import { movieDetailContainer, movieDetailNotAvailableContainer, videoPlayerContainer, videoTitle, playMovieButton, playMovieIcon } from './style'
import styles from '@global/style/css/grainBackground.css'

import { customTheoplayer } from './theoplayer-style'
// const { getComponent } = require('../../../../../gandalf')
const { getComponent } = require('@supersoccer/gandalf')
const Theoplayer = getComponent('theoplayer')
class MovieDetail extends Component {
  state = {
    toggleSuggestion: false,
  }

  uuidADS = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
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

  handleOnVideoPlay = (payload = true, player) => {
    // window.removeEventListener('beforeunload', () => this.handleOnTimePerMinute({ action: 'closed' }))
    // window.addEventListener('beforeunload', () => this.handleOnTimePerMinute({ action: 'closed' }))
    this.isPlay = true
    this.setState({ toggleSuggestion: false })
  }

  handleOnVideoLoad = player => {
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

  componentDidMount() {
    const {
      getMovieDetail,
      movieId, //passed as props from index.js,
      onHandleHotPlaylist,
      user,
      getVUID,
    } = this.props

    getMovieDetail(movieId)
    onHandleHotPlaylist()

    // this.updateEncryption()

    const deviceId = user.uid ? user.uid : DRMConfig.getOrCreateDeviceId()
    getVUID(deviceId)
  }

  componentDidUpdate() {
    const {
      getMovieDetail,
      movieDetail,
      movieId, //passed as props from index.js,
      onHandleHotPlaylist,
    } = this.props

    if (movieDetail.meta.status === 'success' && movieDetail.data[0].id != movieId) {
      getMovieDetail(movieId)
      onHandleHotPlaylist()
      this.setState({
        toggleSuggestion: false,
      })
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
    this.player.play()
  }

  render() {
    const { toggleSuggestion } = this.state
    const { meta: { status, error }, data } = this.props.movieDetail
    const apiFetched = status === 'success' && data.length > 0
    const dataFetched = apiFetched ? data[0] : undefined
    const poster = apiFetched ? dataFetched.background.landscape : ''

    const { user, notFound, movieDetail: { data: movieDetailData } } = this.props
    const { data: vuid, meta: { status: vuidStatus } } = this.props.vuid

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
                {loadPlayer ? (
                  <Theoplayer
                    className={customTheoplayer}
                    subtitles={this.subtitles()}
                    poster={poster}
                    autoPlay={false}
                    // certificateUrl="test"
                    handleOnVideoLoad={this.handleOnVideoLoad}
                    handleOnVideoPause={this.handleOnVideoPause}
                    handleOnVideoPlay={this.handleOnVideoPlay}
                    showBackBtn={false}
                    {...videoSettings}
                    showChildren
                    isMobile
                  />
                ) : (
                    <div className={movieDetailNotAvailableContainer}>Video Not Available</div>
                  )}
              </div>
              <h1 className={videoTitle}>{dataFetched.title}</h1>
              {dataFetched.trailers && dataFetched.trailers.length > 0 && <ContentTrailer videos={dataFetched.trailers} />}
              <ContentSynopsis content={dataFetched.description} />
              {dataFetched.people && dataFetched.people.length > 0 && <ContentCreator people={dataFetched.people} />}
              <ContentReview review={dataFetched} />
              {notFound.meta.status === 'success' && <ContentSuggestions videos={notFound.data} />}
            </div>
            <div className={playMovieButton} onClick={this.handlePlayMovie}>
              <div className={playMovieIcon} />
              <span>Play Movie</span>
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
  getMovieDetail: movieId => dispatch(movieDetailActions.getMovieDetail(movieId)),
  onHandleHotPlaylist: () => dispatch(notFoundActions.getHotPlaylist()),
  getVUID: deviceId => dispatch(getVUID(deviceId)),
  getVUID_retry: () => dispatch(getVUID_retry()),
})

export default compose(withStyles(styles), connect(mapStateToProps, mapDispatchToProps))(MovieDetail)

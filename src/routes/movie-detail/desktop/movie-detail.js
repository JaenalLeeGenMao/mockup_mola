import React, { Component } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import { Helmet } from 'react-helmet'
import _get from 'lodash/get'
import { get } from 'axios'

import { notificationBarBackground, logoLandscapeBlue } from '@global/imageUrl'
import { updateCustomMeta } from '@source/DOMUtils'
import { defaultVideoSetting } from '@source/lib/theoplayerConfig.js'
import DRMConfig from '@source/lib/DRMConfig'
import Tracker from '@source/lib/tracker'
import { isMovie } from '@source/lib/globalUtil'
import history from '@source/history'

import * as movieDetailActions from '@actions/movie-detail'
import recommendationActions from '@actions/recommendation'
import { getVUID, getVUID_retry } from '@actions/vuid'

import MovieDetailError from '@components/common/error'
// import Link from '@components/Link'
import { Overview as ContentOverview, Review as ContentReview, Trailer as ContentTrailer, Suggestions as ContentSuggestions } from './content'

import { movieDetailContainer, movieDetailNotAvailableContainer, controllerContainer, videoPlayerContainer, movieDetailBottom } from './style'

import styles from '@global/style/css/grainBackground.css'
import { customTheoplayer } from './theoplayer-style'
// const { getComponent } = require('../../../../../gandalf')
const { getComponent } = require('@supersoccer/gandalf')
const Theoplayer = getComponent('theoplayer')

const Controller = ({ isActive = 'overview', onClick, hiddenController }) => {
  const controllerList = ['overview', 'trailers', 'review', 'suggestions']

  return (
    <div className={controllerContainer}>
      {controllerList.map(ctrl => {
        if (!hiddenController.includes(ctrl)) {
          return (
            <div className={isActive === ctrl ? 'active' : ''} onClick={() => onClick(ctrl)}>
              {ctrl}
            </div>
          )
        }
      })}
    </div>
  )
}

// }

class MovieDetail extends Component {
  state = {
    toggleSuggestion: false,
    movieDetail: [],
    isControllerActive: 'overview',
    loc: '',
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

  handleControllerClick = name => {
    this.setState({ isControllerActive: name })
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
      getMovieDetail,
      movieId, //passed as props from index.js,
      fetchRecommendation,
      user,
      getVUID,
    } = this.props

    this.getLoc()
    getMovieDetail(movieId)
    // fetchRecommendation(movieId)

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
      // fetchRecommendation(movieId)
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
        history.push(`/watch?v=${movieDetail.data[0].id}&${params}`)
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

  render() {
    const { isControllerActive, toggleSuggestion, loc } = this.state
    const { meta: { status, error }, data } = this.props.movieDetail
    const apiFetched = status === 'success' && data.length > 0
    const dataFetched = apiFetched ? data[0] : undefined
    const poster = apiFetched ? dataFetched.background.landscape : ''

    const { user, movieDetail: { data: movieDetailData } } = this.props
    const { data: vuid, meta: { status: vuidStatus } } = this.props.vuid
    const adsFlag = status === 'success' ? _get(movieDetailData, 'movieDetailData[0].ads', null) : null
    user.loc = loc
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
            <Helmet>
              <title>{dataFetched.title}</title>
            </Helmet>
            <div style={{ width: '100vw', background: '#000' }}>
              <div className={videoPlayerContainer}>
                {loadPlayer ? (
                  <Theoplayer
                    className={customTheoplayer}
                    subtitles={this.subtitles()}
                    poster={poster}
                    autoPlay={false}
                    // certificateUrl="https://vmxapac.net:8063/?deviceId=Y2U1NmM3NzAtNmI4NS0zYjZjLTk4ZDMtOTFiN2FjMTZhYWUw"
                    handleOnVideoLoad={this.handleOnVideoLoad}
                    handleOnVideoPause={this.handleOnVideoPause}
                    handleOnVideoPlay={this.handleOnVideoPlay}
                    // handleVideoTimeUpdate={this.handleVideoTimeUpdate}
                    // deviceId="NzhjYmY1NmEtODc3ZC0zM2UxLTkxODAtYTEwY2EzMjk3MTBj"
                    // isDRM={true}
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
              {isTrailer && <ContentOverview data={dataFetched} />}
              {!isTrailer && (
                <>
                  {isControllerActive === 'overview' && <ContentOverview data={dataFetched} />}
                  {isControllerActive === 'trailers' && <ContentTrailer data={dataFetched.trailers} />}
                  {isControllerActive === 'review' && <ContentReview data={dataFetched} />}
                  {isControllerActive === 'suggestions' && <ContentSuggestions videos={this.props.recommendation.data} />}
                  <Controller isActive={isControllerActive} onClick={this.handleControllerClick} hiddenController={hiddenController} />
                </>
              )}
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
  getMovieDetail: movieId => dispatch(movieDetailActions.getMovieDetail(movieId)),
  fetchRecommendation: movieId => dispatch(recommendationActions.getRecommendation(movieId)),
  getVUID: deviceId => dispatch(getVUID(deviceId)),
  getVUID_retry: () => dispatch(getVUID_retry()),
})

export default compose(withStyles(styles), connect(mapStateToProps, mapDispatchToProps))(MovieDetail)

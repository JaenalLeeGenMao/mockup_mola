import React, { Component } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import _get from 'lodash/get'
import withStyles from 'isomorphic-style-loader/lib/withStyles'

import logoLandscapeBlue from '@global/style/icons/mola-landscape-blue.svg'
import notificationBarBackground from '@global/style/icons/notification-bar.png'
import { endpoints } from '@source/config'
import { updateCustomMeta } from '@source/DOMUtils'

import * as movieDetailActions from '@actions/movie-detail'
import notFoundActions from '@actions/not-found'

import MovieDetailError from '@components/common/error'
import LazyLoad from '@components/common/Lazyload'
import Link from '@components/Link'

import { Overview as ContentOverview, Review as ContentReview, Trailer as ContentTrailer } from './content'
import { videoSettings as defaultVideoSettings } from '../const'

import { handleTracker } from './tracker'

import {
  playButton,
  movieDetailContainer,
  movieDetailNotAvailableContainer,
  controllerContainer,
  videoPlayerContainer,
  videoSuggestionContainer,
  videoSuggestionWrapper,
  videoSuggestionPlayer,
  videoSuggestionPlayerDetail,
  videoSuggestionTitle,
} from './style'

import styles from '@global/style/css/grainBackground.css'

import { customTheoplayer } from './theoplayer-style'
// const { getComponent } = require('../../../../../gandalf')
const { getComponent } = require('@supersoccer/gandalf')
const Theoplayer = getComponent('theoplayer')
const VideoThumbnail = getComponent('video-thumbnail')

const Controller = ({ isActive = 'overview', onClick }) => {
  return (
    <div className={controllerContainer}>
      <div className={isActive === 'overview' ? 'active' : ''} onClick={() => onClick('overview')}>
        overview
      </div>
      <div className={isActive === 'trailers' ? 'active' : ''} onClick={() => onClick('trailers')}>
        trailers
      </div>
      <div className={isActive === 'review' ? 'active' : ''} onClick={() => onClick('review')}>
        review
      </div>
    </div>
  )
}

const RelatedVideos = ({ style = {}, containerClassName, className = '', videos = [] }) => {
  return (
    <div className={containerClassName} style={style}>
      {videos.map(({ id, background }) => {
        const imageSource = background.desktop.landscape || require('@global/style/icons/unavailable-image.png')
        return (
          <Link to={`/movie-detail/${id}`} key={id} className={className}>
            <VideoThumbnail thumbnailUrl={imageSource} thumbnailPosition="wrap" className={videoSuggestionPlayerDetail}>
              <div className={playButton} />
            </VideoThumbnail>
          </Link>
        )
      })}
    </div>
  )
}

let ticker = [0] /* important for analytics tracker */
class MovieDetail extends Component {
  state = {
    toggleSuggestion: false,
    movieDetail: [],
    isControllerActive: 'overview',
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const {
      getMovieDetail,
      movieDetail,
      movieId, //passed as props from index.js,
      onHandleHotPlaylist,
    } = nextProps
    if (nextProps.movieDetail.meta.status === 'loading' && prevState.movieDetail.length <= 0) {
      getMovieDetail(movieId)
      onHandleHotPlaylist()
    } else if (nextProps.movieDetail.meta.status === 'success' && nextProps.movieDetail.data[0].id != movieId) {
      getMovieDetail(movieId)
      onHandleHotPlaylist()
      return { ...prevState, movieDetail, toggleSuggestion: false }
    }
    return { ...prevState, movieDetail }
  }

  /* eslint-disable */
  updateEncryption() {
    const { clientIp, uid, sessionId } = this.props.user
    const { data } = this.props.movieDetail

    /* eslint-disable */
    const payload = {
      project_id: '2',
      video_id: this.props.movieId,
      app_id: 'sent_ads',
      session_id: sessionId,
      client_ip: clientIp,
      user_id: uid,
    }

    this.encryptPayload = window.btoa(JSON.stringify(payload))
  }

  updateMetaTag() {
    const { movieDetail } = this.props
    if (movieDetail.data.length > 0) {
      const { title, description, images } = movieDetail.data[0]
      updateCustomMeta('og:title', title)
      updateCustomMeta('og:image', images.cover.background.desktop.landscape)
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

  handleOnTimePerMinute = ({ action }) => {
    const { clientIp, uid, sessionId } = this.props.user
    const currentDuration = this.player ? this.player.currentTime : ''
    const totalDuration = this.player ? this.player.duration : ''
    const payload = {
      action,
      clientIp,
      sessionId,
      userId: uid,
      heartbeat: true,
      window: window,
      currentDuration,
      totalDuration,
    }
    window.__theo_start = window.__theo_start || Date.now()
    window.__theo_ps = Date.now()

    // const minutesElapsed = Math.floor((window.__theo_ps - window.__theo_start) / (60 * 1000))
    // if (minutesElapsed >= 1) {
    handleTracker(payload, this.props.movieDetail.data[0])
    window.__theo_start = window.__theo_ps
    // }
  }

  handleControllerClick = name => {
    this.setState({ isControllerActive: name })
  }

  handleOnVideoPause = (payload = false, player) => {
    this.isAds = document.querySelector('.theoplayer-ad-nonlinear-content') /* important to determine suggestion box position */
    this.setState({ toggleSuggestion: true })
  }

  handleOnVideoPlay = (payload = true, player) => {
    window.removeEventListener('beforeunload', () => this.handleOnTimePerMinute({ action: 'closed' }))
    window.addEventListener('beforeunload', () => this.handleOnTimePerMinute({ action: 'closed' }))

    this.setState({ toggleSuggestion: false })
  }

  handleVideoTimeUpdate = (payload = 0, player) => {
    const time = Math.round(payload)
    if (time % 60 === 0) {
      if (!ticker.includes(time)) {
        ticker.push(time)
        this.handleOnTimePerMinute({ action: 'timeupdate' })
      }
    }
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
  }

  subtitles() {
    const { movieDetail } = this.props
    const subtitles = movieDetail.data.length > 0 ? movieDetail.data[0].subtitles : []

    const myTheoPlayer = subtitles.map(({ id, format /* srt, emsg, eventstream, ttml, webvtt */, locale, type /* subtitles, captions, descriptions, chapters, metadata */, url }) => ({
      kind: type,
      src: url,
      label: locale,
      type: format,
    }))

    return myTheoPlayer
  }

  componentDidMount() {
    this.updateEncryption()
  }

  componentDidUpdate() {
    this.updateMetaTag()
  }

  componentWillUnmount() {
    updateCustomMeta('og:title', 'Mola TV')
    updateCustomMeta('og:image', logoLandscapeBlue)
    updateCustomMeta('og:description', 'Watch TV Shows Online, Watch Movies Online or stream right to your smart TV, PC, Mac, mobile, tablet and more.')
    updateCustomMeta('og:url', window.location.href || 'https://mola.tv/')
  }

  render() {
    const { isControllerActive, movieDetail, toggleSuggestion } = this.state
    const { meta: { status }, data } = movieDetail
    const apiFetched = status === 'success' && data.length > 0
    const dataFetched = apiFetched ? data[0] : undefined
    const streamSource = apiFetched ? dataFetched.streamSourceUrl : ''
    // const streamSource = 'http://cdn.theoplayer.com/video/big_buck_bunny/big_buck_bunny.m3u8'
    // const streamSource = 'https://cdn-mxs-01.akamaized.net/Content/DASH/Live/channel(2a10e294-db16-0d35-f732-f2d040e882d0)/manifest.mpd'
    const poster = apiFetched ? dataFetched.images.cover.background.desktop.landscape : ''
    // const poster = apiFetched ? dataFetched.images.cover.details.desktop.landscape : ''

    const videoSettings = {
      ...defaultVideoSettings,
      adsSource: `${endpoints.ads}/v1/ads/ads-rubik/api/v1/get-preroll-video?params=${this.encryptPayload}`,
      adsBannerUrl: `${endpoints.ads}/v1/ads/ads-rubik/api/v1/get-inplayer-banner?params=${this.encryptPayload}`,
    }

    return (
      <>
        {dataFetched && (
          <div className={movieDetailContainer}>
            <div style={{ width: '100vw', background: '#000' }}>
              <div className={videoPlayerContainer}>
                {streamSource ? (
                  <Theoplayer
                    className={customTheoplayer}
                    subtitles={this.subtitles()}
                    poster={poster}
                    autoPlay={false}
                    movieUrl={streamSource}
                    // certificateUrl="https://vmxapac.net:8063/?deviceId=Y2U1NmM3NzAtNmI4NS0zYjZjLTk4ZDMtOTFiN2FjMTZhYWUw"
                    handleOnVideoLoad={this.handleOnVideoLoad}
                    handleOnVideoPause={this.handleOnVideoPause}
                    handleOnVideoPlay={this.handleOnVideoPlay}
                    handleVideoTimeUpdate={this.handleVideoTimeUpdate}
                    {...videoSettings}
                    showChildren
                  >
                    <LazyLoad
                      containerClassName={videoSuggestionContainer}
                      containerStyle={{
                        display: toggleSuggestion ? 'inline-block' : 'none',
                        width: this.isAds ? '80%' : '90%',
                        left: this.isAds ? '10%' : '5%',
                      }}
                    >
                      <h2 className={videoSuggestionTitle}>Video lain dari Mola TV</h2>
                      <RelatedVideos videos={this.props.notFound.data} containerClassName={videoSuggestionWrapper} className={videoSuggestionPlayer} />
                    </LazyLoad>
                  </Theoplayer>
                ) : (
                  <div className={movieDetailNotAvailableContainer}>Video Not Available</div>
                )}
              </div>
            </div>
            {isControllerActive === 'overview' && <ContentOverview data={dataFetched} />}
            {isControllerActive === 'trailers' && <ContentTrailer data={dataFetched} />}
            {isControllerActive === 'review' && <ContentReview data={dataFetched} />}
            <Controller isActive={isControllerActive} onClick={this.handleControllerClick} />
          </div>
        )}
        {!dataFetched && status === 'error' && <MovieDetailError message={movieDetail.meta.error} />}
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
})

export default compose(withStyles(styles), connect(mapStateToProps, mapDispatchToProps))(MovieDetail)

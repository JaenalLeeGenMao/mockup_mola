import React, { Component } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import _get from 'lodash/get'
import withStyles from 'isomorphic-style-loader/lib/withStyles'

import notificationBarBackground from '@global/style/icons/notification-bar.png'
import { endpoints } from '@source/config'

import * as movieDetailActions from '@actions/movie-detail'
import notFoundActions from '@actions/not-found'

import Header from '@components/Header'
import MovieDetailError from '@components/common/error'
import LazyLoad from '@components/common/Lazyload'
import Link from '@components/Link'

import { Synopsis as ContentSynopsis, Creator as ContentCreator } from './content'
import { videoSettings as defaultVideoSettings } from '../const'

import { handleTracker } from './tracker'

import {
  playButton,
  movieDetailContainer,
  movieDetailNotAvailableContainer,
  videoPlayerContainer,
  videoSuggestionContainer,
  videoSuggestionWrapper,
  videoSuggestionPlayer,
  videoSuggestionPlayerDetail,
} from './style'
import styles from '@global/style/css/grainBackground.css'

import { customTheoplayer } from './theoplayer-style'

// const { getComponent } = require('../../../../../gandalf')
const { getComponent } = require('@supersoccer/gandalf')
const Theoplayer = getComponent('theoplayer')
const VideoThumbnail = getComponent('video-thumbnail')

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
      video_id: data.length > 0 ? data[0].id : '',
      app_id: 'sent_ads',
      session_id: sessionId,
      client_ip: clientIp,
      user_id: uid,
    }

    this.encryptPayload = window.btoa(JSON.stringify(payload))
  }

  updatePlayerButton() {
    const that = this
    setTimeout(() => {
      const streamSource = _get(that.player, 'src', '')
      const bigPlayButton = document.querySelector('.vjs-big-play-button')

      if (bigPlayButton && !streamSource) {
        bigPlayButton.style.display = 'none'
      }
    }, 3000)
  }

  updateMetaTag() {
    /* When audio starts playing... */
    if ('mediaSession' in navigator) {
      const { movieDetail } = this.props,
        currentMovie = movieDetail.data.length > 0 ? movieDetail.data[0] : { title: 'Mola TV' }
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

  handleOnVideoPause = (payload = false, player) => {
    this.setState({ toggleSuggestion: true })
  }

  handleOnVideoPlay = (payload = true, player) => {
    window.removeEventListener('beforeunload', () => this.handleOnTimePerMinute({ action: 'closed' }))
    window.addEventListener('beforeunload', () => this.handleOnTimePerMinute({ action: 'closed' }))

    this.updateMetaTag()

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
    this.player = player
  }

  componentDidMount() {
    this.updateEncryption()
    this.updatePlayerButton()
  }

  render() {
    const { movieDetail, toggleSuggestion } = this.state
    const { meta: { status }, data } = movieDetail
    const apiFetched = status === 'success' && data.length > 0
    const dataFetched = apiFetched ? data[0] : undefined
    const streamSource = apiFetched ? dataFetched.streamSourceUrl : ''
    // const streamSource = 'http://cdn.theoplayer.com/video/big_buck_bunny/big_buck_bunny.m3u8'
    const poster = apiFetched ? dataFetched.images.cover.background.desktop.landscape : ''

    const videoSettings = {
      ...defaultVideoSettings,
      adsSource: `${endpoints.ads}/v1/ads/ads-rubik/api/v1/get-preroll-video?params=${this.encryptPayload}`,
      adsBannerUrl: `${endpoints.ads}/v1/ads/ads-rubik/api/v1/get-inplayer-banner?params=${this.encryptPayload}`,
    }

    return (
      <>
        {dataFetched && (
          <>
            <Header logoOff stickyOff libraryOff searchOff profileOff isMobile isDark={streamSource ? dataFetched.isDark : 0} backButtonOn shareButtonOn {...this.props} />
            <div className={movieDetailContainer}>
              <div className={videoPlayerContainer}>
                {streamSource ? (
                  <Theoplayer
                    className={customTheoplayer}
                    // theoConfig={this.isTheoPlayer()}
                    poster={poster}
                    autoPlay={false}
                    movieUrl={streamSource}
                    handleOnVideoLoad={this.handleOnVideoLoad}
                    handleOnVideoPause={this.handleOnVideoPause}
                    handleOnVideoPlay={this.handleOnVideoPlay}
                    handleVideoTimeUpdate={this.handleVideoTimeUpdate}
                    showBackBtn={false}
                    {...videoSettings}
                    showChildren
                    isMobile
                  >
                    {toggleSuggestion && (
                      <LazyLoad containerClassName={videoSuggestionContainer}>
                        <RelatedVideos videos={this.props.notFound.data} containerClassName={videoSuggestionWrapper} className={videoSuggestionPlayer} />
                      </LazyLoad>
                    )}
                  </Theoplayer>
                ) : (
                  <div className={movieDetailNotAvailableContainer}>
                    <div className={styles.root}>Video Not Available</div>
                  </div>
                )}
              </div>
              <ContentSynopsis content={dataFetched.description} />
              <ContentCreator people={dataFetched.people} />
            </div>
          </>
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

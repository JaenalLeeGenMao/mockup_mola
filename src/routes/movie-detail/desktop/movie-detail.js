import React, { Component } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import _get from 'lodash/get'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import { Helmet } from 'react-helmet'
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

import { handleTracker } from '../tracker'

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
//const { getComponent } = require('../../../../../gandalf')
const { getComponent } = require('@supersoccer/gandalf')
const Theoplayer = getComponent('theoplayer')
const VideoThumbnail = getComponent('video-thumbnail')

var isTabActive

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
        const imageSource = background.landscape || require('@global/style/icons/unavailable-image.png')
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

let ticker = [] /* important for analytics tracker */
class MovieDetail extends Component {
  state = {
    toggleSuggestion: false,
    movieDetail: [],
    isControllerActive: 'overview',
  }

  // static getDerivedStateFromProps(nextProps, prevState) {
  //   const {
  //     getMovieDetail,
  //     movieDetail,
  //     movieId, //passed as props from index.js,
  //     onHandleHotPlaylist,
  //   } = nextProps
  //   if (nextProps.movieDetail.meta.status === 'loading' && prevState.movieDetail.length <= 0) {
  //     getMovieDetail(movieId)
  //     onHandleHotPlaylist()
  //   } else if (nextProps.movieDetail.meta.status === 'success' && nextProps.movieDetail.data[0].id != movieId) {
  //     getMovieDetail(movieId)
  //     onHandleHotPlaylist()
  //     return { ...prevState, movieDetail, toggleSuggestion: false }
  //   }
  //   return { ...prevState, movieDetail }
  // }

  uuidADS = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = (Math.random() * 16) | 0,
        v = c == 'x' ? r : (r & 0x3) | 0x8
      return v.toString(16)
    })
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
      uuid: this.uuidADS(),
    }

    this.encryptPayload = window.btoa(JSON.stringify(payload))
  }

  updateMetaTag() {
    const { movieDetail } = this.props
    if (movieDetail.data.length > 0) {
      const { title, description, images } = movieDetail.data[0]
      updateCustomMeta('og:title', title)
      updateCustomMeta('og:image', images.cover.background.landscape)
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

  handleOnTimePerMinute = ({ action, heartbeat }) => {
    const { clientIp, uid, sessionId } = this.props.user
    const currentDuration = this.player ? this.player.currentTime : ''
    const totalDuration = this.player ? this.player.duration : ''
    const payload = {
      action,
      clientIp,
      sessionId,
      heartbeat: heartbeat ? 60 : 0,
      window: window,
      currentDuration,
      totalDuration,
    }

    if (uid) {
      payload.userId = uid
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
    // window.removeEventListener('beforeunload', () => this.handleOnTimePerMinute({ action: 'closed' }))
    // window.addEventListener('beforeunload', () => this.handleOnTimePerMinute({ action: 'closed' }))
    this.isPlay = true
    this.setState({ toggleSuggestion: false })
  }

  handleVideoTimeUpdate = (payload = 0, player) => {
    const time = Math.round(payload)
    if (time % 60 === 0 && this.isPlay && !player.ads.playing) {
      if (!ticker.includes(time)) {
        ticker.push(time)
        this.handleOnTimePerMinute({ action: 'timeupdate', heartbeat: time !== 0 })
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
    const {
      getMovieDetail,
      movieId, //passed as props from index.js,
      onHandleHotPlaylist,
    } = this.props

    getMovieDetail(movieId)
    onHandleHotPlaylist()

    this.updateEncryption()
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

  render() {
    const { isControllerActive, toggleSuggestion } = this.state
    const { meta: { status, error }, data } = this.props.movieDetail
    const apiFetched = status === 'success' && data.length > 0
    const dataFetched = apiFetched ? data[0] : undefined
    const isSafari = /.*Version.*Safari.*/.test(navigator.userAgent)
    const streamSource = apiFetched ? dataFetched.streamSourceUrl : ''
    // const streamSource = isSafari
    //   ? 'https://cdn-supersoccer-k-01.akamaized.net/Content/HLS/Live/channel(74fa5c1e-bde9-6718-e3ab-11227d90da31)/index.m3u8?hdnts=st=1550491010~exp=1553083010~acl=/*~hmac=c58bb1dfe4f2068f4b004a447af035aa3b50f562e6ebe94f026f7958144d6a6d'
    //   : 'https://cdn-supersoccer-k-01.akamaized.net/Content/DASH/Live/channel(74fa5c1e-bde9-6718-e3ab-11227d90da31)/manifest.mpd?hdnts=st=1550491010~exp=1553083010~acl=/*~hmac=c58bb1dfe4f2068f4b004a447af035aa3b50f562e6ebe94f026f7958144d6a6d'
    // const streamSource = 'http://cdn.theoplayer.com/video/big_buck_bunny/big_buck_bunny.m3u8'
    // const streamSource = 'https://cdn-mxs-01.akamaized.net/Content/DASH/Live/channel(2a10e294-db16-0d35-f732-f2d040e882d0)/manifest.mpd'
    const poster = apiFetched ? dataFetched.images.cover.background.landscape : ''
    // const poster = apiFetched ? dataFetched.images.cover.details.landscape : ''

    //Get Time Right Now
    const todayDate = new Date().getTime()

    //Get ExpireAt
    const setSubscribe = this.props.user.subscriptions
    const setSubscribeExp = Object.keys(setSubscribe).map(key => setSubscribe[key].attributes.expireAt)
    const setSubscribeExpVal = new Date(setSubscribeExp).getTime()

    //Validation Ads Show
    const resultCompareDate = setSubscribeExpVal - todayDate

    //Get Status Subscribe Type from User
    const getSubscribeType = Object.keys(setSubscribe).map(key => setSubscribe[key].attributes.subscriptions[key].type)

    let videoSettings = {}
    if (resultCompareDate > 0) {
      videoSettings = {
        ...defaultVideoSettings,
      }
    } else {
      videoSettings = {
        ...defaultVideoSettings,
        adsSource: `${endpoints.ads}/v1/ads/ads-rubik/api/v1/get-preroll-video?params=${this.encryptPayload}`,
        adsBannerUrl: `${endpoints.ads}/v1/ads/ads-rubik/api/v1/get-inplayer-banner?params=${this.encryptPayload}`,
      }
    }

    return (
      <>
        {dataFetched && (
          <div className={movieDetailContainer}>
            <Helmet>
              <title>{dataFetched.title}</title>
            </Helmet>
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
                    // deviceId="NzhjYmY1NmEtODc3ZC0zM2UxLTkxODAtYTEwY2EzMjk3MTBj"
                    // isDRM={true}
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
})

export default compose(withStyles(styles), connect(mapStateToProps, mapDispatchToProps))(MovieDetail)

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import _get from 'lodash/get'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import { Helmet } from 'react-helmet'
import logoLandscapeBlue from '@global/style/icons/mola-landscape-blue.svg'
import notificationBarBackground from '@global/style/icons/notification-bar.png'
import { defaultVideoSetting } from '@source/lib/theoplayerConfig.js'
import { updateCustomMeta } from '@source/DOMUtils'

import * as movieDetailActions from '@actions/movie-detail'
import notFoundActions from '@actions/not-found'

import Header from '@components/Header'
import MovieDetailError from '@components/common/error'
import LazyLoad from '@components/common/Lazyload'
import Link from '@components/Link'

import { Synopsis as ContentSynopsis, Creator as ContentCreator } from './content'

import {
  playButton,
  movieDetailContainer,
  movieDetailNotAvailableContainer,
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

let ticker = [] /* important for analytics tracker */ /*default 0 */
class MovieDetail extends Component {
  state = {
    toggleSuggestion: false,
  }

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
    const { toggleSuggestion } = this.state
    const { meta: { status, error }, data } = this.props.movieDetail
    const apiFetched = status === 'success' && data.length > 0
    const dataFetched = apiFetched ? data[0] : undefined
    const streamSource = apiFetched ? dataFetched.streamSourceUrl : ''
    // const streamSource = 'http://cdn.theoplayer.com/video/big_buck_bunny/big_buck_bunny.m3u8'
    // const streamSource = 'https://s3-ap-southeast-1.amazonaws.com/my-vmx-video-out/mukesh_demo2/redbull.mpd'
    const poster = apiFetched ? dataFetched.background.landscape : ''

    const { user } = this.props

    const defaultVidSetting = status === 'success' ? defaultVideoSetting(user, dataFetched, '') : {}

    const videoSettings = {
      ...defaultVidSetting,
      // getUrlResponse: this.getUrlResponse
    }

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
                {streamSource ? (
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
                  >
                    {toggleSuggestion && (
                      <LazyLoad
                        containerClassName={videoSuggestionContainer}
                        containerStyle={{
                          display: toggleSuggestion ? 'inline-block' : 'none',
                          width: this.isAds ? '84%' : '95%',
                          left: this.isAds ? '8%' : '2.5%',
                          bottom: this.isAds ? '25%' : '5rem',
                        }}
                      >
                        <h2 className={videoSuggestionTitle}>Video lain dari Mola TV</h2>
                        <RelatedVideos videos={this.props.notFound.data} containerClassName={videoSuggestionWrapper} className={videoSuggestionPlayer} />
                      </LazyLoad>
                    )}
                  </Theoplayer>
                ) : (
                  <div className={movieDetailNotAvailableContainer}>Video Not Available</div>
                )}
              </div>
              <ContentSynopsis content={dataFetched.description} />
              <ContentCreator people={dataFetched.people} />
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
})

export default compose(withStyles(styles), connect(mapStateToProps, mapDispatchToProps))(MovieDetail)

import React, { Component } from 'react'
import { connect } from 'react-redux'
import _get from 'lodash/get'

import * as movieDetailActions from '@actions/movie-detail'
import notFoundActions from '@actions/not-found'

import Header from '@components/Header'
import MovieDetailError from '@components/common/error'
import LazyLoad from '@components/common/Lazyload'
import Link from '@components/Link'

import { Synopsis as ContentSynopsis, Creator as ContentCreator } from './content'

import { handleTracker } from './tracker'

import { playButton, movieDetailContainer, videoPlayerContainer, videoSuggestionContainer, videoSuggestionWrapper, videoSuggestionPlayer, videoSuggestionPlayerDetail } from './style'

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
  handleOnTimePerMinute = ({ action }) => {
    const currentDuration = document.querySelector('.vjs-current-time-display').innerText || ''
    const totalDuration = document.querySelector('.vjs-duration-display').innerText || ''
    const payload = {
      action,
      clientIp: undefined,
      userId: this.props.user.uid,
      videoType: undefined,
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
    this.handleOnTimePerMinute({ action: 'pause' })
    this.setState({ toggleSuggestion: true })
  }

  handleOnVideoPlay = (payload = true, player) => {
    window.removeEventListener('beforeunload', () => this.handleOnTimePerMinute({ action: 'closed' }))
    window.addEventListener('beforeunload', () => this.handleOnTimePerMinute({ action: 'closed' }))

    // ev.preventDefault()
    // return (ev.returnValue = 'Are you sure you want to close?')

    this.handleOnTimePerMinute({ action: 'play' })
    this.setState({ toggleSuggestion: false })
  }

  componentWillUnmount() {
    this.handleOnTimePerMinute({ action: 'closed' })
    window.removeEventListener('beforeunload', () => this.handleOnTimePerMinute({ action: 'closed' }))
  }

  render() {
    const { movieDetail, toggleSuggestion } = this.state
    const { meta: { status }, data } = movieDetail
    const apiFetched = status === 'success' && data.length > 0
    const dataFetched = apiFetched ? data[0] : undefined
    const streamSource = apiFetched ? dataFetched.streamSourceUrl : ''
    // const streamSource = 'http://cdn.theoplayer.com/video/big_buck_bunny/big_buck_bunny.m3u8'
    const poster = apiFetched ? dataFetched.images.cover.background.desktop.landscape : ''

    return (
      <>
        {dataFetched && (
          <>
            <Header logoOff stickyOff libraryOff searchOff profileOff isMobile isDark={dataFetched.isDark} backButtonOn shareButtonOn {...this.props} />
            <div className={movieDetailContainer}>
              <div className={videoPlayerContainer}>
                <Theoplayer
                  className={customTheoplayer}
                  // theoConfig={this.isTheoPlayer()}
                  poster={poster}
                  autoPlay={false}
                  movieUrl={streamSource}
                  handleOnVideoPause={this.handleOnVideoPause}
                  handleOnVideoPlay={this.handleOnVideoPlay}
                  showBackBtn={false}
                  showChildren
                >
                  {toggleSuggestion && (
                    <LazyLoad containerClassName={videoSuggestionContainer}>
                      <RelatedVideos videos={this.props.notFound.data} containerClassName={videoSuggestionWrapper} className={videoSuggestionPlayer} />
                    </LazyLoad>
                  )}
                </Theoplayer>
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

export default connect(mapStateToProps, mapDispatchToProps)(MovieDetail)

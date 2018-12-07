import React, { Component } from 'react'
import { connect } from 'react-redux'

import * as movieDetailActions from '@actions/movie-detail'
import notFoundActions from '@actions/not-found'

import LazyLoad from '@components/common/Lazyload'
import Link from '@components/Link'

import { Overview as ContentOverview, Review as ContentReview, Trailer as ContentTrailer } from './content'
import {
  playButton,
  movieDetailContainer,
  controllerContainer,
  videoPlayerContainer,
  videoSuggestionContainer,
  videoSuggestionWrapper,
  videoSuggestionPlayer,
  videoSuggestionPlayerDetail,
  videoSuggestionTitle,
} from './style'

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

  handleControllerClick = name => {
    this.setState({ isControllerActive: name })
  }

  handleOnVideoPause = (payload = false, player) => {
    this.setState({ toggleSuggestion: true })
  }

  handleOnVideoPlay = (payload = true, player) => {
    this.setState({ toggleSuggestion: false })
  }

  // isTheoPlayer() {
  //   const { movieStream: { data: movieStream } } = this.props;
  //   const subtitlesDt = movieStream.length > 0 ? movieStream[0].subtitles : '';

  //   const myTheoPlayer = subtitlesDt.map(obj => ({
  //     kind: obj.type,
  //     srclang: obj.attributes.locale,
  //     src: obj.attributes.url,
  //     label: obj.attributes.label
  //   }));

  //   return myTheoPlayer;
  // }

  render() {
    const { isControllerActive, movieDetail, toggleSuggestion } = this.state
    const apiFetched = movieDetail.meta.status === 'success' && movieDetail.data.length > 0
    const dataFetched = apiFetched ? movieDetail.data[0] : undefined
    const streamSource = apiFetched ? dataFetched.streamSourceUrl : ''
    const poster = apiFetched ? dataFetched.images.cover.background.desktop.landscape : ''
    return (
      <>
        {dataFetched && (
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
                showChildren
              >
                {toggleSuggestion && (
                  <LazyLoad containerClassName={videoSuggestionContainer}>
                    <h2 className={videoSuggestionTitle}>Suggestions</h2>
                    <RelatedVideos videos={this.props.notFound.data} containerClassName={videoSuggestionWrapper} className={videoSuggestionPlayer} />
                  </LazyLoad>
                )}
              </Theoplayer>
            </div>
            {isControllerActive === 'overview' && <ContentOverview data={dataFetched} />}
            {isControllerActive === 'trailers' && <ContentTrailer data={dataFetched} />}
            {isControllerActive === 'review' && <ContentReview data={dataFetched} />}
            <Controller isActive={isControllerActive} onClick={this.handleControllerClick} />
          </div>
        )}
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

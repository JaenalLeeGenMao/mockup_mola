import React from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'

import withStyles from 'isomorphic-style-loader/lib/withStyles'
import Header from '@components/Header'
import LazyLoad from '@components/common/Lazyload'
import Carousel from '@components/carousel-portrait'
import VideoCard from '@components/video-card'
import playlistAction from '@actions/playlist'
import PlaylistError from '@components/common/error'

import Placeholder from './placeholder'
import s from './playlist.css'
import moment from 'moment'

const trackedPlaylistIds = [] /** tracked the playlist/videos id both similar */

class Playlist extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      viewportWidth: 0,
      carouselRefs: [],
      carouselRefsCounter: 0 /* carouselRefsCounter is a flag to prevent resizing upon initializing carousel */,
      playlists: [],
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { getPlaylist, getPlaylistVideo, playlist: { playlists, videos } } = nextProps

    if (playlists.meta.status === 'loading' && prevState.playlists.length <= 0) {
      getPlaylist('mola-home')
    } else {
      playlists.data.map((playlist, index) => {
        if (trackedPlaylistIds.indexOf(playlist.id) === -1) {
          trackedPlaylistIds.push(playlist.id)
          getPlaylistVideo(playlist)
        }
      })
    }
    return { ...prevState, playlists, videos }
  }

  componentDidMount() {
    if (window) {
      this.updateWindowDimensions()
      window.addEventListener('resize', this.updateWindowDimensions)
    }
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions)
  }

  updateWindowDimensions = () => {
    this.setState({ viewportWidth: window.innerWidth })
  }

  /* Dynamically re-adjust carousel */
  updateOnImageLoad = () => {
    const { carouselRefs, carouselRefsCounter } = this.state

    if (carouselRefsCounter > carouselRefs.length) {
      carouselRefs.map(ref => {
        if (ref && ref.onResize) {
          ref.onResize()
        }
      })
    }

    /* magic happens to prevent resizing upon initialising carousel */
    this.setState({
      carouselRefsCounter: carouselRefsCounter + 1,
    })
  }

  renderPlaylistTitleDescription() {
    const { title, description } = this.props.playlist.playlists
    return (
      <div className={s.playlist_head}>
        <h1> {title}</h1>
        <p>{description}</p>
      </div>
    )
  }

  renderPlaylist() {
    const isMobile = this.state.viewportWidth <= 680
    const { carouselRefs } = this.state

    // const { videos: data } = this.props.playlist

    // if (data.length > 0) {
    // }

    return (
      <LazyLoad>
        <div className={s.playlist_list}>
          <p className={s.season_text}>Season 1</p>
          <Carousel refs={carouselRefs} framePadding={'0px 2rem'} slideToScroll={isMobile ? 1 : 3} slidesToShow={isMobile ? 3 : 8.3} dragging={true}>
            <VideoCard onLoad={this.updateOnImageLoad} description="Virgil van dyik, the  Real EPL WALL" src="https://placeimg.com/640/800/any" />
            <VideoCard onLoad={this.updateOnImageLoad} description="Virgil van dyik, the  Real EPL WALL" src="https://placeimg.com/640/800/any" />
            <VideoCard onLoad={this.updateOnImageLoad} description="Virgil van dyik, the  Real EPL WALL" src="https://placeimg.com/640/800/any" />
            <VideoCard onLoad={this.updateOnImageLoad} description="Virgil van dyik, the  Real EPL WALL" src="https://placeimg.com/640/800/any" />
            <VideoCard onLoad={this.updateOnImageLoad} description="Virgil van dyik, the  Real EPL WALL" src="https://placeimg.com/640/800/any" />
            <VideoCard onLoad={this.updateOnImageLoad} description="Virgil van dyik, the  Real EPL WALL" src="https://placeimg.com/640/800/any" />
            <VideoCard onLoad={this.updateOnImageLoad} description="Virgil van dyik, the  Real EPL WALL" src="https://placeimg.com/640/800/any" />
            <VideoCard onLoad={this.updateOnImageLoad} description="Virgil van dyik, the  Real EPL WALL" src="https://placeimg.com/640/800/any" />
            <VideoCard onLoad={this.updateOnImageLoad} description="Virgil van dyik, the  Real EPL WALL" src="https://placeimg.com/640/800/any" />
            <VideoCard onLoad={this.updateOnImageLoad} description="Virgil van dyik, the  Real EPL WALL" src="https://placeimg.com/640/800/any" />
            <VideoCard onLoad={this.updateOnImageLoad} description="Virgil van dyik, the  Real EPL WALL" src="https://placeimg.com/640/800/any" />
            <VideoCard onLoad={this.updateOnImageLoad} description="Virgil van dyik, the  Real EPL WALL" src="https://placeimg.com/640/800/any" />
            <VideoCard onLoad={this.updateOnImageLoad} description="Virgil van dyik, the  Real EPL WALL" src="https://placeimg.com/640/800/any" />
            <VideoCard onLoad={this.updateOnImageLoad} description="Virgil van dyik, the  Real EPL WALL" src="https://placeimg.com/640/800/any" />
          </Carousel>
        </div>
      </LazyLoad>
    )
  }

  renderHeader() {
    const isDark = false
    return (
      <div className={s.headerContainer}>
        <Header libraryOff activeMenu="movie" isDark={isDark} {...this.props} />
      </div>
    )
  }

  render() {
    const { meta: { status: playlistStatus, error: playlistError } } = this.props.playlist.playlists
    const { meta: { status: videoStatus, error: videoError } } = this.props.playlist.videos

    const { videos, playlists } = this.props.playlist

    // const testProps = this.props.playlist.genreSpo
    // console.log('testProps ind', testProps)

    return (
      <>
        {playlistStatus === 'loading' || (videoStatus === 'loading' && <> {<Placeholder />} </>)}
        {playlistStatus != 'error' && <>{this.renderHeader()}</>}
        {playlistStatus === 'error' || (videoStatus === 'error' && <PlaylistError status={playlistStatus || 404} message={playlistError || 'Playlist is not loaded'} />)}
        {videos &&
          videos.data.length > 0 &&
          videos.data.length === playlists.data.length && (
            <>
              <div className={s.root}>
                <div className={s.playlist_container} id="containercard">
                  {this.renderPlaylistTitleDescription()}
                  {this.renderPlaylist()}
                  {this.renderPlaylist()}
                  {this.renderPlaylist()}
                  {this.renderPlaylist()}
                </div>
              </div>
            </>
          )}
      </>
    )
  }
}

function mapStateToProps(state) {
  return {
    ...state,
  }
}
const mapDispatchToProps = dispatch => ({
  getPlaylist: id => dispatch(playlistAction.getPlaylist(id)),
  getPlaylistVideo: id => dispatch(playlistAction.getPlaylistVideo(id)),
})

export default compose(withStyles(s), connect(mapStateToProps, mapDispatchToProps))(Playlist)

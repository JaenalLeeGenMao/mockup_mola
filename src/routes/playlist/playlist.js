import React from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { css } from 'react-emotion'

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

const desktopBackgroundStyle = url => css`
min-height: 100%;
&::before {
  content: '';
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-position: top;
  background-image: url(${url});
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  position: absolute;
  -webkit-filter: blur(8px) brightness(0.8);
  -moz-filter: blur(8px) brightness(0.8);
  -ms-filter: blur(8px) brightness(0.8);
  -o-filter: blur(8px) brightness(0.8);
  filter: blur(8px) brightness(0.8);
}
}
`
const mobileBackgroundStyle = url => css`
content: '';
  background-repeat: no-repeat;
  // background-attachment: fixed;
  background-position: top;
  background-image: url(${url});
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  position: absolute;
}
`

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
      // getPlaylist('mola-home')
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
      const id = this.props.playlistId
      if (!id) {
        window.location.href = '/not-found'
      } else {
        this.props.getPlaylist(id)
      }
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

  renderPlaylistTitleDescription() {
    const { title, description } = this.props.playlist.playlists
    return (
      <div className={s.playlist_head}>
        <h1> {title}</h1>
        <p>{description}</p>
      </div>
    )
  }

  handleOnClick = id => {
    if (id) {
      window.location.href = `/watch?v=${id}`
    }
  }

  renderPlaylist() {
    const isMobile = this.state.viewportWidth <= 680
    const carouselSetting = {
      desktopShow: 8,
      mobileShow: 3,
      desktopScroll: 3,
      mobileScroll: 1,
    }

    const slidesToShow = isMobile ? carouselSetting.mobileShow : carouselSetting.desktopShow
    const slideToScroll = isMobile ? carouselSetting.mobileScroll : carouselSetting.desktopScroll
    const hideNextIcon = length => length <= carouselSetting.desktopShow

    // SEASON NUMBER USING SORTORDER IS JUST TEMPORARY SOLUTION

    return (
      <>
        {this.props.playlist.videos.data.map((element, i) => (
          <LazyLoad key={'playlist' + i}>
            <div className={s.playlist_list}>
              <p className={s.season_text}>{element.meta.sortOrder ? `Season ${element.meta.sortOrder}` : ''}</p>

              <Carousel framePadding={'0px 2rem'} hideNextIcon={hideNextIcon(element.data.length)} slidesToScroll={slideToScroll} slidesToShow={slidesToShow} dragging={true}>
                {element.data.map((video, idx) => (
                  <VideoCard
                    key={'video' + idx}
                    onClick={() => this.handleOnClick(video.id)}
                    description={video.title ? video.title : ''}
                    src={video.background.portrait ? video.background.portrait : ''}
                  />
                ))}
              </Carousel>
            </div>
          </LazyLoad>
        ))}
      </>
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
    const isMobile = this.state.viewportWidth <= 680
    const { meta: { status: playlistStatus, error: playlistError } } = this.props.playlist.playlists
    const { meta: { status: videoStatus, error: videoError } } = this.props.playlist.videos
    // const divStyle = {
    //   backgroundImage: `url(https://peach.blender.org/wp-content/uploads/bbb-splash.png?x43337)`,
    //   'background-repeat': 'no-repeat',
    //   'background-attachment': 'fixed',
    //   'background-position': 'center',
    // }
    const { videos, playlists } = this.props.playlist

    // const testProps = this.props.playlist.genreSpo
    // console.log('testProps ind', testProps)

    return (
      <>
        {playlistStatus != 'error' && (playlistStatus === 'loading' || (videoStatus === 'loading' && <> {<Placeholder />} </>))}
        {playlistStatus != 'error' && <>{this.renderHeader()}</>}
        {(playlistStatus === 'error' || videoStatus === 'error') && <PlaylistError status={playlistStatus || 404} message={playlistError || 'Playlist is not loaded'} />}
        {videos &&
          videos.data.length > 0 &&
          videos.data.length === playlists.data.length && (
            <>
              <div
                className={`${s.playlist_container} ${
                  isMobile
                    ? mobileBackgroundStyle('https://peach.blender.org/wp-content/uploads/bbb-splash.png?x43337')
                    : desktopBackgroundStyle('https://peach.blender.org/wp-content/uploads/bbb-splash.png?x43337')
                }`}
                id="containercard"
              >
                <div style={{ position: 'relative' }}>
                  {this.renderPlaylistTitleDescription()}
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

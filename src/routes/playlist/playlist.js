import React from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'

import Header from '@components/Header'
import LazyLoad from '@components/common/Lazyload'
import Carousel from '@components/carousel'
import PlaylistCard from '@components/playlist-card'
import VideoCard from '@components/video-card'
import PlaylistError from '@components/common/error'

import playlistAction from '@actions/playlist'

import { getErrorCode } from '@routes/home/util'

import { getContentTypeName } from '@source/lib/globalUtil'
import { formatDateTime, isToday, isTomorrow, isMatchPassed, isMatchLive } from '@source/lib/dateTimeUtil'

import Placeholder from './placeholder'
import {
  playlistContainer,
  playlistWrapper,
  portraitCardWrapper,
  landscapeCardWrapper,
  DesktopBackgroundStyle,
  MobileBackgroundStyle,
  playlistHeadDesktop,
  playlistHeadMobile,
  playlistList,
} from './playlistStyle'

const trackedPlaylistIds = [] /** tracked the playlist/videos id both similar */

class Playlist extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      viewportWidth: this.props.isMobile ? 0 : 1200,
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
          getPlaylistVideo(playlist, index)
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

  renderTitleDesktop() {
    const { title, description } = this.props.playlist.playlists.meta
    return (
      <div className={playlistHeadDesktop}>
        <p className="title"> {title}</p>
        <p className="description">{description}</p>
      </div>
    )
  }

  renderTitleMobile() {
    const { title, description } = this.props.playlist.playlists.meta
    return (
      <div className={playlistHeadMobile}>
        {/* <div className="line" /> */}
        <p className="title"> {title}</p>
        <p className="description">{description}</p>
      </div>
    )
  }
  renderTitle() {
    const isMobile = this.state.viewportWidth <= 680

    if (isMobile) {
      return this.renderTitleMobile()
    } else {
      return this.renderTitleDesktop()
    }
  }

  handleOnClick = id => {
    if (id) {
      window.location.href = `/watch?v=${id}`
    }
  }

  renderPlaylist() {
    const isMobile = this.state.viewportWidth <= 680
    const carouselSetting = {
      desktopShow: 10.5,
      mobileShow: 2.8,
      desktopScroll: 3,
      mobileScroll: 1,
    }

    const slidesToShow = isMobile ? carouselSetting.mobileShow : carouselSetting.desktopShow
    const slideToScroll = isMobile ? carouselSetting.mobileScroll : carouselSetting.desktopScroll
    const hideNextIcon = length => length <= carouselSetting.desktopShow

    return (
      <>
        {this.props.playlist.videos.data.map((element, playlistIndex) => {
          const { playlist: { playlists, videos } } = this.props

          return (
            <LazyLoad key={'playlist' + playlistIndex}>
              <div className={playlistList}>
                <p className="season_text">{element.meta.title ? `${element.meta.title}` : ''}</p>

                {/* <Carousel
                framePadding={!isMobile ? '0rem 2rem' : '0rem 0rem 0rem 1rem'}
                hideNextIcon={hideNextIcon(element.data.length)}
                slidesToScroll={slideToScroll}
                slidesToShow={slidesToShow}
                dragging={true}
              > */}
                <div className="seasonListWrapper">
                  {element.data.map((video, idx) => {
                    const contentTypeName = getContentTypeName(
                        _.get(playlists, `data[${playlistIndex}].contentType`, '')
                      ),
                      isLandscape = contentTypeName === 'live' || contentTypeName === 'replay',
                      matchLive = isMatchLive(video.startTime, video.endTime) /** id 4 is replay matches */

                    return (
                      <LazyLoad
                        containerClassName={isLandscape ? landscapeCardWrapper : portraitCardWrapper}
                        key={'video' + idx}
                      >
                        {isLandscape ? (
                          <PlaylistCard
                            onClick={() => this.handleOnClick(video.id)}
                            description={video.title ? video.title : ''}
                            contentType={matchLive ? video.contentType : 4}
                            src={`${video.background.landscape}?w=540`}
                            data={video}
                          />
                        ) : (
                          <VideoCard
                            onClick={() => this.handleOnClick(video.id)}
                            description={video.title ? video.title : ''}
                            src={`${video.background.portrait}?w=540`}
                            data={video}
                          />
                        )}
                      </LazyLoad>
                    )
                  })}
                </div>
                {/* </Carousel> */}
              </div>
            </LazyLoad>
          )
        })}
      </>
    )
  }

  render() {
    const isMobile = this.state.viewportWidth <= 680
    const {
      meta: { status: playlistStatus, error: playlistError, background: backgroundImage },
    } = this.props.playlist.playlists

    const { videos, playlists } = this.props.playlist

    let errorObj = { code: 0, description: '' }
    if (playlists.meta.error) {
      errorObj = { code: getErrorCode(playlists.meta.error), description: 'Playlist request failed' }
    }

    return (
      <>
        <Header isMobile={isMobile} libraryOff isDark={false} {...this.props} activeMenuId={playlists.meta.menuId} />
        {playlistStatus === 'loading' && <Placeholder isMobile={isMobile} />}
        {playlistStatus === 'error' && (
          <PlaylistError
            status={errorObj.code || 404}
            message={
              errorObj.description || 'Something went wrong, if the problem persist please try clear your browser cache'
            }
          />
        )}
        {videos &&
          videos.data.length > 0 &&
          videos.data.length === playlists.data.length && (
            <>
              <div className={playlistContainer}>
                {isMobile ? (
                  // <MobileBackgroundStyle url="http://images.unsplash.com/photo-1520901157462-0ea3fb2f9024?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max" />
                  <MobileBackgroundStyle url={backgroundImage} />
                ) : (
                  // <DesktopBackgroundStyle url="http://images.unsplash.com/photo-1520901157462-0ea3fb2f9024?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max" />
                  <DesktopBackgroundStyle url={backgroundImage} />
                )}
                <div className={playlistWrapper}>
                  {this.renderTitle()}
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
  getPlaylistVideo: (video, index) => dispatch(playlistAction.getPlaylistVideo(video, index)),
})

export default compose(connect(mapStateToProps, mapDispatchToProps))(Playlist)

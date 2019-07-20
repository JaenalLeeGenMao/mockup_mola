import React, { Component } from 'react'
import { connect } from 'react-redux'

import LazyLoad from '@components/common/Lazyload'
import FeatureError from '@components/common/error'
import Carousel from '@components/carousel'
import PlaylistCard from '@components/playlist-card'
import VideoCard from '@components/video-card'

import featureActions from '@actions/feature'

import { getErrorCode } from '@routes/home/util'

import { getContentTypeName } from '@source/lib/globalUtil'

import Placeholder from './placeholder'
import { contentTypeList } from './const'

import { container, bannerContainer, carouselMargin } from './style'

class Feature extends Component {
  constructor(props) {
    super(props)
    this.state = {
      viewportWidth: 0,
      // carouselRefs: [],
    }
  }

  componentDidMount() {
    if (window) {
      this.updateWindowDimensions()

      const id = this.props.id || window.location.pathname.replace('/', '')

      this.props.onHandlePlaylist(id)
      this.props.onHandleBanner(id)

      window.addEventListener('resize', this.updateWindowDimensions)
    }
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions)
  }

  componentDidUpdate() {
    const { playlists, videos } = this.props.feature
    if (playlists.meta.status === 'success' && playlists.data.length > 0 && playlists.data.length !== videos.data.length) {
      playlists.data.map(playlist => {
        this.props.onHandleVideo(playlist)
      })
    }
  }

  updateWindowDimensions = () => {
    this.setState({ viewportWidth: window.innerWidth })
  }

  /* Dynamically re-adjust carousel */
  // updateOnImageLoad = () => {
  //   const { carouselRefs } = this.state
  // if (carouselRefs.length > 0) {
  //   carouselRefs.map(ref => {
  //     if (ref && ref.onResize) {
  //       ref.onResize()
  //     }
  //   })
  // }
  // }

  render() {
    const isMobile = this.state.viewportWidth <= 680,
      { carouselRefs } = this.state,
      { feature: { playlists, videos, banners } } = this.props

    const isLoading = playlists.meta.status === 'loading' || banners.meta.status === 'loading',
      isError = playlists.meta.status === 'error' || banners.meta.status === 'error',
      isSuccess = playlists.meta.status === 'success' && banners.meta.status === 'success'

    let error = { code: 0, description: '' }
    if (banners.meta.error) {
      errorCode = { code: getErrorCode(banners.meta.error), description: 'Banner request failed' }
    } else if (playlists.meta.error) {
      errorCode = { code: getErrorCode(playlists.meta.error), description: 'Playlist request failed' }
    } else if (videos.meta.error) {
      errorCode = { code: getErrorCode(videos.meta.error), description: 'Video request failed' }
    }

    return (
      <>
        {isLoading && <Placeholder isMobile={isMobile} />}
        {isError && <FeatureError status={error.code} message={error.description || 'Something went wrong, if the problem persist please try clear your browser cache'} />}
        {isSuccess &&
          playlists.data.length > 0 &&
          videos.data.length > 0 &&
          banners.data.length > 0 &&
          playlists.data.length === videos.data.length && (
            <>
              <Carousel refs={carouselRefs} wrap={banners.length === 1 ? false : true} autoplay={false} sliderCoin={true} dragging={true} slidesToShow={2} transitionMode={'scroll3d'}>
                {banners.data.map(obj => (
                  <PlaylistCard
                    transitionMode={'scroll3d'}
                    key={obj.id}
                    onClick={() => (window.location.href = obj.link)}
                    alt={obj.title}
                    src={obj.background.landscape}
                    // onLoad={this.updateOnImageLoad}
                    containerClassName={bannerContainer}
                  />
                ))}
              </Carousel>
              <LazyLoad containerClassName={container}>
                {videos.data.map((video, carouselIndex) => {
                  const contentTypeName = getContentTypeName(_.get(playlists, `data[${carouselIndex}].contentType`, ''))

                  return (
                    <div key={carouselIndex}>
                      {video.data.length > 0 && <h3>{video.meta.title}</h3>}
                      <Carousel
                        // refs={carouselRefs}
                        className={carouselMargin}
                        wrap={false}
                        autoplay={false}
                        sliderCoin={true}
                        dragging={true}
                        withoutControls={video.data.length < contentTypeList[contentTypeName].slideToShow}
                        slideToScroll={isMobile ? 1 : contentTypeList[contentTypeName].slideToScroll}
                        slidesToShow={isMobile ? 3 : contentTypeList[contentTypeName].slideToShow}
                        transitionMode={'scroll'}
                      >
                        {video.data.length > 0 &&
                          video.data.map(obj => {
                            if (contentTypeName === 'movie') {
                              return (
                                <VideoCard
                                  key={obj.id}
                                  alt={obj.title}
                                  description={obj.title}
                                  src={obj.background.portrait}
                                  // onLoad={this.updateOnImageLoad}
                                  onClick={() => (window.location.href = `/${this.props.id}/${obj.id}`)}
                                />
                              )
                            } else {
                              return (
                                <PlaylistCard
                                  key={obj.id}
                                  alt={obj.title}
                                  description={obj.title}
                                  src={obj.type === 'playlists' ? obj.images.cover.landscape : obj.background.landscape}
                                  // onLoad={this.updateOnImageLoad}
                                  onClick={() => (window.location.href = `/${this.props.id}/${obj.id}`)}
                                />
                              )
                            }
                          })}
                      </Carousel>
                    </div>
                  )
                })}
              </LazyLoad>
            </>
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
  onHandlePlaylist: id => dispatch(featureActions.getFeaturePlaylist(id)),
  onHandleVideo: playlist => dispatch(featureActions.getFeatureVideo(playlist)),
  onHandleBanner: id => dispatch(featureActions.getFeatureBanner(id)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Feature)

import React, { Component } from 'react'
import { connect } from 'react-redux'

import LazyLoad from '@components/common/Lazyload'
import Carousel from '@components/carousel'
import PlaylistCard from '@components/playlist-card'
import VideoCard from '@components/video-card'

import featureActions from '@actions/feature'

import { getContentTypeName } from '@source/lib/globalUtil'

import Placeholder from './placeholder'
import { contentTypeList, banners } from './const'

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
    const { playlists } = this.props.feature
    if (window) {
      this.updateWindowDimensions()
      if (playlists.meta.status !== 'success') {
        const id = this.props.id || window.location.pathname.replace('/', '')

        this.props.onHandlePlaylist(id)
        window.addEventListener('resize', this.updateWindowDimensions)
      }
    }
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions)
  }

  componentDidUpdate() {
    const { playlists, videos } = this.props.feature
    if (videos.meta.status !== 'success' && playlists.data.length > 0) {
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
      { feature: { playlists, videos } } = this.props

    return (
      <>
        {playlists.meta.status === 'loading' && <Placeholder isMobile={isMobile} />}
        {playlists.meta.status === 'success' && (
          <>
            <Carousel refs={carouselRefs} wrap={banners.length === 1 ? false : true} autoplay={false} sliderCoin={true} dragging={true} slidesToShow={2} transitionMode={'scroll3d'}>
              {banners.map(obj => (
                <PlaylistCard
                  transitionMode={'scroll3d'}
                  key={obj.id}
                  onClick={() => (window.location.href = obj.link)}
                  alt={obj.attributes.name}
                  src={obj.attributes.imageUrl}
                  // onLoad={this.updateOnImageLoad}
                  containerClassName={bannerContainer}
                />
              ))}
            </Carousel>
            <LazyLoad containerClassName={container}>
              {playlists.meta.status === 'success' &&
                videos.meta.status === 'success' &&
                playlists.data.length > 0 &&
                videos.data.length > 0 &&
                playlists.data.length === videos.data.length &&
                videos.data.map((video, carouselIndex) => {
                  const contentTypeName = getContentTypeName(_.get(playlists, `data[${carouselIndex}].attributes.contentType`, ''))

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
                                  src={obj.background.landscape}
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
})

export default connect(mapStateToProps, mapDispatchToProps)(Feature)

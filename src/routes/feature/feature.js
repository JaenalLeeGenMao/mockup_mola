import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Helmet } from 'react-helmet'
import _ from 'lodash'

import Header from '@components/Header'
import LazyLoad from '@components/common/Lazyload'
import FeatureError from '@components/common/error'
import Carousel from '@components/carousel'
import PlaylistCard from '@components/playlist-card'
import ArticleCard from '@components/article-card'
import ArticleCardNew from '@components/article-card/articleCardNew'
import VideoCard from '@components/video-card'

import ArticlesCard from '../articles/articleCard/articleCard'

import featureActions from '@actions/feature'

import { getErrorCode } from '@routes/home/util'

import history from '@source/history'
import { getContentTypeName } from '@source/lib/globalUtil'
import { formatDateTime, isToday, isTomorrow, isMatchPassed, isMatchLive } from '@source/lib/dateTimeUtil'

import Placeholder from './placeholder'
import { BannerPlaceholder } from './placeholder/banner-placeholder'
import VideoPlaceholder from './placeholder/videoPlaceholder'
import { contentTypeList, banners as dummyDataBanners } from './const'

import { container, bannerContainer, carouselHeader } from './style'

let trackedPlaylistIds = [] /** tracked the playlist/videos id both similar */
class Feature extends Component {
  constructor(props) {
    super(props)
    this.state = {
      viewportWidth: this.props.isMobile ? 0 : 1200,
    }
  }

  componentDidMount() {
    if (window) {
      this.updateWindowDimensions()

      const id = this.props.id || _.get(pathname.split('/'), '[2]', '')
      // this.props.onHandleResetVideo()
      this.props.onHandlePlaylist(id)
      this.props.onHandleBanner(id)
      this.props.onHandleArticle(id)

      window.addEventListener('resize', this.updateWindowDimensions)
    }
  }

  componentWillUnmount() {
    trackedPlaylistIds = []
    window.removeEventListener('resize', this.updateWindowDimensions)
  }

  componentDidUpdate() {
    const { id = _.get(pathname.split('/'), '[2]', '') } = this.props

    try {
      setTimeout(() => {
        if (!this.props.feature[id]) {
          // if (playlists.meta.id && id !== playlists.meta.id) {
          // this.props.onHandleResetVideo()
          this.props.onHandlePlaylist(id)
          this.props.onHandleBanner(id)
          this.props.onHandleArticle(id)

          trackedPlaylistIds = []
          // }
        } else {
          const { playlists, videos } = this.props.feature[id]
          if (
            playlists.meta.status === 'success' &&
            playlists.data.length > 0 &&
            videos.data.length < playlists.data.length
          ) {
            playlists.data.map((playlist, playlistIndex) => {
              if (trackedPlaylistIds.indexOf(playlist.id) === -1) {
                trackedPlaylistIds.push(playlist.id)
                this.props.onHandleVideo({ id, playlist, index: playlistIndex })
              }
            })
          }
        }
      }, 2000)
    } catch (e) {
      console.log(e)
    }
  }

  updateWindowDimensions = () => {
    this.setState({ viewportWidth: window.innerWidth })
  }

  handleOnClick = video => {
    const obj = {
      articles: () => `/articles/${video.id}`,
      banners: () => video.link,
      playlists: () => `/categories/${video.id}`,
      videos: () => {
        const videoTypesRedirectUri = {
          linear: `/channels/${video.id}`,
          default: `/watch?v=${video.id}`,
        }

        const contentTypeName = getContentTypeName(_.get(video, 'contentType', 'default'))

        return videoTypesRedirectUri[contentTypeName] || videoTypesRedirectUri.default
      },
    }

    if (video) {
      /** only execute when a video object exist */
      if (video.type == 'banners') {
        window.location.href = obj[video.type]()
      } else {
        history.push(obj[video.type]())
      }
    } else {
      alert(`Mola does NOT recognized this link \n${JSON.stringify(video)}`)
    }
  }

  /* Dynamically re-adjust carousel */
  // updateOnImageLoad = () => {
  //   const { carouselRefs } = this.state
  //   if (carouselRefs.length > 0) {
  //     carouselRefs.map(ref => {
  //       if (ref && ref.onResize) {
  //         ref.onResize()
  //       }
  //     })
  //   }
  // }

  render() {
    const isMobile = this.state.viewportWidth <= 960,
      id = this.props.id || _.get(pathname.split('/'), '[2]', '')
    if (this.props.feature[id]) {
      const { playlists, videos, banners, articles } = this.props.feature[id]
      // const { articles } = this.props.feature['featured']
      const isLoading = playlists.meta.status === 'loading',
        isError = playlists.meta.status === 'error',
        isSuccess = playlists.meta.status === 'success'

      let errorObj = { code: 0, description: '' }
      if (playlists.meta.error) {
        errorObj = { code: getErrorCode(playlists.meta.error), description: 'Playlist request failed' }
      } else if (banners.meta.error) {
        errorObj = { code: getErrorCode(banners.meta.error), description: 'Banner request failed' }
      } else if (videos.meta.error) {
        errorObj = { code: getErrorCode(videos.meta.error), description: 'Video request failed' }
      } else if (articles.meta.error) {
        errorObj = { code: getErrorCode(articles.meta.error), description: 'Article request failed' }
      }

      return (
        <>
          <Helmet>
            <title>{playlists.meta.title}</title>
          </Helmet>
          <Header libraryOff color={false} {...this.props} isMobile={isMobile} activeMenuId={playlists.meta.menuId} />
          {isLoading && <Placeholder isMobile={isMobile} />}
          {isError && (
            <FeatureError
              status={errorObj.code}
              message={
                errorObj.description ||
                'Something went wrong, if the problem persist please try clear your browser cache'
              }
            />
          )}
          <div style={{ height: '8vh' }} />
          {isSuccess && (
            <>
              {banners.meta.status !== 'success' && <BannerPlaceholder isMobile={isMobile} data={dummyDataBanners} />}
              {banners.data.length > 0 && (
                <Carousel
                  wrap={banners.length === 1 ? false : true}
                  autoplay={false}
                  sliderCoin={true}
                  dragging={true}
                  slidesToShow={isMobile ? 1.25 : 2.25}
                  transitionMode={'scroll3d'}
                  withoutControls={
                    banners.data.length < 3 || banners.data.length < contentTypeList['banners'].slideToShow
                  }
                  framePadding="0rem"
                >
                  {banners.data.map(obj => (
                    <PlaylistCard
                      transitionMode={'scroll3d'}
                      key={obj.id}
                      onClick={() => this.handleOnClick(obj)}
                      alt={obj.title}
                      src={`${obj.background.landscape}?w=1080`}
                      // onLoad={this.updateOnImageLoad}
                      containerClassName={bannerContainer}
                    />
                  ))}
                </Carousel>
              )}
              {videos.meta.status == 'loading' && <VideoPlaceholder isMobile={isMobile} />}
              <LazyLoad containerClassName={container}>
                {playlists.data.length > 0 &&
                  videos.data.length > 0 &&
                  playlists.data.length === videos.data.length &&
                  videos.data.map((video, carouselIndex) => {
                    const contentTypeName = getContentTypeName(
                      _.get(playlists, `data[${carouselIndex}].contentType`, '')
                    ),
                      playlistId = _.get(playlists, `data[${carouselIndex}].id`, ''),
                      viewMorePlaylistId = _.get(playlists, `data[${carouselIndex}].viewMorePlaylistId`, ''),
                      slideToShow = isMobile
                        ? contentTypeList[contentTypeName].slideToScroll
                        : contentTypeList[contentTypeName].slideToShow,
                      viewAllHide = contentTypeName === 'mola-featured' || contentTypeName === 'mola-categories'

                    return (
                      <div key={carouselIndex} style={{ margin: '0 0 1rem 0' }}>
                        <div className={carouselHeader}>
                          {video.data.length > 0 && <h3>{video.meta.title}</h3>}
                          {!viewAllHide &&
                            video.data.length > slideToShow && (
                              <a href={`/categories/${viewMorePlaylistId || playlistId}`}>View More</a>
                            )}
                        </div>
                        <Carousel
                          wrap={false}
                          autoplay={false}
                          sliderCoin={true}
                          dragging={true}
                          withoutControls={video.data.length < contentTypeList[contentTypeName].slideToShow}
                          slidesToShow={
                            isMobile
                              ? contentTypeList[contentTypeName].slideToScroll
                              : contentTypeList[contentTypeName].slideToShow
                          }
                          slidesToScroll={Math.trunc(slideToShow)}
                          transitionMode={'scroll'}
                          framePadding={!isMobile ? '0rem' : '0rem 0rem 0rem 5px'}
                        >
                          {video.data.length > 0 &&
                            video.data.map(obj => {
                              const videoCTN = getContentTypeName(_.get(obj, 'contentType', '')),
                                isMatch = videoCTN === 'live' || videoCTN === 'replay',
                                matchLive =
                                  isMatch &&
                                  isMatchLive(
                                    obj.startTime,
                                    obj.endTime
                                  ) /** id 4 is replay matches, 3 is live matches */
                              if (contentTypeName === 'movie' || contentTypeName === 'vod') {
                                return (
                                  <VideoCard
                                    key={obj.id}
                                    alt={obj.title}
                                    description={obj.title}
                                    src={
                                      obj.type === 'playlists'
                                        ? `${obj.images.cover.portrait}?w=540`
                                        : `${obj.background.portrait}?w=540`
                                    }
                                    // onLoad={this.updateOnImageLoad}
                                    onClick={() => this.handleOnClick(obj)}
                                  />
                                )
                              } else {
                                return (
                                  <PlaylistCard
                                    key={obj.id}
                                    alt={obj.title}
                                    description={obj.title}
                                    contentType={isMatch ? (matchLive ? obj.contentType : 4) : obj.contentType}
                                    src={
                                      obj.type === 'playlists'
                                        ? `${obj.images.cover.landscape}?w=720`
                                        : `${obj.background.landscape}?w=720`
                                    }
                                    // onLoad={this.updateOnImageLoad}
                                    onClick={() => this.handleOnClick(obj)}
                                  />
                                )
                              }
                            })}
                        </Carousel>
                        {carouselIndex === 1 &&
                          articles.data.length > 0 && (
                            <div className={container} style={{ margin: 0 }}>
                              <h3 className="article-section-text">ARTICLES</h3>
                              <Carousel
                                wrap={articles.length === 1 ? false : true}
                                autoplay={false}
                                sliderCoin={true}
                                dragging={true}
                                slidesToShow={isMobile ? 1 : 3.5}
                                slidesToScroll={Math.trunc(contentTypeList['articles'].slideToShow)}
                                transitionMode={'scroll'}
                                withoutControls={articles.data.length < contentTypeList['articles'].slideToShow}
                                framePadding={!isMobile ? '0rem' : '0rem 5px'}
                              >
                                {articles.data.map(obj => (
                                  <ArticleCardNew data={obj} key={obj.id} isMobile={this.props.isMobile} />
                                  // <ArticleCard
                                  //   key={obj.id}
                                  //   onClick={() => this.handleOnClick(obj)}
                                  //   alt={obj.title}
                                  //   src={`${obj.imageUrl}`}
                                  //   title={obj.title}
                                  //   contentType={obj.type}
                                  //   createdAt={obj.createdAt}
                                  //   description={obj.imageCaption}
                                  // // onLoad={this.updateOnImageLoad}
                                  // // containerClassName={bannerContainer}
                                  // />
                                ))}
                              </Carousel>
                            </div>
                          )}
                      </div>
                    )
                  })}
              </LazyLoad>
            </>
          )}
        </>
      )
    } else {
      return (
        <>
          <Header libraryOff color={false} {...this.props} isMobile={isMobile} />
          <Placeholder isMobile={isMobile} />
        </>
      )
    }
  }
}

const mapStateToProps = state => {
  return {
    ...state,
  }
}

const mapDispatchToProps = dispatch => ({
  onHandlePlaylist: id => dispatch(featureActions.getFeaturePlaylist(id)),
  onHandleVideo: ({ id, playlist, index }) => dispatch(featureActions.getFeatureVideo({ id, playlist, index })),
  onHandleBanner: id => dispatch(featureActions.getFeatureBanner(id)),
  onHandleArticle: id => dispatch(featureActions.getFeatureArticle(id)),
  onHandleResetVideo: () => dispatch(featureActions.resetFeatureVideos()),
})

export default connect(mapStateToProps, mapDispatchToProps)(Feature)

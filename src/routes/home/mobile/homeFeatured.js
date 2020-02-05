import React, { Component } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import withStyles from 'isomorphic-style-loader/lib/withStyles'

import homeActions from '@actions/home'
import { getContentTypeName } from '@source/lib/globalUtil'
import { isMatchLive, isMatchPassed } from '@source/lib/dateTimeUtil'
import history from '@source/history'

import LazyLoad from '@components/common/Lazyload'
import Carousel from '@components/carousel'
import PlaylistCard from '@components/playlist-card'
import VideoCard from '@components/video-card'
import Header from '@components/Header'
import HomeError from '@components/common/error'
import ListMenu from '@components/listMenu'

import { getLocale } from '@routes/home/locale'
import { getErrorCode } from '@routes/home/util'

import HomePlaceholder from './placeholder'
import { contentTypeList } from './const'
import styles from './homeFeatured.css'

export class homeFeatured extends Component {
  state = {
    squareBanners: null,
    filteredVideos: [],
  }
  componentDidMount() {
    const { onHandlePlaylist } = this.props
    onHandlePlaylist().then(() => {
      const { home: { playlists }, onHandleVideo } = this.props
      playlists.data.map(async playlist => {
        await onHandleVideo(playlist)
      })
    })
  }

  componentDidUpdate() {
    const { playlists, videos } = this.props.home
    const { squareBanners } = this.state
    if (videos.meta.status === 'success' && !squareBanners) {
      const getBanner = videos.data.filter(video => video.meta.id === 'web-featured')
      const filteredVideos = videos.data.filter(video => video.meta.id !== 'web-featured')

      this.setState({
        filteredVideos: filteredVideos && filteredVideos.length > 0 ? filteredVideos : [],
        squareBanners: getBanner && getBanner.length > 0 ? getBanner[0] : null,
      })
    }
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

  render() {
    const { home: { playlists, videos }, isMobile } = this.props,
      { squareBanners, filteredVideos } = this.state

    const isPlaylistsLoading = playlists.meta.status === 'loading',
      isPlaylistsError = playlists.meta.status === 'error',
      isPlaylistsSuccess = playlists.meta.status === 'success'

    const isVideosLoading = videos.meta.status === 'loading',
      isVideosError = videos.meta.status === 'error',
      isVideosSuccess = videos.meta.status === 'success'

    const isBannerSuccess = squareBanners && squareBanners.meta.status === 'success' && squareBanners.data.length > 0

    const playlistError = playlists.meta.error ? playlists.meta.error : '',
      playlistErrorCode = getErrorCode(playlistError)

    return (
      <>
        <Header libraryOff color={false} {...this.props} isMobile={isMobile} activeMenuId="Featured" />
        <ListMenu {...this.props} isMobile={isMobile} />
        {isPlaylistsLoading || (isVideosLoading && <HomePlaceholder />)}
        {isPlaylistsError && (
          <HomeError status={playlistErrorCode} message={playlistError || 'Mola TV playlist is not loaded'} />
        )}
        <div style={{ height: '12vh' }} />
        {isPlaylistsSuccess &&
          isVideosSuccess && (
            <>
              {isBannerSuccess && (
                /* START SQUARE BANNERS */
                <Carousel
                  wrap={squareBanners.data.length === 1 ? false : true}
                  autoplay={false}
                  sliderCoin={true}
                  dragging={true}
                  slidesToShow={1}
                  zoomScale={1}
                  transitionMode={'scroll'}
                  withoutControls={squareBanners.data.length < 2}
                  cellSpacing={0}
                  framePadding="0rem"
                  bannerSquare
                >
                  {squareBanners.data.map(obj => (
                    <PlaylistCard
                      transitionMode={'scroll'}
                      key={obj.id}
                      onClick={() => this.handleOnClick(obj)}
                      src={`${obj.background.landscape}?w=900`}
                      containerClassName={styles.banner__square__container}
                      bannerCard
                    />
                  ))}
                </Carousel>
                /* END SQUARE BANNERS */
              )}
              <LazyLoad containerClassName={styles.container__card}>
                {playlists.data.length > 0 &&
                  videos.data.length > 0 &&
                  playlists.data.length === videos.data.length &&
                  videos.data.map((video, carouselIndex) => {
                    if (video.meta.id !== 'web-featured') {
                      const contentTypeName = getContentTypeName(
                          _.get(video, `data[${carouselIndex}].contentType`, '')
                        ),
                        playlistId = _.get(playlists, `data[${carouselIndex}].id`, ''),
                        slideToShow = contentTypeList[contentTypeName].slideToScroll,
                        viewAllHide = contentTypeName === 'mola-featured' || contentTypeName === 'mola-categories'

                      //for now only
                      let catalogId = ''
                      let catalogTitle = ''
                      if (playlistId == 'mola1-fea') {
                        catalogId = 'epl'
                        catalogTitle = 'Premier League'
                      } else if (playlistId == 'mola2-fea') {
                        catalogId = 'sports'
                        catalogTitle = 'Sports'
                      } else if (playlistId == 'mola3-fea') {
                        catalogId = 'movies'
                        catalogTitle = 'Movies'
                      } else if (playlistId == 'mola4-fea') {
                        catalogId = 'kids'
                        catalogTitle = 'Kids'
                      }

                      return (
                        <div key={carouselIndex} style={{ margin: '0 0 1rem 0' }}>
                          <div className={styles.carousel__header}>
                            {video.data.length > 0 && <h3 className={styles.catalog__title}>{catalogTitle}</h3>}
                            {!viewAllHide &&
                              video.data.length > slideToShow && <a href={`/libraries/${catalogId}`}>View More</a>}
                          </div>
                          <Carousel
                            wrap={false}
                            autoplay={false}
                            sliderCoin={true}
                            dragging={true}
                            withoutControls={video.data.length < contentTypeList[contentTypeName].slideToShow}
                            slidesToShow={contentTypeList[contentTypeName].slideToScroll}
                            slidesToScroll={Math.trunc(slideToShow)}
                            transitionMode={'scroll'}
                            cellSpacing={8}
                            framePadding={'0rem 0rem 0rem 5px'}
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
                                      data={obj}
                                      // onLoad={this.updateOnImageLoad}
                                      onClick={() => this.handleOnClick(obj)}
                                    />
                                  )
                                }
                              })}
                          </Carousel>
                        </div>
                      )
                    }
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
  onHandlePlaylist: () => dispatch(homeActions.getHomePlaylist()),
  onHandleVideo: playlist => dispatch(homeActions.getHomeVideo(playlist, true)),
  onUpdatePlaylist: id => dispatch(homeActions.updateActivePlaylist(id)),
})

export default compose(withStyles(styles), connect(mapStateToProps, mapDispatchToProps))(homeFeatured)

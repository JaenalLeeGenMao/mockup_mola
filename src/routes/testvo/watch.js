import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Helmet } from 'react-helmet'
import { getVUID } from '@actions/vuid'
import * as movieDetailActions from '@actions/movie-detail'
import recommendationActions from '@actions/recommendation'
// import styles from './watch.css'

import DRMConfig from '@source/lib/DRMConfig'
import { updateCustomMeta } from '@source/DOMUtils'
import PlatformCheckMobile from '@components/PlatformCheckMobile'
import MovieDetailError from '@components/common/error'
import { notificationBarBackground, logoLandscapeBlue } from '@global/imageUrl'

import WatchDesktop from './desktop'
import WatchMobile from './mobile'
import iconRed from './assets/merah.png'
import iconGreen from './assets/hijau.png'
import Placeholder from './desktop/placeholder'
import PlaceholderMobile from './mobile/placeholder'

class Watch extends Component {
  state = {
    iconStatus: [],
    name: '',
    imageUrl: [],
    block: false,
    iconGreen,
    status: [],
    isHeader: false,
  }

  componentDidMount() {
    const { getMovieDetail, getRecommendation, videoId, getVUID, user } = this.props

    getMovieDetail(videoId)
    getRecommendation(videoId)
    const deviceId = user.uid ? user.uid : DRMConfig.getOrCreateDeviceId()
    getVUID(deviceId)
  }

  componentDidUpdate(prevProps) {
    const { getMovieDetail, movieDetail, videoId, recommendation, getRecommendation } = this.props
    const { status } = this.state

    if (movieDetail.meta.status === 'success' && movieDetail.data[0].id != videoId) {
      // this.getLoc()
      getMovieDetail(videoId)
    }

    if (recommendation.meta.status === 'success' && recommendation.data[0].id == videoId) {
      getRecommendation(videoId)
    }

    if (prevProps.movieDetail.data.length == 0 && movieDetail.data.length !== prevProps.movieDetail.data.length) {
      if (window) {
        if (window.debugStore) {
          window.debugStore.movieDetail = this.props.movieDetail
        }
      }
      const dataFetch = movieDetail.data[0]

      const filterForBlockFind = dataFetch.platforms.find(dt => dt.id === 1 && dt.status === 1)

      if (filterForBlockFind) {
        this.setState({ block: false })
      } else {
        const filterForBlock = dataFetch.platforms
        const isBlocked = filterForBlock.length > 0
        let stat = []
        let state = []
        let img = []
        let st = status

        if (isBlocked) {
          filterForBlock.forEach(dt => {
            st.push(dt.status)
            if (dt.status === 1) {
              stat.push(iconGreen)
            } else {
              stat.push(iconRed)
            }

            state.push(dt.name)
            img.push(dt.imageUrl)
          })
        }
        this.setState({
          isHeader: true,
          name: state,
          imageUrl: img,
          status: st,
          block: true,
          iconStatus: stat,
        })
      }
    }
    this.updateMetaTag()
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

  componentWillUnmount() {
    updateCustomMeta('og:title', 'Mola TV')
    updateCustomMeta('og:image', logoLandscapeBlue)
    updateCustomMeta(
      'og:description',
      'Watch TV Shows Online, Watch Movies Online or stream right to your smart TV, PC, Mac, mobile, tablet and more.'
    )
    updateCustomMeta('og:url', window.location.href || 'https://mola.tv/')
  }

  render() {
    const { isMobile, vuid, videoId, getMovieDetail, isAutoPlay, recommendation } = this.props
    const { block, isHeader } = this.state
    const { meta: { status, error }, data } = this.props.movieDetail
    const apiFetched = status === 'success' && data.length > 0
    const dataFetched = apiFetched ? data[0] : undefined

    return (
      <>
        {status === 'loading' && !isMobile && <> {<Placeholder />} </>}
        {status === 'loading' && isMobile && <> {<PlaceholderMobile />} </>}
        {isMobile &&
          block && (
            <PlatformCheckMobile
              dataFetched={apiFetched ? data[0] : ''}
              iconStatus={this.state.iconStatus}
              status={this.state.status}
              icon={this.state.imageUrl}
              name={this.state.name}
              title={apiFetched ? dataFetched.title : ''}
              portraitPoster={apiFetched ? dataFetched.background.landscape : ''}
              user={this.props.user}
              videoId={this.props.videoId}
              isHeader={isHeader}
            />
          )}

        {!isMobile &&
          dataFetched &&
          block && (
            <>
              <Helmet>
                <title>{dataFetched.title}</title>
              </Helmet>
              <WatchDesktop
                blocked={block}
                videoId={videoId}
                movieDetail={this.props.movieDetail}
                getMovieDetail={getMovieDetail}
                recommendation={recommendation}
                vuid={vuid}
                iconStatus={this.state.iconStatus}
                status={this.state.status}
                icon={this.state.imageUrl}
                name={this.state.name}
                title={apiFetched ? dataFetched.title : ''}
                isAutoPlay={isAutoPlay}
                portraitPoster={apiFetched ? dataFetched.background.landscape : ''}
              />
            </>
          )}

        {dataFetched &&
          !block && (
            <>
              <Helmet>
                <title>{dataFetched.title}</title>
              </Helmet>
              {isMobile && (
                <WatchMobile
                  videoId={videoId}
                  movieDetail={this.props.movieDetail}
                  getMovieDetail={getMovieDetail}
                  vuid={vuid}
                  isAutoPlay={isAutoPlay}
                />
              )}
              {!isMobile && (
                <WatchDesktop
                  blocked={block}
                  videoId={videoId}
                  movieDetail={this.props.movieDetail}
                  getMovieDetail={getMovieDetail}
                  recommendation={recommendation}
                  vuid={vuid}
                  isAutoPlay={isAutoPlay}
                />
              )}
            </>
          )}
        {status === 'error' && <MovieDetailError message={error} />}
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
  getMovieDetail: videoId => dispatch(movieDetailActions.getMovieDetail(videoId)),
  getRecommendation: videoId => dispatch(recommendationActions.getRecommendation(videoId)),
  getVUID: deviceId => dispatch(getVUID(deviceId)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Watch)
// export default compose(withStyles(styles), connect(mapStateToProps, mapDispatchToProps))(Watch)

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Helmet } from 'react-helmet'
import { getVUID } from '@actions/vuid'
import * as movieDetailActions from '@actions/movie-detail'
import { getContentTypeName } from '@source/lib/globalUtil'
import recommendationActions from '@actions/recommendation'
// import styles from './watch.css'

import DRMConfig from '@source/lib/DRMConfig'
import { updateCustomMeta } from '@source/DOMUtils'
import MovieDetailError from '@components/common/error'
import CoronaPage from '@components/CoronaPage'
import { notificationBarBackground, logoLandscapeBlue } from '@global/imageUrl'

import WatchDesktop from './desktop'
// import WatchMobile from './mobile'

import Placeholder from './desktop/placeholder'
import PlaceholderMobile from './mobile/placeholder'
import Mola from '../../api/mola'

class Watch extends Component {
  state = {
    iconStatus: [],
    name: '',
    imageUrl: [],
    block: false,
    status: [],
    isHeader: false,
    isMatchPassed: false,
  }

  componentDidMount() {
    const { getMovieDetail, getRecommendation, videoId, getVUID, user } = this.props
    this.intervalCheckMatch = setInterval(() => {
      this.checkMatches()
    }, 50000) // check match endtime every 5 minutes
    getMovieDetail(videoId)
    getRecommendation(videoId)
    const deviceId = user.uid ? user.uid : DRMConfig.getOrCreateDeviceId()
    getVUID(deviceId)
  }

  componentDidUpdate(prevProps) {
    const { getMovieDetail, movieDetail, videoId, recommendation, getRecommendation, configParams } = this.props
    const { status } = this.state
    if (movieDetail.meta.status === 'success' && movieDetail.data[0].id != videoId) {
      // this.getLoc()
      getMovieDetail(videoId)
      getRecommendation(videoId)
    }

    if (prevProps.movieDetail.data.length == 0 && movieDetail.data.length !== prevProps.movieDetail.data.length) {
      if (window) {
        if (window.debugStore) {
          window.debugStore.movieDetail = this.props.movieDetail
        }
      }
      if (configParams && configParams.data && configParams.data.akamai_analytic_enabled) {
        // setAkamaiMediaAnalyticsData('title', movieDetail.data[0].title)
      }
      const dataFetch = movieDetail.data[0]

      const filterForBlockFind = dataFetch.platforms.find(dt => dt.id === 1 && dt.status === 1)

      if (filterForBlockFind) {
        this.setState({ block: false })
      } else {
        this.setState({
          isHeader: true,
          block: true,
        })
      }
    }
    this.updateMetaTag()
  }

  checkMatches() {
    Mola.getMovieDetail({ id: this.props.videoId }).then(async result => {
      const data = result.data[0]
      const endTime = data.endTime
      if (getContentTypeName(data.contentType) !== 'live') {
        clearInterval(this.intervalCheckMatch)
      } else {
        if (endTime && endTime < Date.now() / 1000) {
          this.setState({
            isMatchPassed: true,
          })
          clearInterval(this.intervalCheckMatch)
        }
      }
    })
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
      'Watch TV Shows Online, Watch Movies Online or stream right to your smart TV, PC, Mac, mobile, tablet and more.',
    )
    updateCustomMeta('og:url', window.location.href || 'https://mola.tv/')
    if (this.intervalCheckMatch) {
      clearInterval(this.intervalCheckMatch)
    }
  }

  render() {
    const { isMobile, vuid, videoId, getMovieDetail, isAutoPlay, recommendation } = this.props
    const { block, isHeader } = this.state
    const {
      meta: { status, error },
      data,
    } = this.props.movieDetail
    const apiFetched = status === 'success' && data.length > 0
    const dataFetched = apiFetched ? data[0] : undefined

    return (
      <>
        {status === 'loading' && !isMobile && <> {<Placeholder />} </>}
        {status === 'loading' && isMobile && <> {<PlaceholderMobile />} </>}

        {!isMobile && dataFetched && (
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
              title={apiFetched ? dataFetched.title : ''}
              isAutoPlay={isAutoPlay}
              portraitPoster={apiFetched ? dataFetched.background.landscape : ''}
              isMatchPassed={this.state.isMatchPassed}
            />
          </>
        )}

        {dataFetched && isMobile && (
          <>
            <Helmet>
              <title>{dataFetched.title}</title>
            </Helmet>
            <CoronaPage isMobile />
            {/* <WatchMobile
                blocked={block}
                videoId={videoId}
                movieDetail={this.props.movieDetail}
                getMovieDetail={getMovieDetail}
                vuid={vuid}
                isAutoPlay={isAutoPlay}
                isMatchPassed={this.state.isMatchPassed}
              /> */}
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

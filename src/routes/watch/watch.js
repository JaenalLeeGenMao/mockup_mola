import React, { Component } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import { Helmet } from 'react-helmet'
import { getVUID } from '@actions/vuid'
import * as movieDetailActions from '@actions/movie-detail'
// import styles from './watch.css'

import DRMConfig from '@source/lib/DRMConfig'
import { updateCustomMeta } from '@source/DOMUtils'

import { notificationBarBackground, logoLandscapeBlue } from '@global/imageUrl'

import WatchDesktop from './desktop'

class Watch extends Component {
  componentDidMount() {
    const { getMovieDetail, videoId, getVUID, user } = this.props

    getMovieDetail(videoId)
    const deviceId = user.uid ? user.uid : DRMConfig.getOrCreateDeviceId()
    getVUID(deviceId)
  }

  componentDidUpdate() {
    const { getMovieDetail, movieDetail, videoId } = this.props

    if (movieDetail.meta.status === 'success' && movieDetail.data[0].id != videoId) {
      // this.getLoc()
      getMovieDetail(movieId)
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
    updateCustomMeta('og:description', 'Watch TV Shows Online, Watch Movies Online or stream right to your smart TV, PC, Mac, mobile, tablet and more.')
    updateCustomMeta('og:url', window.location.href || 'https://mola.tv/')
  }

  render() {
    const { isMobile, vuid } = this.props
    const { meta: { status, error }, data } = this.props.movieDetail
    const apiFetched = status === 'success' && data.length > 0
    const dataFetched = apiFetched ? data[0] : undefined

    return (
      <>
        {dataFetched && (
          <>
            <Helmet>
              <title>{dataFetched.title}</title>
            </Helmet>
            {isMobile && <>Watch Mobile dengan 1 component untuk base designnya</>}
            {!isMobile && <WatchDesktop movieDetail={this.props.movieDetail} vuid={vuid} />}
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
  getMovieDetail: videoId => dispatch(movieDetailActions.getMovieDetail(videoId)),
  getVUID: deviceId => dispatch(getVUID(deviceId)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Watch)
// export default compose(withStyles(styles), connect(mapStateToProps, mapDispatchToProps))(Watch)

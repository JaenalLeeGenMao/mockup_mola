/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import withStyles from 'isomorphic-style-loader/lib/withStyles'

import recommendationActions from '@actions/recommendation'

import { getComponent } from '@supersoccer/gandalf'
// import { getComponent } from '../../../../gandalf'
import LazyLoad from '@components/common/Lazyload'
import Link from '@components/Link'
import HomeError from '@components/common/error'
import styles from './not-found.css'
import { unavailableImg } from '@global/imageUrl'

const RelatedVideos = ({ style = {}, containerClassName = '', className = '', detailClassName = '', videos = [] }) => {
  const VideoThumbnail = getComponent('video-thumbnail')
  return (
    <div className={containerClassName} style={style}>
      {videos.map(({ id, background }) => {
        const imageSource = background.landscape || unavailableImg
        return (
          <Link to={`/watch?v=${id}`} key={id} className={className}>
            <VideoThumbnail thumbnailUrl={imageSource} thumbnailPosition="wrap" className={detailClassName}>
              <div className={styles.play_button} />
            </VideoThumbnail>
          </Link>
        )
      })}
    </div>
  )
}

class NotFound extends React.Component {
  componentWillMount() {
    const { recommendation: { meta, data }, fetchRecommendation } = this.props
    if (meta.status === 'loading') {
      fetchRecommendation()
    }
  }

  render() {
    return (
      <Fragment>
        <HomeError status={400} message={'Sorry, the page you were trying to view does not exist.'} />
        {this.props.recommendation.meta.status === 'success' && (
          <LazyLoad>
            {/* <RelatedVideos videos={this.props.recommendation.data} containerClassName={styles.video_container} className={styles.video_wrapper} detailClassName={styles.video_detail_wrapper} /> */}
          </LazyLoad>
        )}
      </Fragment>
    )
  }
}

const mapStateToProps = state => {
  return {
    ...state,
  }
}

const mapDispatchToProps = dispatch => ({
  fetchRecommendation: () => dispatch(recommendationActions.getRecommendation()),
})

export default compose(withStyles(styles), connect(mapStateToProps, mapDispatchToProps))(NotFound)

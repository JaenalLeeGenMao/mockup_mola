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

import notFoundActions from '@actions/not-found'

import { getComponent } from '@supersoccer/gandalf'
import LazyLoad from '@components/common/Lazyload'
import Link from '@components/Link'
import HomeError from '@components/common/error'
import styles from './not-found.css'

const RelatedVideos = ({ style = {}, className = '', videos = [] }) => {
  const VideoThumbnail = getComponent('video-thumbnail')
  return (
    <div className={`${className} ${styles.video_container}`} style={style}>
      {videos.map(({ id, background }) => {
        const imageSource = background.desktop.landscape || require('@global/style/icons/unavailable-image.png')
        return (
          <Link to={`/movie-detail/${id}`} key={id} className={styles.video_wrapper}>
            <VideoThumbnail thumbnailUrl={imageSource} thumbnailPosition="wrap" />
          </Link>
        )
      })}
    </div>
  )
}

class NotFound extends React.Component {
  componentWillMount() {
    const { notFound: { meta, data }, onHandleHotPlaylist } = this.props
    if (meta.status === 'loading') {
      onHandleHotPlaylist()
    }
  }

  render() {
    return (
      <Fragment>
        <HomeError status={400} message={'Sorry, the page you were trying to view does not exist.'} />
        {this.props.notFound.meta.status === 'success' && (
          <LazyLoad>
            <RelatedVideos videos={this.props.notFound.data} />
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
  onHandleHotPlaylist: () => dispatch(notFoundActions.getHotPlaylist()),
})

export default compose(withStyles(styles), connect(mapStateToProps, mapDispatchToProps))(NotFound)

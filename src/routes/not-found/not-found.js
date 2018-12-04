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
import HomeError from '@components/common/error'
import styles from './not-found.css'

const relatedVideos = (style = {}, className = '') => {
  const VideoThumbnail = getComponent('video-thumbnail')
  return (
    <div className={`${className} ${styles.video_container}`} style={style}>
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(data => {
        return (
          <div key={data} className={styles.video_wrapper}>
            <VideoThumbnail thumbnailUrl={require('@global/style/icons/unavailable-image.png')} thumbnailPosition="wrap" />
          </div>
        )
      })}
    </div>
  )
}

class NotFound extends React.Component {
  state = {
    playlists: null,
  }

  componentWillMount() {
    const { notFound: { meta, data }, onHandleHotPlaylist } = this.props
    if (meta.status === 'loading') {
      onHandleHotPlaylist()
    }
  }
  // static getDerivedStateFromProps(nextProps, prevState) {
  //   const { notFound: { meta, data }, onHandleHotPlaylist } = nextProps
  //   if (meta.status === 'loading' && !this.state.playlists) {
  //     onHandleHotPlaylist()
  //   }
  //   return prevState
  // }

  render() {
    return (
      <Fragment>
        <HomeError status={400} message={'Sorry, the page you were trying to view does not exist.'} />
        <LazyLoad>{relatedVideos()}</LazyLoad>
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

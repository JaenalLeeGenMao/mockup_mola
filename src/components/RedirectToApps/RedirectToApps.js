import React, { Component } from 'react'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
const { getComponent } = require('@supersoccer/gandalf')
const Theoplayer = getComponent('theoplayer')

import styles from './RedirectToApps.css'
class RedirectToApps extends Component {
  render() {
    const {
      android_redirect_to_app,
      ios_redirect_to_app,
      videoSettings,
      handleOnReadyStateChange,
      handlePlayMovie,
      handlePlayMovieApple,
      subtitles,
      poster,
      customTheoplayer,
      handleOnVideoVolumeChange,
    } = this.props
    const isApple = /iPad|iPhone|iPod/.test(navigator.userAgent)

    if (isApple) {
      //ios
      if (ios_redirect_to_app) {
        return (
          <div className={styles.poster__wrapper}>
            <img src={poster} />
            <span className={styles.play_icon} onClick={handlePlayMovieApple} />
          </div>
        )
      } else {
        return (
          <Theoplayer
            className={customTheoplayer}
            subtitles={subtitles}
            handleOnReadyStateChange={handleOnReadyStateChange}
            handleOnVideoVolumeChange={handleOnVideoVolumeChange}
            {...videoSettings}
          />
        )
      }
    } else {
      //android
      if (android_redirect_to_app) {
        return (
          <div className={styles.poster__wrapper}>
            <img src={poster} />
            <span className={styles.play_icon} onClick={handlePlayMovie} />
          </div>
        )
      } else {
        return (
          <Theoplayer
            className={customTheoplayer}
            subtitles={subtitles}
            handleOnReadyStateChange={handleOnReadyStateChange}
            handleOnVideoVolumeChange={handleOnVideoVolumeChange}
            {...videoSettings}
          />
        )
      }
    }
  }
}

export default withStyles(styles)(RedirectToApps)

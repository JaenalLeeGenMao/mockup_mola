import React, { Component } from 'react'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import VOPlayer from '@components/VOPlayer'

import styles from './RedirectToApps.css'
class RedirectToApps extends Component {
  render() {
    const {
      android_redirect_to_app,
      ios_redirect_to_app,
      videoSettings,
      handlePlayMovie,
      handlePlayMovieApple,
      subtitles,
      poster,
      children,
      errorLicense,
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
        if (!errorLicense) {
          return (
            <VOPlayer
              deviceId={vuid}
              autoPlay={false}
              subtitles={subtitles}
              {...videoSettings}
            ></VOPlayer>
          )
        } else {
          return (
            <div className={styles.error_license}>Error during license server request. Please refresh the browser.</div>
          )
        }
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
        if (!errorLicense) {
          return (
              <VOPlayer
                deviceId={vuid}
                autoPlay={false}
                subtitles={subtitles}
                {...videoSettings}
              >
                {children}
              </VOPlayer>
          )
        } else {
          return (
            <div className={styles.error_license}>Error during license server request. Please refresh the browser.</div>
          )
        }
      }
    }
  }
}

export default withStyles(styles)(RedirectToApps)

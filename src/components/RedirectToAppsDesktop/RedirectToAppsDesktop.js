import React, { Component } from 'react'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import { logoMolaBig, playStoreBadge, appStoreBadge } from '@global/imageUrl'
import _ from 'lodash'

import styles from './RedirectToAppsDesktop.css'
class RedirectToAppsDesktop extends Component {
  state = {
    isPlayButtonClicked: false,
  }

  handlePlayLogin = () => {
    this.setState({ isPlayButtonClicked: true })
  }

  renderFakeVideoPlayer(poster) {
    return (
      <div className={styles.posterWrapper}>
        <img style={{ height: '100%', width: '100%' }} src={poster} />
        <span className={styles.playIcon} onClick={this.handlePlayLogin} />
      </div>
    )
  }

  handleClickBadge = platform => {
    if (platform === 'android') {
      const url = _.get(this.props.configParams.data, 'store_url', 'https://www.mola.tv/not-found')
      window.open(url, '_blank')
    } else {
      const url = _.get(this.props.configParams.data, 'ios_store_url', 'https://www.mola.tv/not-found')
      window.open(url, '_blank')
    }
  }

  renderRedirect(poster) {
    return (
      <>
        <div className={styles.container} style={{ backgroundImage: `url(${poster})` }}>
          {!poster && (
            <div className={styles.player__container}>
              <div className={styles.img__wrapper}>
                <img src={logoMolaBig} />
              </div>
            </div>
          )}
          <div className={styles.gradient} />
          <div className={styles.detail__information}>
            <div className={styles.detail__desc}>
              <div className={styles.detail__desc__text}>Untuk dapat menyaksikan tayangan ini </div>
              <div className={styles.detail__desc__text}>anda dapat mengunduh aplikasi Mola TV melalui</div>
              <div className={styles.images__row}>
                <img
                  className={styles.image__badges}
                  src={playStoreBadge}
                  onClick={() => {
                    this.handleClickBadge('android')
                  }}
                />
                <img
                  className={styles.image__badges}
                  src={appStoreBadge}
                  onClick={() => {
                    this.handleClickBadge('ios')
                  }}
                />
              </div>
            </div>
          </div>
          <div />
        </div>
      </>
    )
  }

  render() {
    const { poster } = this.props

    return this.renderRedirect(poster)
  }
}

export default withStyles(styles)(RedirectToAppsDesktop)

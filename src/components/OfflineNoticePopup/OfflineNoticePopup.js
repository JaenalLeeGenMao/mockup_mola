import React, { Component } from 'react'
import withStyles from 'isomorphic-style-loader/lib/withStyles'

import s from './OfflineNoticePopup.css'

class OfflineNoticePopup extends Component {
  state = {
    playerHeight: 0,
    playerWidth: 0,
  }

  componentDidMount() {
    const playerSize = document.querySelector('.theo-player-wrapper')
    if (playerSize) {
      this.setState({
        playerHeight: playerSize.clientHeight,
        playerWidth: playerSize.clientWidth,
      })
    }
    window.addEventListener('resize', this.handleResize)
    this.loadFullscreenEvent()
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize)
  }

  handleFullScreen = () => {
    setTimeout(() => {
      const playerSize = document.querySelector('.theo-player-wrapper')
      if (playerSize) {
        this.setState({
          playerHeight: playerSize.clientHeight,
          playerWidth: playerSize.clientWidth,
        })
      }
    }, 300)
  }

  loadFullscreenEvent = () => {
    ;['', 'webkit', 'moz', 'ms'].forEach(prefix =>
      document.addEventListener(prefix + 'fullscreenchange', this.handleFullScreen, false)
    )
  }

  handleResize = () => {
    const playerSize = document.querySelector('.theo-player-wrapper')
    if (playerSize) {
      this.setState({
        playerHeight: playerSize.clientHeight,
        playerWidth: playerSize.clientWidth,
      })
    }
  }

  render() {
    const { playerWidth, playerHeight } = this.state
    const videoWidth = playerHeight ? Math.ceil(playerHeight * 16 / 9) + 1 : 0
    const setMargin = playerWidth > videoWidth && videoWidth !== 0 ? (playerWidth - videoWidth) / 2 : 0

    return (
      <div
        className={s.wrapper__detect__offline}
        style={{ width: `${videoWidth}px`, height: `${playerHeight}px`, margin: `0 ${setMargin}px` }}
      >
        You seem to be offline. Please check internet connection and reload this page.
      </div>
    )
  }
}

export default withStyles(s)(OfflineNoticePopup)

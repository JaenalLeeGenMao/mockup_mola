import React, { Component } from 'react'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import _get from 'lodash/get'

import styles from './player-header.css'

class PlayerHeader extends Component {
  state = {
    controllerHeight: 0,
    controllerWidth: 0,
    isFullscreen: false,
    isShow: false,
  }

  componentDidMount() {
    var controller = document.querySelector('.vjs-control-bar')
    if (controller) {
      this.setState({
        controllerHeight: controller.clientHeight,
        controllerWidth: controller.clientWidth,
      })
    }
    window.addEventListener('resize', this.handleResize)
    this.loadFullscreenEvent()
    this.loadSubtreeModifiedEvent()
  }

  loadSubtreeModifiedEvent = () => {
    const that = this
    const _playerElement = document.getElementById('video-player-root')
    _playerElement.addEventListener('DOMSubtreeModified', () => {
      const parentWrapper = _get(document.getElementsByClassName('video-container'), '[0].className', '')
      if (parentWrapper.includes('vjs-paused')) {
        that.setState({
          isShow: true,
        })
      } else {
        that.setState({
          isShow: parentWrapper.includes('vjs-user-inactive') ? false : true,
        })
      }
    })
  }

  handleFullScreen = () => {
    setTimeout(() => {
      var controller = document.querySelector('.vjs-control-bar')
      if (controller) {
        this.setState({
          controllerHeight: controller.clientHeight,
          controllerWidth: controller.clientWidth,
          isFullscreen: !this.state.isFullscreen,
        })
      } else {
        this.setState({
          isFullscreen: !this.state.isFullscreen,
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
    var controller = document.querySelector('.vjs-control-bar')
    if (controller) {
      this.setState({
        controllerHeight: controller.clientHeight,
        controllerWidth: controller.clientWidth,
      })
    }
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize)
  }

  render() {
    const { data } = this.props,
      { isFullscreen, isShow } = this.state

    const { controllerWidth, controllerHeight } = this.state
    const playerWidth = controllerWidth ? `${controllerWidth}px` : '100%'
    return (
      <div className={styles.player_container} style={{ width: playerWidth }}>
        <div
          id="playerHeader"
          className={styles.container}
          style={{
            opacity: isFullscreen && isShow ? 1 : 0,
          }}
        >
          <h1 className={styles.player_header__title}>{data.title}</h1>
        </div>
      </div>
    )
  }
}

export default withStyles(styles)(PlayerHeader)
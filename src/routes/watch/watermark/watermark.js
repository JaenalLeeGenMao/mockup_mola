import React, { Component } from 'react'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import _get from 'lodash/get'

import styles from './watermark.css'

const position = {
  top: {
    fullscreen: {
      min: 25,
      max: 68,
      unit: 'vh'
    },
    normal: {
      min: 113,
      max: 150,
      unit: '%'
    }
  },
  right: {
    fullscreen: {
      min: 25,
      max: 90,
      unit: 'vw'
    },
    normal: {
      min: 105,
      max: 165,
      unit: '%'
    }
  }
}

class Watermark extends Component {
  state = {
    controllerHeight: 0,
    controllerWidth: 0,
    isFullscreen: false,
    // isShow: false,
    top: 0,
    right: 0,
    showWatermark: true
  }

  componentDidMount() {
    var controller = document.querySelector('#videoSection')
    if (controller) {
      this.setState({
        controllerHeight: controller.clientHeight,
        controllerWidth: controller.clientWidth,
      })
    }
    window.addEventListener('resize', this.handleResize)
    this.loadFullscreenEvent()
    // this.loadSubtreeModifiedEvent()
    this.randomWatermarkPosition()
    this.renderWatermark()
  }

  getRandomPosition(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
  }

  // loadSubtreeModifiedEvent = () => {
  //   const that = this
  //   const _playerElement = document.getElementById('video-player-root')
  //   _playerElement.addEventListener('DOMSubtreeModified', () => {
  //     const parentWrapper = _get(document.getElementsByClassName('video-container'), '[0].className', '')
  //     if (parentWrapper.includes('vjs-paused')) {
  //       that.setState({
  //         isShow: true,
  //       })
  //     } else {
  //       that.setState({
  //         isShow: parentWrapper.includes('vjs-user-inactive') ? false : true,
  //       })
  //     }
  //   })
  // }

  handleFullScreen = () => {
    setTimeout(() => {
      var controller = document.querySelector('#videoSection')
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
      this.randomWatermarkPosition()
    }, 300)
  }

  loadFullscreenEvent = () => {
    ;['', 'webkit', 'moz', 'ms'].forEach(prefix =>
      document.addEventListener(prefix + 'fullscreenchange', this.handleFullScreen, false)
    )
  }

  handleResize = () => {
    var controller = document.querySelector('#videoSection')
    console.log('controller', controller)
    console.log('controllerWIDTH', controller.clientWidth)

    if (controller) {
      this.setState({
        controllerHeight: controller.clientHeight,
        controllerWidth: controller.clientWidth,
      })
    }
  }

  randomWatermarkPosition = () => {
    const top = this.getRandomPosition(20, 80)
    const right = this.getRandomPosition(30, 70)

    this.setState({
      top, right
    })
    // if(this.state.isFullscreen) {
    //   const top = this.getRandomPosition(position.top.fullscreen.min, position.top.fullscreen.max);
    //   const right = this.getRandomPosition(position.right.fullscreen.min, position.right.fullscreen.max);
    //   this.setState({
    //     top, right
    //   })
    // } else {
    //   const right = this.getRandomPosition(position.right.normal.min, position.right.normal.max);
    //   const top = this.getRandomPosition(position.top.normal.min, position.top.normal.max);
    //   this.setState({
    //     top, right
    //   })
    // }
  }

  renderWatermark = () => {
    const seconds = 10

    setTimeout(() => {
      if (this.props.isWatermarkShow) {
        this.props.isWatermarkShow(false)
      }
      this.setState({
        showWatermark: false
      })
    }, seconds * 1000)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize)
  }

  render() {
    const { uid } = this.props,
      { isFullscreen, top, right, showWatermark } = this.state

    const { controllerWidth, controllerHeight } = this.state

    if (!showWatermark) {
      return (
        <div />
      )
    }

    return (
      <div className={styles.watermark_container} style={{ top: `${top}%`, right: `${right}%` }}>
        F5432-SSSDW-123GHD-213213
        {/* {uid} */}
      </div>
      // isFullscreen ? (
      //   <div className={styles.watermark_container} style={{ top: `calc(100% - ${top}vh)`, right: `calc(100% - ${right}vw)` }}>
      //     F5432-SSSDW-123GHD-213213
      //     {/* {uid} */}
      //   </div>
      // ) : (
      //     <div className={styles.watermark_container} style={{ top: `calc(${top}% - ${controllerHeight}px)`, right: `calc(${right}% - ${controllerWidth < 640 ? 640 : controllerWidth}px)` }}>    
      //       F5432-SSSDW-123GHD-213213
      //       {/* {uid} */}
      //     </div>
      //   )


    )
  }
}

export default withStyles(styles)(Watermark)

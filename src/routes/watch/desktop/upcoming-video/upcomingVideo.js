import React, { Component } from 'react'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import Link from '@components/Link'
import Lazyload from '@components/common/Lazyload/Lazyload'
import history from '@source/history'
import CountDown from './countDown'

import styles from './upcomingVideo.css'

class UpcomingVideo extends Component {
  state = {
    adsHeight: 0,
    adsWidth: 0,
  }

  componentDidMount() {
    var ads = document.querySelector('.theoplayer-ad-nonlinear-content img')
    if (ads) {
      this.setState({
        adsHeight: ads.clientHeight,
        adsWidth: ads.clientWidth,
      })
    }
    window.addEventListener('resize', this.handleResize)
    this.loadFullscreenEvent()
  }

  handleFullScreen = () => {
    // console.log('MASUKK')
    setTimeout(() => {
      var ads = document.querySelector('.theoplayer-ad-nonlinear-content img')
      // console.log('ads.clientHeight', ads.clientHeight, ads.clientWidth)
      if (ads) {
        this.setState({
          adsHeight: ads.clientHeight,
          adsWidth: ads.clientWidth,
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
    var ads = document.querySelector('.theoplayer-ad-nonlinear-content img')
    if (ads) {
      this.setState({
        adsHeight: ads.clientHeight,
        adsWidth: ads.clientWidth,
      })
    }
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize)
  }

  cancelUpcVideo = e => {
    if (this.props.handleCancelVideo) {
      this.props.handleCancelVideo()
    }
    e.preventDefault()
  }

  redirectToNextVideo = videoId => {
    history.push(`/watch?v=${videoId}&autoplay=1`)
  }

  render() {
    const { data } = this.props

    const { adsWidth, adsHeight } = this.state
    const playerWidth = adsWidth ? `${adsWidth}px` : '100%'
    return (
      <div className={styles.player_container} style={{ width: playerWidth }}>
        <div className={styles.container} style={{ bottom: `calc(${adsHeight}px + 6rem)` }}>
          <div className={styles.poster}>
            <Lazyload src={data.background.portrait} />
          </div>
          <div className={styles.content}>
            {/* <div className={styles.ContentWrapper}> */}
            <div className={styles.title}>{data.title}</div>
            <div className={styles.desc}>{data.shortDescription}</div>
            <div className={styles.link}>
              <Link className={styles.play} to={`/watch?v=${data.id}&autoplay=1`}>
                <CountDown startSecond={10} onTimeFinish={() => this.redirectToNextVideo(data.id)} />
              </Link>
              <Link className={styles.close} onClick={this.cancelUpcVideo}>
                Close
              </Link>
            </div>
            {/* </div> */}
          </div>
        </div>
      </div>
    )
  }
}

export default withStyles(styles)(UpcomingVideo)

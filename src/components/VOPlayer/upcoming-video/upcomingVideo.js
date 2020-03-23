import React, { Component } from 'react'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import Link from '@components/Link'
import Lazyload from '@components/common/Lazyload/Lazyload'
import history from '@source/history'
import CountDown from './countDown'
import { setMultilineEllipsis } from '@source/lib/globalUtil'
import styles from './upcomingVideo.css'

class UpcomingVideo extends Component {
  state = {
    adsHeight: 0,
    adsWidth: 0,
    isFullscreenMobile: false,
  }

  componentDidMount() {
    setMultilineEllipsis('upc-video-text')
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
    const { data, isMobile = false } = this.props
    const { adsWidth, adsHeight, isFullscreenMobile } = this.state
    const playerWidth = adsWidth ? `${adsWidth}px` : '100%'
    const containerBottom = isMobile && !isFullscreenMobile ? {} : { bottom: '7rem' } //{ bottom: `calc(${adsHeight}px + 7rem)` }
    return (
      <div className={styles.player_container} style={{ width: playerWidth }}>
        <div className={styles.container} style={containerBottom}>
          <div className={styles.poster}>
            <Lazyload src={isMobile ? data.cover_landscape : data.cover_portrait} />
          </div>
          <div className={styles.content}>
            <div className={`${styles.title}`}>{data.title}</div>
            <div className={styles.desc}>
              <p className="upc-video-text">{data.short_description}</p>
            </div>
            {!isMobile && (
              <div className={styles.link}>
                <Link className={styles.play} to={`/watch?v=${data.video_id}&autoplay=1`}>
                  <CountDown startSecond={100} onTimeFinish={() => this.redirectToNextVideo(data.video_id)} />
                </Link>
                <Link className={styles.close} onClick={this.cancelUpcVideo}>
                  Close
                </Link>
              </div>
            )}
          </div>
          {isMobile && (
            <div className={styles.link}>
              <Link className={styles.play} to={`/watch?v=${data.video_id}&autoplay=1`}>
                <CountDown
                  isMobile={isMobile}
                  startSecond={20}
                  onTimeFinish={() => this.redirectToNextVideo(data.video_id)}
                />
              </Link>
              <Link className={styles.close} onClick={this.cancelUpcVideo}>
                Close
              </Link>
            </div>
          )}
        </div>
      </div>
    )
  }
}

export default withStyles(styles)(UpcomingVideo)
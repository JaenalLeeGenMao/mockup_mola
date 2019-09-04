import React, { Component } from 'react'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import Link from '@components/Link'
// import history from '@source/history'
import CountDown from './countDown'
import styles from './upcomingVideo.css'

class UpcomingVideo extends Component {
  state = {
    adsHeight: 0,
    adsWidth: 0
  }

  componentDidMount() {
    var ads = document.querySelector('.theoplayer-ad-nonlinear-content img')
    if (ads) {
      this.setState({
        adsHeight: ads.clientHeight,
        adsWidth: ads.clientWidth
      })
    }
    window.addEventListener('resize', this.handleResize)
    this.loadFullscreenEvent();
  }

  handleFullScreen = () => {
    // console.log('MASUKK')
    setTimeout(() => {
      var ads = document.querySelector('.theoplayer-ad-nonlinear-content img')
      // console.log('ads.clientHeight', ads.clientHeight, ads.clientWidth)
      if (ads) {
        this.setState({
          adsHeight: ads.clientHeight,
          adsWidth: ads.clientWidth
        })
      }
    }, 300)
  }

  loadFullscreenEvent = () => {
    ['', 'webkit', 'moz', 'ms'].forEach(prefix =>
      document.addEventListener(
        prefix + 'fullscreenchange',
        this.handleFullScreen,
        false
      )
    );
  }

  handleResize = () => {
    var ads = document.querySelector('.theoplayer-ad-nonlinear-content img')
    if (ads) {
      this.setState({
        adsHeight: ads.clientHeight,
        adsWidth: ads.clientWidth
      })
    }
  };

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize)
  }

  cancelUpcVideo = (e) => {
    if (this.props.handleCancelVideo) {
      this.props.handleCancelVideo()
    }
    e.preventDefault()
  }

  redirectToNextVideo = (videoId) => {
    // history.push(`/watch?v=${videoId}&autoplay=1`)
  }

  render() {
    const { adsWidth, adsHeight } = this.state
    return (
      <div className={styles.player_container} style={{ width: `${adsWidth}px` }}>
        <div className={styles.container} style={{ bottom: `calc(${adsHeight}px + 6rem)` }}>
          <div className={styles.poster}>
            <img src="https://res-mola01.koicdn.com/image/496c1523-4741-49fd-92fe-e6848409fc14/image.jpeg" />
          </div>
          <div className={styles.content}>
            {/* <div className={styles.ContentWrapper}> */}
            <div className={styles.title}>A TALE OF LOVE AND DARKNESS Eps. 2</div>
            <div className={styles.desc}>Film yang diadaptasi dari buku best-seller karya Amos Oz ini bercerita tentang kisah nyata kehidupan Amos saat ia kecil yang membentuk dirinya menjadi penulis hebat.</div>
            <div className={styles.link}>
              <Link className={styles.play} to={'/watch?v=xxx&autoplay=1'}>
                <CountDown startSecond={10} onTimeFinish={() => this.redirectToNextVideo('xxx')} />
              </Link>
              <Link className={styles.close} onClick={this.cancelUpcVideo}>Close</Link>
            </div>
            {/* </div> */}
          </div>
        </div>
      </div>
    )
  }
}

export default withStyles(styles)(UpcomingVideo)

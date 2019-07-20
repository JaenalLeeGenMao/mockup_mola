import React, { Component } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import withStyles from 'isomorphic-style-loader/lib/withStyles'

import { defaultVideoSetting } from '@source/lib/theoplayerConfig.js'

import * as movieDetailActions from '@actions/movie-detail'
import styles from './watch-sport.css'
import { getVUID_retry } from '@actions/vuid'
import Synopsis from './synopsis'

import Header from '@components/Header'
import CountDown from '@components/CountDown'
import { customTheoplayer, noInfoBar } from './theoplayer-style'
//const { getComponent } = require('../../../../../gandalf')
const { getComponent } = require('@supersoccer/gandalf')
const Theoplayer = getComponent('theoplayer')

class WatchSport extends Component {
  state = {
    movieDetail: [],
    countDownStatus: true,
    toggleInfoBar: true,
  }

  handleOnVideoLoad = player => {
    const playerButton = document.querySelector('.vjs-button')
    /** handle keyboard pressed */
    document.onkeyup = event => {
      switch (event.which || event.keyCode) {
        case 13 /* enter */:
          if (player.src) {
            playerButton.click()
          }
          break
        case 32 /* space */:
          if (player.src) {
            playerButton.click()
          }
          break
        default:
          event.preventDefault()
          break
      }
    }

    this.player = player

    player.addEventListener('contentprotectionerror', e => {
      if (e.error.toLowerCase() == 'error during license server request') {
        this.props.getVUID_retry()
      } else {
        // console.log('ERROR content protection', e)
        // this.handleVideoError(e);
      }
    })
  }

  subtitles() {
    const { dataFetched } = this.props
    const subtitles = dataFetched.subtitles ? dataFetched.subtitles : null

    const myTheoPlayer =
      subtitles &&
      subtitles.map(sub => ({
        kind: sub.type || '',
        src: sub.url || '',
        label: sub.locale || '',
        type: sub.format || '',
      }))

    return myTheoPlayer
  }

  componentDidMount() {}

  hideCountDown = () => {
    this.setState({
      countDownStatus: false,
    })
  }

  renderVideo = () => {
    const { user, getMovieDetail, videoId, isMobile, dataFetched } = this.props

    if (dataFetched) {
      console.log('MASUK')
      const { data: vuid, meta: { status: vuidStatus } } = this.props.vuid

      const defaultVidSetting = dataFetched ? defaultVideoSetting(user, dataFetched, vuidStatus === 'success' ? vuid : '') : {}

      const videoSettings = {
        ...defaultVidSetting,
        // getUrlResponse: this.getUrlResponse
      }

      const { toggleInfoBar } = this.state
      let isMatchPassed = false
      if (dataFetched.endTime < Date.now() / 1000) {
        isMatchPassed = true
      }

      const playerClass = toggleInfoBar && !isMatchPassed ? '' : noInfoBar
      const countDownClass = toggleInfoBar && !isMatchPassed ? styles.countdown__winfobar : ''
      if (this.state.countDownStatus && dataFetched.contentType === 3 && dataFetched.startTime * 1000 > Date.now()) {
        return <CountDown className={countDownClass} hideCountDown={this.hideCountDown} startTime={dataFetched.startTime} videoId={videoId} getMovieDetail={getMovieDetail} isMobile={isMobile} />
      } else if (dataFetched.streamSourceUrl) {
        console.log('HERE')
        return <Theoplayer className={customTheoplayer} subtitles={this.subtitles()} handleOnVideoLoad={this.handleOnVideoLoad} {...videoSettings} showBackBtn={!isMobile} />
      }
    }
  }

  handleCloseInfoBar = () => {
    this.setState({
      toggleInfoBar: false,
    })
  }

  render() {
    const { isMobile, dataFetched } = this.props
    const { data: vuid, meta: { status: vuidStatus } } = this.props.vuid
    let drmStreamUrl = '',
      isDRM = false
    const isSafari = /.*Version.*Safari.*/.test(navigator.userAgent)
    if (dataFetched.drm && dataFetched.drm.widevine && dataFetched.drm.fairplay) {
      drmStreamUrl = isSafari ? dataFetched.drm.fairplay.streamUrl : dataFetched.drm.widevine.streamUrl
    }
    isDRM = drmStreamUrl ? true : false

    const loadPlayer = dataFetched && ((isDRM && vuidStatus === 'success') || !isDRM)

    const { toggleInfoBar } = this.state
    let isMatchPassed = false
    if (dataFetched && dataFetched.endTime < Date.now() / 1000) {
      isMatchPassed = true
    }
    console.log('MASUKK', loadPlayer)
    return (
      <>
        {dataFetched && (
          <>
            {/* Tanya header mobile jadi gimana, ada menu atau back doang kaya dulu */}
            {isMobile && <Header logoOff stickyOff libraryOff searchOff profileOff isMobile isDark={0} backButtonOn leftMenuOff opacity={0} containerWidth={'80px'} {...this.props} />}
            <div className={isMobile ? styles.container__mobile : styles.container}>
              <div className={isMobile ? styles.player__container__mobile : styles.player__container}>
                {toggleInfoBar &&
                  !isMatchPassed && (
                    <div className={styles.info_bar}>
                      <div className={styles.info_bar__container}>
                        <div className={styles.info_bar__text}>Siaran Percobaan</div>
                        <div className={styles.info_bar__close} onClick={this.handleCloseInfoBar}>
                          <span />
                        </div>
                      </div>
                    </div>
                  )}
                {loadPlayer && this.renderVideo()}
              </div>
              {!isMobile && (
                <>
                  <div className={styles.detail__container}>
                    <div className={styles.detail__left}>
                      <div>
                        <h1 className={styles.detail__left_title}>{dataFetched.title}</h1>
                      </div>
                    </div>
                    <div className={styles.detail__right}>
                      <div>
                        <Synopsis content={dataFetched.description} />
                      </div>
                    </div>
                  </div>
                </>
              )}

              {isMobile && (
                <>
                  <div className={styles.detail__container__mobile}>
                    <div className={styles.detail__title}>
                      <h1 className={styles.detail__title__text}>{dataFetched.title}</h1>
                    </div>
                    <div className={styles.detail__desc}>
                      <Synopsis content={dataFetched.description} isMobile />
                    </div>
                  </div>
                </>
              )}
            </div>
          </>
        )}
      </>
    )
  }
}

const mapStateToProps = state => {
  return {
    ...state,
  }
}

const mapDispatchToProps = dispatch => ({
  getMovieDetail: movieId => dispatch(movieDetailActions.getMovieDetail(movieId)),
  getVUID_retry: () => dispatch(getVUID_retry()),
})

export default compose(withStyles(styles), connect(mapStateToProps, mapDispatchToProps))(WatchSport)

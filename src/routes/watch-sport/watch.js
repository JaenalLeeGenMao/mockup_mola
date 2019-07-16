import React, { Component } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import { Helmet } from 'react-helmet'

import { notificationBarBackground } from '@global/imageUrl'
import { updateCustomMeta } from '@source/DOMUtils'
import { defaultVideoSetting } from '@source/lib/theoplayerConfig.js'
import DRMConfig from '@source/lib/DRMConfig'

import * as movieDetailActions from '@actions/movie-detail'
import styles from './watch.css'
import { getVUID, getVUID_retry } from '@actions/vuid'
import Synopsis from './synopsis'

import Header from '@components/Header'
import CountDown from '@components/CountDown'
import { customTheoplayer, noInfoBar } from './theoplayer-style'
//const { getComponent } = require('../../../../../gandalf')
const { getComponent } = require('@supersoccer/gandalf')
const Theoplayer = getComponent('theoplayer')

class Watch extends Component {
  state = {
    movieDetail: [],
    countDownStatus: true,
    toggleInfoBar: true,
  }

  uuidADS = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = (Math.random() * 16) | 0,
        v = c == 'x' ? r : (r & 0x3) | 0x8
      return v.toString(16)
    })
  }

  /* eslint-disable */
  updateEncryption() {
    const { clientIp, uid, sessionId } = this.props.user
    const { data } = this.props.movieDetail

    /* eslint-disable */
    const payload = {
      project_id: '2',
      video_id: this.props.movieId,
      app_id: 'sent_ads',
      session_id: sessionId,
      client_ip: clientIp,
      uuid: this.uuidADS(),
    }

    this.encryptPayload = window.btoa(JSON.stringify(payload))
  }

  updateMetaTag() {
    const { movieDetail } = this.props
    if (movieDetail.data.length > 0) {
      const { title, description, background } = movieDetail.data[0]
      updateCustomMeta('og:title', title)
      updateCustomMeta('og:image', background.landscape)
      updateCustomMeta('og:description', description)
      updateCustomMeta('og:url', window.location.href)
    }
    /* When audio starts playing... */
    if ('mediaSession' in navigator) {
      const currentMovie = movieDetail.data.length > 0 ? movieDetail.data[0] : { title: 'Mola TV' }
      navigator.mediaSession.metadata = new MediaMetadata({
        title: currentMovie.title,
        artist: 'Mola TV',
        album: 'Watch Movies & Streaming Online',
        artwork: [
          { src: notificationBarBackground, sizes: '96x96', type: 'image/png' },
          { src: notificationBarBackground, sizes: '128x128', type: 'image/png' },
          { src: notificationBarBackground, sizes: '192x192', type: 'image/png' },
          { src: notificationBarBackground, sizes: '256x256', type: 'image/png' },
          { src: notificationBarBackground, sizes: '384x384', type: 'image/png' },
          { src: notificationBarBackground, sizes: '512x512', type: 'image/png' },
        ],
      })
    }
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
    const { movieDetail } = this.props
    const subtitles = movieDetail.data.length > 0 && movieDetail.data[0].subtitles ? movieDetail.data[0].subtitles : null

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

  componentDidMount() {
    const { getMovieDetail, videoId, getVUID, user } = this.props

    getMovieDetail(videoId)
    this.updateEncryption()

    const deviceId = user.uid ? user.uid : DRMConfig.getOrCreateDeviceId()
    getVUID(deviceId)
  }

  componentDidUpdate() {
    this.updateMetaTag()
  }

  hideCountDown = () => {
    this.setState({
      countDownStatus: false,
    })
  }

  renderVideo = () => {
    const { user, getMovieDetail, videoId, isMobile } = this.props
    const { meta: { status, error }, data } = this.props.movieDetail

    if (status === 'success' && data.length > 0) {
      const { data: vuid, meta: { status: vuidStatus } } = this.props.vuid

      const defaultVidSetting = status === 'success' ? defaultVideoSetting(user, data[0], vuidStatus === 'success' ? vuid : '') : {}

      const videoSettings = {
        ...defaultVidSetting,
        // getUrlResponse: this.getUrlResponse
      }

      const { toggleInfoBar } = this.state
      let isMatchPassed = false
      if (data[0].endTime < Date.now() / 1000) {
        isMatchPassed = true
      }

      const playerClass = toggleInfoBar && !isMatchPassed ? '' : noInfoBar
      const countDownClass = toggleInfoBar && !isMatchPassed ? styles.countdown__winfobar : ''
      if (this.state.countDownStatus && data[0].contentType === 3 && data[0].startTime * 1000 > Date.now()) {
        return <CountDown className={countDownClass} hideCountDown={this.hideCountDown} startTime={data[0].startTime} videoId={videoId} getMovieDetail={getMovieDetail} isMobile={isMobile} />
      } else if (data[0].streamSourceUrl) {
        return (
          <Theoplayer
            className={`${customTheoplayer} ${playerClass}`}
            subtitles={this.subtitles()}
            // certificateUrl="https://vmxapac.net:8063/?deviceId=Y2U1NmM3NzAtNmI4NS0zYjZjLTk4ZDMtOTFiN2FjMTZhYWUw"
            handleOnVideoLoad={this.handleOnVideoLoad}
            // deviceId="NzhjYmY1NmEtODc3ZC0zM2UxLTkxODAtYTEwY2EzMjk3MTBj"
            // isDRM={true}
            {...videoSettings}
            showBackBtn={!isMobile}
          />
        )
      }
    }
  }

  handleCloseInfoBar = () => {
    this.setState({
      toggleInfoBar: false,
    })
  }

  render() {
    const { isMobile } = this.props
    const { meta: { status, error }, data } = this.props.movieDetail
    const apiFetched = status === 'success' && data.length > 0
    const dataFetched = apiFetched ? data[0] : undefined
    const { data: vuid, meta: { status: vuidStatus } } = this.props.vuid
    let drmStreamUrl = '',
      isDRM = false
    const isSafari = /.*Version.*Safari.*/.test(navigator.userAgent)
    if (status === 'success' && dataFetched.drm && dataFetched.drm.widevine && dataFetched.drm.fairplay) {
      drmStreamUrl = isSafari ? dataFetched.drm.fairplay.streamUrl : dataFetched.drm.widevine.streamUrl
    }
    isDRM = drmStreamUrl ? true : false

    const loadPlayer = status === 'success' && ((isDRM && vuidStatus === 'success') || !isDRM)

    const { toggleInfoBar } = this.state
    let isMatchPassed = false
    if (dataFetched && dataFetched.endTime < Date.now() / 1000) {
      isMatchPassed = true
    }

    return (
      <>
        {dataFetched && (
          <>
            <Helmet>
              <title>{dataFetched.title}</title>
            </Helmet>
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
  getVUID: deviceId => dispatch(getVUID(deviceId)),
  getVUID_retry: () => dispatch(getVUID_retry()),
})

export default compose(withStyles(styles), connect(mapStateToProps, mapDispatchToProps))(Watch)

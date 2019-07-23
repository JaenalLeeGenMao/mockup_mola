import React, { Component } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import { Helmet } from 'react-helmet'
import { get } from 'axios'

import { notificationBarBackground } from '@global/imageUrl'
import { updateCustomMeta } from '@source/DOMUtils'
import { defaultVideoSetting } from '@source/lib/theoplayerConfig.js'
import DRMConfig from '@source/lib/DRMConfig'
import config from '@source/config'

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
    android_redirect_to_app: false,
    ios_redirect_to_app: false,
    notice_bar_message: 'Siaran Percobaan',
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

  getConfig = async () => {
    await get('/api/v2/config/app-params').then(result => {
      if (result.data) {
        const { android_redirect_to_app, ios_redirect_to_app, notice_bar_enabled, notice_bar_message } = result.data.data.attributes
        this.setState({
          android_redirect_to_app,
          ios_redirect_to_app,
          toggleInfoBar: notice_bar_enabled,
          notice_bar_message,
        })
      }
    })
  }

  componentDidMount() {
    const { getMovieDetail, videoId, getVUID, user } = this.props

    getMovieDetail(videoId)
    this.getConfig()

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

  handlePlayMovie = () => {
    const { videoId } = this.props
    const domain = config.endpoints.domain
    const url = encodeURIComponent(`${domain}/download-app/${videoId}`)
    document.location = `intent://mola.tv/watch?v=${videoId}/#Intent;scheme=molaapp;package=tv.mola.app;S.browser_fallback_url=${url};end`
  }

  renderVideo = () => {
    const { user, getMovieDetail, videoId, isMobile } = this.props
    const { meta: { status, error }, data } = this.props.movieDetail
    const { android_redirect_to_app, ios_redirect_to_app } = this.state

    if (status === 'success' && data.length > 0) {
      const { data: vuid, meta: { status: vuidStatus } } = this.props.vuid
      const poster = data[0].background.landscape
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

      const isApple = /iPad|iPhone|iPod/.test(navigator.userAgent)

      const countDownClass = toggleInfoBar && !isMatchPassed ? styles.countdown__winfobar : ''
      if (this.state.countDownStatus && data[0].contentType === 3 && data[0].startTime * 1000 > Date.now()) {
        return <CountDown className={countDownClass} hideCountDown={this.hideCountDown} startTime={data[0].startTime} videoId={videoId} getMovieDetail={getMovieDetail} isMobile={isMobile} />
      } else if (data[0].streamSourceUrl) {
        if (isMobile) {
          if (isApple) {
            //ios
            if (ios_redirect_to_app) {
              return (
                <div className={styles.poster__wrapper}>
                  <img src={poster} />
                  <span className={styles.play_icon} onClick={this.handlePlayMovie} />
                </div>
              )
            } else {
              return <Theoplayer className={customTheoplayer} subtitles={this.subtitles()} handleOnVideoLoad={this.handleOnVideoLoad} {...videoSettings} poster={poster} showBackBtn={!isMobile} />
            }
          } else {
            //android
            if (android_redirect_to_app) {
              return (
                <div className={styles.poster__wrapper}>
                  <img src={poster} />
                  <span className={styles.play_icon} onClick={this.handlePlayMovie} />
                </div>
              )
            } else {
              return <Theoplayer className={customTheoplayer} subtitles={this.subtitles()} handleOnVideoLoad={this.handleOnVideoLoad} {...videoSettings} poster={poster} showBackBtn={!isMobile} />
            }
          }
        } else {
          return <Theoplayer className={customTheoplayer} subtitles={this.subtitles()} handleOnVideoLoad={this.handleOnVideoLoad} {...videoSettings} poster={poster} showBackBtn={!isMobile} />
        }
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

    const { toggleInfoBar, notice_bar_message } = this.state
    let isMatchPassed = false
    if (dataFetched && dataFetched.endTime < Date.now() / 1000) {
      isMatchPassed = true
    }

    const playerClass = toggleInfoBar && !isMatchPassed ? styles.player__video : styles.player__video_nobar

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
                        <div className={styles.info_bar__text}>{notice_bar_message}</div>
                        <div className={styles.info_bar__close} onClick={this.handleCloseInfoBar}>
                          <span />
                        </div>
                      </div>
                    </div>
                  )}
                <div className={playerClass}>{loadPlayer && this.renderVideo()}</div>
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

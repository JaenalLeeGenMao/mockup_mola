import React, { Component } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import _get from 'lodash/get'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import { Helmet } from 'react-helmet'
import notificationBarBackground from '@global/style/icons/notification-bar.png'
import { updateCustomMeta } from '@source/DOMUtils'
import { defaultVideoSetting } from '@source/lib/theoplayerConfig.js'
import * as movieDetailActions from '@actions/movie-detail'
import styles from '@global/style/css/grainBackground.css'

import { customTheoplayer } from './theoplayer-style'
//const { getComponent } = require('../../../../../gandalf')
const { getComponent } = require('@supersoccer/gandalf')
const Theoplayer = getComponent('theoplayer')

let ticker = [] /* important for analytics tracker */
class MovieDetail extends Component {
  state = {
    toggleSuggestion: false,
    movieDetail: [],
    isControllerActive: 'overview',
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

  handleOnTimePerMinute = ({ action, heartbeat }) => {
    const { clientIp, uid, sessionId } = this.props.user
    const currentDuration = this.player ? this.player.currentTime : ''
    const totalDuration = this.player ? this.player.duration : ''
    const payload = {
      action,
      clientIp,
      sessionId,
      heartbeat: heartbeat ? 60 : 0,
      window: window,
      // currentDuration,
      // totalDuration,
    }

    if (uid) {
      payload.userId = uid
    }

    window.__theo_start = window.__theo_start || Date.now()
    window.__theo_ps = Date.now()

    // const minutesElapsed = Math.floor((window.__theo_ps - window.__theo_start) / (60 * 1000))
    // if (minutesElapsed >= 1) {
    handleTracker(payload, this.props.movieDetail.data[0])
    window.__theo_start = window.__theo_ps
    // }
  }

  handleControllerClick = name => {
    this.setState({ isControllerActive: name })
  }

  handleOnVideoPause = (payload = false, player) => {
    this.isAds = document.querySelector('.theoplayer-ad-nonlinear-content') /* important to determine suggestion box position */
    this.setState({ toggleSuggestion: true })
  }

  handleOnVideoPlay = (payload = true, player) => {
    // window.removeEventListener('beforeunload', () => this.handleOnTimePerMinute({ action: 'closed' }))
    // window.addEventListener('beforeunload', () => this.handleOnTimePerMinute({ action: 'closed' }))
    this.isPlay = true
    this.setState({ toggleSuggestion: false })
  }

  handleVideoTimeUpdate = (payload = 0, player) => {
    const time = Math.round(payload)
    if (time % 60 === 0 && this.isPlay && !player.ads.playing) {
      if (!ticker.includes(time)) {
        ticker.push(time)
        this.handleOnTimePerMinute({ action: 'timeupdate', heartbeat: time !== 0 })
      }
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
    const {
      getMovieDetail,
      videoId, //passed as props from index.js,
      onHandleHotPlaylist,
    } = this.props

    getMovieDetail(videoId)
    this.updateEncryption()
  }

  componentDidUpdate() {
    this.updateMetaTag()
  }

  render() {
    const { isControllerActive, toggleSuggestion } = this.state
    const { meta: { status, error }, data } = this.props.movieDetail
    const apiFetched = status === 'success' && data.length > 0
    const dataFetched = apiFetched ? data[0] : undefined
    const isSafari = /.*Version.*Safari.*/.test(navigator.userAgent)
    const streamSource = apiFetched ? dataFetched.streamSourceUrl : ''
    const { user } = this.props

    const defaultVidSetting = status === 'success' ? defaultVideoSetting(user, dataFetched, '') : {}

    const videoSettings = {
      ...defaultVidSetting,
      // getUrlResponse: this.getUrlResponse
    }

    return (
      <>
        {dataFetched && (
          <>
            <Helmet>
              <title>{dataFetched.title}</title>
            </Helmet>
            <Theoplayer
              className={customTheoplayer}
              subtitles={this.subtitles()}
              // certificateUrl="https://vmxapac.net:8063/?deviceId=Y2U1NmM3NzAtNmI4NS0zYjZjLTk4ZDMtOTFiN2FjMTZhYWUw"
              handleOnVideoLoad={this.handleOnVideoLoad}
              handleOnVideoPause={this.handleOnVideoPause}
              handleOnVideoPlay={this.handleOnVideoPlay}
              // deviceId="NzhjYmY1NmEtODc3ZC0zM2UxLTkxODAtYTEwY2EzMjk3MTBj"
              // isDRM={true}
              showBackBtn
              {...videoSettings}
            />
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
})

export default compose(withStyles(styles), connect(mapStateToProps, mapDispatchToProps))(MovieDetail)

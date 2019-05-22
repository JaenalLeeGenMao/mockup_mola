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

import CountDown from '@components/CountDown'
import { customTheoplayer } from './theoplayer-style'
//const { getComponent } = require('../../../../../gandalf')
const { getComponent } = require('@supersoccer/gandalf')
const Theoplayer = getComponent('theoplayer')

let ticker = [] /* important for analytics tracker */
class MovieDetail extends Component {
  state = {
    movieDetail: [],
    countDownStatus: true,
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

  hideCountDown = () => {
    this.setState({
      countDownStatus: false,
    })
  }

  renderVideo = () => {
    const { user, getMovieDetail, videoId } = this.props
    const { meta: { status, error }, data } = this.props.movieDetail

    if (status === 'success' && data.length > 0) {
      const defaultVidSetting = defaultVideoSetting(user, data[0], '')

      const videoSettings = {
        ...defaultVidSetting,
        // getUrlResponse: this.getUrlResponse
      }

      // console.log("aaaa", this.state.countDownStatus, dataFetched.contentType, dataFetched.startTime * 1000, Date.now())
      // console.log("dataFetched.streamSourceUrl", dataFetched.streamSourceUrl)
      if (this.state.countDownStatus && data[0].contentType === 3 && data[0].startTime * 1000 > Date.now()) {
        return <CountDown hideCountDown={this.hideCountDown} startTime={data[0].startTime} videoId={videoId} getMovieDetail={getMovieDetail} />
      } else if (data[0].streamSourceUrl) {
        return (
          <Theoplayer
            className={customTheoplayer}
            subtitles={this.subtitles()}
            // certificateUrl="https://vmxapac.net:8063/?deviceId=Y2U1NmM3NzAtNmI4NS0zYjZjLTk4ZDMtOTFiN2FjMTZhYWUw"
            handleOnVideoLoad={this.handleOnVideoLoad}
            // deviceId="NzhjYmY1NmEtODc3ZC0zM2UxLTkxODAtYTEwY2EzMjk3MTBj"
            // isDRM={true}
            showBackBtn
            {...videoSettings}
          />
        )
      }
    }
  }

  render() {
    const { meta: { status, error }, data } = this.props.movieDetail
    const apiFetched = status === 'success' && data.length > 0
    const dataFetched = apiFetched ? data[0] : undefined
    const isSafari = /.*Version.*Safari.*/.test(navigator.userAgent)
    const streamSource = apiFetched ? dataFetched.streamSourceUrl : ''
    // console.log("dataFetched", dataFetched)
    // const { user, getMovieDetail, videoId } = this.props

    // const defaultVidSetting = status === 'success' && defaultVideoSetting(user, dataFetched, '')

    // const videoSettings = {
    //   ...defaultVidSetting,
    //   // getUrlResponse: this.getUrlResponse
    // }

    return (
      <>
        {dataFetched && (
          <>
            <Helmet>
              <title>{dataFetched.title}</title>
            </Helmet>
            {this.renderVideo()}
            {/* <Theoplayer
              className={customTheoplayer}
              subtitles={this.subtitles()}
              // certificateUrl="https://vmxapac.net:8063/?deviceId=Y2U1NmM3NzAtNmI4NS0zYjZjLTk4ZDMtOTFiN2FjMTZhYWUw"
              handleOnVideoLoad={this.handleOnVideoLoad}
              // deviceId="NzhjYmY1NmEtODc3ZC0zM2UxLTkxODAtYTEwY2EzMjk3MTBj"
              // isDRM={true}
              showBackBtn
              {...videoSettings}
            /> */}
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

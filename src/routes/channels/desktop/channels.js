import React, { Component } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import moment from 'moment'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
const { getComponent } = require('@supersoccer/gandalf')
const Theoplayer = getComponent('theoplayer')

import * as movieDetailActions from '@actions/movie-detail'
import { getVUID, getVUID_retry } from '@actions/vuid'
import channelActions from '@actions/channels'

import DRMConfig from '@source/lib/DRMConfig'
import { defaultVideoSetting } from '@source/lib/theoplayerConfig.js'
import history from '@source/history'
import { formatDateTime } from '@source/lib/dateTimeUtil'

import MovieDetailError from '@components/common/error'
import Header from '@components/Header'

import { getChannelProgrammeGuides } from '../selectors'
import Schedule from './schedule'
import { customTheoplayer } from './theoplayer-style'
import styles from './channels.css'

class Channels extends Component {
  state = {
    selectedDate: {
      fullDate: moment().format('YYYYMMDD'),
      date: moment().format('DD'),
      day: moment()
        .format('ddd')
        .toUpperCase(),
    },
    activeChannel: '',
    activeChannelId: '',
    activeDate: formatDateTime(Date.now() / 1000, 'ddd, DD MMM YYYY'),
    scheduleDateList: [],
    scheduleList: [],
  }

  componentDidMount() {
    const { fetchChannelSchedule, fetchChannelsPlaylist, movieId, channelsPlaylist, fetchVideoByid, user } = this.props

    fetchChannelsPlaylist().then(() => {
      fetchChannelSchedule(this.state.selectedDate)
    })
    fetchVideoByid(movieId)

    const deviceId = user.uid ? user.uid : DRMConfig.getOrCreateDeviceId()
    getVUID(deviceId)
  }

  componentDidUpdate(prevProps, prevState) {
    const { channelsPlaylist, channelSchedule, movieDetail, movieId, fetchVideoByid } = this.props
    if (channelsPlaylist.meta.status === 'success' && channelsPlaylist.data.length > 0 && !prevState.activeChannel && !prevState.activeChannelId) {
      this.setState({
        activeChannel: this.props.channelsPlaylist.data[0].title,
        activeChannelId: this.props.channelsPlaylist.data[0].id,
      })
    }

    if (this.state.scheduleList.length === 0 || prevState.activeChannelId !== this.state.activeChannelId) {
      this.handleSelectChannel(this.state.activeChannelId)
    }

    if (movieDetail.meta.status === 'success' && movieDetail.data[0].id != movieId) {
      fetchVideoByid(movieId)
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
    // player.addEventListener('error', e => {
    //   console.log('error', e, '======', player.error.code)
    //   // this.handleVideoError(e);
    // })
  }

  subtitles() {
    const { movieDetail } = this.props
    const subtitles = movieDetail.data.length > 0 && movieDetail.data[0].subtitles ? movieDetail.data[0].subtitles : null

    const myTheoPlayer =
      subtitles &&
      subtitles.map(({ subtitleUrl, country }) => ({
        kind: 'subtitles',
        src: subtitleUrl,
        label: country,
        type: 'srt',
      }))

    return myTheoPlayer
  }

  handleSelectChannel = id => {
    // const filteredSchedule = this.props.channelSchedule.find(item => item.id == id)
    // if (filteredSchedule) {
    //   const time = filteredSchedule.videos.length > 0 ? filteredSchedule.videos[0].startTime : Date.now() / 1000

    //   this.setState({
    //     activeChannel: filteredSchedule.title,
    //     activeChannelId: id,
    //     activeDate: formatDateTime(time, 'ddd, DD MMM YYYY'),
    // scheduleList: filteredSchedule.videos ? filteredSchedule.videos : [],
    //   })
    //   history.push(`/channels/${id}`);
    // }
    if (this.props.channelSchedule.length > 0 && this.props.movieDetail.meta.status === 'success') {
      this.setState({
        activeChannelId: id,
        scheduleList: this.props.channelSchedule,
      })
      history.push(`/channels/${id}`)
    }
  }

  render() {
    const { programmeGuides, channelSchedule, channelsPlaylist, movieId } = this.props
    const { meta: { status, error }, data } = this.props.movieDetail
    const apiFetched = status === 'success' && data.length > 0
    const dataFetched = apiFetched ? data[0] : undefined
    const poster = apiFetched ? dataFetched.background.landscape : ''

    const { user } = this.props
    const { data: vuid, meta: { status: vuidStatus } } = this.props.vuid

    const defaultVidSetting = status === 'success' ? defaultVideoSetting(user, dataFetched, vuidStatus === 'success' ? vuid : '') : {}

    const videoSettings = {
      ...defaultVidSetting,
    }

    let drmStreamUrl = '',
      isDRM = false
    const isSafari = /.*Version.*Safari.*/.test(navigator.userAgent)
    if (status === 'success' && dataFetched.drm && dataFetched.drm.widevine && dataFetched.drm.fairplay) {
      drmStreamUrl = isSafari ? dataFetched.drm.fairplay.streamUrl : dataFetched.drm.widevine.streamUrl
    }
    isDRM = drmStreamUrl ? true : false

    const loadPlayer = status === 'success' && ((isDRM && vuidStatus === 'success') || !isDRM)

    return (
      <>
        <div>
          <Header stickyOff searchOff isDark={0} activeMenu="channels" libraryOff {...this.props} />
        </div>
        <div className={styles.channels_container}>
          <div className={styles.video_container}>
            {loadPlayer ? (
              <Theoplayer className={customTheoplayer} showBackBtn={false} subtitles={this.subtitles()} handleOnVideoLoad={this.handleOnVideoLoad} poster={poster} {...videoSettings} />
            ) : (
              <div>Video Not Available</div> // styling later
            )}
          </div>
          {channelsPlaylist.meta.status === 'success' &&
            programmeGuides.data &&
            channelSchedule.length > 0 && <Schedule scheduleList={channelSchedule} handleSelectChannel={this.handleSelectChannel} activeChannelId={this.state.activeChannelId} {...this.props} />}
          {programmeGuides.error && !programmeGuides.data && <div> terjadi kesalahan </div>}
        </div>
        {/* {!dataFetched && status === 'error' && <MovieDetailError message={error} />} */}
      </>
    )
  }
}

const mapStateToProps = state => ({
  channelSchedule: getChannelProgrammeGuides(state),
  ...state,
})

const mapDispatchToProps = dispatch => ({
  fetchChannelsPlaylist: () => dispatch(channelActions.getChannelsPlaylist()),
  fetchChannelSchedule: date => dispatch(channelActions.getProgrammeGuides(date)),
  fetchVideoByid: videoId => dispatch(movieDetailActions.getMovieDetail(videoId)),
  getVUID: deviceId => dispatch(getVUID(deviceId)),
  getVUID_retry: () => dispatch(getVUID_retry()),
})

export default compose(withStyles(styles), connect(mapStateToProps, mapDispatchToProps))(Channels)

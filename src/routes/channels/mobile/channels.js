import React, { Component } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import moment from 'moment'
import { IoIosArrowDown } from 'react-icons/io'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
const { getComponent } = require('@supersoccer/gandalf')
const Theoplayer = getComponent('theoplayer')

import * as movieDetailActions from '@actions/movie-detail'
import { getVUID, getVUID_retry } from '@actions/vuid'
import channelActions from '@actions/channels'

import DRMConfig from '@source/lib/DRMConfig'
import { defaultVideoSetting } from '@source/lib/theoplayerConfig.js'
import history from '@source/history'
import { formatDateTime, addDateTime, isSameDay } from '@source/lib/dateTimeUtil'

import Header from '@components/Header'
import DropdownList from '@components/DropdownList'
import MovieDetailError from '@components/common/error'

import Schedule from './schedule'
import { getChannelProgrammeGuides } from '../selectors'
import { customTheoplayer } from './theoplayer-style'
import styles from './channels.css'

class Channels extends Component {
  state = {
    activeChannel: '',
    activeChannelId: '',
    activeDate: formatDateTime(Date.now() / 1000, 'ddd, DD MMM YYYY'),
    scheduleDateList: [],
    scheduleList: [],
  }

  componentDidMount() {
    const selectedDate = {
      fullDate: moment().format('YYYYMMDD'),
    }
    const { fetchChannelSchedule, fetchChannelsPlaylist, user, fetchVideoByid, movieId, getVUID } = this.props
    fetchChannelsPlaylist('channels-m').then(() => fetchChannelSchedule(selectedDate))

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

  handleSelectDate = date => {
    // const value = e.target.options[e.target.options.selectedIndex].innerText
    const selectedDate = {
      fullDate: moment(date).format('YYYYMMDD'),
    }
    this.props.fetchChannelSchedule(selectedDate).then(() => {
      const filteredSchedule = this.props.channelSchedule.find(item => item.id == this.state.activeChannelId)
      console.log('this.props.filtered schedule', this.props.channelSchedule)
      this.setState({
        activeDate: date,
        scheduleList: filteredSchedule.videos ? filteredSchedule.videos : [],
      })
    })
  }

  handleSelectChannel = id => {
    const filteredSchedule = this.props.channelSchedule.find(item => item.id == id)
    if (filteredSchedule && this.props.movieDetail.meta.status === 'success') {
      const time = filteredSchedule.videos.length > 0 ? filteredSchedule.videos[0].startTime : Date.now() / 1000

      this.setState({
        activeChannel: filteredSchedule.title,
        activeChannelId: id,
        activeDate: formatDateTime(time, 'ddd, DD MMM YYYY'),
        scheduleList: filteredSchedule.videos ? filteredSchedule.videos : [],
      })
      history.push(`/channels/${id}`)
    }
  }

  getCalendar = () => {
    let scheduleDateList = []
    for (var i = 0; i < 7; i++) {
      const date = new Date(addDateTime(null, i, 'days'))
      const dtTimestamp = date.getTime()
      const formattedDateTime = formatDateTime(dtTimestamp / 1000, 'ddd, DD MMM YYYY')
      scheduleDateList.push({ id: formattedDateTime, title: formattedDateTime })
    }

    return scheduleDateList
  }

  subtitles = () => {
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

  handleOnVideoLoad = player => {
    this.player = player
  }

  render() {
    const { scheduleList, activeDate, activeChannel, activeChannelId } = this.state
    const { channelsPlaylist, programmeGuides, movieId, channelSchedule } = this.props
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
        {
          dataFetched && (
            <>
              <div className={styles.header_container}>
                <Header shadowMobile libraryOff className={styles.placeholder__header} isDark={0} activeMenu="channels" isMobile {...this.props} />
              </div>
              <div className={styles.channels_container}>
                {channelsPlaylist.meta.status === 'success' && (
                  <>
                    <div className={styles.channels_top_wrapper}>
                      {programmeGuides.data &&
                        channelSchedule &&
                        activeChannel &&
                        activeChannelId && (
                          <>
                            <div className={styles.channels_list_wrapper}>
                              <DropdownList className={styles.channels_dropdown_container} dataList={channelSchedule} activeId={activeChannelId} onClick={this.handleSelectChannel} />
                            </div>

                            <div className={styles.schedule_date_wrapper}>
                              <DropdownList className={styles.channels_dropdown_container} dataList={this.getCalendar()} activeId={activeDate} onClick={this.handleSelectDate} />
                            </div>
                          </>
                        )}
                    </div>
                    <div className={styles.video_container}>
                      {loadPlayer ? (
                        <Theoplayer className={customTheoplayer} showBackBtn={false} subtitles={this.subtitles()} handleOnVideoLoad={this.handleOnVideoLoad} poster={poster} {...videoSettings} />
                      ) : (
                          <div>Video Not Available</div> // styling later
                        )}
                    </div>
                    {programmeGuides.data &&
                      scheduleList.length > 0 && (
                        <Schedule scheduleList={scheduleList} activeDate={activeDate} activeChannelId={activeChannelId} handleSelectChannel={this.handleSelectChannel} {...this.props} />
                      )}
                  </>
                )}
              </div>
            </>
          )
        }
        {!dataFetched && status === 'error' && <MovieDetailError message={error} />}
      </>
    )
  }
}

const mapStateToProps = state => ({
  channelSchedule: getChannelProgrammeGuides(state),
  ...state,
})

const mapDispatchToProps = dispatch => ({
  fetchChannelsPlaylist: id => dispatch(channelActions.getChannelsPlaylist(id)),
  fetchChannelSchedule: date => dispatch(channelActions.getProgrammeGuides(date)),
  fetchVideoByid: videoId => dispatch(movieDetailActions.getMovieDetail(videoId)),
  getVUID: deviceId => dispatch(getVUID(deviceId)),
  getVUID_retry: () => dispatch(getVUID_retry()),
})

export default compose(withStyles(styles), connect(mapStateToProps, mapDispatchToProps))(Channels)

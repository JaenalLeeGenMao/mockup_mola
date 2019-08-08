import React, { Component } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import moment from 'moment'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import { get } from 'axios'

import * as movieDetailActions from '@actions/movie-detail'
import { getVUID, getVUID_retry } from '@actions/vuid'
import channelActions from '@actions/channels'

import DRMConfig from '@source/lib/DRMConfig'
import config from '@source/config'
import { defaultVideoSetting } from '@source/lib/theoplayerConfig.js'
import history from '@source/history'
import { formatDateTime } from '@source/lib/dateTimeUtil'

import Header from '@components/Header'
import DropdownList from '@components/DropdownList'
import RedirectToApps from '@components/RedirectToApps'
import VerticalCalendar from '@components/VerticalCalendar'
import MatchList from '@components/MatchList'

import Placeholder from './placeholder'
import { getChannelProgrammeGuides } from '../selectors'
import { customTheoplayer } from './theoplayer-style'
import styles from './channels.css'

class Channels extends Component {
  state = {
    activeChannel: '',
    activeChannelId: '',
    activeDate: formatDateTime(Date.now() / 1000, 'DD MMM'),
    scheduleDateList: [],
    scheduleList: [],
    android_redirect_to_app: false,
    ios_redirect_to_app: false,
    startWeekDate: moment().startOf('isoWeek'),
    selectedWeek: '',
  }

  componentDidMount() {
    const selectedDate = {
      fullDate: moment().format('YYYYMMDD'),
      timezone: 7,
    }
    const { fetchChannelSchedule, fetchChannelsPlaylist, user, fetchVideoByid, movieId, getVUID } = this.props
    this.getConfig()
    fetchChannelsPlaylist('channels-m').then(() => {
      const video = this.props.channelsPlaylist.data.find(item => item.id === movieId)
      const id =
        video && video.id
          ? video.id
          : this.props.channelsPlaylist.data.length > 0 ? this.props.channelsPlaylist.data[0].id : ''
      fetchVideoByid(id)
      fetchChannelSchedule(selectedDate).then(() => {
        const filteredSchedule = this.props.channelSchedule.find(item => item.id == movieId)
        const time =
          filteredSchedule && filteredSchedule.videos.length > 0
            ? filteredSchedule.videos[0].startTime
            : Date.now() / 1000

        this.setState({
          activeChannel: filteredSchedule && filteredSchedule.title ? filteredSchedule.title : '',
          activeChannelId: movieId,
          activeDate: formatDateTime(time, 'DD MMM'),
          scheduleList: filteredSchedule && filteredSchedule.videos ? filteredSchedule.videos : [],
        })
      })
    })

    const deviceId = user.uid ? user.uid : DRMConfig.getOrCreateDeviceId()
    getVUID(deviceId)
  }

  componentDidUpdate(prevProps, prevState) {
    const { channelsPlaylist, channelSchedule, movieDetail, movieId, fetchVideoByid } = this.props
    if (movieDetail.meta.status === 'success' && prevProps.movieId != movieId) {
      fetchVideoByid(movieId)
    }
  }

  getConfig = async () => {
    await get('/api/v2/config/app-params').then(result => {
      if (result.data) {
        const { android_redirect_to_app, ios_redirect_to_app } = result.data.data.attributes
        this.setState({
          android_redirect_to_app,
          ios_redirect_to_app,
        })
      }
    })
  }

  handleSelectDate = date => {
    const strDate = new Date(date * 1000)
    const selectedDate = {
      fullDate: moment(strDate).format('YYYYMMDD'),
      dayMonth: formatDateTime(date, 'DD MMM'),
      timezone: 7,
    }

    this.props.fetchChannelSchedule(selectedDate).then(() => {
      const filteredSchedule = this.props.channelSchedule.find(item => item.id == this.state.activeChannelId)
      this.setState({
        scheduleList: filteredSchedule && filteredSchedule.videos ? filteredSchedule.videos : [],
        activeDate: selectedDate.dayMonth,
      })
    })
  }

  handleSelectChannel = id => {
    const filteredSchedule = this.props.channelSchedule.find(item => item.id == id)
    const time =
      filteredSchedule && filteredSchedule.videos.length > 0 ? filteredSchedule.videos[0].startTime : Date.now() / 1000

    this.setState({
      activeChannel: filteredSchedule && filteredSchedule.title ? filteredSchedule.title : '',
      activeChannelId: id,
      activeDate: formatDateTime(time, 'DD MMM'),
      scheduleList: filteredSchedule && filteredSchedule.videos ? filteredSchedule.videos : [],
    })
    history.push(`/channels/${id}`)
  }

  handleWeekClick = value => {
    let startWeekDate = ''
    let swdTimestamp = ''
    let date = ''
    let unixDate
    if (value == 'thisweek') {
      //thisMonday
      startWeekDate = moment().startOf('isoWeek')
      date = new Date(moment().startOf('date'))
      swdTimestamp = formatDateTime(date / 1000, 'DD MMM')
      unixDate = moment(date).unix()
    } else if (value == 'nextweek') {
      //nextWeek
      startWeekDate = moment().day(8)
      date = new Date(moment(startWeekDate).startOf('date'))
      swdTimestamp = formatDateTime(date / 1000, 'DD MMM')
      unixDate = moment(date).unix()
    }

    this.setState(
      {
        selectedWeek: value,
        activeDate: swdTimestamp,
        startWeekDate: startWeekDate,
      },
      () => this.handleSelectDate(unixDate)
    )
  }

  subtitles = () => {
    const { movieDetail } = this.props
    const subtitles =
      movieDetail.data.length > 0 && movieDetail.data[0].subtitles ? movieDetail.data[0].subtitles : null

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

  handlePlayMovie = () => {
    const { movieId } = this.props
    const domain = config.endpoints.domain
    const url = encodeURIComponent(`${domain}/download-app/${movieId}`)
    document.location = `intent://mola.tv/watch?v=${movieId}/#Intent;scheme=molaapp;package=tv.mola.app;S.browser_fallback_url=${url};end`
  }

  handlePlayMovieApple = () => {
    const { movieId } = this.props
    const domain = config.endpoints.domain
    const url = `${domain}/download-app/${movieId}`
    document.location = `molaapp://mola.tv/watch?v=${movieId}`
    setTimeout(function() {
      window.location.href = url
    }, 250)
  }

  handleOnVideoLoad = player => {
    this.player = player
  }

  render() {
    const {
      scheduleList,
      activeDate,
      activeChannel,
      activeChannelId,
      android_redirect_to_app,
      ios_redirect_to_app,
      startWeekDate,
      selectedWeek,
    } = this.state
    const { channelsPlaylist, programmeGuides, movieId, channelSchedule } = this.props
    const { meta: { status, error }, data } = this.props.movieDetail
    const apiFetched = status === 'success' && data.length > 0
    const dataFetched = apiFetched ? data[0] : undefined
    const poster = apiFetched ? dataFetched.background.landscape : ''

    const { user } = this.props
    const { data: vuid, meta: { status: vuidStatus } } = this.props.vuid

    const defaultVidSetting =
      status === 'success' ? defaultVideoSetting(user, dataFetched, vuidStatus === 'success' ? vuid : '') : {}

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
        <div className={styles.header_container}>
          <Header
            shadowMobile
            libraryOff
            className={styles.placeholder__header}
            isDark={0}
            activeMenu="channels"
            isMobile
            {...this.props}
          />
        </div>
        <div className={styles.channels_container}>
          {channelsPlaylist.meta.status === 'success' && (
            <>
              <div className={styles.channels_top_wrapper}>
                <div className={styles.channels_list_wrapper}>
                  <DropdownList
                    className={styles.channels_dropdown_container}
                    dataList={channelsPlaylist.data}
                    activeId={activeChannelId}
                    onClick={this.handleSelectChannel}
                  />
                </div>
              </div>
              <div className={styles.video_container}>
                {loadPlayer && (
                  <RedirectToApps
                    poster={poster}
                    android_redirect_to_app={android_redirect_to_app}
                    ios_redirect_to_app={ios_redirect_to_app}
                    subtitles={this.subtitles()}
                    handlePlayMovieApple={this.handlePlayMovieApple}
                    handlePlayMovie={this.handlePlayMovie}
                    handleOnVideoLoad={this.handleOnVideoLoad}
                    videoSettings={videoSettings}
                    customTheoplayer={customTheoplayer}
                  />
                )}
              </div>
              <div className={styles.epg__channels__container}>
                {programmeGuides.loading && <Placeholder />}
                <div className={styles.epg__card}>
                  <div className={styles.epg__infinite__scroll} style={{ height: `${window.innerHeight - 313}px` }}>
                    {programmeGuides.data &&
                      scheduleList.length > 0 &&
                      scheduleList.filter(list => formatDateTime(list.start, 'DD MMM') == activeDate).map(dt => (
                        <MatchList key={dt.id} data={dt} noClickAble isChannel />
                        // <Schedule scheduleList={scheduleList} activeDate={activeDate} activeChannelId={activeChannelId} handleSelectChannel={this.handleSelectChannel} {...this.props} />
                      ))}
                    {programmeGuides.error &&
                      !programmeGuides.loading &&
                      !programmeGuides.data && <div className={styles.epg__no__schedule}> No Schedule </div>}
                  </div>
                </div>
                <div className={styles.epg__calendar}>
                  <VerticalCalendar
                    handleCategoryFilter={this.handleSelectDate}
                    selectedDate={activeDate}
                    // schedule={scheduleList}
                    isMobile
                    isChannel
                  />
                </div>
              </div>
            </>
          )}
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
  fetchChannelsPlaylist: id => dispatch(channelActions.getChannelsPlaylist(id)),
  fetchChannelSchedule: date => dispatch(channelActions.getProgrammeGuides(date)),
  fetchVideoByid: videoId => dispatch(movieDetailActions.getMovieDetail(videoId)),
  getVUID: deviceId => dispatch(getVUID(deviceId)),
  getVUID_retry: () => dispatch(getVUID_retry()),
})

export default compose(withStyles(styles), connect(mapStateToProps, mapDispatchToProps))(Channels)

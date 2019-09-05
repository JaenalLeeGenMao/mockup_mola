import React, { Component } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import moment from 'moment'
import withStyles from 'isomorphic-style-loader/lib/withStyles'

import * as movieDetailActions from '@actions/movie-detail'
import { getVUID, getVUID_retry } from '@actions/vuid'
import channelActions from '@actions/channels'

import DRMConfig from '@source/lib/DRMConfig'
import config from '@source/config'
import { defaultVideoSetting } from '@source/lib/theoplayerConfig.js'
import history from '@source/history'
import { formatDateTime } from '@source/lib/dateTimeUtil'
import { globalTracker } from '@source/lib/globalTracker'

import Header from '@components/Header'
import DropdownList from '@components/DropdownList'
import RedirectToApps from '@components/RedirectToApps'
import VerticalCalendar from '@components/VerticalCalendar'
import MatchList from '@components/MatchList'
import PlatformCheckMobile from '@components/PlatformCheckMobile'
import LazyLoad from '@components/common/Lazyload'

import Placeholder from './placeholder'
import { getChannelProgrammeGuides } from '../selectors'
import { customTheoplayer } from './theoplayer-style'
import styles from './channels.css'

let errorFlag = 0
import iconRed from './assets/merah.png'
import iconGreen from './assets/hijau.png'

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
    block: false,
    isHeader: false,
    status: [],
    iconStatus: [],
    iconGreen,
    name: '',
  }

  componentDidMount() {
    const selectedDate = {
      fullDate: moment().format('YYYYMMDD'),
      timezone: 0,
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
      this.eventVideosTracker(id)
      fetchChannelSchedule(selectedDate).then(() => {
        const filteredSchedule = this.props.channelSchedule.find(item => item.id == id)
        const time =
          filteredSchedule && filteredSchedule.videos.length > 0
            ? filteredSchedule.videos[0].startTime
            : Date.now() / 1000

        this.setState({
          activeChannel: filteredSchedule && filteredSchedule.title ? filteredSchedule.title : '',
          activeChannelId: id,
          activeDate: formatDateTime(time, 'DD MMM'),
          scheduleList: filteredSchedule && filteredSchedule.videos ? filteredSchedule.videos : [],
        })
      })
    })

    const deviceId = user.uid ? user.uid : DRMConfig.getOrCreateDeviceId()
    getVUID(deviceId)

    this.theoVolumeInfo = {}
    try {
      const theoVolumeInfo = localStorage.getItem('theoplayer-volume-info') || '{"muted": false,"volume": 1}'
      if (theoVolumeInfo != null) {
        this.theoVolumeInfo = JSON.parse(theoVolumeInfo)
      }
    } catch (err) { }
  }

  componentDidUpdate(prevProps, prevState) {
    const { channelsPlaylist, channelSchedule, movieDetail, movieId, fetchVideoByid } = this.props
    const { status } = this.state

    if (movieDetail.meta.status === 'success' && prevProps.movieId != movieId) {
      const id = movieId ? movieId : prevState.activeChannelId
      fetchVideoByid(id)
    }

    if (prevProps.movieDetail.data.length == 0 && movieDetail.data.length !== prevProps.movieDetail.data.length) {
      const dataFetch = movieDetail.data[0]

      const filterForBlockFind = dataFetch.platforms.find(dt => dt.id === 1 && dt.status === 1)

      if (filterForBlockFind) {
        this.setState({ block: false })
      } else {
        const filterForBlock = dataFetch.platforms
        // console.log('status blocker dong', filterForBlock)
        const isBlocked = filterForBlock.length > 0
        let stat = []
        let state = []
        let img = []
        let st = status

        if (isBlocked) {
          filterForBlock.forEach(dt => {
            st.push(dt.status)
            if (dt.status === 1) {
              stat.push(iconGreen)
            } else {
              stat.push(iconRed)
            }

            state.push(dt.name)
            img.push(dt.imageUrl)
          })
        }
        this.setState({ name: state, imageUrl: img, status: st, block: true, iconStatus: stat })
      }
    }
  }

  eventVideosTracker = id => {
    const payload = {
      window,
      videoId: id,
      user: this.props.user,
      event: 'event_videos',
    }
    globalTracker(payload)
  }

  getConfig = async () => {
    const { configParams } = this.props
    if (configParams.data) {
      const { android_redirect_to_app, ios_redirect_to_app } = configParams.data
      this.setState({
        android_redirect_to_app,
        ios_redirect_to_app,
      })
    }
  }

  handleSelectDate = date => {
    const strDate = new Date(date * 1000)
    const selectedDate = {
      fullDate: moment(strDate).format('YYYYMMDD'),
      dayMonth: formatDateTime(date, 'DD MMM'),
      timezone: 0,
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
    const setState = {
      activeChannel: filteredSchedule && filteredSchedule.title ? filteredSchedule.title : '',
      activeChannelId: id,
      activeDate: formatDateTime(time, 'DD MMM'),
      scheduleList: filteredSchedule && filteredSchedule.videos ? filteredSchedule.videos : [],
    }
    if (this.props.movieId && this.props.movieId == id) {
      this.setState(setState)
    } else {
      this.setState({
        block: false,
        ...setState,
      })
    }

    this.eventVideosTracker(id)
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

  handleOnVideoVolumeChange = player => {
    if (player) {
      const playerVolumeInfo = {
        volume: player.volume,
        muted: player.muted,
      }
      try {
        localStorage.setItem('theoplayer-volume-info', JSON.stringify(playerVolumeInfo))
      } catch (err) { }
    }
  }

  subtitles = () => {
    const { movieDetail } = this.props
    const subtitles =
      movieDetail.data.length > 0 && movieDetail.data[0].subtitles ? movieDetail.data[0].subtitles : null

    const myTheoPlayer =
      subtitles &&
      subtitles.length > 0 &&
      subtitles.map(({ subtitleUrl, country, type = 'subtitles' }) => {
        const arrSubType = subtitleUrl.split('.')
        const subtitleType = arrSubType[arrSubType.length - 1] || 'vtt'
        return {
          kind: type,
          src: subtitleUrl,
          label: country,
          type: subtitleType,
        }
      })

    return myTheoPlayer
  }

  handlePlayMovie = () => {
    const { movieId } = this.props
    const domain = config.endpoints.domain
    const source = 'redirect-from-browser'
    const url = encodeURIComponent(`${domain}/download-app/${movieId}`)
    document.location = `intent://mola.tv/channels/${movieId}?utm_source=${source}/#Intent;scheme=molaapp;package=tv.mola.app;S.browser_fallback_url=${url};end`
  }

  handlePlayMovieApple = () => {
    const { movieId } = this.props
    const domain = config.endpoints.domain
    const source = 'redirect-from-browser'
    const url = `${domain}/download-app/${movieId}`
    document.location = `molaapp://mola.tv/channels/${movieId}?utm_source=${source}`
    setTimeout(function () {
      window.location.href = url
    }, 250)
  }

  handleOnReadyStateChange = player => {
    this.player = player

    player.addEventListener('contentprotectionerror', e => {
      if (e.error.toLowerCase() == 'error during license server request') {
        errorFlag = errorFlag + 1
        if (errorFlag < 2) {
          this.props.getVUID_retry()
        }
      } else {
        // console.log('ERROR content protection', e)
        // this.handleVideoError(e);
      }
    })
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
      block,
      isHeader,
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
      ...this.theoVolumeInfo,
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
                  <LazyLoad>
                    <DropdownList
                      className={styles.channels_dropdown_container}
                      dataList={channelsPlaylist.data}
                      activeId={activeChannelId}
                      onClick={this.handleSelectChannel}
                    />
                  </LazyLoad>
                </div>
              </div>

              <div className={styles.video_container}>
                {!block && loadPlayer ? (
                  <RedirectToApps
                    poster={poster}
                    android_redirect_to_app={android_redirect_to_app}
                    ios_redirect_to_app={ios_redirect_to_app}
                    subtitles={this.subtitles()}
                    handlePlayMovieApple={this.handlePlayMovieApple}
                    handlePlayMovie={this.handlePlayMovie}
                    handleOnReadyStateChange={this.handleOnReadyStateChange}
                    videoSettings={videoSettings}
                    customTheoplayer={customTheoplayer}
                    handleOnVideoVolumeChange={this.handleOnVideoVolumeChange}
                  />
                ) : (
                    block && (
                      <PlatformCheckMobile
                        iconStatus={this.state.iconStatus}
                        status={this.state.status}
                        icon={this.state.imageUrl}
                        name={this.state.name}
                        portraitPoster={apiFetched ? dataFetched.background.landscape : ''}
                        user={this.props.user}
                        videoId={activeChannelId}
                        isHeader={isHeader}
                      />
                    )
                  )}
              </div>

              {!block && (
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
              )}
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

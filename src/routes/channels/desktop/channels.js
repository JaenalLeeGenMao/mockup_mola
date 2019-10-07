import React, { Component } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import moment from 'moment'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import _isUndefined from 'lodash/isUndefined'
import _get from 'lodash/get'
const { getComponent } = require('@supersoccer/gandalf')
const Theoplayer = getComponent('theoplayer')

import * as movieDetailActions from '@actions/movie-detail'
import { getVUID, getVUID_retry } from '@actions/vuid'
import channelActions from '@actions/channels'

import DRMConfig from '@source/lib/DRMConfig'
import { defaultVideoSetting } from '@source/lib/theoplayerConfig.js'
import history from '@source/history'
import { formatDateTime } from '@source/lib/dateTimeUtil'
import { globalTracker } from '@source/lib/globalTracker'

import Header from '@components/Header'
import HorizontalPlaylist from '@components/HorizontalPlaylist'
import VerticalCalendar from '@components/VerticalCalendar'
import PlatformDesktop from '@components/PlatformCheck'
import OfflineNoticePopup from '@components/OfflineNoticePopup'

import Placeholder from './placeholder'
import LoaderVideoBox from './loaderVideoBox'
import ScheduleCard from './scheduleCard'
import PrimaryMenu from './primaryMenu'
import SecondaryMenu from './secondaryMenu'
import ChannelCalendar from './channelCalendar'
import { getChannelProgrammeGuides } from '../selectors'
import { customTheoplayer } from './theoplayer-style'

import styles from './channels.css'

let errorFlag = 0
class Channels extends Component {
  state = {
    activeChannel: '',
    activeChannelId: '',
    activeDate: formatDateTime(Date.now() / 1000, 'DD MMM'),
    scheduleList: [],
    hidePlaylist: true,
    notice_bar_message: 'Siaran Percobaan',
    toggleInfoBar: true,
    imageUrl: [],
    block: false,
    isOnline: navigator && typeof navigator.onLine === 'boolean' ? navigator.onLine : true,
    showOfflinePopup: false,
    errorLicense: false,
    defaultVidSetting: null,
  }

  componentDidMount() {
    const { fetchChannelsPlaylist, movieId, user, getVUID } = this.props

    this.getConfig()
    const deviceId = user.uid ? user.uid : DRMConfig.getOrCreateDeviceId()
    getVUID(deviceId)

    if (!_isUndefined(window)) {
      window.addEventListener('online', this.goOnline)
      window.addEventListener('offline', this.goOffline)
      window.addEventListener('scroll', this.handleScroll)
    }

    this.theoVolumeInfo = {}
    try {
      const theoVolumeInfo = localStorage.getItem('theoplayer-volume-info') || '{"muted": false,"volume": 1}'
      if (theoVolumeInfo != null) {
        this.theoVolumeInfo = JSON.parse(theoVolumeInfo)
      }
    } catch (err) {}

    fetchChannelsPlaylist('channels-m').then(() => {
      const video = this.props.channelsPlaylist.data.find(item => item.id === movieId)
      const id =
        video && video.id
          ? video.id
          : this.props.channelsPlaylist.data.length > 0 ? this.props.channelsPlaylist.data[0].id : ''
      this.setDefaultVideoSetup(id)
      this.eventVideosTracker(id)
      this.setFirstRenderSchedule(id)
    })
  }

  componentDidUpdate(prevProps, prevState) {
    const { movieDetail, movieId } = this.props

    if (movieDetail.meta.status !== prevProps.movieDetail.data.status && prevProps.movieId != movieId) {
      const id = movieId ? movieId : prevState.activeChannelId
      this.setDefaultVideoSetup(id)
    }

    if (prevProps.movieDetail.data.length == 0 && movieDetail.data.length !== prevProps.movieDetail.data.length) {
      const dataFetch = movieDetail.data[0]
      const filterForBlockFind = dataFetch.platforms.find(dt => dt.id === 1 && dt.status === 1)

      if (filterForBlockFind) {
        this.setState({ block: false })
      } else {
        this.setState({ block: true })
      }
    }
  }

  componentWillUnmount() {
    if (!_isUndefined(window)) {
      window.removeEventListener('online', this.goOnline)
      window.removeEventListener('offline', this.goOffline)
      window.removeEventListener('scroll', this.handleScroll)
    }
  }

  setFirstRenderSchedule = id => {
    const selectedDate = {
      fullDate: moment().format('YYYYMMDD'),
      timezone: 0,
    }
    this.props.fetchChannelSchedule(selectedDate).then(() => {
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
  }

  setDefaultVideoSetup = id => {
    this.props.fetchVideoByid(id).then(() => {
      if (this.props.movieDetail && this.props.movieDetail.meta.status === 'success') {
        const { user, movieDetail, configParams } = this.props
        const { data: vuid, meta: { status: vuidStatus } } = this.props.vuid
        const dataFetched = movieDetail.data.length > 0 ? movieDetail.data[0] : undefined
        const videoSettingProps = {
          akamai_analytic_enabled:
            configParams && configParams.data ? configParams.data.akamai_analytic_enabled : false,
        }
        const defaultVidSetting = defaultVideoSetting(
          user,
          dataFetched,
          vuidStatus === 'success' ? vuid : '',
          null,
          videoSettingProps
        )
        this.setState({
          defaultVidSetting: defaultVidSetting,
        })
      }
    })
  }

  goOnline = () => {
    if (!this.state.isOnline) {
      this.setState({
        isOnline: true,
      })
    }
  }

  goOffline = () => {
    if (this.state.isOnline) {
      this.setState({
        isOnline: false,
      })
    }
  }

  handleCloseOfflinePopup = () => {
    this.setState({
      showOfflinePopup: false,
    })
  }

  detectorConnection = player => {
    if (!this.state.isOnline && Math.ceil(player.currentTime) >= Math.floor(player.buffered.end(0))) {
      setTimeout(() => {
        this.setState({
          showOfflinePopup: true,
        })
      }, 3000)
    } else if (this.state.isOnline && this.state.showOfflinePopup) {
      this.setState({
        showOfflinePopup: false,
      })
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
      const { notice_bar_enabled, notice_bar_message } = configParams.data
      this.setState({
        toggleInfoBar: notice_bar_enabled,
        notice_bar_message,
      })
    }
  }

  handleScroll = () => {
    if (window.innerHeight <= 720) {
      if (window.scrollY > window.innerHeight - 110) {
        this.setState({
          hidePlaylist: false,
        })
      } else if (window.scrollY <= window.innerHeight - 160) {
        this.setState({
          hidePlaylist: true,
        })
      }
    } else {
      if (window.scrollY > window.innerHeight - 135) {
        this.setState({
          hidePlaylist: false,
        })
      } else if (window.scrollY <= window.innerHeight - 160) {
        this.setState({
          hidePlaylist: true,
        })
      }
    }
  }

  handleOnReadyStateChange = player => {
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

    if (player && player.buffered.length > 0) {
      this.detectorConnection(player)
    }

    player.addEventListener('contentprotectionerror', e => {
      if (e.error.toLowerCase() == 'error during license server request') {
        errorFlag = errorFlag + 1
        if (errorFlag < 2) {
          this.props.getVUID_retry()
        } else if (errorFlag > 6) {
          //every error license will execute six times
          this.setState({ errorLicense: true })
        }
      } else {
        // console.log('ERROR content protection', e)
        // this.handleVideoError(e);
      }
    })
  }

  handleOnVideoPlaying = (status, player) => {
    const isSafari = /.*Version.*Safari.*/.test(navigator.userAgent)
    let i = 0
    if (isSafari && player.textTracks && player.textTracks.length > 0) {
      // to hide empty subtitle in safari
      player.textTracks.map(element => {
        if (!element.id) {
          if (player.textTracks.length > 1) {
            const el = document.getElementsByClassName('theo-menu-item vjs-menu-item theo-text-track-menu-item')
            el[i].style.display = 'none'
          } else {
            const subtitle = document.querySelector('.vjs-icon-subtitles')
            subtitle.style.display = 'none'
          }
        } else {
          i++
        }
      })
    }
  }

  handleOnVideoVolumeChange = player => {
    if (player) {
      const playerVolumeInfo = {
        volume: player.volume,
        muted: player.muted,
      }
      try {
        localStorage.setItem('theoplayer-volume-info', JSON.stringify(playerVolumeInfo))
      } catch (err) {}
    }
  }

  subtitles() {
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
        defaultVidSetting: null,
        block: false,
        ...setState,
      })
    }

    this.eventVideosTracker(id)
    history.push(`/channels/${id}`)
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

  handleCloseInfoBar = () => {
    this.setState({
      toggleInfoBar: false,
    })
  }

  render() {
    const { programmeGuides, channelsPlaylist } = this.props
    const {
      activeChannelId,
      scheduleList,
      activeDate,
      hidePlaylist,
      block,
      toggleInfoBar,
      notice_bar_message,
      showOfflinePopup,
      errorLicense,
      defaultVidSetting,
    } = this.state
    const { meta: { status, error }, data } = this.props.movieDetail
    const apiFetched = status === 'success' && data.length > 0
    const dataFetched = apiFetched ? data[0] : undefined

    const { user } = this.props
    const { data: vuid, meta: { status: vuidStatus } } = this.props.vuid

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
        <div>
          <Header stickyOff searchOff isDark={0} activeMenu="channels" libraryOff {...this.props} />
        </div>
        {channelsPlaylist.meta.status === 'loading' && <LoaderVideoBox />}
        {channelsPlaylist.meta.status === 'success' && (
          <div className={styles.channels_container} id="video-player-root">
            <div className={!toggleInfoBar ? styles.video_container : styles.video_container_with_infobar}>
              {showOfflinePopup && <OfflineNoticePopup />}
              {!block &&
                toggleInfoBar && (
                  <div className={styles.channel__infobar}>
                    <div className={styles.channel__infobar__container}>
                      <div className={styles.channel__infobar__text}>{notice_bar_message}</div>
                      <div className={styles.channel__infobar__close} onClick={this.handleCloseInfoBar}>
                        <span />
                      </div>
                    </div>
                  </div>
                )}
              {!block &&
                !errorLicense &&
                loadPlayer &&
                defaultVidSetting && (
                  <Theoplayer
                    className={customTheoplayer}
                    showBackBtn={false}
                    subtitles={this.subtitles()}
                    handleOnVideoVolumeChange={this.handleOnVideoVolumeChange}
                    handleOnReadyStateChange={this.handleOnReadyStateChange}
                    handleOnVideoPlaying={this.handleOnVideoPlaying}
                    // poster={poster}
                    {...videoSettings}
                  />
                )}
              {block && loadPlayer && <PlatformDesktop isChannel {...this.props} videoId={activeChannelId} />}
              {!loadPlayer &&
                status !== 'loading' && <div className={styles.video__unavailable}>Video Not Available</div>}
              {!block &&
                errorLicense &&
                loadPlayer && (
                  <div className={styles.video__unavailable}>
                    {' '}
                    Error during license server request. Please refresh the browser.
                  </div>
                )}
            </div>
            <PrimaryMenu
              activeChannelId={activeChannelId}
              handleSelectChannel={this.handleSelectChannel}
              channelsPlaylist={channelsPlaylist.data}
            />
            <div className={styles.epg__list__container}>
              <SecondaryMenu
                handleCategoryFilter={this.handleSelectChannel}
                genreSpoCategory={channelsPlaylist.data}
                filterByLeague={activeChannelId}
                hidePlaylist={hidePlaylist}
              />
              <div className={styles.epg__header__bg} />
              <div className={styles.epg__grid__container}>
                <span />
                {programmeGuides.loading && <Placeholder />}
                {!programmeGuides.loading &&
                  programmeGuides.data &&
                  scheduleList.length > 0 && (
                    <ScheduleCard
                      scheduleList={scheduleList}
                      activeDate={activeDate}
                      activeChannelId={activeChannelId}
                    />
                  )}
                {(programmeGuides.error && !programmeGuides.loading && !programmeGuides.data) ||
                  (!programmeGuides.error &&
                    !programmeGuides.loading &&
                    scheduleList.length === 0 && <div className={styles.epg__no__schedule}> No Schedule </div>)}
                <VerticalCalendar handleCategoryFilter={this.handleSelectDate} selectedDate={activeDate} isChannel />
              </div>
            </div>
          </div>
        )}
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

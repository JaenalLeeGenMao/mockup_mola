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
import { globalTracker } from '@source/lib/globalTracker'

import Header from '@components/Header'
import HorizontalPlaylist from '@components/HorizontalPlaylist'
import VerticalCalendar from '@components/VerticalCalendar'
import PlatformDesktop from '@components/PlatformCheck'

import Placeholder from './placeholder'
import LoaderVideoBox from './loaderVideoBox'
import ScheduleCard from './scheduleCard'
import PrimaryMenu from './primaryMenu'
import SecondaryMenu from './secondaryMenu'
import ChannelCalendar from './channelCalendar'
import { getChannelProgrammeGuides } from '../selectors'
import { customTheoplayer } from './theoplayer-style'

import iconRed from './assets/merah.png'
import iconGreen from './assets/hijau.png'

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
    status: [],
    iconStatus: [],
    iconGreen,
    name: '',
  }

  componentDidMount() {
    const { fetchChannelSchedule, fetchChannelsPlaylist, movieId, fetchVideoByid, user, getVUID } = this.props
    const selectedDate = {
      fullDate: moment().format('YYYYMMDD'),
      timezone: 0,
    }
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

    window.addEventListener('scroll', this.handleScroll)

    this.theoVolumeInfo = {}
    try {
      const theoVolumeInfo = localStorage.getItem('theoplayer-volume-info') || '{"muted": false,"volume": 1}'
      if (theoVolumeInfo != null) {
        this.theoVolumeInfo = JSON.parse(theoVolumeInfo)
      }
    } catch (err) {}
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

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll)
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

    this.setState({
      block: false,
      activeChannel: filteredSchedule && filteredSchedule.title ? filteredSchedule.title : '',
      activeChannelId: id,
      activeDate: formatDateTime(time, 'DD MMM'),
      scheduleList: filteredSchedule && filteredSchedule.videos ? filteredSchedule.videos : [],
    })

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
    const { programmeGuides, channelSchedule, channelsPlaylist, movieId } = this.props
    const {
      activeChannelId,
      scheduleList,
      channelCategory,
      expandLeague,
      limit,
      activeDate,
      hasMore,
      hidePlaylist,
      block,
      toggleInfoBar,
      notice_bar_message,
    } = this.state
    // console.log('status blockednya', block)
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
        <div>
          <Header stickyOff searchOff isDark={0} activeMenu="channels" libraryOff {...this.props} />
        </div>
        {channelsPlaylist.meta.status === 'loading' && <LoaderVideoBox />}
        {channelsPlaylist.meta.status === 'success' && (
          <div className={styles.channels_container}>
            <div className={!toggleInfoBar ? styles.video_container : styles.video_container_with_infobar}>
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
              {!block && loadPlayer ? (
                <Theoplayer
                  className={customTheoplayer}
                  showBackBtn={false}
                  subtitles={this.subtitles()}
                  handleOnVideoVolumeChange={this.handleOnVideoVolumeChange}
                  handleOnReadyStateChange={this.handleOnReadyStateChange}
                  // poster={poster}
                  {...videoSettings}
                />
              ) : block ? (
                <PlatformDesktop
                  iconStatus={this.state.iconStatus}
                  status={this.state.status}
                  icon={this.state.imageUrl}
                  name={this.state.name}
                  title={apiFetched ? dataFetched.title : ''}
                  portraitPoster={apiFetched ? dataFetched.background.landscape : ''}
                  user={this.props.user}
                  videoId={activeChannelId}
                />
              ) : (
                <div>Video Not Available</div> // styling later
              )}
              {status === 'error' &&
                !loadPlayer && <div className={styles.video__unavailable}>Video Not Available</div>}
            </div>
            <PrimaryMenu handleSelectChannel={this.handleSelectChannel} channelsPlaylist={channelsPlaylist} />
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
                {programmeGuides.error &&
                  !programmeGuides.loading &&
                  !programmeGuides.data && <div className={styles.epg__no__schedule}> No Schedule </div>}
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

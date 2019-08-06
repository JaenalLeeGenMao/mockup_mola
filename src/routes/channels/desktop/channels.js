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

import Header from '@components/Header'
import HorizontalPlaylist from '@components/HorizontalPlaylist'
import VerticalCalendar from '@components/VerticalCalendar'

import Placeholder from './placeholder'
import LoaderVideoBox from './loaderVideoBox'
import ScheduleCard from './scheduleCard'
import PrimaryMenu from './primaryMenu'
import SecondaryMenu from './secondaryMenu'
import ChannelCalendar from './channelCalendar'
import { getChannelProgrammeGuides } from '../selectors'
import { customTheoplayer } from './theoplayer-style'
import styles from './channels.css'
class Channels extends Component {
  state = {
    activeChannel: '',
    activeChannelId: 'mola-1',
    activeDate: formatDateTime(Date.now() / 1000, 'DD MMM'),
    scheduleList: [],
    hidePlaylist: true,
  }

  componentDidMount() {
    const {
      fetchChannelSchedule,
      fetchChannelsPlaylist,
      movieId,
      channelsPlaylist,
      fetchVideoByid,
      user,
      getVUID,
    } = this.props
    const selectedDate = {
      fullDate: moment().format('YYYYMMDD'),
      timezone: 7,
    }
    fetchChannelsPlaylist('channels-m').then(() => {
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
    fetchVideoByid(movieId)

    const deviceId = user.uid ? user.uid : DRMConfig.getOrCreateDeviceId()
    getVUID(deviceId)

    window.addEventListener('scroll', this.handleScroll)
  }

  componentDidUpdate(prevProps, prevState) {
    const { channelsPlaylist, channelSchedule, movieDetail, movieId, fetchVideoByid } = this.props
    if (movieDetail.meta.status === 'success' && prevProps.movieId != movieId) {
      fetchVideoByid(movieId)
    }
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll)
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

  handleSelectDate = date => {
    const strDate = new Date(date * 1000)
    const selectedDate = {
      fullDate: moment(strDate).format('YYYYMMDD'),
      dayMonth: formatDateTime(date, 'DD MMM'),
      timezone: 7,
    }
    this.setState({
      activeDate: selectedDate.dayMonth,
    })
    this.props.fetchChannelSchedule(selectedDate).then(() => {
      const filteredSchedule = this.props.channelSchedule.find(item => item.id == this.state.activeChannelId)
      this.setState({
        scheduleList: filteredSchedule.videos ? filteredSchedule.videos : [],
        // activeDate: selectedDate.dayMonth,
      })
    })
  }

  render() {
    const { programmeGuides, channelSchedule, channelsPlaylist, movieId } = this.props
    const { activeChannelId, scheduleList, activeDate, hidePlaylist } = this.state
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
        <div>
          <Header stickyOff searchOff isDark={0} activeMenu="channels" libraryOff {...this.props} />
        </div>
        {channelsPlaylist.meta.status === 'loading' && <LoaderVideoBox />}
        {channelsPlaylist.meta.status === 'success' && (
          <div className={styles.channels_container}>
            <div className={styles.video_container}>
              {loadPlayer && (
                <Theoplayer
                  className={customTheoplayer}
                  showBackBtn={false}
                  subtitles={this.subtitles()}
                  handleOnVideoLoad={this.handleOnVideoLoad}
                  // poster={poster}
                  {...videoSettings}
                />
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

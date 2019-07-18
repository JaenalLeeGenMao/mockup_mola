import React, { Component } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import moment from 'moment'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import InfiniteScroll from 'react-infinite-scroll-component'
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
import HorizontalPlaylist from '@components/HorizontalPlaylist'
import MatchList from '@components/MatchList'
import LazyLoad from '@components/common/Lazyload'
import VerticalCalendar from '@components/VerticalCalendar'

import { getChannelProgrammeGuides } from '../selectors'
import Schedule from './schedule'
import { customTheoplayer } from './theoplayer-style'
import styles from './channels.css'

const schedule = [
  {
    id: 'kids-channel',
    title: 'KIDS C',
    videos: [
      { id: 1, title: 'The Rugrats', startTime: 1560387600, endTime: 1560391200 },
      { id: 2, title: 'Spongebob SquarePants', startTime: 1560391200, endTime: 1560393000 },
      { id: 3, title: 'Hey! Tayo', startTime: 1560393000, endTime: 1560394800 },
      { id: 4, title: 'Coco Melon: The Wheels on The Bus', startTime: 1560394800, endTime: 1560399300 },
      { id: 5, title: 'Coco Melon:  Johnny Yes Papa', startTime: 1560399300, endTime: 1560409300 },
    ],
  },
  {
    id: 'movie-channel',
    title: 'MOVIE',
    videos: [
      { id: 6, title: 'Once Upon A Time', startTime: 1560388500, endTime: 1560391200 },
      { id: 7, title: 'Letters to Juliet', startTime: 1560391200, endTime: 1560394800 },
      { id: 8, title: 'Split', startTime: 1560394800, endTime: 1560396000 },
      { id: 9, title: 'When The Night Comes', startTime: 1560396000, endTime: 1560400200 },
      { id: 10, title: 'Gangnam Beauty', startTime: 1560400200, endTime: 1560403800 },
      { id: 11, title: 'Oh My God', startTime: 1560403800, endTime: 1560407400 },
    ],
  },
  {
    id: 'kids-channel',
    title: 'KIDS C',
    videos: [
      { id: 1, title: 'The Rugrats', startTime: 1560387600, endTime: 1560391200 },
      { id: 2, title: 'Spongebob SquarePants', startTime: 1560391200, endTime: 1560393000 },
      { id: 3, title: 'Hey! Tayo', startTime: 1560393000, endTime: 1560394800 },
      { id: 4, title: 'Coco Melon: The Wheels on The Bus', startTime: 1560394800, endTime: 1560399300 },
      { id: 5, title: 'Coco Melon:  Johnny Yes Papa', startTime: 1560399300, endTime: 1560409300 },
    ],
  },
  {
    id: 'movie-channel',
    title: 'MOVIE',
    videos: [
      { id: 6, title: 'Once Upon A Time', startTime: 1560388500, endTime: 1560391200 },
      { id: 7, title: 'Letters to Juliet', startTime: 1560391200, endTime: 1560394800 },
      { id: 8, title: 'Split', startTime: 1560394800, endTime: 1560396000 },
      { id: 9, title: 'When The Night Comes', startTime: 1560396000, endTime: 1560400200 },
      { id: 10, title: 'Gangnam Beauty', startTime: 1560400200, endTime: 1560403800 },
      { id: 11, title: 'Oh My God', startTime: 1560403800, endTime: 1560407400 },
    ],
  },
  {
    id: 'kids-channel',
    title: 'KIDS C',
    videos: [
      { id: 1, title: 'The Rugrats', startTime: 1560387600, endTime: 1560391200 },
      { id: 2, title: 'Spongebob SquarePants', startTime: 1560391200, endTime: 1560393000 },
      { id: 3, title: 'Hey! Tayo', startTime: 1560393000, endTime: 1560394800 },
      { id: 4, title: 'Coco Melon: The Wheels on The Bus', startTime: 1560394800, endTime: 1560399300 },
      { id: 5, title: 'Coco Melon:  Johnny Yes Papa', startTime: 1560399300, endTime: 1560409300 },
    ],
  },
  {
    id: 'movie-channel',
    title: 'MOVIE',
    videos: [
      { id: 6, title: 'Once Upon A Time', startTime: 1560388500, endTime: 1560391200 },
      { id: 7, title: 'Letters to Juliet', startTime: 1560391200, endTime: 1560394800 },
      { id: 8, title: 'Split', startTime: 1560394800, endTime: 1560396000 },
      { id: 9, title: 'When The Night Comes', startTime: 1560396000, endTime: 1560400200 },
      { id: 10, title: 'Gangnam Beauty', startTime: 1560400200, endTime: 1560403800 },
      { id: 11, title: 'Oh My God', startTime: 1560403800, endTime: 1560407400 },
    ],
  },
  {
    id: 'kids-channel',
    title: 'KIDS C',
    videos: [
      { id: 1, title: 'The Rugrats', startTime: 1560387600, endTime: 1560391200 },
      { id: 2, title: 'Spongebob SquarePants', startTime: 1560391200, endTime: 1560393000 },
      { id: 3, title: 'Hey! Tayo', startTime: 1560393000, endTime: 1560394800 },
      { id: 4, title: 'Coco Melon: The Wheels on The Bus', startTime: 1560394800, endTime: 1560399300 },
      { id: 5, title: 'Coco Melon:  Johnny Yes Papa', startTime: 1560399300, endTime: 1560409300 },
    ],
  },
  {
    id: 'movie-channel',
    title: 'MOVIE',
    videos: [
      { id: 6, title: 'Once Upon A Time', startTime: 1560388500, endTime: 1560391200 },
      { id: 7, title: 'Letters to Juliet', startTime: 1560391200, endTime: 1560394800 },
      { id: 8, title: 'Split', startTime: 1560394800, endTime: 1560396000 },
      { id: 9, title: 'When The Night Comes', startTime: 1560396000, endTime: 1560400200 },
      { id: 10, title: 'Gangnam Beauty', startTime: 1560400200, endTime: 1560403800 },
      { id: 11, title: 'Oh My God', startTime: 1560403800, endTime: 1560407400 },
    ],
  },
  {
    id: 'kids-channel',
    title: 'KIDS C',
    videos: [
      { id: 1, title: 'The Rugrats', startTime: 1560387600, endTime: 1560391200 },
      { id: 2, title: 'Spongebob SquarePants', startTime: 1560391200, endTime: 1560393000 },
      { id: 3, title: 'Hey! Tayo', startTime: 1560393000, endTime: 1560394800 },
      { id: 4, title: 'Coco Melon: The Wheels on The Bus', startTime: 1560394800, endTime: 1560399300 },
      { id: 5, title: 'Coco Melon:  Johnny Yes Papa', startTime: 1560399300, endTime: 1560409300 },
    ],
  },
  {
    id: 'movie-channel',
    title: 'MOVIE',
    videos: [
      { id: 6, title: 'Once Upon A Time', startTime: 1560388500, endTime: 1560391200 },
      { id: 7, title: 'Letters to Juliet', startTime: 1560391200, endTime: 1560394800 },
      { id: 8, title: 'Split', startTime: 1560394800, endTime: 1560396000 },
      { id: 9, title: 'When The Night Comes', startTime: 1560396000, endTime: 1560400200 },
      { id: 10, title: 'Gangnam Beauty', startTime: 1560400200, endTime: 1560403800 },
      { id: 11, title: 'Oh My God', startTime: 1560403800, endTime: 1560407400 },
    ],
  },
  {
    id: 'kids-channel',
    title: 'KIDS C',
    videos: [
      { id: 1, title: 'The Rugrats', startTime: 1560387600, endTime: 1560391200 },
      { id: 2, title: 'Spongebob SquarePants', startTime: 1560391200, endTime: 1560393000 },
      { id: 3, title: 'Hey! Tayo', startTime: 1560393000, endTime: 1560394800 },
      { id: 4, title: 'Coco Melon: The Wheels on The Bus', startTime: 1560394800, endTime: 1560399300 },
      { id: 5, title: 'Coco Melon:  Johnny Yes Papa', startTime: 1560399300, endTime: 1560409300 },
    ],
  },
  {
    id: 'movie-channel',
    title: 'MOVIE',
    videos: [
      { id: 6, title: 'Once Upon A Time', startTime: 1560388500, endTime: 1560391200 },
      { id: 7, title: 'Letters to Juliet', startTime: 1560391200, endTime: 1560394800 },
      { id: 8, title: 'Split', startTime: 1560394800, endTime: 1560396000 },
      { id: 9, title: 'When The Night Comes', startTime: 1560396000, endTime: 1560400200 },
      { id: 10, title: 'Gangnam Beauty', startTime: 1560400200, endTime: 1560403800 },
      { id: 11, title: 'Oh My God', startTime: 1560403800, endTime: 1560407400 },
    ],
  },
]

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
    expandLeague: true,
    filterByLeague: 0,
    filterByDates: '',
    limit: Array.from({ length: 12 }),
    hasMore: true,
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

  handleCategoryFilter = (category, value) => {
    // console.log('value handle category filter', category, value)
  }

  fetchMoreData = () => {
    // const matchCardData = this.props.matches.data
    if (schedule.length > 0) {
      if (this.state.limit.length >= schedule.length) {
        this.setState({
          hasMore: false,
        })
        return
      }
      // 16 more records in 2 secs
      setTimeout(() => {
        this.setState({
          limit: this.state.limit.concat(Array.from({ length: 12 })),
        })
      }, 1500) //2000
    }
  }

  ShowMatchCard = () => {
    // const { scheduleList } = this.state

    if (schedule.length > 0) {
      return (
        <LazyLoad containerClassName={styles.epgCardList__container}>
          {schedule.map((matchDt, index) => {
            if (index < this.state.limit.length) {
              return (
                <>
                  {/* <MatchCard key={matchDt.id} matchData={matchDt} /> */}
                  <MatchList key={matchDt.id} data={matchDt} />
                </>
              )
            }
          })}
        </LazyLoad>
      )
    } else {
      return (
        <>
          <div className={s.noMatchContent}>Tidak Ada Pertandingan</div>
        </>
      )
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
    const dummyLogo = [
      { id: 1, thumbnailImg: 'https://cdn.stag.mola.tv/mola/image/79eda258-83dd-4105-b25f-9492adfebd0d/image.png', title: 'sahabat' },
      { id: 2, thumbnailImg: 'https://cdn.stag.mola.tv/mola/image/79eda258-83dd-4105-b25f-9492adfebd0d/image.png', title: 'sahabat' },
      { id: 3, thumbnailImg: 'https://cdn.stag.mola.tv/mola/image/79eda258-83dd-4105-b25f-9492adfebd0d/image.png', title: 'sahabat' },
      { id: 4, thumbnailImg: 'https://cdn.stag.mola.tv/mola/image/79eda258-83dd-4105-b25f-9492adfebd0d/image.png', title: 'sahabat' },
      { id: 5, thumbnailImg: 'https://cdn.stag.mola.tv/mola/image/79eda258-83dd-4105-b25f-9492adfebd0d/image.png', title: 'sahabat' },
      { id: 6, thumbnailImg: 'https://cdn.stag.mola.tv/mola/image/79eda258-83dd-4105-b25f-9492adfebd0d/image.png', title: 'sahabat' },
      { id: 7, thumbnailImg: 'https://cdn.stag.mola.tv/mola/image/79eda258-83dd-4105-b25f-9492adfebd0d/image.png', title: 'sahabat' },
    ]

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
          {/* {channelsPlaylist.meta.status === 'success' &&
            programmeGuides.data &&
            channelSchedule.length > 0 && <Schedule scheduleList={channelSchedule} handleSelectChannel={this.handleSelectChannel} activeChannelId={this.state.activeChannelId} {...this.props} />}
          }*/}
          <div className={styles.epg__logo__container}>
            {channelsPlaylist.meta.status === 'success' &&
              programmeGuides.data &&
              channelSchedule.length > 0 && (
                <>
                  {dummyLogo.map(item => (
                    <div
                      key={item.id}
                      className={styles.epg__logo__wrapper}
                      onClick={() => {
                        this.handleSelectChannel(item.id)
                      }}
                    >
                      <img alt="" className={styles.epg__logo__img} src={item.thumbnailImg} />
                    </div>
                  ))}
                </>
              )}
          </div>
          <div className={styles.see__detail__epg}>
            <div className={styles.see__detail__text}> Scroll to see program guide </div>
            <div className={styles.see__detail__arrow} />
          </div>

          <div className={styles.epg__list__container}>
            <HorizontalPlaylist
              handleCategoryFilter={this.handleCategoryFilter}
              handleFilterAllLeague={this.handleFilterAllLeague}
              genreSpoCategory={dummyLogo}
              filterByLeague={this.state.filterByLeague}
              expandLeague={this.state.expandLeague}
              categoryFilterType={'Epg'}
            />
            <div className={styles.epg__grid__container}>
              <span />
              <InfiniteScroll
                dataLength={this.state.limit.length}
                next={this.fetchMoreData}
                hasMore={this.state.hasMore}
                hasChildren={true}
                loader={<div className={styles.labelLoaderIcon}>{/* <LoaderComp /> */}</div>}
                height={800}
              >
                <span>
                  <div className={styles.epg__wrappercontent__center}>
                    <div className={styles.epg__Pagetitle}>{this.state.limit != null ? this.ShowMatchCard() : <div>Tidak Ada Jadwal </div>}</div>
                  </div>
                </span>
              </InfiniteScroll>
              <VerticalCalendar handleCategoryFilter={this.handleCategoryFilter} filterByDates={this.state.filterByDates} categoryFilterType={'ByDate'} />
            </div>
          </div>
        </div>
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

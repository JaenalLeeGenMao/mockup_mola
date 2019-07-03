import React, { Component } from 'react'

import { connect } from 'react-redux'
import { compose } from 'redux'
import { IoIosArrowDown } from 'react-icons/io'
import withStyles from 'isomorphic-style-loader/lib/withStyles'

import DropdownList from '@components/DropdownList'
const { getComponent } = require('@supersoccer/gandalf')
const Theoplayer = getComponent('theoplayer')
import Header from '@components/Header'
import Schedule from './schedule'
import { formatDateTime, addDateTime, isSameDay } from '@source/lib/dateTimeUtil'
import { customTheoplayer } from './theoplayer-style'
import styles from './channels.css'
import moment from 'moment'
//dummy json, nanti ganti redux channel
const schedule = [
  {
    id: 'kids-channel',
    title: 'KIDS C',
    videos: [
      { id: 1, title: 'The Rugrats', startTime: 1560933862, endTime: 1560938422 },
      { id: 2, title: 'Spongebob SquarePants', startTime: 1560938422, endTime: 1560941062 },
      { id: 3, title: 'Hey! Tayo', startTime: 1560941062, endTime: 1560945622 },
      { id: 4, title: 'Coco Melon: The Wheels on The Bus', startTime: 1560941062, endTime: 1560948622 },
      { id: 5, title: 'Coco Melon:  Johnny Yes Papa', startTime: 1560948622, endTime: 1560951022 },
    ],
  },
  {
    id: 'movie-channel',
    title: 'MOVIE',
    videos: [
      { id: 6, title: 'Once Upon A Time', startTime: 1560931222, endTime: 1560933622 },
      { id: 7, title: 'Letters to Juliet', startTime: 1560933622, endTime: 1560939022 },
      { id: 8, title: 'Split', startTime: 1560939022, endTime: 1560942622 },
      { id: 9, title: 'When The Night Comes', startTime: 1560942622, endTime: 1560945622 },
      { id: 10, title: 'Gangnam Beauty', startTime: 1560945622, endTime: 1560949222 },
      { id: 11, title: 'Oh My God', startTime: 1560403800, endTime: 1560951622 },
      { id: 12, title: 'King Of Zombie', startTime: 1561023622, endTime: 1561027222 },
    ],
  },
]
class Channels extends Component {
  state = {
    activeChannel: schedule && schedule.length > 0 && schedule[0].title, //nanti ambil dari redux, get channel NAME from list channels index ke 0
    activeChannelId: schedule && schedule.length > 0 && schedule[0].id,
    activeDate: formatDateTime(Date.now() / 1000, 'ddd, DD MMM YYYY'),
    sheduleDateList: [],
    scheduleList: schedule && schedule.length > 0 ? schedule[0].videos : [], //nanti ambil dari redux
  }

  componentDidMount() {
    const selectedDateSchedule = this.state.scheduleList.filter(videos => {
      const isSame = isSameDay(Date.now() / 1000, videos.startTime)
      if (isSame) {
        return videos
      }
    })
    this.setState({
      scheduleList: selectedDateSchedule ? selectedDateSchedule : [],
    })
  }

  handleSelectDate = id => {
    // const value = e.target.options[e.target.options.selectedIndex].innerText
    let videosFiltered = []
    schedule &&
      schedule.map(dt => {
        const date = new Date(moment(id, 'ddd, DD MMM YYYY'))
        if (dt.id == this.state.activeChannelId) {
          videosFiltered =
            dt.videos &&
            dt.videos.filter(videos => {
              const isSame = isSameDay(date.getTime() / 1000, videos.startTime)
              if (isSame) {
                return dt
              }
            })
        }
        return videosFiltered
      })
    this.setState({
      activeDate: id,
      scheduleList: videosFiltered ? videosFiltered : [],
    })
  }

  handleSelectChannel = id => {
    // const value = e.target.options[e.target.options.selectedIndex].innerText
    let value = ''
    let videosFiltered = []
    schedule &&
      schedule.map(dt => {
        if (dt.id == id) {
          value = dt.title
          videosFiltered =
            dt.videos &&
            dt.videos.filter(videos => {
              const isSame = isSameDay(Date.now() / 1000, videos.startTime)
              if (isSame) {
                return dt
              }
            })
        }
        return videosFiltered
      })

    this.setState({
      activeChannel: value,
      activeChannelId: id,
      activeDate: formatDateTime(Date.now() / 1000, 'ddd, DD MMM YYYY'),
      scheduleList: videosFiltered ? videosFiltered : [],
    })
  }

  render() {
    const { scheduleList, activeDate, activeChannel, activeChannelId } = this.state
    let sheduleDateList = []
    for (var i = 0; i < 7; i++) {
      const date = new Date(addDateTime(null, i, 'days'))
      const dtTimestamp = date.getTime()
      const formattedDateTime = formatDateTime(dtTimestamp / 1000, 'ddd, DD MMM YYYY')
      sheduleDateList.push({ id: formattedDateTime, title: formattedDateTime })
    }
    return (
      <>
        <div className={styles.header_container}>
          <Header shadowMobile libraryOff className={styles.placeholder__header} isDark={0} activeMenu="channels" isMobile {...this.props} />
        </div>
        <div className={styles.channels_container}>
          <div className={styles.channels_top_wrapper}>
            <div className={styles.channels_list_wrapper}>
              <DropdownList
                className={styles.channels_dropdown_container}
                dataList={schedule}
                activeId={activeChannelId}
                onClick={this.handleSelectChannel} />
            </div>

            <div className={styles.schedule_date_wrapper}>
              <DropdownList
                className={styles.channels_dropdown_container}
                dataList={sheduleDateList}
                activeId={activeDate}
                onClick={this.handleSelectDate} />
            </div>
          </div>
          <div className={styles.video_container}>
            <Theoplayer
              className={customTheoplayer}
              showBackBtn={false}
              movieUrl={
                'https://cdn-mxs-01.akamaized.net/Content/HLS/VOD/6d04d4c2-16d7-499f-b143-7453724c21ff/c0de6451-cd85-84e0-fcd7-ea805ff7a6f2/index_L2.m3u8?hdnts=st=1560253338~exp=1560256938~acl=/*~hmac=7f9a628a0acb8414d47247541e6ee324a2495fbe3fee67519b9633e207cbc794'
              }
            />
          </div>
          <Schedule scheduleList={scheduleList} />
        </div>
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
  // getMatches: () => dispatch(matchListActions.getSportList()),
})

export default compose(withStyles(styles), connect(mapStateToProps, mapDispatchToProps))(Channels)

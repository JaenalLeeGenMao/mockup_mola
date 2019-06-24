import React, { Component, Fragment } from 'react'

import { connect } from 'react-redux'
import { compose } from 'redux'
import moment from 'moment'

import withStyles from 'isomorphic-style-loader/lib/withStyles'

const { getComponent } = require('@supersoccer/gandalf')
const Theoplayer = getComponent('theoplayer')

import Header from '@components/Header'
import Schedule from './schedule'
import channelActions from '@actions/channels'

import { customTheoplayer } from './theoplayer-style'
import styles from './channels.css'

class Channels extends Component {
  state = {
    selectedDate: {
      fullDate: moment().format('YYYYMMDD'),
      date: moment().format('DD'),
      day: moment()
        .format('ddd')
        .toUpperCase()
    },
  }

  componentDidMount() {
    this.props.fetchChannelsPlaylist()
      .then(() => this.props.fetchChannelSchedule(this.state.selectedDate))
  }

  clickChannel = (channelId) => {
    // console.log("MASUKKK", channelId)
    //rerender player here
  }

  render() {
    //dummy json
    const schedule = [
      {
        'id': 'kids-channel',
        'title': 'KIDS C',
        'videos': [
          { 'id': 1, 'title': 'The Rugrats', 'startTime': 1560387600, 'endTime': 1560391200 },
          { 'id': 2, 'title': 'Spongebob SquarePants', 'startTime': 1560391200, 'endTime': 1560393000 },
          { 'id': 3, 'title': 'Hey! Tayo', 'startTime': 1560393000, 'endTime': 1560394800 },
          { 'id': 4, 'title': 'Coco Melon: The Wheels on The Bus', 'startTime': 1560394800, 'endTime': 1560399300 },
          { 'id': 5, 'title': 'Coco Melon:  Johnny Yes Papa', 'startTime': 1560399300, 'endTime': 1560409300 }
        ]
      },
      {
        'id': 'movie-channel',
        'title': 'MOVIE',
        'videos': [
          { 'id': 6, 'title': 'Once Upon A Time', 'startTime': 1560388500, 'endTime': 1560391200 },
          { 'id': 7, 'title': 'Letters to Juliet', 'startTime': 1560391200, 'endTime': 1560394800 },
          { 'id': 8, 'title': 'Split', 'startTime': 1560394800, 'endTime': 1560396000 },
          { 'id': 9, 'title': 'When The Night Comes', 'startTime': 1560396000, 'endTime': 1560400200 },
          { 'id': 10, 'title': 'Gangnam Beauty', 'startTime': 1560400200, 'endTime': 1560403800 },
          { 'id': 11, 'title': 'Oh My God', 'startTime': 1560403800, 'endTime': 1560407400 }
        ]
      }
    ]

    const { channelsPlaylist, programmeGuides } = this.props
    return (
      <>
        <div>
          <Header stickyOff searchOff isDark={0} activeMenu="channels" libraryOff {...this.props} />
        </div>
        <div className={styles.channels_container}>
          <div className={styles.video_container}>
            <Theoplayer
              className={customTheoplayer}
              showBackBtn={false}
              movieUrl={
                'https://cdn-mxs-01.akamaized.net/Content/HLS/VOD/6d04d4c2-16d7-499f-b143-7453724c21ff/c0de6451-cd85-84e0-fcd7-ea805ff7a6f2/index_L2.m3u8?hdnts=st=1560253338~exp=1560256938~acl=/*~hmac=7f9a628a0acb8414d47247541e6ee324a2495fbe3fee67519b9633e207cbc794'
              }
            />
          </div>
          <Schedule scheduleList={schedule} clickChannel={this.clickChannel} />
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
  fetchChannelsPlaylist: () => dispatch(channelActions.getChannelsPlaylist()),
  fetchChannelSchedule: (date) => dispatch(channelActions.getProgrammeGuides(date))
})

export default compose(withStyles(styles), connect(mapStateToProps, mapDispatchToProps))(Channels)

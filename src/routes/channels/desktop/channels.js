import React, { Component } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import moment from 'moment'

import withStyles from 'isomorphic-style-loader/lib/withStyles'

const { getComponent } = require('@supersoccer/gandalf')
const Theoplayer = getComponent('theoplayer')

import Header from '@components/Header'
import channelActions from '@actions/channels'
import Schedule from './schedule'
import { getChannelProgrammeGuides } from '../selectors';

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
    const { programmeGuides, channelSchedule } = this.props
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
          {programmeGuides.loading && <div> please wait... </div>}
          {programmeGuides.data && channelSchedule && (
            <Schedule scheduleList={channelSchedule} clickChannel={this.clickChannel} />
          )}
          {programmeGuides.error && !programmeGuides.data && <div> terjadi kesalahan </div>}
        </div>
      </>
    )
  }
}

const mapStateToProps = (state) => ({
  channelSchedule: getChannelProgrammeGuides(state),
  ...state
});

const mapDispatchToProps = dispatch => ({
  fetchChannelsPlaylist: () => dispatch(channelActions.getChannelsPlaylist()),
  fetchChannelSchedule: (date) => dispatch(channelActions.getProgrammeGuides(date))
})

export default compose(withStyles(styles), connect(mapStateToProps, mapDispatchToProps))(Channels)

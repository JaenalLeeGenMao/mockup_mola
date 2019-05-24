import React, { Component } from 'react'

import withStyles from 'isomorphic-style-loader/lib/withStyles'

import Link from '@components/Link'
import LazyLoad from '@components/common/Lazyload'

import styles from './matchCard.css'
import moment from 'moment'
// import defaultImageMatches from '@global/assets-global/images/defaultImage.svg'

class MatchCard extends React.Component {
  componentDidMount() {
    const { playlists, homeTeam, awayTeam, startTime } = this.props
  }

  handleMatchesInfo = ({ playlists }) => {
    let text = 'UPCOMING'

    let className = styles.btnupcoming

    for (let i = 0; i < playlists.length; i++) {
      const getData = playlists[i]
      const getstartTime = playlists[i].startTime
      const getendTime = playlists[i].endTime

      let matchTime = moment.unix(getstartTime).utcOffset(7)
      let matchEndTime = moment.unix(getendTime).utcOffset(7)

      // console.log('aaaaazzzz', matchTime)
      // console.log('aaaaazzzz', matchEndTime)

      if (moment(matchTime).isBefore(moment().subtract(2, 'hours'))) {
        className = styles.rewatch_replay
        text = 'REPLAY'
      } else {
        const midnight = moment(
          moment()
            .utcOffset(7)
            .format('YYYY-MM-DD 23:59:00')
        )
        const tomorrowMidnight = moment(
          moment()
            .utcOffset(7)
            .add(1, 'd')
            .format('YYYY-MM-DD 23:59:00')
        )
        const nextWeekMidnight = moment(
          moment()
            .utcOffset(7)
            .add(7, 'd')
            .format('YYYY-MM-DD 23:59:00')
        )
        if (moment(matchTime).isBefore(midnight)) {
          let endTime = moment(matchEndTime).format('HH:mm')
          let startTime = moment(matchTime).format('HH:MM')
          let currentTime = moment().format('HH:mm')
          if (currentTime >= startTime && currentTime <= endTime) {
            text = 'LIVE NOW'
            className = styles.rewatch_liveNow
          } else {
            text = 'LIVE TODAY'
            className = styles.rewatch_liveToday
          }
        } else if (moment(matchTime).isBefore(tomorrowMidnight)) {
          text = 'LIVE TOMORROW'
          className = styles.rewatch_tomorrow
        } else if (moment(matchTime).isBefore(nextWeekMidnight)) {
          className = styles.rewatch_upcoming
          text = 'UPCOMING'
        }
      }
    }
    if (playlists === 2) {
      if (moment(getstartTime).isBefore(moment())) {
        className = styles.btnliveNow
        text = 'NOW PLAYING'
      } else {
        show = false
      }
    }

    // if (
    //   !_.isUndefined(match.playlist) &&
    //   !_.isUndefined(match.playlist.type) &&
    //   parseInt(match.playlist.type, 10) === 2
    // ) {
    //   if (moment(match.startTime).isBefore(moment())) {
    //     className = s.btnliveNow;
    //     text = 'NOW PLAYING';
    //   } else {
    //     show = false;
    //   }
    // }
    return {
      text,
      className,
    }
  }

  render() {
    const { playlists, awayTeam, homeTeam, startTime } = this.props
    // console.log('tezzzz', this.props)
    // console.log('aaaaaaa', startTime)

    return (
      <LazyLoad containerClassName={styles.matchCard__container}>
        {playlists.map(({ id, awayTeam, homeTeam, league }, index) => (
          <>
            <div key={id} className={styles.matchCard__schedule}>
              <span className={styles.matchCard__icon} />
              <div className={styles.matchCard__schedule_item}>
                <div className={styles.matchCard__team_logo}>
                  {/* {this.handleMatchesClub(homeTeam.logo)} */}

                  <img src={homeTeam.logo} className={styles.matchCard__defaultlogoteam} />
                  <span className={styles.matchCard_team_name}>{homeTeam.name}</span>
                </div>
                <div className={styles.matchCard__middlecontent}>
                  <div className={styles.matchCard__info_live_now}>
                    <span className={`${styles.matchCard__matchInfo} ${this.handleMatchesInfo(this.props).className}`}>{this.handleMatchesInfo(this.props).text}</span>
                    {/* <span className={styles.matchCard__matchInfo}> LIVE NOW</span> */}
                  </div>
                  <div className={styles.matchCard__scoring}>
                    <span>0 - 0</span>
                  </div>
                  {/* <span className={styles.matchCards__pen}>Pen. (3-4)</span> note: pen & agg di hide dulu */}
                </div>
                <div className={styles.matchCard__team_logo}>
                  {/* {this.handleClubImage(awayTeam.logo)} */}
                  <img src={awayTeam.logo} className={styles.matchCard__defaultlogoteam} />
                  <span className={styles.matchCard_team_name}>{awayTeam.name}</span>
                </div>
              </div>
              <div className={styles.matchCard__liga_type}>
                <img src={league.iconUrl} className={styles.matchCard__liga_type_img} />
                <span className={styles.matchCard__liga_type_title}>{league.name}</span>
              </div>
            </div>
          </>
        ))}
      </LazyLoad>
    )
  }
}

export default withStyles(styles)(MatchCard)

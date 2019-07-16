import React from 'react'

import withStyles from 'isomorphic-style-loader/lib/withStyles'

import Link from '@components/Link'

import styles from './matchList.css'
import { formatDateTime, isToday, isTomorrow, isMatchPassed, isMatchLive } from '@source/lib/dateTimeUtil'

import { defaultImgClub } from '@global/imageUrl'

import moment from 'moment'

class MatchList extends React.Component {
  cardDateFormat = (startTime, endTime) => {
    let text = ''
    text = formatDateTime(startTime, 'DD MMM HH.mm')

    if (isToday(startTime)) {
      let endDateTime = formatDateTime(endTime, 'HH:mm')
      let startDateTime = formatDateTime(startTime, 'HH:mm')
      let currentTime = moment().format('HH:mm')
      if (currentTime >= startDateTime && currentTime <= endDateTime) {
        text = 'LIVE ' + formatDateTime(startTime, 'HH.mm')
      } else if (!isMatchPassed(endTime)) {
        text = 'Next ' + formatDateTime(startTime, 'HH.mm')
      }
    }

    return text
  }

  renderMatch() {
    const { homeTeam, awayTeam, title } = this.props.data
    if (homeTeam && awayTeam) {
      return (
        <div className={styles.matchList__matches}>
          <div className={styles.matchList__club}>
            <img
              src={homeTeam.logo}
              onError={e => {
                e.target.src = defaultImgClub
              }}
            />
            <span>{homeTeam.name}</span>
            {homeTeam.score && <span className={styles.matchList__scoring}>{homeTeam.score}</span>}
          </div>
          <div className={styles.matchList__club}>
            <img
              src={awayTeam.logo}
              onError={e => {
                e.target.src = defaultImgClub
              }}
            />
            <span>{awayTeam.name}</span>
            {awayTeam.score && <span className={styles.matchList__scoring}>{awayTeam.score}</span>}
          </div>
          {/* {league ? <img className={styles.card__league_logo} src={league.iconUrl} /> : ''} */}
        </div>
      )
    } else {
      return (
        <div className={styles.matchList__matches}>
          <div className={styles.matchList__NoHomeAwayTeam}>
            <span>{title}</span>
          </div>
        </div>
      )
    }
  }

  render() {
    const { data } = this.props
    const { league } = this.props.data
    const date = this.cardDateFormat(data.startTime, data.endTime)
    const matchLive = isMatchLive(data.startTime, data.endTime)

    return (
      <div className={styles.matchList__container}>
        <div className={matchLive ? styles.matchList__date + ' ' + styles.matchList__live_now : styles.matchList__date}>
          <p className={styles.matchList__labelDate}> {date} </p>
          <div className={styles.matchList__leagueImg}>{league ? <img className={styles.matchList__league_logo} src={league.iconUrl} /> : ''}</div>
        </div>
        {this.renderMatch()}
      </div>
    )
  }
}

export default withStyles(styles)(MatchList)

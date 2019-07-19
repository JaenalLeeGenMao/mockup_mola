import React, { Component } from 'react'

import withStyles from 'isomorphic-style-loader/lib/withStyles'
import moment from 'moment'

import { formatDateTime, isToday, isMatchLive, isMatchPassed } from '@source/lib/dateTimeUtil'
import styles from './card.css'

import { defaultImgClub } from '@global/imageUrl'

class Card extends Component {
  cardDateFormat = (startTime, endTime) => {
    let text = ''
    text = formatDateTime(startTime, 'ddd, HH.mm')

    if (isToday(startTime, endTime)) {
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
    const { homeTeam, awayTeam, league, title } = this.props.data
    if (homeTeam && awayTeam) {
      return (
        <div className={styles.card__matches}>
          <div className={styles.card__club}>
            <img
              src={homeTeam.logo}
              onError={e => {
                e.target.src = defaultImgClub
              }}
            />
            <span>{homeTeam.name}</span>
          </div>
          <div className={styles.card__club}>
            <img
              src={awayTeam.logo}
              onError={e => {
                e.target.src = defaultImgClub
              }}
            />
            <span>{awayTeam.name}</span>
          </div>
          {league ? <img className={styles.card__league_logo} src={league.iconUrl} /> : ''}
        </div>
      )
    } else {
      return (
        <div className={styles.card__matches}>
          <div className={styles.card__single_title}>
            <span>{title}</span>
          </div>
        </div>
      )
    }
  }

  render() {
    const { data } = this.props
    const date = this.cardDateFormat(data.startTime, data.endTime)
    const matchLive = isMatchLive(data.startTime, data.endTime)

    return (
      <div className={styles.card__container}>
        <div className={matchLive ? styles.card__date + ' ' + styles.card__live_now : styles.card__date}>
          <p> {date} </p>
        </div>
        {this.renderMatch()}
      </div>
    )
  }
}

export default withStyles(styles)(Card)

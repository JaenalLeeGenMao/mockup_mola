import React, { Component } from 'react'

import withStyles from 'isomorphic-style-loader/lib/withStyles'
import moment from 'moment'

import Link from '@components/Link'
import LazyLoad from '@components/common/Lazyload'

import { convertToLocalDateTime, timeDiff, isMatchLive } from '../util'

import styles from './card.css'
// import defaultImageMatches from '@global/assets-global/images/defaultImage.svg'

class Card extends Component {
  cardDateFormat = (startUnix, endUnix) => {
    const { index, matchesList } = this.props
    const localTime = convertToLocalDateTime(startUnix)

    const time = moment(localTime).format('ddd, HH.mm')
    let text = time

    const dateDifference = timeDiff(moment().unix(), startUnix, 'days')
    const isToday = dateDifference === 0

    if (isToday) {
      const isMatchNowLive = isMatchLive(startUnix, endUnix)
      let isMatchBeforeLive = false
      if (matchesList.length > 1) {
        isMatchBeforeLive = isMatchLive(matchesList[index - 1].startTime, matchesList[index - 1].endTime)
      }
      if (isMatchNowLive) {
        text = 'LIVE'
      } else if (isMatchBeforeLive) {
        text = 'Next'
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
            <img src={homeTeam.logo} />
            <span>{homeTeam.name}</span>
          </div>
          <div className={styles.card__club}>
            <img src={awayTeam.logo} />
            <span>{awayTeam.name}</span>
          </div>
          {league ? <img className={styles.card__league_logo} src={league.iconUrl} /> : ''}
        </div>
      )
    } else {
      return (
        <div className={styles.card__matches}>
          <div className={styles.card__club}>
            <span>{title}</span>
          </div>
        </div>
      )
    }
  }

  render() {
    const { data } = this.props
    const { homeTeam, awayTeam, league } = data
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

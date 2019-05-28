import React, { Component } from 'react'

import withStyles from 'isomorphic-style-loader/lib/withStyles'
import moment from 'moment'

import Link from '@components/Link'
import LazyLoad from '@components/common/Lazyload'

import styles from './card.css'
// import defaultImageMatches from '@global/assets-global/images/defaultImage.svg'

// those function should be in utils files
const convertToLocalDateTime = unix => {
  const getLocalDate = moment.unix(unix).utc()
  const date = new Date(getLocalDate)
  return date
}

const isMatchLive = (startTime, endTime) => {
  const start = moment(convertToLocalDateTime(moment().unix())).isBefore(convertToLocalDateTime(startTime), 'minutes')
  const end = moment(convertToLocalDateTime(moment().unix())).isBefore(convertToLocalDateTime(endTime), 'minutes')
  let isLive = false
  if (!start && end) {
    isLive = true
  }

  return isLive
}

const timeDiff = (current, dateCompare, type = 'days') => {
  const currentLocalTime = convertToLocalDateTime(current)
  const dateCompareLocalTime = convertToLocalDateTime(dateCompare)
  const compare = moment(currentLocalTime).diff(dateCompareLocalTime, type)

  return compare
}

class Card extends Component {
  componentDidMount() {
    const { playlists, homeTeam, awayTeam, startTime } = this.props
  }

  cardDateFormat = (startUnix, endUnix) => {
    const { index, matchesList } = this.props
    const localTime = convertToLocalDateTime(startUnix)

    const time = moment(localTime).format('ddd, HH.mm')
    let text = time

    const dateDifference = timeDiff(moment().unix(), startUnix, 'days')
    const isToday = dateDifference === 0

    if (isToday) {
      const isMatchNowLive = isMatchLive(startUnix, endUnix)
      const isMatchBeforeLive = isMatchLive(matchesList[index - 1].startTime, matchesList[index - 1].endTime)
      if (isMatchNowLive) {
        text = 'LIVE'
      } else if (isMatchBeforeLive) {
        text = 'Next'
      }
    }

    return text
  }

  render() {
    const { data } = this.props
    const { homeTeam, awayTeam, league } = data
    const date = this.cardDateFormat(data.startTime, data.endTime)
    const matchLive = isMatchLive(data.startTime, data.endTime)

    console.log(data)
    return (
      <div className={styles.card__container}>
        <div className={matchLive ? styles.card__date + ' ' + styles.card__live_now : styles.card__date}>
          <p> {date} </p>
        </div>
        <div className={styles.card__matches}>
          <div className={styles.card__club}>
            <img src={homeTeam.logo} />
            <span>{homeTeam.name}</span>
          </div>
          <div className={styles.card__club}>
            <img src={awayTeam.logo} />
            <span>{homeTeam.name}</span>
          </div>
          <img className={styles.card__league_logo} src={league.iconUrl} />
        </div>
      </div>
    )
  }
}

export default withStyles(styles)(Card)

import React, { Component } from 'react'

import withStyles from 'isomorphic-style-loader/lib/withStyles'
import moment from 'moment'

import { formatDateTime, isToday, isMatchLive, isMatchPassed } from '@source/lib/dateTimeUtil'
import styles from './card.css'

import { defaultImgClub } from '@global/imageUrl'

class Card extends Component {
  cardDateFormat = (startTime, endTime) => {
    let text = ''
    text = formatDateTime(startTime, 'HH.mm')

    if (isToday(startTime, endTime)) {
      if (isMatchLive(startTime, endTime)) {
        text = 'LIVE NOW'
      }
    }
    //validation old mobile view
    // let text = ''
    // text = formatDateTime(startTime, 'ddd, HH.mm')

    // if (isToday(startTime, endTime)) {
    //   let endDateTime = formatDateTime(endTime, 'HH:mm')
    //   let startDateTime = formatDateTime(startTime, 'HH:mm')
    //   let currentTime = moment().format('HH:mm')
    //   if (currentTime >= startDateTime && currentTime <= endDateTime) {
    //     text = 'LIVE ' + formatDateTime(startTime, 'HH.mm')
    //   } else if (!isMatchPassed(endTime)) {
    //     text = 'Next ' + formatDateTime(startTime, 'HH.mm')
    //   }
    // }

    return text
  }

  renderMatch() {
    const { homeTeam = [], awayTeam = [], league, title } = this.props.data

    if (homeTeam.length > 0 && awayTeam.length > 0) {
      return (
        <div className={styles.card__matches}>
          <div className={styles.card__club}>
            <>
              {homeTeam.map(ht => {
                return (
                  <>
                    <img
                      src={ht.attributes.logo}
                      onError={e => {
                        e.target.src = defaultImgClub
                      }}
                    />
                    <span>{ht.attributes.name}</span>
                    {ht.attributes.score && <span className={styles.card__scoring}>{ht.attributes.score}</span>}
                  </>
                )
              })}
            </>
          </div>
          <div className={styles.card__club}>
            <>
              {awayTeam.map(at => {
                return (
                  <>
                    <img
                      src={at.attributes.logo}
                      onError={e => {
                        e.target.src = defaultImgClub
                      }}
                    />
                    <span>{at.attributes.name}</span>
                    {at.attributes.score && <span className={styles.card__scoring}>{at.attributes.score}</span>}
                  </>
                )
              })}
            </>
          </div>
          {/* {league ? <img className={styles.card__league_logo} src={league.iconUrl} /> : ''} */}
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
    const { images } = this.props.data
    const date = this.cardDateFormat(data.startTime, data.endTime)
    const matchLive = isMatchLive(data.startTime, data.endTime)

    return (
      <div className={styles.card__container}>
        <div className={matchLive ? styles.card__date + ' ' + styles.card__live_now : styles.card__date}>
          <p> {date} </p>
          <div className={styles.card__leagueImg}>{images ? <img className={styles.card__league_logo} src={images.thumbnails.cover} /> : ''}</div>
        </div>
        {this.renderMatch()}
      </div>
    )
  }
}

export default withStyles(styles)(Card)

import React, { Component } from 'react'

import withStyles from 'isomorphic-style-loader/lib/withStyles'
import moment from 'moment'

import { formatDateTime, isToday, isMatchLive, isMatchPassed, isTomorrow } from '@source/lib/dateTimeUtil'
import styles from './card.css'

import { defaultImgClub } from '@global/imageUrl'

class Card extends Component {
  cardDateFormat = (startTime, endTime) => {
    let text = ''
    let setColor = {
      text: '',
      className: '',
    }
    text = formatDateTime(startTime, 'HH.mm')

    if (isToday(startTime, endTime)) {
      if (isMatchLive(startTime, endTime)) {
        setColor.text = 'LIVE NOW'
        setColor.className = styles.card__live_now
      }
    } else if (isTomorrow(startTime)) {
      setColor.text = formatDateTime(startTime, 'HH.mm')
      setColor.className = styles.tomorrowDate
    } else {
      setColor.text = formatDateTime(startTime, 'HH.mm')
      setColor.className = styles.defaultColor
    }

    return setColor
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
    const matchTomorrow = isTomorrow(data.startTime)

    return (
      <div className={styles.card__container}>
        <div className={styles.card__date + ' ' + date.className}>
          <p className={styles.card__dateLabel}> {date.text} </p>
          <div className={styles.card__leagueImg}>{images ? <img className={styles.card__league_logo} src={images.thumbnails.cover} /> : ''}</div>
        </div>
        {this.renderMatch()}
      </div>
    )
  }
}

export default withStyles(styles)(Card)

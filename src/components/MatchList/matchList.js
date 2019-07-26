import React from 'react'

import withStyles from 'isomorphic-style-loader/lib/withStyles'

import Link from '@components/Link'

import styles from './matchList.css'
import { formatDateTime, isToday, isTomorrow, isMatchPassed, isMatchLive } from '@source/lib/dateTimeUtil'

import { defaultImgClub } from '@global/imageUrl'

import moment from 'moment'

class MatchList extends React.Component {
  state = {
    titleTemps: [],
  }

  cardDateFormat = (startTime, endTime) => {
    let text = ''
    text = formatDateTime(startTime, 'DD MMMM HH.mm')

    if (isToday(startTime, endTime)) {
      if (isMatchLive(startTime, endTime)) {
        text = 'LIVE NOW'
      }
    }

    return text
  }

  renderMatch() {
    const { homeTeam = [], awayTeam = [], title } = this.props.data

    if (homeTeam.length > 0 && awayTeam.length > 0) {
      return (
        <div className={styles.matchList__matches}>
          <div className={styles.matchList__club}>
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
                    {ht.attributes.score && <span className={styles.matchList__scoring}>{ht.attributes.score}</span>}
                  </>
                )
              })}
            </>
          </div>
          <div className={styles.matchList__club}>
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
                    {at.attributes.score && <span className={styles.matchList__scoring}>{at.attributes.score}</span>}
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
        <div className={styles.matchList__matches}>
          <div className={styles.matchList__NoHomeAwayTeam}>
            <span>{title}</span>
          </div>
        </div>
      )
    }
  }

  render() {
    const { data, noClickAble } = this.props
    const { images } = this.props.data
    const date = this.cardDateFormat(data.startTime, data.endTime)
    const matchLive = isMatchLive(data.startTime, data.endTime)

    return (
      <div className={noClickAble ? styles.matchList__container : `${styles.matchList__container} ${styles.pointer}`}>
        <div className={matchLive ? styles.matchList__date + ' ' + styles.matchList__live_now : styles.matchList__date}>
          <p className={styles.matchList__labelDate}> {date} </p>
          <div className={styles.matchList__leagueImg}>{images ? <img className={styles.matchList__league_logo} src={images.thumbnails.cover} /> : ''}</div>
        </div>
        {this.renderMatch()}
      </div>
    )
  }
}

export default withStyles(styles)(MatchList)

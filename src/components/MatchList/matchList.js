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

  // titleOnly = () => {
  //   let titleTemps = []
  //   const dataTemp = this.props.data
  //   dataTemp.forEach(dt => {
  //     console.log('see dt', dt)
  //     console.log('see hometeam', dt.homeTeam)
  //     console.log('see awayteam', dt.awayTeam)
  //     if ((dt.homeTeam && dt.awayTeam == null) || (dt.homeTeam && dt.awayTeam == undefined)) {
  //       titleTemps.push(dt)
  //     }
  //     console.log('see Result', titleTemps)
  //   })
  //   this.setState({ titleTemps: titleTemps })

  //   return <>{/* <span>{title}</span> */}</>
  // }

  cardDateFormat = (startTime, endTime) => {
    let text = ''
    text = formatDateTime(startTime, 'DD MMMM HH.mm')

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
    // console.log('titleTemps aaa', title)
    // title still not showing, cari tau abis kerjain date

    if (homeTeam && awayTeam) {
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

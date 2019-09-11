import React from 'react'

import withStyles from 'isomorphic-style-loader/lib/withStyles'

import Link from '@components/Link'

import styles from './matchList.css'
import { formatDateTime, isToday, isTomorrow, isMatchPassed, isMatchLive } from '@source/lib/dateTimeUtil'

import { defaultImgClub } from '@global/imageUrl'

import Scroll from 'react-scroll'
let Element = Scroll.Element
class MatchList extends React.Component {
  state = {
    titleTemps: [],
    hour: 0,
    minutes: 0,
  }

  cardDateFormat = (startTime, endTime, isChannel = false) => {
    let text = ''
    text = isChannel ? formatDateTime(startTime, 'HH.mm') : formatDateTime(startTime, 'DD MMM HH.mm')

    if (isToday(startTime, endTime)) {
      if (isMatchLive(startTime, endTime)) {
        text = 'LIVE NOW'
      }
    }

    return text
  }

  renderMatch() {
    const { homeTeam = [], awayTeam = [], title } = this.props.data

    if (homeTeam && awayTeam && homeTeam.length > 0 && awayTeam.length > 0) {
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
        // <div className={styles.matchList__matches}>
        //   <div className={styles.matchList__TitleContent}>
        //     <span>{title}</span>
        //     <p className={styles.matchList__timeHour}>
        //       {startTimeHour} - {endtimeHour}
        //     </p>
        //   </div>
        // </div>
        <div className={styles.matchList__matches}>
          <div className={styles.matchList__NoHomeAwayTeam}>
            <span>{title}</span>
          </div>
        </div>
      )
    }
  }

  render() {
    const {
      data,
      noClickAble = false,
      formatStartTime = '',
      toJumpLive = false,
      isNoSchedule = false,
      noScheduleTitle = '',
      isChannel = false,
    } = this.props

    if (!isNoSchedule) {
      const images = this.props.data ? this.props.data.images : ''
      const date = this.cardDateFormat(data.startTime, data.endTime, isChannel)
      const matchLive = isMatchLive(data.startTime, data.endTime)
      const replayMatch = isMatchPassed(data.startTime, data.endTime)
      const todayMatch = isToday(data.startTime, data.endTime)
      const upComingMatch = !replayMatch && !matchLive
      const matchTomorrow = isTomorrow(data.startTime)
      const hour =
        data.endTime && data.startTime
          ? new Date(data.endTime * 1000).getHours() - new Date(data.startTime * 1000).getHours()
          : ''
      const minutes = data.startTime
        ? new Date(data.endTime * 1000).getMinutes() - new Date(data.startTime * 1000).getMinutes()
        : ''
      const channelOrMatchStyle = isChannel
        ? `${styles.channel__display__duration} ${styles.matchList__date}`
        : styles.matchList__date
      const isLiveMatch = matchLive ? styles.matchList__live_now : ''
      const isTomorrowMatch = matchTomorrow ? styles.matchList__tomorrow : ''
      const isComingMatch = upComingMatch ? styles.matchList__tomorrow : ''
      const leftBoxStyle = `${channelOrMatchStyle} ${isLiveMatch} ${isTomorrowMatch} ${isComingMatch}`
      return (
        <>
          {toJumpLive && (
            <Element name={'isLive'}>
              <div />
            </Element>
          )}
          <Element name={formatStartTime}>
            <div
              className={noClickAble ? styles.matchList__container : `${styles.matchList__container} ${styles.pointer}`}
            >
              <div className={leftBoxStyle}>
                <p className={styles.matchList__labelDate}>{date}</p>
                {isChannel && (
                  <div className={styles.channel__duration__text}>
                    {hour > 0 && <div> {hour}hr </div>}
                    {minutes > 0 && <div> {minutes}min. </div>}
                  </div>
                )}
                {images &&
                  !isChannel && (
                    <div className={styles.matchList__leagueImg}>
                      <img className={styles.matchList__league_logo} src={images.thumbnails.cover} />
                    </div>
                  )}
              </div>
              {this.renderMatch()}
            </div>
          </Element>
        </>
      )
    } else {
      return (
        <Element name={formatStartTime}>
          {/* <div className={styles.matchList__container}>
            <div className={styles.matchList__date}>
              <p className={styles.matchList__labelDate}>{data.title}</p>
            </div>
            <div className={styles.matchList__matches}>
              <div className={styles.matchList__NoHomeAwayTeam}>
                <span>{noScheduleTitle}</span>
              </div>
            </div>
          </div> */}
          <div />
        </Element>
      )
    }
  }
}

export default withStyles(styles)(MatchList)

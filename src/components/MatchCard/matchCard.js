import React from 'react'

import withStyles from 'isomorphic-style-loader/lib/withStyles'

import Link from '@components/Link'

import styles from './matchCard.css'
import moment from 'moment'
import { defaultImgClub } from '@global/imageUrl'

class MatchCard extends React.Component {
  handleMatchesInfo = (startTime, endTime) => {
    let text = 'UPCOMING'

    let className = styles.btnUpcoming

    let matchTime = startTime && moment.unix(startTime).utcOffset(0)
    let matchEndTime = endTime && moment.unix(endTime).utcOffset(0)
    const startDateStr = moment(startTime);
    const endDateStr = moment(endTime);

    const validStartDate = matchTime.isValid() ? matchTime : startDateStr;
    const validEndDate = matchEndTime.isValid() ? matchEndTime : endDateStr;

    const startDateTime = new Date(validStartDate);
    const endDateTime = new Date(validEndDate);

    const dateFormatted = moment(startDateTime).format('D MMM');

    // console.log("matchTime", matchTime)
    // console.log('startDateStr', startDateStr)
    // console.log("validStartDate", validStartDate)
    // console.log("startDateTime", startDateTime)
    // console.log("endDateTime", endDateTime)
    // console.log(" moment(startTime)", moment(startTime).format('D MMM HH:mm'))
    // console.log('matchEndTime', matchEndTime)
    // console.log("moment(matchTime).isBefore(moment().subtract(2, 'hours'))", moment(matchTime).isBefore(moment().subtract(2, 'hours')))
    if (moment(matchTime).isBefore(moment().subtract(2, 'hours'))) {
      className = styles.btnReplay
      text = 'Replay Match'
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
        let endTime = moment(endDateTime).format('HH:mm')
        let startTime = moment(startDateTime).format('HH:mm')
        let currentTime = moment().format('HH:mm')
        if (currentTime >= startTime && currentTime <= endTime) {
          text = 'LIVE NOW'
          className = styles.btnLiveNow
        } else {
          text = 'UPCOMING'
          className = styles.btnUpcoming
        }
      } else if (moment(matchTime).isBefore(tomorrowMidnight)) {
        text = 'Tomorrow, ' + dateFormatted
        className = styles.btnDate
      } else if (moment(matchTime).isBefore(nextWeekMidnight)) {
        className = styles.btnDate
        text = dateFormatted
      }
    }
    return {
      text,
      className,
    }
  }

  handleClubImage = bgImg => {
    return (
      <img
        src={bgImg}
        alt=""
        onError={e => {
          e.target.src = defaultImgClub;
        }}
        className={styles.matchCard__defaultlogoteam}
      />
    );
  };

  render() {
    const { id, homeTeam, awayTeam, league, startTime, endTime } = this.props.matchData
    const showScore = Date.now() > endTime * 1000;
    return (
      <Link to={`/watch?v=${id}`} key={id} className={styles.matchCard__schedule}>
        <span className={styles.matchCard__icon} />
        <div className={styles.matchCard__schedule_item}>
          <div className={styles.matchCard__team_logo}>
            {this.handleClubImage(homeTeam.logo)}
            {homeTeam ? <span className={styles.matchCard_team_name}>{homeTeam.name}</span> : null}
          </div>
          <div className={styles.matchCard__middlecontent}>
            <div className={styles.matchCard__info_label}>
              <span className={`${styles.matchCard__matchInfo} ${this.handleMatchesInfo(startTime, endTime).className}`}>{this.handleMatchesInfo(startTime, endTime).text}</span>
              {/* <span className={styles.matchCard__matchInfo}> LIVE NOW</span> */}
            </div>
            <div className={styles.matchCard__scoring}>
              <span> {showScore &&
                homeTeam.score &&
                awayTeam.score && (
                  <>{homeTeam.score} - {awayTeam.score}</>
                )}
              </span>
            </div>
            {/* <span className={styles.matchCards__pen}>Pen. (3-4)</span> note: pen & agg di hide dulu */}
          </div>
          <div className={styles.matchCard__team_logo}>
            {this.handleClubImage(awayTeam.logo)}
            {awayTeam ? <span className={styles.matchCard_team_name}>{awayTeam.name}</span> : null}
          </div>
        </div>
        <div className={styles.matchCard__liga_type}>
          {league ? (
            <>
              <img src={league.iconUrl} className={styles.matchCard__liga_type_img} />
              <span className={styles.matchCard__liga_type_title}>{league.name}</span>
            </>
          ) : null}
        </div>
      </Link>
    )
  }
}

export default withStyles(styles)(MatchCard)

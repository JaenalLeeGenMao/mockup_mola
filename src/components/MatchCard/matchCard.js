import React from 'react'

import withStyles from 'isomorphic-style-loader/lib/withStyles'

import Link from '@components/Link'

import styles from './matchCard.css'
import moment from 'moment'
import { defaultImgClub } from '@global/imageUrl'
import { formatDateTime, isToday, isTomorrow, isMatchPassed, isMatchLive } from '@source/lib/dateTimeUtil'
class MatchCard extends React.Component {
  handleMatchesInfo = (startTime, endTime) => {
    let text = 'UPCOMING'
    let time = '';
    let className = styles.btnUpcoming

    if (isMatchPassed(startTime) && isMatchPassed(endTime)) {
      className = styles.btnReplay;
      text = 'Replay Match'
    }
    else if (isToday(startTime)) {
      if (isMatchLive(startTime, endTime)) {
        text = 'LIVE NOW'
        className = styles.btnLiveNow
      } else {
        text = 'UPCOMING'
        className = styles.btnUpcoming
        time = formatDateTime(startTime, 'HH.mm A')
      }
    } else if (isTomorrow(startTime)) {
      const dateFormatted = formatDateTime(startTime, 'D MMM');
      text = 'Tomorrow, ' + dateFormatted
      className = styles.btnDate
      time = formatDateTime(startTime, 'HH.mm A')
    } else {
      const dateFormatted = formatDateTime(startTime, 'D MMM');
      className = styles.btnDate
      text = dateFormatted
      time = formatDateTime(startTime, 'HH.mm A')
    }

    return {
      text,
      className,
      time
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

  renderMatchInfo = (startTime, endTime) => {
    const matchesDt = this.handleMatchesInfo(startTime, endTime);
    return (
      <div className={styles.matchCard__info_label}>
        <div className={`${styles.matchCard__matchInfo} ${matchesDt.className}`}>{matchesDt.text}</div>
        <div>{matchesDt.time}</div>
      </div>
    )
  }

  render() {
    const { id, homeTeam, awayTeam, league, startTime, endTime } = this.props.matchData
    const showScore = Date.now() > endTime * 1000;
    const isLive = isMatchLive(startTime, endTime)
    return (
      <Link to={`/watch?v=${id}`} key={id} className={styles.matchCard__schedule}>
        {isLive && <span className={styles.matchCard__icon_play} />}
        <div className={styles.matchCard__schedule_item}>
          <div className={styles.matchCard__team_logo}>
            {this.handleClubImage(homeTeam.logo)}
            {homeTeam ? <span className={styles.matchCard_team_name}>{homeTeam.name}</span> : null}
          </div>
          <div className={styles.matchCard__middlecontent}>
            {this.renderMatchInfo(startTime, endTime)}
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

import React from 'react'

import withStyles from 'isomorphic-style-loader/lib/withStyles'

import Link from '@components/Link'
import LazyLoad from '@components/common/Lazyload'
// import { getLocale } from './locale'
// import defaultTeamLogo from './../assets/defaultTeamLogo.png'

import styles from './matchCard.css'

const MatchCard = () => {
  // const locale = getLocale()
  return (
    <LazyLoad containerClassName={styles.match__container}>
      <div className={styles.sport__livenupcoming_schedule}>
        <span className={styles.sport_youtube_img} />
        <div className={styles.sport__schedule_item}>
          <div className={styles.sport__team_logo}>
            <span className={styles.sport__defaultlogoteam} />
            <h6 className={styles.sport_team_name}>Manchester United</h6>
          </div>
          <div className={styles.sport__infolive_upcoming}>
            <h5 className={styles.sport__info_live_now}>Live Now*</h5>
            <h2 className={styles.sport__scoring}>0 - 0</h2>
            <h6>Pen. (3-4)</h6>
            <h6 className={styles.sport__subjectcontent}>English Premier League</h6>
          </div>
          <div className={styles.sport__team_logo}>
            <span className={styles.sport__defaultlogoteam} />
            <h6 className={styles.sport_team_name}>Leicester City</h6>
          </div>
        </div>
      </div>
    </LazyLoad>
  )
}

export default withStyles(styles)(MatchCard)

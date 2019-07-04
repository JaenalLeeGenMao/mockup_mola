import React, { Component } from 'react'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import styles from './schedule.css'

import { formatDateTime, isMatchLive } from '@source/lib/dateTimeUtil'

class Schedule extends Component {
  render() {
    const schedule = this.props.scheduleList
    return (
      <div className={styles.schedule_container}>
        {schedule &&
          schedule.map((dt, index) => {
            const isLive = isMatchLive(dt.startTime, dt.endTime)
            const endTime = index + 1 == schedule.length ? dt.endTime : schedule[index + 1].startTime
            if (endTime > Date.now() / 1000) {
              return (
                <div className={`${styles.schedule_card} ${isLive ? styles.schedule_isLive : ''}`}>
                  <div className={styles.schedule_name}>{dt.title}</div>
                  <div className={styles.schedule_time}>
                    {formatDateTime(dt.startTime, 'HH:mm')} -
                    {formatDateTime(endTime, 'HH:mm')}
                  </div>
                  {isLive && <div className={styles.schedule_label}>Live Now</div>}
                </div>
              )
            }
          })}
      </div>
    )
  }
}

export default withStyles(styles)(Schedule)
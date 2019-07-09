import React, { Component } from 'react'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import moment from 'moment'

import styles from './schedule.css'
import { formatDateTime, isMatchLive } from '@source/lib/dateTimeUtil'

class Schedule extends Component {
  render() {
    const { scheduleList, activeDate } = this.props
    const schedule = scheduleList.filter(
      list => {
        return (
          Number(moment(list.start).format('DD')) === Number(moment(activeDate).format('DD'))
        );
      }
    );

    return (
      <div className={styles.schedule_container}>
        {schedule.length > 0 &&
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

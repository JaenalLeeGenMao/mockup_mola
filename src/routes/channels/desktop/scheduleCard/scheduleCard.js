import React, { Component } from 'react'
import withStyles from 'isomorphic-style-loader/lib/withStyles'

import MatchList from '@components/MatchList'
import LazyLoad from '@components/common/Lazyload'
import { formatDateTime } from '@source/lib/dateTimeUtil'

import styles from './scheduleCard.css'

class ScheduleCard extends Component {
  render() {
    const { scheduleList = [], activeDate } = this.props
    return (
      <div>
        <div className={styles.epg__wrappercontent__center}>
          <div className={styles.epg__Pagetitle}>
            {scheduleList.length > 0 ? (
              <LazyLoad containerClassName={styles.epgCardList__container}>
                {scheduleList.filter(list => formatDateTime(list.start, 'DD MMM') == activeDate).map((dt, index) => {
                  return <MatchList key={dt.id} data={dt} noClickAble isChannel />
                })}
              </LazyLoad>
            ) : (
              <div className={styles.noMatchContent}>Tidak Ada Pertandingan</div>
            )}
          </div>
        </div>
      </div>
    )
  }
}

export default withStyles(styles)(ScheduleCard)

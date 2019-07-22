import React, { Component } from 'react'
import withStyles from 'isomorphic-style-loader/lib/withStyles'

import MatchList from '@components/MatchList'
import LazyLoad from '@components/common/Lazyload'
import { formatDateTime } from '@source/lib/dateTimeUtil'

import styles from './scheduleCard.css'

class ScheduleCard extends Component {
  render() {
    const { scheduleList, limit, activeDate } = this.props
    return (
      <div>
        <div className={styles.epg__wrappercontent__center}>
          <div className={styles.epg__Pagetitle}>
            {this.props.limit != null && scheduleList.length > 0 ? (
              <LazyLoad containerClassName={styles.epgCardList__container}>
                {scheduleList.filter(list => formatDateTime(list.start, 'DD MMM') === formatDateTime(activeDate, 'DD MMM')).map((dt, index) => {
                  if (index < limit.length) {
                    return <MatchList key={dt.id} data={dt} clickAble={false} />
                  }
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

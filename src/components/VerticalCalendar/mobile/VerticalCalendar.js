import React, { Component } from 'react'
import PropTypes from 'prop-types'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import moment from 'moment'
import { formatDateTime, addDateTime } from '@source/lib/dateTimeUtil'

import s from './VerticalCalendar.css'

class VerticalCalendar extends Component {
  static propTypes = {
    handleCategoryFilter: PropTypes.func,
    // filterByDates: PropTypes.string,
    // startOfWeek: PropTypes.bool,
    selectedDate: PropTypes.string,
  }

  getCalendar = (startOfWeek, schedule) => {
    // console.log('schedule', schedule)
    let resultDateList = []
    //gettodayfordefault Value
    for (var i = 0; i < 7; i++) {
      const date = new Date(addDateTime(startOfWeek, i, 'days'))
      const dtTimestamp = date.getTime()
      const formattedDateTime = formatDateTime(dtTimestamp / 1000, 'DD MMMM')
      const dayDate = formatDateTime(dtTimestamp / 1000, 'DD')
      //date string to int selectedMatch
      const dateStringtoInt = new Date(moment(formattedDateTime, 'DD MMMM'))
      const strTimestamp = dateStringtoInt.getTime() / 1000

      resultDateList.push({ title: formattedDateTime, strTimestamp: strTimestamp, day: dayDate })
    }
    return resultDateList
  }

  render() {
    const { handleCategoryFilter, categoryFilterType = 'ByDate', selectedDate, startOfWeek, handleJumpToLive, schedule = [] } = this.props
    return (
      <span>
        <div className={s.filterContentfilterByDay_container}>
          <span>
            <div className={s.live__logo} onClick={handleJumpToLive} />
            {this.getCalendar(startOfWeek, schedule).map(dt => {
              return (
                <>
                  <div
                    className={`${s.filterLabelByDay} ${dt.strTimestamp == selectedDate || dt.title == selectedDate ? s.selectedFilter : ''} ${dt.isLive ? s.live__marker : ''}`}
                    key={dt.strTimestamp}
                    onClick={() => {
                      handleCategoryFilter(categoryFilterType, dt.strTimestamp)
                    }}
                  >
                    {dt.day}
                  </div>
                </>
              )
            })}
          </span>
        </div>
      </span>
    )
  }
}

export default withStyles(s)(VerticalCalendar)

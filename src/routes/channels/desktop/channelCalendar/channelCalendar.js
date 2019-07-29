import React, { Component } from 'react'
import PropTypes from 'prop-types'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import moment from 'moment'
import { formatDateTime, addDateTime } from '@source/lib/dateTimeUtil'

import s from './channelCalendar.css'

class ChannelCalendar extends Component {
  static propTypes = {
    handleCategoryFilter: PropTypes.func.isRequired,
    filterByDates: PropTypes.string,
  }

  getCalendar = () => {
    //Validate This week, now +7 days
    let dateList = []

    for (var i = 0; i < 7; i++) {
      const date = new Date(addDateTime(null, i, 'days'))
      const dtTimestamp = date.getTime()
      const formattedDateTime = formatDateTime(dtTimestamp / 1000, 'DD MMMM')

      //date string to int selectedMatch
      const dateStringtoInt = new Date(moment(formattedDateTime, 'DD MMMM'))
      const strTimestamp = dateStringtoInt.getTime() / 1000

      dateList.push({ title: formattedDateTime, strTimestamp: strTimestamp })
    }
    return dateList
  }

  render() {
    const { handleCategoryFilter, filterByDates, categoryFilterType = 'ByDate' } = this.props

    return (
      <span>
        <div className={s.filterContentfilterByDay_container}>
          <span>
            {this.getCalendar().map(dt => {
              return (
                <div
                  className={`${s.filterLabelByDay} ${dt.strTimestamp == filterByDates || dt.title == filterByDates ? s.selectedFilter : ''}`}
                  key={dt.strTimestamp}
                  onClick={() => {
                    handleCategoryFilter(categoryFilterType, dt.strTimestamp)
                  }}
                >
                  {dt.title}
                </div>
              )
            })}
          </span>
        </div>
      </span>
    )
  }
}

export default withStyles(s)(ChannelCalendar)
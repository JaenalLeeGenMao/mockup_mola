import React, { Component } from 'react'
import PropTypes from 'prop-types'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import moment from 'moment'
import { formatDateTime, addDateTime } from '@source/lib/dateTimeUtil'

import s from './VerticalCalendar.css'

class VerticalCalendar extends Component {
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
      const formattedDateTime = formatDateTime(dtTimestamp / 1000, 'DD MMM')

      //date string to int selectedMatch
      const dateStringtoInt = new Date(moment(formattedDateTime, 'DD MMM'))
      const strTimestamp = dateStringtoInt.getTime() / 1000

      dateList.push({ title: formattedDateTime, strTimestamp: strTimestamp })
    }

    return dateList
  }

  render() {
    const { handleCategoryFilter, filterByDates } = this.props
    return (
      <span>
        <div className={s.filterContentfilterByDay_container}>
          <span>
            {this.getCalendar().map(dt => {
              return (
                <div
                  className={`${s.filterLabelByDay} ${dt.strTimestamp == filterByDates ? s.selectedFilter : ''}`}
                  key={dt.strTimestamp}
                  onClick={() => {
                    handleCategoryFilter('ByDate', dt.strTimestamp)
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

export default withStyles(s)(VerticalCalendar)

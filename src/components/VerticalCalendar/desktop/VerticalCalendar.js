import React, { Component } from 'react'
import PropTypes from 'prop-types'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import moment from 'moment'
import { formatDateTime, addDateTime } from '@source/lib/dateTimeUtil'

import s from './VerticalCalendar.css'
import Scroll from 'react-scroll'
let Link = Scroll.Link
class VerticalCalendar extends Component {
  static propTypes = {
    handleCategoryFilter: PropTypes.func,
    // filterByDates: PropTypes.string,
    // startOfWeek: PropTypes.bool,
    selectedDate: PropTypes.string,
  }

  state = {
    activeDate: '',
    selDate: this.props.selectedDate,
  }

  getCalendar = startOfWeek => {
    let resultDateList = []

    //gettodayfordefault Value
    for (var i = 0; i < 7; i++) {
      const date = new Date(addDateTime(startOfWeek, i, 'days'))
      const dtTimestamp = date.getTime()
      const formattedDateTime = formatDateTime(dtTimestamp / 1000, 'DD MMMM')

      //date string to int selectedMatch
      const dateStringtoInt = new Date(moment(formattedDateTime, 'DD MMMM'))
      const strTimestamp = dateStringtoInt.getTime() / 1000

      resultDateList.push({ title: formattedDateTime, strTimestamp: strTimestamp })
    }
    return resultDateList
  }

  handleSetActive = to => {
    // activeScrollDate = to
    this.setState({
      activeDate: to,
    })
  }

  handleOnClick = timestamp => {
    this.props.handleCategoryFilter(timestamp)
    this.setState({
      activeDate: '',
    })
  }

  render() {
    const { startOfWeek, selectedDate } = this.props
    const { activeDate } = this.state
    return (
      <span>
        <div className={s.filterContentfilterByDay_container}>
          <span>
            {this.getCalendar(startOfWeek).map(dt => {
              const formatStartTime = formatDateTime(dt.strTimestamp, 'DD MM YYYY')
              const isSelected =
                (!activeDate && (dt.strTimestamp == selectedDate || dt.title == selectedDate)) ||
                activeDate == formatStartTime

              return (
                <>
                  <Link
                    to={formatStartTime}
                    spy={true}
                    hashSpy={true}
                    smooth={'easeInOutExpo'}
                    offset={-150}
                    duration={1000}
                    onSetActive={this.handleSetActive}
                  >
                    <div
                      className={`${s.filterLabelByDay} ${isSelected ? s.selectedFilter : ''}`}
                      key={dt.strTimestamp}
                      onClick={() => {
                        this.handleOnClick(dt.strTimestamp)
                      }}
                    >
                      {dt.title}
                    </div>
                  </Link>
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

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import moment from 'moment'
import { formatDateTime, addDateTime, isMatchLive } from '@source/lib/dateTimeUtil'

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
    // isLive: false,
    calendar: [],
  }

  componentDidMount() {
    const setCalender = this.getCalendar(this.props.startOfWeek, this.props.schedule)
    this.setState({
      calendar: setCalender,
    })
  }

  componentDidUpdate(prevProps) {
    if (prevProps.startOfWeek != this.props.startOfWeek) {
      const setCalender = this.getCalendar(this.props.startOfWeek, this.props.schedule)
      this.setState({
        calendar: setCalender,
      })
    }
  }

  getCalendar = (startOfWeek, schedule = []) => {
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
      let result = {
        id: formattedDateTime,
        title: formattedDateTime,
        strTimestamp: strTimestamp,
        day: dayDate,
        live: false,
      }
      schedule.map(item => {
        if (isMatchLive(item.startTime, item.endTime) && formatDateTime(item.startTime, 'DD MMMM') == formattedDateTime) {
          result.live = true
        }
        return
      })
      resultDateList.push(result)
    }

    return resultDateList
  }

  handleClickJumpLive = () => {
    this.setState({
      isActiveLive: true,
    })

    this.props.handleJumpToLive()
  }

  render() {
    const { handleCategoryFilter, selectedDate, handleJumpToLive, hasLiveLogo } = this.props
    const { calendar } = this.state
    return (
      <span>
        <div className={s.filterContentfilterByDay_container}>
          <span>
            {hasLiveLogo && <div className={s.live__logo} onClick={this.handleClickJumpLive} />}
            {calendar.length > 0 &&
              calendar.map(dt => {
                const formatStartTime = formatDateTime(dt.strTimestamp, 'DD MM YYYY')
                return (
                  <Link
                    to={formatStartTime}
                    spy={false}
                    hashSpy={true}
                    smooth={'easeInOutExpo'}
                    offset={-150}
                    duration={1000}
                    onSetActive={this.handleSetActive}
                  >
                    <div
                      className={`${s.filterLabelByDay} ${dt.strTimestamp == selectedDate || dt.title == selectedDate ? s.selectedFilter : ''} ${dt.live ? s.live__marker : ''}`}
                      key={dt.strTimestamp}
                      onClick={() => {
                        handleCategoryFilter(dt.strTimestamp)
                      }}
                    >
                      {dt.day}
                    </div>
                  </Link>
                )
              })}
          </span>
        </div>
      </span>
    )
  }
}

export default withStyles(s)(VerticalCalendar)

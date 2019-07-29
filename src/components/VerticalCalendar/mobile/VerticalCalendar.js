import React, { Component } from 'react'
import PropTypes from 'prop-types'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import moment from 'moment'
import { formatDateTime, addDateTime, isMatchLive, isToday } from '@source/lib/dateTimeUtil'

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
    isActiveLive: false,
  }

  componentDidMount() {
    const weekStart = this.props.startOfWeek ? this.props.startOfWeek : null
    const setCalender = this.getCalendar(weekStart, this.props.schedule)
    this.setState({
      calendar: setCalender,
    })
  }

  componentDidUpdate(prevProps) {
    const weekStart = this.props.startOfWeek ? this.props.startOfWeek : null
    if (weekStart && prevProps.startOfWeek != weekStart) {
      const setCalender = this.getCalendar(weekStart, this.props.schedule)
      this.setState({
        calendar: setCalender,
      })
    }
  }

  getCalendar = (startOfWeek = null, schedule = []) => {
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
        if (
          isMatchLive(item.startTime, item.endTime) &&
          formatDateTime(item.startTime, 'DD MMMM') == formattedDateTime
        ) {
          result.live = true
        }
        return
      })
      resultDateList.push(result)
    }

    return resultDateList
  }

  handleOnClick = timestamp => {
    this.props.handleCategoryFilter(timestamp)
    this.setState({
      isActiveLive: false,
    })
  }

  handleSetActive = to => {
    // activeScrollDate = to
    this.setState({
      isActiveLive: false,
    })
  }

  handleClickJumpLive = () => {
    this.setState({
      isActiveLive: true,
    })

    this.props.handleJumpToLive()
  }

  render() {
    const { selectedDate, hasLiveLogo, isChannel = true } = this.props
    const { calendar, isActiveLive } = this.state
    return (
      <span>
        <div className={`${s.filterContentfilterByDay_container} ${isChannel ? s.container_relative : ''}`}>
          <span>
            {hasLiveLogo && (
              <div
                className={`${s.live__logo} ${isActiveLive ? s.live__logo__active : ''}`}
                onClick={this.handleClickJumpLive}
              />
            )}
            {calendar.length > 0 &&
              calendar.map(dt => {
                const formatStartTime = formatDateTime(dt.strTimestamp, 'DD MM YYYY')
                const today = formatDateTime(Date.now() / 1000, 'DD MM YYYY')

                let activeClass = ''
                if (isChannel) {
                  if (dt.live) {
                    activeClass = s.live__flex
                  } else if (dt.strTimestamp == selectedDate || (dt.title == selectedDate && !dt.live)) {
                    activeClass = s.selectedFilter
                  }
                } else {
                  if (today === formatStartTime) {
                    activeClass = s.live__flex
                  } else if (
                    dt.strTimestamp == selectedDate ||
                    (dt.title == selectedDate && !(today === formatStartTime))
                  )
                    activeClass = s.selectedFilter
                }

                return (
                  <Link
                    key={dt.id}
                    to={formatStartTime}
                    spy={true}
                    hashSpy={true}
                    smooth={'easeInOutExpo'}
                    offset={-150}
                    duration={500}
                    onSetActive={this.handleSetActive}
                  >
                    {isChannel && (
                      <div
                        className={`${s.filterLabelByDay} ${activeClass}`}
                        key={dt.strTimestamp}
                        onClick={() => {
                          this.handleOnClick(dt.strTimestamp)
                        }}
                      >
                        {dt.live && <span className={s.live__dot} />}
                        {dt.day}
                      </div>
                    )}
                    {!isChannel && (
                      <div
                        className={`${s.filterLabelByDay} ${activeClass}`}
                        key={dt.strTimestamp}
                        onClick={() => {
                          this.handleOnClick(dt.strTimestamp)
                        }}
                      >
                        {today === formatStartTime && <span className={s.live__dot} />}
                        {dt.day}
                      </div>
                    )}
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
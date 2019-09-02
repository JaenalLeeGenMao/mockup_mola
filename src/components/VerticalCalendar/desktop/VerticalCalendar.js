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
    isActiveLive: false,
  }

  getCalendar = startOfWeek => {
    let resultDateList = []
    //gettodayfordefault Value
    for (var i = 0; i < 7; i++) {
      const date = new Date(addDateTime(startOfWeek, i, 'days'))
      const dtTimestamp = date.getTime()
      const formattedDateTime = formatDateTime(dtTimestamp / 1000, 'DD MMM')

      //date string to int selectedMatch
      const dateStringtoInt = new Date(moment(formattedDateTime, 'DD MMM'))
      const strTimestamp = dateStringtoInt.getTime() / 1000

      resultDateList.push({ title: formattedDateTime, strTimestamp: strTimestamp })
    }
    return resultDateList
  }

  handleSetActive = to => {
    // activeScrollDate = to
    this.setState({
      isActiveLive: false,
      activeDate: to,
    })
  }

  handleOnClick = timestamp => {
    this.props.handleCategoryFilter(timestamp)
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
    const { startOfWeek, selectedDate, hasLiveLogo, isChannel = true } = this.props
    const { activeDate, isActiveLive } = this.state
    return (
      <span>
        <div className={s.filterContentfilterByDay_container}>
          <span className={`${s.tourFilterDate} tourFilterDate`}>
            {hasLiveLogo && (
              <div
                className={`${s.live__logo} ${isActiveLive ? s.live__logo__active : ''}`}
                onClick={this.handleClickJumpLive}
              />
            )}
            {this.getCalendar(startOfWeek).map(dt => {
              const formatStartTime = formatDateTime(dt.strTimestamp, 'YYMMDD')
              const today = formatDateTime(Date.now() / 1000, 'YYMMDD')
              // const isSelected = dt.strTimestamp == selectedDate || dt.title == selectedDate
              let activeClass = ''
              let isSelected = false
              if (isChannel) {
                if (today === formatStartTime) {
                  activeClass = s.live__flex
                } else if ((dt.strTimestamp == selectedDate || dt.title == selectedDate) && today !== formatStartTime) {
                  activeClass = s.selectedLabel
                  isSelected = true
                }
              } else {
                if (today === formatStartTime) {
                  activeClass = s.live__flex
                } else if (
                  (!activeDate &&
                    (dt.strTimestamp == selectedDate || dt.title == selectedDate) &&
                    !(today === formatStartTime)) ||
                  activeDate == formatStartTime
                ) {
                  activeClass = s.selectedLabel
                  isSelected = true
                }
              }

              return (
                <>
                  <Link
                    to={formatStartTime}
                    spy={true}
                    hashSpy={true}
                    smooth={'easeInOutExpo'}
                    offset={-150}
                    duration={500}
                    onSetActive={this.handleSetActive}
                  >
                    <div
                      className={`${s.filterLabelByDay} ${activeClass}`}
                      key={dt.strTimestamp}
                      onClick={() => {
                        this.handleOnClick(dt.strTimestamp)
                      }}
                    >
                      {today === formatStartTime && <span className={s.live__dot} />}
                      {isSelected && <span className={s.selectedFilter}>{dt.title}</span>}
                      {!isSelected && <>{dt.title}</>}
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

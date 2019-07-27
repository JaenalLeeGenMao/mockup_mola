import React, { Component, Fragment } from 'react'

import { connect } from 'react-redux'
import { compose } from 'redux'
import _groupBy from 'lodash/groupBy'
import _sortBy from 'lodash/sortBy'

import withStyles from 'isomorphic-style-loader/lib/withStyles'

import DropdownList from '@components/DropdownList'
import MatchesPlaceholder from './placeholder'

import MatchCard from './card'
import {
  formatDateTime,
  isToday,
  isTomorrow,
  isMatchPassed,
  isThisWeek,
  isNextWeek,
  isSameDay,
  isLastWeek,
} from '@source/lib/dateTimeUtil'
import matchListActions from '@actions/matches'
import VerticalCalendar from '@components/VerticalCalendar'
import moment from 'moment'

import Header from '@components/Header'
import MatchesError from '@components/common/error'
import LazyLoad from '@components/common/Lazyload'
import Link from '@components/Link'

import styles from './matches.css'

class Matches extends Component {
  state = {
    initialized: false,
    matches: [],
    filterDefWeek: 1, // default thisweek.
    filterByDates: '',
    filterByType: '',
    filterByLeague: 0,
    selectedWeek: 2,
    allMatches: [],
    selectedDate: null,
    startWeekDate: null,
  }

  setDefaultDate = () => {
    //set today change color
    const startWeekDate = moment().startOf('isoWeek')
    const date = new Date(moment().startOf('date'))
    const swdTimestamp = date.getTime() / 1000

    this.setState({
      filterByDates: swdTimestamp,
      startWeekDate: startWeekDate,
    })
  }

  componentDidMount() {
    /* set the default active playlist onload */
    // const { playlistId } = this.props
    // playlistId ? this.props.getMatches(playlistId) : this.props.getMatches()
    this.props.getAllGenreSpo()
    this.setDefaultDate()
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.matches.matchesPlaylists.data.length != this.props.matches.matchesPlaylists.data.length &&
      this.state.allMatches.length === 0
    ) {
      //get all data first render
      let matchTemp = []
      const { data } = this.props.matches.matchesPlaylists
      data.forEach(dt => {
        if (dt.id) {
          const vidDt = dt.videos
          for (let i = 0; i < vidDt.length; i++) {
            matchTemp.push(vidDt[i])
          }
        }
      })
      const filterResult = this.handleSortMatches(matchTemp)
      this.setState({ allMatches: filterResult, matches: filterResult })
    }
  }

  handleSortMatches = matches => {
    // console.log('handleSortMatches : see sort macthes', matches)
    const groupByDate = _groupBy(matches, match => {
      if (isToday(match.startTime, match.endTime)) return 'isToday'
      else if (isThisWeek(match.startTime)) return 'isThisWeek'
      else if (isNextWeek(match.startTime)) return 'isNextWeek'
      else return 'isLastWeek'
    })

    const todayMatches = groupByDate.isToday ? groupByDate.isToday.sort((a, b) => a.startTime - b.startTime) : []
    const thisWeekMatches = groupByDate.isThisWeek
      ? groupByDate.isThisWeek.sort((a, b) => a.startTime - b.startTime)
      : []
    const nextWeekMatches = groupByDate.isNextWeek
      ? groupByDate.isNextWeek.sort((a, b) => a.startTime - b.startTime)
      : []
    const lastWeekMatches = groupByDate.isLastWeek
      ? groupByDate.isLastWeek.sort((a, b) => b.startTime - a.startTime)
      : []
    return todayMatches.concat(thisWeekMatches, nextWeekMatches, lastWeekMatches)
  }

  matchesDateFormat = (startTime, endTime) => {
    let text = formatDateTime(startTime, 'ddd, D MMM YYYY')
    if (isToday(startTime, endTime)) {
      text = 'Today'
    } else if (isTomorrow(startTime, endTime)) {
      text = 'Tomorrow'
    }

    return text
  }

  handleFilterByLeague = value => {
    const { allMatches } = this.state
    const { data } = this.props.matches.matchesPlaylists
    let filterResult = []
    if (value == 'all') {
      filterResult = allMatches
    } else {
      data.forEach(dt => {
        if (value === dt.id) {
          const vidDt = dt.videos
          for (let i = 0; i < vidDt.length; i++) {
            filterResult.push(vidDt[i])
          }
        }
      })
    }
    this.setState({ matches: filterResult })
  }

  handleFilterByDate = value => {
    const { data } = this.props.matches.matchesPlaylists

    // validation for Week
    let filterResult = []
    let tempVideo = []

    data.forEach(dt => {
      const vidDt = dt.videos
      for (let i = 0; i < vidDt.length; i++) {
        tempVideo.push(vidDt[i])
      }
    })
    if (value == 'lastWeek') {
      tempVideo.forEach(el => {
        if (isLastWeek(el.startTime)) {
          filterResult.push(el)
        }
      })
    } else if (value == 'thisWeek') {
      tempVideo.forEach(el => {
        if (isThisWeek(el.startTime)) {
          filterResult.push(el)
        }
      })
    } else if (value == 'nextWeek') {
      tempVideo.forEach(el => {
        if (isNextWeek(el.startTime)) {
          filterResult.push(el)
        }
      })
    } else if (value !== '') {
      //by Date
      tempVideo.forEach(dt => {
        if (dt.startTime != null) {
          const isSame = isSameDay(value, dt.startTime)
          if (isSame) {
            filterResult.push(dt)
          }
        }
      })
    }

    this.setState({ matches: filterResult })
  }

  handleWeekClick = value => {
    let startWeekDate = ''
    let swdTimestamp = ''
    if (value == 1) {
      //lastMonday
      startWeekDate = moment().day(-6)
      const date = new Date(moment(startWeekDate).startOf('date'))
      swdTimestamp = date.getTime() / 1000
    }
    if (value == 2) {
      //thisMonday
      startWeekDate = moment().startOf('isoWeek')
      const date = new Date(moment().startOf('date'))
      swdTimestamp = date.getTime() / 1000
    }
    if (value == 3) {
      //nextWeek
      startWeekDate = moment().day(8)
      const date = new Date(moment(startWeekDate).startOf('date'))
      swdTimestamp = date.getTime() / 1000
    }

    this.setState({
      selectedWeek: value,
      filterByDates: swdTimestamp,
      startWeekDate: startWeekDate,
    })
  }

  handleCategoryFilter = value => {
    let selectedVal = value

    if (value) {
      this.setState({ filterByDates: selectedVal })
    }
  }

  renderHeader() {
    return (
      <div>
        <Header libraryOff greyBackground activeMenu="matches" isDark={0} isMobile {...this.props} />
      </div>
    )
  }

  renderDate(data, index, matchesList) {
    let isDifferent = false
    if (index > 0) {
      const thisDate = formatDateTime(data.startTime, 'DD MM YYYY')
      const prevDate = formatDateTime(matchesList[index - 1].startTime, 'DD MM YYYY')
      isDifferent = thisDate !== prevDate
      if (isDifferent) {
        return (
          <div className={styles.matches__date}>
            <p> {this.matchesDateFormat(data.startTime, data.endTime)}</p>
          </div>
        )
      } else {
        return ''
      }
    } else {
      return (
        <div className={styles.matches__date}>
          <p> {this.matchesDateFormat(data.startTime, data.endTime)}</p>
        </div>
      )
    }
  }

  renderMatchesList(matchesList) {
    return (
      <LazyLoad containerClassName={styles.matches__container}>
        {matchesList.length > 0 &&
          matchesList.map((data, index) => (
            <>
              {this.renderDate(data, index, matchesList)}
              <Link to={'/watch?v=' + data.id}>
                <MatchCard data={data} index={index} matchesList={matchesList} />
              </Link>
            </>
          ))}
        {matchesList.length === 0 && (
          <div className={styles.matches_empty}>Maaf tidak ada pertandingan yang disiarkan pada saat ini.</div>
        )}
      </LazyLoad>
    )
  }

  renderFilterWeek() {
    const filterList = [
      { id: '1', title: 'Last Week', value: 'lastWeek' },
      { id: '2', title: 'This Week', value: 'thisWeek' },
      { id: '3', title: 'Next Week', value: 'nextWeek' },
    ]

    return (
      <LazyLoad containerClassName={styles.matches__filterWeek}>
        <DropdownList
          className={styles.matches_dropdown_container_filterWeek}
          dataList={filterList}
          activeId={this.state.filterDefWeek}
          onClick={this.handleWeekClick}
        />
      </LazyLoad>
    )
  }

  renderFilterLeague() {
    const filterListshow = this.props.matches.matchesPlaylists

    let filterListTemp = [{ id: 'all', title: 'All' }]

    for (let i = 0; i < filterListshow.data.length; i++) {
      let filterData = filterListshow.data[i]
      filterListTemp.push(filterData)
    }

    console.log('filterListTemp', filterListTemp)

    return (
      <LazyLoad containerClassName={styles.matches__filter}>
        <DropdownList
          className={styles.matches_dropdown_container}
          dataList={filterListTemp}
          onClick={this.handleFilterByLeague}
        />
      </LazyLoad>
    )
  }

  render() {
    const { meta } = this.props.matches.matchesPlaylists
    const { matches, filterByDates, startWeekDate } = this.state
    let sortedByStartDate = matches
    if (matches.length > 0) {
      sortedByStartDate = matches.sort((a, b) => (a.startTime > b.startTime ? 1 : -1))
    }

    return (
      <Fragment>
        {meta.status === 'loading' && <> {<MatchesPlaceholder />} </>}
        {meta.status != 'error' && <> {this.renderHeader()}</>}
        {meta.status === 'error' && (
          <MatchesError status={meta.status} message={meta.error || 'Mola TV Matches is not loaded'} />
        )}
        {meta.status === 'success' && (
          <>
            {this.renderFilterLeague()}
            {this.renderFilterWeek()}
            {this.renderMatchesList(sortedByStartDate)}
            <LazyLoad containerClassName={styles.calendarCls}>
              <VerticalCalendar
                isMobile
                handleCategoryFilter={this.handleCategoryFilter}
                categoryFilterType={'ByDate'}
                selectedDate={filterByDates}
                {...this.props}
                startOfWeek={startWeekDate}
              />
            </LazyLoad>
          </>
        )}
      </Fragment>
    )
  }
}

const mapStateToProps = state => {
  return {
    ...state,
  }
}

const mapDispatchToProps = dispatch => ({
  getMatches: id => dispatch(matchListActions.getAllMatches(id)),
  getAllGenreSpo: id => dispatch(matchListActions.getAllGenreSpo(id)),
})

export default compose(withStyles(styles), connect(mapStateToProps, mapDispatchToProps))(Matches)

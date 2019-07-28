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
  addDateTime
} from '@source/lib/dateTimeUtil'
import matchListActions from '@actions/matches'
import VerticalCalendar from '@components/VerticalCalendar'
import moment from 'moment'

import Header from '@components/Header'
import MatchesError from '@components/common/error'
import LazyLoad from '@components/common/Lazyload'
import Link from '@components/Link'
import MatchList from '@components/MatchList'

import styles from './matches.css'
import Scroll from 'react-scroll'
let scroller = Scroll.scroller
class Matches extends Component {
  state = {
    initialized: false,
    matches: [],
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
    this.props.getAllGenreSpo()
    this.setDefaultDate()
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.matches.matchesPlaylists.meta.status != prevProps.matches.matchesPlaylists.meta.status &&
      this.props.matches.matchesPlaylists.meta.status === 'success'
    ) {
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

      let matchesList = this.getThreeWeeksDate(matchTemp)
      this.setState({ allMatches: matchesList, matches: matchesList })
      const formatStartTime = formatDateTime(Date.now() / 1000, 'DD MM YYYY')
      setTimeout(() => {
        scroller.scrollTo(formatStartTime, {
          duration: 1000,
          delay: 100,
          smooth: true,
          offset: -150, // Scrolls to element + 50 pixels down the page
        })
      }, 1000)
    }
  }

  getThreeWeeksDate = matches => {
    const sortMatches = _sortBy(matches, match => match.startTime)
    const startWeekDate = moment().subtract(1, 'weeks').startOf('isoWeek')

    let threeWeeksDate = []
    for (var i = 0; i < 21; i++) {
      const addedDate = new Date(addDateTime(startWeekDate, i, 'days'))
      const dtTimestamp = addedDate.getTime()
      const formattedDateTime = formatDateTime(dtTimestamp / 1000, 'DD MM YYYY')
      const formattedDateTime2 = formatDateTime(dtTimestamp / 1000, 'DD MMMM')
      threeWeeksDate.push({ dateId: formattedDateTime, title: formattedDateTime2 })
    }

    let matchList = []
    threeWeeksDate.map((weeksDate, index) => {
      let hasMatch = false
      sortMatches.map((matchDt, index) => {

        const formatStartTime = formatDateTime(matchDt.startTime, 'DD MM YYYY')
        if (formatStartTime === weeksDate.dateId) {
          hasMatch = true
          matchList.push(matchDt)
        }
      })
      if (!hasMatch) {
        matchList.push(weeksDate)
      }
    })
    return matchList
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

    const matchesList = this.getThreeWeeksDate(filterResult)

    const startWeekDate = moment().startOf('isoWeek')
    const date = new Date(moment().startOf('date'))
    const swdTimestamp = date.getTime() / 1000

    this.setState({
      matches: matchesList,
      filterByLeague: value,
      selectedWeek: 2,
      filterByDates: swdTimestamp,
      startWeekDate: startWeekDate,
    })

    const formatStartTime = formatDateTime(Date.now() / 1000, 'DD MM YYYY')
    setTimeout(() => {
      scroller.scrollTo(formatStartTime, {
        duration: 1000,
        smooth: true,
        offset: -150,
      })
    }, 1000)

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
      startWeekDate = moment().subtract(1, 'weeks').startOf('isoWeek')
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
      startWeekDate = moment().add(1, 'weeks').startOf('isoWeek')
      const date = new Date(moment(startWeekDate).startOf('date'))
      swdTimestamp = date.getTime() / 1000
    }

    this.setState({
      selectedWeek: value,
      filterByDates: swdTimestamp,
      startWeekDate: startWeekDate,
    })

    const formatStartTime = formatDateTime(swdTimestamp, 'DD MM YYYY')
    setTimeout(() => {
      scroller.scrollTo(formatStartTime, {
        duration: 1000,
        smooth: true,
        offset: -150,
      })
    }, 1000)
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

  // renderMatchesList(matchesList) {
  //   return (
  //     <LazyLoad containerClassName={styles.matches__container}>
  //       {matchesList.length > 0 &&
  //         matchesList.map((data, index) => (
  //           <>
  //             {this.renderDate(data, index, matchesList)}
  //             <Link to={'/watch?v=' + data.id}>
  //               <MatchCard data={data} index={index} matchesList={matchesList} />
  //             </Link>
  //           </>
  //         ))}
  //       {matchesList.length === 0 && (
  //         <div className={styles.matches_empty}>Maaf tidak ada pertandingan yang disiarkan pada saat ini.</div>
  //       )}
  //     </LazyLoad>
  //   )
  // }


  renderMatchCard = () => {
    const { matches } = this.state
    return matches.map((matchDt, index) => {
      if (matchDt.id) {
        let flag = true
        const formatStartTime = formatDateTime(matchDt.startTime, 'DD MM YYYY')
        if (index > 0) {
          const prevFrmtStrTime = formatDateTime(matches[index - 1].startTime, 'DD MM YYYY')
          if (prevFrmtStrTime == formatStartTime) {
            flag = false
          }
        }

        return (
          <>
            {this.renderDate(matchDt, index, matches)}
            <Link to={`/watch?v=${matchDt.id}`}>
              <MatchList
                key={matchDt.id}
                data={matchDt}
                noClickAble={false}
                formatStartTime={flag ? formatStartTime : ''}
              />
            </Link>
          </>
        )
      } else {
        return (
          <MatchList
            noClickAble={true}
            data={matchDt}
            formatStartTime={matchDt.dateId}
            isNoSchedule
            noScheduleTitle={'No Match'}
          />
        )
      }
    })
  }

  renderFilterWeek() {
    const filterList = [
      { id: 1, title: 'Last Week', value: 'lastWeek' },
      { id: 2, title: 'This Week', value: 'thisWeek' },
      { id: 3, title: 'Next Week', value: 'nextWeek' },
    ]

    const { selectedWeek } = this.state
    return (
      <LazyLoad containerClassName={styles.matches__filterWeek}>
        <DropdownList
          className={styles.matches_dropdown_container_filterWeek}
          dataList={filterList}
          activeId={selectedWeek}
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
    const { filterByDates, startWeekDate } = this.state

    return (
      <Fragment>
        {meta.status === 'loading' && <> {<MatchesPlaceholder />} </>}
        {meta.status != 'error' && <> {this.renderHeader()}</>}
        {meta.status === 'error' && (
          <MatchesError status={meta.status} message={meta.error || 'Mola TV Matches is not loaded'} />
        )}
        {meta.status === 'success' && (
          <>
            <div className={styles.filter__container}>
              {this.renderFilterLeague()}
              {this.renderFilterWeek()}
            </div>
            <LazyLoad containerClassName={styles.matches__container}>{this.renderMatchCard()}</LazyLoad>
            <LazyLoad containerClassName={styles.calendarCls}>
              <VerticalCalendar
                isMobile
                selectedDate={filterByDates}
                handleCategoryFilter={this.handleCategoryFilter}
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

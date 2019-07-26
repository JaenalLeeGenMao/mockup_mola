import React, { Component, Fragment } from 'react'

import { connect } from 'react-redux'
import { compose } from 'redux'
import _groupBy from 'lodash/groupBy'

import withStyles from 'isomorphic-style-loader/lib/withStyles'

import DropdownList from '@components/DropdownList'
import MatchesPlaceholder from './placeholder'

import MatchCard from './card'
import { formatDateTime, isToday, isTomorrow, isMatchPassed, isThisWeek, isNextWeek } from '@source/lib/dateTimeUtil'
import matchListActions from '@actions/matches'

import Header from '@components/Header'
import MatchesError from '@components/common/error'
import LazyLoad from '@components/common/Lazyload'
import Link from '@components/Link'

import styles from './matches.css'

class Matches extends Component {
  state = {
    initialized: false,
    matches: [],
    filter: 1,
    allMatches: [],
  }

  componentDidMount() {
    /* set the default active playlist onload */
    const { playlistId } = this.props
    playlistId ? this.props.getMatches(playlistId) : this.props.getMatches()
    this.props.getAllGenreSpo()
  }

  static getDerivedStateFromProps(props, state) {
    if (!state.initialized && props.matches.data.length > 0 && state.matches.length === 0) {
      return {
        filter: 0,
        initialized: true,
      }
    }
    return null
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.matches.matchesPlaylists.data.length != this.props.matches.matchesPlaylists.data.length && this.state.allMatches.length === 0) {
      // this.liveUpcomingFilter()

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
    const thisWeekMatches = groupByDate.isThisWeek ? groupByDate.isThisWeek.sort((a, b) => a.startTime - b.startTime) : []
    const nextWeekMatches = groupByDate.isNextWeek ? groupByDate.isNextWeek.sort((a, b) => a.startTime - b.startTime) : []
    const lastWeekMatches = groupByDate.isLastWeek ? groupByDate.isLastWeek.sort((a, b) => b.startTime - a.startTime) : []
    return todayMatches.concat(thisWeekMatches, nextWeekMatches, lastWeekMatches)
  }

  liveUpcomingFilter = () => {
    const { data } = this.props.matches
    const filteredMatch = []

    data.forEach(el => {
      if (!isMatchPassed(el.endTime)) {
        filteredMatch.push(el)
      }
    })

    this.setState({ matches: filteredMatch })
  }

  lastMatchesFilter = () => {
    const { data } = this.props.matches
    const filteredMatch = []

    data.forEach(el => {
      if (isMatchPassed(el.endTime)) {
        filteredMatch.push(el)
      }
    })

    this.setState({ matches: filteredMatch })
  }

  highlightFilter = () => {
    const { data } = this.props.matches
    const filteredMatch = []
    data.forEach(el => {
      if (el.isHighlight) {
        filteredMatch.push(el)
      }
    })

    this.setState({ matches: filteredMatch })
  }

  filterChange = filterId => {
    if (filterId == 0) {
      this.liveUpcomingFilter()
    }

    if (filterId == 1) {
      this.lastMatchesFilter()
    }

    if (filterId == 2) {
      this.highlightFilter()
    }
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
        {matchesList.length === 0 && <div className={styles.matches_empty}>Maaf tidak ada pertandingan yang disiarkan pada saat ini.</div>}
      </LazyLoad>
    )
  }

  renderFilter() {
    const filterList = [{ id: 0, title: 'Live and Upcoming' }, { id: 1, title: 'Last Matches' }, { id: 2, title: 'Highlight' }]
    return (
      <LazyLoad containerClassName={styles.matches__filter}>
        <DropdownList className={styles.matches_dropdown_container} dataList={filterList} activeId={this.state.filter} onClick={this.filterChange} />
      </LazyLoad>
    )
  }

  render() {
    const { meta } = this.props.matches
    const { matches } = this.state
    let sortedByStartDate = matches
    if (matches.length > 0) {
      sortedByStartDate = matches.sort((a, b) => (a.startTime > b.startTime ? 1 : -1))
    }

    return (
      <Fragment>
        {meta.status === 'loading' && <> {<MatchesPlaceholder />} </>}
        {meta.status != 'error' && <> {this.renderHeader()}</>}
        {meta.status === 'error' && <MatchesError status={meta.status} message={meta.error || 'Mola TV Matches is not loaded'} />}
        {meta.status === 'success' && (
          <>
            {this.renderFilter()}
            {this.renderMatchesList(sortedByStartDate)}
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

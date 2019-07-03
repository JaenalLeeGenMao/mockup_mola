import React, { Component, Fragment } from 'react'

import { connect } from 'react-redux'
import { compose } from 'redux'

import withStyles from 'isomorphic-style-loader/lib/withStyles'

import DropdownList from '@components/DropdownList'
import MatchesPlaceholder from './placeholder'

import MatchCard from './card'
import { formatDateTime, isToday, isTomorrow, isMatchPassed } from '@source/lib/dateTimeUtil'
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
  }

  componentDidMount() {
    /* set the default active playlist onload */
    this.props.getMatches()
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
    if (prevProps.matches.data.length != this.props.matches.data.length && this.state.matches.length === 0) {
      this.liveUpcomingFilter()
    }
  }

  liveUpcomingFilter = () => {
    const { data } = this.props.matches
    const filteredMatch = []

    data.forEach(el => {
      if (el.homeTeam && el.awayTeam && !isMatchPassed(el.endTime)) {
        filteredMatch.push(el)
      }
    })

    this.setState({ matches: filteredMatch })
  }

  lastMatchesFilter = () => {
    const { data } = this.props.matches
    const filteredMatch = []

    data.forEach(el => {
      if (el.homeTeam && el.awayTeam && isMatchPassed(el.endTime)) {
        filteredMatch.push(el)
      }
    })

    this.setState({ matches: filteredMatch })
  }

  highlightFilter = () => {
    const { data } = this.props.matches
    const filteredMatch = []

    data.forEach(el => {
      if (!el.homeTeam || !el.awayTeam) {
        filteredMatch.push(el)
      }
    })

    this.setState({ matches: filteredMatch })
  }

  filterChange = (filterId) => {
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

  matchesDateFormat = startTime => {
    let text = formatDateTime(startTime, 'ddd, D MMM YYYY')
    if (isToday(startTime)) {
      text = 'Today'
    } else if (isTomorrow(startTime)) {
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
            <p> {this.matchesDateFormat(data.startTime)}</p>
          </div>
        )
      } else {
        return ''
      }
    } else {
      return (
        <div className={styles.matches__date}>
          <p> {this.matchesDateFormat(data.startTime)}</p>
        </div>
      )
    }
  }

  renderMatchesList(matchesList) {
    return (
      <LazyLoad containerClassName={styles.matches__container}>
        {matchesList.length > 0 && matchesList.map((data, index) => (
          <>
            {this.renderDate(data, index, matchesList)}
            <Link to={'/watch?v=' + data.id}>
              <MatchCard data={data} index={index} matchesList={matchesList} />
            </Link>
          </>
        ))}
        {
          matchesList.length === 0 &&
          <div className={styles.matches_empty}>Maaf tidak ada pertandingan yang disiarkan pada saat ini.</div>
        }
      </LazyLoad>
    )
  }

  renderFilter() {
    const filterList = [
      { id: 0, title: 'Live and Upcoming' },
      { id: 1, title: 'Last Matches' },
      { id: 2, title: 'Highlight' }
    ]
    return (
      <LazyLoad containerClassName={styles.matches__filter}>
        <DropdownList
          className={styles.matches_dropdown_container}
          dataList={filterList}
          activeId={this.state.filter}
          onClick={this.filterChange} />
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
  getMatches: () => dispatch(matchListActions.getAllMatches()),
})

export default compose(withStyles(styles), connect(mapStateToProps, mapDispatchToProps))(Matches)

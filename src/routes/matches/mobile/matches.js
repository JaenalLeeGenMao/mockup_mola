import React, { Component, Fragment } from 'react'

import { connect } from 'react-redux'
import { compose } from 'redux'

import withStyles from 'isomorphic-style-loader/lib/withStyles'
import _get from 'lodash/get'
import moment from 'moment'

import MatchCard from './card'
// import MatchPlaceholder from './placeholder'

import matchListActions from '@actions/matches'

import Header from '@components/Header'
import MatchesError from '@components/common/error'
import LazyLoad from '@components/common/Lazyload'
import Link from '@components/Link'

import styles from './matches.css'

// those function should be in utils files
const convertToLocalDateTime = unix => {
  const getLocalDate = moment.unix(unix).utc()
  const date = new Date(getLocalDate)
  return date
}

const dateDiff = (current, dateCompare) => {
  const currentLocalTime = convertToLocalDateTime(current)
  const dateCompareLocalTime = convertToLocalDateTime(dateCompare)
  const compare = moment(currentLocalTime).diff(dateCompareLocalTime, 'day')

  return compare
}

class Matches extends Component {
  state = {
    playlists: [],
    videos: [],
    data: [],
  }

  componentDidMount() {
    /* set the default active playlist onload */
    this.props.getMatches()
  }

  matchesDateFormat = unix => {
    const localTime = convertToLocalDateTime(unix)

    const time = moment(localTime).format('ddd, D MMM YYYY')
    let text = time

    const dateDifference = dateDiff(moment().unix(), unix)
    const isToday = dateDifference === 0
    const isTomorrow = dateDifference === -1
    if (isToday) {
      text = 'Today'
    } else if (isTomorrow) {
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
      isDifferent = dateDiff(data.startTime, matchesList[index - 1].startTime) != 0
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
        {matchesList.map((data, index) => (
          <>
            {this.renderDate(data, index, matchesList)}
            <div>
              <MatchCard data={data} index={index} matchesList={matchesList} />
            </div>
          </>
        ))}
      </LazyLoad>
    )
  }

  renderFilter() {
    return (
      <LazyLoad containerClassName={styles.matches__filter}>
        <select>
          <option value="0">Live and Upcoming</option>
          <option value="1">Last Matches</option>
          <option value="2">Highlight</option>
        </select>
      </LazyLoad>
    )
  }

  render() {
    const isSafari = /.*Version.*Safari.*/.test(navigator.userAgent)
    const { data, meta } = this.props.matches

    const sortedByStartDate = data.sort((a, b) => (a.startTime > b.startTime ? 1 : -1))

    return (
      <Fragment>
        {/* {meta.status === 'loading' && <MatchesPlaceholder />} */}
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
  getMatches: () => dispatch(matchListActions.getSportList()),
})

export default compose(withStyles(styles), connect(mapStateToProps, mapDispatchToProps))(Matches)

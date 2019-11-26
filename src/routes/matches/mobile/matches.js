import React, { Component, Fragment } from 'react'

import { connect } from 'react-redux'
import { compose } from 'redux'
import _sortBy from 'lodash/sortBy'

import withStyles from 'isomorphic-style-loader/lib/withStyles'

import DropdownList from '@components/DropdownList'
import MatchesPlaceholder from './placeholder'

import Joyride from 'react-joyride'
import { EVENTS, ACTIONS } from 'react-joyride/lib/constants'
import { tourSteps } from './const'

import {
  formatDateTime,
  isToday,
  isTomorrow,
  isMatchLive,
  isThisWeek,
  isNextWeek,
  isSameDay,
  isLastWeek,
  addDateTime,
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
const startDate = new Date(
  moment()
    .subtract(1, 'weeks')
    .startOf('isoWeek')
)

const endDate = new Date(
  moment()
    .add(1, 'weeks')
    .endOf('isoWeek')
)

const formatStartDate = formatDateTime(startDate.getTime() / 1000, 'YYYYMMDD')
const formatEndDate = formatDateTime(endDate.getTime() / 1000, 'YYYYMMDD')

class Matches extends Component {
  state = {
    initialized: false,
    matches: [],
    filterByDates: '',
    filterByType: '',
    filterByLeague: 'league-epl',
    selectedWeek: 2,
    allMatches: [],
    selectedDate: null,
    startWeekDate: null,
    hasLive: false,
    noMatch: false,
    startGuide: false,
    stepIndex: 0,
    steps: tourSteps.en,
    matchesPlaylistsSuccess: false,
    screenWidth: 245,
  }

  setDefaultDate = () => {
    //set today change color
    const startWeekDate = moment().startOf('isoWeek')
    const date = new Date(moment().startOf('date'))
    const swdTimestamp = date.getTime() / 1000

    this.setState({
      // filterByDates: swdTimestamp,
      startWeekDate: startWeekDate,
    })
  }

  componentDidMount() {
    this.props.getLeaguesAndMatch('leagues', formatStartDate, formatEndDate)

    this.setDefaultDate()
    if (this.props.matches.matchesPlaylists.meta.status === 'success') {
      this.setInitialData()
    }
    if (window.innerWidth < 375 && window.innerHeight < 600) {
      this.setState({
        screenWidth: 200,
      })
    }
  }

  handleTourCallback = data => {
    const { type, action, index } = data
    // console.log('tipe', type)
    // console.log('aksi', action)
    // console.log('indeks', index)
    if (type === EVENTS.TOUR_END) {
      try {
        localStorage.setItem('tour-matches', true)
      } catch (err) {}
      this.setState({
        startGuide: false,
      })
      const disableScroll = document.getElementsByTagName('body')
      disableScroll[0].style.overflow = 'visible'
      const formatStartTime = formatDateTime(Date.now() / 1000, 'YYMMDD')
      setTimeout(() => {
        scroller.scrollTo(formatStartTime, {
          duration: 500,
          smooth: true,
          offset: -150, // Scrolls to element + 50 pixels down the page
        })
      }, 500)
      return true
    }
    if (type === EVENTS.STEP_AFTER && action === ACTIONS.NEXT) {
      this.setState({
        stepIndex: index + 1,
      })
    } else if (type === EVENTS.STEP_AFTER && action === ACTIONS.PREV) {
      this.setState({
        stepIndex: index - 1,
      })
    }
    // else {
    //   if (action === ACTIONS.NEXT && index === 5) {
    //     this.setState({
    //       stepIndex: index + 1,
    //     })
    //   }
    // }
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.matches.matchesPlaylists.meta.status != prevProps.matches.matchesPlaylists.meta.status &&
      this.props.matches.matchesPlaylists.meta.status === 'success'
    ) {
      this.setInitialData()
      this.initTour()
    }
  }

  initTour = () => {
    this.setState(
      {
        matchesPlaylistsSuccess: true,
      },
      () => {
        let isTourDone = true
        try {
          isTourDone = localStorage.getItem('tour-matches')
        } catch (err) {}
        if (!isTourDone) {
          this.setState({
            startGuide: true,
          })
          const disableScroll = document.getElementsByTagName('body')
          disableScroll[0].style.overflow = 'hidden'
        }
      }
    )
  }

  setInitialData = () => {
    // let matchTemp = []
    // const { data } = this.props.matches.matchesPlaylists
    // data.forEach(dt => {
    //   if (dt.id) {
    //     const vidDt = dt.videos
    //     for (let i = 0; i < vidDt.length; i++) {
    //       matchTemp.push(vidDt[i])
    //     }
    //   }
    // })

    // const result = this.getThreeWeeksDate(matchTemp)
    // let matchesList = result.matchesList
    // this.setState({ allMatches: matchesList, matches: matchesList, hasLive: result.hasLive })

    const { data } = this.props.matches.matchesPlaylists
    const matchData = data.length > 0 ? data[0].videos : null
    const filteredMatches = this.getThreeWeeksDate(matchData)
    this.setState({ matches: filteredMatches })

    if (!this.state.startGuide && localStorage.getItem('tour-matches')) {
      const formatStartTime = formatDateTime(Date.now() / 1000, 'YYMMDD')
      setTimeout(() => {
        scroller.scrollTo(formatStartTime, {
          duration: 500,
          smooth: true,
          offset: -150, // Scrolls to element + 50 pixels down the page
        })
      }, 500)
    }
  }

  getThreeWeeksDate = matches => {
    const startWeekDate = moment()
      .subtract(1, 'weeks')
      .startOf('isoWeek')
    const sortMatches = _sortBy(matches, match => match.startTime)
    let threeWeeksDate = []
    for (var i = 0; i < 21; i++) {
      const addedDate = new Date(addDateTime(startWeekDate, i, 'days'))
      const dtTimestamp = addedDate.getTime()
      const formattedDateTime = formatDateTime(dtTimestamp / 1000, 'YYMMDD')
      const formattedDateTime2 = formatDateTime(dtTimestamp / 1000, 'DD MMM')
      threeWeeksDate.push({ dateId: formattedDateTime, title: formattedDateTime2 })
    }

    let matchesList = []
    threeWeeksDate.map(weeksDate => {
      let hasMatch = false
      sortMatches.map((matchDt, index) => {
        const formatStartTime = formatDateTime(matchDt.startTime, 'YYMMDD')
        if (formatStartTime === weeksDate.dateId) {
          hasMatch = true
          matchesList.push(matchDt)
        }
      })
      if (!hasMatch) {
        matchesList.push({ ...weeksDate })
      }
    })

    return matchesList
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
    // const { allMatches } = this.state
    // const { data } = this.props.matches.matchesPlaylists
    // let filterResult = []
    // if (value == 'all') {
    //   filterResult = allMatches
    // } else {
    //   data.forEach(dt => {
    //     if (value === dt.id) {
    //       const vidDt = dt.videos
    //       for (let i = 0; i < vidDt.length; i++) {
    //         filterResult.push(vidDt[i])
    //       }
    //     }
    //   })
    // }
    // const result = this.getThreeWeeksDate(filterResult)
    // const matchesList = result.matchesList

    // let flag = true
    // for (let i = 0; i < result.matchesList.length; i++) {
    //   if (result.matchesList[i].id) {
    //     flag = false
    //   }
    // }

    this.props.getMatchesPlaylists(value, formatStartDate, formatEndDate)
    const startWeekDate = moment().startOf('isoWeek')
    const date = new Date(moment().startOf('date'))
    const swdTimestamp = date.getTime() / 1000

    this.setState({
      // noMatch: flag,
      // matches: matchesList,
      filterByLeague: value,
      selectedWeek: 2,
      filterByDates: swdTimestamp,
      startWeekDate: startWeekDate,
      // hasLive: result.hasLive,
    })

    const formatStartTime = formatDateTime(Date.now() / 1000, 'YYMMDD')
    setTimeout(() => {
      scroller.scrollTo(formatStartTime, {
        duration: 500,
        smooth: false,
        offset: -150,
      })
    }, 500)
  }

  renderNoMatchLeague = () => {
    return <div className={styles.noMatch}>Tidak Ada Pertandingan</div>
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
      startWeekDate = moment()
        .subtract(1, 'weeks')
        .startOf('isoWeek')
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
      startWeekDate = moment()
        .add(1, 'weeks')
        .startOf('isoWeek')
      const date = new Date(moment(startWeekDate).startOf('date'))
      swdTimestamp = date.getTime() / 1000
    }

    this.setState({
      selectedWeek: value,
      filterByDates: swdTimestamp,
      startWeekDate: startWeekDate,
    })

    const formatStartTime = formatDateTime(swdTimestamp, 'YYMMDD')
    setTimeout(() => {
      scroller.scrollTo(formatStartTime, {
        duration: 500,
        smooth: true,
        offset: -150,
      })
    }, 500)
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
      const thisDate = formatDateTime(data.startTime, 'YYMMDD')
      const prevDate = formatDateTime(matchesList[index - 1].startTime, 'YYMMDD')
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

  // renderMatchCard = () => {
  //   const { matches, noMatch } = this.state

  //   let flagLive = false

  //   if (matches.length < 0) {
  //     return this.renderNoMatchLeague()
  //   }
  //   if (noMatch) {
  //     return this.renderNoMatchLeague()
  //   }

  //   return matches.map((matchDt, index) => {
  //     if (matchDt.id) {
  //       let flag = true
  //       const formatStartTime = formatDateTime(matchDt.startTime, 'YYMMDD')
  //       if (index > 0) {
  //         const prevFrmtStrTime = matches[index - 1].startTime
  //           ? formatDateTime(matches[index - 1].startTime, 'YYMMDD')
  //           : ''
  //         if (prevFrmtStrTime == formatStartTime) {
  //           flag = false
  //         }
  //       }
  //       const matchLive = isMatchLive(matchDt.startTime, matchDt.endTime)
  //       if (!flagLive && matchLive) {
  //         flagLive = matchLive
  //       } else {
  //         flagLive = false
  //       }

  //       return (
  //         <>
  //           {this.renderDate(matchDt, index, matches)}
  //           <Link to={`/watch?v=${matchDt.id}`}>
  //             <MatchList
  //               toJumpLive={flagLive}
  //               key={matchDt.id}
  //               data={matchDt}
  //               noClickAble={false}
  //               formatStartTime={flag ? formatStartTime : ''}
  //             />
  //           </Link>
  //         </>
  //       )
  //     } else {
  //       return (
  //         <Link>
  //           <MatchList
  //             noClickAble={true}
  //             data={matchDt}
  //             formatStartTime={matchDt.dateId}
  //             isNoSchedule
  //             noScheduleTitle={'No Match'}
  //           />
  //         </Link>
  //       )
  //     }
  //   })
  // }

  renderMatchCard = () => {
    const { data } = this.props.matches.matchesPlaylists

    let noMatch = true
    let flagLive = false

    const matchData = data.length > 0 ? data[0].videos : null
    const matches = this.getThreeWeeksDate(matchData)

    for (let i = 0; i < matches.length; i++) {
      //kalau ada minimal 1 pertandingan
      if (matches[i].id) {
        noMatch = false
      }
    }

    if (matches.length < 0) {
      return this.renderNoMatchLeague()
    }

    if (noMatch) {
      return this.renderNoMatchLeague()
    }

    return matches.map((matchDt, index) => {
      if (matchDt.id) {
        let flag = true
        const formatStartTime = formatDateTime(matchDt.startTime, 'YYMMDD')
        if (index > 0) {
          const prevFrmtStrTime = matches[index - 1].startTime
            ? formatDateTime(matches[index - 1].startTime, 'YYMMDD')
            : ''
          if (prevFrmtStrTime == formatStartTime) {
            flag = false
          }
        }
        const matchLive = isMatchLive(matchDt.startTime, matchDt.endTime)
        if (!flagLive && matchLive) {
          flagLive = matchLive
        } else {
          flagLive = false
        }

        return (
          <Link to={`/watch?v=${matchDt.id}`}>
            <MatchList
              toJumpLive={flagLive}
              key={matchDt.id}
              data={matchDt}
              noClickAble={false}
              formatStartTime={flag ? formatStartTime : ''}
            />
          </Link>
        )
      } else {
        return (
          <Link>
            <MatchList
              noClickAble={true}
              data={matchDt}
              formatStartTime={matchDt.dateId}
              isNoSchedule
              noScheduleTitle={'No Match'}
            />
          </Link>
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
          className={`${styles.matches_dropdown_container_filterWeek} tourWeek`}
          dataList={filterList}
          activeId={selectedWeek}
          onClick={this.handleWeekClick}
        />
      </LazyLoad>
    )
  }

  renderFilterLeague() {
    const { leagueList } = this.props.matches
    // let filterListTemp = [{ id: 'all', title: 'All' }]

    // for (let i = 0; i < filterListshow.data.length; i++) {
    //   let filterData = filterListshow.data[i]
    //   filterListTemp.push(filterData)
    // }

    return (
      <LazyLoad containerClassName={styles.matches__filter}>
        <DropdownList
          activeId={this.state.filterByLeague}
          className={styles.matches_dropdown_container}
          labelClassName={`${styles.matches_dropdown_label}`}
          dataList={leagueList.data}
          onClick={this.handleFilterByLeague}
        />
      </LazyLoad>
    )
  }

  handleJumpToLive = () => {
    setTimeout(() => {
      scroller.scrollTo('isLive', {
        duration: 500,
        smooth: true,
        offset: -150, // Scrolls to element + 50 pixels down the page
      })
    }, 500)
  }

  render() {
    const { matchesPlaylists, leagueList } = this.props.matches
    const { filterByDates, startWeekDate, hasLive, startGuide, steps, stepIndex, screenWidth } = this.state

    const customTourStyle = {
      buttonNext: {
        backgroundColor: '#2C56FF',
        fontSize: '1.06rem',
        lineHeight: '1',
        padding: '8px 15px',
        textTransform: 'uppercase',
        letterSpacing: '1.67px',
        borderRadius: '30px',
        fontWeight: '600',
      },
      buttonBack: {
        color: '#000000',
        fontSize: '1.06rem',
        textTransform: 'uppercase',
        letterSpacing: '1.67px',
        fontWeight: '600',
      },
      buttonClose: {
        display: 'none',
      },
      buttonSkip: {
        color: '#000000',
        fontWeight: '600',
        fontSize: '1.06rem',
        textTransform: 'uppercase',
        letterSpacing: '1.67px',
        padding: '0',
      },
      tooltipContent: {
        fontSize: '1.06rem',
        padding: '0',
        textAlign: 'left',
        color: '#858585',
        lineHeight: '1.3',
        letterSpacing: '0.5px',
      },
      tooltipTitle: {
        fontSize: '1.15rem',
        textAlign: 'left',
        margin: '0px 0px 8px',
        letterSpacing: '0.59px',
        textTransform: 'uppercase',
      },
      overlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
      },
      spotlight: {
        borderRadius: '5px',
        backgroundColor: 'rgb(203, 203, 203, 0.7)',
      },
      tooltip: {
        width: screenWidth,
      },
    }

    return (
      <Fragment>
        {leagueList.meta.status === 'loading' && <> {<MatchesPlaceholder />} </>}
        {this.renderHeader()}
        {(matchesPlaylists.meta.status === 'error' || leagueList.meta.status === 'error') && (
          <MatchesError
            status={matchesPlaylists.meta.status}
            message={'Something went wrong, please try again later'}
          />
        )}
        {leagueList.meta.status === 'success' && (
          <>
            {matchesPlaylists.meta.status !== 'loading' &&
              matchesPlaylists.meta.status !== 'error' && (
                <>
                  <div className={styles.matches_header_bg} />
                  <div className={styles.filter__container}>
                    {this.renderFilterLeague()}
                    {this.renderFilterWeek()}
                  </div>
                  <LazyLoad containerClassName={`${styles.matches__container} tourMatchStatus`}>
                    {this.renderMatchCard()}
                  </LazyLoad>
                  <LazyLoad containerClassName={styles.calendarCls}>
                    <VerticalCalendar
                      isMobile
                      selectedDate={filterByDates}
                      handleCategoryFilter={this.handleCategoryFilter}
                      {...this.props}
                      startOfWeek={startWeekDate}
                      hasLiveLogo={matchesPlaylists.hasLive}
                      handleJumpToLive={this.handleJumpToLive}
                      isChannel={false}
                    />
                  </LazyLoad>
                </>
              )}
            {matchesPlaylists.meta.status === 'loading' && <> {<MatchesPlaceholder />} </>}
          </>
        )}
        <Joyride
          disableOverlayClose={true}
          stepIndex={stepIndex}
          continuous
          showSkipButton
          steps={steps}
          run={startGuide}
          styles={customTourStyle}
          floaterProps={{ disableAnimation: true }}
          callback={this.handleTourCallback}
        />
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
  getLeaguesAndMatch: (id, startDate, endDate) => dispatch(matchListActions.getLeaguesAndMatch(id, startDate, endDate)),
  getMatchesPlaylists: (id, startDate, endDate) =>
    dispatch(matchListActions.getMatchesPlaylists(id, startDate, endDate)),
})

export default compose(withStyles(styles), connect(mapStateToProps, mapDispatchToProps))(Matches)

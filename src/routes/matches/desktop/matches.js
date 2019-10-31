import React from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'

import withStyles from 'isomorphic-style-loader/lib/withStyles'
import _sortBy from 'lodash/sortBy'
import moment from 'moment'
// import InfiniteScroll from 'react-infinite-scroll-component'
import Joyride from 'react-joyride'
import { EVENTS, ACTIONS } from 'react-joyride/lib/constants'
import { tourSteps } from './const'

import matchListActions from '@actions/matches'

import { formatDateTime, addDateTime, isMatchLive } from '@source/lib/dateTimeUtil'

import Header from '@components/Header'
// import MatchCard from '@components/MatchCard'
import MatchList from '@components/MatchList'
import Link from '@components/Link'
import LazyLoad from '@components/common/Lazyload'
import VerticalCalendar from '@components/VerticalCalendar'
import HorizontalPlaylist from '@components/HorizontalPlaylist'

import Placeholder from './placeholder'
import s from './matches.css'
// import _unionBy from 'lodash/unionBy'
// import { IoIosReturnLeft } from 'react-icons/io'
import Scroll from 'react-scroll'
const customTourStyle = {
  // options: {
  //   arrowColor: 'red'
  // },
  buttonNext: {
    backgroundColor: '#2C56FF',
    fontSize: '1.3rem',
    lineHeight: '1',
    padding: '8px 15px',
    textTransform: 'uppercase',
    letterSpacing: '1.67px',
    borderRadius: '30px',
    fontWeight: '600',
  },
  buttonBack: {
    color: '#000000',
    fontSize: '1.3rem',
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
    fontSize: '1.3rem',
    textTransform: 'uppercase',
    letterSpacing: '1.67px',
    padding: '0',
  },
  tooltipContent: {
    fontSize: '1.4rem',
    padding: '0',
    textAlign: 'left',
    color: '#858585',
    lineHeight: '2rem',
    letterSpacing: '0.5px',
  },
  tooltipTitle: {
    fontSize: '1.5rem',
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
    borderRadius: '.4rem',
  },
}
let scroller = Scroll.scroller
class Matches extends React.Component {
  constructor(props) {
    super(props)
  }

  state = {
    hasMore: true,
    resultShowData: 1,
    initialized: false,
    matches: [],
    allMatches: [],
    modalActive: false,
    selectedLeagueData: [],
    expandThisWeek: true,
    expandVideoType: true,
    expandLeague: true,
    filterByDates: '',
    filterByLeague: 'All',
    startGuide: false,
    stepIndex: 0,
    steps: tourSteps.en,
    matchesPlaylistsSuccess: false,
    // filterAllLeague: 0,
    selectedWeek: 2, //1 = last week, 2 = this week, 3 = next week,
    selectedDate: null,
    startWeekDate: null,
    hasLive: false,
    noMatch: false,
    thumbnailLoaded: false,
  }

  setDefaultDate = () => {
    const startWeekDate = moment().startOf('isoWeek')
    const date = new Date(moment().startOf('date'))
    const swdTimestamp = date.getTime() / 1000

    this.setState({
      filterByDates: swdTimestamp,
      startWeekDate: startWeekDate,
    })
  }

  componentDidMount() {
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

    this.props.getLeaguesAndMatch('leagues', formatStartDate, formatEndDate)
    this.setDefaultDate()

    if (this.props.matches.matchesPlaylists.meta.status === 'success') {
      this.setInitialData()
    }

    if (window.innerHeight > 1801) {
      const tvStyle = Object.assign({}, customTourStyle)
      tvStyle.tooltip.width = '30rem'
      // tvStyle.tooltip.height = '18rem'
      tvStyle.tooltip.padding = '1.6rem'
      tvStyle.tooltipContent.padding = '0'
      tvStyle.tooltipContent.minHeight = '1.4rem'
    }
  }

  componentWillMount() {
    // window.addEventListener('scroll', this.onScroll)
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
    let hasLive = false
    threeWeeksDate.map(weeksDate => {
      let hasMatch = false
      sortMatches.map((matchDt, index) => {
        const formatStartTime = formatDateTime(matchDt.startTime, 'YYMMDD')
        if (!hasLive) {
          hasLive = isMatchLive(matchDt.startTime, matchDt.endTime)
        }
        if (formatStartTime === weeksDate.dateId) {
          hasMatch = true
          matchesList.push(matchDt)
        }
      })
      if (!hasMatch) {
        matchesList.push({ ...weeksDate })
      }
    })

    return { matchesList, hasLive }
  }

  setInitialData = () => {
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

    const result = this.getThreeWeeksDate(matchTemp)
    let matchesList = result.matchesList
    this.setState({ allMatches: matchesList, matches: matchesList, hasLive: result.hasLive })
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

  componentDidUpdate(prevProps) {
    if (
      this.props.matches.matchesPlaylists.meta.status != prevProps.matches.matchesPlaylists.meta.status &&
      this.props.matches.matchesPlaylists.meta.status === 'success'
    ) {
      this.setInitialData()
      this.initTour()
    }
  }

  handleFilterByLeague = value => {
    const { data } = this.props.matches.matchesPlaylists

    let filterResult = []
    data.forEach(dt => {
      if (value === dt.id) {
        const vidDt = dt.videos
        for (let i = 0; i < vidDt.length; i++) {
          filterResult.push(vidDt[i])
        }
      }
    })
    return filterResult
  }

  // handleFilterAllLeague = (value, matches) => {
  //   const { data } = this.props.matches.matchesPlaylists
  //   // for view all video from league
  //   let filterResult = []
  //   if (value !== 0) {
  //     data.forEach(dt => {
  //       if (dt.id) {
  //         const vidDt = dt.videos
  //         for (let i = 0; i < vidDt.length; i++) {
  //           filterResult.push(vidDt[i])
  //         }
  //       }
  //     })
  //   } else {
  //     return matches
  //   }
  //   return filterResult
  // }

  handleDateFilter = value => {
    this.setState({ filterByDates: value })
  }

  handleCategoryFilter = value => {
    let filterLeagueRes = []
    const { allMatches } = this.state

    let matchesList = []
    let result

    const startWeekDate = moment().startOf('isoWeek')
    const date = new Date(moment().startOf('date'))
    const swdTimestamp = date.getTime() / 1000

    if (value == 'All') {
      filterLeagueRes = allMatches
    } else {
      filterLeagueRes = this.handleFilterByLeague(value, allMatches)
    }

    result = this.getThreeWeeksDate(filterLeagueRes)
    matchesList = result.matchesList
    let flag = true
    for (let i = 0; i < result.matchesList.length; i++) {
      //kalau ada minimal 1 pertandingan
      if (result.matchesList[i].id) {
        flag = false
      }
    }

    this.setState({
      noMatch: flag,
      matches: matchesList,
      filterByLeague: value,
      selectedWeek: 2,
      filterByDates: swdTimestamp,
      startWeekDate: startWeekDate,
      hasLive: result.hasLive,
    })

    const formatStartTime = formatDateTime(Date.now() / 1000, 'YYMMDD')
    setTimeout(() => {
      scroller.scrollTo(formatStartTime, {
        duration: 500,
        smooth: true,
        offset: -150,
      })
    }, 500)
  }

  renderNoMatchLeague = () => {
    return <div className={s.noMatch}>Tidak Ada Pertandingan</div>
  }

  //expand This Week
  handleExpandCategoryThisWeek = () => {
    this.setState({ expandThisWeek: !this.state.expandThisWeek })
  }

  //expand Video Type
  handleExpandCategoryVideoType = () => {
    this.setState({ expandVideoType: !this.state.expandVideoType })
  }

  //expand League
  handleExpandCategoryLeague = () => {
    this.setState({ expandLeague: !this.state.expandLeague })
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

  renderWeek = () => {
    const { selectedWeek } = this.state

    const weekList = [
      { id: 'lastweek', title: 'Last Week', value: '1' },
      { id: 'thisweek', title: 'This Week', value: '2' },
      { id: 'nextweek', title: 'Next Week', value: '3' },
      // { id: 'today', title: 'Today' },
      // { id: 'tomorrow', title: 'xTomorrow' },
    ]

    return (
      <>
        {weekList.map(dt => {
          return (
            <div
              key={dt.id}
              value={dt.id}
              onClick={() => {
                this.handleWeekClick(dt.value)
              }}
              className={`${s.filterLabel} ${dt.value == selectedWeek ? s.selectedFilter : ''}`}
            >
              {dt.title}
            </div>
          )
        })}
      </>
    )
  }

  categoryFilter = () => {
    return (
      <>
        {/* this week left menu */}
        {this.state.expandThisWeek && (
          <div className={s.filterContent_container}>
            <span className={`${s.tourWeek} tourWeek`}> {this.renderWeek()}</span>
          </div>
        )}
      </>
    )
  }
  categoryFilterAll = () => {
    return (
      <>
        <span>{this.renderFilterAll()}</span>
      </>
    )
  }

  renderMatchCard = () => {
    const { matches, noMatch } = this.state
    let flagLive = false

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

  handleJumpToLive = () => {
    setTimeout(() => {
      scroller.scrollTo('isLive', {
        duration: 500,
        smooth: true,
        offset: -150, // Scrolls to element + 50 pixels down the page
      })
    }, 500)
  }

  loadedThumbnail = val => {
    this.setState({
      thumbnailLoaded: val,
    })
  }

  render() {
    const matchPlaylists = this.props.matches.matchesPlaylists

    const { filterByDates, startWeekDate, hasLive, startGuide, steps, stepIndex } = this.state
    const isDark = false
    return (
      <>
        {/* <Joyride
          disableOverlayClose={true}
          stepIndex={stepIndex}
          continuous
          showSkipButton
          steps={steps}
          run={startGuide}
          styles={customTourStyle}
          floaterProps={{ disableAnimation: true }}
          callback={this.handleTourCallback}
        /> */}
        <div className={s.headerContainer}>
          <Header stickyOff searchOff isDark={isDark} activeMenu="matches" libraryOff {...this.props} />
        </div>
        {matchPlaylists.meta.status === 'loading' && <Placeholder />}
        {matchPlaylists.meta.status === 'success' && (
          <>
            <div className={s.root}>
              <div className={s.matchlist_container} id="containercard">
                {/* start data infinite scroll*/}
                <div className={s.matchlist_wrapper}>
                  <HorizontalPlaylist
                    handleCategoryFilter={this.handleCategoryFilter}
                    matchesPlaylists={this.props.matches.matchesPlaylists}
                    filterByLeague={this.state.filterByLeague}
                    // filterAllLeague={this.state.filterAllLeague}
                    expandLeague={this.state.expandLeague}
                    categoryFilterType={'League'}
                    categoryFilterAll={'All'}
                    allButtonOn
                    allCat
                    loadedThumbnail={this.loadedThumbnail}
                  />
                  <div className={s.matches_header_bg} />
                  <div className={s.matches_grid}>
                    <span>{this.categoryFilter()}</span>
                    <span className={'tourMatchStatus'}>
                      <div className={s.matchlist_wrappercontent_center}>
                        <div className={s.matchlist_content_center}>{this.renderMatchCard()}</div>
                      </div>
                    </span>
                    <VerticalCalendar
                      handleCategoryFilter={this.handleDateFilter}
                      selectedDate={filterByDates}
                      startOfWeek={startWeekDate}
                      hasLiveLogo={hasLive}
                      handleJumpToLive={this.handleJumpToLive}
                      isChannel={false}
                    />
                  </div>
                </div>
              </div>
              {/* end data infinite scroll */}
            </div>
            {this.state.thumbnailLoaded && (
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
            )}
          </>
        )}
      </>
    )
  }
}

function mapStateToProps(state) {
  return {
    ...state,
  }
}
const mapDispatchToProps = dispatch => ({
  getLeaguesAndMatch: (id, startDate, endDate) => dispatch(matchListActions.getLeaguesAndMatch(id, startDate, endDate)),
})

export default compose(withStyles(s), connect(mapStateToProps, mapDispatchToProps))(Matches)

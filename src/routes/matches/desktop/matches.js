import React from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'

import withStyles from 'isomorphic-style-loader/lib/withStyles'
import _sortBy from 'lodash/sortBy'
import moment from 'moment'
// import InfiniteScroll from 'react-infinite-scroll-component'

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
    // filterAllLeague: 0,
    selectedWeek: 2, //1 = last week, 2 = this week, 3 = next week,
    selectedDate: null,
    startWeekDate: null,
    hasLive: false,
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
    this.props.getAllGenreSpo()
    this.setDefaultDate()

    if (this.props.matches.matchesPlaylists.meta.status === 'success') {
      this.setInitialData()
    }
  }

  componentWillMount() {
    // window.addEventListener('scroll', this.onScroll)
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
      const formattedDateTime = formatDateTime(dtTimestamp / 1000, 'DD MM YYYY')
      const formattedDateTime2 = formatDateTime(dtTimestamp / 1000, 'DD MMMM')
      threeWeeksDate.push({ dateId: formattedDateTime, title: formattedDateTime2 })
    }

    let matchesList = []
    let hasLive = false
    threeWeeksDate.map(weeksDate => {
      let hasMatch = false
      sortMatches.map((matchDt, index) => {
        const formatStartTime = formatDateTime(matchDt.startTime, 'DD MM YYYY')
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
    const formatStartTime = formatDateTime(Date.now() / 1000, 'DD MM YYYY')
    setTimeout(() => {
      scroller.scrollTo(formatStartTime, {
        duration: 500,
        smooth: true,
        offset: -150, // Scrolls to element + 50 pixels down the page
      })
    }, 500)
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.matches.matchesPlaylists.meta.status != prevProps.matches.matchesPlaylists.meta.status &&
      this.props.matches.matchesPlaylists.meta.status === 'success'
    ) {
      this.setInitialData()
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

    if (value == 'all') {
      filterLeagueRes = allMatches
    } else {
      filterLeagueRes = this.handleFilterByLeague(value, allMatches)
    }

    result = this.getThreeWeeksDate(filterLeagueRes)
    matchesList = result.matchesList

    this.setState({
      matches: matchesList,
      filterByLeague: value,
      selectedWeek: 2,
      filterByDates: swdTimestamp,
      startWeekDate: startWeekDate,
      hasLive: result.hasLive,
    })

    const formatStartTime = formatDateTime(Date.now() / 1000, 'DD MM YYYY')
    setTimeout(() => {
      scroller.scrollTo(formatStartTime, {
        duration: 500,
        smooth: true,
        offset: -150,
      })
    }, 500)
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

    const formatStartTime = formatDateTime(swdTimestamp, 'DD MM YYYY')
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
            <span>{this.renderWeek()}</span>
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
    const { matches } = this.state

    let flagLive = false
    return matches.map((matchDt, index) => {
      if (matchDt.id) {
        let flag = true
        const formatStartTime = formatDateTime(matchDt.startTime, 'DD MM YYYY')
        if (index > 0) {
          const prevFrmtStrTime = matches[index - 1].startTime
            ? formatDateTime(matches[index - 1].startTime, 'DD MM YYYY')
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

  render() {
    const matchPlaylists = this.props.matches.matchesPlaylists

    const { filterByDates, startWeekDate, hasLive } = this.state
    const isDark = false
    return (
      <>
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
                  />
                  <div className={s.matches_grid}>
                    <span>{this.categoryFilter()}</span>
                    <span>
                      <div className={s.matchlist_wrappercontent_center}>
                        <div className={s.matchlist_Pagetitle}>{this.renderMatchCard()}</div>
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
  getAllGenreSpo: id => dispatch(matchListActions.getAllGenreSpo(id)),
})

export default compose(withStyles(s), connect(mapStateToProps, mapDispatchToProps))(Matches)

import React from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'

import withStyles from 'isomorphic-style-loader/lib/withStyles'
import _groupBy from 'lodash/groupBy'
import _sortBy from 'lodash/sortBy'
import moment from 'moment'
import InfiniteScroll from 'react-infinite-scroll-component'

import matchListActions from '@actions/matches'

import { formatDateTime, isToday, isTomorrow, isMatchPassed, isMatchLive, addDateTime, isSameDay, isLastWeek, isNextWeek, isThisWeek } from '@source/lib/dateTimeUtil'

import Header from '@components/Header'
import MatchCard from '@components/MatchCard'
import MatchList from '@components/MatchList'
import LazyLoad from '@components/common/Lazyload'
import VerticalCalendar from '@components/VerticalCalendar'
import HorizontalPlaylist from '@components/HorizontalPlaylist'

import Placeholder from './placeholder'
import s from './matches.css'
import LoaderComp from './loaderComp'
// import _unionBy from 'lodash/unionBy'
// import { IoIosReturnLeft } from 'react-icons/io'

class Matches extends React.Component {
  constructor(props) {
    super(props)
  }

  state = {
    limit: Array.from({ length: 12 }),
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
    filterByType: '',
    filterByLeague: 0,
    // filterAllLeague: 0,
    leagueList: [],
    selectedWeek: 2, //1 = last week, 2 = this week, 3 = next week,
    selectedDate: null,
    startWeekDate: null,
  }

  fetchMoreData = () => {
    const matchCardData = this.props.matches.data
    const { data } = this.props.matches.matchesPlaylists
    let matchTemp = []

    data.forEach(dt => {
      if (dt.id) {
        const vidDt = dt.videos
        for (let i = 0; i < vidDt.length; i++) {
          matchTemp.push(vidDt[i])
        }
      }
    })

    if (matchTemp.length != 0) {
      if (this.state.limit.length >= matchTemp.length) {
        this.setState({
          hasMore: false,
        })
        return
      }
      // 16 more records in 2 secs
      setTimeout(() => {
        this.setState({
          limit: this.state.limit.concat(Array.from({ length: 12 })),
        })
      }, 1500) //2000
    }
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
    const { playlistId } = this.props
    playlistId ? this.props.getMatches(playlistId) : this.props.getMatches()
    this.props.getAllGenreSpo()
    this.setDefaultDate()
  }

  componentWillMount() {
    // window.addEventListener('scroll', this.onScroll)
  }

  componentDidUpdate(prevProps) {
    if (this.props.matches.matchesPlaylists.meta.status != prevProps.matches.matchesPlaylists.meta.status && this.props.matches.matchesPlaylists.meta.status === 'success') {
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

  handleFilterByDate = (value, matches) => {
    // validation for ThisWeek
    let filterResult = []
    if (value == 'lastWeek') {
      matches.forEach(el => {
        if (isLastWeek(el.startTime)) {
          filterResult.push(el)
        }
      })
    } else if (value == 'thisWeek') {
      matches.forEach(el => {
        if (isThisWeek(el.startTime)) {
          selectedThisWeek = 1
          filterResult.push(el)
          // console.log('this week', filterResult)
        }
      })
    } else if (value == 'nextWeek') {
      matches.forEach(el => {
        if (isNextWeek(el.startTime)) {
          selectedNextWeek = 1
          filterResult.push(el)
          // console.log('next week', filterResult)
        }
      })
    } else if (value == 'today') {
      //TODAY
      matches.forEach(el => {
        if (isToday(el.startTime, el.endTime)) {
          filterResult.push(el)
          // console.log('today', filterResult)
        }
      })
    } else if (value == 'tomorrow') {
      //Tomorrow
      matches.forEach(el => {
        if (isTomorrow(el.startTime, el.endTime)) {
          filterResult.push(el)
          // console.log('tomorrow', filterResult)
        }
      })
    } else if (value !== '') {
      //by Date
      matches.forEach(dt => {
        if (dt.startTime != null) {
          const isSame = isSameDay(value, dt.startTime)
          if (isSame) {
            filterResult.push(dt)
            // console.log('bydate', filterResult)
          }
        }
      })
    } else if (value === '') {
      return matches
    }

    return filterResult
  }

  handleFilterByType = (value, matches) => {
    let filterResult = []
    // Validation For Video Type
    if (value === 'live') {
      // Live
      matches.forEach(el => {
        if (isMatchLive(el.startTime, el.endTime)) {
          filterResult.push(el)
        }
      })
    } else if (value === 'frm') {
      //Full Replay Match
      matches.forEach(el => {
        if (isMatchPassed(el.endTime)) {
          filterResult.push(el)
        }
      })
    } else if (value === 'highlightReplay') {
      //HighLight Replay
      matches.forEach(dt => {
        if (dt.isHighlight > 0) {
          filterResult.push(dt)
        }
      })
    } else if (value === '') {
      return matches
    }

    return filterResult
  }

  handleFilterByLeague = (value, matches) => {
    const { data } = this.props.matches.matchesPlaylists

    let filterResult = []
    data.forEach(dt => {
      if (value === dt.id) {
        const vidDt = dt.videos
        for (let i = 0; i < vidDt.length; i++) {
          filterResult.push(vidDt[i])
        }
      } else {
        return matches
      }
    })
    return filterResult
  }

  handleFilterAllLeague = (value, matches) => {
    const { data } = this.props.matches.matchesPlaylists
    // for view all video from league
    let filterResult = []
    if (value !== 0) {
      data.forEach(dt => {
        if (dt.id) {
          const vidDt = dt.videos
          for (let i = 0; i < vidDt.length; i++) {
            filterResult.push(vidDt[i])
          }
        }
      })
    } else {
      return matches
    }
    return filterResult
  }

  //start
  handleCategoryFilter = (category, value) => {
    let filterResult = []
    let filterLeagueRes = []
    let selectedVal = value
    const { filterByDates, filterByType, filterByLeague, filterAllLeague, allMatches, selectedWeek } = this.state

    if (category == 'ByDate') {
      this.setState({ filterByDates: selectedVal })
    }

    //League
    if (category == 'League') {
      filterLeagueRes = this.handleFilterByLeague(selectedVal, allMatches)
      filterResult = this.handleSortMatches(filterResult)
      this.setState({ allMatches: filterLeagueRes, matches: filterLeagueRes, filterByLeague: selectedVal })
    }

    if (category == 'All') {
      filterLeagueRes = this.handleFilterAllLeague(selectedVal, allMatches)
      filterResult = this.handleSortMatches(filterResult)
    }
    this.setState({ allMatches: filterLeagueRes, matches: filterLeagueRes, filterByLeague: selectedVal })

    // all
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

  renderFilterByType = () => {
    const { filterByType } = this.state
    const typeList = [{ id: 'live', title: 'Live' }, { id: 'frm', title: 'Replay Match' }, { id: 'highlightReplay', title: 'Highlight Match' }]

    return (
      <>
        {typeList.map(dt => {
          return (
            <div className={s.labelVideoType} key={dt.id}>
              <div
                className={`${s.filterLabel} ${dt.id == filterByType ? s.selectedFilter : ''}`}
                // onClick={() => {
                //   this.handleCategoryFilter('VideoType', dt.id)
                // }}
                value={dt.id}
              >
                {dt.title}
              </div>
            </div>
          )
        })}
      </>
    )
  }

  categoryFilter = () => {
    const { filterByLeague, leagueList } = this.state

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

  ShowMatchCard = () => {
    const { matches } = this.state

    const sortMatches = _sortBy(matches, match => match.startTime)

    if (matches == '') {
      return (
        <>
          <div className={s.noMatchContent}>Tidak Ada Pertandingan</div>
        </>
      )
    } else {
      return (
        <LazyLoad containerClassName={s.matchesCardList__container}>
          {sortMatches.map((matchDt, index) => {
            if (index < this.state.limit.length) {
              return (
                <>
                  <MatchList key={matchDt.id} data={matchDt} clickAble={true} />
                </>
              )
            }
          })}
        </LazyLoad>
      )
    }
  }

  render() {
    const matchCardData = this.props.matches.data
    const matchPlaylists = this.props.matches.matchesPlaylists

    const { filterByDates, startWeekDate } = this.state

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
                <InfiniteScroll
                  dataLength={this.state.limit.length}
                  next={this.fetchMoreData}
                  hasMore={this.state.hasMore}
                  hasChildren={true}
                  loader={<div className={s.labelLoaderIcon}>{/*<LoaderComp /> */}</div>}
                  height={800}
                >
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
                          <div className={s.matchlist_Pagetitle}>{matchCardData.length > 0 && this.state.limit != null ? <>{this.ShowMatchCard()}</> : <div>Tidak Ada Jadwal Matches</div>}</div>
                        </div>
                      </span>
                      <VerticalCalendar handleCategoryFilter={this.handleCategoryFilter} categoryFilterType={'ByDate'} selectedDate={filterByDates} startOfWeek={startWeekDate} />
                    </div>
                  </div>
                  {/* end data infinite scroll */}
                </InfiniteScroll>
              </div>
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
  getMatches: id => dispatch(matchListActions.getAllMatches(id)),
  getAllGenreSpo: id => dispatch(matchListActions.getAllGenreSpo(id)),
})

export default compose(withStyles(s), connect(mapStateToProps, mapDispatchToProps))(Matches)

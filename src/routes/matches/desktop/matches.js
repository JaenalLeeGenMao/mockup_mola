import React, { useState } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'

import withStyles from 'isomorphic-style-loader/lib/withStyles'
import _groupBy from 'lodash/groupBy'
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
import useInfiniteScroll from './useInfiniteScroll'

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
    filterAllLeague: 0,
    leagueList: [],
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

  static getDerivedStateFromProps(nextProps, prevState) {
    const { getMatches, matches: { matchesList, matchesPlaylists, genreSpo } } = nextProps
    return { ...prevState, matchesList, matchesPlaylists, genreSpo }
  }

  componentDidMount() {
    const { playlistId } = this.props
    playlistId ? this.props.getMatches(playlistId) : this.props.getMatches()
    this.props.getAllGenreSpo()
  }

  componentWillMount() {
    // window.addEventListener('scroll', this.onScroll)
  }

  componentDidUpdate(prevProps) {
    //status successnya masi dari matches
    if (this.props.matches.meta.status != prevProps.matches.meta.status && this.props.matches.meta.status === 'success') {
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
      //filter matches berdasarkan default value
      const getDataFilterLeagueId = matchTemp
      let leagueList = []
      getDataFilterLeagueId.map(matches => {
        const leagueData = matches.league
        if (leagueData != null) {
          const filterLeague = leagueList.filter(dt => {
            return dt.id == matches.league.id
          })
          if (filterLeague.length === 0) {
            leagueList.push(leagueData)
          }
        }
      })

      leagueList = leagueList.sort((a, b) => {
        const leagueName = a.name
        if (leagueName.indexOf('Premiere') > 0 || leagueName.indexOf('Premier') > 0) {
          return -1
        } else if (leagueName.indexOf('Premiere') < 0 && leagueName.indexOf('Premier') < 0) {
          return 1
        }
        return 0
      })
      // const filterResult = this.handleSortMatches(this.props.matches.data)
      const filterResult = this.handleSortMatches(getDataFilterLeagueId)

      // console.log('semua matchplaylists', filterResultPlaylist)
      this.setState({ allMatches: filterResult, matches: filterResult, leagueList: leagueList })
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
          // console.log('last week', filterResult)
        }
      })
    } else if (value == 'thisWeek') {
      matches.forEach(el => {
        if (isThisWeek(el.startTime)) {
          filterResult.push(el)
          // console.log('this week', filterResult)
        }
      })
    } else if (value == 'nextWeek') {
      matches.forEach(el => {
        if (isNextWeek(el.startTime)) {
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
          // console.log('vidDt', vidDt[i].id)
          filterResult.push(vidDt[i])
        }
      } else {
        return matches
      }
    })
    // console.log('vidDt', filterResult)
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
    const { filterByDates, filterByType, filterByLeague, filterAllLeague, allMatches } = this.state

    if (category == 'ThisWeek' || category == 'ByDate') {
      if (filterByDates == value) {
        selectedVal = ''
      }
      filterLeagueRes = this.handleFilterByLeague(filterByLeague, allMatches)
      filterResult = this.handleFilterByDate(selectedVal, filterResult)

      // filterResult = this.handleFilterByType(filterByType, filterResult)
      filterResult = this.handleSortMatches(filterResult)
      this.setState({ matches: filterResult, filterByDates: selectedVal })
    }

    //League
    if (category == 'League') {
      filterLeagueRes = this.handleFilterByLeague(selectedVal, allMatches)
      filterResult = this.handleFilterByDate(filterByDates, filterLeagueRes)
      if (filterByLeague == value) {
        selectedVal = 0
      }
      filterResult = this.handleSortMatches(filterResult)
      this.setState({ allMatches: filterLeagueRes, matches: filterResult, filterByLeague: selectedVal })
    }

    // all
    if (category == 'All') {
      filterLeagueRes = this.handleFilterAllLeague(selectedVal, allMatches)
      filterResult = this.handleFilterByDate(filterByDates, filterLeagueRes)
      if (filterAllLeague == value) {
        selectedVal = 0
      }
      filterResult = this.handleSortMatches(filterResult)
      this.setState({ allMatches: filterLeagueRes, matches: filterResult, filterAllLeague: selectedVal })
    }
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

  renderFilterByDate = () => {
    const { filterByDates } = this.state

    const weekList = [
      { id: 'lastWeek', title: 'Last Week' },
      { id: 'thisWeek', title: 'This Week' },
      { id: 'today', title: 'Today' },
      { id: 'nextWeek', title: 'Next Week' },
      // { id: 'tomorrow', title: 'Tomorrow' },
    ]

    return (
      <>
        {weekList.map(dt => {
          return (
            <div
              key={dt.id}
              value={dt.id}
              onClick={() => {
                this.handleCategoryFilter('ThisWeek', dt.id)
              }}
              className={`${s.filterLabel} ${dt.id == filterByDates ? s.selectedFilter : ''}`}
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
                onClick={() => {
                  this.handleCategoryFilter('VideoType', dt.id)
                }}
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
            <span>{this.renderFilterByDate()}</span>
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

    if (matches == '') {
      return (
        <>
          <div className={s.noMatchContent}>Tidak Ada Pertandingan</div>
        </>
      )
    } else {
      return (
        <LazyLoad containerClassName={s.matchesCardList__container}>
          {matches.map((matchDt, index) => {
            if (index < this.state.limit.length) {
              return (
                <>
                  <MatchList key={matchDt.id} data={matchDt} />
                </>
              )
            }
          })}
        </LazyLoad>
      )
    }
  }

  render() {
    const matchesList = this.props.matches
    const matchCardData = this.props.matches.data
    const matchPlaylists = this.props.matches.matchesPlaylists

    const isDark = false
    return (
      <>
        <div className={s.headerContainer}>
          <Header stickyOff searchOff isDark={isDark} activeMenu="matches" libraryOff {...this.props} />
        </div>
        {matchesList.meta.status === 'loading' && <Placeholder />}
        {matchesList.meta.status === 'success' && (
          <>
            <div className={s.root}>
              <div className={s.matchlist_container} id="containercard">
                <div className={s.labelLoadMore}>
                  Load more
                  <span className={s.loadmore} />
                </div>
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
                      handleFilterAllLeague={this.handleFilterAllLeague}
                      genreSpoCategory={this.props.matches.genreSpo}
                      matchesPlaylists={this.props.matches.matchesPlaylists}
                      filterByLeague={this.state.filterByLeague}
                      filterAllLeague={this.state.filterAllLeague}
                      expandLeague={this.state.expandLeague}
                      categoryFilterType={'League'}
                      allButtonOn
                      allCat
                    />
                    {/* <div className={s.match_ligaType}> */}
                    {/* <span className={s.allFilterLabel}>{this.categoryFilterAll()}</span>
                      {/* <span className={s.filLeague}>{this.categoryFilterLigaType()}</span>
        <span />*/}
                    {/* </div> */}
                    <div className={s.matches_grid}>
                      <span>{this.categoryFilter()}</span>
                      <span>
                        <div className={s.matchlist_wrappercontent_center}>
                          <div className={s.matchlist_Pagetitle}>{matchCardData.length > 0 && this.state.limit != null ? <>{this.ShowMatchCard()}</> : <div>Tidak Ada Jadwal Matches</div>}</div>
                        </div>
                      </span>
                      <VerticalCalendar handleCategoryFilter={this.handleCategoryFilter} filterByDates={this.state.filterByDates} categoryFilterType={'ByDate'} />
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

import React from 'react'
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
    if (matchCardData.length != 0) {
      if (this.state.limit.length >= matchCardData.length) {
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

  componentDidMount() {
    const { playlistId } = this.props
    playlistId ? this.props.getMatches(playlistId) : this.props.getMatches()
    this.props.getGenreMatches()
  }

  componentWillMount() {
    // window.addEventListener('scroll', this.onScroll)
  }

  componentDidUpdate(prevProps) {
    if (this.props.matches.meta.status != prevProps.matches.meta.status && this.props.matches.meta.status === 'success') {
      //filter matches berdasarkan default value
      const getDataFilterLeagueId = this.props.matches.data
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

      // const { filterByDates, filterByType } = this.state
      // let filterResult = []

      // filterResult = this.handleFilterByDate(filterByDates, this.props.matches.data)

      // const filterResultByType = this.handleFilterByType(filterByType, filterResult)
      // /** NOTE **/
      // //cuma update result kalau filter di filter type ini ada result
      // //kalau gada result yang ditampilkan hanyalah hasil dari filter by date + league
      // if (filterResultByType.length > 0) {
      //   filterResult = filterResultByType
      // }
      // const defaultLeagueId = leagueList.length > 0 ? leagueList[0].id : 0
      // filterResult = this.handleFilterByLeague(defaultLeagueId, filterResult)
      // //dapat hasil dari default filter
      // filterResult = filterResult.sort((a, b) => b.startTime - a.startTime)
      // const filterResult = this.props.matches.data.sort((a, b) => b.startTime - a.startTime)
      const filterResult = this.handleSortMatches(this.props.matches.data)
      this.setState({ matches: filterResult, leagueList: leagueList })
    }
  }

  handleSortMatches = matches => {
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
          filterResult.push(el)
        }
      })
    } else if (value == 'nextWeek') {
      matches.forEach(el => {
        if (isNextWeek(el.startTime)) {
          filterResult.push(el)
        }
      })
    } else if (value == 'today') {
      //TODAY
      matches.forEach(el => {
        if (isToday(el.startTime, el.endTime)) {
          filterResult.push(el)
        }
      })
    } else if (value == 'tomorrow') {
      //Tomorrow
      matches.forEach(el => {
        if (isTomorrow(el.startTime, el.endTime)) {
          filterResult.push(el)
        }
      })
    } else if (value !== '') {
      //by Date
      matches.forEach(dt => {
        if (dt.startTime != null) {
          const isSame = isSameDay(value, dt.startTime)
          if (isSame) {
            filterResult.push(dt)
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
    let filterResult = []
    if (value !== 0) {
      matches.forEach(dt => {
        if (dt.league != null) {
          if (dt.league.id == value) {
            filterResult.push(dt)
          }
        }
      })
    } else {
      return matches
    }
    return filterResult
  }

  //validation allleague
  handleFilterAllLeague = () => {
    const { data } = this.props.matches

    let filterAllLeague = []
    data.forEach(dt => {
      if (dt.league) {
        filterAllLeague.push(dt)
      }
    })
    this.setState({ matches: filterAllLeague })

    return filterAllLeague
  }

  //start
  handleCategoryFilter = (category, value) => {
    let filterResult = []
    let selectedVal = value
    const { filterByDates, filterByType, filterByLeague, filterAllLeague } = this.state

    if (category == 'ThisWeek' || category == 'ByDate') {
      if (filterByDates == value) {
        selectedVal = ''
      }
      filterResult = this.handleFilterByDate(selectedVal, this.props.matches.data)
      filterResult = this.handleFilterByType(filterByType, filterResult)
      filterResult = this.handleFilterByLeague(filterByLeague, filterResult)
      filterResult = this.handleSortMatches(filterResult)
      this.setState({ matches: filterResult, filterByDates: selectedVal })
    }

    if (category == 'VideoType') {
      filterResult = this.handleFilterByDate(filterByDates, this.props.matches.data)
      if (filterByType == value) {
        selectedVal = ''
      }
      filterResult = this.handleFilterByType(selectedVal, filterResult)
      filterResult = this.handleFilterByLeague(filterByLeague, filterResult)
      filterResult = this.handleSortMatches(filterResult)
      this.setState({ matches: filterResult, filterByType: selectedVal })
    }

    //League
    if (category == 'League') {
      filterResult = this.handleFilterByDate(filterByDates, this.props.matches.data)
      filterResult = this.handleFilterByType(filterByType, filterResult)
      if (filterByLeague == value) {
        selectedVal = 0
      }
      filterResult = this.handleFilterByLeague(selectedVal, filterResult)
      filterResult = this.handleSortMatches(filterResult)
      this.setState({ matches: filterResult, filterByLeague: selectedVal })
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
    //Validate This week, now +7 days
    // let dateList = []

    // for (var i = 0; i < 5; i++) {
    //   const date = new Date(addDateTime(null, i + 2, 'days'))
    //   const dtTimestamp = date.getTime()
    //   const formattedDateTime = formatDateTime(dtTimestamp / 1000, 'ddd, DD MMM')

    //   //date string to int selectedMatch
    //   const dateStringtoInt = new Date(moment(formattedDateTime, 'ddd, DD MMM'))
    //   const strTimestamp = dateStringtoInt.getTime() / 1000

    //   dateList.push({ title: formattedDateTime, strTimestamp: strTimestamp })
    // }

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
        {/* <div
          className={s.filterTitle_label}
          onClick={() => {
            this.handleExpandCategoryThisWeek()
          }}
        >
          <span>This week</span>
          <span className={this.state.expandThisWeek == true ? s.arrowDownBtn : s.arrowUpBtn} />
        </div> */}
        {this.state.expandThisWeek && (
          <div className={s.filterContent_container}>
            <span>{this.renderFilterByDate()}</span>
          </div>
        )}
        {/* <div
          className={s.filterTitle_label}
          onClick={() => {
            this.handleExpandCategoryVideoType()
          }}
        >
          <span>Video Type</span>
          <span className={this.state.expandVideoType == true ? s.arrowDownBtn : s.arrowUpBtn} />
        </div> */}
        {/* {this.state.expandVideoType && (
          <div className={s.filterContent_container}>
            <span>{this.renderFilterByType()}</span>
          </div>
        )} */}
        {/* <div
          className={s.filterTitle_label}
          onClick={() => {
            this.handleExpandCategoryLeague()
          }}
        >
          <span>League</span>
          <span className={this.state.expandLeague == true ? s.arrowDownBtn : s.arrowUpBtn} />
        </div> */}
        {/* <>
          {leagueList.map(league => {
            return (
              <>
                {this.state.expandLeague && (
                  <div
                    key={league.id}
                    className={s.contentLogoAndName}
                    onClick={() => {
                      this.handleCategoryFilter('League', league.id)
                    }}
                  >
                    <img className={s.filterimg} src={league.iconUrl} />
                    <span value={league.id} className={filterByLeague == league.id ? s.selectednameleague : s.nameleague}>
                      {league.name}
                    </span>
                  </div>
                )}
              </>
            )
          })}
        </> */}
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
                  {/* <MatchCard key={matchDt.id} matchData={matchDt} /> */}
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
    const allLeagueList = [{ id: 'all', title: 'all' }]

    const isDark = false
    console.log('this.state limit', this.state.limit)
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
                  loader={<div className={s.labelLoaderIcon}>{/* <LoaderComp /> */}</div>}
                  height={800}
                >
                  <div className={s.matchlist_wrapper}>
                    <HorizontalPlaylist
                      handleCategoryFilter={this.handleCategoryFilter}
                      handleFilterAllLeague={this.handleFilterAllLeague}
                      genreSpoCategory={this.props.matches.genreSpo.data}
                      filterByLeague={this.state.filterByLeague}
                      expandLeague={this.state.expandLeague}
                      categoryFilterType={'League'}
                      allButtonOn
                    />
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
  getGenreMatches: id => dispatch(matchListActions.getAllGenreSpo(id)),
})

export default compose(withStyles(s), connect(mapStateToProps, mapDispatchToProps))(Matches)

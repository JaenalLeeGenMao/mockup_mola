import React from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'

import withStyles from 'isomorphic-style-loader/lib/withStyles'
import Header from '@components/Header'
import MatchCard from '@components/MatchCard'
import LazyLoad from '@components/common/Lazyload'
import Placeholder from './placeholder'
import InfiniteScroll from 'react-infinite-scroll-component'
import matchListActions from '@actions/matches'
import s from './matches.css'
import LoaderComp from './loaderComp'
import { formatDateTime, isToday, isTomorrow, isMatchPassed, isMatchLive, addDateTime, isSameDay, isLastWeek, isNextWeek, isThisWeek } from '@source/lib/dateTimeUtil'
import moment from 'moment'
// import _unionBy from 'lodash/unionBy'
import _groupBy from 'lodash/groupBy'
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
      if (isToday(match.startTime)) return 'isToday'
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
        if (el.homeTeam && el.awayTeam && isLastWeek(el.startTime)) {
          filterResult.push(el)
        }
      })
    } else if (value == 'thisWeek') {
      matches.forEach(el => {
        if (el.homeTeam && el.awayTeam && isThisWeek(el.startTime)) {
          filterResult.push(el)
        }
      })
    } else if (value == 'nextWeek') {
      matches.forEach(el => {
        if (el.homeTeam && el.awayTeam && isNextWeek(el.startTime)) {
          filterResult.push(el)
        }
      })
    } else if (value == 'today') {
      //TODAY
      matches.forEach(el => {
        if (el.homeTeam && el.awayTeam && isToday(el.startTime, el.endTime)) {
          filterResult.push(el)
        }
      })
    } else if (value == 'tomorrow') {
      //Tomorrow
      matches.forEach(el => {
        if (el.homeTeam && el.awayTeam && isTomorrow(el.startTime, el.endTime)) {
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
        if (el.homeTeam && el.awayTeam && isMatchLive(el.startTime, el.endTime)) {
          filterResult.push(el)
        }
      })
    } else if (value === 'frm') {
      //Full Replay Match
      matches.forEach(index => {
        if (index.homeTeam && index.awayTeam && isMatchPassed(index.endTime)) {
          filterResult.push(index)
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

  //start
  handleCategoryFilter = (category, value) => {
    let filterResult = []
    let selectedVal = value
    const { filterByDates, filterByType, filterByLeague } = this.state

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
      { id: 'nextWeek', title: 'Next Week' },
      { id: 'today', title: 'Today' },
      { id: 'tomorrow', title: 'Tomorrow' },
    ]

    //Validate This week, now +7 days
    let dateList = []

    for (var i = 0; i < 5; i++) {
      const date = new Date(addDateTime(null, i + 2, 'days'))
      const dtTimestamp = date.getTime()
      const formattedDateTime = formatDateTime(dtTimestamp / 1000, 'ddd, DD MMM')

      //date string to int selectedMatch
      const dateStringtoInt = new Date(moment(formattedDateTime, 'ddd, DD MMM'))
      const strTimestamp = dateStringtoInt.getTime() / 1000

      dateList.push({ title: formattedDateTime, strTimestamp: strTimestamp })
    }

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
        {/* {dateList.map(dt => {
          return (
            <div
              className={`${s.filterLabel} ${dt.strTimestamp == filterByDates ? s.selectedFilter : ''}`}
              key={dt.strTimestamp}
              onClick={() => {
                this.handleCategoryFilter('ByDate', dt.strTimestamp)
              }}
            >
              {dt.title}
            </div>
          )
        })} */}
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
      <div>
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
        <div
          className={s.filterTitle_label}
          onClick={() => {
            this.handleExpandCategoryVideoType()
          }}
        >
          <span>Video Type</span>
          <span className={this.state.expandVideoType == true ? s.arrowDownBtn : s.arrowUpBtn} />
        </div>
        {this.state.expandVideoType && (
          <div className={s.filterContent_container}>
            <span>{this.renderFilterByType()}</span>
          </div>
        )}
        <div
          className={s.filterTitle_label}
          onClick={() => {
            this.handleExpandCategoryLeague()
          }}
        >
          <span>League</span>
          <span className={this.state.expandLeague == true ? s.arrowDownBtn : s.arrowUpBtn} />
        </div>
        <>
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
        </>
      </div>
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
              return <MatchCard key={matchDt.id} matchData={matchDt} />
            }
          })}
        </LazyLoad>
      )
    }
  }

  render() {
    const matchesList = this.props.matches
    const matchCardData = this.props.matches.data

    const isDark = false

    return (
      <>
        <div className={s.headerContainer}>
          <Header stickyOff searchOff isDark={isDark} activeMenu="sport" libraryOff {...this.props} />
        </div>
        {matchesList.meta.status === 'loading' && <Placeholder />}
        {matchesList.meta.status === 'success' && (
          <>
            <div className={s.root}>
              <div className={s.matchlist_container} id="containercard">
                {matchesList.data.length > 9 && (
                  <div className={s.labelLoadMore}>
                    Load more
                    <span className={s.loadmore} />
                  </div>
                )}
                <InfiniteScroll
                  dataLength={this.state.limit.length}
                  next={this.fetchMoreData}
                  hasMore={this.state.hasMore}
                  hasChildren={true}
                  loader={
                    matchesList.data.length > 9 && (
                      <div className={s.labelLoaderIcon}>
                        <LoaderComp />
                      </div>
                    )
                  }
                  height={750}
                >
                  <div className={s.matchlist_wrapper}>
                    <div className={s.matches_grid}>
                      <span />
                      <span>
                        <div className={s.matchlist_wrappercontent_center}>
                          <div className={s.matchlist_Pagetitle}>{matchCardData.length != null && this.state.limit != null ? <>{this.ShowMatchCard()}</> : <div>Tidak Ada Jadwal Matches</div>}</div>
                        </div>
                      </span>
                      <span>{this.categoryFilter()}</span>
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
})

export default compose(withStyles(s), connect(mapStateToProps, mapDispatchToProps))(Matches)

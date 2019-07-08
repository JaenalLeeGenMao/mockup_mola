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
// import { IoIosReturnLeft } from 'react-icons/io'

class Matches extends React.Component {
  constructor(props) {
    super(props)
  }

  state = {
    limit: Array.from({ length: 10 }),
    hasMore: true,
    resultShowData: 1,
    initialized: false,
    matches: [],
    isScrolling: false,
    modalActive: false,
    selectedLeagueData: [],
    expandThisWeek: true,
    expandVideoType: true,
    expandLeague: true,
    filterByDates: 'today',
    filterByType: 'live',
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
          limit: this.state.limit.concat(Array.from({ length: 10 })),
        })
      }, 2000)
    }
  }

  openModal = () => {
    this.setState({ modalActive: true })
  }

  closeModal = () => {
    this.setState({ modalActive: false })
  }

  componentDidMount() {
    this.props.getMatches()
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
        if (leagueName.indexOf('English') > 0 || leagueName.indexOf('Inggris') > 0) {
          return -1
        } else if (leagueName.indexOf('English') < 0 && leagueName.indexOf('Inggris') < 0) {
          return 1
        }
        return 0
      })

      const { filterByDates, filterByType } = this.state
      let filterResult = []

      filterResult = this.handleFilterByDate(filterByDates, this.props.matches.data)

      const filterResultByType = this.handleFilterByType(filterByType, filterResult)
      /** NOTE **/
      //cuma update result kalau filter di filter type ini ada result
      //kalau gada result yang ditampilkan hanyalah hasil dari filter by date + league
      if (filterResultByType.length > 0) {
        filterResult = filterResultByType
      }
      const defaultLeagueId = leagueList.length > 0 ? leagueList[0].id : 0
      filterResult = this.handleFilterByLeague(defaultLeagueId, filterResult)
      //dapat hasil dari default filter
      filterResult = filterResult.sort((a, b) => b.startTime - a.startTime)
      this.setState({ matches: filterResult, filterByLeague: defaultLeagueId, leagueList: leagueList })
    }
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
    } else {
      //by Date
      matches.forEach(dt => {
        if (dt.startTime != null) {
          const isSame = isSameDay(value, dt.startTime)
          if (isSame) {
            filterResult.push(dt)
          }
        }
      })
    }
    return filterResult
  }

  handleFilterByType = (value, matches) => {
    let filterResult = []
    // Validation For Video Type
    // Live
    if (value == 'live') {
      matches.forEach(el => {
        if (el.homeTeam && el.awayTeam && isMatchLive(el.startTime, el.endTime)) {
          filterResult.push(el)
        }
      })
    }
    //Full Replay Match
    if (value == 'frm') {
      matches.forEach(index => {
        if (index.homeTeam && index.awayTeam && isMatchPassed(index.endTime)) {
          filterResult.push(index)
        }
      })
    }
    //HighLight Replay
    if (value == 'highlightReplay') {
      matches.forEach(dt => {
        if (dt.isHighlight > 0) {
          filterResult.push(dt)
        }
      })
    }

    return filterResult
  }

  handleFilterByLeague = (value, matches) => {
    let filterResult = []
    matches.forEach(dt => {
      if (dt.league != null) {
        if (dt.league.id == value) {
          filterResult.push(dt)
        }
      }
    })

    return filterResult
  }

  //start
  handleCategoryFilter = (category, value) => {
    let filterResult = []
    const { filterByDates, filterByType, filterByLeague } = this.state
    if (category == 'ThisWeek' || category == 'ByDate') {
      filterResult = this.handleFilterByDate(value, this.props.matches.data)

      const filterResultByType = this.handleFilterByType(filterByType, filterResult)
      /** NOTE **/
      //cuma update result kalau filter di filter type ini ada result
      //kalau gada result yang ditampilkan hanyalah hasil dari filter by date + league
      if (filterResultByType.length > 0) {
        filterResult = filterResultByType
      }

      filterResult = this.handleFilterByLeague(filterByLeague, filterResult)
      filterResult = filterResult.sort((a, b) => b.startTime - a.startTime)
      // filterResult = filterResult.sort((a, b) => {
      //   console.log("A", a, "B", b)
      //   if (isToday(a.startTime, a.endTime)) {
      //     console.log("msuk istoday", a.title, a.startTime)
      //     return -1
      //   } else if (!isToday(a.startTime, a.endTime)) {
      //     if (a.startTime < b.startTime) return -1
      //     else if (b.startTime < a.startTime) return 1
      //     else return 0
      //   }
      //   console.log("not today", a.title, a.startTime)
      //   return 0
      // })
      this.setState({ matches: filterResult, filterByDates: value })
    }

    if (category == 'VideoType') {
      filterResult = this.handleFilterByDate(filterByDates, this.props.matches.data)

      const filterResultByType = this.handleFilterByType(value, filterResult)
      /** NOTE **/
      //cuma update result kalau filter di filter type ini ada result
      //kalau gada result yang ditampilkan hanyalah hasil dari filter by date + league
      if (filterResultByType.length > 0) {
        filterResult = filterResultByType
      }

      filterResult = this.handleFilterByLeague(filterByLeague, filterResult)
      filterResult = filterResult.sort((a, b) => b.startTime - a.startTime)
      this.setState({ matches: filterResult, filterByType: value })
    }

    //League
    if (category == 'League') {
      filterResult = this.handleFilterByDate(filterByDates, this.props.matches.data)

      const filterResultByType = this.handleFilterByType(filterByType, filterResult)
      /** NOTE **/
      //cuma update result kalau filter di filter type ini ada result
      //kalau gada result yang ditampilkan hanyalah hasil dari filter by date + league
      if (filterResultByType.length > 0) {
        filterResult = filterResultByType
      }

      filterResult = this.handleFilterByLeague(value, filterResult)
      filterResult = filterResult.sort((a, b) => b.startTime - a.startTime)
      this.setState({ matches: filterResult, filterByLeague: value })
    }
  }

  //expand This Week
  handleExapandCategoryThisWeek = () => {
    if (this.state.expandThisWeek == true) {
      this.handleExapandThisWeek()
    } else {
      this.handleCloseTabThisWeek()
    }
  }

  handleCloseTabThisWeek = () => {
    this.setState({ expandThisWeek: true })
  }

  handleExapandThisWeek = () => {
    this.setState({ expandThisWeek: false })
  }

  //expand Video Type

  handleExapandCategoryVideoType = () => {
    if (this.state.expandVideoType == true) {
      this.handleExapandVideoType()
    } else {
      this.handleCloseVideoType()
    }
  }

  handleExapandVideoType = () => {
    this.setState({ expandVideoType: false })
  }

  handleCloseVideoType = () => {
    this.setState({ expandVideoType: true })
  }

  //expand League

  handleExapandCategoryLeague = () => {
    if (this.state.expandLeague == true) {
      this.handleExapandLeague()
    } else {
      this.handleCloseLeague()
    }
  }

  handleExapandLeague = () => {
    this.setState({ expandLeague: false })
  }

  handleCloseLeague = () => {
    this.setState({ expandLeague: true })
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
        {dateList.map(dt => {
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
        })}
      </>
    )
  }

  renderFilterByType = () => {
    const { filterByType } = this.state
    const typeList = [{ id: 'live', title: 'Live' }, { id: 'frm', title: 'Full Replay Match' }, { id: 'highlightReplay', title: 'Highlight Match' }]

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
        <div
          className={s.labelFilterThisWeek}
          onClick={() => {
            this.handleExapandCategoryThisWeek()
          }}
        >
          <span>This week</span>
          <span className={s.arrowDownBtnThisWeek} />
        </div>
        {this.state.expandThisWeek ? (
          <div className={s.containerThisWeek}>
            <span>{this.renderFilterByDate()}</span>
          </div>
        ) : null}
        <div
          className={s.labelFilterVideoType}
          onClick={() => {
            this.handleExapandCategoryVideoType()
          }}
        >
          <span>Video Type</span>
          <span className={s.arrowDownBtnVideoType} />
        </div>
        {this.state.expandVideoType ? (
          <div className={s.contentVideoType}>
            <span>{this.renderFilterByType()}</span>
          </div>
        ) : null}
        <div
          className={s.labelFilterLeague}
          onClick={() => {
            this.handleExapandCategoryLeague()
          }}
        >
          <span>League</span>
          <span className={s.arrowDownBtnLeague} />
        </div>
        <div className={s.contentLeagueCs}>
          {leagueList.map(league => {
            return (
              <>
                {this.state.expandLeague ? (
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
                ) : null}
              </>
            )
          })}
        </div>
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
    // const { isScrolling } = this.state

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
                <InfiniteScroll
                  dataLength={this.state.limit.length}
                  next={this.fetchMoreData}
                  hasMore={this.state.hasMore}
                  loader={
                    <>
                      {this.state.matches.length != 0 && this.state.matches.length >= 9 ? (
                        <div className={s.labelLoadMore}>
                          <LoaderComp />
                          Load more
                          <span className={s.loadmore} />
                        </div>
                      ) : null}
                    </>
                  }
                  height={750}
                >
                  <div className={s.matchlist_wrapper}>
                    <div className={s.matches_grid}>
                      <span />
                      <span>
                        <div className={s.matchlist_wrappercontent_center}>
                          <div className={s.matchlist_Pagetitle}>
                            {matchCardData.length != null && this.state.limit != null ? (
                              <>
                                {/* {this.showFilterChanging()} */}
                                {this.ShowMatchCard()}
                              </>
                            ) : (
                              <div>Tidak Ada Jadwal Matches</div>
                            )}
                          </div>
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
  getMatches: () => dispatch(matchListActions.getAllMatches()),
})

export default compose(withStyles(s), connect(mapStateToProps, mapDispatchToProps))(Matches)

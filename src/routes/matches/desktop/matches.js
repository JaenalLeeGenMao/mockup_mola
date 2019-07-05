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
import { formatDateTime, isToday, isTomorrow, isMatchPassed, isMatchLive, addDateTime, isSameDay } from '@source/lib/dateTimeUtil'
import moment from 'moment'
import _unionBy from 'lodash/unionBy'
import loaderComp from './loaderComp'
import { IoIosReturnLeft } from 'react-icons/io'
import { match } from 'tcomb'

class Matches extends React.Component {
  constructor(props) {
    super(props)
  }

  state = {
    limit: Array.from({ length: 16 }),
    hasMore: true,
    resultShowData: 1,
    initialized: false,
    matches: [],
    isScrolling: false,
    modalActive: false,
    selectedLeagueData: [],
    showResultThisWeek: true,
    filterByDates: [],
    filterByType: [],
    filterByLeague: [],
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
          limit: this.state.limit.concat(Array.from({ length: 16 })),
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
    // document.getElementById('scrollingLoader').addEventListener('scroll', this.handleUserScroll, false)
  }

  componentWillMount() {
    // window.addEventListener('scroll', this.onScroll)
  }

  componentDidUpdate(prevProps) {
    if (this.props.matches.meta.status != prevProps.matches.meta.status && this.props.matches.meta.status === 'success') {
      this.setState({ matches: this.props.matches.data })
    }
  }

  // getSelectedCategory(){
  // }

  //start
  handleCategoryFilter = (category, value) => {
    let selectedCategoryData = []
    const { filterByDates, filterByLeague, filterByType } = this.state

    if (category == 'ThisWeek') {
      // validation for ThisWeek
      //TODAY
      if (value == 'today') {
        const { data } = this.props.matches

        const TodayData = []

        data.forEach(el => {
          if (el.homeTeam && el.awayTeam && isToday(el.startTime, el.endTime)) {
            TodayData.push(el)
          }
        })
        selectedCategoryData = _unionBy(selectedCategoryData, TodayData, 'id')
      }
      //Tomorrow
      if (value == 'tomorrow') {
        const { data } = this.props.matches

        const tomorrowData = []

        data.forEach(el => {
          if (el.homeTeam && el.awayTeam && isTomorrow(el.startTime, el.endTime)) {
            tomorrowData.push(el)
          }
        })
        selectedCategoryData = _unionBy(selectedCategoryData, tomorrowData, 'id')
      }
      // Filter By Date This week
      if (value == value) {
        const { data } = this.props.matches
        const sameDateData = []
        data.forEach(dt => {
          if (dt.startTime != null) {
            const isSame = isSameDay(value, dt.startTime)
            if (isSame) {
              sameDateData.push(dt)
            }
          }
        })
        selectedCategoryData = _unionBy(selectedCategoryData, sameDateData, 'id')
      }

      if (value == 'lastWeek') {
        // validation lastweek
        const { data } = this.props.matches
        let thisWeek = moment()
          .isoWeekday(1)
          .week() // now
        let lastWeek = thisWeek === 1 ? 52 : thisWeek - 1
        let getLastWeekData = []

        for (let i = 0; i < data.length; i++) {
          let getDataLastWeek = moment.unix(data[i].startTime)
          let weekValidate = moment(getDataLastWeek)
            .isoWeekday(1)
            .week()

          if (lastWeek === weekValidate) {
            getLastWeekData.push(data[i])
          }
        }
        selectedCategoryData = _unionBy(selectedCategoryData, getLastWeekData, 'id')
      }
      if (value == 'nextWeek') {
        // validation nextWeek
        const { data } = this.props.matches

        let thisWeek = moment()
          .isoWeekday(1)
          .week()
        let nextWeek = thisWeek === 52 ? 1 : thisWeek + 1
        let dataNextWeek = []

        for (let i = 0; i < data.length; i++) {
          let getDataNextWeek = moment.unix(data[i].startTime)
          let weekValidate = moment(getDataNextWeek)
            .isoWeekday(1)
            .week()

          if (nextWeek === weekValidate) {
            dataNextWeek.push(data[i])
          }
        }
        selectedCategoryData = _unionBy(selectedCategoryData, dataNextWeek, 'id')
      }

      this.setState({ filterByDates: value })
    } else if (!filterByDates) {
      if (filterByDates == 'today') {
        const { data } = this.props.matches

        const TodayData = []

        data.forEach(el => {
          if (el.homeTeam && el.awayTeam && isToday(el.startTime, el.endTime)) {
            TodayData.push(el)
          }
        })
        selectedCategoryData = _unionBy(selectedCategoryData, TodayData, 'id')
      }
      //Tomorrow
      if (filterByDates == 'tomorrow') {
        const { data } = this.props.matches

        const tomorrowData = []

        data.forEach(el => {
          if (el.homeTeam && el.awayTeam && isTomorrow(el.startTime, el.endTime)) {
            tomorrowData.push(el)
          }
        })
        selectedCategoryData = _unionBy(selectedCategoryData, tomorrowData, 'id')
      }
      // Filter By Date This week
      if (filterByDates == value) {
        const { data } = this.props.matches
        const sameDateData = []
        data.forEach(dt => {
          if (dt.startTime != null) {
            const isSame = isSameDay(value, dt.startTime)
            if (isSame) {
              sameDateData.push(dt)
            }
          }
        })
        selectedCategoryData = _unionBy(selectedCategoryData, sameDateData, 'id')
      }
      if (value == 'lastWeek') {
        // validation lastweek
        const { data } = this.props.matches
        let thisWeek = moment()
          .isoWeekday(1)
          .week() // now
        let lastWeek = thisWeek === 1 ? 52 : thisWeek - 1
        let getLastWeekData = []

        for (let i = 0; i < data.length; i++) {
          let getDataLastWeek = moment.unix(data[i].startTime)
          let weekValidate = moment(getDataLastWeek)
            .isoWeekday(1)
            .week()

          if (lastWeek === weekValidate) {
            getLastWeekData.push(data[i])
          }
        }
        selectedCategoryData = _unionBy(selectedCategoryData, getLastWeekData, 'id')
      }
      if (value == 'nextWeek') {
        // validation nextWeek
        const { data } = this.props.matches

        let thisWeek = moment()
          .isoWeekday(1)
          .week()
        let nextWeek = thisWeek === 52 ? 1 : thisWeek + 1
        let dataNextWeek = []

        for (let i = 0; i < data.length; i++) {
          let getDataNextWeek = moment.unix(data[i].startTime)
          let weekValidate = moment(getDataNextWeek)
            .isoWeekday(1)
            .week()

          if (nextWeek === weekValidate) {
            dataNextWeek.push(data[i])
          }
        }
        selectedCategoryData = _unionBy(selectedCategoryData, dataNextWeek, 'id')
      }
    }

    if (category == 'VideoType') {
      // Validation For Video Type
      // Live
      if (value == 'live') {
        const { data } = this.props.matches

        const LiveData = []

        data.forEach(el => {
          if (el.homeTeam && el.awayTeam && isMatchLive(el.startTime, el.endTime)) {
            LiveData.push(el)
          }
        })
        selectedCategoryData = _unionBy(selectedCategoryData, LiveData, 'id')
      }
      //Full Replay Match
      if (value == 'frm') {
        const { data } = this.props.matches
        const fullReplayMatch = []

        data.forEach(index => {
          if (index.homeTeam && index.awayTeam && isMatchPassed(index.endTime)) {
            fullReplayMatch.push(index)
          }
        })
        selectedCategoryData = _unionBy(selectedCategoryData, fullReplayMatch, 'id')
      }
      //HighLight Replay
      if (value == 'highlightReplay') {
        const { data } = this.props.matches

        const hightlightData = []
        data.forEach(dt => {
          if (dt.isHighlight > 0) {
            hightlightData.push(dt)
          }
        })

        selectedCategoryData = _unionBy(selectedCategoryData, hightlightData, 'id')
      }

      this.setState({ filterByLeague: value })
    } else if (!filterByLeague) {
      if (filterByLeague == 'live') {
        const { data } = this.props.matches

        const LiveData = []

        data.forEach(el => {
          if (el.homeTeam && el.awayTeam && isMatchLive(el.startTime, el.endTime)) {
            LiveData.push(el)
          }
        })
        selectedCategoryData = _unionBy(selectedCategoryData, LiveData, 'id')
      }
      //Full Replay Match
      if (filterByLeague == 'frm') {
        const { data } = this.props.matches
        const fullReplayMatch = []

        data.forEach(index => {
          if (index.homeTeam && index.awayTeam && isMatchPassed(index.endTime)) {
            fullReplayMatch.push(index)
          }
        })
        selectedCategoryData = _unionBy(selectedCategoryData, fullReplayMatch, 'id')
      }
      //HighLight Replay
      if (filterByLeague == 'highlightReplay') {
        const { data } = this.props.matches

        const hightlightData = []
        data.forEach(dt => {
          if (dt.isHighlight > 0) {
            hightlightData.push(dt)
          }
        })

        selectedCategoryData = _unionBy(selectedCategoryData, hightlightData, 'id')
      }
    }

    //League
    if (category == 'League') {
      // leagueId
      let selLeague = []
      let limitSelected = 1

      const { data: matches } = this.props.matches
      const allLeagueData = []

      selLeague = selLeague.concat(this.state.selectedLeagueData)

      if (!selLeague.includes(value)) {
        selLeague.push(value)
      } else {
        var index = selLeague.indexOf(value)
        if (index > -1) {
          selLeague.splice(index, 1)
        }
      }
      if (selLeague.length > limitSelected) {
        this.setState({ selectedLeagueData: selLeague })
      }
      if (selLeague == value) {
        matches.forEach(dt => {
          if (dt.league != null) {
            if (dt.league.id == value) {
              allLeagueData.push(dt)
              selLeague.push(dt)
            }
          }
        })
      }
      selectedCategoryData = _unionBy(selectedCategoryData, allLeagueData, 'id')

      this.setState({ filterByType: value })
    } else if (!filterByType) {
      // leagueId
      let selLeague = []
      let limitSelected = 1

      const { data: matches } = this.props.matches
      const allLeagueData = []

      selLeague = selLeague.concat(this.state.selectedLeagueData)

      if (!selLeague.includes(filterByType)) {
        selLeague.push(filterByType)
      } else {
        var index = selLeague.indexOf(filterByType)
        if (index > -1) {
          selLeague.splice(index, 1)
        }
      }
      if (selLeague.length > limitSelected) {
        this.setState({ selectedLeagueData: selLeague })
      }
      if (selLeague == filterByType) {
        matches.forEach(dt => {
          if (dt.league != null) {
            if (dt.league.id == filterByType) {
              allLeagueData.push(dt)
              selLeague.push(dt)
            }
          }
        })
      }
      selectedCategoryData = _unionBy(selectedCategoryData, allLeagueData, 'id')
    }

    this.setState({ matches: selectedCategoryData })
    // console.log('result terakhir', selectedCategoryData)
  }
  //end

  // handleCategoryFilter = value => {
  //   const limitCategory = 1
  //   let selectedCategoryData = []
  //   const { filterByDates, filterByLeague, filterByType } = this.state

  //   // validation for ThisWeek
  //   //TODAY
  //   if (value == 'today') {
  //     const { data } = this.props.matches

  //     const TodayData = []

  //     data.forEach(el => {
  //       if (el.homeTeam && el.awayTeam && isToday(el.startTime, el.endTime)) {
  //         TodayData.push(el)
  //       }
  //     })
  //     selectedCategoryData = _unionBy(selectedCategoryData, TodayData, 'id')
  //   }

  //   //Tomorrow
  //   if (value == 'tomorrow') {
  //     const { data } = this.props.matches

  //     const tomorrowData = []

  //     data.forEach(el => {
  //       if (el.homeTeam && el.awayTeam && isTomorrow(el.startTime, el.endTime)) {
  //         tomorrowData.push(el)
  //       }
  //     })
  //     selectedCategoryData = _unionBy(selectedCategoryData, tomorrowData, 'id')
  //   }

  //   // Filter By Date This week
  //   if (value == value) {
  //     const { data } = this.props.matches
  //     const sameDateData = []
  //     data.forEach(dt => {
  //       if (dt.startTime != null) {
  //         const isSame = isSameDay(value, dt.startTime)
  //         if (isSame) {
  //           sameDateData.push(dt)
  //         }
  //       }
  //     })
  //     selectedCategoryData = _unionBy(selectedCategoryData, sameDateData, 'id')
  //   }

  //   // Validation For Video Type
  //   // Live
  //   if (value == 'live') {
  //     const { data } = this.props.matches

  //     const LiveData = []

  //     data.forEach(el => {
  //       if (el.homeTeam && el.awayTeam && isMatchLive(el.startTime, el.endTime)) {
  //         LiveData.push(el)
  //       }
  //     })
  //     selectedCategoryData = _unionBy(selectedCategoryData, LiveData, 'id')
  //   }

  //   //Full Replay Match
  //   if (value == 'frm') {
  //     const { data } = this.props.matches
  //     const fullReplayMatch = []

  //     data.forEach(index => {
  //       if (index.homeTeam && index.awayTeam && isMatchPassed(index.endTime)) {
  //         fullReplayMatch.push(index)
  //       }
  //     })
  //     selectedCategoryData = _unionBy(selectedCategoryData, fullReplayMatch, 'id')
  //   }

  //   //HighLight Replay
  //   if (value == 'highlightReplay') {
  //     const { data } = this.props.matches

  //     const hightlightData = []
  //     data.forEach(dt => {
  //       if (dt.isHighlight > 0) {
  //         hightlightData.push(dt)
  //       }
  //     })

  //     selectedCategoryData = _unionBy(selectedCategoryData, hightlightData, 'id')
  //   }

  //   //League
  //   if (value == value) {
  //     // leagueId
  //     let selLeague = []
  //     let limitSelected = 1

  //     const { data: matches } = this.props.matches
  //     const allLeagueData = []

  //     selLeague = selLeague.concat(this.state.selectedLeagueData)

  //     if (!selLeague.includes(value)) {
  //       selLeague.push(value)
  //     } else {
  //       var index = selLeague.indexOf(value)
  //       if (index > -1) {
  //         selLeague.splice(index, 1)
  //       }
  //     }
  //     if (selLeague.length > limitSelected) {
  //       this.setState({ selectedLeagueData: selLeague })
  //     }
  //     if (selLeague == value) {
  //       matches.forEach(dt => {
  //         if (dt.league != null) {
  //           if (dt.league.id == value) {
  //             allLeagueData.push(dt)
  //             selLeague.push(dt)
  //           }
  //         }
  //       })
  //     }
  //     selectedCategoryData = _unionBy(selectedCategoryData, allLeagueData, 'id')
  //   }

  //   this.setState({ matches: selectedCategoryData })
  //   console.log('result terakhir', selectedCategoryData)
  // }

  handleUserScroll = () => {
    window.addEventListener('scroll', function(evt) {
      if (evt.deltaY > 0) {
      }
      bisatapii
      return <loaderComp />
    })
  }

  handleExapandCategory = () => {
    this.handleCloseTab()
    this.handleExapand()
  }

  handleCloseTab = () => {
    this.setState({ showResultThisWeek: true })
  }

  handleExapand = () => {
    this.setState({ showResultThisWeek: false })
  }

  renderMatchInfo = () => {
    const { data } = this.props.matches
    let thisWeek = moment()
      .isoWeekday(1)
      .week()

    let dataThisWeek = []

    let text = ''
    let time = ''
    let className = ''
    let todayMatchTemp = []
    let tomorrowMatchTemp = []
    let allMatchThisWeekTemp = []

    for (let j = 0; j < data.length; j++) {
      const todayMatch = isToday(data[j].startTime)
      const tomorrowMatch = isTomorrow(data[j].startTime)
      const allMatchThisWeek = moment.unix(data[j].startTime)
      const dateFormatted = formatDateTime(data[j].startTime, 'dddd, D MMM')

      let getDataThisWeek = moment.unix(data[j].startTime)
      let weekValidate = moment(getDataThisWeek)
        .isoWeekday(1)
        .week()

      if (todayMatch != false) {
        if (isMatchLive(data[j].startTime, data[j].endTime)) {
          text = 'LIVE NOW'
          className = s.btnLiveNow
        } else {
          text = 'Today'
          className = s.btnToday
          time = dateFormatted
        }
        todayMatchTemp.push(todayMatch)
      }
      if (tomorrowMatch != false) {
        text = dateFormatted
        className = s.btnDate
        time = dateFormatted
        tomorrowMatchTemp.push(tomorrowMatch)
      }

      if (thisWeek === weekValidate) {
        time = dateFormatted
        allMatchThisWeekTemp.push(allMatchThisWeek)
        dataThisWeek.push(data[j])
      }
    }

    //Validate This week, now +7 days
    let tempMatchList = []

    for (var i = 0; i < 5; i++) {
      const date = new Date(addDateTime(null, i + 2, 'days'))
      const dtTimestamp = date.getTime()
      const formattedDateTime = formatDateTime(dtTimestamp / 1000, 'ddd, DD MMM')

      //date string to int selectedMatch
      const dateStringtoInt = new Date(moment(formattedDateTime, 'ddd, DD MMM'))
      const strTimestamp = dateStringtoInt.getTime() / 1000

      tempMatchList.push({ title: formattedDateTime, selectedMatchesStartTime: strTimestamp })
    }

    return (
      <>
        {tomorrowMatchTemp ? ( // ini juga ganti validasinya
          <div
            value="lastWeek"
            onClick={() => {
              this.handleCategoryFilter('ThisWeek', 'lastWeek')
            }}
            className={s.tomorrowLabel}
          >
            Last Week
          </div>
        ) : null}
        {todayMatchTemp ? (
          <div
            value="today"
            onClick={() => {
              this.handleCategoryFilter('ThisWeek', 'today')
            }}
            className={s.todayLabel}
          >
            Today
          </div>
        ) : null}
        {tomorrowMatchTemp ? (
          <div
            value="tomorrow"
            onClick={() => {
              this.handleCategoryFilter('ThisWeek', 'tomorrow')
            }}
            className={s.tomorrowLabel}
          >
            Tomorow
          </div>
        ) : null}
        {tempMatchList.map(dt => {
          return (
            <div
              className={s.labelThisWeekTime}
              key={dt.id}
              matchData={dt}
              onClick={() => {
                this.handleCategoryFilter('ThisWeek', dt.selectedMatchesStartTime)
              }}
            >
              {/* {console.log('result startime ONCLICK', dt.startTime)} */}
              {dt.title}
            </div>
          )
        })}
        {tomorrowMatchTemp ? ( //ini nanti ganti validasinya
          <div
            value="nextWeek"
            onClick={() => {
              this.handleCategoryFilter('ThisWeek', 'nextWeek')
            }}
            className={s.tomorrowLabel}
          >
            Next Week
          </div>
        ) : null}
      </>
    )
  }

  categoryFilter = () => {
    const { selectedLeagueData } = this.state

    const getDataFilterLeagueId = this.props.matches.data
    const leagueList = []
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
    // const { showResultThisWeek } = this.state

    return (
      <div>
        <div className={s.labelFilterThisWeek}>
          <span>This week</span>
          <span
            className={s.arrowDownBtnThisWeek}
            onClick={() => {
              this.handleExapandCategory()
            }}
          />
        </div>
        {this.state.showResultThisWeek ? (
          <div className={s.containerThisWeek}>
            <span>{this.renderMatchInfo()}</span>
          </div>
        ) : null}
        <div className={s.labelFilterVideoType}>
          <span>Video Type</span>
          <span className={s.arrowDownBtnVideoType} />
        </div>
        <div className={s.contentVideoType}>
          <div className={s.labelVideoType}>
            <div
              className={s.btnFilter}
              onClick={() => {
                this.handleCategoryFilter('VideoType', 'live')
              }}
              value="live"
            >
              Live
            </div>
          </div>
          <div className={s.labelVideoType}>
            <div
              className={s.btnFilter}
              onClick={() => {
                this.handleCategoryFilter('VideoType', 'frm')
              }}
              value="frm"
            >
              Full Replay Match
            </div>
          </div>
          <div className={s.labelVideoType}>
            <div
              className={s.btnFilter}
              onClick={() => {
                this.handleCategoryFilter('VideoType', 'highlightReplay')
              }}
              value="highlightReplay"
            >
              Hightlight Match
            </div>
          </div>
        </div>
        <div className={s.labelFilterLeague}>
          <span>League</span>
          <span className={s.arrowDownBtnLeague} />
        </div>
        <div className={s.contentLeagueCs}>
          {leagueList.map(league => {
            return (
              <div className={s.contentLeague} key={league.id}>
                <div key={league.id} className={s.contentLogoAndName}>
                  <>
                    <img className={s.filterimg} src={league.iconUrl} onClick={() => this.handleCategoryFilter('League', league.id)} />
                  </>
                  <>
                    {selectedLeagueData ? (
                      <span value={league.id} className={s.nameleague} onClick={() => this.handleCategoryFilter('League', league.id)}>
                        {league.name}
                      </span>
                    ) : (
                      <span value={league.id} className={s.selectednameleague} onClick={() => this.handleCategoryFilter('League', league.id)}>
                        {league.name}
                      </span>
                    )}
                  </>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    )
  }

  showCheckBoxVideoType = () => {
    // const { optionsCheckboxVideoType } = this.state

    return (
      // <LazyLoad>
      <div className={s.checkbox_content_VideoType}>
        <label className={s.checkbox_checked}>
          <input type="checkbox" value="live" className="myCheckboxFilter" /> <span className={s.label_text}>Live</span>
        </label>
        <label>
          <input type="checkbox" value="frm" className="myCheckboxFilter" /> <span className={s.label_text}>Full replay match</span>
        </label>
        <label>
          <input type="checkbox" value="highlightReplay" className="myCheckboxFilter" /> <span className={s.label_text}>Highlight replay</span>
        </label>
      </div>
      // </LazyLoad>
    )
  }

  showCheckBoxWeek = () => {
    return (
      // <LazyLoad>
      <div className={s.checkbox_content_Week}>
        <label className={s.checkbox_checked}>
          <input type="checkbox" value="thisWeek" className="myCheckboxFilter" /> <span className={s.label_text}>This Week</span>
        </label>
        <label>
          <input type="checkbox" value="lastWeek" className="myCheckboxFilter" /> <span className={s.label_text}>Last Week</span>
        </label>
        <label>
          <input type="checkbox" value="nextWeek" className="myCheckboxFilter" /> <span className={s.label_text}>Next Week</span>
        </label>
      </div>
      // </LazyLoad>
    )
  }

  ShowMatchCard = () => {
    const { matches } = this.state

    if (matches == '') {
      return <div className={s.noMatchContent}>Tidak Ada Pertandingan</div>
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
    const matches = this.state
    const { isScrolling } = this.state

    let sortedByStartDate = matches
    if (matches.length > 0) {
      sortedByStartDate = matches.sort((a, b) => (a.startTime > b.startTime ? 1 : -1))
    }

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
                    <div className={s.labelLoadMore}>
                      <> {this.handleUserScroll()}</>
                      Load more
                      <span className={s.loadmore} />
                    </div>
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

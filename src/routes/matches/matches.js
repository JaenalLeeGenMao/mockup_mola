import React from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'

import PropTypes from 'prop-types'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import Header from '@components/Header'
import MatchCard from '@components/MatchCard'
import LazyLoad from '@components/common/Lazyload'
import InfiniteScroll from 'react-infinite-scroll-component'
import matchListActions from '@actions/matches'
import s from './matches.css'
import { match } from 'tcomb'
import LoaderComp from './loaderComp'
import { isMatchPassed, isMatchLive } from '@source/lib/dateTimeUtil'
import moment from 'moment'

import { UiCheckbox } from '@components'

const style = {
  height: 160,
  border: '1px solid green',
  margin: 6,
  padding: 8,
}

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
    isScrolling: false, // recognize loading dot
    modalActive: false,
    optionsCheckboxVideoType: [],
    optionCheckboxWeek: [],
    checkedLastWeek: false,
    checkedThisWeek: false,
    checkedNextWeek: false,
    checkedLive: false,
    checkedFrm: false,
    checkedhr: false,
    checked: false,
    getLiga: 1,
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

  filterAllMatchesShow = () => {
    //view all matches
    const { data } = this.props.matches
    const getAllMatchesData = []

    data.forEach(index => {
      getAllMatchesData.push(index)
    })

    this.setState({ matches: getAllMatchesData })
  }

  filterLastWeek = () => {
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

    this.setState({ matches: getLastWeekData, checkedLastWeek: !this.state.checkedLastWeek })

    // console.log('see result last week data', getLastWeekData)

    return getLastWeekData.sort((a, b) => {
      return new Date(a.startTime).getTime() - new Date(b.startTime).getTime()
    })
  }

  filterThisWeek = () => {
    const { data } = this.props.matches
    let thisWeek = moment()
      .isoWeekday(1)
      .week()

    let dataThisWeek = []

    for (let i = 0; i < data.length; i++) {
      let getDataThisWeek = moment.unix(data[i].startTime)
      let weekValidate = moment(getDataThisWeek)
        .isoWeekday(1)
        .week()

      if (thisWeek === weekValidate) {
        dataThisWeek.push(data[i])
      }

      this.setState({ matches: dataThisWeek, checkedThisWeek: !this.state.checkedThisWeek })
      // console.log('get data this week', dataThisWeek)
    }
  }

  filterNextWeek = () => {
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

    this.setState({ matches: dataNextWeek, checkedNextWeek: !this.state.checkedNextWeek })
    // console.log('see result masuk', dataNextWeek)

    return dataNextWeek.sort((a, b) => {
      return new Date(a.startTime).getTime() - new Date(b.startTime).getTime()
    })
  }

  filterLive = () => {
    const { data } = this.props.matches

    const getLiveData = []

    data.forEach(el => {
      if (el.homeTeam && el.awayTeam && isMatchLive(el.startTime, el.endTime)) {
        // console.log('yaaaa', getLiveData)
        getLiveData.push(el)
      }
    })
    console.log('see result live', getLiveData)
    this.setState({ matches: getLiveData, checkedLive: !this.state.checkedLive })
  }

  filterFrm = () => {
    const { data } = this.props.matches
    const getFullReplayMatch = []

    data.forEach(index => {
      if (index.homeTeam && index.awayTeam && isMatchPassed(index.endTime)) {
        getFullReplayMatch.push(index)
      }
    })
    console.log('see result full replay match', getFullReplayMatch)

    this.setState({ matches: getFullReplayMatch, checkedFrm: !this.state.checkedFrm })
  }

  filterHr = () => {
    const { data } = this.props.matches

    const getHightlightData = []

    data.forEach(el => {
      if (!el.homeTeam || !el.awayTeam) {
        getHightlightData.push(el)
      }
    })

    // console.log('see result hightlight', getHightlightData)

    this.setState({ matches: getHightlightData, checkedhr: !this.state.checkedhr })
  }

  filterLeague = filterEplId => {
    const getValueId = filterEplId.target.valueMatches
    // console.log('return id', getValueId)
    const { data } = this.props.matches
    const getEplLeagueData = []

    data.forEach(el => {
      if (el.league) {
        const filterLeagueId = el.league.id
        // console.log('see return', getEplLeagueData)
        if (filterLeagueId == filterEplId) {
          getEplLeagueData.push(el)
        }
      }
      this.setState({ matches: getEplLeagueData })
    })
  }

  filterChanging = resultShowData => {
    const value = resultShowData.target.value
    this.setState({ resultShowData: value })

    if (value == 'all') {
      this.filterAllMatchesShow()
    }
    if (value == 'lastWeek') {
      this.filterLastWeek()
    }

    if (value == 'thisWeek') {
      this.filterThisWeek()
    }
    if (value == 'nextWeek') {
      this.filterNextWeek()
    }
    if (value == 'live') {
      this.filterLive()
    }
    if (value == 'frm') {
      this.filterFrm()
    }
    if (value == 'hr') {
      this.filterHr()
    }
  }

  filterChooseLeague = getLiga => {
    const { matches } = this.state

    // console.log('see data liga', getLiga)

    if (value == 'epl') {
      this.filterLeague()
    }
  }

  openModal = () => {
    this.setState({ modalActive: true })
  }

  closeModal = () => {
    this.setState({ modalActive: false })
  }

  static getDerivedStateFromProps(props, state) {
    if (!state.initialized && props.matches.data.length > 0 && state.matches.length === 0) {
      return {
        resultShowData: 0,
        initialized: true,
      }
    }
    return null
  }

  componentDidMount() {
    this.props.getMatches()
    window.addEventListener('scroll', this.onScroll) // test hide and show LoaderComp
    // this.handleCheckbox()
  }

  componentWillMount() {
    window.addEventListener('scroll', this.onScroll)
  }

  onScroll = () => {
    this.setState({ isScrolling: true })
    console.log('see status', isScrolling)

    clearTimeout(this.timeout)

    this.timeout = setTimeout(() => {
      this.ShowMatchCard.setState({ isScrolling: false })
    }, 2000)
  }

  componentDidUpdate(prevProps) {
    if (prevProps.matches.data.length != this.props.matches.data.length && this.state.matches.length === 0) {
      this.filterAllMatchesShow()
    }
  }

  showFilterChanging = () => {
    const getDataFilterLeagueId = this.state.matches
    // console.log('geeezzz', getDataFilterLeagueId)
    const { getliga } = this.state
    return (
      <LazyLoad>
        <div>
          <button onClick={this.openModal} className={s.labelfilter}>
            Filter
          </button>
          {this.state.modalActive && (
            <div className={s.modalDialog}>
              <span>League</span>
              <>
                {/* <LazyLoad> */}
                <div div className={s.contentFilterLeague}>
                  {getDataFilterLeagueId.map(index => {
                    const getDataMatch = index.league
                    // const uniKeys = [...new Set(getDataMatch.map(({ id }) => id))]
                    // console.log('1111111', uniKeys)
                    return (
                      <>
                        {getDataMatch != null ? (
                          <>
                            {getDataMatch.id != null ? (
                              <div>
                                <img
                                  className={s.filterimg}
                                  src={index.league.iconUrl}
                                  value={index.league.id}
                                  onClick={event => {
                                    this.filterChooseLeague(event)
                                  }}
                                />
                                <span value={index.league.id}>{index.league.name}</span>
                              </div>
                            ) : (
                              ''
                            )}
                          </>
                        ) : (
                          ''
                        )}
                      </>
                    )
                  })}
                </div>
                {/* </LazyLoad> */}
              </>
              <div className={s.contentFilterVideoType}>
                <span>Video Type</span>
                <>{this.showCheckBoxVideoType()}</>
              </div>
              <div className={s.contentFilterWeek}>
                <span>Week</span>
                <>{this.showCheckBoxWeek()}</>
              </div>
              {/* <a title="Close" onClick={this.closeModal}>
                X
              </a> */}
              <div className={s.positionSubmitBtn}>
                <button className={s.submitBtn} onClick={this.closeModal}>
                  OK
                </button>
              </div>
            </div>
          )}
        </div>
      </LazyLoad>
    )
  }

  showCheckBoxVideoType = () => {
    const { optionsCheckboxVideoType } = this.state
    // console.log('see value video type', optionsCheckboxVideoType)

    return (
      // <LazyLoad>
      <div className={s.checkbox_content_VideoType}>
        <label className={s.checkbox_checked}>
          <input
            type="checkbox"
            value="live"
            checked={this.state.checkedLive}
            onChange={event => {
              this.filterChanging(event)
            }}
          />{' '}
          <span className={s.label_text}>Live</span>
          <input
            type="checkbox"
            value="frm"
            checkedFrm={this.state.checkedFrm}
            onChange={event => {
              this.filterChanging(event)
            }}
          />{' '}
          <span className={s.label_text}>Full replay match</span>
          <input
            type="checkbox"
            value="hr"
            checkedhr={this.state.checkedhr}
            onChange={event => {
              this.filterChanging(event)
            }}
          />{' '}
          <span className={s.label_text}>Highlight replay</span>
        </label>
      </div>
      // </LazyLoad>
    )
  }

  showCheckBoxWeek = () => {
    const { optionCheckboxWeek } = this.state
    // console.log('see value week', optionCheckboxWeek)

    return (
      // <LazyLoad>
      <div className={s.checkbox_content_Week}>
        <label className={s.checkbox_checked}>
          <input
            type="checkbox"
            value="thisWeek"
            checkedThisWeek={this.state.checkedThisWeek}
            onChange={event => {
              this.filterChanging(event)
            }}
          />{' '}
          <span className={s.label_text}>This Week</span>
          <input
            type="checkbox"
            value="lastWeek"
            checkedLastWeek={this.state.checkedLastWeek}
            onChange={event => {
              this.filterChanging(event)
            }}
          />{' '}
          <span className={s.label_text}>Last Week</span>
          <input
            type="checkbox"
            value="nextWeek"
            checkedNextWeek={this.state.checkedNextWeek}
            onChange={event => {
              this.filterChanging(event)
            }}
          />{' '}
          <span className={s.label_text}>Next Week</span>
        </label>
      </div>
      // </LazyLoad>
    )
  }

  ShowMatchCard = () => {
    const { matches } = this.state

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

  render() {
    const matchesList = this.props.matches
    const matchCardData = this.props.matches.data
    const matches = this.state

    let sortedByStartDate = matches
    if (matches.length > 0) {
      console.log('see', matches.length)
      sortedByStartDate = matches.sort((a, b) => (a.startTime > b.startTime ? 1 : -1))
    }

    const isDark = false
    return (
      <>
        {/* {matchesList.meta === 'loading' && ()} */}
        {matchesList.meta.status === 'success' && (
          <>
            <div className={s.headerContainer}>
              <Header stickyOff searchOff isDark={isDark} activeMenu="sport" libraryOff {...this.props} />
            </div>
            <div className={s.root}>
              <div className={s.matchlist_container} id="containercard">
                <InfiniteScroll
                  dataLength={this.state.limit.length}
                  next={this.fetchMoreData}
                  hasMore={this.state.hasMore}
                  loader={
                    <div className={s.labelLoadMore}>
                      {this.state.isScrolling ? <LoaderComp /> : null}
                      Load more
                      <div className={s.loadmore}>v</div>
                    </div>
                  }
                  height={750}
                  endMessage={
                    <div className={s.labelAllItemSeen}>
                      <span>Semua Jadwal Matches Sudah dilihat</span>
                    </div>
                  }
                >
                  <div className={s.matchlist_wrappergrid}>
                    <div className={s.matches_grid}>
                      <div className={s.matchlist_wrappercontent_center}>
                        <div className={s.matchlist_Pagetitle}>
                          {matchCardData.length != null && this.state.limit != null ? (
                            <>
                              {this.showFilterChanging()}
                              {this.ShowMatchCard(sortedByStartDate)}
                            </>
                          ) : (
                            <div>Tidak Ada Jadwal Matches</div>
                          )}
                        </div>
                      </div>
                      <div className={s.matchlist_gridcontainer}>
                        <LazyLoad containerClassName={s.matchlist_valuelistitem}>
                          <div className={s.wrapperData} />
                        </LazyLoad>
                      </div>
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

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
import { match, union } from 'tcomb'
import LoaderComp from './loaderComp'
import { isMatchPassed, isMatchLive } from '@source/lib/dateTimeUtil'
import moment from 'moment'
import _unionBy from 'lodash/unionBy'
import _union from 'lodash/union'

import { UiCheckbox } from '@components'
import { get } from 'http'
import { Point } from 'terraformer'

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
    // isScrolling: false, // recognize loading dot
    modalActive: false,
    selectedLeague: [],
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
    // window.addEventListener('scroll', this.onScroll) // test hide and show LoaderComp
    // this.handleCheckbox()
  }

  componentWillMount() {
    // window.addEventListener('scroll', this.onScroll)
  }

  onScroll = () => {
    this.setState({ isScrolling: true })

    clearTimeout(this.timeout)

    this.timeout = setTimeout(() => {
      this.ShowMatchCard.setState({ isScrolling: false })
    }, 2000)
  }

  componentDidUpdate(prevProps) {
    if (this.props.matches.meta.status != prevProps.matches.meta.status && this.props.matches.meta.status === 'success') {
      this.setState({ matches: this.props.matches.data })
    }
  }

  filterAllLeague = leagueId => {
    const { data: matches } = this.props.matches
    const AllLeagueData = []

    matches.forEach(dt => {
      if (dt.league != null) {
        if (dt.league.id == leagueId) {
          AllLeagueData.push(dt)
        }
      }
    })

    return AllLeagueData
  }

  getSelectedLeague = leagueId => {
    let selLeague = []
    selLeague = selLeague.concat(this.state.selectedLeague)

    if (!selLeague.includes(leagueId)) {
      selLeague.push(leagueId)
    } else {
      var index = selLeague.indexOf(leagueId)
      if (index > -1) {
        selLeague.splice(index, 1)
      }
    }
    this.setState({ selectedLeague: selLeague })
  }

  handleSubmit = () => {
    let matchesTemp = []

    const filterCheckbox = document.getElementsByClassName('myCheckboxFilter')

    for (let i = 0; i < filterCheckbox.length; i++) {
      if (filterCheckbox[i].checked) {
        if (filterCheckbox[i].value == 'thisWeek') {
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
          }
          matchesTemp = _unionBy(matchesTemp, dataThisWeek, 'id')
        }
        if (filterCheckbox[i].value == 'lastWeek') {
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
          matchesTemp = _unionBy(matchesTemp, getLastWeekData, 'id')
        }
        if (filterCheckbox[i].value == 'nextWeek') {
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
          matchesTemp = _unionBy(matchesTemp, dataNextWeek, 'id')
        }
        if (filterCheckbox[i].value == 'live') {
          const { data } = this.props.matches

          const getLiveData = []

          data.forEach(el => {
            if (el.homeTeam && el.awayTeam && isMatchLive(el.startTime, el.endTime)) {
              getLiveData.push(el)
            }
          })

          matchesTemp = _unionBy(matchesTemp, getLiveData, 'id')
        }
        if (filterCheckbox[i].value == 'frm') {
          const { data } = this.props.matches
          const getFullReplayMatch = []

          data.forEach(index => {
            if (index.homeTeam && index.awayTeam && isMatchPassed(index.endTime)) {
              getFullReplayMatch.push(index)
            }
          })
          matchesTemp = _unionBy(matchesTemp, getFullReplayMatch, 'id')
        }
        if (filterCheckbox[i].value == 'highlightReplay') {
          const { data } = this.props.matches

          const getHightlightData = []

          data.forEach(dt => {
            if (dt.isHighlight > 0) {
              getHightlightData.push(dt)
            }
          })

          matchesTemp = _unionBy(matchesTemp, getHightlightData, 'id')
        }
      }
    }

    const { selectedLeague } = this.state

    for (let i = 0; i < selectedLeague.length; i++) {
      const ref = this.filterAllLeague(selectedLeague[i])
      matchesTemp = _unionBy(matchesTemp, this.filterAllLeague(selectedLeague[i]), 'id')
    }
    this.setState({ matches: matchesTemp })
  }

  showFilterChanging = () => {
    const { selectedLeague } = this.state

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
                  {leagueList.map(league => {
                    return (
                      <div key={league.id}>
                        <img className={s.filterimg} src={league.iconUrl} onClick={() => this.getSelectedLeague(league.id)} />
                        {selectedLeague.includes(league.id) ? <span className={s.checklistBtnLeague} /> : null}
                        <span value={league.id} className={s.nameleague} onClick={() => this.getSelectedLeague(league.id)}>
                          {league.name}
                        </span>
                      </div>
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
                <button
                  className={s.submitBtn}
                  onClick={() => {
                    this.handleSubmit()
                  }}
                >
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

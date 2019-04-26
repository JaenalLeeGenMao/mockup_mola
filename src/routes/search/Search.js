import React, { Fragment } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import _debounce from 'lodash.debounce'
import Header from '@components/Header'
import LazyLoad from '@components/common/Lazyload'

import searchActions from '@actions/search'
import RecentSearch from './RecentSearch/RecentSearch'
import RecentSearchLoading from './RecentSearch/RecentSearchLoading'
import Cast from './Cast/Cast'
import CastLoading from './Cast/CastLoading'
import Error from './error/Error'
import MovieSuggestion from './MovieSuggestion/MovieSuggestion'
import MovieSuggestionLoading from './MovieSuggestion/MovieSuggestionLoading'
import s from './Search.css'
import searchDb from '@source/database/searchDb'
import history from '@source/history'
import Tracker from '@source/lib/tracker'
let sessionId

class Search extends React.Component {
  constructor(props) {
    super(props)
    this.inputSearch = React.createRef()
  }

  state = {
    searchText: '',
    textSuggestion: '',
    searchedMovie: [],
    result: [],
    recentSearch: [],
    val: '',
    showAllRecentSearch: false,
    showRemoveIcon: false,
    isLoadingResult: true,
    isLoadingRecentSearch: true,
    isEmptyInput: this.props.searchKeyword ? false : true,
  }

  static propTypes = {
    title: PropTypes.string.isRequired,
    searchKeyword: PropTypes.string,
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { getSearchResult, getRecentSearch, search: { result, recentSearch }, user: { sid }, searchKeyword } = nextProps

    if (process.env.BROWSER) {
      sessionId = Tracker.sessionId()
    }
    if (recentSearch.meta.status === 'loading' && prevState.result.length <= 0) {
      var today = new Date()
      var expiredDateStamp = new Date(new Date().setDate(today.getDate() - 7))
      var expiredDate = expiredDateStamp.getFullYear() + '-' + ('0' + (expiredDateStamp.getMonth() + 1)).slice(-2) + '-' + ('0' + expiredDateStamp.getDate()).slice(-2) + ' 00:00:00'
      //hanya delete keyword cache saja, data movie dan cast masih tersimpan
      searchDb.transaction('rw', searchDb.moviesResult, searchDb.castsResult, searchDb.searchKeyword, () => {
        searchDb.searchKeyword
          .where('createdDate')
          .belowOrEqual(expiredDate)
          .delete()
          .then(function(deleteCount) {})
      })
    }

    if (recentSearch.meta.status === 'loading' && prevState.recentSearch.length <= 0) {
      getRecentSearch(sessionId, sid)
    }

    if (searchKeyword !== '' && result.meta.status === 'loading' && prevState.result.length <= 0) {
      getSearchResult(searchKeyword)
    }

    return { ...prevState, result, recentSearch }
  }

  componentDidUpdate(prevProps) {
    const { searchKeyword, search: { result: { meta }, recentSearch: { data: rsDt, meta: recentSearchMeta } } } = this.props
    if (prevProps.search.recentSearch.meta.status !== recentSearchMeta.status) {
      this.allRecentSearch = rsDt
      this.recentSearchData = rsDt
      this.showRecentSearchByInput(searchKeyword)
      this.setState({
        isLoadingRecentSearch: recentSearchMeta.status != 'loading' ? false : true,
      })
    }

    if (prevProps.search.result.meta.status !== meta.status) {
      if (this.state.searchText === '') {
        this.inputSearch.current.value = searchKeyword
      }
      this.resultval = searchKeyword
      this.parseSearchResult(searchKeyword)
    }
  }

  componentDidMount() {
    /** handle keyboard pressed */
    document.onkeyup = event => {
      console.log(event.keyCode)
      switch (event.which || event.keyCode) {
        case 13 /* enter */:
          this.inputSearch.focus()
          break
        case 27 /* esc */:
          history.goBack()
          break
        case 32 /* space */:
          this.inputSearch.focus()
          break
        default:
          event.preventDefault()
          break
      }
    }
    this.inputSearch.current.focus()
    const { search: { result, recentSearch }, searchKeyword } = this.props

    if (recentSearch.meta.status !== 'loading') {
      this.setState({
        isLoadingRecentSearch: false,
      })
    }

    if (searchKeyword !== '' && result.meta.status !== 'loading') {
      this.resultval = searchKeyword
      this.inputSearch.current.value = searchKeyword
      this.parseSearchResult(searchKeyword)
      this.setState({
        isLoadingResult: false,
      })
    }
  }

  parseSearchResult = val => {
    this.searchText = val
    const { search: { result } } = this.props
    const movieSuggestion = this.parseMovieSuggestion(result, val)
    const castSuggestion = this.parseCastSuggestion(result, val)
    let firstMatch
    if (movieSuggestion.length) {
      firstMatch = movieSuggestion[0].title
      this.textSuggestionType = 'movie'
    } else if (castSuggestion.length) {
      firstMatch = castSuggestion[0].name
      this.textSuggestionType = 'cast'
    } else {
      firstMatch = ''
    }

    const textSugRemain = firstMatch.substr(val.length, firstMatch.length)
    this.textSuggestion = firstMatch !== '' ? `${val}${textSugRemain}` : ''
    this.setState({
      searchText: val,
      isLoadingResult: result.meta.status != 'loading' ? false : true,
      showAllRecentSearch: this.inputSearch.current.value ? false : true,
      showRemoveIcon: true,
    })
  }

  parseCastSuggestion = (result, val) => {
    const matchCastArr = result.data.filter(function(dt) {
      return dt.type == 'casts'
    })

    const firstMatchCastArr = matchCastArr.filter(function(dt) {
      return dt.name.toLowerCase().indexOf(val.toLowerCase()) === 0
    })

    this.searchedCast = matchCastArr

    return firstMatchCastArr
  }

  parseMovieSuggestion = (result, val) => {
    const matchMovieArr = result.data.filter(function(dt) {
      return dt.type == 'videos'
    })

    const firstMatchMovieArr = matchMovieArr.filter(function(dt) {
      return dt.title.toLowerCase().indexOf(val.toLowerCase()) === 0
    })

    this.searchedMovie = matchMovieArr
    return firstMatchMovieArr
  }

  handleSearchChange = e => {
    const val = e.target.value
    history.replace({
      search: `q=${encodeURIComponent(val)}`,
    })

    this.setState({
      isEmptyInput: val == '' ? true : false,
      isLoadingResult: true,
    })
    this.processSearch(val)
  }

  processSearch = _debounce(val => {
    const { getSearchResult } = this.props

    getSearchResult(val)
    this.showRecentSearchByInput(val)

    this.parseSearchResult(val)
  }, 300)

  showSearchbySuggestion = () => {
    const val = this.inputSearch.current.value
    if (val != '') {
      const { getSearchResult } = this.props

      getSearchResult(val)
      this.showRecentSearchByInput(val)
      history.replace({
        search: `q=${encodeURIComponent(val)}`,
      })
    }
  }

  showRecentSearchByInput = val => {
    if (this.allRecentSearch && this.allRecentSearch.length > 0) {
      this.recentSearchData = this.allRecentSearch.filter(dt => {
        return dt.keyword.toLowerCase().indexOf(val.toLowerCase()) > -1
      })
    }
  }

  handleSearchKeyDown = event => {
    switch (event.which || event.keyCode) {
      case 38 /* up */:
        this.inputSearch.current.value = this.textSuggestion
        this.showSearchbySuggestion()
        break
      case 39 /* right */:
        this.inputSearch.current.value = this.textSuggestion
        this.showSearchbySuggestion()
        break
      case 40 /* down */:
        this.inputSearch.current.value = this.textSuggestion
        this.showSearchbySuggestion()
        break
      default:
    }
  }

  handleClickRecentSearch = val => {
    const { getSearchResult } = this.props

    this.inputSearch.current.value = val
    history.replace({
      search: `q=${encodeURIComponent(val)}`,
    })
    getSearchResult(val)
    this.parseSearchResult(val)
    this.setState({
      isEmptyInput: false,
    })
  }

  handleOnFocusSearch = () => {
    if (!this.inputSearch.current.value) {
      this.setState({
        showRemoveIcon: true,
      })
    }
  }

  showResult = () => {
    const { showAllRecentSearch } = this.state
    const { searchKeyword } = this.props
    if (this.searchText || searchKeyword !== '') {
      return true
    } else {
      return showAllRecentSearch
    }
  }

  handleRemoveSearch = () => {
    this.inputSearch.current.value = ''
    this.inputSearch.current.focus()
    this.searchText = ''
    this.textSuggestion = ''
    history.replace({
      search: '',
    })
    this.setState({
      searchText: '',
      isEmptyInput: true,
      isLoadingRecentSearch: false,
      isLoadingResult: false,
      showRemoveIcon: false,
    })
  }

  showNoResult = () => {
    const { isLoadingResult } = this.state
    const { search: { result: { meta: { status: resultStatus } } } } = this.props

    if (!isLoadingResult && this.recentSearchData && this.recentSearchData.length == 0 && resultStatus == 'no_result') {
      return true
    } else {
      return false
    }
  }

  showError = () => {
    const { isLoadingResult, isLoadingRecentSearch } = this.state
    const { search: { result: { meta: { status: resultStatus } }, recentSearch: { meta: { status: recentStatus } } } } = this.props
    if (!isLoadingResult && resultStatus == 'error' && !isLoadingRecentSearch && recentStatus == 'error') {
      return true
    } else {
      return false
    }
  }

  showRecentSearch = () => {
    if (this.recentSearchData && this.recentSearchData.length > 0) {
      return true
    } else {
      return false
    }
  }

  render() {
    const { user: { sid }, search: { result: { meta: { status: resultStatus } } }, searchKeyword } = this.props
    const { isLoadingResult, isLoadingRecentSearch, showRemoveIcon, isEmptyInput } = this.state
    const isDark = false
    const showResult = this.searchText ? searchKeyword !== '' : false
    return (
      <Fragment>
        <div className={s.headerContainer}>
          <Header stickyOff isDark={isDark} logoOff libraryOff backButtonOn leftMenuOff searchOff {...this.props} />
        </div>
        <div className={s.root}>
          <div className={s.containerBg} />
          <div className={s.container}>
            <div className={s.searchAutocomplete}>{showResult && <span>{this.textSuggestion}</span>}</div>
            <div className={s.searchInputWrapper}>
              <i className={s.searchIcon} />
              <input className={s.searchInput} ref={this.inputSearch} onChange={this.handleSearchChange} onKeyDown={this.handleSearchKeyDown} />
              {showRemoveIcon && <i className={s.removeSearchIcon} onClick={this.handleRemoveSearch} />}
            </div>

            {isEmptyInput && (
              <div className={s.resultWrapper}>
                <div className={s.resultContainer}>
                  {isLoadingRecentSearch && <RecentSearchLoading />}
                  {!isLoadingRecentSearch &&
                    this.showRecentSearch() && (
                      <RecentSearch onClick={this.handleClickRecentSearch} recentSearchData={this.recentSearchData} searchText={this.searchText} sessionId={sessionId} sid={sid} />
                    )}

                  {!isLoadingRecentSearch &&
                    !this.showRecentSearch() &&
                    !this.showError() && <Error errorTitle={'Do you have something in mind?'} errorText={'Please type any movie name or cast name to search'} />}
                  {this.showError() && <Error />}
                </div>
              </div>
            )}
            {!isEmptyInput && (
              <Fragment>
                <div className={s.resultWrapper}>
                  <div className={s.resultContainer}>
                    {isLoadingResult && <RecentSearchLoading />}
                    {!isLoadingResult &&
                      this.showRecentSearch() && (
                        <RecentSearch onClick={this.handleClickRecentSearch} recentSearchData={this.recentSearchData} searchText={this.searchText} sessionId={sessionId} sid={sid} />
                      )}
                    {!isLoadingResult && this.searchedCast && this.searchedCast.length > 0 && <Cast data={this.searchedCast} searchText={this.searchText} />}
                    {isLoadingResult && (
                      <Fragment>
                        <CastLoading />
                        <MovieSuggestionLoading />
                      </Fragment>
                    )}
                    {!isLoadingResult &&
                      resultStatus != 'error' &&
                      this.searchedMovie &&
                      this.searchedMovie.length > 0 && <MovieSuggestion data={this.searchedMovie} searchText={this.searchText} sessionId={sessionId} sid={sid} />}
                    {this.showNoResult() && (
                      <LazyLoad>
                        <div className={s.resultEmptyWrapper}>
                          <div>Your search for {`"${this.searchText}"`} did not have any matches</div>
                          <div>Try searching with different keywords</div>
                        </div>
                      </LazyLoad>
                    )}
                    {this.showError() && <Error />}
                  </div>
                </div>
              </Fragment>
            )}
          </div>
        </div>
      </Fragment>
    )
  }
}

function mapStateToProps(state) {
  return {
    ...state,
  }
}

const mapDispatchToProps = dispatch => ({
  getSearchGenre: () => dispatch(searchActions.getSearchGenre()),
  getRecentSearch: (sessionId, sid) => dispatch(searchActions.getRecentSearch(sessionId, sid)),
  getSearchResult: searchText => dispatch(searchActions.getSearchResult(searchText)),
})

export default compose(withStyles(s), connect(mapStateToProps, mapDispatchToProps))(Search)

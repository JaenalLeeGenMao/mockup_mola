import React, { Fragment } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import _debounce from 'lodash.debounce';
import Header from '@components/Header';
import LazyLoad from '@components/common/Lazyload';

import * as searchActions from '@actions/search';
import SearchGenre from './SearchGenre/SearchGenre';
import SearchGenreLoading from './SearchGenre/SearchGenreLoading';
import RecentSearch from './RecentSearch/RecentSearch';
import RecentSearchLoading from './RecentSearch/RecentSearchLoading';
// import Cast from './Cast/Cast'

import Error from '../error/Error';
import MovieSuggestion from './MovieSuggestion/MovieSuggestion';
import MovieSuggestionLoading from './MovieSuggestion/MovieSuggestionLoading';
import s from './Search.css';

import history from '../../../history';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.inputSearch = React.createRef();
  }

  state = {
    searchText: '',
    textSuggestion: '',
    searchedMovie: [],
    result: [],
    genre: [],
    recentSearch: [],
    val: '',
    showAllRecentSearch: false,
    showGenre: true,
    isLoadingGenre: true,
    isLoadingResult: true,
    isLoadingRecentSearch: true
  };

  static propTypes = {
    title: PropTypes.string.isRequired,
    searchKeyword: PropTypes.string
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    const {
      getSearchResult,
      getSearchGenre,
      getRecentSearch,
      search: { genre, result, recentSearch },
      searchKeyword
    } = nextProps;

    if (nextProps.search.genre.meta.status === 'loading' && prevState.genre.length <= 0) {
      getSearchGenre();
    }

    if (
      searchKeyword !== '' &&
      recentSearch.meta.status === 'loading' &&
      prevState.recentSearch.length <= 0
    ) {
      getRecentSearch('abc');
    }

    if (searchKeyword !== '' && result.meta.status === 'loading' && prevState.genre.length <= 0) {
      getSearchResult(searchKeyword);
    }

    return { ...prevState, result, genre, recentSearch };
  }

  componentDidUpdate(prevProps) {
    const {
      searchKeyword,
      search: {
        genre: { meta: genreMeta },
        result: { meta },
        recentSearch: { data: rsDt, meta: recentSearchMeta }
      }
    } = this.props;

    if (prevProps.search.genre.meta.status !== genreMeta.status && genreMeta.status !== 'loading') {
      this.setState({
        isLoadingGenre: false
      });
    }

    if (prevProps.search.recentSearch.meta.status !== recentSearchMeta.status) {
      this.allRecentSearch = rsDt;
      this.recentSearchData = rsDt;
      this.setState({
        isLoadingRecentSearch: false,
        showGenre: false
      });
    }

    console.log('KEYWORD', searchKeyword);
    if (prevProps.search.result.meta.status !== meta.status) {
      if (this.state.searchText === '') {
        this.inputSearch.current.value = searchKeyword;
      }
      this.resultval = searchKeyword;
      this.parseMovieSuggestion(searchKeyword);
    }
  }

  parseMovieSuggestion = val => {
    this.searchText = val;
    this.showRecentSearchByInput(val);
    const {
      search: { result }
    } = this.props;
    const matchMovieArr = result.data.filter(function(dt) {
      return dt.type == 'videos';
    });

    const firstMatchMovieArr = matchMovieArr.filter(function(dt) {
      return dt.title.toLowerCase().indexOf(val.toLowerCase()) === 0;
    });

    const firstMatchMovie = firstMatchMovieArr.length ? firstMatchMovieArr[0].title : '';
    const textSugRemain = firstMatchMovie.substr(val.length, firstMatchMovie.length);
    this.textSuggestion = firstMatchMovie !== '' ? `${val}${textSugRemain}` : '';

    this.searchedMovie = matchMovieArr;
    console.log('searchedmovie', matchMovieArr);
    this.setState({
      searchText: val,
      isLoadingResult: false,
      isLoadingRecentSearch: false,
      showGenre: false
    });
  };

  handleSearchChange = e => {
    const val = e.target.value;
    history.replace({
      search: `q=${encodeURIComponent(val)}`
    });

    this.processSearch(val);

    // var db = new Dexie("FriendDatabase");
    // db.version(1).stores({ friends: "++id,name,age" });
  };

  processSearch = _debounce(val => {
    const { getSearchResult } = this.props;

    getSearchResult(val);
    // this.showRecentSearchByInput(val);
    // getRecentSearch('abc');
    this.parseMovieSuggestion(val);
    this.setState({
      searchText: val,
      isLoadingResult: false,
      isLoadingRecentSearch: false,
      showAllRecentSearch: false,
      showGenre: false
    });

    if (val == '') {
      this.setState({
        showAllRecentSearch: true
      });
    }
  }, 300);

  showSearchbySuggestion = () => {
    if (this.inputSearch.current.value != '') {
      const { getSearchResult } = this.props;

      getSearchResult(this.inputSearch.current.value);
      history.replace({
        search: `q=${encodeURIComponent(this.inputSearch.current.value)}`
      });
    }
  };

  showRecentSearchByInput = val => {
    console.log('allRecentSearch', this.allRecentSearch, val);

    if (this.allRecentSearch && this.allRecentSearch.length > 0) {
      this.recentSearchData = this.allRecentSearch.filter(dt => {
        console.log('drt', dt);
        return dt.keyword.indexOf(this.inputSearch.current.value) > -1;
      });

      console.log('filteredRecentSearch', this.recentSearchData);
    }
  };

  handleSearchKeyDown = event => {
    switch (event.which || event.keyCode) {
      case 38 /* up */:
        this.inputSearch.current.value = this.textSuggestion;
        this.showSearchbySuggestion();
        break;
      case 39 /* right */:
        this.inputSearch.current.value = this.textSuggestion;
        this.showSearchbySuggestion();
        break;
      case 40 /* down */:
        this.inputSearch.current.value = this.textSuggestion;
        this.showSearchbySuggestion();
        break;
      default:
    }
  };

  handleClickRecentSearch = val => {
    const { getSearchResult } = this.props;

    this.inputSearch.current.value = val;
    history.replace({
      search: `q=${encodeURIComponent(val)}`
    });
    getSearchResult(val);
    this.parseMovieSuggestion(val);
    this.setState({
      searchText: val,
      isLoadingResult: false,
      showAllRecentSearch: false
    });
  };

  handleOnFocusSearch = () => {
    const { getRecentSearch } = this.props;

    if (!this.inputSearch.current.value) {
      getRecentSearch('abc');
      this.setState({
        showAllRecentSearch: true
      });
    }
  };

  showResult = () => {
    const { showAllRecentSearch, showGenre } = this.state;
    const { searchKeyword } = this.props;
    if (this.searchText || searchKeyword !== '') {
      return true;
    } else {
      return showAllRecentSearch;
    }
  };

  handleRemoveSearch = () => {
    this.inputSearch.current.value = '';
    this.textSuggestion = '';
    this.setState({
      searchText: '',
      showAllRecentSearch: false,
      showGenre: true
    });
  };

  render() {
    const {
      search: {
        genre: {
          data: genreData,
          meta: { status: genreStatus }
        },
        /*recentSearch : { data : recentSearchData },*/
        result: {
          meta: { status: resultStatus }
        }
      },
      searchKeyword
    } = this.props;
    const {
      isLoadingGenre,
      isLoadingResult,
      isLoadingRecentSearch,
      showAllRecentSearch,
      showGenre
    } = this.state;
    const isDark = false;
    const showResult = this.searchText ? searchKeyword !== '' : false;
    console.log('ISLOADINGRESULT', isLoadingResult);
    console.log('showAllRecentSearch', showAllRecentSearch);
    return (
      <Fragment>
        <Header isDark={isDark} libraryOff searchOff {...this.props} />
        <div className={s.root}>
          <div className={s.containerBg} />
          <div className={s.container}>
            <div className={s.searchAutocomplete}>
              {showResult && <span>{this.textSuggestion}</span>}
            </div>
            <div className={s.searchInputWrapper}>
              <i className={s.searchIcon} />
              <input
                className={s.searchInput}
                ref={this.inputSearch}
                onChange={this.handleSearchChange}
                onKeyDown={this.handleSearchKeyDown}
                onFocus={this.handleOnFocusSearch}
              />
              <i className={s.removeSearchIcon} onClick={this.handleRemoveSearch} />
            </div>
            {/* muncul kalau tidak ada text diinput atau dari props*/}
            {showGenre &&
              !isLoadingGenre && (
                <LazyLoad>
                  {genreStatus == 'success' && <SearchGenre data={genreData} />}
                  {genreStatus == 'error' && <Error />}
                </LazyLoad>
              )}

            {showGenre &&
              isLoadingGenre && (
                <Fragment>
                  <SearchGenreLoading />
                </Fragment>
              )}

            {/*
              showAllRecentSearch &&
              <div className={s.resultWrapper}>
                <div className={s.resultContainer}>
                  { isLoadingRecentSearch &&
                    <div className={s.resultRow}>
                      <RecentSearchLoading/>
                </div>
                  }
                  { recentSearchData.length > 0 &&
                      <div className={s.resultRow}>
                        <RecentSearch onClick={this.handleClickRecentSearch} recentSearchData={recentSearchData}/>
              </div>
            }
                </div>
              </div>
                */}
            {this.showResult() && (
              <Fragment>
                {/* { this.hasResult && */}
                <div className={s.resultWrapper}>
                  <div className={s.resultContainer}>
                    {isLoadingRecentSearch && (
                      <div className={s.resultRow}>
                        <RecentSearchLoading />
                      </div>
                    )}
                    {!isLoadingRecentSearch &&
                      this.recentSearchData &&
                      this.recentSearchData.length > 0 && (
                        <div className={s.resultRow}>
                          <RecentSearch
                            onClick={this.handleClickRecentSearch}
                            recentSearchData={this.recentSearchData}
                          />
                        </div>
                      )}
                    {/* castData.length > 0 &&
                        <div className={s.resultRow}>
                          <Cast data={castData} searchText={searchText}/>
                        </div>
                      */}
                    {!showAllRecentSearch && isLoadingResult && <MovieSuggestionLoading />}
                    {!showAllRecentSearch &&
                      !isLoadingResult &&
                      this.searchedMovie.length && (
                        <MovieSuggestion data={this.searchedMovie} searchText={this.searchText} />
                      )}
                  </div>
                </div>
                {/* } */}
                {/* {
                  !showAllRecentSearch && !this.searchedMovie.length && resultStatus == "error" &&
                  <LazyLoad>
                    <div className={s.resultEmptyWrapper}>
                      <div>Your search for {`"${this.searchText}"`} did not have any matches</div>
                      <div>Try searching different keywords or browse by genre</div>
                    </div>
                  </LazyLoad>
                } */}
              </Fragment>
            )}
          </div>
        </div>
      </Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    ...state
  };
}

const mapDispatchToProps = dispatch => ({
  getSearchGenre: () => dispatch(searchActions.getSearchGenre()),
  getRecentSearch: sessionId => dispatch(searchActions.getRecentSearch(sessionId)),
  getSearchResult: searchText => dispatch(searchActions.getSearchResult(searchText))
});

export default compose(
  withStyles(s),
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(Search);

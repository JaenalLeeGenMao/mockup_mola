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
import Cast from './Cast/Cast';

import Error from '../error/Error';
import MovieSuggestion from './MovieSuggestion/MovieSuggestion';
import MovieSuggestionLoading from './MovieSuggestion/MovieSuggestionLoading';
import s from './Search.css';

import searchDb from '../../../database/searchDb';

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
    showRemoveIcon: false,
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

    if (result.meta.status === 'loading' && prevState.genre.length <= 0) {
      var today = new Date();
      var expiredDateStamp = new Date(new Date().setDate(today.getDate() - 7));
      var expiredDate =
        expiredDateStamp.getFullYear() +
        '-' +
        ('0' + (expiredDateStamp.getMonth() + 1)).slice(-2) +
        '-' +
        ('0' + expiredDateStamp.getDate()).slice(-2) +
        ' 00:00:00';
      //hanya delete keyword cache saja, data movie dan cast masih tersimpan
      searchDb.transaction(
        'rw',
        searchDb.moviesResult,
        searchDb.castsResult,
        searchDb.searchKeyword,
        () => {
          searchDb.searchKeyword
            .where('createdDate')
            .belowOrEqual(expiredDate)
            .delete()
            .then(function(deleteCount) {});
        }
      );
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
      this.showRecentSearchByInput(searchKeyword);
      this.setState({
        isLoadingRecentSearch: false,
        showGenre: recentSearchMeta.status == 'success' ? false : true
      });
    }

    if (prevProps.search.result.meta.status !== meta.status) {
      if (this.state.searchText === '') {
        this.inputSearch.current.value = searchKeyword;
      }
      this.resultval = searchKeyword;
      this.parseSearchResult(searchKeyword);
    }
  }

  parseSearchResult = val => {
    this.searchText = val;
    const {
      search: { result }
    } = this.props;

    const movieSuggestion = this.parseMovieSuggestion(result, val);
    const castSuggestion = this.parseCastSuggestion(result, val);
    let firstMatch;
    if (movieSuggestion.length) {
      firstMatch = movieSuggestion[0].title;
      this.textSuggestionType = 'movie';
    } else if (castSuggestion.length) {
      firstMatch = castSuggestion[0].name;
      this.textSuggestionType = 'cast';
    } else {
      firstMatch = '';
    }

    const noResult =
      result.data.length == 0 &&
      (!this.recentSearchData || this.recentSearchData.length == 0) &&
      !this.inputSearch.current.value
        ? true
        : false;
    const textSugRemain = firstMatch.substr(val.length, firstMatch.length);
    this.textSuggestion = firstMatch !== '' ? `${val}${textSugRemain}` : '';
    this.setState({
      searchText: val,
      isLoadingResult: false,
      showAllRecentSearch: this.inputSearch.current.value ? false : true,
      showGenre: noResult,
      showRemoveIcon: true
    });
  };

  parseCastSuggestion = (result, val) => {
    const matchCastArr = result.data.filter(function(dt) {
      return dt.type == 'casts';
    });

    const firstMatchCastArr = matchCastArr.filter(function(dt) {
      return dt.name.toLowerCase().indexOf(val.toLowerCase()) === 0;
    });

    this.searchedCast = matchCastArr;

    return firstMatchCastArr;
  };

  parseMovieSuggestion = (result, val) => {
    const matchMovieArr = result.data.filter(function(dt) {
      return dt.type == 'videos';
    });

    const firstMatchMovieArr = matchMovieArr.filter(function(dt) {
      return dt.title.toLowerCase().indexOf(val.toLowerCase()) === 0;
    });

    this.searchedMovie = matchMovieArr;
    return firstMatchMovieArr;
  };

  handleSearchChange = e => {
    const val = e.target.value;
    history.replace({
      search: `q=${encodeURIComponent(val)}`
    });

    this.processSearch(val);
  };

  processSearch = _debounce(val => {
    const { getSearchResult } = this.props;

    getSearchResult(val);
    this.showRecentSearchByInput(val);
    this.setState({
      isLoadingResult: true
    });

    this.parseSearchResult(val);

    if (val == '') {
      this.setState({
        showAllRecentSearch: true
      });
    }
  }, 300);

  showSearchbySuggestion = () => {
    const val = this.inputSearch.current.value;
    if (val != '') {
      const { getSearchResult } = this.props;

      getSearchResult(val);
      this.showRecentSearchByInput(val);
      history.replace({
        search: `q=${encodeURIComponent(val)}`
      });
    }
  };

  showRecentSearchByInput = val => {
    if (this.allRecentSearch && this.allRecentSearch.length > 0) {
      this.recentSearchData = this.allRecentSearch.filter(dt => {
        return dt.keyword.toLowerCase().indexOf(val.toLowerCase()) > -1;
      });
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
    this.parseSearchResult(val);
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
        showAllRecentSearch: true,
        showGenre: false,
        showRemoveIcon: true
      });
    }
  };

  showResult = () => {
    const { showAllRecentSearch } = this.state;
    const { searchKeyword } = this.props;
    if (this.searchText || searchKeyword !== '') {
      return true;
    } else {
      return showAllRecentSearch;
    }
  };

  handleRemoveSearch = () => {
    this.inputSearch.current.value = '';
    this.searchText = '';
    this.textSuggestion = '';
    history.replace({
      search: ''
    });
    this.setState({
      searchText: '',
      showAllRecentSearch: false,
      isLoadingRecentSearch: false,
      isLoadingResult: false,
      showGenre: true,
      showRemoveIcon: false
    });
  };

  showNoResult = () => {
    const { showAllRecentSearch, isLoadingResult } = this.state;
    const {
      search: {
        result: {
          meta: { status: resultStatus }
        }
      }
    } = this.props;

    if (
      !showAllRecentSearch &&
      !isLoadingResult &&
      this.recentSearchData &&
      this.recentSearchData.length == 0 &&
      resultStatus == 'no_result'
    ) {
      return true;
    } else {
      return false;
    }
  };

  render() {
    const {
      search: {
        genre: {
          data: genreData,
          meta: { status: genreStatus }
        },
        // recentSearch : { meta: { status: recentSearchStatus } },
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
      showGenre,
      showRemoveIcon
    } = this.state;
    const isDark = false;
    const showResult = this.searchText ? searchKeyword !== '' : false;
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
              {showRemoveIcon && (
                <i className={s.removeSearchIcon} onClick={this.handleRemoveSearch} />
              )}
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

            {this.showResult() && (
              <Fragment>
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
                        <RecentSearch
                          onClick={this.handleClickRecentSearch}
                          recentSearchData={this.recentSearchData}
                          searchText={this.searchText}
                        />
                      )}
                    {!showAllRecentSearch &&
                      !isLoadingResult &&
                      this.searchedCast &&
                      this.searchedCast.length > 0 && (
                        <div className={s.resultRow}>
                          <Cast data={this.searchedCast} searchText={this.searchText} />
                        </div>
                      )}
                    {!showAllRecentSearch && isLoadingResult && <MovieSuggestionLoading />}
                    {!showAllRecentSearch &&
                      !isLoadingResult &&
                      resultStatus != 'error' &&
                      this.searchedMovie &&
                      this.searchedMovie.length > 0 && (
                        <MovieSuggestion data={this.searchedMovie} searchText={this.searchText} />
                      )}
                    {!showAllRecentSearch &&
                      !isLoadingResult &&
                      resultStatus == 'error' && <Error />}
                    {this.showNoResult() && (
                      <LazyLoad>
                        <div className={s.resultEmptyWrapper}>
                          <div>
                            Your search for {`"${this.searchText}"`} did not have any matches
                          </div>
                          <div>Try searching different keywords or browse by genre</div>
                        </div>
                      </LazyLoad>
                    )}
                  </div>
                </div>
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

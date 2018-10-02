import React, { Fragment } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import _debounce from 'lodash.debounce';
import Header from '@components/Header';
import LazyLoad from '@components/common/Lazyload';
import Error from '../error/Error';

import * as searchActions from '@actions/search';
import SearchGenre from './SearchGenre/SearchGenre';
import SearchGenreLoading from './SearchGenre/SearchGenreLoading';
import RecentSearch from './RecentSearch/RecentSearch';
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
    val: '',
    isLoadingGenre: true,
    isLoadingResult: true
  };

  static propTypes = {
    title: PropTypes.string.isRequired,
    searchKeyword: PropTypes.string
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    const {
      getSearchResult,
      getRecentSearch,
      getSearchGenre,
      search: { genre, result },
      searchKeyword
    } = nextProps;

    if (nextProps.search.genre.meta.status === 'loading' && prevState.genre.length <= 0) {
      getSearchGenre();
    }

    if (
      searchKeyword !== '' &&
      nextProps.search.recentSearch.meta.status === 'loading' &&
      prevState.genre.length <= 0
    ) {
      getRecentSearch('abc');
    }

    if (
      searchKeyword !== '' &&
      nextProps.search.genre.meta.status === 'loading' &&
      prevState.genre.length <= 0
    ) {
      getSearchResult(searchKeyword);
    }

    return { ...prevState, result, genre };
  }

  componentDidUpdate(prevProps) {
    const {
      searchKeyword,
      search: {
        genre: { meta: genreMeta },
        result: { meta }
      }
    } = this.props;

    if (prevProps.search.genre.meta.status !== genreMeta.status && genreMeta.status !== 'loading') {
      this.setState({
        isLoadingGenre: false
      });
    }

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

    this.hasResult = matchMovieArr.length > 0;
    this.searchedMovie = matchMovieArr;

    this.setState({
      searchText: val,
      isLoadingResult: false
    });
  };

  handleSearchChange = e => {
    const val = e.target.value;
    history.replace({
      search: `q=${encodeURIComponent(val)}`
    });

    this.processSearch(val);
  };

  processSearch = _debounce(val => {
    const { getSearchResult, getRecentSearch } = this.props;

    getSearchResult(val);
    getRecentSearch('abc');
    this.parseMovieSuggestion(val);
    this.setState({
      searchText: val,
      isLoadingResult: false
    });
  }, 300);

  handleClickRecentSearch = val => {
    console.log('RECCCCENT', val);
  };

  render() {
    const {
      search: {
        genre: {
          data: genreData,
          meta: { status: genreStatus }
        },
        recentSearch: { data: recentSearchData },
        result: {
          meta: { status: resultStatus }
        }
      },
      searchKeyword
    } = this.props;
    const { isLoadingGenre, isLoadingResult } = this.state;
    const isDark = false;
    const showResult = this.searchText ? true : false;
    const showMovieLoading = searchKeyword !== '' ? isLoadingResult : false;
    return (
      <Fragment>
        <Header isDark={isDark} isMobile libraryOff searchOff {...this.props} />
        <div className={s.root}>
          <div className={s.containerBg} />
          <div className={s.container}>
            <div className={s.searchAutocomplete}>
              {showResult && <span>{this.textSuggestion}</span>}
            </div>
            <div className={s.searchInputWrapper}>
              {!showResult && (
                <Fragment>
                  <i className={s.searchIcon} />
                  <span className={s.searchText}>Search</span>
                </Fragment>
              )}
              <input
                className={s.searchInput}
                ref={this.inputSearch}
                onChange={this.handleSearchChange}
              />
            </div>
            {!showResult &&
              !showMovieLoading &&
              !isLoadingGenre && (
                <LazyLoad>
                  {genreStatus == 'success' && <SearchGenre data={genreData} />}
                  {genreStatus == 'error' && <Error />}
                </LazyLoad>
              )}

            {!showResult &&
              !showMovieLoading &&
              isLoadingGenre && (
                <Fragment>
                  <SearchGenreLoading />
                </Fragment>
              )}

            {showMovieLoading && (
              <div className={s.resultWrapper}>
                <div className={s.resultContainer}>
                  <MovieSuggestionLoading />
                </div>
              </div>
            )}

            {showResult && (
              <Fragment>
                {/* { this.hasResult && */}
                <div className={s.resultWrapper}>
                  <div className={s.resultContainer}>
                    {recentSearchData.length > 0 && (
                      <div className={s.resultRow}>
                        <RecentSearch
                          onClick={this.handleClickRecentSearch}
                          recentSearchData={recentSearchData}
                        />
                      </div>
                    )}
                    {!isLoadingResult &&
                      this.searchedMovie.length && (
                        <MovieSuggestion data={this.searchedMovie} searchText={this.searchText} />
                      )}
                  </div>
                </div>
                {/* } */}
                {!this.searchedMovie.length &&
                  resultStatus == 'error' && (
                    <LazyLoad>
                      <div className={s.resultEmptyWrapper}>
                        <div>Your search for {`"${this.searchText}"`} did not have any matches</div>
                        <div>Try searching different keywords or browse by genre</div>
                      </div>
                    </LazyLoad>
                  )}
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

import React, { Fragment } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import _debounce from 'lodash.debounce';
import Header from '@components/Header'
import LazyLoad from '@components/common/Lazyload'


import * as searchActions from '@actions/search';
import SearchGenre from './SearchGenre/SearchGenre';
import SearchGenreLoading from './SearchGenre/SearchGenreLoading';
// import RecentSearch from './RecentSearch/RecentSearch'
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
    val: '',
    isLoadingGenre: true,
    isLoadingResult: true,
  };

  static propTypes = {
    title: PropTypes.string.isRequired,
    searchKeyword: PropTypes.string,
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    const {
      getSearchResult,
      getSearchGenre,
      search : { genre, result },
      searchKeyword
    } = nextProps;

    if (nextProps.search.genre.meta.status === 'loading'  && prevState.genre.length <= 0) {
      getSearchGenre();
    }

    if (searchKeyword !== "" && nextProps.search.genre.meta.status === 'loading'  && prevState.genre.length <= 0) {
      getSearchResult(searchKeyword);
    }

    return { ...prevState, result, genre };
  }

  componentDidUpdate(prevProps) {
    const {
      searchKeyword,
      search : { genre : { meta: genreMeta }, result : { meta } }
    } = this.props;

    if(prevProps.search.genre.meta.status !== genreMeta.status && genreMeta.status !== "loading") {
      this.setState({
        isLoadingGenre: false
      })
    }

    if(prevProps.search.result.meta.status !== meta.status) {
      if(this.state.searchText=== '') {
        this.inputSearch.current.value = searchKeyword;
      }
      this.resultval = searchKeyword;
      this.parseMovieSuggestion(searchKeyword);
    }
  }

  parseMovieSuggestion = (val) => {
    this.searchText = val;
    const { search : { result } } = this.props;
    const matchMovieArr = result.data.filter(function(dt) {
      return dt.type=="videos";
    });

    const firstMatchMovieArr = matchMovieArr.filter(function(dt){
      return dt.title.toLowerCase().indexOf(val.toLowerCase()) === 0;
    });

    const firstMatchMovie = firstMatchMovieArr.length ? firstMatchMovieArr[0].title : '';
    const textSugRemain = firstMatchMovie.substr(val.length, firstMatchMovie.length);
    this.textSuggestion = firstMatchMovie !== "" ? `${val}${textSugRemain}` : "";

    this.hasResult = matchMovieArr.length > 0;
    this.searchedMovie = matchMovieArr;

    this.setState({
      searchText: val,
      isLoadingResult: false
    })
  }

  handleSearchChange = (e) => {
    const val = e.target.value;
    history.replace({
      search: `q=${encodeURIComponent(val)}`,
    });

    this.processSearch(val);
  };

  processSearch = _debounce((val) => {
    const {
      getSearchResult
    } = this.props;

    getSearchResult(val);
    this.parseMovieSuggestion(val);
    this.setState({
      searchText: val,
      isLoadingResult: false,
    })
  }, 300);

  showSearchbySuggestion = () => {
    if(this.inputSearch.current.value != "") {
      const {
        getSearchResult
      } = this.props;

      getSearchResult(this.inputSearch.current.value);
    }
  }

  handleSearchKeyDown = (event) => {
    switch (event.which || event.keyCode) {
    case 38: /* up */
      this.inputSearch.current.value = this.textSuggestion;
      this.showSearchbySuggestion();
      break;
    case 39: /* right */
      this.inputSearch.current.value = this.textSuggestion;
      this.showSearchbySuggestion();
      break;
    case 40: /* down */
      this.inputSearch.current.value = this.textSuggestion;
      this.showSearchbySuggestion();
      break;
    default:
    }
  }

  render() {
    const { search : { genre: { data: genreData, meta : { status : genreStatus } }, result: { meta : { status : resultStatus } } }, searchKeyword } = this.props;
    const { isLoadingGenre, isLoadingResult } = this.state;
    const isDark = false;
    const showResult = this.searchText ? true : false;
    const showMovieLoading = searchKeyword!== "" ? isLoadingResult : false;
    return (
      <Fragment>
        <Header isDark={isDark} libraryOff searchOff {...this.props} />
        <div className={s.root}>
          <div className={s.containerBg}/>
          <div className={s.container}>
            <div className={s.searchAutocomplete}>
              { showResult &&
                <span>
                  {this.textSuggestion}
                </span>
              }
            </div>
            <div className={s.searchInputWrapper}>
              <i className={s.searchIcon}/>
              <input
                className={s.searchInput}
                ref={this.inputSearch}
                onChange={this.handleSearchChange}
                onKeyDown={this.handleSearchKeyDown}
              />
            </div>
            { !showResult && !showMovieLoading && !isLoadingGenre &&
              <LazyLoad>
                { genreStatus == "success" && <SearchGenre data={genreData}/> }
                { genreStatus == "error" && <Error/> }
              </LazyLoad>
            }

            { !showResult && !showMovieLoading && isLoadingGenre &&
            <Fragment>
              <SearchGenreLoading/>
            </Fragment>
            }

            {
              showMovieLoading &&
              <div className={s.resultWrapper}>
                <div className={s.resultContainer}>
                  <MovieSuggestionLoading/>
                </div>
              </div>
            }

            {
              showResult &&
              <Fragment>
                { this.hasResult &&
                  <div className={s.resultWrapper}>
                    <div className={s.resultContainer}>
                      {/* { recentSearch.length > 0 &&
                        <div className={s.resultRow}>
                          <RecentSearch isMobile={isMobile} data={recentSearch}/>
                        </div>
                      }
                      { castData.length > 0 &&
                        <div className={s.resultRow}>
                          <Cast data={castData} searchText={searchText}/>
                        </div>
                      } */}
                      { !isLoadingResult &&  this.searchedMovie.length && <MovieSuggestion data={this.searchedMovie} searchText={this.searchText}/> }
                    </div>
                  </div>
                }
                {
                  !this.searchedMovie.length && resultStatus == "error" &&
                  <LazyLoad>
                    <div className={s.resultEmptyWrapper}>
                      <div>Your search for {`"${this.searchText}"`} did not have any matches</div>
                      <div>Try searching different keywords or browse by genre</div>
                    </div>
                  </LazyLoad>
                }
              </Fragment>
            }
          </div>
        </div>
      </Fragment>
    )
  }
}

function mapStateToProps(state) {
  return {
    ...state
  }
}

const mapDispatchToProps = (dispatch) => ({
  getSearchGenre: () => dispatch(searchActions.getSearchGenre()),
  getSearchResult: searchText => dispatch(searchActions.getSearchResult(searchText)),
})

export default compose(
  withStyles(s),
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
)(Search)

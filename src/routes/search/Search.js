import React, { Fragment } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import Header from '@components/header'
import LazyLoadBeta from '@components/common/LazyloadBeta'

import _debounce from 'lodash.debounce';

import * as searchActions from '@actions/search';
import SearchGenre from './SearchGenre/SearchGenre';
import MsearchGenre from './SearchGenre/MsearchGenre';
import SearchGenreLoading from './SearchGenre/SearchGenreLoading';
import MsearchGenreLoading from './SearchGenre/MsearchGenreLoading';
// import RecentSearch from './RecentSearch/RecentSearch'
// import Cast from './Cast/Cast'
import MovieSuggestion from './MovieSuggestion/MovieSuggestion';
import MmovieSuggestion from './MovieSuggestion/MmovieSuggestion';
import MovieSuggestionLoading from './MovieSuggestion/MovieSuggestionLoading';
import MmovieSuggestionLoading from './MovieSuggestion/MmovieSuggestionLoading';
import s from './Search.css';

import history from '../../history';

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
    isMobile: PropTypes.bool,
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
    history.push({
      search: `q=${encodeURIComponent(val)}`,
    });
    this.processSearch(val);
  };

  processSearch = _debounce((val) => {
    const {
      getSearchResult,
      search: { result: { meta:status } }
    } = this.props;

    getSearchResult(val);
    this.parseMovieSuggestion(val);
    this.setState({
      searchText: val,
      isLoadingResult: false,
    })
  }, 300);

  render() {
    const { isMobile, search : { genre: { data: genreData }, result: { meta : { status : resultStatus } } }, searchKeyword } = this.props;
    const { isLoadingGenre, isLoadingResult } = this.state;
    const isDark = false;
    const showResult = this.searchText ? true : false;
    const showSearchPlaceholder = isMobile && !showResult;

    const showMovieLoading = searchKeyword!== "" ? isLoadingResult : false;
    // const noResult = !this.searchedMovie.length && resultStatus!== "success";
    return (
      <Fragment>
        { !isMobile &&
          <Header isDark={isDark} libraryOff searchOff/>
        }
        <div className={s.root}>
          <div className={s.containerBg}/>
          <div className={s.container}>
            <div className={isMobile ? s.searchAutocomplete__mobile : s.searchAutocomplete}>
              { showResult && !isMobile &&
                <span>
                  {this.textSuggestion}
                </span>
              }
            </div>
            <div className={s.searchInputWrapper}>
              { isMobile && !showResult && <i className={s.searchIcon__mobile}/>}
              { !isMobile && <i className={s.searchIcon}/>}
              { showSearchPlaceholder && <span className={s.searchText}>Search</span>}
              <input
                className={isMobile ? s.searchInput__mobile : s.searchInput}
                ref={this.inputSearch}
                onChange={this.handleSearchChange}
              />
            </div>
            { !showResult && !showMovieLoading && !isLoadingGenre &&
              <LazyLoadBeta>
                { !isMobile && <SearchGenre data={genreData}/> }
                { isMobile && <MsearchGenre data={genreData}/> }
              </LazyLoadBeta>
            }

            { !showResult && !showMovieLoading && isLoadingGenre &&
            <Fragment>
              { !isMobile && <SearchGenreLoading/> }
              { isMobile && <MsearchGenreLoading/> }
            </Fragment>
            }

            {
              showMovieLoading &&
              <div className={s.resultWrapper}>
                <div className={isMobile ? s.resultContainer__mobile : s.resultContainer}>
                  { !isMobile && <MovieSuggestionLoading/> }
                  { isMobile && <MmovieSuggestionLoading/> }
                </div>
              </div>
            }

            {
              showResult &&
              <Fragment>
                { this.hasResult &&
                  <div className={s.resultWrapper}>
                    <div className={isMobile ? s.resultContainer__mobile : s.resultContainer}>
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

                      { !isLoadingResult && !isMobile &&  this.searchedMovie.length && <MovieSuggestion data={this.searchedMovie} searchText={this.searchText}/> }
                      { !isLoadingResult && isMobile &&  this.searchedMovie.length && <MmovieSuggestion data={this.searchedMovie} searchText={this.searchText}/> }
                    </div>
                  </div>
                }
                {
                  !this.searchedMovie.length && resultStatus == "error" &&
                  <LazyLoadBeta>
                    <div className={s.resultEmptyWrapper}>
                      <div>Your search for {`"${this.searchText}"`} did not have any matches</div>
                      <div>Try searching different keywords or browse by genre</div>
                    </div>
                  </LazyLoadBeta>
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

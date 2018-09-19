import React, { Fragment } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import Header from '@components/header'
import LazyLoadBeta from '@components/common/LazyloadBeta'

import _debounce from 'lodash.debounce';

import * as searchActions from '@actions/search';
import SearchGenre from './SearchGenre/SearchGenre'
import MsearchGenre from './SearchGenre/MsearchGenre'
// import RecentSearch from './RecentSearch/RecentSearch'
// import Cast from './Cast/Cast'
import MovieSuggestion from './MovieSuggestion/MovieSuggestion'
import MmovieSuggestion from './MovieSuggestion/MmovieSuggestion'
import s from './Search.css'

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
    val: ''
  };

  static propTypes = {
    title: PropTypes.string.isRequired,
    isMobile: PropTypes.bool,
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    const {
      getSearchResult,
      search : { result },
      searchKeyword
    } = nextProps;

    if (nextProps.search.result.meta.status === 'loading'  && prevState.result.length <= 0) {
      getSearchResult(searchKeyword);
    }

    return { ...prevState, result };
  }

  componentDidUpdate(prevProps) {
    const {
      searchKeyword
    } = this.props;

    if(prevProps.search.result.meta.status !== this.props.search.result.meta.status) {
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
      getSearchResult
    } = this.props;

    getSearchResult(val);
    this.parseMovieSuggestion(val);
    this.setState({
      searchText: val,
    })
  }, 300);

  render() {
    const { isMobile } = this.props;
    const isDark = false;
    const showResult = this.searchText ? true : false;
    const showSearchPlaceholder = isMobile && !showResult;

    const genre = [
      { title: 'Action', imgUrl: 'assets/search_scifi@2x.png', link: '' },
      { title: 'Family', imgUrl: '../assets/search_scifi@2x.png', link: '' },
      { title: 'Adventure', imgUrl: '../assets/search_scifi@2x.png', link: '' },
      { title: 'Horor', imgUrl: '../assets/search_scifi@2x.png', link: '' },
      { title: 'Comedy', imgUrl: '../assets/search_scifi@2x.png', link: '' },
      { title: 'Romance', imgUrl: '../assets/search_scifi@2x.png', link: '' },
      { title: 'Documentary', imgUrl: '../assets/search_scifi@2x.png', link: '' },
    ]

    // const recentSearch = [
    //   'Shawsank Redemption',
    //   'Terminator 3 : The Return of Terminator',
    //   'World War Z',
    //   'The Forest',
    //   'Avatar',
    //   'IT: II',
    //   'This Is Spartan',
    // ]
    // const castData = [
    //   { id: 1, name: 'Diana Maragareng', profileImgUrl: 'https://www.thefamouspeople.com/profiles/thumbs/taissa-farmiga-1.jpg' },
    //   { id: 2, name: 'Thelma Harison', profileImgUrl: 'https://www.thefamouspeople.com/profiles/thumbs/taissa-farmiga-1.jpg' },
    //   { id: 3, name: 'Warzy Hist', profileImgUrl: 'https://www.thefamouspeople.com/profiles/thumbs/taissa-farmiga-1.jpg' },
    //   { id: 4, name: 'Ava Mendez', profileImgUrl: 'https://www.thefamouspeople.com/profiles/thumbs/taissa-farmiga-1.jpg' },
    //   { id: 5, name: 'Diana Maragareng', profileImgUrl: 'https://www.thefamouspeople.com/profiles/thumbs/taissa-farmiga-1.jpg' },
    //   { id: 6, name: 'Diana Maragareng', profileImgUrl: 'https://www.thefamouspeople.com/profiles/thumbs/taissa-farmiga-1.jpg' },
    //   { id: 7, name: 'Diana Maragareng', profileImgUrl: 'https://www.thefamouspeople.com/profiles/thumbs/taissa-farmiga-1.jpg' },
    //   { id: 8, name: 'Diana Maragareng', profileImgUrl: 'https://www.thefamouspeople.com/profiles/thumbs/taissa-farmiga-1.jpg' },
    //   { id: 9, name: 'Diana Maragareng', profileImgUrl: 'https://www.thefamouspeople.com/profiles/thumbs/taissa-farmiga-1.jpg' },
    //   { id: 10, name: 'Diana Maragareng', profileImgUrl: 'https://www.thefamouspeople.com/profiles/thumbs/taissa-farmiga-1.jpg' },
    //   { id: 11, name: 'Diana Maragareng', profileImgUrl: 'https://www.thefamouspeople.com/profiles/thumbs/taissa-farmiga-1.jpg' },
    // ]

    // const movieSuggestionDt = [
    //   { id: 1, title: 'Deadpool II', year: '2018', coverUrl: 'https://i.imgur.com/3h2v67m.png' },
    //   { id: 2, title: 'Jurassic Park: The Lost World', year: '2010', coverUrl: 'https://i.imgur.com/3h2v67m.png' },
    //   { id: 3, title: 'Jaws', year: '2011', coverUrl: 'https://i.imgur.com/3h2v67m.png' },
    //   { id: 4, title: 'Alien', year: '1999', coverUrl: 'https://i.imgur.com/3h2v67m.png' },
    //   { id: 5, title: 'Jurassic Park: The Lost World and The Lost Dino', year: '2018', coverUrl: 'https://i.imgur.com/3h2v67m.png' },
    //   { id: 6, title: 'Jurassic Park: The Lost World', year: '2000', coverUrl: 'https://i.imgur.com/3h2v67m.png' },
    //   { id: 7, title: 'Jurassic Park: The Lost World', year: '2010', coverUrl: 'https://i.imgur.com/3h2v67m.png' },
    //   { id: 8, title: 'The Nun', year: '2019', coverUrl: 'https://i.imgur.com/3h2v67m.png' },
    //   { id: 9, title: 'Lion King', year: '1999', coverUrl: 'https://i.imgur.com/3h2v67m.png' },
    //   { id: 10, title: 'Kung Fu Panda: Secrets of the Furious Five', year: '2000', coverUrl: 'https://i.imgur.com/3h2v67m.png' },
    //   { id: 11, title: 'Conjuring', year: '2016', coverUrl: 'https://i.imgur.com/3h2v67m.png' },
    // ]

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
            { !showResult && !isMobile &&
              <LazyLoadBeta>
                <SearchGenre data={genre}/>
              </LazyLoadBeta>
            }

            { !showResult && isMobile &&
              <LazyLoadBeta>
                <MsearchGenre data={genre}/>
              </LazyLoadBeta>
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
                      { !isMobile &&  this.searchedMovie.length && <MovieSuggestion isMobile={isMobile} data={this.searchedMovie} searchText={this.searchText}/> }
                      { isMobile &&  this.searchedMovie.length && <MmovieSuggestion isMobile={isMobile} data={this.searchedMovie} searchText={this.searchText}/> }
                    </div>
                  </div>
                }
                {
                  !this.searchedMovie.length &&
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
  getSearchResult: searchText => dispatch(searchActions.getSearchResult(searchText)),
})

export default compose(
  withStyles(s),
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
)(Search)

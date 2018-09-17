import React, { Fragment } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import Header from '@components/header'
import LazyLoadBeta from '@components/common/LazyloadBeta'

import { getSearchVideo } from '../../actions/search'
import SearchGenre from './SearchGenre/SearchGenre'
import MsearchGenre from './SearchGenre/MsearchGenre'
import RecentSearch from './RecentSearch/RecentSearch'
import Cast from './Cast/Cast'
import MovieSuggestion from './MovieSuggestion/MovieSuggestion'
import MmovieSuggestion from './MovieSuggestion/MmovieSuggestion'
import s from './Search.css'

class Search extends React.Component {
  state = {
    showResult: false,
    searchText: '',
    textSuggestion: '',
    searchedMovie: [],

  };

  static propTypes = {
    title: PropTypes.string.isRequired,
    isMobile: PropTypes.bool,
  };

  componentWillMount() {
    this.props.getSearchVideo();
  }

  handleSearchChange = (e) => {
    const val = e.target.value;
    const { search : { videos } } = this.props;
    // console.log("VIDEO", videos)
    if(videos.meta.status !== 'success') {
      this.props.getSearchVideo();
    }
    const matchMovieArr = videos.data.filter(function(dt) {
      return dt.title.toLowerCase().indexOf(val.toLowerCase()) !== -1;
    });

    const firstMatchMovieArr = matchMovieArr.filter(function(dt){
      return dt.title.toLowerCase().indexOf(val.toLowerCase()) === 0;
    });

    const firstMatchMovie = firstMatchMovieArr.length ? firstMatchMovieArr[0].title : '';
    const textSugRemain = firstMatchMovie.substr(val.length, firstMatchMovie.length);
    this.setState({
      showResult: val,
    })
    this.textSuggestion = `${val}${textSugRemain}`;
    this.searchedMovie = matchMovieArr;
    this.searchText = val;
  };

  render() {
    const { showResult } = this.state
    const { isMobile } = this.props;
    const showSearchPlaceholder = isMobile && !showResult;
    const isDark = false;

    const genre = [
      { title: 'Action', imgUrl: 'assets/search_scifi@2x.png', link: '' },
      { title: 'Family', imgUrl: '../assets/search_scifi@2x.png', link: '' },
      { title: 'Adventure', imgUrl: '../assets/search_scifi@2x.png', link: '' },
      { title: 'Horor', imgUrl: '../assets/search_scifi@2x.png', link: '' },
      { title: 'Comedy', imgUrl: '../assets/search_scifi@2x.png', link: '' },
      { title: 'Romance', imgUrl: '../assets/search_scifi@2x.png', link: '' },
      { title: 'Documentary', imgUrl: '../assets/search_scifi@2x.png', link: '' },
    ]

    const recentSearch = [
      'Shawsank Redemption',
      'Terminator 3 : The Return of Terminator',
      'World War Z',
      'The Forest',
      'Avatar',
      'IT: II',
      'This Is Spartan',
    ]
    const castData = [
      { id: 1, name: 'Diana Maragareng', profileImgUrl: 'https://www.thefamouspeople.com/profiles/thumbs/taissa-farmiga-1.jpg' },
      { id: 2, name: 'Thelma Harison', profileImgUrl: 'https://www.thefamouspeople.com/profiles/thumbs/taissa-farmiga-1.jpg' },
      { id: 3, name: 'Warzy Hist', profileImgUrl: 'https://www.thefamouspeople.com/profiles/thumbs/taissa-farmiga-1.jpg' },
      { id: 4, name: 'Ava Mendez', profileImgUrl: 'https://www.thefamouspeople.com/profiles/thumbs/taissa-farmiga-1.jpg' },
      { id: 5, name: 'Diana Maragareng', profileImgUrl: 'https://www.thefamouspeople.com/profiles/thumbs/taissa-farmiga-1.jpg' },
      { id: 6, name: 'Diana Maragareng', profileImgUrl: 'https://www.thefamouspeople.com/profiles/thumbs/taissa-farmiga-1.jpg' },
      { id: 7, name: 'Diana Maragareng', profileImgUrl: 'https://www.thefamouspeople.com/profiles/thumbs/taissa-farmiga-1.jpg' },
      { id: 8, name: 'Diana Maragareng', profileImgUrl: 'https://www.thefamouspeople.com/profiles/thumbs/taissa-farmiga-1.jpg' },
      { id: 9, name: 'Diana Maragareng', profileImgUrl: 'https://www.thefamouspeople.com/profiles/thumbs/taissa-farmiga-1.jpg' },
      { id: 10, name: 'Diana Maragareng', profileImgUrl: 'https://www.thefamouspeople.com/profiles/thumbs/taissa-farmiga-1.jpg' },
      { id: 11, name: 'Diana Maragareng', profileImgUrl: 'https://www.thefamouspeople.com/profiles/thumbs/taissa-farmiga-1.jpg' },
    ]

    const movieSuggestionDt = [
      { id: 1, title: 'Deadpool II', year: '2018', coverUrl: 'https://i.imgur.com/3h2v67m.png' },
      { id: 2, title: 'Jurassic Park: The Lost World', year: '2010', coverUrl: 'https://i.imgur.com/3h2v67m.png' },
      { id: 3, title: 'Jaws', year: '2011', coverUrl: 'https://i.imgur.com/3h2v67m.png' },
      { id: 4, title: 'Alien', year: '1999', coverUrl: 'https://i.imgur.com/3h2v67m.png' },
      { id: 5, title: 'Jurassic Park: The Lost World and The Lost Dino', year: '2018', coverUrl: 'https://i.imgur.com/3h2v67m.png' },
      { id: 6, title: 'Jurassic Park: The Lost World', year: '2000', coverUrl: 'https://i.imgur.com/3h2v67m.png' },
      { id: 7, title: 'Jurassic Park: The Lost World', year: '2010', coverUrl: 'https://i.imgur.com/3h2v67m.png' },
      { id: 8, title: 'The Nun', year: '2019', coverUrl: 'https://i.imgur.com/3h2v67m.png' },
      { id: 9, title: 'Lion King', year: '1999', coverUrl: 'https://i.imgur.com/3h2v67m.png' },
      { id: 10, title: 'Kung Fu Panda: Secrets of the Furious Five', year: '2000', coverUrl: 'https://i.imgur.com/3h2v67m.png' },
      { id: 11, title: 'Conjuring', year: '2016', coverUrl: 'https://i.imgur.com/3h2v67m.png' },
    ]


    return (
      <Fragment>
        { !isMobile &&
          <Header isDark={isDark} libraryOff searchOff/>
        }
        <div className={s.root}>
          <div className={s.containerBg}/>
          <div className={s.container}>
            <div className={isMobile ? s.searchAutocomplete__mobile : s.searchAutocomplete}>
              { showResult &&
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

            { showResult &&
              <div className={s.resultWrapper}>
                <div className={isMobile ? s.resultContainer__mobile : s.resultContainer}>
                  { recentSearch.length > 0 &&
                    <div className={s.resultRow}>
                      <RecentSearch isMobile={isMobile} data={recentSearch}/>
                    </div>
                  }
                  { castData.length > 0 &&
                    <div className={s.resultRow}>
                      <Cast data={castData} searchText={this.searchText}/>
                    </div>
                  }
                  { !isMobile &&  this.searchedMovie.length && <MovieSuggestion isMobile={isMobile} data={this.searchedMovie} searchText={this.searchText}/> }
                  { isMobile &&  this.searchedMovie.length && <MmovieSuggestion isMobile={isMobile} data={this.searchedMovie} searchText={this.searchText}/> }
                </div>
              </div>
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
  getSearchVideo: () => dispatch(getSearchVideo()),
})

export default compose(
  withStyles(s),
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
)(Search)

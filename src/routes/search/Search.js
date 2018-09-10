import React, { Fragment } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Header from '@components/header';
import LazyLoad from '@components/common/Lazyload';
import classNames from 'classnames';

import SearchGenre from './SearchGenre/SearchGenre'
import RecentSearch from './RecentSearch/RecentSearch'
import Cast from './Cast/Cast'
import MovieSuggestion from './MovieSuggestion/MovieSuggestion'
import s from './Search.css';

class Search extends React.Component {
  state = {
    showResult: false,
    searchText: '',
    isMobile: true,
    isBrowser: true
  };

  static propTypes = {
    title: PropTypes.string.isRequired,
  };

  componentDidMount() {
    //nanti ganti pakai ref
    this.setState({
      isMobile: window.innerWidth <= 960 ? true : false,
      isBrowser: window.innerWidth > 960 ? true : false
    })
  }

  handleSearchChange = e => {
    const searchVal = e.target.value;
    console.log('TEXT', e.target.value);
    this.setState({
      showResult: searchVal,
      searchText: searchVal,
      
    })
  };

  render() {
    const { showResult, searchText, isMobile, isBrowser } = this.state;
    const showSearchIcon = isBrowser || ( isMobile && !showResult);
    const showSearchPlaceholder = isMobile && !showResult;
    const isDark = false;
    const recentSearch = [
      'Shawsank Redemption',
      'Terminator 3 : The Return of Terminator',
      'World War Z',
      'The Forest',
      'Avatar',
      'IT: II',
      'This Is Spartan'
    ]
    const castData = [
      { id: 1, name: 'Diana Maragareng', profileImgUrl: 'https://www.thefamouspeople.com/profiles/thumbs/taissa-farmiga-1.jpg'},
      { id: 2, name: 'Thelma Harison', profileImgUrl: 'https://www.thefamouspeople.com/profiles/thumbs/taissa-farmiga-1.jpg'},
      { id: 3, name: 'Warzy Hist', profileImgUrl: 'https://www.thefamouspeople.com/profiles/thumbs/taissa-farmiga-1.jpg'},
      { id: 4, name: 'Ava Mendez', profileImgUrl: 'https://www.thefamouspeople.com/profiles/thumbs/taissa-farmiga-1.jpg'},
      { id: 5, name: 'Diana Maragareng', profileImgUrl: 'https://www.thefamouspeople.com/profiles/thumbs/taissa-farmiga-1.jpg'},
      { id: 6, name: 'Diana Maragareng', profileImgUrl: 'https://www.thefamouspeople.com/profiles/thumbs/taissa-farmiga-1.jpg'},
      { id: 7, name: 'Diana Maragareng', profileImgUrl: 'https://www.thefamouspeople.com/profiles/thumbs/taissa-farmiga-1.jpg'},
      { id: 8, name: 'Diana Maragareng', profileImgUrl: 'https://www.thefamouspeople.com/profiles/thumbs/taissa-farmiga-1.jpg'},
      { id: 9, name: 'Diana Maragareng', profileImgUrl: 'https://www.thefamouspeople.com/profiles/thumbs/taissa-farmiga-1.jpg'},
      { id: 10, name: 'Diana Maragareng', profileImgUrl: 'https://www.thefamouspeople.com/profiles/thumbs/taissa-farmiga-1.jpg'},
      { id: 11, name: 'Diana Maragareng', profileImgUrl: 'https://www.thefamouspeople.com/profiles/thumbs/taissa-farmiga-1.jpg'},
    ]

    const movieSuggestionDt = [
      { id: 1, title: 'Deadpool II', year: '2018', coverUrl: 'https://i.imgur.com/3h2v67m.png'},
      { id: 2, title: 'Jurassic Park: The Lost World', year: '2010', coverUrl: 'https://i.imgur.com/3h2v67m.png'},
      { id: 3, title: 'Jaws', year: '2011', coverUrl: 'https://i.imgur.com/3h2v67m.png'},
      { id: 4, title: 'Alien', year: '1999', coverUrl: 'https://i.imgur.com/3h2v67m.png'},
      { id: 5, title: 'Jurassic Park: The Lost World and The Lost Dino', year: '2018', coverUrl: 'https://i.imgur.com/3h2v67m.png'},
      { id: 6, title: 'Jurassic Park: The Lost World', year: '2000', coverUrl: 'https://i.imgur.com/3h2v67m.png'},
      { id: 7, title: 'Jurassic Park: The Lost World', year: '2010', coverUrl: 'https://i.imgur.com/3h2v67m.png'},
      { id: 8, title: 'The Nun', year: '2019', coverUrl: 'https://i.imgur.com/3h2v67m.png'},
      { id: 9, title: 'Lion King', year: '1999', coverUrl: 'https://i.imgur.com/3h2v67m.png'},
      { id: 10, title: 'Kung Fu Panda: Secrets of the Furious Five', year: '2000', coverUrl: 'https://i.imgur.com/3h2v67m.png'},
      { id: 11, title: 'Conjuring', year: '2016', coverUrl: 'https://i.imgur.com/3h2v67m.png'},
    ]

    const playlist = [
			{
				id: 1,
				isActive: false,
				attributes: 
				{ title: 'Profile Data' }
			},
			{ 
				id: 2,
				isActive: true,
				attributes: 
				{ title: 'History' }
			},
		]

    return (
      <Fragment>
        <div className={classNames(s.headerNone, !isMobile ? s.headerDisplay : '')}>
          <Header isDark={isDark}/>
        </div>
        <div className={s.root}>
          <div className={s.container}>
            <div className={s.searchAutocomplete}>
              { showResult &&
                <span>
                  Drama
                </span>
              }
            </div>
            <div className={s.searchInputWrapper}>
        
              { showSearchIcon && <i className={s.searchIcon}/>}
              { showSearchPlaceholder && <span className={isBrowser ? '' : s.searchText}>Search</span>}
                
              
              <input
                className={s.searchInput}
                onChange={this.handleSearchChange}
              />
            </div>
            { !showResult && 
              <LazyLoad>
                <SearchGenre/>
              </LazyLoad>
            }

            { showResult &&
              <div className={s.resultWrapper}>
                <div className={s.resultContainer}>
                  { recentSearch.length > 0 && 
                    <div className={s.resultRow}>
                      <RecentSearch data={recentSearch}/>
                    </div>
                  }
                  { castData.length > 0 && 
                    <div className={s.resultRow}>
                      <Cast data={castData} searchText={searchText}/>
                    </div>
                  }
                  <MovieSuggestion data={movieSuggestionDt} searchText={searchText}/>
                </div>
              </div>
            }
          </div>
        </div>
      </Fragment>
    );
  }
}

function mapStateToProps(state, ownProps) {
  //   console.log('stateeee', state);
    return {
      movies: state.history.movies,
    };
  }
  
  const mapDispatchToProps = dispatch => ({
      getAllHistory: () => dispatch(getAllHistory()),
  });
  
  export default compose(
    withStyles(s),
    connect(
      mapStateToProps,
      mapDispatchToProps,
    ),
  )(Search);
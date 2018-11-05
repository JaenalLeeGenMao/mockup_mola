import React, { Fragment, Component } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { compose } from 'redux';
import { connect } from 'react-redux';
import * as movieLibraryActions from '@actions/movie-library';
import searchActions from '@actions/search';
import CardLibrary from './movielibrary/Card';
import Layout from '../../components/Molalayout';

// import Header from '../../components/Header';
// import Navbar from '../../components/Navigation';

import Libheader from './movielibrary/Libheader';
import s from './Library.css';
import LoadingPlaceholder from '../../components/common/LoadingPlaceholder/LoadingPlaceholder';

class MovieLibrary extends Component {
  state = {
    movieLibrary: [],
    search: {
      genre: []
    },
    isLoading: true
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    const {
      getMovieLibrary,
      getSearchGenre,
      search,
      movieLibrary,
      genreId //passed as props from index.js
    } = nextProps;

    if (movieLibrary.meta.status === 'loading' && prevState.movieLibrary.length <= 0) {
      // getMovieLibrary('tt1179056');
      getMovieLibrary(genreId);
    }

    if (search.genre.meta.status === 'loading' && prevState.search.genre.length <= 0) {
      getSearchGenre();
    }

    return { ...prevState, movieLibrary, search };
  }

  componentDidUpdate(prevProps) {
    const { movieLibrary } = this.props;

    //update loading state
    if (prevProps.movieLibrary.meta.status !== movieLibrary.meta.status && movieLibrary.meta.status !== 'loading') {
      this.setState({
        isLoading: false
      });
    }
  }

  render() {
    const { movieLibrary: { data: libraryDt }, search: { genre: { data: genreDt } }, isMobile } = this.props;
    const { isLoading } = this.state;
    const title = libraryDt.length > 0 ? libraryDt[0].genreTitle.toUpperCase() : '';
    const cardImageLib = libraryDt.length > 0 ? libraryDt : null;

    const cardImageLoading = [
      {
        id: '12',
        width: isMobile ? 'auto' : '266px',
        height: '138px'
      },
      {
        id: '12',
        width: isMobile ? 'auto' : '266px',
        height: '200px'
      },
      {
        id: '12',
        width: isMobile ? 'auto' : '266px',
        height: '108px'
      },
      {
        id: '12',
        width: isMobile ? 'auto' : '266px',
        height: '300px'
      },
      {
        id: '12',
        width: isMobile ? 'auto' : '266px',
        height: '120px'
      },
      {
        id: '12',
        width: isMobile ? 'auto' : '266px',
        height: '118px'
      },
      {
        id: '12',
        width: isMobile ? 'auto' : '266px',
        height: '108px'
      },
      {
        id: '12',
        width: isMobile ? 'auto' : '266px',
        height: '178px'
      },
      {
        id: '12',
        width: isMobile ? 'auto' : '266px',
        height: '400px'
      },
      {
        id: '12',
        width: isMobile ? 'auto' : '266px',
        height: '138px'
      },
      {
        id: '12',
        width: isMobile ? 'auto' : '266px',
        height: '400px'
      },
      {
        id: '12',
        width: isMobile ? 'auto' : '266px',
        height: '138px'
      },
      {
        id: '12',
        width: isMobile ? 'auto' : '266px',
        height: '138px'
      },
      {
        id: '12',
        width: isMobile ? 'auto' : '266px',
        height: '138px'
      },
      {
        id: '12',
        width: isMobile ? 'auto' : '266px',
        height: '138px'
      },
      {
        id: '12',
        width: isMobile ? 'auto' : '266px',
        height: '138px'
      },
      {
        id: '12',
        width: isMobile ? 'auto' : '266px',
        height: '400px'
      },
      {
        id: '12',
        width: isMobile ? 'auto' : '266px',
        height: '138px'
      },
      {
        id: '12',
        width: isMobile ? 'auto' : '266px',
        height: '400px'
      },
      {
        id: '12',
        width: isMobile ? 'auto' : '266px',
        height: '138px'
      },
      {
        id: '12',
        width: isMobile ? 'auto' : '266px',
        height: '138px'
      },
      {
        id: '12',
        width: isMobile ? 'auto' : '266px',
        height: '138px'
      },
      {
        id: '12',
        width: isMobile ? 'auto' : '266px',
        height: '138px'
      },
      {
        id: '12',
        width: isMobile ? 'auto' : '266px',
        height: '400px'
      },
      {
        id: '12',
        width: isMobile ? 'auto' : '266px',
        height: '138px'
      },
      {
        id: '12',
        width: isMobile ? 'auto' : '266px',
        height: '400px'
      },
      {
        id: '12',
        width: isMobile ? 'auto' : '266px',
        height: '138px'
      },
      {
        id: '12',
        width: isMobile ? 'auto' : '266px',
        height: '138px'
      },
      {
        id: '12',
        width: isMobile ? 'auto' : '266px',
        height: '138px'
      },
      {
        id: '12',
        width: isMobile ? 'auto' : '266px',
        height: '138px'
      }
    ];

    return (
      <Fragment>
        <Layout>
          <div className={s.main_container}>
            <Libheader cardTitle={title} {...this.props} />
            <div className={s.card_wrapper}>
              {isLoading && cardImageLoading.map(obj => <LoadingPlaceholder isLight style={{ width: obj.width, height: obj.height, marginBottom: '15px' }} key={obj.id} />)}

              {!isLoading && cardImageLib && cardImageLib.map(obj => <CardLibrary key={obj.id} imgUrl={obj.thumbnail} id={obj.id} />)}
            </div>
          </div>
        </Layout>
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
  getMovieLibrary: genreId => dispatch(movieLibraryActions.getMovieLibrary(genreId))
});

export default compose(withStyles(s), connect(mapStateToProps, mapDispatchToProps))(MovieLibrary);

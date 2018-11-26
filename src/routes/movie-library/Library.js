import React, { Fragment, Component } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { compose } from 'redux';
import { connect } from 'react-redux';
import * as movieLibraryActions from '@actions/movie-library';
import searchActions from '@actions/search';
import CardLibrary from './movielibrary/Card';
import Layout from '../../components/Molalayout';
import Error from '../search/error/Error';

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
    genreId: '',
    isLoading: true
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    const {
      getMovieLibrary,
      getMovieLibraryList,
      getSearchGenre,
      search,
      movieLibrary,
      genreId //passed as props from index.js
    } = nextProps;

    if (typeof genreId !== 'undefined' && genreId !== '') {
      if (genreId !== prevState.genreId) {
        getMovieLibrary(genreId);
      }
    }

    if (movieLibrary.meta.status === 'loading' && prevState.movieLibrary.length <= 0) {
      if (typeof genreId !== 'undefined' && genreId !== '') {
        getMovieLibrary(genreId);
      } else {
        getMovieLibraryList();
      }
    }

    if (search.genre.meta.status === 'loading' && prevState.search.genre.length <= 0) {
      getSearchGenre();
    }

    return { ...prevState, movieLibrary, search, genreId: nextProps.genreId };
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

  renderLoading = () => {
    const { isMobile } = this.props;
    const isLoading = this.props.movieLibrary.meta.status === 'loading';

    const cardImageLoading = [
      { id: '12', width: isMobile ? 'auto' : '26.6rem', height: '13.8rem' },
      { id: '12', width: isMobile ? 'auto' : '26.6rem', height: '20rem' },
      { id: '12', width: isMobile ? 'auto' : '26.6rem', height: '10.8rem' },
      { id: '12', width: isMobile ? 'auto' : '26.6rem', height: '30rem' },
      { id: '12', width: isMobile ? 'auto' : '26.6rem', height: '12rem' },
      { id: '12', width: isMobile ? 'auto' : '26.6rem', height: '11.8rem' },
      { id: '12', width: isMobile ? 'auto' : '26.6rem', height: '10.8rem' },
      { id: '12', width: isMobile ? 'auto' : '26.6rem', height: '17.8rem' },
      { id: '12', width: isMobile ? 'auto' : '26.6rem', height: '40rem' },
      { id: '12', width: isMobile ? 'auto' : '26.6rem', height: '13.8rem' },
      { id: '12', width: isMobile ? 'auto' : '26.6rem', height: '40rem' },
      { id: '12', width: isMobile ? 'auto' : '26.6rem', height: '13.8rem' },
      { id: '12', width: isMobile ? 'auto' : '26.6rem', height: '13.8rem' },
      { id: '12', width: isMobile ? 'auto' : '26.6rem', height: '13.8rem' },
      { id: '12', width: isMobile ? 'auto' : '26.6rem', height: '13.8rem' },
      { id: '12', width: isMobile ? 'auto' : '26.6rem', height: '13.8rem' },
      { id: '12', width: isMobile ? 'auto' : '26.6rem', height: '40rem' },
      { id: '12', width: isMobile ? 'auto' : '26.6rem', height: '13.8rem' },
      { id: '12', width: isMobile ? 'auto' : '26.6rem', height: '40rem' },
      { id: '12', width: isMobile ? 'auto' : '26.6rem', height: '13.8rem' },
      { id: '12', width: isMobile ? 'auto' : '26.6rem', height: '13.8rem' },
      { id: '12', width: isMobile ? 'auto' : '26.6rem', height: '13.8rem' },
      { id: '12', width: isMobile ? 'auto' : '26.6rem', height: '13.8rem' },
      { id: '12', width: isMobile ? 'auto' : '26.6rem', height: '40rem' },
      { id: '12', width: isMobile ? 'auto' : '26.6rem', height: '13.8rem' },
      { id: '12', width: isMobile ? 'auto' : '26.6rem', height: '40rem' },
      { id: '12', width: isMobile ? 'auto' : '26.6rem', height: '13.8rem' },
      { id: '12', width: isMobile ? 'auto' : '26.6rem', height: '13.8rem' },
      { id: '12', width: isMobile ? 'auto' : '26.6rem', height: '13.8rem' },
      { id: '12', width: isMobile ? 'auto' : '26.6rem', height: '13.8rem' }
    ];

    return isLoading && cardImageLoading.map(obj => <LoadingPlaceholder isLight style={{ width: obj.width, height: obj.height, marginBottom: '15px' }} key={obj.id} />);
  };

  renderContent = () => {
    const { movieLibrary: { data: libraryDt } } = this.props;
    const { isLoading } = this.state;
    const cardImageLib = libraryDt.length > 0 ? libraryDt : null;

    return !isLoading && cardImageLib && cardImageLib.map(obj => <CardLibrary key={obj.id} title={obj.title} imgUrl={obj.thumbnail} id={obj.id} />);
  };

  renderNotFound = isLoading => {
    return isLoading === 'error' ? <Error errorTitle="Video not found" errorText={`Video with genre ${this.props.genreId} does not exists`} /> : null;
  };

  render() {
    const { movieLibrary: { data: libraryDt } } = this.props;
    const status = this.props.movieLibrary.meta.status;
    const title = libraryDt.length > 0 ? libraryDt[0].genreTitle.toUpperCase() : '';

    return (
      <Fragment>
        <Layout>
          <div className={s.main_container} id="main-container">
            <Libheader cardTitle={title} {...this.props} />
            <div className={s.card_wrapper}>
              {this.renderLoading()}

              {this.renderContent()}
            </div>
          </div>

          {this.renderNotFound(status)}
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
  getMovieLibraryList: () => dispatch(movieLibraryActions.getMovieLibraryList()),
  getMovieLibrary: genreId => dispatch(movieLibraryActions.getMovieLibrary(genreId))
});

export default compose(withStyles(s), connect(mapStateToProps, mapDispatchToProps))(MovieLibrary);

import React, { Fragment, Component } from 'react'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import { compose } from 'redux'
import { connect } from 'react-redux'
import * as movieLibraryActions from '@actions/movie-library'
import searchActions from '@actions/search'
import CardLibrary from './movielibrary/Card'
import Layout from '@components/Molalayout'
import Error from '../search/error/Error'

// import Header from '../../components/Header';
// import Navbar from '../../components/Navigation';

import Libheader from './movielibrary/Libheader'
import s from './Library.css'
import cardStyles from './movielibrary/Card.css'
import LoadingPlaceholder from '../../components/common/LoadingPlaceholder/LoadingPlaceholder'

// import defaultImagePortrait from './assets/default-img-mola_library-01.jpg'
// import defaultImageLandscape from './assets/default-img-mola_library-02.jpg'

class MovieLibrary extends Component {
  state = {
    genreId: '',
    active: true,
  }

  componentDidMount() {
    const { getMovieLibrary, getSearchGenre, genreId } = this.props

    getSearchGenre()
    if (genreId) {
      getMovieLibrary(genreId)
    }

    document.ontouchend = event => {
      const halfScreenWidth = window.innerWidth * 0.5

      this.setState({
        active: event.changedTouches[0].screenX > halfScreenWidth /* to left side */,
      })
    }

    /* mousedown/mouseup to handle desktop scrolling event */
    document.onmouseup = event => {
      const halfScreenWidth = window.innerWidth * 0.5

      this.setState({
        active: event.x > halfScreenWidth /* to left side */,
      })
    }
  }

  componentDidUpdate(prevProps) {
    const { getMovieLibrary, genreId, movieLibrary: { meta: { status: libraryStatus } }, search: { genre: { meta: { status: genreStatus }, data: genreData } } } = this.props

    //if no genre ('movie-library/') then pick the first genre and show list of relevant movie
    if (!genreId && prevProps.search.genre.meta.status != genreStatus && genreStatus === 'success') {
      const firstGenre = genreData && genreData.length > 0 ? genreData[0].id : null
      if (firstGenre) {
        getMovieLibrary(firstGenre)
      }
    } else if (genreId !== prevProps.genreId) {
      //if change genre from genre list
      getMovieLibrary(genreId)
    }

    //if has genre but error / wrong genre ('movie-library/xxx')
    //then check if genre exist in genre list
    //if exist in genre list but error means error api
    //but if not exist in genre list then pick the active genre and show list of relevant movie
    if (genreId && prevProps.movieLibrary.meta.status != libraryStatus && libraryStatus === 'error' && genreStatus === 'success') {
      const genreExists = genreData.filter(dt => {
        return dt.id === genreId
      })
      if (genreExists.length === 0) {
        const firstGenre = genreData && genreData.length > 0 ? genreData[0].id : null
        if (firstGenre) {
          getMovieLibrary(firstGenre)
        }
      }
    }
  }

  renderLoading = () => {
    const { isMobile } = this.props

    const cardImageLoading = [
      { id: '12', width: isMobile ? 'auto' : '17rem', height: '27rem' },
      { id: '12', width: isMobile ? 'auto' : '17rem', height: '27rem' },
      { id: '12', width: isMobile ? 'auto' : '17rem', height: '27rem' },
      { id: '12', width: isMobile ? 'auto' : '17rem', height: '27rem' },
      { id: '12', width: isMobile ? 'auto' : '17rem', height: '27rem' },
      { id: '12', width: isMobile ? 'auto' : '17rem', height: '27rem' },
      { id: '12', width: isMobile ? 'auto' : '17rem', height: '27rem' },
      { id: '12', width: isMobile ? 'auto' : '17rem', height: '27rem' },
      { id: '12', width: isMobile ? 'auto' : '17rem', height: '27rem' },
      { id: '12', width: isMobile ? 'auto' : '17rem', height: '27rem' },
      { id: '12', width: isMobile ? 'auto' : '17rem', height: '27rem' },
      { id: '12', width: isMobile ? 'auto' : '17rem', height: '27rem' },
      { id: '12', width: isMobile ? 'auto' : '17rem', height: '27rem' },
      { id: '12', width: isMobile ? 'auto' : '17rem', height: '27rem' },
      { id: '12', width: isMobile ? 'auto' : '17rem', height: '27rem' },
      { id: '12', width: isMobile ? 'auto' : '17rem', height: '27rem' },
      { id: '12', width: isMobile ? 'auto' : '17rem', height: '27rem' },
      { id: '12', width: isMobile ? 'auto' : '17rem', height: '27rem' },
      { id: '12', width: isMobile ? 'auto' : '17rem', height: '27rem' },
      { id: '12', width: isMobile ? 'auto' : '17rem', height: '27rem' },
      { id: '12', width: isMobile ? 'auto' : '17rem', height: '27rem' },
      { id: '12', width: isMobile ? 'auto' : '17rem', height: '27rem' },
      { id: '12', width: isMobile ? 'auto' : '17rem', height: '27rem' },
      { id: '12', width: isMobile ? 'auto' : '17rem', height: '27rem' },
      { id: '12', width: isMobile ? 'auto' : '17rem', height: '27rem' },
      { id: '12', width: isMobile ? 'auto' : '17rem', height: '27rem' },
      { id: '12', width: isMobile ? 'auto' : '17rem', height: '27rem' },
      { id: '12', width: isMobile ? 'auto' : '17rem', height: '27rem' },
      { id: '12', width: isMobile ? 'auto' : '17rem', height: '27rem' },
      { id: '12', width: isMobile ? 'auto' : '17rem', height: '27rem' },
    ]

    return cardImageLoading.map(obj => <LoadingPlaceholder isLight style={{ width: obj.width, height: obj.height, margin: '12px' }} key={obj.id} />)
  }

  renderContent = () => {
    // const { movieLibrary: { data: libraryDt } } = this.props
    const { movieLibrary: { data: libraryDt } } = this.props
    const cardImageLib = libraryDt && libraryDt.length > 0 ? libraryDt : null

    return (
      cardImageLib &&
      cardImageLib.map((videos, index) => {
        return <CardLibrary {...videos} key={videos.id} index={index} active={this.state.active} />
      })
    )
  }

  renderNotFound = isLoading => {
    const wrapperStyle = {
      height: '80vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'flex-start',
      marginTop: '10%',
    }

    return isLoading === 'error' ? (
      <Error
        errorTitle="Video not found"
        errorText={`Video with genre '${this.props.genreId}' does not exists`}
        wrapperStyle={wrapperStyle}
        imageClass={s.errorImage}
        titleStyle={{ color: '#FFF' }}
        detailStyle={{ color: '#FFF' }}
      />
    ) : null
  }

  render() {
    const { movieLibrary: { meta: { status }, data: libraryDt } } = this.props
    const title = libraryDt.length > 0 ? libraryDt[0].genreTitle.toUpperCase() : ''

    return (
      <Fragment>
        <Layout>
          <div className={s.main_container}>
            <Libheader cardTitle={title} {...this.props} />
            <div className={s.card_container}>
              <div className={`${s.card_wrapper} ${status === 'loading' ? s.card_wrapper_loading : ''} `}>
                {status == 'loading' && this.renderLoading()}
                {status == 'success' && this.renderContent()}
              </div>
            </div>
          </div>
          {this.renderNotFound(status)}
        </Layout>
      </Fragment>
    )
  }
}

function mapStateToProps(state) {
  return {
    ...state,
  }
}

const mapDispatchToProps = dispatch => ({
  getSearchGenre: () => dispatch(searchActions.getSearchGenre()),
  getMovieLibraryList: () => dispatch(movieLibraryActions.getMovieLibraryList()),
  getMovieLibrary: genreId => dispatch(movieLibraryActions.getMovieLibrary(genreId)),
})

export default compose(withStyles(s, cardStyles), connect(mapStateToProps, mapDispatchToProps))(MovieLibrary)

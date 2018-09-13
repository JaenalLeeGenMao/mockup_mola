import React from 'react'
import PropTypes from 'prop-types'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import LazyLoad from '@components/common/Lazyload';

import { getAllHistory } from '../../../actions/history' // test
import s from './MovieSuggestion.css'

class MovieSuggestion extends React.Component {
  state = {
    allImgLoaded: false,
  }
  static propTypes = {
    data: PropTypes.arrayOf(PropTypes.object),
    searchText: PropTypes.string,
    isMobile: PropTypes.bool,
  };

  render() {
    const { data, searchText } = this.props

    return (
      <div className={s.resultRowWrap}>
        <div className={s.resultTitle}>Movie Suggestion</div>
        <div className={s.resultContent__movie}>
          {
            data.map( (movie) => {
              const movieTitle = `${movie.title} (${movie.year})`
              const startIdx = movieTitle.toLowerCase().indexOf(searchText.toLowerCase())

              const movieTitleRes = movieTitle.substr(startIdx, searchText.length)
              const movieTitleFirst = movieTitle.substr(0, startIdx)
              const movieTitleSecond = movieTitle.substr(startIdx+searchText.length, movieTitle.length)

              return (
                <div className={s.movieBox} key={movie.id}>
                  <div className={s.movieBoxInner}>
                    <LazyLoad image={movie.coverUrl} className={s.movieImg} width='100%' lazyloadOff>
                      { startIdx > -1 ?
                        (
                          <div className={s.movieTitle}>
                            <span>{movieTitleFirst}</span><span className={s.movieTitleResult}>{movieTitleRes}</span><span>{movieTitleSecond}</span>
                          </div>
                        )
                        :
                        (<div className={s.movieTitle}><span>{movieTitle}</span></div>)
                      }
                    </LazyLoad>
                  </div>
                </div>
              )
            })
          }
        </div>
      </div>
    )
  }
}

// function mapStateToProps(state) {
//   return {
//     movies: state.history.movies,
//   }
// }

const mapDispatchToProps = (dispatch) => ({
  getAllHistory: () => dispatch(getAllHistory()),
})

export default withStyles(s)(MovieSuggestion)

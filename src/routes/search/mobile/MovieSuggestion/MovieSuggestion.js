import React from 'react'
import PropTypes from 'prop-types'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import LazyLoad from '@components/common/Lazyload';
import Link from '@components/Link/Link';
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
    const { data } = this.props

    return (
      <div className={s.resultRowWrap}>
        <div className={s.resultTitle}>Movie Suggestion</div>
        <div className={s.resultContent__movieflex}>
          {
            data.map( (movie) => {
              return (
                <Link to={`/movie-detail/${movie.id}`} key={movie.id}>
                  <LazyLoad src={movie.coverUrl} containerClassName={s.movieflex__moviebox}/>
                </Link>
              )
            })
          }
        </div>
      </div>
    )
  }
}

export default withStyles(s)(MovieSuggestion)

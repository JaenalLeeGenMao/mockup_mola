import React from 'react'
import PropTypes from 'prop-types'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import LazyLoad from '@components/common/Lazyload'
import Link from '@components/Link'
import MolaHandler from '@api/mola'
import { getMatchWordSearch } from '@routes/search/utils'
import s from './MovieSuggestion.css'
// import { noImg } from '@global/imageUrl';
import { placeholderBlankPortrait } from '@global/imageUrl'

class MovieSuggestion extends React.Component {
  state = {
    allImgLoaded: false,
    show: false,
  }
  static propTypes = {
    data: PropTypes.arrayOf(PropTypes.object),
    searchText: PropTypes.string,
    sessionId: PropTypes.string,
  }

  handleClickMovie = title => {
    const { sessionId, sid } = this.props
    MolaHandler.postRecentSearch(sessionId, sid, title)
  }
  handleTitleShow = (show = false) => {
    this.setState({ show: show === 'success' ? true : false })
  }

  render() {
    const { data, searchText, src } = this.props
    const { show } = this.state
    const movieData = data.slice(0, 5)
    return (
      <div className={s.resultRowWrap}>
        <div className={s.resultTitle}>Movies</div>
        <div className={s.resultContent}>
          <div className={s.movie__wrapper}>
            <div className={s.movie__wrapper__scroller}>
              {movieData.map(movie => {
                const movieYear = movie.year ? ` (${movie.year})` : ''
                const movieTitle = `${movie.title}${movieYear}`
                const movieTitleRes = getMatchWordSearch(movieTitle, searchText)
                const movieUrl = movie.coverUrl ? movie.coverUrl : placeholderBlankPortrait
                return (
                  <div className={s.movieBox} key={movie.id}>
                    <Link onClick={() => this.handleClickMovie(movie.title)} to={`/watch?v=${movie.id}`}>
                      <LazyLoad
                        containerClassName={s.movieImg}
                        onEmptyShowDefault
                        onErrorShowDefault
                        errorImgClassName={s.movieErrorImg}
                      >
                        <img src={movieUrl} className={s.imgDefault} />
                        {movieTitleRes && movieTitleRes[3] ? (
                          <div className={s.movieTitle}>
                            <div>
                              <span>{movieTitleRes[0]}</span>
                              <span className={s.movieTitleResult}>{movieTitleRes[1]}</span>
                              <span>{movieTitleRes[2]}</span>
                            </div>
                          </div>
                        ) : (
                          <div className={s.movieTitle}>
                            <span>{movieTitle}</span>
                          </div>
                        )}
                      </LazyLoad>
                    </Link>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default withStyles(s)(MovieSuggestion)

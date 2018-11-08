import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import LazyLoad from '@components/common/Lazyload';
import Link from '@components/Link/Link';
import MolaHandler from '@api/mola';
import { getMatchWordSearch } from '@routes/search/utils';
import s from './MovieSuggestion.css';
import noImg from '@global/style/icons/no_img.png';

class MovieSuggestion extends React.Component {
  state = {
    allImgLoaded: false
  };
  static propTypes = {
    data: PropTypes.arrayOf(PropTypes.object),
    searchText: PropTypes.string,
    sessionId: PropTypes.string
  };

  handleClickMovie = title => {
    const { sessionId, sid } = this.props;
    MolaHandler.postRecentSearch(sessionId, sid, title);
  };

  render() {
    const { data, searchText } = this.props;
    const movieData = data.slice(0, 5);
    return (
      <div className={s.resultRowWrap}>
        <div className={s.resultTitle}>Movie</div>
        <div className={s.resultContent}>
          {movieData.map(movie => {
            const movieYear = movie.year ? ` (${movie.year})` : '';
            const movieTitle = `${movie.title}${movieYear}`;
            const movieTitleRes = getMatchWordSearch(movieTitle, searchText);
            const movieUrl = movie.coverUrl ? movie.coverUrl : noImg;
            return (
              <div className={s.movieBox} key={movie.id}>
                <div className={s.movieBoxInner}>
                  <Link onClick={() => this.handleClickMovie(movie.title)} to={`/movie-detail/${movie.id}`}>
                    <LazyLoad src={movieUrl} containerClassName={s.movieImg} onErrorShowDefault errorImgClassName={s.movieErrorImg}>
                      {movieTitleRes[3] ? (
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
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default withStyles(s)(MovieSuggestion);

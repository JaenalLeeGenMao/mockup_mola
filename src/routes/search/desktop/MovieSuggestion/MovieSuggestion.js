import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import LazyLoad from '@components/common/Lazyload';
import Link from '@components/Link/Link';
import { post } from 'axios';
import { RECENT_SEARCH_ENDPOINT } from '../../../../api/mola/endpoints';
import s from './MovieSuggestion.css';

class MovieSuggestion extends React.Component {
  state = {
    allImgLoaded: false
  };
  static propTypes = {
    data: PropTypes.arrayOf(PropTypes.object),
    searchText: PropTypes.string
  };

  handleClickMovie = title => {
    const config = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    };
    post(`${RECENT_SEARCH_ENDPOINT}?sessionId=abc&q=${title}`, {
      config
    })
      .then(result => {
        // Do somthing
        console.log('AXIOS RES', result);
      })
      .catch(err => {
        // Do somthing
        console.log('AXIOS ERR', err);
      });
  };

  render() {
    const { data, searchText } = this.props;
    return (
      <div className={s.resultRowWrap}>
        <div className={s.resultTitle}>Movie Suggestion</div>
        <div className={s.resultContent__movie}>
          {data.map(movie => {
            const movieYear = movie.year ? ` (${movie.year})` : '';
            const movieTitle = `${movie.title}${movieYear}`;
            const startIdx = movieTitle.toLowerCase().indexOf(searchText.toLowerCase());

            const movieTitleRes = movieTitle.substr(startIdx, searchText.length);
            const movieTitleFirst = movieTitle.substr(0, startIdx);
            const movieTitleSecond = movieTitle.substr(
              startIdx + searchText.length,
              movieTitle.length
            );

            return (
              <div className={s.movieBox} key={movie.id}>
                <div className={s.movieBoxInner}>
                  <Link
                    onClick={() => this.handleClickMovie(movie.title)}
                    to={`/movie-detail/${movie.id}`}
                  >
                    <LazyLoad
                      src={movie.coverUrl}
                      containerClassName={s.movieImg}
                      onErrorShowDefault
                    >
                      {startIdx > -1 ? (
                        <div className={s.movieTitle}>
                          <div>
                            <span>{movieTitleFirst}</span>
                            <span className={s.movieTitleResult}>{movieTitleRes}</span>
                            <span>{movieTitleSecond}</span>
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

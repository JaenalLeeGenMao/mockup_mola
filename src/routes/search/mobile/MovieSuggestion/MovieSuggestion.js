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
    searchText: PropTypes.string,
    isMobile: PropTypes.bool
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
      .then(result => {})
      .catch(err => {});
  };

  render() {
    const { data } = this.props;

    return (
      <div className={s.resultRowWrap}>
        <div className={s.resultTitle}>Movie Suggestion</div>
        <div className={s.resultContent__movieflex}>
          {data.map(movie => {
            return (
              <Link
                onClick={() => this.handleClickMovie(movie.title)}
                to={`/movie-detail/${movie.id}`}
                key={movie.id}
              >
                <LazyLoad src={movie.coverUrl} containerClassName={s.movieflex__moviebox} />
              </Link>
            );
          })}
        </div>
      </div>
    );
  }
}

export default withStyles(s)(MovieSuggestion);

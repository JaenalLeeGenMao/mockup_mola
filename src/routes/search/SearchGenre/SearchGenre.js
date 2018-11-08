import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Link from '@components/Link';
import LazyLoad from '@components/common/Lazyload';
import s from './SearchGenre.css';

class SearchGenre extends React.Component {
  static propTypes = {
    data: PropTypes.arrayOf(PropTypes.object)
  };

  render() {
    const { data } = this.props;
    return (
      <div className={s.genreContainer}>
        {data.map((data, index) => {
          if (index % 2 === 0) {
            return (
              <Link className={s.genreLink} key={index} to={`/movie-library/${data.id}`}>
                <LazyLoad src={data.iconUrl} />
              </Link>
            );
          } else {
            return (
              <Fragment>
                <div className={s.genreSplit} key={index} />
                <Link className={s.genreLink} to={`/movie-library/${data.id}`}>
                  <LazyLoad src={data.iconUrl} />
                </Link>
              </Fragment>
            );
          }
        })}
      </div>
    );
  }
}

export default withStyles(s)(SearchGenre);

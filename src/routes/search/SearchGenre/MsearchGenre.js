import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Link from '@components/Link';
import LazyLoad from '@components/common/LazyLoad'
import s from './SearchGenre.css';

class MsearchGenre extends React.Component {
  static propTypes = {
    data: PropTypes.arrayOf(PropTypes.object),
    isMobile: PropTypes.bool,
  };

  render() {
    const { data } = this.props;
    return (
      <LazyLoad containerClassName={s.genreContainer__mobile}>
        {
          data.map( (data, index) => (
            <Link className={s.genreLink__mobile} key={index} to={`/movie-library/${data.id}`}>
              <span className={s.genreText__mobile}>{data.title}</span>
            </Link>
          ))
        }
      </LazyLoad>
    );
  }
}

export default withStyles(s)(MsearchGenre);

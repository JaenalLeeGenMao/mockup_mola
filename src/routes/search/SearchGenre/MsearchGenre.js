import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Link from '@components/Link';
import s from './SearchGenre.css';

class MsearchGenre extends React.Component {
  static propTypes = {
    data: PropTypes.arrayOf(PropTypes.object),
    isMobile: PropTypes.bool,
  };

  render() {
    const { data } = this.props;
    return (
      <div className={s.genreContainer__mobile}>
        {
          data.map( (data, index) => (
            <Link className={s.genreLink__mobile} key={index} to="/movie-library">
              <span className={s.genreText__mobile}>{data.title}</span>
            </Link>
          ))
        }
      </div>
    );
  }
}

export default withStyles(s)(MsearchGenre);

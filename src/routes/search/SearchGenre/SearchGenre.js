import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Link from '@components/Link';
import s from './SearchGenre.css';

class SearchGenre extends React.Component {
  static propTypes = {
    data: PropTypes.arrayOf(PropTypes.object),
  };

  render() {
    const { data } = this.props;
    return (
      <div className={s.genreContainer}>
        {
          data.map( (data, index) => {
            if( index % 2 === 0 ) {
              return (
                <Link className={s.genreLink} key={index} to="/movie-library/">
                  <span className={s.genreAction} />
                </Link>
              )
            } else {
              return (
                <Fragment>
                  <div className={s.genreSplit} key={index}></div>
                  <Link className={s.genreLink} to="/">
                    <span className={s.genreAdventure} />
                  </Link>
                </Fragment>
              )
            }
          })
        }

      </div>
    );
  }
}

export default withStyles(s)(SearchGenre);

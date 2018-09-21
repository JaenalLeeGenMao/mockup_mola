import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Link from '@components/Link';
import LazyLoadBeta from '@components/common/LazyloadBeta'
import s from './SearchGenre.css';

class SearchGenre extends React.Component {
  static propTypes = {
    data: PropTypes.arrayOf(PropTypes.object),
  };

  render() {
    const { data } = this.props;
    return (
      <LazyLoadBeta containerClassName={s.genreContainer}>
        {
          data.map( (data, index) => {
            const genreImgStyle = { backgroundImage: `url(${data.iconUrl})`, }
            if( index % 2 === 0 ) {
              return (
                <Link className={s.genreLink} key={index} to={`/movie-library/${data.id}`}>
                  <span style={genreImgStyle} />
                </Link>
              )
            } else {
              return (
                <Fragment>
                  <div className={s.genreSplit} key={index}></div>
                  <Link className={s.genreLink} to={`/movie-library/${data.id}`}>
                    <span style={genreImgStyle} />
                  </Link>
                </Fragment>
              )
            }
          })
        }
      </LazyLoadBeta>
    );
  }
}

export default withStyles(s)(SearchGenre);

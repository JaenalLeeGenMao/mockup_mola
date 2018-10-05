import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Link from '@components/Link';
import LazyLoad from '@components/common/Lazyload';
import errorImg from '../assets/error.png';
import s from './Error.css';

class SearchError extends React.Component {
  static propTypes = {
    data: PropTypes.arrayOf(PropTypes.object)
  };

  render() {
    return (
      <div className={s.searchErrorContainer}>
        <LazyLoad src={errorImg}>
          <div className={s.searchErrorTitle}>Oops!</div>
          <div className={s.searchErrorDetail}>
            Sorry, there is problem with our page. Please try again later.
          </div>
        </LazyLoad>
      </div>
    );
  }
}

export default withStyles(s)(SearchError);

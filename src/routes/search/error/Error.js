import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import LazyLoad from '@components/common/Lazyload';
import errorImg from '../assets/error.png';
import s from './Error.css';

const SearchError = ({ errorTitle, errorText }) => {
  console.log('ERRORimg', errorImg);
  return (
    <div className={s.searchErrorContainer}>
      <LazyLoad src={errorImg}>
        <div className={s.searchErrorTitle}>{errorTitle ? errorTitle : 'Oops!'}</div>
        <div className={s.searchErrorDetail}>
          {errorText ? errorText : 'Sorry, there is problem with our page. Please try again later.'}
        </div>
      </LazyLoad>
    </div>
  );
};

export default withStyles(s)(SearchError);

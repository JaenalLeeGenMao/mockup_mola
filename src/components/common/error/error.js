import React from 'react';

import withStyles from 'isomorphic-style-loader/lib/withStyles';

import Link from '@components/Link';
import LazyLoad from '@components/common/Lazyload';

import molaLogo from '@global/style/icons/error/mola_text.png';

import notFound from '@global/style/icons/error/night_mode_404.png';
import internalServerError from '@global/style/icons/error/internal_server_error_502.png';
import commonError from '@global/style/icons/error/common_error.png';

import styles from './error.css';

const Error = ({
  className = '',
  title = '',
  message = '',
  isDark = 0, /** isDark is color of the text */
  status = 1 /** none, 400, 502 */
}) => {
  let imageUri;
  switch (status) {
  case 400:
    title = 'Page not found';
    imageUri = notFound;
    break;
  case 502:
    title = 'Bad gateway';
    imageUri = internalServerError;
    break;
  default:
    title = 'Oops, sorry :(';
    imageUri = commonError;
    break;
  }
  return (
    <LazyLoad>
      <Link to="/" className={`${styles.error_container} ${className}`}>
        <img alt="mola" src={molaLogo} className={styles.error__mola_title} />
        <div className={styles.error__wrapper} style={{ color: isDark ? "black" : "white" }}>
          <img alt={message} src={imageUri} className={styles.error__mola_background} />
          <h2 className={styles.error__title}>{title}</h2>
          <p className={styles.error__description}>{message}</p>
        </div>
      </Link>
    </LazyLoad>
  );
}

export default withStyles(styles)(Error);
import React from 'react';

import withStyles from 'isomorphic-style-loader/lib/withStyles';

import Link from '@components/Link';
import Layout from '@components/Molalayout';
import LazyLoad from '@components/common/Lazyload';

import molaLogo from '@global/style/icons/error/mola_text.png';

import notFound from '@global/style/icons/error/night_mode_404.png';
import internalServerError from '@global/style/icons/error/internal_server_error_502.png';
import commonError from '@global/style/icons/error/common_error.png';

import styles from './error.css';

// const customStyle = {
//   height: '20vh',
//   position: 'fixed',
//   bottom: '0',
//   width: '100vw',
//   whiteSpace: 'nowrap',
//   overflow: 'auto'
// };

// const childCustomeStyle = {
//   display: 'inline-block',
//   width: '15vw',
//   height: '100%',
//   background: '#fff'
// };

// const relatedVideos = (style = {}, className = '') => {
//   return (
//     <div className={className} style={Object.assign(style, customStyle)}>
//       {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(data => {
//         return (
//           <div key={data} style={childCustomeStyle}>
//             cuk
//           </div>
//         );
//       })}
//     </div>
//   );
// };

const Error = ({
  className = '',
  title = '',
  message = '',
  isDark = 0 /** isDark is color of the text */,
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
    <Layout>
      <LazyLoad>
        <div className={`${styles.error_container} ${className}`}>
          <Link to="/" className={styles.error__wrapper}>
            <img
              alt="mola"
              src={molaLogo}
              className={styles.error__mola_title}
            />
            <div style={{ color: isDark ? 'black' : 'white' }}>
              <img
                alt={message}
                src={imageUri}
                className={styles.error__mola_background}
              />
              <h2 className={styles.error__title}>{title}</h2>
              <p className={styles.error__description}>{message}</p>
            </div>
          </Link>
        </div>
      </LazyLoad>
      {/* <LazyLoad>{relatedVideos()}</LazyLoad> */}
    </Layout>
  );
};

export default withStyles(styles)(Error);

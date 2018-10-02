import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import LazyLoad from '@components/common/Lazyload';
import Link from '@components/Link';

import styles from './poster.css';

const Poster = ({
  id,
  title,
  shortDescription,
  isDark,
  poster,
  backgroundColor,
  coverTitle /** title image */,
  type,
  isSafari
}) => (
  <div className={styles.poster__parallax} key={id} id={id} isdark={isDark}>
    <div className={styles.poster__parallax_layer_3}>
      <LazyLoad src={coverTitle} containerClassName={styles.poster__parallax_layer_3_info} alt="">
        <div
          className={styles.poster__parallax_layer_3_detail}
          style={{ color: isDark ? 'black' : 'white' }}
        >
          <h4 className={styles.poster__parallax_layer_3_title}>
            {type !== 'playlists' ? title : 'OVERVIEW'}
          </h4>
          <p className={styles.poster__parallax_layer_3_desc}>
            {shortDescription}
            {type !== 'playlists' && (
              <Link to={`/movie-detail/${id}`} className={styles.poster__see_more}>
                <span className={styles.poster__see_more_arrow}>→</span>
                see movie
              </Link>
            )}
          </p>
        </div>
      </LazyLoad>
    </div>
    <div disabled={isSafari}>
      <LazyLoad
        src={poster}
        containerClassName={styles.poster__parallax_layer_1}
        style={{ color: backgroundColor }}
      />
    </div>
  </div>
);

export default withStyles(styles)(Poster);

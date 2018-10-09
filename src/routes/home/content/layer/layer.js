import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { Parallax } from 'react-scroll-parallax';

import LazyLoad from '@components/common/Lazyload';
import Link from '@components/Link';

import RightBlack from '@global/style/icons/right_arrow_black.png';
import LineBlack from '@global/style/icons/right_line_black.png';

import RightWhite from '@global/style/icons/right_arrow_white.png';
import LineWhite from '@global/style/icons/right_line_white.png';

import styles from './layer.css';

const Layer = ({
  id,
  title,
  description,
  shortDescription,
  isDark,
  backgroundColor,
  background /** background */,
  coverBody /** subject */,
  coverTitle /** title image */,
  type,
  isSafari,
  ticking = false
}) => {
  return (
    <LazyLoad>
      <div className={styles.layer__grid_container} style={{ backgroundColor }}>
        <div className={styles.layer__grid_header}>
          <LazyLoad alt="" src={background} />
        </div>
        <div className={styles.layer__grid_title}>
          <LazyLoad alt="" src={coverTitle} containerClassName={styles.layer__grid_images} />
          <div className={styles.layer__parallax_layer_3}>
            <div
              className={styles.layer__parallax_layer_3_detail}
              style={{ color: isDark ? 'black' : 'white' }}
            >
              <h4 className={styles.layer__parallax_layer_3_title}>OVERVIEW</h4>
              <p className={styles.layer__parallax_layer_3_desc}>
                {shortDescription}
                {type !== 'playlists' && (
                  <Link to={`/movie-detail/${id}`} className={styles.layer__see_more}>
                    <img
                      className={styles.layer__see_more_line}
                      src={isDark ? LineBlack : LineWhite}
                    />
                    <img
                      className={styles.layer__see_more_arrow}
                      src={isDark ? RightBlack : RightWhite}
                    />
                    see movie
                  </Link>
                )}
              </p>
            </div>
          </div>
        </div>
        <div className={styles.layer__grid_figure}>
          <LazyLoad alt="" src={coverBody} />
        </div>
      </div>
    </LazyLoad>
  );
};

export default withStyles(styles)(Layer);

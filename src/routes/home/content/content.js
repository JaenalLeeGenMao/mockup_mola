import React, { Component } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import LazyLoad from '@components/common/Lazyload';
import Link from '@components/Link';

import ContentLayer from './layer';

import styles from './content.css';

class Content extends Component {
  componentDidMount() {}

  render() {
    const {
        id,
        title,
        description,
        shortDescription /** maximum 170 characters, average 25-30 wording */,
        isDark,
        backgroundColor = '#fff',
        background /** background */,
        coverTitle /** title image */,
        type,
        isSafari,
        ticking = false,
        isMobile = false
      } = this.props,
      fontColor = isDark ? '#000' : '#fff',
      fontBackgroundColor = isDark ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.3)',
      version = isMobile ? 'mobile' : 'desktop',
      coverBackgroundImage = isMobile
        ? background[version].portrait
        : background[version].landscape,
      coverTitleImage = isMobile ? coverTitle[version].portrait : coverTitle[version].landscape;

    return (
      <div
        className="grid-slick"
        isDark={isDark}
        style={{ boxShadow: `inset 100px 100px 100px 20000px ${fontBackgroundColor}` }}
      >
        <LazyLoad
          alt=""
          src={coverBackgroundImage}
          containerClassName={styles.content__grid_background_images}
          className={styles.content__grid_background_images}
          lazy={false}
        />
        <div className={styles.content__grid_container} style={{ color: fontColor }}>
          <div className={styles.content__grid_nav} />
          <div className={styles.content__grid_title}>
            <LazyLoad
              alt=""
              src={coverTitleImage}
              containerClassName={styles.content__grid_images}
              lazy={false}
            />
          </div>
          <div className={styles.content__grid_desc}>
            <ContentLayer {...this.props} />
            {type !== 'playlists' && (
              <div className={styles.content__grid_see_more_wrapper}>
                {isMobile ? (
                  <Link
                    to={`/movie-detail/${id}`}
                    className={`${styles.content__grid_see_more_mobile} ${
                      isDark ? styles.black : styles.white
                    }`}
                  >
                    see movie
                  </Link>
                ) : (
                  <Link
                    to={`/movie-detail/${id}`}
                    className={`${styles.content__grid_see_more_desktop} ${
                      isDark ? styles.black : styles.white
                    }`}
                  >
                    see movie
                  </Link>
                )}
              </div>
            )}
          </div>
          <div className={styles.content__grid_empty} />
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(Content);

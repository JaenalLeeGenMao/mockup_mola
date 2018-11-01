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
        // coverTitle /** title image */,
        type,
        isSafari,
        ticking = false,
        isMobile = false,
        getCurrentScreenHeight = window.innerHeight
      } = this.props,
      fontColor = '#fff',
      fontBackgroundColor = !isDark ? '#000' : '#fff',
      version = isMobile ? 'mobile' : 'desktop',
      coverBackgroundImage = isMobile ? background[version].portrait : background[version].landscape;
    // coverTitleImage = isMobile ? coverTitle[version].portrait : coverTitle[version].landscape;
    const moreStyles = {
      bottom: 0,
      transform: isMobile ? `translateY(${getCurrentScreenHeight()}px)` : null,
      transition: 'all ease-in-out 300ms'
    };

    return (
      <div className="grid-slick" isDark={isDark} style={{ boxShadow: `inset 100px 100px 100px 20000px ${fontBackgroundColor}` }}>
        <LazyLoad alt="" src={coverBackgroundImage} containerClassName={styles.content__grid_background_images} className={styles.content__grid_background_images} lazy={false} />
        <div className={styles.content__grid_container} style={{ color: fontColor }}>
          <div className={styles.content__grid_nav} />
          <div className={styles.content__grid_title} />
          <div className={styles.content__grid_desc}>
            <ContentLayer {...this.props} />
            {type !== 'playlists' && (
              <LazyLoad>
                <div className={styles.content__grid_see_more_wrapper} style={isMobile ? moreStyles : null}>
                  {isMobile ? (
                    <Link to={`/movie-detail/${id}`} className={`${styles.content__grid_see_more_mobile} ${styles.black}`}>
                      <span className={`${styles.icon__view_movie} ${isDark ? styles.black : styles.white}`} />
                      see movie
                    </Link>
                  ) : (
                    <Link to={`/movie-detail/${id}`} className={`${styles.content__grid_see_more_desktop} ${styles.black}`}>
                      see movie
                    </Link>
                  )}
                </div>
              </LazyLoad>
            )}
          </div>
          <div className={styles.content__grid_empty} />
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(Content);

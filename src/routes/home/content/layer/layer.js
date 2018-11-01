import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import LazyLoad from '@components/common/Lazyload';

import { filterString } from './util';

import styles from './layer.css';

const ContentLayer = ({ isDark, background, shortDescription = '', isMobile, getCurrentScreenHeight = () => {} }) => {
  const version = isMobile ? 'mobile' : 'desktop',
    fontColor = '#fff',
    fontBackgroundColor = isDark ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.3)',
    coverBackgroundImage = isMobile ? background[version].portrait : background[version].landscape,
    filteredDesc = filterString(shortDescription).substring(0, isMobile ? 100 : 180);

  const descWrpperStyle = {
    marginTop: '0',
    transform: `translateY(calc(${getCurrentScreenHeight()}px - 65vh))`
  };

  return (
    <LazyLoad containerClassName={styles.layer__grid_desc_wrapper} containerStyle={isMobile ? descWrpperStyle : null}>
      {!isMobile && (
        <div
          className={`${styles.layer__grid_desc_background} ${styles[isMobile ? 'mobile' : 'desktop']}`}
          style={{
            background: `url(${coverBackgroundImage}) repeat center`,
            boxShadow: `inset 0 0 0 20000px ${fontBackgroundColor}`,
            backgroundSize: 'cover'
          }}
        />
      )}
      <div className={styles.layer__grid_desc_content} style={{ textAlign: isMobile ? 'center' : 'left' }}>
        <div className={styles.layer__grid_desc_header}>
          {!isMobile && <h1>STORYLINE</h1>}
          <p>{filteredDesc}</p>
        </div>
        <div className={styles.layer__grid_desc_breakpoint} style={{ borderBottom: `1px solid ${fontColor}` }} />
        <div className={styles.layer__grid_desc_footer}>
          <i className={styles.layer__grid_desc_footer_quote}>{`"${filteredDesc}"`}</i>
          <strong>— Entertainment Weekly</strong>
        </div>
      </div>
    </LazyLoad>
  );
};

export default withStyles(styles)(ContentLayer);

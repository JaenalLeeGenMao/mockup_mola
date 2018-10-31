import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import LazyLoad from '@components/common/Lazyload';

import { filterString } from './util';

import styles from './layer.css';

const ContentLayer = ({ isDark, background, shortDescription = '', isMobile }) => {
  const version = isMobile ? 'mobile' : 'desktop',
    fontColor = isDark ? '#000' : '#fff',
    fontBackgroundColor = isDark ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.3)',
    coverBackgroundImage = isMobile ? background[version].portrait : background[version].landscape,
    filteredDesc = filterString(shortDescription);
  return (
    <LazyLoad containerClassName={styles.layer__grid_desc_wrapper} style={{ textAlign: isMobile ? 'center' : 'left' }}>
      <div
        className={styles.layer__grid_desc_background}
        style={{
          background: `url(${coverBackgroundImage}) repeat center`,
          boxShadow: `inset 0 0 0 20000px ${fontBackgroundColor}`,
          backgroundSize: 'cover',
          width: isMobile ? '100vw' : '80vw',
          height: isMobile ? '85vh' : '100vh',
          top: isMobile ? '-89%' : '-178%',
          left: isMobile ? '-4%' : '-15.5%'
        }}
      />
      <div className={styles.layer__grid_desc_content}>
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

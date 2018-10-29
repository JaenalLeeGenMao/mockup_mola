import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { filterString } from './util';

import styles from './layer.css';

const ContentLayer = ({ isDark, background, shortDescription = '', isMobile }) => {
  const version = isMobile ? 'mobile' : 'desktop',
    fontColor = isDark ? '#000' : '#fff',
    fontBackgroundColor = isDark ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.3)',
    coverBackgroundImage = isMobile ? background[version].portrait : background[version].landscape,
    filteredDesc = filterString(shortDescription);
  return (
    <div className={styles.layer__grid_desc_wrapper} style={{ textAlign: isMobile ? 'center' : 'left' }}>
      <div
        className={styles.layer__grid_desc_background}
        style={{
          background: `url(${coverBackgroundImage}) repeat center`,
          boxShadow: `inset 0 0 0 20000px ${fontBackgroundColor}`,
          backgroundSize: 'cover',
          width: isMobile ? '100vw' : '70vw',
          height: '100vh',
          top: isMobile ? '-115%' : '-178%',
          left: isMobile ? '-4%' : '-1.5%'
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
    </div>
  );
};

export default withStyles(styles)(ContentLayer);

import React, { Fragment } from 'react'
import withStyles from 'isomorphic-style-loader/lib/withStyles'

import LazyLoad from '@components/common/Lazyload'

import { setMultilineEllipsis } from './util'

import styles from './layer.css'

const ContentLayer = ({ isDark, type, background, description, shortDescription = '', quotes, isMobile, getCurrentScreenHeight = () => {} }) => {
  const version = isMobile ? 'mobile' : 'desktop',
    fontColor = isMobile ? '#fff' : isDark ? '#000' : '#fff',
    fontBackgroundColor = isDark ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.3)',
    coverBackgroundImage = isMobile ? background[version].portrait : background[version].landscape,
    filteredDesc = type === 'playlists' ? description : shortDescription

  const descWrapperStyle = {
    transform: `translateY(calc(${getCurrentScreenHeight()}px - 85vh))`,
  }

  setMultilineEllipsis(styles.layer__grid_desc_header)
  setMultilineEllipsis(styles.layer__grid_desc_footer)

  return (
    <LazyLoad containerClassName={`${styles.layer__grid_desc_wrapper} ${styles[type === 'playlists' ? 'playlist' : '']}`} containerStyle={isMobile ? descWrapperStyle : null}>
      <div
        className={`${styles.layer__grid_desc_background} ${styles[isMobile ? 'mobile' : 'desktop']} ${styles[type === 'playlists' ? 'playlist' : '']}`}
        style={{
          background: !isMobile ? `url(${coverBackgroundImage}) repeat center` : 'transparent',
          boxShadow: `inset 0 0 0 20000px ${!isMobile ? fontBackgroundColor : '#fff'}`,
          backgroundSize: 'cover',
          opacity: !isMobile ? 1 : 0.1,
        }}
      />
      <div className={styles.layer__grid_desc_content} style={{ textAlign: isMobile ? 'center' : 'left' }}>
        <div className={styles.layer__grid_desc_header}>
          {!isMobile && <h1>OVERVIEW</h1>}
          <p className="filtered_description">{filteredDesc}</p>
        </div>
        {type !== 'playlists' && (
          <Fragment>
            <div className={styles.layer__grid_desc_breakpoint} style={{ borderBottom: `1px solid ${fontColor}` }} />
            <div className={styles.layer__grid_desc_footer}>
              <i className={styles.layer__grid_desc_footer_quote}>{`"${quotes.attributes.text}"`}</i>
            </div>
            <strong className={styles.layer__grid_desc_author}>— {quotes.attributes.author}</strong>
          </Fragment>
        )}
      </div>
    </LazyLoad>
  )
}

export default withStyles(styles)(ContentLayer)

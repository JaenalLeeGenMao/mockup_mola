import React, { Fragment } from 'react'
import withStyles from 'isomorphic-style-loader/lib/withStyles'

import LazyLoad from '@components/common/Lazyload'

import { setMultilineEllipsis } from './util'

import styles from './layer_mobile.css'

const ContentLayer = ({ isDark, type, background, description, shortDescription = '', quotes, isMobile, getCurrentScreenHeight = () => {}, showDescription }) => {
  const version = isMobile ? 'mobile' : 'desktop',
    fontColor = isMobile ? '#fff' : isDark ? '#000' : '#fff',
    fontBackgroundColor = isDark ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.3)',
    coverBackgroundImage = isMobile ? background[version].portrait : background[version].landscape,
    { text: quote, author } = quotes.attributes

  const descWrapperStyle = {
    transform: `translateY(calc(${getCurrentScreenHeight()}px - 95vh))`,
  }

  setMultilineEllipsis(styles.layer__grid_desc_header)
  setMultilineEllipsis(styles.layer__grid_desc_footer)

  return (
    <LazyLoad containerClassName={`${styles.layer__grid_desc_wrapper} ${styles[type === 'playlists' ? 'playlist' : '']}`} containerStyle={isMobile ? descWrapperStyle : null}>
      {!isMobile ? (
        <>
          <div
            className={`${styles.layer__grid_desc_background} ${styles[isMobile ? 'mobile' : 'desktop']} ${styles[type === 'playlists' ? 'playlist' : '']}`}
            style={
              {
                // background: `url(${coverBackgroundImage}) repeat center`,
                // boxShadow: `inset 0 0 0 20000px ${!isMobile ? fontBackgroundColor : '#fff'}`,
                // backgroundSize: 'cover',
                // opacity: 0.1,
              }
            }
          />
          <div className={styles.layer__grid_desc_content} style={{ textAlign: isMobile ? 'center' : 'left' }}>
            <div className={styles.layer__grid_desc_header}>
              <i className="filtered_description">{`“${quote}”`}</i>
            </div>
            <i className={styles.layer__grid_desc_author}>{author}</i>
            <p className={styles.layer__grid_desc_breakpoint}>—</p>
            {type !== 'playlists' && (
              <Fragment>
                <div className={`${styles.layer__grid_desc_footer} ${styles[!isDark ? 'background_white' : 'background_black']}`}>
                  <p className="filtered_description">{description}</p>
                </div>
              </Fragment>
            )}
          </div>
        </>
      ) : (
        <>
          <div className={[styles.layer_grid_desc_header_wrap, showDescription === false ? styles.show : ''].join(' ')}>
            <div className={styles.layer__grid_desc_header}>
              <i className="filtered_description">{`“${quote}”`}</i>
            </div>
            <div style={{ textAlign: 'center' }}>
              <i className={styles.layer__grid_desc_author}>— {author}</i>
            </div>
          </div>

          <div className={[styles.layer__grid_desc_footer, showDescription === true ? styles.show : ''].join(' ')}>
            <p className={styles.layer__grid_desc_footer_desc}>{description}</p>
          </div>
        </>
      )}
    </LazyLoad>
  )
}

export default withStyles(styles)(ContentLayer)

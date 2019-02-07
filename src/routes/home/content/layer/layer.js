import React, { Fragment } from 'react'
import withStyles from 'isomorphic-style-loader/lib/withStyles'

import LazyLoad from '@components/common/Lazyload'

import { setMultilineEllipsis } from './util'

import styles from './layer.css'

const ContentLayer = ({ title, isDark, type, background, description, shortDescription = '', quotes, isMobile, getCurrentScreenHeight = () => {} }) => {
  const version = isMobile ? 'mobile' : 'desktop',
    fontColor = isMobile ? '#fff' : isDark ? '#000' : '#fff',
    fontBackgroundColor = isDark ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.3)',
    coverBackgroundImage = isMobile ? background[version].portrait : background[version].landscape,
    { text: quote, author } = quotes.attributes

  const descWrapperStyle = {
    transform: `translateY(calc(${getCurrentScreenHeight()}px - 95vh))`,
  }

  const formatTitle = title => {
    return title.length > 30 ? title.substring(0, 30) + '...' : title
  }

  const formatQuote = quote => {
    return quote.length > 150 ? quote.substring(0, 150) + '...' : title
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
          <h2 className={styles.layer__grid_title}>{formatTitle(title)}</h2>

          <div className={styles.layer__grid_desc_content} style={{ textAlign: isMobile ? 'center' : 'left' }}>
            {type !== 'playlists' && (
              <Fragment>
                <div className={`${styles.layer__grid_desc_footer}`}>
                  <p className="filtered_description">{description}</p>
                </div>
              </Fragment>
            )}

            <div className={styles.layer__grid_desc_header}>
              <i className="filtered_description">{`“${formatQuote(quote)}”`}</i>
              <i className={styles.layer__grid_desc_author}>
                <br />- {author}
              </i>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className={styles.layer__grid_desc_header}>
            <i className="filtered_description">{`“${quote}”`}</i>
          </div>
          <div style={{ textAlign: 'center' }}>
            <i className={styles.layer__grid_desc_author}>— {author}</i>
          </div>
          <div className={styles.layer__grid_desc_footer}>
            <p className={styles.layer__grid_desc_footer_desc}>{description}</p>
          </div>
        </>
      )}
    </LazyLoad>
  )
}

export default withStyles(styles)(ContentLayer)

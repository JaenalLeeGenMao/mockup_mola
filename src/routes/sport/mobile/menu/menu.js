import React from 'react'
import withStyles from 'isomorphic-style-loader/lib/withStyles'

import LazyLoad from '@components/common/Lazyload'

import horizontalStyles from './menu-horizontal.css'
import verticalStyles from './menu-vertical.css'

const SportMenu = ({ className = '', playlists, activeIndex = 0, isGray = false, isDark = 0, type = 'vertical' }) => {
  const styles = type === 'vertical' ? verticalStyles : horizontalStyles
  return (
    <LazyLoad containerClassName={[styles.menu, className].join(' ')}>
      {playlists.map(({ id }, index) => (
        <div
          key={id}
          className={`${styles.menu__dots} ${isGray ? styles.gray : ''} ${isDark ? styles.black : styles.white} ${index === activeIndex ? styles.menu__active : ''}`}
        />
      ))}
      {/* {type == 'horizontal' && <div className={`${styles.menu__dots} ${isDark ? styles.black : styles.white} ${activeIndex + 1 === playlists.length ? styles.menu__bot_active : ''}`} />} */}
    </LazyLoad>
  )
}

export default withStyles(verticalStyles, horizontalStyles)(SportMenu)

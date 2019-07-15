import React from 'react'
import withStyles from 'isomorphic-style-loader/lib/withStyles'

import LazyLoad from '@components/common/Lazyload'

import horizontalStyles from './menu-horizontal.css'
import verticalStyles from './menu-vertical.css'

const HomeMenu = ({ className = '', playlists, activeIndex = 0, isDark = 0, type = 'vertical', isGray = 0 }) => {
  const styles = type === 'vertical' ? verticalStyles : horizontalStyles
  return (
    <LazyLoad containerClassName={[styles.menu, className].join(' ')}>
      {playlists.map(({ id }, index) => (
        <div
          key={id}
          className={`${styles.menu__dots} ${isDark ? styles.black : styles.white} ${isGray && styles.gray} ${index === activeIndex ? styles.menu__active : ''}`}
        />
      ))}
      {/* {type == 'horizontal' && <div className={`${styles.menu__dots} ${isDark ? styles.black : styles.white} ${activeIndex + 1 === playlists.length ? styles.menu__bot_active : ''}`} />} */}
    </LazyLoad>
  )
}

export default withStyles(verticalStyles, horizontalStyles)(HomeMenu)

import React from 'react'
import withStyles from 'isomorphic-style-loader/lib/withStyles'

import LazyLoad from '@components/common/Lazyload'

import horizontalStyles from './menu-horizontal.css'
import verticalStyles from './menu-vertical.css'

const SportMenu = ({ playlists, activeIndex = 0, isDark = 0, type = 'vertical', onClick }) => {
  const styles = type === 'vertical' ? verticalStyles : horizontalStyles
  return (
    <LazyLoad containerClassName={[styles.menu, 'tourCategory'].join(' ')}>
      {playlists.map(({ id }, index) => (
        <>
          <div
            key={id}
            className={`${styles.menu__dots} ${isDark ? styles.black : styles.white} ${index === activeIndex ? styles.menu__active : ''}`}
            onClick={e => {
              onClick(index)
            }}
          >
          </div>
        </>
      ))}
    </LazyLoad>
  )
}

export default withStyles(verticalStyles, horizontalStyles)(SportMenu)

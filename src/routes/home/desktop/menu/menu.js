import React from 'react'
import withStyles from 'isomorphic-style-loader/lib/withStyles'

import LazyLoad from '@components/common/Lazyload'

import horizontalStyles from './menu-horizontal.css'
import verticalStyles from './menu-vertical.css'

const HomeMenu = ({ playlists, activeIndex = 0, isDark = 0, type = 'vertical', onClick }) => {
  const styles = type === 'vertical' ? verticalStyles : horizontalStyles
  return (
    <LazyLoad containerClassName={[styles.menu, 'tourCategory'].join(' ')}>
      {playlists.map(({ id }, index) => (
        <>
          <div
            key={id}
            className={`${styles.menu__dots} ${isDark ? styles.black : styles.white} ${index === activeIndex ? styles.menu__top_active : ''} ${
              index === activeIndex + 1 ? styles.menu__bot_active : ''
            }`}
            onClick={e => {
              if (type === 'horizontal') {
                const node = e.target
                if (index === activeIndex) {
                  console.log('kondisi 1')
                  onClick(index)
                } else if (index > activeIndex) {
                  console.log('kondisi 1')
                  onClick(index - 1)
                } else {
                  const siblingClass = node.getAttribute('class')
                  if (`${siblingClass.trim()}` === `${styles.menu__text}`) {
                    onClick(Math.max(0, index - 1))
                  } else {
                    onClick(Math.max(0, index))
                  }
                }
              } else {
                onClick(index)
              }
            }}
          >
            {/* <span className={`${styles.menu__text} ${index === activeIndex ? styles.active : ''}`}>{title}</span> */}
          </div>
        </>
      ))}
      {type === 'horizontal' && (
        <div
          className={`${styles.menu__dots} ${isDark ? styles.black : styles.white} ${activeIndex + 1 === playlists.length ? styles.menu__bot_active : ''}`}
          onClick={() => onClick(playlists.length - 1)}
        >
          <span className={`${styles.menu__text}`} />
        </div>
      )}
    </LazyLoad>
  )
}

export default withStyles(verticalStyles, horizontalStyles)(HomeMenu)

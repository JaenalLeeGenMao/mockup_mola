import React from 'react'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import stylesMobile from './tourArrow-mobile.css'
import stylesDesktop from './tourArrow-desktop.css'

const TourArrow = ({ isDark, isMobile = false }) => {
  const styles = isMobile ? stylesMobile : stylesDesktop

  return (
    <div className={`${styles.placeholderTourSlideWrapper} tourSlideWrapper`}>
      <div className={`${styles.placeholderTourSlide} tourSlide`}>
        <button
          className={`
                ${styles.sport__arrow}
                ${styles.sport__arrow_prev}
                ${styles[isDark ? 'dark' : 'white']}
            `}
        >
          prev
        </button>
        <button
          className={`
                ${styles.sport__arrow}
                ${styles.sport__arrow_next}
                ${styles[isDark ? 'dark' : 'white']}
            `}
        >
          prev
        </button>
      </div>
    </div>
  )
}

export default withStyles(stylesDesktop, stylesMobile)(TourArrow)

import React, { Component } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import stylesDesktop from './arrow-desktop.css';
import stylesMobile from './arrow-mobile.css';

class Arrow extends Component {
  render() {
    const {
        onClick,
        direction,
        isDark = 1,
        currentSlide,
        slideCount,
        isMobile = false,
        ...remainingProps
      } = this.props,
      styles = isMobile ? stylesMobile : stylesDesktop;
    if (direction === 'prev') {
      return (
        <button
          {...remainingProps}
          onClick={onClick}
          disabled={currentSlide === 0}
          className={`
                      ${styles.home__arrow}
                      ${styles.home__arrow_prev}
                      ${styles[isDark ? 'dark' : 'white']}
                  `}
          style={{ color: currentSlide === 0 ? '#555' : '' }}
        >
          {direction}
        </button>
      );
    }
    return (
      <button
        {...remainingProps}
        disabled={currentSlide === slideCount - 1}
        onClick={onClick}
        className={`
                    ${styles.home__arrow}
                    ${styles.home__arrow_next}
                    ${styles[isDark ? 'dark' : 'white']}
                `}
        style={{ color: currentSlide === slideCount - 1 ? '#555' : '' }}
      >
        {direction}
      </button>
    );
  }
}

export default withStyles(stylesDesktop, stylesMobile)(Arrow);

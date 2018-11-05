import React, { Component } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import stylesDesktop from './arrow-desktop.css';
import stylesMobile from './arrow-mobile.css';

class Arrow extends Component {
  handleClick = () => {
    const { sliderRefs, id, direction } = this.props;
    try {
      const currentSlider = sliderRefs.filter(slider => slider.id === id)[0];
      if (direction === 'next') {
        currentSlider.slickNext();
      } else {
        currentSlider.slickPrev();
      }
    } catch {}
  };

  render() {
    const { direction, isDark = 1, currentSlide, slideCount, isMobile = false, ...remainingProps } = this.props,
      styles = isMobile ? stylesMobile : stylesDesktop;
    if (direction === 'prev') {
      return (
        <button
          {...remainingProps}
          onClick={this.handleClick}
          disabled={currentSlide === 0}
          className={`
                      ${styles.home__arrow}
                      ${styles.home__arrow_prev}
                      ${styles[isMobile ? 'white' : isDark ? 'dark' : 'white']}
                  `}
          style={{ opacity: currentSlide === 0 ? '.4' : '1' }}
        >
          {direction}
        </button>
      );
    }
    return (
      <button
        {...remainingProps}
        disabled={currentSlide === slideCount - 1}
        onClick={this.handleClick}
        className={`
                    ${styles.home__arrow}
                    ${styles.home__arrow_next}
                    ${styles[isMobile ? 'white' : isDark ? 'dark' : 'white']}
                `}
        style={{ opacity: currentSlide === slideCount - 1 ? '.4' : '1' }}
      >
        {direction}
      </button>
    );
  }
}

export default withStyles(stylesDesktop, stylesMobile)(Arrow);

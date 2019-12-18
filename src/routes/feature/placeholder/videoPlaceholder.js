import React, { Component } from 'react'
// import withStyles from 'isomorphic-style-loader/lib/withStyles'
import Carousel from '@components/carousel'
import LazyLoad from '@components/common/Lazyload'

import { placeholderBlankLandscape, placeholderBlankPortrait } from '@global/imageUrl'

import { banners } from '../const'
import { fixedContainer, carouselMargin, DummyPlaceholder } from './styleVideoPlaceholder'

class Placeholder extends Component {
  constructor(props) {
    super(props)
    this.state = {
      viewportWidth: 0,
    }
  }

  componentDidMount() {
    if (window) {
      this.updateWindowDimensions()
      window.addEventListener('resize', this.updateWindowDimensions)
    }
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions)
  }

  updateWindowDimensions = () => {
    this.setState({ viewportWidth: window.innerWidth })
  }

  render() {
    const { isMobile } = this.props,
      { viewportWidth } = this.state

    return (
      <div className={fixedContainer}>
        <Carousel
          className={carouselMargin}
          wrap={false}
          autoplay={false}
          sliderCoin={true}
          dragging={true}
          withoutControls={true}
          cellSpacing={isMobile ? 8 : viewportWidth * 0.0125}
          slideToScroll={isMobile ? 1.3 : 4}
          slidesToShow={isMobile ? 1.3 : 4.5}
          transitionMode={'scroll'}
          framePadding={!isMobile ? '0rem' : '0rem 0rem 0rem 1rem'}
        >
          {[1, 2, 3, 4, 5, 6, 7, 8].map((_, playlistIndex) => (
            <DummyPlaceholder key={playlistIndex} num={playlistIndex}>
              <img className="bannerImage" src={placeholderBlankLandscape} />
            </DummyPlaceholder>
          ))}
        </Carousel>
        <Carousel
          className={carouselMargin}
          wrap={false}
          autoplay={false}
          sliderCoin={true}
          dragging={true}
          withoutControls={true}
          cellSpacing={isMobile ? 8 : viewportWidth * 0.0125}
          slideToScroll={isMobile ? 1.6 : 6}
          slidesToShow={isMobile ? 1.6 : 6.5}
          transitionMode={'scroll'}
          framePadding={!isMobile ? '0rem' : '0rem 0rem 0rem 1rem'}
        >
          {[1, 2, 3, 4, 5, 6, 7, 8].map((_, categoryIndex) => (
            <DummyPlaceholder key={categoryIndex} num={categoryIndex}>
              <img className="bannerImage" src={placeholderBlankLandscape} />
            </DummyPlaceholder>
          ))}
        </Carousel>
        <Carousel
          className={carouselMargin}
          wrap={false}
          autoplay={false}
          sliderCoin={true}
          dragging={true}
          withoutControls={true}
          cellSpacing={isMobile ? 8 : viewportWidth * 0.0125}
          slideToScroll={isMobile ? 2.8 : 7.5}
          slidesToShow={isMobile ? 2.8 : 7.5}
          transitionMode={'scroll'}
          framePadding={!isMobile ? '0rem' : '0rem 0rem 0rem 1rem'}
        >
          {[1, 2, 3, 4, 5, 6, 7, 8].map((_, movieIndex) => (
            <DummyPlaceholder key={movieIndex} num={movieIndex}>
              <img className="bannerImage" src={placeholderBlankLandscape} />
            </DummyPlaceholder>
          ))}
        </Carousel>
      </div>
    )
  }
}

export default Placeholder

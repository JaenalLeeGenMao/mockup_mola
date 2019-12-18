import React, { Component } from 'react'
// import withStyles from 'isomorphic-style-loader/lib/withStyles'
import Carousel from '@components/carousel'
import LazyLoad from '@components/common/Lazyload'

import { placeholderBlankLandscape, placeholderBlankPortrait } from '@global/imageUrl'

import { banners } from '../const'
import { container, fixedContainer, carouselMargin, DummyPlaceholder, DummyWithoutAnimationPlaceholder } from './style'

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

  /* Dynamically re-adjust carousel */
  // updateOnImageLoad = () => {
  // const { carouselRefs } = this.state

  // if (carouselRefs.length > 0) {
  //   carouselRefs.map(ref => {
  //     if (ref && ref.onResize) {
  //       ref.onResize()
  //     }
  //   })
  // }
  // }

  render() {
    const { isMobile } = this.props,
      { viewportWidth } = this.state

    return (
      <div className={container}>
        <div style={{ height: '8vh' }} />
        <Carousel
          wrap={banners.length === 1 ? false : true}
          autoplay={false}
          sliderCoin={true}
          dragging={false}
          withoutControls={true}
          cellSpacing={isMobile ? 20 : viewportWidth * 0.0425}
          slidesToShow={isMobile ? 1.25 : 2.25}
          transitionMode={'scroll3d'}
          // framePadding={!isMobile ? '0rem' : '0rem 0rem 0rem 1rem'}
        >
          {banners.map((_, bannerIndex) => (
            <LazyLoad key={bannerIndex}>
              <DummyWithoutAnimationPlaceholder num={bannerIndex}>
                <img
                  className="bannerImage3d"
                  src={placeholderBlankLandscape}
                  // onLoad={this.updateOnImageLoad}
                />
              </DummyWithoutAnimationPlaceholder>
            </LazyLoad>
          ))}
        </Carousel>
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
                <img
                  className="bannerImage"
                  src={placeholderBlankLandscape}
                  // onLoad={this.updateOnImageLoad}
                />
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
                <img
                  className="bannerImage"
                  src={placeholderBlankLandscape}
                  // onLoad={this.updateOnImageLoad}
                />
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
                <img
                  className="bannerImage"
                  src={placeholderBlankLandscape}
                  // onLoad={this.updateOnImageLoad}
                />
              </DummyPlaceholder>
            ))}
          </Carousel>
        </div>
      </div>
    )
  }
}

// export default withStyles(styles)(Placeholder)
export default Placeholder

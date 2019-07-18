import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'

import Carousel from 'nuka-carousel'

import LazyLoad from '@components/common/Lazyload'

import { carouselContainer, arrowButtons, hiddenButtons, destroyButtons, chevronLeft, chevronRight } from './carouselStyle'

class BannerCarousel extends Component {
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
      setTimeout(() => {
        this.updateWindowDimensions()
      }, 500)
    }
  }

  updateWindowDimensions = () => {
    this.setState({ viewportWidth: window.innerWidth })
  }

  static propTypes = {
    children: PropTypes.string,
    title: PropTypes.string,
    sliderCoin: PropTypes.bool,
    dragging: PropTypes.bool,
    wrap: PropTypes.bool,
    slidesToShow: PropTypes.number,
  }

  render() {
    const isMobile = Boolean(this.state.viewportWidth <= 800)
    return (
      <Carousel
        autoplayInterval={5000}
        initialSlideHeight={this.props.initialSlideHeight}
        initialSlideWidth={this.props.initialSlideWidth}
        slideOffset={this.props.slideOffset}
        framePadding={this.props.framePadding}
        heightMode={this.props.heightMode}
        autoplay={this.props.autoplay}
        className={`${carouselContainer} ${this.props.className}`}
        slideWidth={this.props.slideWidth}
        wrapAround={this.props.wrap}
        cellAlign={this.props.cellAlign}
        slidesToScroll={3}
        slidesToShow={this.props.slidesToShow}
        dragging={this.props.dragging}
        cellSpacing={this.props.cellSpacing || !isMobile ? 5 : 12}
        transitionMode={this.props.transitionMode}
        disableEdgeSwiping={true}
        opacityScale={this.props.opacityScale || 0.65}
        zoomScale={this.props.zoomScale || 0.85}
        renderBottomCenterControls={() => {
          return false
        }}
        renderCenterLeftControls={({ previousSlide, currentSlide }) => {
          return (
            <LazyLoad>
              <button onClick={previousSlide} className={this.props.transitionMode === 'scroll3d' ? hiddenButtons : currentSlide === 0 ? destroyButtons : arrowButtons}>
                {this.props.transitionMode !== 'scroll3d' && <span className={chevronLeft} />}
              </button>
            </LazyLoad>
          )
        }}
        renderCenterRightControls={({ nextSlide, slideCount, currentSlide }) => {
          const newVal = slideCount - (this.props.slidesToShow || 1)
          return (
            <LazyLoad>
              <button onClick={nextSlide} className={this.props.transitionMode === 'scroll3d' ? hiddenButtons : currentSlide === newVal ? destroyButtons : arrowButtons}>
                {this.props.transitionMode !== 'scroll3d' && <span className={chevronRight} />}
              </button>
            </LazyLoad>
          )
        }}
      >
        {this.props.children}
      </Carousel>
    )
  }
}

export default BannerCarousel

import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'

import Carousel from 'nuka-carousel'

import LazyLoad from '@components/common/Lazyload'

import { carouselContainer, arrowButtons, hiddenButtons, destroyButtons, chevronLeft, chevronRight } from './style'

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
        autoplay={this.props.autoplay}
        className={`${carouselContainer} ${this.props.className}`}
        wrapAround={this.props.wrap}
        slidesToShow={this.props.slidesToShow}
        dragging={this.props.dragging}
        cellSpacing={this.props.cellSpacing || !isMobile ? 20 : 12}
        transitionMode={this.props.transitionMode}
        disableEdgeSwiping={true}
        opacityScale={this.props.opacityScale || 0.65}
        zoomScale={this.props.zoomScale || 0.85}
        renderBottomCenterControls={() => {
          return false
        }}
        renderCenterLeftControls={({ previousSlide, currentSlide }) => {
          return (
            <button onClick={previousSlide} className={this.props.transitionMode === 'scroll3d' ? hiddenButtons : currentSlide === 0 ? destroyButtons : arrowButtons}>
              {this.props.transitionMode !== 'scroll3d' && <LazyLoad containerClassName={chevronLeft} />}
            </button>
          )
        }}
        renderCenterRightControls={({ nextSlide, slideCount, currentSlide }) => {
          const newVal = slideCount - (this.props.slidesToShow || 1)
          return (
            <button onClick={nextSlide} className={this.props.transitionMode === 'scroll3d' ? hiddenButtons : currentSlide === newVal ? destroyButtons : arrowButtons}>
              {this.props.transitionMode !== 'scroll3d' && <LazyLoad containerClassName={chevronRight} />}
            </button>
          )
        }}
      >
        {this.props.children}
      </Carousel>
    )
  }
}

export default BannerCarousel

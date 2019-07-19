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
        ref={c => {
          if (c !== null) {
            this.props.refs.push(c)
          }
        }}
        autoplayInterval={5000}
        heightMode={this.props.heightMode}
        initialSlideHeight={this.props.initialSlideHeight}
        autoplay={this.props.autoplay}
        className={`${carouselContainer} ${this.props.className}`}
        wrapAround={this.props.wrap}
        frameOverflow={this.props.frameOverflow}
        framePadding={this.props.framePadding}
        slidesToShow={this.props.slidesToShow}
        dragging={this.props.dragging}
        cellSpacing={this.props.cellSpacing || !isMobile ? 20 : 12}
        transitionMode={this.props.transitionMode}
        disableEdgeSwiping={true}
        opacityScale={this.props.opacityScale || 0.65}
        zoomScale={this.props.zoomScale || 0.85}
        slidesToScroll={this.props.slidesToScroll}
        renderBottomCenterControls={() => {
          return false
        }}
        renderCenterLeftControls={({ previousSlide, currentSlide }) => {
          return (
            <LazyLoad>
              <button onClick={previousSlide} className={this.props.transitionMode === 'scroll3d' ? hiddenButtons : currentSlide === 0 ? destroyButtons : `${arrowButtons} default`}>
                {this.props.transitionMode !== 'scroll3d' && <span className={chevronLeft} />}
              </button>
            </LazyLoad>
          )
        }}
        renderCenterRightControls={({ nextSlide, slideCount, currentSlide }) => {
          const newVal = slideCount - (this.props.slidesToShow || 1)
          return (
            <LazyLoad>
              <button onClick={nextSlide} className={this.props.transitionMode === 'scroll3d' ? hiddenButtons : currentSlide === newVal ? destroyButtons : `${arrowButtons} default`}>
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

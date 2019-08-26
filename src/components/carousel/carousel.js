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
      show: false,
    }
  }

  componentDidMount() {
    if (window && this.rootCarouselRef) {
      this.updateWindowDimensions()
      window.addEventListener('resize', this.updateWindowDimensions)
      setTimeout(() => {
        this.updateWindowDimensions()
      }, 500)
    }
  }

  updateWindowDimensions = () => {
    this.setState({ viewportWidth: window.innerWidth, show: true })
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
    const isMobile = Boolean(this.state.viewportWidth <= 680)

    return (
      <Carousel
        ref={c => {
          if (c !== null && c.onResize) {
            this.rootCarouselRef = c /** used to tracked if carousel exist or has been loaded */
            c.onResize()
          }
        }}
        style={{
          opacity: this.state.show ? 1 : 0,
        }}
        autoGenerateStyleTag={
          false
        } /** IMPORTANT NOTE: set to false to prevent custom styling injected by NukaCarousel library */
        autoplayInterval={5000}
        autoplay={this.props.autoplay}
        cellSpacing={isMobile ? 5 : this.props.cellSpacing || 12}
        className={`${carouselContainer} ${this.props.className}`}
        disableEdgeSwiping={true}
        dragging={this.props.dragging}
        frameOverflow={this.props.frameOverflow}
        framePadding={this.props.framePadding}
        heightMode={this.props.heightMode}
        initialSlideHeight={this.props.initialSlideHeight}
        initialSlideWidth={this.props.initialSlideWidth}
        opacityScale={this.props.opacityScale || 0.65}
        slideOffset={this.props.slideOffset}
        slideWidth={this.props.slideWidth}
        slidesToScroll={this.props.slidesToScroll}
        slidesToShow={this.props.slidesToShow}
        transitionMode={this.props.transitionMode}
        width={this.props.width}
        withoutControls={this.props.withoutControls}
        wrapAround={this.props.wrap}
        zoomScale={isMobile ? 0.95 : this.props.zoomScale || 0.85}
        renderBottomCenterControls={() => {
          return false
        }}
        renderCenterLeftControls={({ previousSlide, currentSlide }) => {
          return (
            <LazyLoad>
              <button
                onClick={previousSlide}
                className={
                  this.props.transitionMode === 'scroll3d'
                    ? hiddenButtons
                    : currentSlide === 0 ? destroyButtons : `${arrowButtons} default`
                }
              >
                {this.props.transitionMode !== 'scroll3d' && <span className={chevronLeft} />}
              </button>
            </LazyLoad>
          )
        }}
        renderCenterRightControls={({ nextSlide, slideCount, currentSlide }) => {
          const newVal = slideCount - (this.props.slidesToShow || 1)
          if (this.props.hideNextIcon) {
            return false
          } else {
            return (
              <LazyLoad>
                <button
                  onClick={nextSlide}
                  className={
                    this.props.transitionMode === 'scroll3d'
                      ? hiddenButtons
                      : currentSlide === newVal ? destroyButtons : `${arrowButtons} default`
                  }
                >
                  {this.props.transitionMode !== 'scroll3d' && <span className={chevronRight} />}
                </button>
              </LazyLoad>
            )
          }
        }}
      >
        {this.props.children}
      </Carousel>
    )
  }
}

export default BannerCarousel

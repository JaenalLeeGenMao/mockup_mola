import React, { Component } from 'react'
// import withStyles from 'isomorphic-style-loader/lib/withStyles'
import Carousel from '@components/carousel'
import { placeholderCardLandscape, placeholderCardPortrait } from '@global/imageUrl'
import { container, fixedContainer, carouselMargin, DummyPlaceholder, DummyWithoutAnimationPlaceholder, DummyLinePlaceholder } from './style'

// import styles from './placeholder.css'

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
    const { isMobile } = this.props

    return (
      <div className={container}>
        <div className={fixedContainer}>
          <div style={{ margin: isMobile ? '0 1rem' : '0' }}>
            <DummyLinePlaceholder height="1vh" width="5rem" />
            <DummyLinePlaceholder height="1vh" width="15rem" />
            <DummyLinePlaceholder height="1vh" width="11.5rem" />
          </div>
          <Carousel
            className={carouselMargin}
            wrap={false}
            autoplay={false}
            sliderCoin={true}
            dragging={true}
            withoutControls={false}
            slideToScroll={isMobile ? 2.8 : 10.5}
            slidesToShow={isMobile ? 2.8 : 10.5}
            framePadding={!isMobile ? '0rem 2rem' : '0rem 0rem 0rem 1rem'}
            transitionMode={'scroll'}
          >
            {[1, 2, 3, 4, 5, 6, 7, 8].map((_, movieIndex) => (
              <DummyPlaceholder key={movieIndex} num={movieIndex}>
                <img
                  className="bannerImage"
                  src={placeholderCardPortrait}
                  // onLoad={this.updateOnImageLoad}
                />
              </DummyPlaceholder>
            ))}
          </Carousel>
          <div style={{ margin: isMobile ? '0 1rem' : '0' }}>
            <DummyLinePlaceholder height="1vh" width="5vw" />
          </div>
          <Carousel
            className={carouselMargin}
            wrap={false}
            autoplay={false}
            sliderCoin={true}
            dragging={true}
            withoutControls={false}
            slideToScroll={isMobile ? 2.8 : 10.5}
            slidesToShow={isMobile ? 2.8 : 10.5}
            framePadding={!isMobile ? '0rem 2rem' : '0rem 0rem 0rem 1rem'}
            transitionMode={'scroll'}
          >
            {[1, 2, 3, 4, 5, 6, 7, 8].map((_, movieIndex) => (
              <DummyPlaceholder key={movieIndex} num={movieIndex}>
                <img
                  className="bannerImage"
                  src={placeholderCardPortrait}
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

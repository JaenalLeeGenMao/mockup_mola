import React, { Component } from 'react'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import Carousel from '@components/carousel'
import { placeholderCardLandscape, placeholderCardPortrait } from '@global/imageUrl'
import { banners } from '../const'

import styles from './placeholder.css'

class Placeholder extends Component {
  constructor(props) {
    super(props)
    this.state = {
      viewportWidth: 0,
      // carouselRefs: [],
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
      <div className={styles.placeholder__container}>
        <Carousel wrap={banners.length === 1 ? false : true} autoplay={false} sliderCoin={true} dragging={true} slidesToShow={2} transitionMode={'scroll3d'}>
          {banners.map(obj => (
            <div key={obj.id} className={styles.placeholder}>
              <img
                className="bannerImage3d"
                src={placeholderCardLandscape}
                // onLoad={this.updateOnImageLoad}
              />
            </div>
          ))}
        </Carousel>
        <div className={styles.placeholder__fixed_container}>
          <Carousel
            className={styles.placeholder__carousel_margin}
            wrap={false}
            autoplay={false}
            sliderCoin={true}
            dragging={true}
            withoutControls={false}
            slideToScroll={4.5}
            slidesToShow={isMobile ? 3 : 4.5}
            transitionMode={'scroll'}
          >
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21].map(obj => (
              <div key={obj.id} className={styles.placeholder}>
                <img
                  className="bannerImage"
                  src={placeholderCardLandscape}
                  // onLoad={this.updateOnImageLoad}
                />
              </div>
            ))}
          </Carousel>
          <Carousel
            className={styles.placeholder__carousel_margin}
            wrap={false}
            autoplay={false}
            sliderCoin={true}
            dragging={true}
            withoutControls={false}
            slideToScroll={6.5}
            slidesToShow={isMobile ? 3 : 6.5}
            transitionMode={'scroll'}
          >
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map(obj => (
              <div key={obj.id} className={styles.placeholder}>
                <img
                  className="bannerImage"
                  src={placeholderCardLandscape}
                  // onLoad={this.updateOnImageLoad}
                />
              </div>
            ))}
          </Carousel>

          <Carousel
            className={styles.placeholder__carousel_margin}
            wrap={false}
            autoplay={false}
            sliderCoin={true}
            dragging={true}
            withoutControls={false}
            slideToScroll={7.5}
            slidesToShow={isMobile ? 3 : 7.5}
            transitionMode={'scroll'}
          >
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18].map(obj => (
              <div key={obj.id} className={styles.placeholder}>
                <img
                  className="bannerImage"
                  src={placeholderCardPortrait}
                  // onLoad={this.updateOnImageLoad}
                />
              </div>
            ))}
          </Carousel>
        </div>
      </div>
    )
  }
}

export default withStyles(styles)(Placeholder)

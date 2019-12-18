import React from 'react'
import Carousel from '@components/carousel'
import { placeholderBlankLandscape, placeholderBlankPortrait } from '@global/imageUrl'

import { DummyWithoutAnimationPlaceholder } from './style'

export const BannerPlaceholder = ({ isMobile, data: banners }) => {
  const viewportWidth = window ? window.innerWidth : 200
  return (
    <Carousel
      wrap={banners.length === 1 ? false : true}
      autoplay={false}
      sliderCoin={true}
      dragging={false}
      withoutControls={true}
      slidesToShow={isMobile ? 1.25 : 2.25}
      transitionMode={'scroll3d'}
      cellSpacing={isMobile ? 8 : viewportWidth * 0.0125}
      // framePadding={!isMobile ? '0rem' : '0rem 0rem 0rem 1rem'}
    >
      {banners.map((_, bannerIndex) => (
        <DummyWithoutAnimationPlaceholder key={bannerIndex} num={bannerIndex}>
          <img
            className="bannerImage"
            src={placeholderBlankLandscape}
            // onLoad={this.updateOnImageLoad}
          />
        </DummyWithoutAnimationPlaceholder>
      ))}
    </Carousel>
  )
}

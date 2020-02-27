import React from 'react'
import Carousel from '@components/carousel'

import { placeholderMolaLogoSquare } from '@global/imageUrl'

import { DummyWithoutAnimationPlaceholder } from './style'

export const BannerSquarePlaceholder = ({ isMobile, data: banners }) => {
  return (
    <Carousel
      wrap={banners.length === 1 ? false : true}
      autoplay={false}
      sliderCoin={true}
      dragging={false}
      withoutControls={true}
      slidesToShow={1}
      transitionMode={'scroll3d'}
      cellSpacing={50}
      // framePadding={!isMobile ? '0rem' : '0rem 0rem 0rem 1rem'}
    >
      {banners.map((_, bannerIndex) => (
        <DummyWithoutAnimationPlaceholder key={bannerIndex} num={bannerIndex} width={'100%'}>
          <a href="/not-found">
            <img className="bannerImage" src={placeholderMolaLogoSquare} />
          </a>
        </DummyWithoutAnimationPlaceholder>
      ))}
    </Carousel>
  )
}

import React from 'react'
import Slider from 'react-slick'
import ReviewArrow from '@routes/movie-detail/arrow'
import { reviewSliderContainer, reviewSliderWrapper, reviewSliderDetail, reviewSliderProfile, reviewSliderQuotes } from './style'

const Review = ({ data }) => {
  const SETTINGS = {
    draggable: true,
    arrows: true,
    dots: false,
    fade: true,
    speed: 900,
    infinite: true,
    cssEase: 'cubic-bezier(0.7, 0, 0.3, 1)',
    touchThreshold: 100,
  }
  const images = [
    'https://images.pexels.com/photos/38278/tiger-head-wildlife-animal-38278.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
    'https://images.pexels.com/photos/39317/chihuahua-dog-puppy-cute-39317.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
    'https://images.pexels.com/photos/39571/gorilla-silverback-animal-silvery-grey-39571.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
    'https://images.pexels.com/photos/47547/squirrel-animal-cute-rodents-47547.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
    'https://images.pexels.com/photos/104827/cat-pet-animal-domestic-104827.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
    'https://images.pexels.com/photos/617278/pexels-photo-617278.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
  ]
  const sliderRefs = []

  return (
    <div className={reviewSliderContainer}>
      <Slider
        ref={node => {
          sliderRefs.push(node)
        }}
        {...SETTINGS}
        prevArrow={<ReviewArrow direction="prev" isDark={false} id={'arrow_prev'} sliderRefs={sliderRefs} />}
        nextArrow={<ReviewArrow direction="next" isDark={false} id={'arrow_next'} sliderRefs={sliderRefs} />}
      >
        {images.map((url, index) => {
          return (
            <div key={index} className={reviewSliderWrapper}>
              <div className={reviewSliderDetail}>
                <img className={reviewSliderProfile} alt="" src={url} />
                <div className={reviewSliderQuotes}>
                  <h1>Zlatan Ibrahimovic, Footballer</h1>
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Risus at ultrices mi tempus.</p>
                </div>
              </div>
            </div>
          )
        })}
      </Slider>
    </div>
  )
}

export default Review

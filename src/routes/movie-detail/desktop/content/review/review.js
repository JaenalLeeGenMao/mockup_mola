import React from 'react'
import Slider from 'react-slick'
import ReviewArrow from '@routes/movie-detail/arrow'
import { reviewSliderContainer, reviewSliderWrapper, reviewSliderDetail, reviewSliderProfile, reviewSliderQuotes, reviewAuthor } from './style'

const Review = ({ data }) => {
  const { quotes: unfilteredQuotes } = data

  const SETTINGS = {
    draggable: true,
    arrows: true,
    dots: false,
    fade: true,
    speed: 900,
    infinite: true,
    // cssEase: 'cubic-bezier(0.075, 0.82, 0.165, 1)',
    touchThreshold: 100,
  }
  const sliderRefs = []

  const quotes = unfilteredQuotes.map(({ attributes }) => {
    const { author, imageUrl, role, text } = attributes
    return {
      author,
      imageUrl,
      role,
      text,
    }
  })

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
        {quotes.map(({ author, text, imageUrl, role }, index) => {
          return (
            <div key={index} className={reviewSliderWrapper}>
              <div className={reviewSliderDetail}>
                <img className={reviewSliderProfile} alt="mola profile" src={imageUrl || 'https://cdn01.sent.tv/qaud0dwQwSQsDwdpPvTi_sent_757.png'} />
                <div className={reviewSliderQuotes}>
                  <p>{text}</p>
                  <div className={reviewAuthor}><span>{author}{role ? `, ${role}` : ''}</span></div>
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

import React, { Component } from 'react'
import withStyles from 'isomorphic-style-loader/lib/withStyles'

import Slider from 'react-slick'

import $ from 'jquery'

import styles from './content.css'

class Content extends Component {
  render() {
    const { updateColorChange, index } = this.props
    const settings = {
      dots: false,
      arrows: false,
      infinite: false,
      touchMove: false,
      speed: 500,
      slidesToShow: 1,
      swipe: false,
      draggable: false,
      fade: false,
      beforeChange: (currentIndex, nextIndex) => {
        updateColorChange(index, nextIndex)
      },
    }

    return (
      <Slider
        id={index}
        className={styles.content__container}
        ref={node => {
          if (!!node) this.props.updateSlider(node)
        }}
        {...settings}
      >
        {this.props.videos.map(video => {
          const { id, isDark, background, link } = video
          return index != 0 ? (
            <div key={id} className="grid-slick" isdark={isDark}>
              <picture>
                <source srcSet={background.landscapeWebp} type="image/webp" />
                <source srcSet={background.landscape} type="image/jpeg" />
                <img src={background.landscape} />
              </picture>
            </div>
          ) : (
            <a href={link} key={id} className="grid-slick" isdark={isDark}>
              <picture>
                <source srcSet={background.landscapeWebp} type="image/webp" />
                <source srcSet={background.landscape} type="image/jpeg" />
                <img src={background.landscape} />
              </picture>
            </a>
          )
        })}
      </Slider>
    )
  }
}

export default withStyles(styles)(Content)

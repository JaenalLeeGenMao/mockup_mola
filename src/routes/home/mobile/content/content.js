import React, { Component } from 'react'
import withStyles from 'isomorphic-style-loader/lib/withStyles'

import Slider from 'react-slick'
import styles from './content.css'

class Content extends Component {
  componentDidMount() {
    this.props.updateSlider(this.wrapperSlider)
  }

  render() {
    const { updateColorChange, index } = this.props
    const settings = {
      dots: false,
      arrows: false,
      infinite: false,
      speed: 500,
      slidesToShow: 1,
      // touchMove: false,
      swipe: true,
      draggable: true,
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
          this.wrapperSlider = node
        }}
        {...settings}
      >
        {this.props.videos.map(video => {
          const { id, isDark, background } = video
          return index != 0 ? (
            <>
              <picture>
                <source srcSet={background.portraitWebp} type="image/webp" />
                <source srcSet={background.portrait} type="image/jpeg" />
                <img src={background.portrait} />
              </picture>
              <div className={styles.content__gradient} />
            </>
          ) : (
            <div key={id} className="grid-slick" isdark={isDark}>
              <img src={background.portrait} />
            </div>
          )
        })}
      </Slider>
    )
  }
}

export default withStyles(styles)(Content)

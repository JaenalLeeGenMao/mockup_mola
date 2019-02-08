import React, { Component } from 'react'
import withStyles from 'isomorphic-style-loader/lib/withStyles'

import Slider from 'react-slick'

import $ from 'jquery'

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
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      draggable: false,
      fade: true,
      beforeChange: (currentIndex, nextIndex) => {
        updateColorChange(index, nextIndex)
      },
    }

    return (
      <Slider
        className={styles.content__container}
        ref={node => {
          this.wrapperSlider = node
        }}
        {...settings}
      >
        {this.props.videos.map(video => {
          const { id, title, description, quotes, isDark, background } = video,
            { author, text } = quotes.attributes
          return (
            <div key={id} id={id} title={title} description={description} quote={`${text} - ${author}`} className="grid-slick" isdark={isDark}>
              <img src={background.mobile.portrait} />
            </div>
          )
        })}
      </Slider>
    )
  }
}

export default withStyles(styles)(Content)

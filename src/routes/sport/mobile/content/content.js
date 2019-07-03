import React, { Component } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import Slider from 'react-slick';

import styles from './content.css';

class Content extends Component {
  componentDidMount() {
    this.props.updateSlider(this.wrapperSlider);
  }

  render() {
    const { updateColorChange, index } = this.props;
    const settings = {
      dots: false,
      arrows: false,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      // touchMove: false,
      swipe: true,
      draggable: true,
      fade: false,
      beforeChange: (currentIndex, nextIndex) => {
        updateColorChange(index, nextIndex);
      },
    };

    return (
      <Slider
        id={index}
        className={styles.content__container}
        ref={node => {
          this.wrapperSlider = node;
        }}
        {...settings}
      >
        {this.props.videos.map(video => {
          const { id, isDark, background } = video;
          const imgBackground = background.portrait ? background.portrait : background.landscape;

          return (
            <div key={id} className="grid-slick" isdark={isDark}>
              <img src={imgBackground} />
              <div className={styles.content__gradient} />
            </div>
          );
        })}
      </Slider>
    );
  }
}

export default withStyles(styles)(Content);

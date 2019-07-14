import React, { Component } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { globalTracker } from '@source/lib/globalTracker'

import Slider from 'react-slick';

import styles from './content.css';

class Content extends Component {
  componentDidMount() {
    this.props.updateSlider(this.wrapperSlider);
  }

  handleClickMobile = (link) => {

    link ? window.open(link, '_blank') : false

    const payload = {
      window,
      user: this.props.user,
      linkRedirectUrl: link,
      event: 'event_pages',
    }
    globalTracker(payload)
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
          const { id, isDark, background, link } = video;
          const imgBackground = background.portrait ? background.portrait : background.landscape;
          // console.log("imgBackground", imgBackground, video)
          return index != 0 ?
            (
              <div key={id} className="grid-slick" isdark={isDark}>
                <img src={imgBackground} />
                <div className={styles.content__gradient} />}
            </div>
            )
            :
            (
              <a key={id} href="javascript:void(0)" onClick={() => this.handleClickMobile(link)}>
                <div className="grid-slick" isdark={isDark}>
                  <img src={imgBackground} />
                </div>
              </a>
            )
        })}
      </Slider>
    );
  }
}

export default withStyles(styles)(Content);

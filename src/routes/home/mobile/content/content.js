import React, { Component } from 'react'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import { globalTracker } from '@source/lib/globalTracker'

import Slider from 'react-slick'
import styles from './content.css'

class Content extends Component {
  componentDidMount() {
    this.props.updateSlider(this.wrapperSlider)
  }
  handleClickMobile = link => {
    var domainRedirect = link.split('/')

    if (link && domainRedirect[2].includes('mola.tv')) {
      if (link.includes('link_redirect')) {
        if (domainRedirect[5].includes('mola.tv')) {
          window.location.href = link
        } else {
          window.open(link, '_blank')
        }
      } else {
        window.location.href = link
      }
    } else {
      window.open(link, '_blank')
    }

    const payload = {
      window,
      user: this.props.user,
      linkRedirectUrl: link,
      event: 'event_pages',
    }
    globalTracker(payload)
  }

  render() {
    const { updateColorChange, index, isLandscape } = this.props
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

    let widthParam = ''
    if (window) {
      widthParam = '?w=' + window.innerWidth
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
          const { id, isDark, background, link } = video
          return index != 0 ? (
            <div key={id} className={styles.img__wrapper}>
              <picture>
                <source srcSet={isLandscape ? background.landscapeWebp : background.portraitWebp} type="image/webp" />
                <source
                  srcSet={isLandscape ? `${background.landscape}${widthParam}` : `${background.portrait}${widthParam}`}
                  type="image/jpeg"
                />
                <img
                  src={isLandscape ? `${background.landscape}${widthParam}` : `${background.portrait}${widthParam}`}
                />
              </picture>
              <div className={styles.content__gradient} />
            </div>
          ) : (
            <a href="javascript:void(0)" onClick={() => this.handleClickMobile(link)}>
              <div key={id} className="grid-slick" isdark={isDark}>
                <picture>
                  <source srcSet={isLandscape ? background.landscapeWebp : background.portraitWebp} type="image/webp" />
                  <source
                    srcSet={
                      isLandscape ? `${background.landscape}${widthParam}` : `${background.portrait}${widthParam}`
                    }
                    type="image/jpeg"
                  />
                  <img
                    src={isLandscape ? `${background.landscape}${widthParam}` : `${background.portrait}${widthParam}`}
                  />
                </picture>
              </div>
            </a>
          )
        })}
      </Slider>
    )
  }
}

export default withStyles(styles)(Content)

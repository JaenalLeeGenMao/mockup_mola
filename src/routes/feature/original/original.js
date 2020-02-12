import React, { Component } from 'react'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import _get from 'lodash/get'
import Carousel from '@components/carousel'
import PlaylistCard from '@components/playlist-card'

import s from './original.css'

class MolaOriginal extends Component {
  state = {
    currentSlide: 0,
  }

  handleOnClick = obj => {
    if (this.props.onClick && obj) {
      this.props.onClick(obj)
    }
  }

  handleAfterSlide = carousel => {
    const index = _get(carousel, 'state.currentSlide', 0)
    this.setState({ currentSlide: index })
  }

  render() {
    const { id, data = [], isMobile = false } = this.props,
      { currentSlide } = this.state

    const title = _get(data, `[${currentSlide}].title`, ''),
      description = _get(data, `[${currentSlide}].description`, '')
    return (
      <div className={s.original_wrapper}>
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            backgroundImage: `url(${_get(data, `[${currentSlide}].images.cover.landscape`, '')})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            filter: 'blur(20px)',
            opacity: '0.5',
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            background: `linear-gradient(${isMobile ? 'to top' : 'to left'}, black, transparent)`,
            filter: 'blur(20px)',
          }}
        />
        <div className={s.original_content}>
          <div className={s.original_grid_detail}>
            <div>
              <h2>{title}</h2>
              <p>{description && description.length > 185 ? `${description.substr(0, 185)}...` : description}</p>
              <button onClick={() => this.handleOnClick(_get(data, `[${currentSlide}]`, ''))}>View Movie</button>
            </div>
          </div>
          <div className={s.original_grid_slider}>
            <Carousel
              wrap={true}
              autoplay={false}
              sliderCoin={true}
              dragging={true}
              withoutControls={false}
              slidesToShow={isMobile ? 1.1 : 1.9}
              slidesToScroll={1}
              transitionMode={'scroll3d'}
              cellAlign={'left'}
              zoomScale={0.75}
              opacityScale={0.25}
              cellSpacing={this.props.cellSpacing}
              framePadding={this.props.framePadding}
              afterSlideCallback={this.handleAfterSlide}
            >
              {this.props.data.length > 0 &&
                this.props.data.map((obj, index) => (
                  <PlaylistCard
                    transitionMode={'scroll3d'}
                    key={obj.id}
                    alt={obj.title}
                    src={`${_get(obj, 'images.cover.landscape', '')}?w=1080`}
                    // containerStyle={{
                    //   transform: currentSlide === index ? (isMobile ? 'scale(1)' : 'scale(1, 1.15)') : 'scale(1)',
                    // }}
                    bannerCard
                  />
                ))}
            </Carousel>
          </div>
        </div>
      </div>
    )
  }
}

export default withStyles(s)(MolaOriginal)

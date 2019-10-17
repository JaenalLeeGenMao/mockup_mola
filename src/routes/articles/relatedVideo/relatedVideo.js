import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import withStyles from 'isomorphic-style-loader/lib/withStyles'

import LazyLoad from '@components/common/Lazyload'
import Carousel from '@components/carousel'

import VideoCard from '@components/video-card'
import Link from '@components/Link'

import s from './relatedVideo.css'
import { placeholderBlankPortrait } from '@global/imageUrl'

class RelatedVideo extends React.Component {
  handleCLick = videoId => {
    event.preventDefault()
    window.location.href = `/watch?v=${videoId}`
  }

  render() {
    const carouselClassName = this.props.isMobile ? s.related_video_wrapper_mobile : s.related_video_wrapper
    return (
      <Fragment>
        <div className={s.topPicksTitle}> {this.props.title} </div>

        <Carousel
          className={carouselClassName}
          wrap={false}
          autoplay={false}
          sliderCoin={true}
          dragging={true}
          withoutControls={this.props.data.length <= 6}
          slidesToShow={this.props.isMobile ? 2.7 : 6.5}
          slidesToScroll={6}
          transitionMode={'scroll'}
        >
          {this.props.data &&
            this.props.data.length > 0 &&
            this.props.data.map(movie => {
              const movieUrl = movie.coverUrl ? movie.coverUrl : placeholderBlankPortrait
              return (
                <Link to={`/watch?v=${movie.id}`} key={movie.id}>
                  <VideoCard key={movie.id} alt={movie.title} description={movie.title} src={`${movieUrl}`} />
                </Link>
              )
            })}
        </Carousel>
        {/* <div className={s.recentTopContainer}> */}
        {/* <div className={`${this.props.isMobile ? s.topPicksContainer_mobile : s.topPicksContainer}`}>
            {this.props.data &&
              this.props.data.length > 0 && this.props.data.map((movie) => {
                const movieUrl = movie.coverUrl ? movie.coverUrl : placeholderBlankPortrait
                return (
                  <div className={s.wrapper_card} key={movie.id} onClick={() => this.handleCLick(movie.id)}>
                    <LazyLoad
                      key={movie.id}
                      containerClassName={s.movieImg}
                      onEmptyShowDefault
                      onErrorShowDefault
                      errorImgClassName={s.movieErrorImg}
                      src={movieUrl}
                      className={`${this.props.isMobile ? s.coverItem_mobile : s.coverItem}`}
                    ></LazyLoad>
                  </div>
                )
              }
              )}
          </div> */}
        {/* </div> */}
      </Fragment>
    )
  }
}

export default withStyles(s)(RelatedVideo)

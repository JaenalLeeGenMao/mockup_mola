import React, { Component } from 'react'
import withStyles from 'isomorphic-style-loader/lib/withStyles'

import LazyLoad from '@components/common/Lazyload'
import Link from '@components/Link'

import { getLocale } from '@routes/sport/locale'

import ContentLayer from './layer'
import ContentLayerMobile from './layer/layer_mobile'

import styles from './content.css'

class Content extends Component {
  state = {
    show: false,
    locale: getLocale(),
    showDescription: true,
    intervalSwitch: null,
  }

  handleClick = e => {
    e.preventDefault()
    const { sliderRefs, id } = this.props
    try {
      const currentSlider = sliderRefs.filter(slider => slider.id === id)[0]
      currentSlider.slickNext()
    } catch {}
  }

  handleTitleShow = (show = false) => {
    const { isMobile, background } = this.props,
      version = isMobile ? 'mobile' : 'desktop',
      coverBackgroundImage = isMobile ? background[version].portrait : background[version].landscape
    /* TEMPORARILY HARDCODE FIX */
    if (coverBackgroundImage != 'https://cdn01.sent.tv/qaud0dwQwSQsDwdpPvTi_sent_757.png') {
      this.setState({ show: show ? true : false })
    }
  }

  contentSwitcher = () => {
    const { showDescription } = this.state
    console.log('=======contentSwitcher', showDescription)

    if (showDescription === true) {
      this.setState({
        showDescription: false,
      })
    } else if (showDescription === false) {
      this.setState({
        showDescription: true,
      })
    }
  }

  componentDidMount() {
    const intervalSwitch = setInterval(this.contentSwitcher, 4000)
    this.setState({ intervalSwitch: intervalSwitch })
  }

  componentWillUnmount() {
    clearInterval(this.state.intervalSwitch)
  }

  render() {
    const {
        id,
        title,
        description,
        shortDescription /** maximum 170 characters, average 25-30 wording */,
        isDark,
        backgroundColor = '#fff',
        background /** background */,
        type,
        isSafari,
        ticking = false,
        isMobile = false,
        getCurrentScreenHeight = window.innerHeight,
      } = this.props,
      fontColor = isMobile ? '#fff' : isDark ? '#000' : '#fff',
      version = isMobile ? 'mobile' : 'desktop',
      coverBackgroundImage = isMobile ? background[version].portrait : background[version].landscape

    const moreStyles = {
      bottom: 0,
      transform: isMobile ? `translateY(${getCurrentScreenHeight()}px)` : null,
      transition: 'all ease-in-out 300ms',
    }

    const { locale } = this.state
    return (
      <div className="grid-slick" isDark={isDark} movieId={id}>
        {isMobile && <div className={styles.content__gradient_cover} />}
        <LazyLoad alt="mola grid style" src={coverBackgroundImage} containerClassName={styles.content__grid_background_images} lazy={false} handleCallback={this.handleTitleShow} />
        <div className={styles.content__grid_container} style={{ color: fontColor }}>
          <div className={styles.content__grid_nav} />
          <div className={styles.content__grid_title}>
            {!this.state.show && (
              <h1
                ref={node => {
                  this.titleRef = node
                }}
                className={styles.content__grid_title_text}
              >
                {title}
              </h1>
            )}
          </div>
          <div className={styles.content__grid_desc}>
            {isMobile ? <ContentLayerMobile {...this.props} showDescription={this.state.showDescription} /> : <ContentLayer {...this.props} />}
            <LazyLoad>
              <div className={styles.content__grid_see_more_wrapper} style={isMobile ? moreStyles : null}>
                {isMobile ? (
                  <Link
                    to={`/movie-detail/${id}`}
                    className={`${styles.content__grid_see_more_mobile} ${styles.white} ${type === 'playlists' ? 'tourMovieDiscover' : 'tourMovieDetail'}`}
                    onClick={type === 'playlists' && this.handleClick}
                  >
                    <span className={`${styles.icon__view_movie} ${styles.white}`} />
                    {type === 'playlists' ? 'discover' : locale['view_movie']}
                  </Link>
                ) : (
                  <Link
                    to={`/movie-detail/${id}`}
                    className={`${styles.content__grid_see_more_desktop} ${isDark ? styles.black : styles.white} ${type === 'playlists' ? 'tourMovieDiscover' : 'tourMovieDetail'}`}
                    onClick={type === 'playlists' && this.handleClick}
                  >
                    {type === 'playlists' ? 'discover' : locale['view_movie']}
                  </Link>
                )}
              </div>
            </LazyLoad>
          </div>
          <div className={styles.content__grid_empty} />
        </div>
      </div>
    )
  }
}

export default withStyles(styles)(Content)

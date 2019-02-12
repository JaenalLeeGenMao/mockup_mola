import React, { Component, Fragment } from 'react'
import Slider from 'react-slick'
import { Link as RSLink, Element, Events, scroller } from 'react-scroll'
import { connect } from 'react-redux'
import { compose } from 'redux'
import Joyride from 'react-joyride'
import { EVENTS, ACTIONS } from 'react-joyride/lib/constants'
import $ from 'jquery'

import withStyles from 'isomorphic-style-loader/lib/withStyles'
import _get from 'lodash/get'

import homeActions from '@actions/home'

import { swipeGestureListener, getErrorCode } from '@routes/home/util'
import { getLocale } from '@routes/home/locale'

import Header from '@components/Header'
import LazyLoad from '@components/common/Lazyload'
import Link from '@components/Link'

import HomeError from '@components/common/error'
import HomePlaceholder from './placeholder'
import HomeArrow from '../arrow'
import HomeMobileContent from './content'
import HomeMobileMenu from './menu'

import styles from './home.css'
import contentStyles from './content/content.css'
import { filterString, setMultilineEllipsis } from './util'
import { SETTINGS_VERTICAL } from '../const'
import { tourSteps } from './const'

let activePlaylist
const trackedPlaylistIds = [] /** tracked the playlist/videos id both similar */

class Home extends Component {
  state = {
    locale: getLocale(),
    isDark: undefined,
    activeSlide: undefined,
    activeSlideDots: undefined,
    scrollIndex: 0 /* vertical menu */,
    swipeIndex: 0 /* horizontal menu */,
    playlists: [],
    videos: [],
    steps: tourSteps[this.props.user.lang],
    sliderRefs: [],
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { onUpdatePlaylist, onHandlePlaylist, onHandleVideo, home: { playlists, videos }, runtime } = nextProps

    if (playlists.meta.status === 'loading' && prevState.playlists.length <= 0) {
      onHandlePlaylist()
    } else {
      playlists.data.map((playlist, index) => {
        if (trackedPlaylistIds.indexOf(playlist.id) === -1) {
          trackedPlaylistIds.push(playlist.id)
          onHandleVideo(playlist)
        }
        if (!activePlaylist && index === 0) {
          activePlaylist = playlists.data[0]
          onUpdatePlaylist(activePlaylist.id)
        }
      })
    }
    return { ...prevState, playlists, videos }
  }

  componentDidMount() {
    /* set the default active playlist onload */
    if (this.state.playlists.data.length > 0) {
      activePlaylist = this.state.playlists.data[0]
      this.props.onUpdatePlaylist(activePlaylist.id)
    }

    this.handleMouseScroll()

    document.body.addEventListener('touchmove', this.preventDefault, {
      passive: false,
    })

    this.prevTouch = 0
    this.nextTouch = 0

    document.onmousedown = event => {
      this.prevTouch = event.screenX
    }

    document.onmouseup = event => {
      this.nextTouch = event.screenX

      this.handleSwipeDirection(this.activeSlider, this.prevTouch, this.nextTouch)
    }
  }

  componentWillUnmount() {
    document.body.removeEventListener('touchmove', this.preventDefault)

    const mouseWheelEvent = /Firefox/i.test(navigator.userAgent) ? 'DOMMouseScroll' : 'wheel'

    /** handle mouse scroll */
    document.removeEventListener(mouseWheelEvent, this.mouseScrollCallback, true)
  }

  preventDefault = e => {
    e.preventDefault()
  }

  handleMouseScroll = () => {
    const mouseWheelEvent = /Firefox/i.test(navigator.userAgent) ? 'DOMMouseScroll' : 'wheel'

    /** handle mouse scroll */
    document.addEventListener(mouseWheelEvent, this.mouseScrollCallback, true)
  }

  mouseScrollCallback = event => {
    const that = this

    clearTimeout($.data(that, 'scrollCheck'))
    $.data(
      that,
      'scrollCheck',
      setTimeout(function() {
        /* Determine the direction of the scroll (< 0 → up, > 0 → down). */
        var delta = (event.deltaY || -event.wheelDelta || event.detail) >> 10 || 1

        if (delta < 0) {
          if (that.rootSlider) {
            that.rootSlider.slickNext()
          }
          return
        } else if (delta > 0) {
          if (that.rootSlider) {
            that.rootSlider.slickPrev()
          }
          return
        }
      }, 500)
    )
  }

  handleSwipeDirection(slider, prevX, nextX) {
    const distance = Math.abs(prevX - nextX),
      { sliderRefs } = this.state
    if (slider) {
      if (slider.innerSlider === null) {
        return false
      }
      if (distance <= 100) {
        // do nothing
      } else if (prevX > nextX) {
        slider.slickNext()
      } else {
        slider.slickPrev()
      }
    } else {
      if (distance <= 100) {
        // do nothing
      } else if (prevX > nextX) {
        sliderRefs[0].slickNext()
      } else {
        sliderRefs[0].slickPrev()
      }
    }
  }

  handleColorChange = (index, swipeIndex = 0) => {
    const that = this
    setTimeout(function() {
      that.props.onUpdatePlaylist(activePlaylist.id)
      const activeSlick = document.querySelector(`.slick-active .${contentStyles.content__container} .slick-active .grid-slick`),
        { videos, sliderRefs } = that.state
      let isDark = 1
      if (activeSlick) {
        isDark = parseInt(activeSlick.getAttribute('isdark'), 10)
      }
      if (typeof isDark === 'number') {
        that.setState({ isDark, activeSlide: videos.data[0].data[0], activeSlideDots: videos.data[0].data })
      }
      if (index || index === 0) {
        sliderRefs[index].slickGoTo(0)
        that.setState({
          scrollIndex: index,
          swipeIndex,
          activeSlide: videos.data[index].data[swipeIndex],
          activeSlideDots: videos.data[index].data,
        })
      }
    }, 300)
  }

  /* Collection of sliders */
  handleUpdateSlider = refs => {
    const { sliderRefs } = this.state
    if (sliderRefs.length < trackedPlaylistIds.length) {
      sliderRefs.push(refs)
    }
  }

  /* Vertical scroll handler */
  handleScrollToIndex = (index = 0) => {
    this.setState({
      ...this.state,
      playlists: { ...this.state.playlists },
    })
    if (this.rootSlider) {
      this.rootSlider.slickGoTo(index)
    }
  }

  render() {
    const isSafari = /.*Version.*Safari.*/.test(navigator.userAgent),
      {
        playlists,
        playlists: { meta: { status: playlistStatus = 'loading', error: playlistError = '' } },
        videos,
        videos: { meta: { status: videoStatus = 'loading', error: videoError = '' } },
      } = this.props.home,
      { locale, isDark, startGuide, steps, playlistSuccess, stepIndex, sliderRefs, scrollIndex, swipeIndex, activeSlide, activeSlideDots } = this.state,
      settings = {
        ...SETTINGS_VERTICAL,
        className: styles.home__slick_slider_fade,
        onInit: node => {
          this.activeSlider = sliderRefs[0]
          this.handleColorChange()
        },
        beforeChange: (currentIndex, nextIndex) => {
          this.activeSlider = sliderRefs[nextIndex]
          activePlaylist = playlists.data[nextIndex]
          this.handleColorChange(nextIndex)
        },
      },
      playlistErrorCode = getErrorCode(playlistError),
      videoErrorCode = getErrorCode(videoError)

    const customTourStyle = {
      buttonNext: {
        backgroundColor: '#2C56FF',
        fontSize: '1.06rem',
        lineHeight: '1',
        padding: '8px 15px',
        textTransform: 'uppercase',
        letterSpacing: '1.67px',
        borderRadius: '30px',
        fontWeight: '600',
      },
      buttonBack: {
        color: '#000000',
        fontSize: '1.06rem',
        textTransform: 'uppercase',
        letterSpacing: '1.67px',
        fontWeight: '600',
      },
      buttonClose: {
        display: 'none',
      },
      buttonSkip: {
        color: '#000000',
        fontWeight: '600',
        fontSize: '1.06rem',
        textTransform: 'uppercase',
        letterSpacing: '1.67px',
        padding: '0',
      },
      tooltipContent: {
        fontSize: '1.06rem',
        padding: '0 0 20px',
        textAlign: 'left',
        color: '#858585',
        lineHeight: '1.3',
        letterSpacing: '0.5px',
      },
      tooltipTitle: {
        fontSize: '1.15rem',
        textAlign: 'left',
        margin: '0px 0px 8px',
        letterSpacing: '0.59px',
        textTransform: 'uppercase',
      },
      overlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
      },
      spotlight: {
        borderRadius: '4rem',
      },
    }

    let filteredDesc = ''
    let filteredQuote = ''
    if (activeSlide) {
      filteredDesc = filterString(activeSlide.description, 36)
      filteredQuote = `“${filterString(activeSlide.quotes.attributes.text, 28)}” - ${activeSlide.quotes.attributes.author}`
    }

    return (
      <Fragment>
        <div>
          {playlistStatus !== 'error' && <Header libraryOff className={styles.placeholder__header} isDark={isDark} activePlaylist={activePlaylist} {...this.props} />}
          {playlistStatus === 'loading' && videoStatus === 'loading' && <HomePlaceholder />}
          {playlistStatus === 'error' && <HomeError status={playlistErrorCode} message={playlistError || 'Mola TV playlist is not loaded'} />}
          {videoStatus === 'error' && <HomeError status={videoErrorCode} message={videoError || 'Mola TV video is not loaded'} />}
          {videos &&
            videos.data.length > 0 &&
            videos.data.length === playlists.data.length && (
              <>
                <div className={styles.home__gradient} />
                <div className={styles.home__sidebar}>
                  <HomeMobileMenu playlists={this.state.playlists.data} activeIndex={scrollIndex} isDark={0} onClick={this.handleScrollToIndex} />
                </div>
                <LazyLoad containerClassName={styles.header__library_link_wrapper}>
                  <Link to={`/movie-library${activePlaylist ? `/${activePlaylist.id.replace('f-', '')}` : ''}`}>
                    <span className={`${styles[0 ? 'header__library_logo_black' : 'header__library_logo_white']} tourLibrary`} alt="mola library" />
                  </Link>
                </LazyLoad>
                {activeSlide && (
                  <LazyLoad containerClassName={`${styles.header__detail_container} ${0 ? styles.black : styles.white}`}>
                    <h1 className={styles[activeSlide.title.length > 24 ? 'small' : 'big']}>{activeSlide.title}</h1>
                    <p>{filteredDesc}</p>
                    <p className={styles.quote}>{filteredQuote}</p>
                    <Link to={`/movie-detail/${activeSlide.id}`} className={`${styles.home__detail_button} ${0 ? styles.black : styles.white}`}>
                      {locale['view_movie']}
                    </Link>
                  </LazyLoad>
                )}
                <div className={styles.header__library_link_wrapper} style={{ right: 0, bottom: '6px' }}>
                  {activeSlideDots &&
                    activeSlideDots.length > 1 && (
                      <div>
                        <div className={`${styles.home__custom_arrow} ${isDark ? styles.black : styles.white}`} onClick={() => this.handleSwipeDirection(this.activeSlider, 0, 1000)}>
                          {'‹'}
                        </div>
                        <div className={`${styles.home__custom_arrow} ${isDark ? styles.black : styles.white}`} onClick={() => this.handleSwipeDirection(this.activeSlider, 1000, 0)}>
                          {'›'}
                        </div>
                      </div>
                    )}
                </div>
                <Slider
                  {...settings}
                  ref={node => {
                    this.rootSlider = node
                  }}
                >
                  {videos.data.map((video, index) => {
                    const { id, sortOrder } = video.meta
                    return <HomeMobileContent key={id} videos={video.data} index={index} updateSlider={this.handleUpdateSlider} updateColorChange={this.handleColorChange} />
                  })}
                </Slider>
              </>
            )}
        </div>
      </Fragment>
    )
  }
}

const mapStateToProps = state => {
  return {
    ...state,
  }
}

const mapDispatchToProps = dispatch => ({
  onHandlePlaylist: () => dispatch(homeActions.getHomePlaylist()),
  onHandleVideo: playlist => dispatch(homeActions.getHomeVideo(playlist)),
  onUpdatePlaylist: id => dispatch(homeActions.updateActivePlaylist(id)),
})

export default compose(withStyles(styles, contentStyles), connect(mapStateToProps, mapDispatchToProps))(Home)

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
import { filterString } from './util'
import { SETTINGS_VERTICAL } from '../const'
import { tourSteps } from './const'

let activePlaylist
const trackedPlaylistIds = [] /** tracked the playlist/videos id both similar */

class Home extends Component {
  state = {
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

    document.body.addEventListener('touchmove', this.preventDefault, {
      passive: false,
    })

    this.prevTouch = 0
    this.nextTouch = 0

    document.ontouchstart = event => {
      this.prevTouch = event.changedTouches[0].screenX
    }

    document.ontouchend = event => {
      this.nextTouch = event.changedTouches[0].screenX

      this.handleSwipeDirection(this.activeSlider, this.prevTouch, this.nextTouch)
    }
  }

  handleSwipeDirection(slider, prevX, nextX) {
    const distance = Math.abs(prevX - nextX),
      { sliderRefs } = this.state

    if (slider) {
      if (slider.innerSlider === null) {
        return false
      }
      if (distance <= 20) {
        // do nothing
      } else if (prevX > nextX) {
        slider.slickNext()
      } else {
        slider.slickPrev()
      }
    } else {
      if (distance <= 20) {
        // do nothing
      } else if (prevX > nextX) {
        sliderRefs[0].slickNext()
      } else {
        sliderRefs[0].slickPrev()
      }
    }
  }

  componentWillUnmount() {
    document.body.removeEventListener('touchmove', this.preventDefault)
  }

  preventDefault = e => {
    e.preventDefault()
  }

  handleColorChange = (index, swipeIndex = 0) => {
    const that = this
    setTimeout(function() {
      that.props.onUpdatePlaylist(activePlaylist.id)
      const activeSlick = document.querySelector(`.slick-active .${contentStyles.content__container} .slick-active .grid-slick`),
        { videos } = that.state
      let isDark = 1
      if (activeSlick) {
        isDark = parseInt(activeSlick.getAttribute('isdark'), 10)
      }
      if (typeof isDark === 'number') {
        that.setState({ isDark, activeSlide: videos.data[0].data[0], activeSlideDots: videos.data[0].data })
      }
      if (index || index === 0) {
        that.setState({
          scrollIndex: index,
          swipeIndex,
          activeSlide: videos.data[index].data[swipeIndex],
          activeSlideDots: videos.data[index].data,
        })
      }
    }, 300)
  }

  handleUpdateSlider = refs => {
    const { sliderRefs } = this.state
    if (sliderRefs.length < trackedPlaylistIds.length) {
      sliderRefs.push(refs)
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
      { isDark, startGuide, steps, playlistSuccess, stepIndex, sliderRefs, scrollIndex, swipeIndex, activeSlide, activeSlideDots } = this.state,
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
      filteredDesc = filterString(activeSlide.description)
      filteredQuote = `“${filterString(activeSlide.quotes.attributes.text)}” - ${activeSlide.quotes.attributes.author}`
    }

    return (
      <Fragment>
        <div>
          {playlistStatus !== 'error' && <Header libraryOff className={styles.placeholder__header} isDark={isDark} activePlaylist={activePlaylist} isMobile {...this.props} />}
          {playlistStatus === 'loading' && videoStatus === 'loading' && <HomePlaceholder />}
          {playlistStatus === 'error' && <HomeError status={playlistErrorCode} message={playlistError || 'Mola TV playlist is not loaded'} />}
          {videoStatus === 'error' && <HomeError status={videoErrorCode} message={videoError || 'Mola TV video is not loaded'} />}
          {videos &&
            videos.data.length > 0 &&
            videos.data.length === playlists.data.length && (
              <>
                <div className={styles.home__sidebar}>
                  <HomeMobileMenu playlists={playlists.data} activeIndex={scrollIndex} isDark={isDark} />
                </div>
                <LazyLoad containerClassName={styles.header__library_link_wrapper}>
                  <Link to={`/movie-library${activePlaylist ? `/${activePlaylist.id.replace('f-', '')}` : ''}`}>
                    <span className={`${styles[isDark ? 'header__library_logo_black' : 'header__library_logo_white']} tourLibrary`} alt="mola library" />
                  </Link>
                  <p className={`${styles.header__library_text} ${isDark ? styles.black : styles.white}`}>Terbaik dari film {activePlaylist.title}</p>
                </LazyLoad>
                {activeSlide && (
                  <LazyLoad containerClassName={`${styles.header__detail_container} ${isDark ? styles.black : styles.white}`}>
                    <h1>{activeSlide.title}</h1>
                    <p>{filteredDesc}</p>
                    <p>{filteredQuote}</p>
                    <p>{filteredDesc}</p>
                    <p>{filteredQuote}</p>
                    <p>{filteredDesc}</p>
                    <Link to={`/movie-detail/${activeSlide.id}`} className={`${styles.home__detail_button} ${isDark ? styles.black : styles.white}`}>
                      <span className={`${styles.icon__view_movie} ${isDark ? styles.white : styles.black}`} />
                    </Link>
                  </LazyLoad>
                )}
                <div className={styles.header__library_link_wrapper} style={{ right: 0, bottom: '11px' }}>
                  {activeSlideDots && activeSlideDots.length > 0 && <HomeMobileMenu playlists={activeSlideDots} activeIndex={swipeIndex} isDark={isDark} type="horizontal" />}
                </div>
                <Slider {...settings}>
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

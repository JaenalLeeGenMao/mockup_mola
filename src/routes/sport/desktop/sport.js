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

import sportActions from '@actions/sport'

import { swipeGestureListener, getErrorCode } from '@routes/sport/util'
import { getLocale } from '@routes/sport/locale'

import Header from '@components/Header'
import LazyLoad from '@components/common/Lazyload'
import Link from '@components/Link'

import SportError from '@components/common/error'
import SportPlaceholder from './placeholder'
import SportArrow from '../arrow'
import SportMobileContent from './content'
import SportMobileMenu from './menu'
import LiveNowUpcomingSchedule from './livenowupcoming'

import styles from './sport.css'
import contentStyles from './content/content.css'
import { filterString, setMultilineEllipsis } from './util'
import { SETTINGS_VERTICAL } from '../const'
import { tourSteps } from './const'
import { reduce } from 'rxjs/operators'

// let activePlaylist
const trackedPlaylistIds = [] /** tracked the playlist/videos id both similar */
let ticking = false,
  activePlaylist,
  scrollIndex = 0,
  flag = false
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
  tooltip: {
    width: '30rem',
    borderRadius: '.4rem',
  },
}

class Sport extends Component {
  state = {
    locale: getLocale(),
    isDark: undefined,
    activeSlide: undefined,
    activeSlideDots: undefined,
    scrollIndex: 0 /* vertical menu */,
    swipeIndex: 0 /* horizontal menu */,
    playlists: [],
    videos: [],
    startGuide: false,
    stepIndex: 0,
    steps: tourSteps[this.props.user.lang],
    sportCategoryListSuccess: false,
    sliderRefs: [],
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { onUpdatePlaylist, onHandleVideo, onHandlePlaylist, sport: { playlists, videos }, runtime } = nextProps
    // console.log('AAAAAAAA ini sport', nextProps)
    if (playlists.meta.status === 'loading' && prevState.playlists.length <= 0) {
      onHandlePlaylist()
    } else {
      playlists.data.map((playlist, index) => {
        if (trackedPlaylistIds.indexOf(playlist.id) === -1) {
          // console.log('playlists', playlist)
          trackedPlaylistIds.push(playlist.id)
          onHandleVideo(playlist)
          // console.log('checking playlist', playlist) // background exist
        }
        if (!activePlaylist && index === 0) {
          activePlaylist = playlists.data[0]
          onUpdatePlaylist(activePlaylist.id)
        }
      })
    }
    return { ...prevState, playlists, videos }
  }

  handleTourCallback = data => {
    const { type, action, index } = data
    const { videos } = this.props.sport

    if (type === EVENTS.TOUR_END) {
      localStorage.setItem('tour-sport', true)
      // document.cookie = '__trh=1; path=/;';
      return true
    }

    if (type === EVENTS.STEP_AFTER && action === ACTIONS.NEXT) {
      this.setState({
        stepIndex: index + 1,
      })
    } else if (type === EVENTS.STEP_AFTER && action === ACTIONS.PREV) {
      this.setState(
        {
          stepIndex: index - 1,
        },
        () => {
          if (index === 4) {
            this.sliderRefs[0].slickPrev()
          }
        }
      )
    } else {
      if (action === ACTIONS.NEXT && index === 4) {
        if (videos.data[0].data.length > 1) {
          this.sliderRefs[0].slickNext()
        } else {
          this.setState({
            stepIndex: index + 1,
          })
        }
      }
    }
  }

  componentDidMount() {
    const { playlists, videos } = this.props.sport

    /* set the default active playlist onload */
    if (this.state.playlists.data.length > 0) {
      activePlaylist = this.state.playlists.data[0]
      this.props.onUpdatePlaylist(activePlaylist.id)
    }

    this.handleKeyboardEvent()
    this.handleMouseScroll()

    document.body.addEventListener('touchmove', this.preventDefault, {
      passive: false,
    })

    this.prevTouchX = 0
    this.nextTouchX = 0
    this.prevTouchY = 0
    this.nextTouchY = 0

    /* mousedown/mouseup to handle desktop scrolling event */
    document.onmousedown = event => {
      this.prevTouchX = event.screenX
      this.prevTouchY = event.screenY
    }

    document.onmouseup = event => {
      this.nextTouchX = event.screenX
      this.nextTouchY = event.screenY

      const distance = Math.abs(this.prevTouchY - this.nextTouchY)
      if (distance <= 20) {
        /* if distance less than 20 scroll horizontally */
        this.handleSwipeDirection(this.activeSlider, this.prevTouchX, this.nextTouchX)
      } else {
        /* else distance greater than 20 scroll vertically */
        this.handleSwipeDirection(this.activeSlider, this.prevTouchY, this.nextTouchY, 'vertical')
      }
    }

    /* touchstart/touchdown to handle tablet/iPad scrolling event */
    document.ontouchstart = event => {
      this.prevTouchX = event.changedTouches[0].screenX
      this.prevTouchY = event.changedTouches[0].screenY
    }

    document.ontouchend = event => {
      this.nextTouchX = event.changedTouches[0].screenX
      this.nextTouchY = event.changedTouches[0].screenY

      const distance = Math.abs(this.prevTouchY - this.nextTouchY)
      if (distance <= 20) {
        /* if distance less than 20 scroll horizontally */
        this.handleSwipeDirection(this.activeSlider, this.prevTouchX, this.nextTouchX)
      } else {
        /* else distance greater than 20 scroll vertically */
        this.handleSwipeDirection(this.activeSlider, this.prevTouchY, this.nextTouchY, 'vertical')
      }
    }

    if (window.innerHeight > 1801) {
      const tvStyle = Object.assign({}, customTourStyle)
      // tvStyle.tooltip.width = '30rem'
      // tvStyle.tooltip.height = '18rem'
      tvStyle.tooltip.padding = '1.6rem'
      tvStyle.tooltipContent.padding = '0'
      tvStyle.tooltipContent.minHeight = '1.4rem'
    }

    if (playlists.meta.status !== 'loading') {
      if (playlists.meta.status === 'success') {
        if (videos.meta.status === 'success' && !this.state.sportCategoryListSuccess) {
          this.initTour()
        }
      }
    }
  }

  componentDidUpdate() {
    const { playlists: { meta: { status: playlistStatus } }, videos: { meta: { status: videoStatus } } } = this.props.sport

    //update loading state
    if (playlistStatus === 'success') {
      if (videoStatus === 'success' && !this.state.sportCategoryListSuccess) {
        this.initTour()
      }
    }

    /* Auto Focus on page loaded, to enable keypress eventListener */
    var input = document.querySelector('.grid-slick')
    if (input && !flag) {
      input.click()
      flag = true
    }
  }

  initTour = () => {
    this.setState(
      {
        sportCategoryListSuccess: true,
      },
      () => {
        let isTourDone = localStorage.getItem('tour-sport')

        if (!isTourDone) {
          this.setState({
            startGuide: true,
          })
        }
      }
    )
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

  handleKeyboardEvent = () => {
    /** handle keyboard pressed */
    document.onkeyup = event => {
      ticking = false

      const { activeSlide } = this.state

      switch (event.which || event.keyCode) {
        case 37 /* left */:
          console.log('LEFT: ', this.handleSwipeDirection(this.activeSlider, 0, 1000))
          return event.preventDefault()
        case 38 /* up */:
          this.handleScrollToIndex(this.state.scrollIndex - 1)
          break
        case 39 /* right */:
          console.log('RIGHT: ', this.handleSwipeDirection(this.activeSlider, 1000, 0))
          return event.preventDefault()
        case 40 /* down */:
          this.handleScrollToIndex(this.state.scrollIndex + 1)
          break
        case 13 /* enter */:
          window.location.href = `/movie-detail/${activeSlide.id}`
          break
        case 32 /* space */:
          window.location.href = `/movie-detail/${activeSlide.id}`
          break
        default:
          event.preventDefault()
          break
      }
    }
  }

  handleSwipeDirection(slider, prevX, nextX, mode = 'horizontal') {
    const distance = Math.abs(prevX - nextX),
      { sliderRefs, scrollIndex } = this.state

    if (mode === 'vertical') {
      if (this.rootSlider) {
        if (this.rootSlider.innerSlider === null) {
          return false
        }
        if (distance <= 20) {
          // do nothing
        } else if (prevX > nextX) {
          this.rootSlider.slickNext()
        } else {
          this.rootSlider.slickPrev()
        }
      }
    } else {
      if (slider) {
        if (slider.innerSlider === null) {
          return false
        }
        if (distance <= 20) {
          // do nothing
        } else if (prevX > nextX) {
          sliderRefs[scrollIndex].slickNext()
        } else {
          sliderRefs[scrollIndex].slickPrev()
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
  }

  handleColorChange = (index, swipeIndex = 0) => {
    const that = this
    setTimeout(function() {
      // that.props.onUpdatePlaylist(activePlaylist.id)
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
        that.setState({
          scrollIndex: index,
          swipeIndex,
          activeSlide: videos.data[index].data[swipeIndex],
          activeSlideDots: videos.data[index].data,
        })
      }

      /* Auto Focus on page loaded, to enable keypress eventListener */
      var input = document.querySelector('.grid-slick')
      if (input && !flag) {
        input.click()
      }
    }, 300)
  }

  /* Collection of sliders */
  handleUpdateSlider = refs => {
    const { sliderRefs } = this.state
    if (sliderRefs.length < trackedPlaylistIds.length) {
      sliderRefs.push(refs)
    }
    sliderRefs.sort((a, b) => a.props.id - b.props.id)
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
    // console.log('under render', this.props.sport) //data exist
    const isSafari = /.*Version.*Safari.*/.test(navigator.userAgent),
      {
        playlists,
        playlists: { meta: { status: playlistStatus = 'loading', error: playlistError = '' } },
        videos,
        videos: { meta: { status: videoStatus = 'loading', error: videoError = '' } },
      } = this.props.sport,
      { locale, isDark, startGuide, steps, sportCategoryListSuccess, stepIndex, sliderRefs, scrollIndex, swipeIndex, activeSlide, activeSlideDots } = this.state,
      settings = {
        ...SETTINGS_VERTICAL,
        className: styles.sport__slick_slider_fade,
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

    let filteredDesc = ''
    let filteredQuote = ''
    if (activeSlide) {
      filteredDesc = filterString(activeSlide.description, 36)
      filteredQuote = `“${filterString(activeSlide.quotes.attributes.text, 28)}” - ${activeSlide.quotes.attributes.author}`
    }
    const validationMatchCards = this.props.sport.playlists.data
    // console.log('checking data', this.props.sport.playlists.data[0])
    // console.log('result mola-soc', validationMatchCards.id)
    // console.log('test data', playlists)

    return (
      <Fragment>
        {/* <Joyride
          disableOverlayClose={true}
          stepIndex={stepIndex}
          continuous
          showSkipButton
          steps={steps}
          run={startGuide}
          styles={customTourStyle}
          floaterProps={{ disableAnimation: true }}
          callback={this.handleTourCallback}
        /> */}

        <div>
          {playlistStatus !== 'error' && <Header libraryOff searchOff activeMenu="sport" className={styles.placeholder__header} isDark={isDark} activePlaylist={activePlaylist} {...this.props} />}
          {playlistStatus === 'loading' && videoStatus === 'loading' && <SportPlaceholder />}
          {playlistStatus === 'error' && <SportError status={playlistErrorCode} message={playlistError || 'Mola TV playlist is not loaded'} />}
          {videoStatus === 'error' && <SportError status={videoErrorCode} message={videoError || 'Mola TV video is not loaded'} />}
          {videos &&
            videos.data.length > 0 &&
            videos.data.length === playlists.data.length && (
              <>
                <div className={styles.sport__gradient} />
                <div className={styles.sport__sidebar}>
                  <SportMobileMenu playlists={this.state.playlists.data} activeIndex={scrollIndex} isDark={0} onClick={this.handleScrollToIndex} />
                  {/* {console.log('uuuuuu', this.state.playlists.data)} */}
                </div>
                <LazyLoad containerClassName={styles.sport_header__playlist_title}>
                  <div>{this.state.playlists.data[scrollIndex].title}</div>
                </LazyLoad>
                {activeSlide && (
                  <LazyLoad containerClassName={`${styles.header__detail_container} ${0 ? styles.black : styles.white}`}>
                    <h1 className={styles[activeSlide.title.length > 24 ? 'small' : 'big']}>{activeSlide.title}</h1>
                    <p>{filteredDesc}</p>
                    {/* <p className={styles.quote}>{filteredQuote}</p> ${activeSlide.id} */}
                    <Link to={'/watch?v=vd56611105'} className={`${styles.sport__detail_button} ${0 ? styles.black : styles.white} tourMovieDetail`}>
                      <span className={styles.play_icon} />
                      <p>{locale['view_movie']}</p>
                    </Link>
                    {/* <div className={styles.sport__live_label}>{locale['info_movie']}</div> */}
                  </LazyLoad>
                )}
                {/* {validationMatchCards.id == 'mola-soc' ? (
                  <div className={styles.sport_schedule_container} style={{ bottom: '20px' }}>
                    <LiveNowUpcomingSchedule />
                  </div>
                ) : null} */}
                <div className={styles.sport_schedule_container} style={{ bottom: '20px' }}>
                  <LiveNowUpcomingSchedule />
                </div>
                <Slider
                  {...settings}
                  ref={node => {
                    this.rootSlider = node
                  }}
                >
                  {videos &&
                    videos.data.length > 0 &&
                    videos.data.map((video, index) => {
                      const { id, sortOrder } = video.meta
                      return <SportMobileContent key={id} videos={video.data} index={scrollIndex} updateSlider={this.handleUpdateSlider} updateColorChange={this.handleColorChange} />
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
  // console.log('checking result sport state', state)
  return {
    ...state,
  }
}

const mapDispatchToProps = dispatch => ({
  onHandlePlaylist: () => dispatch(sportActions.getSportList()),
  onHandleVideo: playlist => dispatch(sportActions.getSportVideo(playlist)),
  onUpdatePlaylist: id => dispatch(sportActions.updateActivePlaylist(id)),
})

export default compose(withStyles(styles, contentStyles), connect(mapStateToProps, mapDispatchToProps))(Sport)

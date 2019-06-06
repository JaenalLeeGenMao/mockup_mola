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

import logoLandscapeBlue from '@global/style/icons/mola-landscape-blue.svg'

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
import { filterString, setMultilineEllipsis } from './util'
import { SETTINGS_VERTICAL } from '../const'
import { tourSteps } from './const'

let activePlaylist
let deferredPrompt
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
    //add
    startGuide: false,
    stepIndex: 0,
    steps: tourSteps[this.props.user.lang],
    sliderRefs: [],
    playlistSuccess: false,
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
  //added

  handleTourCallback = data => {
    const { type, action, index } = data
    const { videos } = this.props.home

    if (type === EVENTS.TOUR_END) {
      localStorage.setItem('tour-home', true)
      // document.cookie = '__trh=1; path=/;';
      return true
    }

    if (type === EVENTS.STEP_AFTER && action === ACTIONS.NEXT) {
      this.setState({
        stepIndex: index + 1,
      })
      // alert('next')
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
      // alert('prev')
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

  componentDidUpdate() {
    const { playlists, videos } = this.props.home

    if (playlists.meta.status === 'success') {
      if (videos.meta.status === 'success' && !this.state.playlistSuccess) {
        this.initTour()
      }
    }
  }

  componentDidMount() {
    /* set the default active playlist onload */
    if (this.state.playlists.data.length > 0) {
      activePlaylist = this.state.playlists.data[0]
      this.props.onUpdatePlaylist(activePlaylist.id)
    }
    setMultilineEllipsis('filteredText')

    document.body.addEventListener('touchmove', this.preventDefault, {
      passive: false,
    })

    this.prevTouchX = 0
    this.nextTouchX = 0
    this.prevTouchY = 0
    this.nextTouchY = 0

    document.ontouchstart = event => {
      this.prevTouchX = event.changedTouches[0].screenX
      this.prevTouchY = event.changedTouches[0].screenY
    }

    document.ontouchend = event => {
      this.nextTouchX = event.changedTouches[0].screenX
      this.nextTouchY = event.changedTouches[0].screenY

      const distance = Math.abs(this.prevTouchY - this.nextTouchY)
      if (distance <= window.innerHeight * 0.2) {
        /* if distance less than 20 scroll horizontally */
        this.handleSwipeDirection(this.activeSlider, this.prevTouchX, this.nextTouchX)
      } else {
        /* else distance greater than 20 scroll vertically */
        this.handleSwipeDirection(this.activeSlider, this.prevTouchY, this.nextTouchY, 'vertical')
      }
    }

    // Prompt user to AddToHomeScreen
    window.addEventListener('beforeinstallprompt', e => {
      // Prevent Chrome 67 and earlier from automatically showing the prompt
      // e.preventDefault()
      // Stash the event so it can be triggered later.
      deferredPrompt = e

      const a2hsInstalled = localStorage.getItem('a2hs')
      if (!a2hsInstalled) {
        // Update UI notify the user they can add to home screen
        this.a2hsContainer.style.display = 'flex'
      }
    })

    this.btnAdd.addEventListener('click', e => {
      // hide our user interface that shows our A2HS button
      this.a2hsContainer.style.display = 'none'
      // Show the prompt
      deferredPrompt.prompt()
      // Wait for the user to respond to the prompt
      deferredPrompt.userChoice.then(choiceResult => {
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted the A2HS prompt')
          localStorage.setItem('a2hs', true)
        } else {
          console.log('User dismissed the A2HS prompt')
          localStorage.setItem('a2hs', false)
        }
        deferredPrompt = null
      })
    })

    window.addEventListener('appinstalled', evt => {
      app.logEvent('a2hs', 'installed')
      localStorage.setItem('a2hs', true)
    })
  }

  handleSwipeDirection(slider, prevX, nextX, mode = 'horizontal') {
    const distance = Math.abs(prevX - nextX),
      { sliderRefs, scrollIndex } = this.state

    if (mode === 'vertical') {
      if (this.rootSlider) {
        if (this.rootSlider.innerSlider === null) {
          return false
        }
        if (distance <= window.innerHeight * 0.25) {
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
        if (distance <= window.innerWidth * 0.2) {
          // do nothing
        } else if (prevX > nextX) {
          sliderRefs[scrollIndex].slickNext()
        } else {
          sliderRefs[scrollIndex].slickPrev()
        }
      } else {
        if (distance <= window.innerWidth * 0.2) {
          // do nothing
        } else if (prevX > nextX) {
          sliderRefs[0].slickNext()
        } else {
          sliderRefs[0].slickPrev()
        }
      }
    }
  }

  initTour = () => {
    this.setState(
      {
        playlistSuccess: true,
      },
      () => {
        let isTourDone = localStorage.getItem('tour-home')

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
  }

  preventDefault = e => {
    e.preventDefault()
  }

  handleColorChange = (index, swipeIndex = 0) => {
    const that = this
    this.activeSlider = this.state.sliderRefs[index]
    setTimeout(function() {
      // that.props.onUpdatePlaylist(activePlaylist.id)
      const activeSlick = document.querySelector(`.slick-active .${contentStyles.content__container} .slick-active .grid-slick`),
        { videos, sliderRefs } = that.state
      let isDark = 1
      if (activeSlick) {
        isDark = parseInt(activeSlick.getAttribute('isdark'), 10)
      }
      if (typeof isDark === 'number') {
        that.setState({ isDark, activeSlide: videos.data[0].data[0] })
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

  handleUpdateSlider = refs => {
    const { sliderRefs } = this.state
    if (sliderRefs.length < trackedPlaylistIds.length) {
      sliderRefs.push(refs)
    }
    sliderRefs.sort((a, b) => a.props.id - b.props.id)
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
      filteredDesc = activeSlide.description
      filteredQuote = activeSlide.quotes && `“${filterString(activeSlide.quotes.attributes.text, 15)}” - ${activeSlide.quotes.attributes.author}`
    }

    return (
      <Fragment>
        {/* <Joyride
          disableOverlayClose={true} //
          stepIndex={stepIndex} //
          continuous // ?
          showSkipButton
          steps={steps}
          run={startGuide}
          styles={customTourStyle} //uk
          floaterProps={{ disableAnimation: true }}
          callback={this.handleTourCallback}
        /> */}

        <div>
          <div
            ref={node => {
              this.a2hsContainer = node
            }}
            className={styles.home__a2hs_container}
          >
            <div className={styles.home__logo}>
              <img alt="molatv" src={logoLandscapeBlue} />
            </div>
            <div
              ref={node => {
                this.btnAdd = node
              }}
            >
              ADD TO HOME SCREEN
            </div>
            <div
              onClick={() => {
                // hide our user interface that shows our A2HS button
                this.a2hsContainer.style.display = 'none'
                localStorage.setItem('a2hs', false)
              }}
            >
              ✖
            </div>
          </div>
          {playlistStatus !== 'error' && <Header libraryOff className={styles.placeholder__header} isDark={0} activePlaylist={activePlaylist} isMobile {...this.props} />}
          {playlistStatus === 'loading' && videoStatus === 'loading' && <HomePlaceholder />}
          {playlistStatus === 'error' && <HomeError status={playlistErrorCode} message={playlistError || 'Mola TV playlist is not loaded'} />}
          {videoStatus === 'error' && <HomeError status={videoErrorCode} message={videoError || 'Mola TV video is not loaded'} />}
          {videos &&
            videos.data.length > 0 &&
            videos.data.length === playlists.data.length && (
              <>
                {/* <div className={styles.home__gradient} /> */}
                <div className={styles.home__sidebar}>
                  <HomeMobileMenu playlists={playlists.data} activeIndex={scrollIndex} isDark={isDark} className="tourCategory" />
                </div>
                {activeSlide && (
                  <LazyLoad containerClassName={`${styles.header__detail_container} ${0 ? styles.black : styles.white}`}>
                    <h1 className={styles[activeSlide.title.length > 16 ? 'small' : 'big']}>{activeSlide.title}</h1>
                    <p className="filteredText">{filteredDesc}</p>
                    <p className={`${styles.quote} filteredText`}>{filteredQuote}</p>
                    {!activeSlide.buttonText &&
                      scrollIndex != 0 && (
                        <Link to={`/movie-detail/${activeSlide.id}`} className={`${styles.home__detail_button} ${0 ? styles.black : styles.white} tourMovieDetail`}>
                          <span className={`${styles.icon__view_movie} ${0 ? styles.black : styles.white}`} />
                        </Link>
                      )}
                    {/* {activeSlide.buttonText && (
                      <Link to={`${activeSlide.link ? activeSlide.link : ''}`} className={`${styles.home__detail_button_text} ${0 ? styles.black : styles.white} tourMovieDetail`}>
                        <p>{activeSlide.buttonText ? activeSlide.buttonText : ''}</p>
                      </Link>
                    )} */}
                  </LazyLoad>
                )}
                <div className={styles.header__library_link_wrapper}>
                  {activeSlideDots && activeSlideDots.length > 1 && <HomeMobileMenu playlists={activeSlideDots} activeIndex={swipeIndex} isDark={0} type="horizontal" className="tourSlide" />}
                </div>
                <Slider
                  {...settings}
                  id="rootSlider"
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
  onHandleVideo: playlist => dispatch(homeActions.getHomeVideo(playlist, true)),
  onUpdatePlaylist: id => dispatch(homeActions.updateActivePlaylist(id)),
})

export default compose(withStyles(styles, contentStyles), connect(mapStateToProps, mapDispatchToProps))(Home)

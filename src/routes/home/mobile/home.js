import React, { Component, Fragment } from 'react'
import Slider from 'react-slick'
import { connect } from 'react-redux'
import { compose } from 'redux'

import withStyles from 'isomorphic-style-loader/lib/withStyles'

import { Link as RSLink, Element, Events, scroller } from 'react-scroll'

import { SETTINGS } from '../const'
import homeActions from '@actions/home'

import { swipeGestureListener, getErrorCode } from '@routes/home/util'

import Header from '@components/Header'
import LazyLoad from '@components/common/Lazyload'
import Link from '@components/Link'

import HomeArrow from '../arrow'
import HomeMobileContent from '../content'
import HomeMobileMenu from '../menu'
import HomePlaceholder from './placeholder'
import HomeError from '@components/common/error'

import styles from './home.css'
import customArrowStyles from '../arrow/arrow-mobile.css'
import Joyride from 'react-joyride'
import { EVENTS, ACTIONS } from 'react-joyride/lib/constants'
import TourArrow from '../tourArrow'
import _get from 'lodash/get'

let ticking = false,
  activePlaylist,
  scrollIndex = 0

const trackedPlaylistIds = [] /** tracked the playlist/videos id both similar */

class Home extends Component {
  state = {
    isDark: undefined,
    isMenuOpen: false,
    playlists: [],
    videos: [],
    startGuide: false,
    stepIndex: 0,
    steps: [
      {
        target: '.tourCategory',
        title: 'Movie Category',
        content: (
          <div>
            To navigate around different movie categories, you can simply click the navigation button or swipe <span className={styles.swipeUpIcon} /> up and down on your awesome keyboard
          </div>
        ),
        placement: 'right',
        disableBeacon: true,
        styles: {
          tooltip: {
            maxWidth: '100%',
          },
        },
      },
      {
        target: '.tourSlide',
        title: 'Highlighted Movies',
        content: (
          <div>
            {' '}
            You can browse through our top movies in each category with gentle click on the arrow buttons or using keyboards and swipe <span className={styles.swipeNextIcon} /> right and left
          </div>
        ),
        placement: 'top',
        disableBeacon: true,
      },
      {
        target: '.tourLibrary',
        title: 'Movie Library',
        content: 'You can click this icon to view all movie list per category',
        placement: 'bottom',
        disableBeacon: true,
      },
      {
        target: '.tourMovieDiscover',
        title: 'Discover Our Movie',
        content: 'Click this button to discover our awesome list of movies',
        placement: 'top',
        disableBeacon: true,
      },
      {
        target: '.tourMovieDetail',
        title: 'View Movie Detail',
        content: 'Click this button to watch movie and view movie detail: synopsis, testimonial, cast, and trailer',
        placement: 'top',
        disableBeacon: true,
        locale: { last: 'Finish' },
      },
    ],
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { onUpdatePlaylist, onHandlePlaylist, onHandleVideo, home: { playlists } } = nextProps

    if (playlists.meta.status === 'loading' && prevState.playlists.length <= 0) {
      onHandlePlaylist()
    } else if (prevState.videos.length <= 0) {
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
    return { ...prevState, playlists }
  }

  componentDidMount() {
    /** swipe EventListener start */
    window.onload = swipeGestureListener()
    const handleSwipeEvent = e => {
      // console.log(e.type,e)
      this.handleSwipe(e)
    }

    document.body.addEventListener('swl', handleSwipeEvent, false)
    document.body.addEventListener('swr', handleSwipeEvent, false)
    document.body.addEventListener('swu', handleSwipeEvent, false)
    document.body.addEventListener('swd', handleSwipeEvent, false)
    /** swipe EventListener ends */

    // window.addEventListener('scroll', this.handleScroll);
    Events.scrollEvent.register('begin', this.handleScroll)
    Events.scrollEvent.register('end', this.handleColorChange)

    const { playlists, videos } = this.props.home

    if (playlists.meta.status !== 'loading') {
      if (playlists.meta.status === 'success') {
        if (videos.meta.status === 'success' && !this.state.playlistSuccess) {
          this.setState(
            {
              playlistSuccess: true,
            },
            () => {
              let isTourDone = localStorage.getItem('tour-home')

              if (isTourDone) {
                for (var i = 0; i < videos.data.length; i++) {
                  if (document.getElementsByClassName('tourSlideWrapper').length > 0) {
                    document.getElementsByClassName('tourSlideWrapper')[0].remove()
                  }
                }
              } else {
                var stepsProp = { ...this.state.steps }
                stepsProp[0].styles.tooltip.width = window.innerWidth - 90 + 'px'

                this.setState({
                  steps: stepsProp,
                  startGuide: true,
                })
                for (var i = 1; i < videos.data.length; i++) {
                  document.getElementsByClassName('tourSlideWrapper')[1].remove()
                }
              }
            }
          )
        }
      }
    }

    document.body.addEventListener('touchmove', this.preventDefault, {
      passive: false,
    })
  }

  componentWillUnmount() {
    // window.removeEventListener('scroll', this.handleScroll);
    Events.scrollEvent.remove('begin')
    Events.scrollEvent.remove('end')

    for (let i = 0; i < 100; i += 1) {
      window.clearInterval(i)
    }

    document.body.removeEventListener('touchmove', this.preventDefault)
  }

  componentDidUpdate() {
    const { playlists: { meta: { status: playlistStatus } }, videos, videos: { meta: { status: videoStatus } } } = this.props.home
    //update loading state
    if (playlistStatus === 'success') {
      if (videoStatus === 'success' && !this.state.playlistSuccess) {
        this.setState(
          {
            playlistSuccess: true,
          },
          () => {
            let isTourDone = localStorage.getItem('tour-home')

            if (isTourDone) {
              for (var i = 0; i < videos.data.length; i++) {
                if (document.getElementsByClassName('tourSlideWrapper').length > 0) {
                  document.getElementsByClassName('tourSlideWrapper')[0].remove()
                }
              }
            } else {
              var stepsProp = { ...this.state.steps }
              stepsProp[0].styles.tooltip.width = window.innerWidth - 90 + 'px'

              this.setState({
                steps: stepsProp,
                startGuide: true,
              })

              for (var i = 1; i < videos.data.length; i++) {
                document.getElementsByClassName('tourSlideWrapper')[1].remove()
              }
            }
          }
        )
      }
    }
  }

  preventDefault = e => {
    e.preventDefault()
  }

  handleColorChange = () => {
    const that = this
    setTimeout(function() {
      const activeSlick = document.querySelector('.active .slick-active .grid-slick')
      let isDark = 1
      if (activeSlick) {
        isDark = parseInt(activeSlick.getAttribute('isdark'), 10)
      }
      const inactiveArrows = document.querySelectorAll(`.${styles.home__slider_container} .${customArrowStyles.home__arrow}`)
      const activeArrows = document.querySelectorAll(`.${styles.home__slider_container}.active .${customArrowStyles.home__arrow}`)
      if (typeof isDark === 'number') {
        that.setState({ isDark })

        inactiveArrows.forEach(arr => {
          arr.style.visibility = 'hidden'
        })

        activeArrows.forEach(arr => {
          arr.style.visibility = 'visible'
        })
      }
    }, 200)
  }

  handleScroll = () => {
    const { playlists, videos } = this.props.home
    if (playlists.meta.status === 'error' || videos.meta.status === 'error') {
      scrollIndex = 0
      return true
    }
    playlists.data.map((playlist, index) => {
      if (playlist.isActive) {
        scrollIndex = index
        return false
      }
      return true
    })

    if (!ticking) {
      document.onkeyup = event => {
        ticking = false

        switch (event.which || event.keyCode) {
          case 37 /* left */:
            this.handleSlidePrev(scrollIndex)
            return event.preventDefault()
          case 38 /* up */:
            scrollIndex -= 1
            this.handleKeyPress(scrollIndex)
            break
          case 39 /* right */:
            this.handleSlideNext(scrollIndex)
            return event.preventDefault()
          case 40 /* down */:
            scrollIndex += 1
            this.handleKeyPress(scrollIndex)
            break
          default:
            event.preventDefault()
            break
        }
      }

      ticking = true
    }
  }

  handleSwipe = event => {
    const { playlists, videos } = this.props.home

    if (playlists.meta.status === 'error' || videos.meta.status === 'error') {
      return true
    }
    playlists.data.map((playlist, index) => {
      if (playlist.isActive) {
        scrollIndex = index
        return false
      }
      return true
    })
    switch (event.type) {
      case 'swr' /* slide to left ~ swipe right */:
        this.handleSlidePrev(scrollIndex)
        return event.preventDefault()
      case 'swd' /* slide up ~ swipe down */:
        scrollIndex -= 1
        this.handleKeyPress(scrollIndex)
        break
      case 'swl' /* slide to right ~ swipe left */:
        this.handleSlideNext(scrollIndex)
        return event.preventDefault()
      case 'swu' /* slide down ~ swipe up */:
        scrollIndex += 1
        this.handleKeyPress(scrollIndex)
        break
      default:
        event.preventDefault()
        break
    }
  }

  handleToggleMenu = () => {
    const { isMenuOpen } = this.state
    this.setState({ isMenuOpen: !isMenuOpen })
  }

  handleKeyPress = scrollIndex => {
    const { data: playlists } = this.props.home.playlists
    if (scrollIndex < 0) {
      scrollIndex = playlists.length - 1
    }
    if (scrollIndex > playlists.length - 1) {
      scrollIndex = 0
    }

    // const result = playlists
    //   .map((playlist, index) => {
    //     if (index === scrollIndex) {
    //       this.handleColorChange();
    //       return playlist;
    //     }
    //   })
    //   .filter(data => data !== undefined);
    // if (result && result.length >= 1) {
    //   this.handleScrollToIndex(result[0].id);
    // }
    this.handleColorChange()
    this.handleScrollToIndex(playlists[scrollIndex].id)
  }

  handleScrollToIndex = id => {
    const { playlists } = this.props.home
    playlists.data.map((playlist, index) => {
      if (id === playlist.id) {
        scroller.scrollTo(id, {
          duration: 250,
          delay: 0,
          smooth: 'easeInOutBounce',
        })
        this.props.onUpdatePlaylist(id)
        scrollIndex = index
        return false
      }
      return true
    })
  }

  getCurrentScreenHeight = () => {
    const innerHeight = window.innerHeight - 32
    return innerHeight
  }

  handleSlideNext = (scrollIndex = 0) => {
    try {
      this.getCurrentScreenHeight()
      this.sliderRefs.sort((a, b) => a.sortOrder - b.sortOrder)
      if (this.sliderRefs[scrollIndex] && this.sliderRefs[scrollIndex].slickNext()) {
        this.sliderRefs[scrollIndex].slickNext()
      }
    } catch {}
  }

  handleSlidePrev = (scrollIndex = 0) => {
    try {
      this.getCurrentScreenHeight()
      this.sliderRefs.sort((a, b) => a.sortOrder - b.sortOrder)
      if (this.sliderRefs[scrollIndex] && this.sliderRefs[scrollIndex].slickPrev()) {
        this.sliderRefs[scrollIndex].slickPrev()
      }
    } catch {}
  }

  handleTourCallback = data => {
    const { type, action, index } = data
    const { videos } = this.props.home

    if (type === EVENTS.TOUR_END) {
      for (var i = 0; i < videos.data.length; i++) {
        if (document.getElementsByClassName('tourSlideWrapper').length > 0) {
          document.getElementsByClassName('tourSlideWrapper')[0].remove()
        }
      }
      localStorage.setItem('tour-home', true)
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

  render() {
    const isSafari = /.*Version.*Safari.*/.test(navigator.userAgent),
      {
        playlists,
        playlists: { meta: { status: playlistStatus = 'loading', error: playlistError = '' } },
        videos,
        videos: { meta: { status: videoStatus = 'loading', error: videoError = '' } },
      } = this.props.home,
      { isDark, startGuide, steps, playlistSuccess, stepIndex } = this.state,
      settings = {
        ...SETTINGS,
        className: styles.home__slick_slider_fade,
        onInit: () => {
          this.handleColorChange()
        },
        afterChange: () => {
          this.handleColorChange()
        },
      },
      playlistErrorCode = getErrorCode(playlistError),
      videoErrorCode = getErrorCode(videoError)
    let activePlaylist = playlists.data.length > 1 && playlists.data.filter(playlist => playlist.isActive)[0]

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
    return (
      <Fragment>
        <Joyride
          stepIndex={stepIndex}
          disableOverlayClose={true}
          continuous
          showSkipButton
          steps={steps}
          run={startGuide}
          styles={customTourStyle}
          floaterProps={{ disableAnimation: true }}
          callback={this.handleTourCallback}
        />
        <div>
          {playlistStatus !== 'error' && <Header libraryOff className={styles.placeholder__header} isDark={isDark} activePlaylist={activePlaylist} isMobile {...this.props} />}
          {playlistStatus === 'loading' && videoStatus === 'loading' && <HomePlaceholder />}
          {playlistStatus === 'error' && <HomeError status={playlistErrorCode} message={playlistError || 'MOLA playlist is not loaded'} />}
          {videoStatus === 'error' && <HomeError status={videoErrorCode} message={videoError || 'MOLA video is not loaded'} />}
          {playlistSuccess && (
            <div>
              <HomeMobileMenu isDark={false} playlists={playlists.data} onClick={this.handleScrollToIndex} isMobile />
              <LazyLoad containerClassName={styles.header__library_link_wrapper}>
                <Link to={`/movie-library${activePlaylist ? `/${activePlaylist.id.replace('f-', '')}` : ''}`} style={{ color: '#fff' }}>
                  <span className={`${styles['header__library_logo_white']} tourLibrary`} alt="library" />
                </Link>
              </LazyLoad>
            </div>
          )}
          {playlistSuccess &&
            videos &&
            videos.data.length > 0 &&
            videos.data.length === playlists.data.length &&
            videos.data.map(video => {
              const { id, sortOrder } = video.meta
              return (
                <RSLink activeClass="active" to={id} spy smooth className={styles.home__slider_container} key={id}>
                  <Element name={id}>
                    <TourArrow isDark={isDark} isMobile />
                    <Slider
                      ref={node => {
                        if (!this.sliderRefs) {
                          this.sliderRefs = []
                          this.trackedSliderIds = []
                        }
                        if (this.trackedSliderIds.indexOf(id) === -1 && this.sliderRefs.length < trackedPlaylistIds.length && node !== null) {
                          node = {
                            ...node,
                            id,
                            sortOrder,
                          }
                          this.trackedSliderIds.push(id)
                          return this.sliderRefs.push(node)
                        }
                      }}
                      {...settings}
                      prevArrow={<HomeArrow direction="prev" isDark={isDark} id={id} sliderRefs={this.sliderRefs} isMobile />}
                      nextArrow={<HomeArrow direction="next" isDark={isDark} id={id} sliderRefs={this.sliderRefs} isMobile />}
                    >
                      {video.data.map(eachVids => {
                        return <HomeMobileContent {...eachVids} key={eachVids.id} isSafari={isSafari} isMobile getCurrentScreenHeight={this.getCurrentScreenHeight} sliderRefs={this.sliderRefs} />
                      })}
                    </Slider>
                  </Element>
                </RSLink>
              )
            })}
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

export default compose(withStyles(styles, customArrowStyles), connect(mapStateToProps, mapDispatchToProps))(Home)

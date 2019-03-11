import React, { Fragment, Component } from 'react'
import Slider from 'react-slick'
import { Link as RSLink, Element, Events, scroller } from 'react-scroll'
import { connect } from 'react-redux'
import { compose } from 'redux'
import Joyride from 'react-joyride'
import { EVENTS, ACTIONS } from 'react-joyride/lib/constants'
import $ from 'jquery'
import { get } from 'axios'

import withStyles from 'isomorphic-style-loader/lib/withStyles'
import _get from 'lodash/get'

import homeActions from '@actions/home'

import { getErrorCode } from '@routes/home/util'

import Header from '@components/Header'
import HomeError from '@components/common/error'

import HomeArrow from '../arrow'
import HomeDesktopContent from '../content'
import HomeDesktopMenu from '../menu'
import HomePlaceholder from './placeholder'

import { SETTINGS } from '../const'
import styles from './home.css'
import TourArrow from '../tourArrow'
import { tourSteps } from './const'

let ticking = false,
  activePlaylist,
  scrollIndex = 0,
  flag = false

const trackedPlaylistIds = [] /** tracked playlist/videos id both similar */

let customTourStyle = {
  buttonNext: {
    backgroundColor: '#2C56FF',
    fontSize: '1.3rem',
    lineHeight: '1rem',
    padding: '0.8rem 1.5rem',
    textTransform: 'uppercase',
    letterSpacing: '0.167rem',
    borderRadius: '3rem',
    fontWeight: '600',
  },
  buttonBack: {
    color: '#000000',
    fontSize: '1.3rem',
    textTransform: 'uppercase',
    letterSpacing: '0.167rem',
    fontWeight: '600',
    marginRight: '0.5rem',
  },
  buttonClose: {
    display: 'none',
  },
  buttonSkip: {
    color: '#000000',
    fontWeight: '600',
    fontSize: '1.3rem',
    textTransform: 'uppercase',
    letterSpacing: '0.167rem',
    padding: '0',
  },
  tooltipContent: {
    fontSize: '1.3rem',
    padding: '0 0 2rem',
    textAlign: 'left',
    color: '#858585',
    lineHeight: '1.5',
    letterSpacing: '0.5px',
  },
  tooltipTitle: {
    fontSize: '1.4rem',
    textAlign: 'left',
    margin: '0 0 0.8rem',
    letterSpacing: '0.59px',
    textTransform: 'uppercase',
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  spotlight: {
    borderRadius: '4rem',
    position: 'absolute',
    transform: 'scale(.99, .95) translateY(1%)',
  },
  tooltip: {
    width: '30rem',
    borderRadius: '.4rem',
  },
}

class Home extends Component {
  state = {
    isDark: undefined,
    playlists: [],
    videos: [],
    playlistSuccess: false,
    startGuide: false,
    stepIndex: 0,
    steps: tourSteps[this.props.user.lang],
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { onUpdatePlaylist, onHandlePlaylist, onHandleVideo, home: { playlists }, runtime } = nextProps
    // console.log(runtime)
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
    // const gtUrl = 'https://stag.mola.tv/accounts/_/v1/guest/token?app_key=wIHGzJhset'
    // const guest_token = get(gtUrl, {
    //   headers: {
    //     Origin: 'https://stag.mola.tv',
    //     Referer: 'https://stag.mola.tv',
    //   },
    // })

    // guest_token.then(response => console.log('CLIENT', response.data))
    if (activePlaylist) {
      flag = false /* Set to false upon loading, so must execute only once */
      scrollIndex = 0
      this.props.onUpdatePlaylist(this.state.playlists.data[scrollIndex].id)
    }

    Events.scrollEvent.register('begin', this.handleScroll)
    Events.scrollEvent.register('end', this.handleColorChange)

    if (window.innerHeight > 1801) {
      const tvStyle = Object.assign({}, customTourStyle)
      // tvStyle.tooltip.width = '30rem'
      // tvStyle.tooltip.height = '18rem'
      tvStyle.tooltip.padding = '1.6rem'
      tvStyle.tooltipContent.padding = '0'
      tvStyle.tooltipContent.minHeight = '1.4rem'
    }

    const { playlists, videos } = this.props.home

    if (playlists.meta.status !== 'loading') {
      if (playlists.meta.status === 'success') {
        if (videos.meta.status === 'success' && !this.state.playlistSuccess) {
          this.setState(
            {
              playlistSuccess: true,
            },
            () => {
              // let isTourDone = _get(document, 'cookie', '')
              //   .trim()
              //   .split(';')
              //   .filter(function(item) {
              //     return item.indexOf('__trh=') >= 0;
              //   });

              let isTourDone = localStorage.getItem('tour-home')

              if (isTourDone) {
                for (var i = 0; i < videos.data.length; i++) {
                  if (document.getElementsByClassName('tourSlideWrapper').length > 0) {
                    document.getElementsByClassName('tourSlideWrapper')[0].remove()
                  }
                }
              } else {
                this.setState({
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
  }

  componentWillUnmount() {
    Events.scrollEvent.remove('begin')
    Events.scrollEvent.remove('end')

    // document.removeEventListener('mouseup', () => {}, false)
    // document.removeEventListener('mousedown', () => {}, false)
    // document.removeEventListener('keyup', () => {}, false)

    const mouseWheelEvent = /Firefox/i.test(navigator.userAgent) ? 'DOMMouseScroll' : 'wheel'

    /** handle mouse scroll */
    document.removeEventListener(mouseWheelEvent, this.mouseScrollCallback, true)
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
              this.setState({
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

    /* Auto Focus on page loaded, to enable keypress eventListener */
    var input = document.querySelector('.grid-slick')
    if (input && !flag) {
      input.click()
      flag = true
    }
  }

  handleColorChange = () => {
    const that = this
    setTimeout(function() {
      const activeSlick = document.querySelector('.active .slick-active .grid-slick')
      let isDark = 1
      if (activeSlick) {
        isDark = parseInt(activeSlick.getAttribute('isdark'), 10)
      }
      if (typeof isDark === 'number') {
        if (activeSlick) {
          that.currentMovieId = activeSlick.getAttribute('movieid')
        }
        that.setState({ isDark })
      }
    }, 100)
  }

  handleScroll = () => {
    const { playlists, videos } = this.props.home
    if (playlists.meta.status === 'error' || videos.meta.status === 'error') {
      scrollIndex = 0
      // return true
    }
    playlists.data.map((playlist, index) => {
      if (playlist.isActive) {
        scrollIndex = index
        return false
      }
      return true
    })

    if (!ticking) {
      // this.handleMouseClick()
      // this.handleMouseScroll()
      this.handleKeyboardEvent()

      ticking = true
    }
  }

  handleMouseClick = () => {
    /** handle mouse click */
    const that = this
    ;(this.prevMouseDownY = 0), (this.currentMouseDownY = 0)
    document.onmousedown = event => {
      ticking = false
      that.prevMouseDownY = event.y
    }

    document.onmouseup = event => {
      ticking = false
      that.currentMouseDownY = event.y

      if (that.prevMouseDownY < that.currentMouseDownY) {
        scrollIndex -= 1
        that.handleKeyPress(scrollIndex)
      } else if (that.prevMouseDownY > that.currentMouseDownY) {
        scrollIndex += 1
        that.handleKeyPress(scrollIndex)
      }
    }
  }

  mouseScrollCallback = event => {
    ticking = false
    const that = this

    clearTimeout($.data(that, 'scrollCheck'))
    $.data(
      that,
      'scrollCheck',
      setTimeout(function() {
        /* Determine the direction of the scroll (< 0 → up, > 0 → down). */
        var delta = (event.deltaY || -event.wheelDelta || event.detail) >> 10 || 1
        if (delta < 0) {
          scrollIndex += 1
          that.handleKeyPress()
          return
        } else if (delta > 0) {
          scrollIndex -= 1
          that.handleKeyPress()
          return
        }
      }, 500)
    )
  }

  handleMouseScroll = () => {
    const mouseWheelEvent = /Firefox/i.test(navigator.userAgent) ? 'DOMMouseScroll' : 'wheel'

    /** handle mouse scroll */
    document.addEventListener(mouseWheelEvent, this.mouseScrollCallback, true)
  }

  handleKeyboardEvent = () => {
    /** handle keyboard pressed */
    document.onkeyup = event => {
      ticking = false

      switch (event.which || event.keyCode) {
        case 37 /* left */:
          console.log('LEFT: ', this.sliderRefs[scrollIndex].slickPrev())
          return event.preventDefault()
        case 38 /* up */:
          scrollIndex -= 1
          this.handleKeyPress()
          break
        case 39 /* right */:
          console.log('RIGHT: ', this.sliderRefs[scrollIndex].slickNext())
          return event.preventDefault()
        case 40 /* down */:
          scrollIndex += 1
          this.handleKeyPress()
          break
        case 13 /* enter */:
          window.location.href = `/movie-detail/${this.currentMovieId}`
          break
        case 32 /* space */:
          window.location.href = `/movie-detail/${this.currentMovieId}`
          break
        default:
          event.preventDefault()
          break
      }
    }
  }

  handleKeyPress = () => {
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
    //       return { ...playlist };
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
          duration: 500,
          delay: 0,
          smooth: 'easeInOutQuart',
        })
        this.props.onUpdatePlaylist(id)
        scrollIndex = index
        return false
      }
      return true
    })
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
        // draggable: false,
        className: `${styles.home__slick_slider_fade} home-slider`,
        onInit: () => {
          this.handleColorChange()
        },
        afterChange: () => {
          this.handleColorChange()
        },
      },
      playlistErrorCode = getErrorCode(playlistError),
      videoErrorCode = getErrorCode(videoError)
    activePlaylist = playlists.data.length > 1 && playlists.data.filter(playlist => playlist.isActive)[0]

    return (
      <Fragment>
        <Joyride
          disableOverlayClose={true}
          stepIndex={stepIndex}
          continuous
          showSkipButton
          steps={steps}
          run={startGuide}
          styles={customTourStyle}
          floaterProps={{ disableAnimation: true }}
          callback={this.handleTourCallback}
        />

        <div className={styles.home__container}>
          {playlistStatus !== 'error' && <Header isDark={isDark} activePlaylist={activePlaylist} {...this.props} />}
          {playlistStatus === 'loading' && videoStatus === 'loading' && <HomePlaceholder />}
          {playlistStatus === 'error' && <HomeError status={playlistErrorCode} message={playlistError || 'MOLA playlist is not loaded'} />}
          {videoStatus === 'error' && videoError !== '' && <HomeError status={videoErrorCode} message={videoError || 'MOLA video is not loaded'} />}
          {playlistSuccess && <HomeDesktopMenu isDark={isDark} playlists={playlists.data} onClick={this.handleScrollToIndex} />}
          {playlistSuccess &&
            videos &&
            videos.data.length > 0 &&
            videos.data.length === playlists.data.length &&
            videos.data.map(video => {
              const { id, sortOrder } = video.meta
              return (
                <RSLink activeClass="active" to={id} spy smooth className={styles.home__slider_container} key={id}>
                  <Element name={id}>
                    <TourArrow isDark={isDark} />
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
                      prevArrow={<HomeArrow direction="prev" isDark={isDark} id={id} sliderRefs={this.sliderRefs} />}
                      nextArrow={<HomeArrow direction="next" isDark={isDark} id={id} sliderRefs={this.sliderRefs} />}
                    >
                      {video.data.map(eachVids => <HomeDesktopContent {...eachVids} key={eachVids.id} isSafari={isSafari} ticking={ticking} sliderRefs={this.sliderRefs} />)}
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

export default compose(withStyles(styles), connect(mapStateToProps, mapDispatchToProps))(Home)
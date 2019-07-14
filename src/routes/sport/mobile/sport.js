import React, { Component, Fragment } from 'react'
import Slider from 'react-slick'
// import { Link as RSLink, Element, Events, scroller } from 'react-scroll'
import { connect } from 'react-redux'
import { compose } from 'redux'
import Joyride from 'react-joyride'
import { EVENTS, ACTIONS } from 'react-joyride/lib/constants'
// import $ from 'jquery'

import withStyles from 'isomorphic-style-loader/lib/withStyles'
import _get from 'lodash/get'

import sportActions from '@actions/sport'

// import { logoLandscapeBlue } from '@global/imageUrl'

import { getErrorCode } from '@routes/sport/util'
import { getLocale } from '@routes/sport/locale'

import Header from '@components/Header'
import LazyLoad from '@components/common/Lazyload'
import Link from '@components/Link'

import SportError from '@components/common/error'
import SportPlaceholder from './placeholder'
// import SportArrow from '../arrow'
import SportMobileContent from './content'
import SportMobileMenu from './menu'

import styles from './sport.css'
import contentStyles from './content/content.css'
import { filterString, setMultilineEllipsis } from './util'
import { SETTINGS_MOBILE } from '../const'
import { tourSteps } from './const'
import { isMatchLive, isMatchPassed } from '@source/lib/dateTimeUtil'

let activePlaylist
const trackedPlaylistIds = [] /** tracked the playlist/videos id both similar */

class Sport extends Component {
  state = {
    locale: getLocale(),
    isLandscape: false,
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
    const { onUpdatePlaylist, onHandlePlaylist, onHandleVideo, sport: { playlists, videos }, runtime } = nextProps

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

  componentDidMount() {
    /* set the default active playlist onload */
    if (this.state.playlists.data.length > 0) {
      activePlaylist = this.state.playlists.data[0]
      this.props.onUpdatePlaylist(activePlaylist.id)
    }
    setMultilineEllipsis('filteredText')

    let isLandscapeVar = false
    if (window.innerHeight > window.innerWidth) {
      isLandscapeVar = false
    } else {
      isLandscapeVar = true
    }
    var resizeTimer;
    const that = this
    window.addEventListener('resize', function () {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(function () {
        if (window.innerHeight > window.innerWidth) {
          isLandscapeVar = false
        } else {
          isLandscapeVar = true
        }
        if (that.state.isLandscape != isLandscapeVar) {
          that.setState({
            isLandscape: isLandscapeVar
          })
        }
      }, 300);
    }, false);

    if (this.state.isLandscape != isLandscapeVar) {
      this.setState({
        isLandscape: isLandscapeVar
      })
    }
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

  componentWillUnmount() {
    document.body.removeEventListener('touchmove', this.preventDefault)
  }

  preventDefault = e => {
    e.preventDefault()
  }

  handleColorChange = (index, swipeIndex = 0) => {
    const that = this
    setTimeout(function () {
      if (activePlaylist) {
        that.props.onUpdatePlaylist(activePlaylist.id)
      }
      const activeSlick = document.querySelector(`.slick-active .${contentStyles.content__container} .slick-active .grid-slick`)
      const { videos } = that.state
      let isDark = 1
      if (activeSlick) {
        isDark = parseInt(activeSlick.getAttribute('isdark'), 10)
      }
      if (typeof isDark === 'number') {
        that.setState({ isDark, activeSlide: videos.data[0].data[0] })
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
    sliderRefs.sort((a, b) => a.props.id - b.props.id)
  }

  render() {
    const isSafari = /.*Version.*Safari.*/.test(navigator.userAgent)
    const {
      playlists,
      playlists: { meta: { status: playlistStatus = 'loading', error: playlistError = '' } },
      videos,
      videos: { meta: { status: videoStatus = 'loading', error: videoError = '' } },
    } = this.props.sport
    const { locale, isDark, isLandscape, startGuide, steps, sportCategoryListSuccess, stepIndex, sliderRefs, scrollIndex, swipeIndex, activeSlide, activeSlideDots } = this.state
    const settings = {
      ...SETTINGS_MOBILE,
      className: styles.sport__slick_slider_fade,
      onInit: node => {
        this.activeSlider = sliderRefs[0]
        this.handleColorChange()
      },
      beforeChange: (currentIndex, nextIndex) => {
        if (nextIndex != -1) {
          this.activeSlider = sliderRefs[nextIndex]
          activePlaylist = playlists.data[nextIndex]
          this.handleColorChange(nextIndex)
        }
      },
    }
    const playlistErrorCode = getErrorCode(playlistError)
    const videoErrorCode = getErrorCode(videoError)

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
        <div>
          {playlistStatus !== 'error' && <Header libraryOff activeMenu="sport" className={styles.placeholder__header} isDark={0} isLandscape={isLandscape} activePlaylist={activePlaylist} isMobile {...this.props} />}
          {playlistStatus === 'loading' && videoStatus === 'loading' && <SportPlaceholder />}
          {playlistStatus === 'error' && <SportError status={playlistErrorCode} message={playlistError || 'Mola TV playlist is not loaded'} />}
          {videoStatus === 'error' && <SportError status={videoErrorCode} message={videoError || 'Mola TV video is not loaded'} />}
          {videos &&
            videos.data.length > 0 &&
            videos.data.length === playlists.data.length && (
              <>
                <div className={styles.sport__sidebar}>
                  <SportMobileMenu playlists={playlists.data} activeIndex={scrollIndex} isGray={scrollIndex == 0} isDark={isDark} className="tourCategory" />
                </div>
                {scrollIndex != 0 &&
                  activeSlide && (
                    <LazyLoad containerClassName={`${styles.header__detail_container} ${isLandscape ? styles.header__detail_container_ls : ''} ${0 ? styles.black : styles.white}`}>
                      {/* {!activeSlide.buttonText &&
                      scrollIndex != 0 && (
                        <Link to={'/watch?v=' + activeSlide.id} className={`${styles.sport__button_livenow}`}>
                          <span className={styles.play_icon} />
                          <p>{locale['view_movie']}</p>
                        </Link>
                      )} */}
                      {!activeSlide.buttonText &&
                        scrollIndex != 0 && (
                          <>
                            {
                              activeSlide.contentType === 1 && (
                                <Link to={`/watch?v=${activeSlide.id}`} className={`${styles.sport__detail_button}`}>
                                  <span className={styles.icon__view_movie} />
                                </Link>
                              )
                            }
                            {isMatchLive(activeSlide.startTime, activeSlide.endTime) && (
                              <Link to={`/watch?v=${activeSlide.id}`} className={`${styles.sport__button_livenow} tourMovieDetail`}>
                                <span className={styles.play_icon} />
                                <p>{locale['live_now']}</p>
                              </Link>
                            )}
                            {activeSlide.startTime > Date.now() / 1000 && (
                              <Link to={`/watch?v=${activeSlide.id}`} className={`${styles.sport__detail_button} ${styles.sport__detail_upc_btn}`}>
                                <p>{locale['upcoming']}</p>
                              </Link>
                            )}
                            {isMatchPassed(activeSlide.endTime) && (
                              <Link to={`/watch?v=${activeSlide.id}`} className={`${styles.sport__detail_button} ${styles.sport__detail_upc_btn}`}>
                                <p>{locale['replay']}</p>
                              </Link>
                            )}
                          </>
                        )}

                      {activeSlide.buttonText && (
                        <a href={`${activeSlide.link ? activeSlide.link : ''}`} className={`${styles.sport__detail_button} ${styles.featured_button} ${0 ? styles.black : styles.white} tourMovieDetail`}>
                          <p>{activeSlide.buttonText ? activeSlide.buttonText : ''}</p>
                        </a>
                      )}

                      <div className={styles.header__playlist_title}>{this.state.playlists.data[scrollIndex].title}</div>
                      <h1 className={styles[activeSlide.title.length > 16 ? 'small' : 'big']}>{activeSlide.title}</h1>
                      {filteredDesc && <p className="filteredText">{filteredDesc}</p>}
                    </LazyLoad>
                  )}
                <div className={styles.header__library_link_wrapper}>
                  {activeSlideDots && activeSlideDots.length > 1 && <SportMobileMenu playlists={activeSlideDots} activeIndex={swipeIndex} isGray={scrollIndex == 0} isDark={0} type="horizontal" className="tourSlide" />}
                </div>
                <Slider
                  {...settings}
                  id="rootSlider"
                  ref={node => {
                    this.rootSlider = node
                  }}
                >
                  {videos &&
                    videos.data.length > 0 &&
                    videos.data.map((video, index) => {
                      const { id } = video.meta
                      return <SportMobileContent key={id} videos={video.data} index={index} isLandscape={isLandscape} updateSlider={this.handleUpdateSlider} updateColorChange={this.handleColorChange} user={this.props.user} />
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
  onHandlePlaylist: () => dispatch(sportActions.getSportList()),
  onHandleVideo: playlist => dispatch(sportActions.getSportVideo(playlist, true)),
  onUpdatePlaylist: id => dispatch(sportActions.updateActivePlaylist(id)),
})

export default compose(withStyles(styles, contentStyles), connect(mapStateToProps, mapDispatchToProps))(Sport)

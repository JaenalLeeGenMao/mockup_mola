import React, { Component } from 'react';
import Slider from 'react-slick';
import { Parallax } from 'react-scroll-parallax';
import { connect } from 'react-redux';
import { compose } from 'redux';

import withStyles from 'isomorphic-style-loader/lib/withStyles';

import {
  Link as RSLink,
  Element,
  Events,
  animateScroll as scroll,
  scrollSpy,
  scroller
} from 'react-scroll';
import $ from 'jquery';

import { SETTINGS } from '../const';
import * as homeActions from '@actions/home';

import { swipeGestureListener, getErrorCode } from '@routes/home/util';

import Header from '@components/Header';
import LazyLoad from '@components/common/Lazyload';
import Link from '@components/Link';

import HomeMobileMenu from './menu';
import HomePlaceholder from './placeholder';
import HomeError from '@components/common/error';

import styles from './home.css';
import customSlickDotStyles from './homeSlickDots.css';

import RightBlack from '@global/style/icons/right_arrow_black.png';
import LineBlack from '@global/style/icons/right_line_black.png';
import RightWhite from '@global/style/icons/right_arrow_white.png';
import LineWhite from '@global/style/icons/right_line_white.png';

let lastScrollY = 0,
  ticking = false,
  activePlaylist,
  scrollIndex = 0;

const trackedPlaylistIds = []; /** tracked the playlist/videos id both similar */

class Home extends Component {
  state = {
    isDark: undefined,
    isMenuOpen: false,
    playlists: [],
    videos: []
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    const {
      onUpdatePlaylist,
      onHandlePlaylist,
      onHandleVideo,
      home: { playlists }
    } = nextProps;

    if (playlists.meta.status === 'loading' && prevState.playlists.length <= 0) {
      onHandlePlaylist();
    } else if (prevState.videos.length <= 0) {
      playlists.data.map((playlist, index) => {
        if (trackedPlaylistIds.indexOf(playlist.id) === -1) {
          trackedPlaylistIds.push(playlist.id);
          onHandleVideo(playlist);
        }
        if (!activePlaylist && index === 0) {
          activePlaylist = playlists.data[0];
          onUpdatePlaylist(activePlaylist.id);
        }
      });
    }
    return { ...prevState, playlists };
  }

  componentDidMount() {
    /** swipe EventListener start */
    window.onload = swipeGestureListener();

    const handleSwipeEvent = e => {
      // console.log(e.type,e)
      this.handleSwipe(e);
    };

    document.body.addEventListener('swl', handleSwipeEvent, false);
    document.body.addEventListener('swr', handleSwipeEvent, false);
    document.body.addEventListener('swu', handleSwipeEvent, false);
    document.body.addEventListener('swd', handleSwipeEvent, false);
    /** swipe EventListener ends */

    window.addEventListener('scroll', this.handleScroll);
    Events.scrollEvent.register('begin', this.handleScroll);
    Events.scrollEvent.register('end', this.handleColorChange);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
    Events.scrollEvent.remove('begin');
    Events.scrollEvent.remove('end');

    for (let i = 0; i < 100; i += 1) {
      window.clearInterval(i);
    }
  }

  handleColorChange = () => {
    const activeSlick = $(`.active .slick-active .${styles.home__parallax}`),
      isDark = parseInt(activeSlick.attr('isdark'), 10);
    if (typeof isDark === 'number') {
      this.setState({ isDark });
    }
  };

  handleScroll = () => {
    const { playlists, videos } = this.props.home;
    if (playlists.meta.status === 'error' || videos.meta.status === 'error') {
      return true;
    }
    playlists.data.map((playlist, index) => {
      if (playlist.isActive) {
        scrollIndex = index;
        return false;
      }
      return true;
    });

    if (!ticking) {
      document.onkeyup = event => {
        ticking = false;

        switch (event.which || event.keyCode) {
          case 37 /* left */:
            this.handleSlidePrev(scrollIndex);
            return event.preventDefault();
          case 38 /* up */:
            scrollIndex -= 1;
            this.handleKeyPress(scrollIndex);
            break;
          case 39 /* right */:
            this.handleSlideNext(scrollIndex);
            return event.preventDefault();
          case 40 /* down */:
            scrollIndex += 1;
            this.handleKeyPress(scrollIndex);
            break;
          default:
            event.preventDefault();
            break;
        }
      };

      ticking = true;
    }
  };

  handleSwipe = event => {
    const { playlists, videos } = this.props.home,
      activeSlickDots = $(`.${customSlickDotStyles.home__slick_dots}`);
    if (playlists.meta.status === 'error' || videos.meta.status === 'error') {
      return true;
    }
    playlists.data.map((playlist, index) => {
      if (playlist.isActive) {
        scrollIndex = index;
        return false;
      }
      return true;
    });

    switch (event.type) {
      case 'swr' /* slide to left ~ swipe right */:
        this.handleSlidePrev(scrollIndex);
        return event.preventDefault();
      case 'swd' /* slide up ~ swipe down */:
        scrollIndex -= 1;
        this.handleKeyPress(scrollIndex);
        activeSlickDots.css('padding', '0 5% 20.5% 0');
        break;
      case 'swl' /* slide to right ~ swipe left */:
        this.handleSlideNext(scrollIndex);
        return event.preventDefault();
      case 'swu' /* slide down ~ swipe up */:
        scrollIndex += 1;
        this.handleKeyPress(scrollIndex);
        activeSlickDots.css('padding', '0 5% 5% 0');
        break;
      default:
        event.preventDefault();
        break;
    }
  };

  handleToggleMenu = () => {
    const { isMenuOpen } = this.state;
    this.setState({ isMenuOpen: !isMenuOpen });
  };

  handleKeyPress = scrollIndex => {
    const result = this.props.home.playlists.data
      .map((playlist, index) => {
        if (index === scrollIndex) {
          this.handleColorChange();
          return playlist;
        }
      })
      .filter(data => data !== undefined);
    if (result && result.length >= 1) {
      this.handleScrollToIndex(result[0].id);
    }
  };

  handleScrollToIndex = id => {
    const { playlists } = this.props.home;
    playlists.data.map((playlist, index) => {
      if (id === playlist.id) {
        scrollIndex = index;
        scroller.scrollTo(id, {
          duration: 800,
          delay: 0,
          smooth: 'easeInOutQuart'
        });
        return false;
      }
      return true;
    });

    this.props.onUpdatePlaylist(id);
  };

  handleSlideNext = (scrollIndex = 0) => {
    this.sliderRefs.sort((a, b) => a.sortOrder - b.sortOrder);
    if (this.sliderRefs[scrollIndex] && this.sliderRefs[scrollIndex].slickNext) {
      this.sliderRefs[scrollIndex].slickNext();
    }
  };

  handleSlidePrev = (scrollIndex = 0) => {
    this.sliderRefs.sort((a, b) => a.sortOrder - b.sortOrder);
    if (this.sliderRefs[scrollIndex] && this.sliderRefs[scrollIndex].slickPrev) {
      this.sliderRefs[scrollIndex].slickPrev();
    }
  };

  render() {
    const {
        playlists,
        playlists: {
          meta: { status: playlistStatus = 'loading', error: playlistError = '' }
        },
        videos,
        videos: {
          meta: { status: videoStatus = 'loading', error: videoError = '' }
        }
      } = this.props.home,
      { isDark, isMenuOpen } = this.state,
      color = isDark ? 'black' : 'white',
      settings = {
        ...SETTINGS,
        speed: 300,
        arrows: false,
        dotsClass: `${customSlickDotStyles.home__slick_dots} ${
          isDark ? customSlickDotStyles.home__dark : customSlickDotStyles.home__white
        }`,
        onInit: () => {
          this.handleColorChange();
        },
        afterChange: index => {
          this.handleColorChange();
        }
      },
      isSafari = /.*Version.*Safari.*/.test(navigator.userAgent),
      playlistErrorCode = getErrorCode(playlistError),
      videoErrorCode = getErrorCode(videoError);
    activePlaylist =
      playlists.data.length > 1 && playlists.data.filter(playlist => playlist.isActive)[0];

    return (
      <div>
        {playlistStatus !== 'error' && (
          <Header
            libraryOff
            className={styles.placeholder__header}
            isDark={isDark}
            activePlaylist={activePlaylist}
            isMobile
            {...this.props}
          />
        )}
        {playlistStatus === 'loading' && videoStatus === 'loading' && <HomePlaceholder />}
        {playlistStatus === 'error' && (
          <HomeError
            status={playlistErrorCode}
            message={playlistError || 'MOLA playlist is not loaded'}
          />
        )}
        {videoStatus === 'error' && (
          <HomeError status={videoErrorCode} message={videoError || 'MOLA video is not loaded'} />
        )}
        {playlistStatus === 'success' &&
          videoStatus === 'success' && (
            <div>
              <HomeMobileMenu
                isDark={isDark}
                isOpen={isMenuOpen}
                playlists={playlists.data}
                onClick={this.handleScrollToIndex}
                onToggle={this.handleToggleMenu}
              />
              <LazyLoad containerClassName={styles.header__library_link_wrapper}>
                <Link
                  to={`/movie-library${activePlaylist ? `/${activePlaylist.id}` : ''}`}
                  style={{ color }}
                >
                  <span
                    className={styles[`header__library_logo_${color}`]}
                    alt="library"
                    style={{ width: '32px', height: '32px' }}
                  />
                </Link>
              </LazyLoad>
            </div>
          )}
        {playlistStatus === 'success' &&
          videos &&
          videos.data.length > 0 &&
          videos.data.length === playlists.data.length &&
          videos.data.map(video => {
            const { id, sortOrder } = video.meta;
            return (
              <RSLink
                activeClass="active"
                to={id}
                spy
                smooth
                duration={500}
                className={styles.home__slider_container}
                key={id}
              >
                <Element name={id}>
                  <Slider
                    ref={node => {
                      if (!this.sliderRefs) {
                        this.sliderRefs = [];
                        this.trackedSliderIds = [];
                      }
                      if (
                        this.trackedSliderIds.indexOf(id) === -1 &&
                        this.sliderRefs.length < trackedPlaylistIds.length &&
                        node !== null
                      ) {
                        node = {
                          ...node,
                          id,
                          sortOrder
                        };
                        this.trackedSliderIds.push(id);
                        return this.sliderRefs.push(node);
                      }
                    }}
                    {...settings}
                  >
                    {video.data.map(eachVids => {
                      const {
                        id,
                        title,
                        shortDescription,
                        isDark,
                        layer1 /** background */,
                        layer2 /** subject */,
                        layer3 /** title image */,
                        type
                      } = eachVids;
                      return (
                        <div className={styles.home__parallax} key={id} id={id} isdark={isDark}>
                          <div className={styles.home__parallax_layer_3}>
                            <LazyLoad
                              src={layer3}
                              containerClassName={styles.home__parallax_layer_3_info}
                              alt=""
                            >
                              <div
                                className={styles.home__parallax_layer_3_detail}
                                style={{ color: isDark ? 'black' : 'white' }}
                              >
                                <h4 className={styles.home__parallax_layer_3_title}>
                                  {type !== 'playlists' ? title : 'OVERVIEW'}
                                </h4>
                                <p className={styles.home__parallax_layer_3_desc}>
                                  {shortDescription}
                                  {type !== 'playlists' && (
                                    <Link
                                      to={`/movie-detail/${id}`}
                                      className={styles.home__see_more}
                                    >
                                      <img
                                        className={styles.home__see_more_line}
                                        src={isDark ? LineBlack : LineWhite}
                                      />
                                      <img
                                        className={styles.home__see_more_arrow}
                                        src={isDark ? RightBlack : RightWhite}
                                      />
                                      see movie
                                    </Link>
                                  )}
                                </p>
                              </div>
                            </LazyLoad>
                          </div>
                          <div className={styles.home__parallax_layer_2}>
                            <LazyLoad src={layer2} />
                          </div>
                          <div disabled={isSafari}>
                            <LazyLoad
                              src={layer1}
                              containerClassName={styles.home__parallax_layer_1}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </Slider>
                </Element>
              </RSLink>
            );
          })}
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps = {}) => {
  return {
    ...state
  };
};

const mapDispatchToProps = dispatch => ({
  onHandlePlaylist: () => dispatch(homeActions.getHomePlaylist()),
  onHandleVideo: playlist => dispatch(homeActions.getHomeVideo(playlist)),
  onUpdatePlaylist: id => dispatch(homeActions.updateActivePlaylist(id))
});

export default compose(
  withStyles(styles, customSlickDotStyles),
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(Home);

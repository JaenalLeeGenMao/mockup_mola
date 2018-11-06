import React, { Fragment, Component } from 'react';
import Slider from 'react-slick';
import { connect } from 'react-redux';
import { compose } from 'redux';

import withStyles from 'isomorphic-style-loader/lib/withStyles';

import { Link as RSLink, Element, Events, animateScroll as scroll, scrollSpy, scroller } from 'react-scroll';
import $ from 'jquery';

import { SETTINGS } from '../const';
import homeActions from '@actions/home';

import { getErrorCode } from '@routes/home/util';

import Header from '@components/Header';
import Navbar from '@components/Navigation';
import LazyLoad from '@components/common/Lazyload';
import Link from '@components/Link';

import HomeArrow from '../arrow';
import HomeDesktopContent from '../content';
import HomeDesktopMenu from '../menu';
import HomePlaceholder from './placeholder';
import HomeError from '@components/common/error';

import styles from './home.css';
import Joyride from 'react-joyride';
import { EVENTS } from 'react-joyride/lib/constants';
import _get from 'lodash/get';

let lastScrollY = 0,
  ticking = false,
  activePlaylist,
  scrollIndex = 0;

const trackedPlaylistIds = []; /** tracked the playlist/videos id both similar */

class Home extends Component {
  state = {
    isDark: undefined,
    playlists: [],
    videos: [],
    playlistSuccess: false,
    startGuide: false,
    steps: [
      {
        target: '.tourCategory',
        title: 'Movie Category',
        content: 'Click the bullets to switch between playlist category',
        placement: 'right',
        disableBeacon: true
      },
      {
        target: '.tourSlide',
        title: 'Movie List',
        content: 'Click the left or right arrow to view highlighted movies',
        placement: 'top',
        disableBeacon: true
      },
      {
        target: '.tourLibrary',
        title: 'Movie Library',
        content: 'Click the icon to view all movie list per category',
        placement: 'bottom',
        disableBeacon: true
      },
      {
        target: '.tourMovieDetail',
        title: 'View Movie Detail',
        content: 'Click the button to watch movie and view movie detail: synopsis, testimonial, cast, and trailer',
        placement: 'top',
        disableBeacon: true,
        locale: { last: 'Finish' }
      }
    ]
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    const { onUpdatePlaylist, onHandlePlaylist, onHandleVideo, home: { playlists } } = nextProps;

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

  handleTourCallback = data => {
    const { type } = data;
    const { videos } = this.props.home;

    if (type === EVENTS.TOUR_END) {
      for (var i = 0; i < videos.data.length; i++) {
        if (document.getElementsByClassName('tourSlideWrapper').length > 0) {
          document.getElementsByClassName('tourSlideWrapper')[0].remove();
        }
      }
      document.cookie = '__trh=1; path=/;';
    }
  };

  componentDidMount() {
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

  componentDidUpdate() {
    const { playlists: { meta: { status: playlistStatus } }, videos, videos: { meta: { status: videoStatus } } } = this.props.home;
    //update loading state
    if (playlistStatus === 'success') {
      if (videoStatus === 'success' && !this.state.playlistSuccess) {
        this.setState(
          {
            playlistSuccess: true
          },
          () => {
            let isTourDone = _get(document, 'cookie', '')
              .trim()
              .split(';')
              .filter(function(item) {
                return item.indexOf('__trh=') >= 0;
              });

            if (isTourDone && isTourDone.length) {
              isTourDone = isTourDone[0].split('=')[1];
              if (!isTourDone) {
                this.setState({
                  startGuide: true
                });
              } else {
                for (var i = 0; i < videos.data.length; i++) {
                  if (document.getElementsByClassName('tourSlideWrapper').length > 0) {
                    document.getElementsByClassName('tourSlideWrapper')[0].remove();
                  }
                }
              }
            } else {
              this.setState({
                startGuide: true
              });
              for (var i = 1; i < videos.data.length; i++) {
                document.getElementsByClassName('tourSlideWrapper')[1].remove();
              }
            }
          }
        );
      }
    }
  }

  handleColorChange = () => {
    const activeSlick = $('.active .slick-active .grid-slick'),
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
            return event.preventDefault();
          case 38 /* up */:
            scrollIndex -= 1;
            this.handleKeyPress(scrollIndex);
            break;
          case 39 /* right */:
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

  handleKeyPress = scrollIndex => {
    const result = this.props.home.playlists.data
      .map((playlist, index) => {
        if (index === scrollIndex) {
          this.handleColorChange();
          return { ...playlist };
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

  render() {
    const isSafari = /.*Version.*Safari.*/.test(navigator.userAgent),
      {
        playlists,
        playlists: { meta: { status: playlistStatus = 'loading', error: playlistError = '' } },
        videos,
        videos: { meta: { status: videoStatus = 'loading', error: videoError = '' } }
      } = this.props.home,
      { isDark, startGuide, steps, playlistSuccess } = this.state,
      settings = {
        ...SETTINGS,
        className: `${styles.home__slick_slider_fade} home-slider`,
        onInit: () => {
          this.handleColorChange();
        },
        afterChange: index => {
          this.handleColorChange();
        }
      },
      playlistErrorCode = getErrorCode(playlistError),
      videoErrorCode = getErrorCode(videoError);
    activePlaylist = playlists.data.length > 1 && playlists.data.filter(playlist => playlist.isActive)[0];

    const customTourStyle = {
      buttonNext: {
        backgroundColor: '#2C56FF',
        fontSize: '1.3rem',
        lineHeight: '1',
        padding: '8px 15px',
        textTransform: 'uppercase',
        letterSpacing: '1.67px',
        borderRadius: '30px'
      },
      buttonBack: {
        color: '#000000',
        fontSize: '1.3rem',
        textTransform: 'uppercase',
        letterSpacing: '1.67px',
        fontWeight: '600'
      },
      buttonClose: {
        display: 'none'
      },
      buttonSkip: {
        color: '#000000',
        fontWeight: '600',
        fontSize: '1.3rem',
        textTransform: 'uppercase',
        letterSpacing: '1.67px'
      },
      tooltipContent: {
        fontSize: '1.3rem',
        padding: '0 0 20px',
        textAlign: 'left',
        color: '#858585',
        lineHeight: '14px',
        letterSpacing: '0.5px'
      },
      tooltipTitle: {
        fontSize: '1.3rem',
        textAlign: 'left',
        margin: '0px 0px 8px',
        letterSpacing: '0.59px',
        textTransform: 'uppercase'
      }
    };

    return (
      <Fragment>
        <Joyride continuous showSkipButton steps={steps} run={startGuide} styles={customTourStyle} floaterProps={{ disableAnimation: true }} callback={this.handleTourCallback} />

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
              const { id, sortOrder } = video.meta;
              return (
                <RSLink activeClass="active" to={id} spy smooth duration={500} className={styles.home__slider_container} key={id}>
                  <Element name={id}>
                    <div className={`${styles.placeholderTourSlideWrapper} tourSlideWrapper`}>
                      <div className={`${styles.placeholderTourSlide} tourSlide`}>
                        <button
                          className={`
                              ${styles.home__arrow}
                              ${styles.home__arrow_prev}
                              ${styles[isDark ? 'dark' : 'white']}
                          `}
                        >
                          prev
                        </button>
                        <button
                          className={`
                              ${styles.home__arrow}
                              ${styles.home__arrow_next}
                              ${styles[isDark ? 'dark' : 'white']}
                          `}
                        >
                          prev
                        </button>
                      </div>
                    </div>
                    <Slider
                      ref={node => {
                        if (!this.sliderRefs) {
                          this.sliderRefs = [];
                          this.trackedSliderIds = [];
                        }
                        if (this.trackedSliderIds.indexOf(id) === -1 && this.sliderRefs.length < trackedPlaylistIds.length && node !== null) {
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
                      prevArrow={<HomeArrow direction="prev" isDark={isDark} id={id} sliderRefs={this.sliderRefs} />}
                      nextArrow={<HomeArrow direction="next" isDark={isDark} id={id} sliderRefs={this.sliderRefs} />}
                    >
                      {video.data.map(eachVids => <HomeDesktopContent {...eachVids} key={eachVids.id} isSafari={isSafari} ticking={ticking} sliderRefs={this.sliderRefs} />)}
                    </Slider>
                  </Element>
                </RSLink>
              );
            })}
        </div>
      </Fragment>
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

export default compose(withStyles(styles), connect(mapStateToProps, mapDispatchToProps))(Home);

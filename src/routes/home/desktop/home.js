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
  scroller,
} from 'react-scroll';
import $ from 'jquery';


import { SETTINGS } from '../const';
import * as homeActions from '@actions/home';

import Header from '@components/header';
import Navbar from '@components/navigation';
import LazyLoadBeta from '@components/common/lazyloadBeta';
import Link from '@components/Link';

import HomeArrow from './arrow';
import HomePlaceholder from './placeholder';

import styles from './home.css';
import customSlickDotStyles from './homeSlickDots.css';

let lastScrollY = 0,
  ticking = false,
  activePlaylist;

const trackedPlaylistIds = []; /** tracked the playlist/videos id both similar */

class Home extends Component {
	state = {
	    isDark: undefined
	}

	componentWillReceiveProps(nextProps) {
    	const {
    		onHandleVideo,
    		home: {
    			playlists,
    		},
    	} = nextProps;

    	if (
    		playlists.meta.status === "success"
    	) {
    		playlists.data.map(playlist => {
    			if (trackedPlaylistIds.indexOf(playlist.id) === -1) {
    				trackedPlaylistIds.push(playlist.id);
    				onHandleVideo(playlist);
    			}
	        });

	        if (!activePlaylist) {
	            activePlaylist = playlists.data[0];
	            this.props.onUpdatePlaylist(activePlaylist.id);
	        }
	    }
	}

	componentWillMount() {
    	const {
    		onHandlePlaylist,
    		home: {
    			playlists,
    		},
    	} = this.props;
    	if (playlists.meta.status !== 'success') {
    		onHandlePlaylist();
    	}
	}

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

    handleColorChange = () => {
      const activeSlick = $(`.active .slick-active .${styles.home__parallax}`),
        isDark = parseInt(activeSlick.attr('isdark'), 10);
      if (typeof(isDark) === "number") {
        this.setState({ isDark });
      }
    }

    handleScroll = () => {
      lastScrollY = window.scrollY;

    	if (!ticking) {
        document.onkeyup = event => {
          ticking = false;
          let scrollIndex;
          const screen = $(window),
            screenHeight = screen.height();

          switch (event.which || event.keyCode) {
          case 37: /* left */
            scrollIndex = Math.ceil(lastScrollY / screenHeight);
            this.handleSlidePrev(scrollIndex);
            return event.preventDefault();
          case 38: /* up */
            scrollIndex = Math.ceil(lastScrollY / screenHeight) - 1;
            this.handleKeyPress(scrollIndex);
            break;
          case 39: /* right */
            scrollIndex = Math.ceil(lastScrollY / screenHeight);
            this.handleSlideNext(scrollIndex);
            return event.preventDefault();
          case 40: /* down */
            scrollIndex = Math.ceil(lastScrollY / screenHeight) + 1;
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
      const result = this.props.home.playlists.data.map((playlist, index) => {
        if (index === scrollIndex) {
          this.handleColorChange();
          return { ...playlist };
        }
      }).filter(data => data !== undefined);
      if (result && result.length >= 1) {
        this.handleScrollToIndex(result[0].id);
      }
    }

    handleScrollToIndex = id => {
    	const { playlists } = this.props.home;
    	playlists.data.map(playlist => {
    		if (id === playlist.id) {
    			scroller.scrollTo(id, {
    				duration: 800,
    				delay: 0,
    				smooth: 'easeInOutQuart',
    			});
    			return false;
    		}
    		return true;
      });
      this.props.onUpdatePlaylist(id);
    };

    handleSlideNext = (scrollIndex = 0) => {
      this.sliderRefs.sort((a, b) => a.sortOrder - b.sortOrder);
      if (this.sliderRefs[scrollIndex]) {
        this.sliderRefs[scrollIndex].slickNext();
      }
    }

    handleSlidePrev = (scrollIndex = 0) => {
      this.sliderRefs.sort((a, b) => a.sortOrder - b.sortOrder);
      if (this.sliderRefs[scrollIndex]) {
        this.sliderRefs[scrollIndex].slickPrev();
      }
    }

    render() {
      const {
          playlists,
          playlists: {
            meta: {
              status = 'loading',
              error
            }
          },
          videos
        } = this.props.home,
        { isDark } = this.state,
        settings = {
          ...SETTINGS,
          dotsClass: `${customSlickDotStyles.home__slick_dots} ${isDark ? customSlickDotStyles.home__dark : customSlickDotStyles.home__white}`,
          onInit: () => {
            this.handleColorChange();
          },
          afterChange: index => {
            this.handleColorChange();
          }
        },
        isSafari = /.*Version.*Safari.*/.test(navigator.userAgent);

    	return (
    		<div
          className={styles.home__container}
    		>
    			<Header isDark={isDark} />
          {status === 'loading' && <HomePlaceholder />}
          {status === 'error' &&
					<div className={styles.home__error_container}>Ada Error kawan: {error || 'MOLA video is not loaded'}</div>
          }
          {status === 'success' &&
                    <Navbar
                    	isDark={isDark}
                    	playlists={playlists.data}
                    	onClick={this.handleScrollToIndex}
                    />
          }
    			{
            status === 'success'
					&& videos
                    && videos.data.length > 0
                    && videos.data.length <= playlists.data.length
                    && videos.data.map(video => {
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
                                  this.trackedSliderIds = []
                                }
                                if (
                                  this.trackedSliderIds.indexOf(id) === -1
												&& this.sliderRefs.length < trackedPlaylistIds.length
												&& node !== null
                                ) {
                                  node = {
                                    ...node,
                                    id,
                                    sortOrder
                                  }
                                  this.trackedSliderIds.push(id);
                                  return this.sliderRefs.push(node);
                                }
                              }}
                              {...settings}
                              prevArrow={<HomeArrow direction="prev" isDark={isDark} />}
                              nextArrow={<HomeArrow direction="next" isDark={isDark} />}
                            >
                    					{video.data.map((eachVids) => {
                    						const {
                    							id,
                    							title,
                    							shortDescription,
                    							isDark,
                    							layer1, /** background */
                    							layer2, /** subject */
                    							layer3, /** title image */
                    							type,
                                } = eachVids;
                    						return (
                    							<div className={styles.home__parallax} key={id} id={id} isdark={isDark}>
                                    <Parallax
                                      disabled={isSafari}
                                      offsetYMin={ticking ? -50 : 0}
                                      offsetYMax={ticking ? 50 : 0}
                                      className={styles.home__parallax_layer_3}
                                    >
                                      <LazyLoadBeta src={layer3}
                                        containerClassName={styles.home__parallax_layer_3_info}
                                        style={{ color: isDark ? "black" : "white" }}
                                      >
                                        <div className={styles.home__parallax_layer_3_detail}>
                                          <h4
                                            className={styles.home__parallax_layer_3_title}
                                          >
                                            {title}
                                          </h4>
                                          <p className={styles.home__parallax_layer_3_desc}>
                                            {shortDescription}
                                            <Link to="/movie" className={styles.home__see_more}>➪see movie</Link>
                                          </p>
                                        </div>

                                      </LazyLoadBeta>
                                    </Parallax>
                                    <Parallax
                                      disabled={isSafari}
                                      offsetYMin={ticking ? -10 : 0}
                                      offsetYMax={ticking ? 10 : 0}
                                      offsetXMin={ticking ? 20 : 0}
                                      offsetXMax={ticking ? -20 : 0}
                                      className={styles.home__parallax_layer_2}
                                    >
                                      <LazyLoadBeta src={layer2} alt="">
                                        {/* <Link to="/movie" className={styles.home__transparent_link} />*/}
                                      </LazyLoadBeta>
                                    </Parallax>
                                    <Parallax disabled={isSafari}>
                                      <LazyLoadBeta src={layer1} alt="" containerClassName={styles.home__parallax_layer_1}>
                                      </LazyLoadBeta>
                                    </Parallax>
                    							</div>
                    						);
                    					})}
                    				</Slider>
                    			</Element>
                    		</RSLink>
                    	)
                    })
    			}
    		</div>
    	);
    }
}

const mapStateToProps = (state, ownProps = {}) => {
  return {
    ...state,
  };
};

const mapDispatchToProps = (dispatch) => ({
  onHandlePlaylist: () => dispatch(homeActions.getHomePlaylist()),
  onHandleVideo: playlist => dispatch(homeActions.getHomeVideo(playlist)),
  onUpdatePlaylist: id => dispatch(homeActions.updateActivePlaylist(id)),
});

export default compose(
  withStyles(
    styles,
    customSlickDotStyles
  ),
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
)(Home);

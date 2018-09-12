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
import LazyLoad from '@components/common/Lazyload';
import Link from '@components/Link';

import HomeMobileMenu from './menu';
import HomePlaceholder from './placeholder';

import styles from './home.css';
import customSlickDotStyles from './homeSlickDots.css';

let lastScrollY = 0,
    ticking = false,
    activePlaylist;

const trackedPlaylistIds = []; /** tracked the playlist/videos id both similar */

class Home extends Component {
    state = {
        isDark: undefined,
        isMenuOpen: false
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

    handleToggleMenu = () => {
        const { isMenuOpen } = this.state;
        this.setState({ isMenuOpen: !isMenuOpen });
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
        this.handleToggleMenu();
        this.props.onUpdatePlaylist(id);
    };

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
            { isDark, isMenuOpen } = this.state,
            color = isDark ? "black" : "white",
            settings = {
                ...SETTINGS,
                arrows: false,
                dotsClass: `${customSlickDotStyles.home__slick_dots} ${isDark ? customSlickDotStyles.home__dark : customSlickDotStyles.home__white}`,
                onInit: () => {
                    const activeSlick = $(`.active .slick-active .${styles.home__parallax}`),
                        isDark = parseInt(activeSlick.attr('isdark'), 10);
                    if (typeof(isDark) === "number") {
                        this.setState({ isDark });
                    }
                },
                afterChange: index => {
                    const activeSlick = $(`.active .slick-active .${styles.home__parallax}`),
                        isDark = parseInt(activeSlick.attr('isdark'), 10);
                    if (typeof(isDark) === "number") {
                        this.setState({ isDark });
                    }
                }
            },
            isSafari = /.*Version.*Safari.*/.test(navigator.userAgent);

        return (
            <div>
                <Header libraryOff className={styles.placeholder__header} />
                {status === 'loading' && <HomePlaceholder />}
                {status === 'error' &&
					<div className={styles.home__error_container}>Ada Error kawan: {error}</div>
                }
                {status === 'success' &&
                    <div>
                        <HomeMobileMenu
                            isDark={isDark}
                            isOpen={isMenuOpen}
                            playlists={playlists.data}
                            onClick={this.handleScrollToIndex}
                            onToggle={this.handleToggleMenu}
                        />
                        <LazyLoad className={styles.header__library_link_wrapper}>
                            <Link to="/category" style={{ color }}>
                                <span
                                    className={styles[`header__library_logo_${color}`]}
                                    alt="library"
                                    style={{ width: '32px', height: '32px' }}
                                />
                            </Link>
                        </LazyLoad>
                    </div>
                }
                {
                    status === 'success'
					&& videos
                    && videos.data.length > 0
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
                                        // prevArrow={<HomeArrow direction="prev" isDark={isDark} />}
                                        // nextArrow={<HomeArrow direction="next" isDark={isDark} />}
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
                    								<LazyLoad>
                    									<Parallax
                                                            disabled={isSafari}
                    										offsetYMin={ticking ? -50 : 0}
                    										offsetYMax={ticking ? 50 : 0}
                    										className={styles.home__parallax_layer_3}
                    									>
                    										<div
                    											className={styles.home__parallax_layer_3_info}
                    											style={{ color: isDark ? "black" : "white" }}
                    										>
                    											<img alt="" src={layer3} className={styles.home__parallax_layer_3_image} />
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
                    										</div>
                    									</Parallax>
                    									<Parallax
                                                            disabled={isSafari}
                    										offsetYMin={ticking ? -10 : 0}
                                                            offsetYMax={ticking ? 10 : 0}
                                                            offsetXMin={ticking ? 20 : 0}
                                                            offsetXMax={ticking ? -20 : 0}
                    										className={styles.home__parallax_layer_2}
                    									>
                                                            {/* <div> */}
                                                            <img alt="" src={layer2}/>
                                                            {/* <Link to="/movie" className={styles.home__transparent_link} />
															</div> */}
                    									</Parallax>
                    									<Parallax disabled={isSafari}>
                    										<img
                    											alt=""
                    											src={layer1}
                    											className={styles.home__parallax_layer_1}
                    										/>
                    									</Parallax>
                    								</LazyLoad>
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
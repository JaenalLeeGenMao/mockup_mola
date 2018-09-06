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

import * as homeActions from '../../actions/home';

import { SETTINGS } from './const';
import Header from '@components/header';
import Navbar from '@components/navigation';
import LazyLoad from '@components/common/lazyload';

import styles from './Home.css';

let lastScrollY = 0,
    ticking = false,
    prevScroll = 0,
    activePlaylist;

const trackedPlaylistIds = []; /** tracked the playlist/videos id both similar */

class Home extends Component {
	state = {
	    isDark: undefined
	}

	componentWillReceiveProps(nextProps) {
    	const {
	        onUpdatePlaylist,
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

	        if (!this.interval) {
	            this.interval = setInterval(async () => {
	                if (activePlaylist) {
	                    playlists.data.map(playlist => {
	                        if (activePlaylist.id === playlist.id) {
	                            const activeSlick = $(`.active .slick-active .${styles.home__parallax}`),
	                                isDark = parseInt(activeSlick.attr('isdark'), 10)
	                            if (typeof(isDark) === "number") {
	                                this.setState({ isDark });
	                            }
	                            onUpdatePlaylist(activePlaylist.id);
	                            return false;
	                        }
	                        return true;
	                    });

	                    await this.handleScrollToIndex(activePlaylist.id);
	                } else {
	                    activePlaylist = playlists.data[0];
	                }
	            }, 800);
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
    	Events.scrollEvent.register('end', this.handleScroll);
	}

	componentDidUpdate() {
    	// const {
    	// 	onHandleVideo,
    	// 	home: {
    	// 		playlists,
    	// 		videos,
    	// 	},
    	// } = this.props;
    	// console.log(playlists, videos);
    	// if (
    	// 	playlists.meta.status === "success"
    	// ) {
    	// 	console.log("masuk");
    	// 	playlists.data.map((playlist) => {
    	// 		console.log("mulai looping");
    	// 		console.log(videos.data, playlist);
    	// 		if (videos.data.length <= playlists.length) {
    	// 			console.log("dalam if statement");
    	// 			onHandleVideo(playlist);
    	// 		}
    	// 	});
    	// }
    	// const { onHandleVideo, home: { playlists, videos } } = this.props;
    	// if (playlists.meta.status === 'success') {
    	//     if (
    	//         videos.data.length <= playlists.length
    	//     ) {
    	//         playlists.data.map((playlist) => {
    	//             onHandleVideo(playlist);
    	//         });
    	//     }
    	//     // this.state.videos.map((video) => {
    	//     //     const {
    	//     //             attributes: {videos: videoList},
    	//     //         } = video,
    	//     //         screen = $(window),
    	//     //         screenWidthHalf = screen.width() / 2,
    	//     //         sliderDotsWidth = (videoList.length + 0.15) * 20;
    	//     //     $('.slick-prev').css('left', screenWidthHalf - sliderDotsWidth);
    	//     //     $('.slick-next').css('right', screenWidthHalf - sliderDotsWidth);
    	//     //     return true;
    	//     // });
    	    // $('.slick-dots li').css('color', isDark ? 'black' : 'white');
    	    // $('.slick-dots li.slick-active').css('color', isDark ? 'black' : 'white');
    	// }
	}

	componentWillUnmount() {
    	window.removeEventListener('scroll', this.handleScroll);
    	Events.scrollEvent.remove('begin');
    	Events.scrollEvent.remove('end');

    	for (let i = 0; i < 100; i += 1) {
    		window.clearInterval(i);
    	}
	}

    handleScroll = () => {
    	lastScrollY = window.scrollY;

    	if (!ticking) {
    		window.requestAnimationFrame(() => {
    			ticking = false;
    			const screen = $(window),
    			    screenHeight = screen.height(),
    			    scrollIndex =
                        lastScrollY > prevScroll
                        	? Math.ceil(lastScrollY / screenHeight)
                        	: Math.trunc(lastScrollY / screenHeight);
    			const playlists = this.props.home.playlists.data.map((playlist, index) => {
    				if (index === scrollIndex) {
    					activePlaylist = playlist;
    				}
    				return { ...playlist };
    			});
    			prevScroll = lastScrollY;
    			this.setState({ playlists });
    		});

    		ticking = true;
    	}
    };

    handleScrollToIndex = id => {
    	const { playlists } = this.props.home;
    	playlists.data.map(playlist => {
    		if (id === playlist.id) {
    			scroller.scrollTo(id, {
    				duration: 250,
    				delay: 0,
    				smooth: 'easeInOutQuart',
    			});
    			return false;
    		}
    		return true;
    	});
    };

    render() {
        const { playlists, videos } = this.props.home,
            { isDark } = this.state,
            settings = {
                ...SETTINGS,
                dotsClass: `slick-dots ${isDark ? styles.home__dark : styles.home__white}`
            }
    	return (
    		<div
    			className={styles.home__container}
    		>
    			<Header isDark={isDark} />
    			{playlists && playlists.meta.status === 'success' &&
                    <Navbar
                    	isDark={isDark}
                    	playlists={playlists.data}
                    	onClick={this.handleScrollToIndex}
                    />
    			}
    			{videos
                    && videos.data.length > 0
                    && videos.data.map(video => {
                    	const { id } = video.meta;
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
                    				<Slider {...settings}>
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
                    										offsetYMin={-50}
                    										offsetYMax={50}
                    										className={styles.home__parallax_layer_3}
                    									>
                    										<div
                    											className={styles.home__parallax_layer_3_info}
                    											style={{ color: isDark ? "black" : "white" }}
                    										>
                    											<img alt="" src={layer3} className={styles.home__parallax_layer_3_image} />
                    											<h4
                    												className={styles.home__parallax_layer_3_title}
                    											>
                    												{title}
                    											</h4>
                    											<p className={styles.home__parallax_layer_3_desc}>
                    												{shortDescription}
                    											</p>
                    										</div>
                    									</Parallax>
                    									<Parallax
                    										offsetYMin={-10}
                    										offsetYMax={10}
                    										offsetXMin={20}
                    										offsetXMax={-20}
                    										className={styles.home__parallax_layer_2}
                    									>
                    										<img alt="" src={layer2} />
                    									</Parallax>
                    									<Parallax offsetYMin={-10} offsetYMax={10}>
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
    withStyles(styles),
    connect(
        mapStateToProps,
        mapDispatchToProps,
    ),
)(Home);

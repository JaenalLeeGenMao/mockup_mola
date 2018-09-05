import React, {Component} from 'react';
import Slider from 'react-slick';
import {Parallax} from 'react-scroll-parallax';
import {connect} from 'react-redux';
import {compose} from 'redux';

import {get} from 'axios';
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

import {SETTINGS} from './const';
import Header from '@components/header';
import Navbar from '@components/navigation';
import LazyLoad from '@components/common/lazyload';

import styles from './Home.css';

let lastScrollY = 0;
let ticking = false;
let prevScroll = 0;
let activePlaylist;
let isDark = 1;
const trackedPlaylistIds = []; /** tracked the playlist/videos id both similar */

class Home extends Component {
	state = {
	    playlists: [],
	    videos: [],
	};

	componentWillReceiveProps() {
	    const {
	        onHandleVideo,
	        home: {
	            playlists,
	            videos,
	        },
	    } = this.props;
	    // console.log("VIDEOOO", videos);
	    if (
	        videos.data.length <= playlists.length
	    ) {
	        playlists.data.map((playlist) => {
	            // console.log("WILL RECEIVE PROPS", playlist);
	            const resp = onHandleVideo(playlist);
	            resp.then((videos) => {
	                // console.log(videos);
	                // videos.map(video => {
	                // 	if (trackedPlaylistIds.indexOf(video.id) === -1) {
	                // 		trackedPlaylistIds.push(video.id);
	                // 		this.setState({ videos: [...this.state.videos].concat(video) });
	                // 	}
	                // 	return true;
	                // });
	            });
	        });
	    }
	}

	componentWillMount() {
	    const {
	        onHandlePlaylist,
	        onHandleVideo,
	        home: {
	            playlists,
	            videos,
	        },
	    } = this.props;
	    if (playlists.meta.status !== 'success') {
	        onHandlePlaylist();
	        // setInterval(async () => {
	        // 	if (activePlaylist) {
	        // 		playlists = await this.props.home.playlists.data.map(playlist => {
	        // 			if (activePlaylist.id === playlist.id) {
	        // 				// homeActions.updateActivePlaylist(activePlaylist.id);
	        // 				// return { ...playlist, isActive: true };
	        // 			}
	        // 			// return { ...playlist, isActive: false };
	        // 			return true;
	        // 		});

	        // 		// this.setState({ playlists });
	        // 		await this.handleScrollToIndex(activePlaylist.id);
	        // 	}
	        // }, 1500);
	    }
	    // get('http://mola.lukitomo.com/v2/videos/playlists/mola-home').then(
	    // 	response => {
	    // 		const { data } = response.data,
	    // 			{ playlists: playlistsData } = data[0].attributes;
	    // 		let playlists = playlistsData.map((playlist, index) => {
	    // 			const resp = this.handleVideos(playlist.id);
	    // 			resp.then(videos => {
	    // 				videos.map(video => {
	    // 				if (trackedPlaylistIds.indexOf(video.id) === -1) {
	    // 					trackedPlaylistIds.push(video.id);
	    // 					this.setState({ videos: [...this.state.videos].concat(video) });
	    // 				}
	    // 				return true;
	    // 				});
	    // 			});
	    // 			if (index === 0) {
	    // 				return { ...playlist, isActive: true };
	    // 			}
	    // 			return { ...playlist, isActive: false };
	    // 		});

	    // 		this.setState({ playlists });

	    // 		setInterval(async () => {
	    // 		if (activePlaylist) {
	    // 			playlists = await this.state.playlists.map(playlist => {
	    // 			if (activePlaylist.id === playlist.id) {
	    // 				return { ...playlist, isActive: true };
	    // 			}
	    // 			return { ...playlist, isActive: false };
	    // 			});

	    // 			this.setState({ playlists });
	    // 			await this.handleScrollToIndex(activePlaylist.id);
	    // 		}
	    // 		}, 1500);
	    // 	},
	    // );
	}

	componentDidMount() {
	    const {
	        onHandleVideo,
	        home: {
	            playlists,
	            videos,
	        },
	    } = this.props;
	    // console.log("aasdadasdas", playlists);
	    // console.log("THERE YOU ARE", videos);
	    if (
	        videos.meta.status === 'loading'
	    ) {
	        playlists.data.map((playlist) => {
	            onHandleVideo(playlist);
	        });
	    }
	    // const {
	    // 	onHandlePlaylist,
	    // 	onHandleVideo,
	    // 	home: {
	    // 		playlists,
	    // 		videos
	    // 	}
	    // } = this.props;
	    // if (
	    // 	playlists.meta.status === "success"
	    // 	&& playlists.data.length > 0
	    // ) {
	    // 	playlists.data.map(playlist => {
	    // 		const resp = onHandleVideo(playlist);
	    // 		resp.then(videos => {
	    // 			console.log("REALLY VIDEOS?", videos);
	    // videos.map(video => {
	    // 	if (trackedPlaylistIds.indexOf(video.id) === -1) {
	    // 		trackedPlaylistIds.push(video.id);
	    // 		this.setState({ videos: [...this.state.videos].concat(video) });
	    // 	}
	    // 	return true;
	    // });
	    // 		});
	    // 	});
	    // }
	    // const {
	    // 	onUpdatePlaylist,
	    // 	home: {
	    // 		playlists: {
	    // 			data
	    // 		}
	    // 	}
	    // } = this.props;
	    // console.log(data);
	    // if (data && data.length > 0) {
	    // 	console.log("YAAAAAYYYYY", data);
	    // 	data.map((playlist, index) => {
	    // 		if (index === 0) {
	    // 			onUpdatePlaylist(playlist.id)
	    // 			return false;
	    // 		}
	    // 		return true;
	    // 	});
	    // }
	    window.addEventListener('scroll', this.handleScroll);
	    Events.scrollEvent.register('begin', this.handleScroll);
	    Events.scrollEvent.register('end', this.handleScroll);
	}

	componentDidUpdate() {
	    const {meta, data}= this.props.home.playlists;
	    if (meta.status === 'success') {
	        this.state.videos.map((video) => {
	            const {
	                    attributes: {videos: videoList},
	                } = video,
	                screen = $(window),
	                screenWidthHalf = screen.width() / 2,
	                sliderDotsWidth = (videoList.length + 0.15) * 20;
	            $('.slick-prev').css('left', screenWidthHalf - sliderDotsWidth);
	            $('.slick-next').css('right', screenWidthHalf - sliderDotsWidth);
	            return true;
	        });
	        $('.slick-dots li').css('color', isDark ? 'black' : 'white');
	        $('.slick-dots li.slick-active').css('color', isDark ? 'black' : 'white');
	    }
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
	            const screen = $(window);
	            const screenHeight = screen.height();
	            const scrollIndex =
			lastScrollY > prevScroll
			    ? Math.ceil(lastScrollY / screenHeight)
			    : Math.trunc(lastScrollY / screenHeight);
	            const playlists = this.props.home.playlists.data.map((playlist, index) => {
	                if (index === scrollIndex) {
	                    if (trackedPlaylistIds.indexOf(playlist.id) === -1) {
	                        const data = this.handleVideos(playlist.id);
	                        data.then((videos) => {
	                            videos.map((video) => {
	                                if (trackedPlaylistIds.indexOf(video.id) === -1) {
	                                    trackedPlaylistIds.push(video.id);
	                                    this.setState({
	                                        videos: this.state.videos.push(...video),
	                                    });
	                                }
	                                return true;
	                            });
	                        });
	                    }
	                    activePlaylist = playlist;
	                }
	                return {...playlist};
	            });
	            prevScroll = lastScrollY;
	            this.setState({playlists});
	        });

	        ticking = true;
	    }
	};

	handleScrollToIndex = (id) => {
	    const {playlists} = this.props.home;
	    playlists.data.map((playlist, index) => {
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
	};

	handleVideos = (playlistId) =>
	    homeActions.getHomeVideo(playlistId);
    // get(`http://mola.lukitomo.com/v2/videos/playlists/${playlistId}`).then(
    // 	({ data: { data } }) => data,
    // );

	render() {
	    /** harus ubah ke redux */
	    const {videos = []} = this.state,
	        {playlists} = this.props.home,
	        color = isDark ? 'black' : 'white',
	        numOfPlaylists = playlists ? playlists.data.length : 1;

	    return (
	        <div
	            className={styles.home__container}
	            // style={{ height: `${numOfPlaylists * 100}vh` }}
	        >
	            <Header isDark={isDark} />
	            {
	                playlists && playlists.meta.status === 'success' &&
				<Navbar
				    isDark={isDark}
				    playlists={playlists.data}
				    onClick={this.handleScrollToIndex}
				/>
	            }
	            {videos && videos.map((video) => {
	                const {
	                    id,
	                    type,
	                    attributes: {videos: videoList},
	                } = video;
	                return (
	                    <RSLink
	                        activeClass="active"
	                        to={video.id}
	                        spy
	                        smooth
	                        duration={500}
	                        className={styles.home__slider_container}
	                        key={`${type} - ${id}`}
	                    >
	                        <Element name={video.id}>
	                            <Slider {...SETTINGS}>
	                                {videoList.map((eachVids) => {
	                                    const {
	                                        attributes: {
	                                            id,
	                                            title,
	                                            description,
	                                            shortDescription,
	                                            coverUrl,
	                                            isDark: darkColor,
	                                            layer1,
	                                            layer2,
	                                            layer3,
	                                            type,
	                                        },
	                                    } = eachVids;
	                                    isDark = darkColor;
	                                    return (
	                                        <div className={styles.home__parallax} key={`${type} - ${id}`}>
	                                            <LazyLoad>
	                                                <Parallax offsetYMin={-10} offsetYMax={10}>
	                                                    <img
	                                                        alt=""
	                                                        src={layer3}
	                                                        className={styles.home__parallax_layer_3}
	                                                    />
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
	                                                <Parallax
	                                                    offsetYMin={-50}
	                                                    offsetYMax={50}
	                                                    className={styles.home__parallax_layer_1}
	                                                >
	                                                    {/* <img alt="" src={layer1} /> */}
	                                                    <div
	                                                        className={styles.home__parallax_layer_1_info}
	                                                        style={{
	                                                            color,
	                                                            background: `url(${layer1}) no-repeat`,
	                                                            backgroundSize: 'cover',
	                                                        }}
	                                                    >
	                                                        <h4
	                                                            className={styles.home__parallax_layer_1_title}
	                                                        >
	                                                            {title}
	                                                        </h4>
	                                                        <p className={styles.home__parallax_layer_1_desc}>
	                                                            {shortDescription}
	                                                        </p>
	                                                    </div>
	                                                </Parallax>
	                                            </LazyLoad>
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
        ...state,
    };
};

const mapDispatchToProps = (dispatch) => ({
    onHandlePlaylist: () => dispatch(homeActions.getHomePlaylist()),
    onHandleVideo: (playlist) => dispatch(homeActions.getHomeVideo(playlist)),
    onUpdatePlaylist: (id) => dispatch(homeActions.updateActivePlaylist(id)),
});

export default compose(
    withStyles(styles),
    connect(
        mapStateToProps,
        mapDispatchToProps,
    ),
)(Home);

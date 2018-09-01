import React, { Component } from 'react';
import { get } from 'axios';
import Slider from "react-slick";
import { Parallax, ParallaxBanner } from 'react-scroll-parallax';
import { FaChevronLeft, FaChevronCircleRight, FaChevronRight } from 'react-icons/fa';

import Header from '@components/header';
import Navbar from '@components/navigation';
import LazyLoad from '@components/common/lazyload';
import $ from 'jquery';

import styles from './home.css';
// import { clearInterval } from 'timers';

class Home extends Component {
    state = {
        cover: {},
        coverUrl: "",
        playlists: [],
        videos: []
    };

    handleVideos = playlistId => {
        return get(`http://mola.lukitomo.com/v2/videos/playlists/${playlistId}`)
            .then(({ data: { data } }) => {
                return data;
            });
    }

    componentWillMount() {
        const screen = $(window);
        let prevScroll = 0,
            trackedPlaylistIds = [], /** tracked the playlist/videos id both similar */
            activePlaylist = undefined;
        get('http://mola.lukitomo.com/v2/videos/playlists/mola-home')
            .then(response => {
                const { data } = response.data,
                    { cover, coverUrl, playlists: playlistsData } = data[0].attributes;

                let playlists = playlistsData.map((playlist, index) => {
                    if (index === 0) {
                        const data = this.handleVideos(playlist.id);
                        data.then(videos => {
                            videos.map(video => {
                                if (trackedPlaylistIds.indexOf(video.id) === -1) {
                                    trackedPlaylistIds.push(video.id);
                                    this.setState({ videos: this.state.videos.concat(video) });
                                }
                                return true;
                            });
                        });
                        return { ...playlist, isActive: true };
                    } else {
                        return { ...playlist, isActive: false };
                    }
                });

                this.setState({ cover, coverUrl, playlists });

                setInterval(async () => {
                    if (activePlaylist) {
                        
                        playlists = playlistsData.map(playlist => {
                            if (activePlaylist.id === playlist.id) {
                                return { ...playlist, isActive: true }
                            }
                            return { ...playlist }
                        });
                        
                        await this.handleScrollToIndex(activePlaylist.id);
                        console
                        activePlaylist = undefined;
                        this.setState({ playlists });
                    }
                }, 700);

                screen.scroll(() => {
                    const currentScroll = screen.scrollTop(),
                        screenHeight = screen.height(),
                        scrollIndex = currentScroll >= prevScroll
                            ? Math.ceil(currentScroll / screenHeight)
                            : Math.trunc(currentScroll / screenHeight),
                        playlists = playlistsData
                            .map((playlist, index) => {
                                if (index === scrollIndex) {
                                    if (trackedPlaylistIds.indexOf(playlist.id) === -1) {
                                        const data = this.handleVideos(playlist.id);
                                        data.then(videos => {
                                            videos.map(video => {
                                                if (trackedPlaylistIds.indexOf(video.id) === -1) {
                                                    trackedPlaylistIds.push(video.id);
                                                    this.setState({ videos: this.state.videos.concat(video) });
                                                }
                                            });
                                        });
                                    }
                                    activePlaylist = playlist
                                }
                                return { ...playlist, isActive: false }
                            });
                        prevScroll = currentScroll;
                        this.setState({ playlists });
                });
            });
        // const { videos } = this.state;
        // videos.map(video => {
        //     const { attributes: { videos: videoList } } = video,
        //         screen = $(window),
        //         screenWidth = screen.width(),
        //         sliderDotsWidth = videoList.length * 20;
        //     $(".slick-prev").css("left", "50%");
        //     console.log($(".slick-prev"));
        //     $(".slick-next").css("right", screenWidth + sliderDotsWidth);
        // });
    }

    componentWillUnmount() {
        const screen = $(window);
        screen.unbind('scroll');
        screen.off('scroll');
        for (let i = 0; i < 100; i++) {
            window.clearInterval(i);
        }
    }

    componentDidUpdate() {
        this.state.videos.map(video => {
            let { attributes: { videos: videoList } } = video,
                screen = $(window),
                screenWidthHalf = screen.width() / 2,
                sliderDotsWidth = (videoList.length + .5) * 20;
            $(".slick-prev").css("left", screenWidthHalf - sliderDotsWidth);
            $(".slick-next").css("right", screenWidthHalf - sliderDotsWidth * 1.1);
        });
    }

    handleScrollToIndex = id => {
        let scrollIndex;
        const { playlists } = this.state,
            screen = $(window),
            screenHeight = screen.height();
        playlists.map((playlist, index) => {
            if (id === playlist.id) {
                scrollIndex = index;
                $('html,body').animate({scrollTop: `${scrollIndex*screenHeight}px`}, { duration: 350 });
                return false;
            }
            return true;
        });
    }

    render() {
        const { cover, coverUrl, playlists, videos }  = this.state,
            SampleNextArrow = props => {
                const { className, style, onClick } = props;
                return (
                    <div
                        className={className}
                        style={{ ...style, display: "block" }}
                        onClick={onClick}
                    />
                );
            },
            SamplePrevArrow = props => {
                const { className, style, onClick } = props;
                return (
                    <div
                        className={className}
                        style={{ ...style, display: "block" }}
                        onClick={onClick}
                    />
                );
            },
            settings = {
                dots: true,
                // dotsClass: styles.home__slider_dots,
                infinite: true,
                speed: 700,
                slidesToShow: 1,
                slidesToScroll: 1,
                pauseOnHover: false,
                adaptiveHeight: true,
                autoplay: true,
                autoplaySpeed: 5000,
                lazyLoad: 'ondemand',
                arrows: true,
                cssEase: 'linear',
            };
            // console.log("playlist: ", playlists);
            // console.log("videos: ", videos);

        return (
            <div className={styles.home__container} style={{ height: `${playlists.length * 100}vh` }}>
                <Header />
                <Navbar playlists={playlists} onClick={this.handleScrollToIndex}/>
                {videos.map(video => {
                    const { attributes: { videos: videoList } } = video,
                        screen = $(window),
                        screenWidth = screen.width(),
                        sliderDotsWidth = videoList.length * 20;
                        // console.log(videoList);
                        // const { attributes: { videos: videoList } } = video,
                        // screen = $(window),
                        // screenWidth = screen.width(),
                        // sliderDotsWidth = videoList.length * 20;
                    return (
                        <div className={styles.home__slider_container}>
                        <Slider
                            nextArrow={<FaChevronRight size={10} color="black" />}
                            prevArrow={<FaChevronLeft size={10} color="black" />}
                            {...settings}
                        >
                            {videoList.map(eachVids => {
                                const {
                                    attributes: {
                                        title,
                                        description,
                                        shortDescription,
                                        coverUrl,
                                        isDark,
                                        layer1,
                                        layer2,
                                        layer3
                                    }
                                } = eachVids;
                                return (
                                    <div className={styles.home__parallax}>
                                        <LazyLoad>
                                            <Parallax
                                                offsetYMin={-10}
                                                offsetYMax={10}
                                            >
                                                <img alt="" src={layer3} className={styles.home__parallax_layer_3} />
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
                                                <img alt="" src={layer1} />
                                                <div className={styles.home__parallax_layer_1_info}>
                                                    <h4 className={styles.home__parallax_layer_1_title}>{title}</h4>
                                                    <p className={styles.home__parallax_layer_1_desc}>{shortDescription}</p>
                                                </div>
                                            </Parallax>
                                        </LazyLoad>
                                    </div>
                                )
                            })}
                        </Slider>
                        </div>
                    );
                })}
            </div>
        )
    }
}

export default Home;
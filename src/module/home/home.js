import React, { Component } from 'react';
import { get } from 'axios';
import Header from '@components/header';
import Navbar from '@components/navigation';

import $ from 'jquery';

import styles from './home.css';

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
            trackedPlaylistIds = []; /** tracked the playlist/videos id both similar */
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

                screen.scroll(() => {
                    let currentScroll = screen.scrollTop(),
                        screenHeight = screen.height(),
                        currentPlaylistIndex = currentScroll > prevScroll
                            ? Math.ceil(currentScroll / screenHeight)
                            : Math.trunc(currentScroll / screenHeight),
                        playlists = playlistsData
                            .map((playlist, index) => {
                                if (index === currentPlaylistIndex) {
                                    if (trackedPlaylistIds.indexOf(playlist.id) === -1) {
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
                                    }
                                    return { ...playlist, isActive: true };
                                } else {
                                    return { ...playlist, isActive: false };
                                }
                            });
                    prevScroll = currentScroll;
                    this.setState({ playlists });
                });
            });
    }

    componentWillUnmount() {
        const screen = $(window);
        screen.unbind('scroll');
    }

    handleScrollToIndex = id => {
        let scrollIndex;
        const { playlists } = this.state,
            screen = $(window),
            screenHeight = screen.height();
        playlists.map((playlist, index) => {
            if (id === playlist.id) {
                scrollIndex = index;
            }
            return true;
        });
        $('html,body').animate({scrollTop: `${scrollIndex*screenHeight}px`},'slow');
    }

    render() {
        const { cover, coverUrl, playlists }  = this.state;
        return (
            <div className={styles.home__container} style={{ maxHeight: `${playlists.length * 100}vh` }}>
                <Header />
                <Navbar playlists={playlists} onClick={this.handleScrollToIndex}/>
            </div>
        )
    }
}

export default Home;
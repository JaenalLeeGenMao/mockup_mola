import React, { Component, Fragment } from 'react';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';
import history from '../../history';

import { theoScripts, theoStyle, theoLibraryLocation } from './config';

import playerArrow from './assets/arrowback.png';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Theoplayer.css';

class Theoplayer extends Component {
  state = {
    toggleArrow: '',
    isTheoplayerLoaded: false,
    isFullscreen: false
  };

  static propTypes = {
    movieUrl: PropTypes.string.isRequired,
    // kind: PropTypes.string.isRequired,
    // label: PropTypes.string.isRequired,
    // subTitleUrl: PropTypes.string.isRequired,
    // srclang: PropTypes.string.isRequired,
    isTrailer: PropTypes.bool.isRequired,
    theoConfig: PropTypes.array.isRequired
  };

  configTheoPlayer = () => {
    const playerConfig = {
      libraryLocation: theoLibraryLocation,
      ui: {
        fluid: true
      }
    };
    this.theoPlayer = new window.THEOplayer.Player(this.containerPlayer, playerConfig);
    return this.theoPlayer;
  };

  configVideoPlayer = () => {
    this.player.source = {
      sources: [
        {
          src: this.props.movieUrl,
          type: 'application/x-mpegurl' // sets type to HLS
        }
      ],
      textTracks: this.props.theoConfig
    };
  };

  loadTheoPlayer() {
    const { autoPlay, noPause, allowMutedAutoplay, showReplayButton, callbackOnPlay, handleTheoplayerLoaded } = this.props;

    this.player = this.configTheoPlayer();
    this.configVideoPlayer();
    this.player.muted = true;
    if (autoPlay) {
      if (allowMutedAutoplay) {
        this.player.muted = true;
      }
      this.player.play();
    }

    const that = this;
    this.player.addEventListener('pause', function() {
      if (noPause) {
        that.player.play();
      }
    });

    this.player.addEventListener('ended', function() {
      // console.log("ENDED")
      if (showReplayButton) {
        that.player.stop();
        this.setState({
          isEnded: true
        });
      }
    });

    this.player.addEventListener('playing', function() {
      if (callbackOnPlay) {
        // console.log("MASUKKKK")
        callbackOnPlay(true);
      }
    });

    this.setState({ isTheoplayerLoaded: true });
    handleTheoplayerLoaded(true);
  }

  loadDynamicScript = () => {
    let existingScript = true;
    theoScripts.map(dt => {
      const el = document.getElementById(dt.id);
      const elExist = el ? true : false;
      existingScript = existingScript && elExist;
    });

    if (!existingScript) {
      const scriptCount = theoScripts.length;
      let loadedScriptCount = 0;
      theoScripts.map(dt => {
        const script = document.createElement('script');
        script.src = dt.src;
        script.id = dt.id;
        document.body.appendChild(script);
        script.onload = () => {
          loadedScriptCount += 1;
          if (loadedScriptCount >= scriptCount) {
            this.loadTheoPlayer();
          }
        };
      });
    } else {
      this.loadTheoPlayer();
    }
    return false;
  };

  loadDynamicStyle = () => {
    let existingStyle = true;
    theoStyle.map(dt => {
      const el = document.getElementById(dt.id);
      const elExist = el ? true : false;
      existingStyle = existingStyle && elExist;
    });

    if (!existingStyle) {
      theoStyle.map(dt => {
        const head = document.getElementsByTagName('head')[0];
        const link = document.createElement('link');
        link.id = dt.id;
        link.rel = dt.rel;
        link.type = dt.type;
        link.href = dt.href;
        link.media = dt.media;
        head.appendChild(link);
      });
    }
  };

  componentDidMount() {
    this.loadDynamicStyle();
    this.loadDynamicScript();
    this.loadFullscreenEvent();
  }

  componentWillUnmount() {
    if (this.player) {
      window.screen.orientation.unlock();
      this.player.destroy();
    }
  }

  loadFullscreenEvent = () => {
    ['', 'webkit', 'moz', 'ms'].forEach(prefix => document.addEventListener(prefix + 'fullscreenchange', this.handleFullscreen, false));
  };

  handleFullscreen = () => {
    const { isFullscreen } = this.state;
    this.setState({ isFullscreen: !isFullscreen }, () => {
      if (!isFullscreen) {
        window.screen.orientation.lock('landscape');
      } else {
        window.screen.orientation.unlock();
      }
    });
  };

  handleGoBack = () => {
    const { goBack } = history;
    if (goBack) {
      goBack();
    }
  };

  getToggleArrow = () => {
    if (!this.state.toggleArrow) {
      this.setState(
        {
          toggleArrow: s.arrow_show
        },
        () => {
          setTimeout(() => {
            this.setState({ toggleArrow: '' });
          }, 5000);
        }
      );
    }
  };

  render() {
    // const addOnClass = `${s.mola_frame}`;
    // {/* <Helmet> */}
    //       {/* <link rel="stylesheet" type="text/css" href="https://cdn.theoplayer.com/dash/5acd847e-4a8d-4a7b-85a4-ccfd12d5562d/ui.css" /> */}
    //       {/* <link rel="stylesheet" type="text/css" href="https://cdn.theoplayer.com/dash/theoplayer/ui.css" />
    //       <script type="text/javascript" src="//imasdk.googleapis.com/js/sdkloader/ima3.js" />
    //       <script type="text/javascript" src="https://www.gstatic.com/cv/js/sender/v1/cast_sender.js?loadCastFramework=1" /> */}
    //       {/* <script src="https://cdn.theoplayer.com/dash/2a34c3ad-fc3b-4da9-b399-bccdff7c65fd/THEOplayer.js" /> */}
    //       {/* <script src="https://cdn.theoplayer.com/dash/theoplayer/THEOplayer.js" /> */}
    //     {/* </Helmet> */}
    const { toggleArrow } = this.state;
    return (
      <div
        className="video-container video-js theoplayer-skin"
        onMouseMove={this.getToggleArrow}
        onMouseLeave={this.getToggleArrow}
        ref={el => {
          this.containerPlayer = el;
        }}
      >
        {this.props.isTrailer && (
          <div className={`${s.arrow} ${toggleArrow}`} onClick={this.handleGoBack}>
            <img src={playerArrow} />
          </div>
        )}
      </div>
    );
  }
}

export default withStyles(s)(Theoplayer);

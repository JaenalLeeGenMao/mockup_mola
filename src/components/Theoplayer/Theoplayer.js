import React, { Component, Fragment } from 'react';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';
import history from '../../history';
import Layout from '@components/Molalayout';

import playerArrow from './assets/arrowback.png';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Theoplayer.css';

class Theoplayer extends Component {
  state = {
    toogleArrow: '',
    isTheoplayerLoaded: false
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

  componentDidUpdate() {
    var playerConfig = {
      libraryLocation: '//cdn.theoplayer.com/dash/2a34c3ad-fc3b-4da9-b399-bccdff7c65fd/',
      ui: {
        fluid: true
      }
    };

    var element = document.querySelector('.video-container');

    if (!this.state.isTheoplayerLoaded) {
      var player = new THEOplayer.Player(element, playerConfig);
      this.movieConfig(player);
      // // auto play when hit api
      // // player.autoplay = true;
      player.muted = true;
      player.play();

      this.setState({ isTheoplayerLoaded: true });
    }
  }

  handleGoBack = () => {
    const { goBack } = history;
    if (goBack) {
      goBack();
    }
  };

  movieConfig(player) {
    player.source = {
      sources: [
        {
          src: this.props.movieUrl,
          type: 'application/x-mpegurl' // sets type to HLS
        }
      ],
      textTracks: this.props.theoConfig
    };
  }

  getToggleArrow = () => {
    this.setState({
      toogleArrow: this.state.toogleArrow === '' ? s.arrow_show : ''
    });
  };

  render() {
    // const addOnClass = `${s.mola_frame}`;
    const { toogleArrow } = this.state;
    return (
      <Fragment>
        <Helmet>
          <link rel="stylesheet" type="text/css" href="https://cdn.theoplayer.com/dash/5acd847e-4a8d-4a7b-85a4-ccfd12d5562d/ui.css" />
          <script type="text/javascript" src="//imasdk.googleapis.com/js/sdkloader/ima3.js" />
          <script type="text/javascript" src="https://www.gstatic.com/cv/js/sender/v1/cast_sender.js?loadCastFramework=1" />
          <script src="https://cdn.theoplayer.com/dash/2a34c3ad-fc3b-4da9-b399-bccdff7c65fd/THEOplayer.js" />
        </Helmet>
        <Layout>
          <div className="video-container video-js theoplayer-skin" onMouseEnter={this.getToggleArrow} onMouseLeave={this.getToggleArrow}>
            {this.props.isTrailer && (
              <div className={`${s.arrow} ${toogleArrow}`} onClick={this.handleGoBack}>
                <img src={playerArrow} />
              </div>
            )}
          </div>
        </Layout>
      </Fragment>
    );
  }
}

export default withStyles(s)(Theoplayer);

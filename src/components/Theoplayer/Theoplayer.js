import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import history from '../../history';
import Layout from '@components/Molalayout';

import playerArrow from './assets/arrowback.png'
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Theoplayer.css';

class Theoplayer extends Component {

  state = {
    toogleArrow: '',
  }

  static propTypes = {
    movieUrl: PropTypes.string.isRequired,
    kind: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    subTitleUrl: PropTypes.string.isRequired,
    srclang: PropTypes.string.isRequired,
    isTrailer: PropTypes.bool.isRequired,
  };

  componentDidMount() {
    var playerConfig = {
      "libraryLocation": "//cdn.theoplayer.com/dash/theoplayer/",
      ui: {
        fluid: true
      },
    };

    var element = document.querySelector('.video-container');
    var player = new THEOplayer.Player(element, playerConfig);
    this.movieConfig(player);

    // auto play when hit api
    player.autoplay = true;
  }

  handleGoBack = () => {
    const { goBack } = history;
    if (goBack) {
      goBack();
    }
  }

  movieConfig(player) {
    player.source = {
      sources : [{
        src : this.props.movieUrl,
        type : 'application/x-mpegurl' // sets type to HLS
      }],
      textTracks : [{
        default: true, //optional
        kind: this.props.kind,
        label: this.props.label,
        src: this.props.subTitleUrl,
        srclang: this.props.srclang,
        // kind : 'subtitles', //optional - other values findable at https://support.theoplayer.com/hc/en-us/articles/214350425#TextTrackDescription
        // label: 'Indonesia', //optional
        // src : 'example.srt',
        //srclang : 'id'

      }]
    };
  }

  getToggleArrow = () => {
    this.setState({
      toogleArrow: this.state.toogleArrow === '' ? s.arrow_show : ''
    })
  }

  render() {
    const addOnClass = `${s.mola_frame}`;
    const { toogleArrow } = this.state;
    return (
      <Fragment>
        <Layout>
          <div className= 'video-container video-js theoplayer-skin' onMouseEnter={this.getToggleArrow} onMouseLeave={this.getToggleArrow}>
            {this.props.isTrailer && <div className={`${s.arrow} ${toogleArrow}`} onClick={this.handleGoBack}>
              <img src={playerArrow}/>
            </div>}
          </div>
        </Layout>
      </Fragment>
    )
  }
}

export default withStyles (s)(Theoplayer);
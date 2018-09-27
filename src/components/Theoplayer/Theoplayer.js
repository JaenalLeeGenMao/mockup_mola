import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import history from '../../history';
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
    const { toogleArrow } = this.state;
    return (
      <Fragment>
        <div className="video-container video-js theoplayer-skin" onMouseEnter={this.getToggleArrow} onMouseLeave={this.getToggleArrow}>
          <div className={`${s.arrow} ${toogleArrow}`} onClick={this.handleGoBack}>
            <img/>
          </div>
          <div className="sstv-banner">
            <a href="" target="_blank" title=""><img src="" alt="" /></a>
          </div>
        </div>
      </Fragment>
    )
  }
}

export default withStyles (s)(Theoplayer);
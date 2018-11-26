import React, { Component, Fragment } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import history from '../../history';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import * as movieStreamActions from '@actions/movie-stream';

import loader from '@global/style/animation/ellipsis.svg';

// import Theoplayer from '../../components/Theoplayer/Theoplayer';
import s from './movie-player.css';

import { customTheoplayer } from './theoplayer-style';
const { getComponent } = require(process.env.REACT_APP_ENV === 'staging' ? '../../../../gandalf' : '@supersoccer/gandalf');
const Theoplayer = getComponent('theoplayer');

class Movieplayer extends Component {
  state = {
    movieStream: [],
    isTheoplayerLoaded: false
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    const { getMovieStream, movieStream, movieId } = nextProps;
    if (nextProps.movieStream.meta.status === 'loading' && prevState.movieStream.length <= 0) {
      getMovieStream(movieId);
    }
    return { ...prevState, movieStream };
  }

  handleTheoplayerLoaded = loaded => {
    this.setState({ isTheoplayerLoaded: loaded });
  };

  isTheoPlayer() {
    const { movieStream: { data: movieStream } } = this.props;
    const subtitlesDt = movieStream.length > 0 ? movieStream[0].subtitles : '';
    // console.log('data subtitles methode', subtitlesDt)

    const myTheoPlayer = subtitlesDt.map(obj => ({
      kind: obj.type,
      srclang: obj.attributes.locale,
      src: obj.attributes.url,
      label: obj.attributes.label
    }));
    // console.log('myTheoPlayer', myTheoPlayer)
    return myTheoPlayer;
  }

  handleGoBack() {
    const { goBack } = history;
    if (goBack) {
      goBack();
    }
  }

  render() {
    const { movieStream: { meta: { status: movieStreamStatus }, data: movieStream }, isMobile } = this.props;
    const streamSource = movieStream.length > 0 ? movieStream[0].streamSourceUrl : '';
    // const streamSource = 'http://cdn.theoplayer.com/video/big_buck_bunny/big_buck_bunny.m3u8';

    return (
      <Fragment>
        <div id={s.movie_player}>
          {!this.state.isTheoplayerLoaded &&
            streamSource !== '' && (
            <div className={s.movie_player__loader}>
              <img alt="loader" src={loader} />
            </div>
          )}
          {movieStreamStatus === 'success' &&
            streamSource && <Theoplayer
            className={customTheoplayer}
            theoConfig={this.isTheoPlayer()}
            autoPlay
            handleTheoplayerLoaded={this.handleTheoplayerLoaded}
            movieUrl={streamSource}
            isTrailer={true}
            isMobile={isMobile}
          />
          }
          {movieStreamStatus === 'success' &&
            streamSource === '' && (
            <div className={s.container}>
              <div className={s.no_video}>Video not available</div>
              <p className={s.novid_btn} onClick={this.handleGoBack}>
                  Go Back
              </p>
            </div>
          )}
        </div>
      </Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    ...state
  };
}

const mapDispatchToProps = dispatch => ({
  getMovieStream: movieId => dispatch(movieStreamActions.getMovieStream(movieId))
});

export default compose(withStyles(s), connect(mapStateToProps, mapDispatchToProps))(Movieplayer);

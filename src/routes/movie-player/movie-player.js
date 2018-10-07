import React, { Component, Fragment } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import * as movieStreamActions from '@actions/movie-stream';

import Theoplayer from '../../components/Theoplayer/Theoplayer';

class Movieplayer extends Component {
  state = {
    movieStream: []
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    const { getMovieStream, movieStream, movieId } = nextProps;
    if (nextProps.movieStream.meta.status === 'loading' && prevState.movieStream.length <= 0) {
      getMovieStream(movieId);
    }
    return { ...prevState, movieStream };
  }

  isTheoPlayer() {
    const {
      movieStream: { data: movieStream }
    } = this.props;
    const subtitlesDt = movieStream.length > 0 ? movieStream[0].subtitles : '';
    // console.log('data subtitles methode', subtitlesDt)

    const myTheoPlayer = subtitlesDt.map(obj => ({
      kind: obj.type,
      srclang: obj.attributes.locale,
      src: obj.attributes.url
    }));
    // console.log('myTheoPlayer', myTheoPlayer)
    return myTheoPlayer;
  }

  render() {
    const {
      movieStream: { data: movieStream }
    } = this.props;
    const streamSource = movieStream.length > 0 ? movieStream[0].streamSourceUrl : '';

    return (
      <Fragment>
        {streamSource ? (
          <Theoplayer theoConfig={this.isTheoPlayer()} movieUrl={streamSource} isTrailer={true} />
        ) : (
          ''
        )}
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

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(Movieplayer);

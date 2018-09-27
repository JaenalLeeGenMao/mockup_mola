import React, { Component, Fragment } from 'react';
import { compose } from 'redux'
import { connect } from 'react-redux'
import * as movieStreamActions from '@actions/movie-stream';

import Theoplayer from '../../components/Theoplayer/Theoplayer';

class Movieplayer extends Component {
  state = {
    movieStream: [],
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const {
      getMovieStream,
      movieStream,
      movieId
    } = nextProps;
    if (nextProps.movieStream.meta.status === 'loading'  && prevState.movieStream.length <= 0) {
      getMovieStream(movieId);
    }
    return { ...prevState, movieStream };
  }

  render() {

    const { movieStream: { data : movieStream } } = this.props;
    console.log('from index : ', movieStream[0]);

    const streamSource = movieStream.length > 0 ? movieStream[0].streamSourceUrl : null;
    console.log('streamSource', streamSource)

    const movieConfig = {
      movieSrc: streamSource,//'http://cdn.theoplayer.com/video/big_buck_bunny/big_buck_bunny.m3u8',
      kind: 'subtitles',
      label: 'Indonesia',
      subTitleUrl: 'example.srt',
      srclang: 'id',
    }
    return (
      <Fragment>
        <Theoplayer
          movieUrl={movieConfig.movieSrc}
          kind={movieConfig.kind}
          label={movieConfig.label}
          subTitleUrl={movieConfig.subTitleUrl}
          srclang={movieConfig.srclang}
        />
      </Fragment>
    )
  }
}

function mapStateToProps(state) {
  return {
    ...state
  }
}

const mapDispatchToProps = (dispatch) => ({
  getMovieStream: movieId => dispatch(movieStreamActions.getMovieStream(movieId)),
})

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
)(Movieplayer)

import React, { Component, Fragment } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import history from '../../history'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import * as movieStreamActions from '@actions/movie-stream'

import loader from '@global/style/animation/ellipsis.svg'

// import Theoplayer from '../../components/Theoplayer/Theoplayer';
import s from './movie-player.css'

import { customTheoplayer } from './theoplayer-style'
const { getComponent } = require('@supersoccer/gandalf')
const Theoplayer = getComponent('theoplayer')

class Movieplayer extends Component {
  state = {
    movieStream: [],
    isTheoplayerLoaded: false,
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { getMovieStream, movieStream, movieId } = nextProps
    if (nextProps.movieStream.meta.status === 'loading' && prevState.movieStream.length <= 0) {
      getMovieStream(movieId)
    }
    return { ...prevState, movieStream }
  }

  handleTheoplayerLoaded = loaded => {
    this.setState({ isTheoplayerLoaded: loaded })
  }

  isTheoPlayer() {
    const { movieStream: { data: movieStream } } = this.props
    const subtitlesDt = movieStream.length > 0 ? movieStream[0].subtitles : ''
    // console.log('data subtitles methode', subtitlesDt)

    const myTheoPlayer = subtitlesDt.map(obj => ({
      kind: obj.type,
      srclang: obj.attributes.locale,
      src: obj.attributes.url,
      label: obj.attributes.label,
    }))
    // console.log('myTheoPlayer', myTheoPlayer)
    return myTheoPlayer
  }

  handleGoBack() {
    const { goBack } = history
    if (goBack) {
      goBack()
    }
  }

  render() {
    const { movieStream: { meta: { status: movieStreamStatus }, data: movieStream }, isMobile } = this.props
    const streamSource = movieStream.length > 0 ? movieStream[0].streamSourceUrl : ''
    // const streamSource = 'http://cdn.theoplayer.com/video/big_buck_bunny/big_buck_bunny.m3u8';
    // const streamSource = 'https://cdn-mxs-01.akamaized.net/Content/HLS/VOD/f7e2c67e-0ef9-4f7f-bc7f-7ffaef22d574/c0de6451-cd85-84e0-fcd7-ea805ff7a6f2/index.m3u8?hdnts=st=1543293273~exp=1543296873~acl=/*~hmac=c5f88ed48821603d1b087c29666e89587bb5df96d5025cfe8c75915f21e29b1e';

    return (
      <Fragment>
        <div id={s.movie_player}>
          {!this.state.isTheoplayerLoaded &&
            streamSource !== '' && (
              <div className={s.movie_player__loader}>
                <img alt="mola loader" src={loader} />
              </div>
            )}
          {movieStreamStatus === 'success' &&
            streamSource && (
              <Theoplayer
                className={customTheoplayer}
                theoConfig={this.isTheoPlayer()}
                autoPlay
                handleTheoplayerLoaded={this.handleTheoplayerLoaded}
                movieUrl={streamSource}
                isTrailer={true}
                isMobile={isMobile}
              />
            )}
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
    )
  }
}

function mapStateToProps(state) {
  return {
    ...state,
  }
}

const mapDispatchToProps = dispatch => ({
  getMovieStream: movieId => dispatch(movieStreamActions.getMovieStream(movieId)),
})

export default compose(withStyles(s), connect(mapStateToProps, mapDispatchToProps))(Movieplayer)

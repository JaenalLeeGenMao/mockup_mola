import React from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'

import withStyles from 'isomorphic-style-loader/lib/withStyles'
import Header from '@components/Header'
import LazyLoad from '@components/common/Lazyload'
import Carousel from '@components/carousel-portrait'
import VideoCard from '@components/video-card'
import Placeholder from './placeholder'
import s from './playlist.css'
import moment from 'moment'

class Playlist extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const { playlistId } = this.props
    // console.log(playlistId)
  }

  renderPlaylistTitleDescription() {
    return (
      <div className={s.playlist_head}>
        <h1> Premier League Classic</h1>
        <p>Lorem Ipsumdsadasdasdd dsakjndkajs donasodnasoind</p>
      </div>
    )
  }

  renderPlaylist() {
    return (
      <LazyLoad>
        <div className={s.playlist_list}>
          <p className={s.season_text}>Season 1</p>
          <Carousel framePadding={'0px 2rem'} slidesToShow={8.3} slidesToScroll="3" cellSpacing={0} dragging={true}>
            <VideoCard description="Virgil van dyik, the  Real EPL WALL" src="https://placeimg.com/640/800/any" />
            <VideoCard description="Virgil van dyik, the  Real EPL WALL" src="https://placeimg.com/640/800/any" />
            <VideoCard description="Virgil van dyik, the  Real EPL WALL" src="https://placeimg.com/640/800/any" />
            <VideoCard description="Virgil van dyik, the  Real EPL WALL" src="https://placeimg.com/640/800/any" />
            <VideoCard description="Virgil van dyik, the  Real EPL WALL" src="https://placeimg.com/640/800/any" />
            <VideoCard description="Virgil van dyik, the  Real EPL WALL" src="https://placeimg.com/640/800/any" />
            <VideoCard description="Virgil van dyik, the  Real EPL WALL" src="https://placeimg.com/640/800/any" />
            <VideoCard description="Virgil van dyik, the  Real EPL WALL" src="https://placeimg.com/640/800/any" />
            <VideoCard description="Virgil van dyik, the  Real EPL WALL" src="https://placeimg.com/640/800/any" />
            <VideoCard description="Virgil van dyik, the  Real EPL WALL" src="https://placeimg.com/640/800/any" />
            <VideoCard description="Virgil van dyik, the  Real EPL WALL" src="https://placeimg.com/640/800/any" />
            <VideoCard description="Virgil van dyik, the  Real EPL WALL" src="https://placeimg.com/640/800/any" />
            <VideoCard description="Virgil van dyik, the  Real EPL WALL" src="https://placeimg.com/640/800/any" />
          </Carousel>
        </div>
      </LazyLoad>
    )
  }

  render() {
    // const testProps = this.props.playlist.genreSpo
    // console.log('testProps ind', testProps)

    const isDark = false

    return (
      <>
        <div className={s.headerContainer}>
          <Header libraryOff activeMenu="movie" isDark={isDark} {...this.props} />
        </div>
        <div className={s.root}>
          <div className={s.playlist_container} id="containercard">
            {this.renderPlaylistTitleDescription()}
            {this.renderPlaylist()}
            {this.renderPlaylist()}
            {this.renderPlaylist()}
            {this.renderPlaylist()}
          </div>
        </div>
      </>
    )
  }
}

function mapStateToProps(state) {
  return {
    ...state,
  }
}
// const mapDispatchToProps = dispatch => ({
//   getMatches: id => dispatch(matchListActions.getAllMatches(id)),
//   getGenreMatches: id => dispatch(matchListActions.getAllGenreSpo(id)),
// })

export default compose(withStyles(s), connect(mapStateToProps))(Playlist)

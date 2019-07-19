import React, { Component } from 'react'
import Lazyload from '@components/common/Lazyload/Lazyload'

import { placeholderCardLandscape } from '@global/imageUrl'

import { playlistContainer } from './style'

class PlaylistCard extends Component {
  state = {
    show: false,
  }

  handleTitleShow = (show = false) => {
    this.setState({ show: show === 'success' ? true : false })
    // if (this.props.onLoad) {
    //   this.props.onLoad()
    // }
  }

  render() {
    const { id, name, src, description, onClick = () => {}, containerClassName = '', className = '', transitionMode = 'scroll' } = this.props,
      { show } = this.state
    return (
      <div onClick={() => onClick()} className={`${playlistContainer} ${containerClassName}`}>
        <img className={`${transitionMode === 'scroll' ? 'bannerImage' : 'bannerImage3d'} ${className} ${!show ? '' : 'hide'}`} src={placeholderCardLandscape} />
        <Lazyload className={`${transitionMode === 'scroll' ? 'bannerImage' : 'bannerImage3d'}`} src={src} handleCallback={this.handleTitleShow} />
        <p>{description}</p>
      </div>
    )
  }
}

export default PlaylistCard

import React, { Component } from 'react'
import Lazyload from '@components/common/Lazyload/Lazyload'

import { playlistContainer } from './style'

class PlaylistCard extends Component {
  render() {
    const { id, name, src, description, onClick = () => {} } = this.props
    return (
      <div onClick={() => onClick()} className={playlistContainer}>
        <Lazyload className="bannerImage" src={src} handleCallback={this.handleTitleShow} />
        <p>{description}</p>
      </div>
    )
  }
}

export default PlaylistCard

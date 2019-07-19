import React, { Component } from 'react'
import Lazyload from '@components/common/Lazyload/Lazyload'

import { videoContainer, imageStyle } from './style'

class VideoCard extends Component {
  render() {
    const { src, description, onClick = () => {}, imageWidth, imageHeight } = this.props
    return (
      <div onClick={() => onClick()} className={videoContainer}>
        <img src={src} className={imageStyle} style={{ height: imageHeight || '25rem' }} />
        <p>{description}</p>
      </div>
    )
  }
}

export default VideoCard

import React, { Component } from 'react'
import Lazyload from '@components/common/Lazyload/Lazyload'

import { placeholderCardPortrait } from '@global/imageUrl'

import { videoContainer, icons } from './style'

class VideoCard extends Component {
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
    const { src, description, onClick = () => {}, containerClassName = '', className = '', transitionMode = 'scroll' } = this.props,
      { show } = this.state

    return (
      <div onClick={() => onClick()} className={`${videoContainer} ${containerClassName}`}>
        <img className={`${transitionMode === 'scroll' ? 'bannerImage' : 'bannerImage3d'} ${className} ${!show ? '' : 'hide'}`} src={placeholderCardPortrait} />
        <div className="imageWrapper">
          <Lazyload className={`${transitionMode === 'scroll' ? 'bannerImage' : 'bannerImage3d'}`} src={src} handleCallback={this.handleTitleShow} />
          {show && (
            <div className={icons}>
              <span className="playIcon" />
            </div>
          )}
        </div>
        <p>{description}</p>
      </div>
    )
  }
}

export default VideoCard
import React, { Component } from 'react'
import Lazyload from '@components/common/Lazyload/Lazyload'

import { getContentTypeName } from '@source/lib/globalUtil'

import { placeholderBlankLandscape } from '@global/imageUrl'

import { playlistContainer, icons } from './style'

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
    const {
        id,
        title,
        src,
        contentType = '',
        description,
        onClick = () => {},
        containerClassName = '',
        className = '',
        transitionMode = 'scroll',
      } = this.props,
      { show } = this.state

    const contentTypeName = getContentTypeName(contentType),
      whitelistContentTypes = {
        vod: 'playIcon' /** videos */,
        movie: 'playIcon' /** videos */,
        linear: 'tvIcon' /** channels */,
        live: 'liveIcon' /** matches */,
        replay: 'matchIcon' /** matches */,
        trailers: 'playIcon' /** videos */,
        'mola-featured': 'tvIcon' /** videos */,
        // 'mola-categories': 'matchIcon' /** videos */,
        articles: 'articleIcon' /** videos */,
      }

    return (
      <div
        onClick={() => onClick()}
        className={`${playlistContainer} ${containerClassName} ${transitionMode === 'scroll' ? '' : 'hoverOff'}`}
      >
        <img
          className={`${transitionMode === 'scroll' ? 'bannerImage' : 'bannerImage3d'} ${className} ${
            !show ? '' : 'hide'
          }`}
          src={placeholderBlankLandscape}
        />
        <div className="imageWrapper">
          <Lazyload
            className={`${transitionMode === 'scroll' ? 'bannerImage' : 'bannerImage3d'}`}
            src={src}
            handleCallback={this.handleTitleShow}
          />
          {show &&
            whitelistContentTypes[`${contentTypeName}`] && (
              <div className={icons}>
                <span className={`${whitelistContentTypes[`${contentTypeName}`]}`} />
              </div>
            )}
        </div>
        <p>{description}</p>
      </div>
    )
  }
}

export default PlaylistCard

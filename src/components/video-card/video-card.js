import React, { Component } from 'react'
import dateFormat from 'dateformat'
import _ from 'lodash'

import Lazyload from '@components/common/Lazyload/Lazyload'

import { getContentTypeName } from '@source/lib/globalUtil'

import { placeholderBlankPortrait } from '@global/imageUrl'

import { videoContainer, icons } from './style'

class VideoCard extends Component {
  state = {
    show: false,
  }

  // componentDidMount() {
  //   console.log(this.props.data, 'ini data objek')
  // }

  handleTitleShow = (show = false) => {
    this.setState({ show: show === 'success' ? true : false })
    // if (this.props.onLoad) {
    //   this.props.onLoad()
    // }
  }

  render() {
    const {
        src,
        contentType = '',
        description,
        onClick = () => {},
        containerClassName = '',
        className = '',
        transitionMode = 'scroll',
        data,
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
    let sortPlatform = _.orderBy(data && data.platforms, ['id'], ['asc']) || []
    const platforms = sortPlatform.length > 0 && sortPlatform[0].status === 1
    const isVideos = data && data.type === 'videos'
    // const showDate = data && data.contentType === 3 && isVideos ? true : false
    const showDate = data
      ? data.contentType === 3 && isVideos ? 'upcoming' : data.contentType === 1 && isVideos ? 'highlights' : false
      : false
    const videoType = isVideos && data && data.contentType
    const isMatchType = videoType && (data.contentType === 1 || data.contentType === 3 || data.contentType === 4)

    return (
      <div onClick={() => onClick()} className={`${videoContainer} ${containerClassName}`}>
        <img
          className={`${transitionMode === 'scroll' ? 'bannerImage' : 'bannerImage3d'} ${className} ${
            !show ? '' : 'hide'
          }`}
          src={placeholderBlankPortrait}
        />
        <div className="imageWrapper">
          <Lazyload
            className={`${transitionMode === 'scroll' ? 'bannerImage' : 'bannerImage3d'}`}
            src={src}
            handleCallback={this.handleTitleShow}
          />
          {/* {show &&
            whitelistContentTypes[`${contentTypeName}`] && (
              <div className={icons}>
                <span className={`${whitelistContentTypes[`${contentTypeName}`]}`} />
              </div>
            )} */}
        </div>
        {/* <p className={'title'}>{description}</p>
        <p className={'time'}>Sat, 22 Feb 21:50</p>
        <p className={'platform'}>
          Premium on App
          <span className={'premiumIcon'} />
        </p> */}

        {isMatchType ? (
          <>
            <p className={'title'}>{description}</p>

            {/* show date */}
            {showDate === 'upcoming' ? (
              <p className={'time'}>{dateFormat(data.startTime * 1000, 'ddd, d mmm HH:MM')}</p>
            ) : // :
            // showDate === 'highlights' && data.startTime ?
            //   <p className={'time'}>FT, {dateFormat(data.startTime * 1000, 'd mmm yyyy')}</p>
            null}

            {/* show platforms */}
            {isVideos ? (
              platforms ? (
                <p className={'free'}>Free streaming on App</p>
              ) : (
                <p className={'platform'}>
                  Premium on App
                  <span className={'premiumIcon'} />
                </p>
              )
            ) : null}
          </>
        ) : null}
      </div>
    )
  }
}

export default VideoCard

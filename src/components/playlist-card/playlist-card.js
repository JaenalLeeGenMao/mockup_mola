import React, { Component } from 'react'
import Lazyload from '@components/common/Lazyload/Lazyload'
import dateFormat from 'dateformat'
import _ from 'lodash'

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
        bannerCard,
        showDesc,
        description,
        data,
        onClick = () => {},
        containerClassName = '',
        className = '',
        transitionMode = 'scroll',
        isLive,
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
      },
      isMatch = contentTypeName === 'live' || contentTypeName === 'replay'

    let sortPlatform = _.orderBy(data && data.platforms, ['name'], ['asc']) || []
    const platforms = sortPlatform.length > 0 && sortPlatform[0].status === 1
    const isVideos = data && data.type === 'videos'
    // const showDate = data && data.contentType === 3 && isVideos ? true : false
    const showDate = data
      ? data.contentType === 3 && isVideos ? 'upcoming' : data.contentType === 1 && isVideos ? 'highlights' : false
      : false

    const contentLeagueType = isVideos && data && data.league
    const videoType =
      data && data.contentType === 3
        ? 'Live Match'
        : data && data.contentType === 4 ? 'Replay' : data && data.contentType === 1 ? 'Highlights' : null
    // if (showDate) {
    //   console.log(data.title)
    // }

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

          {/* Live Icon */}
          {!bannerCard &&
            isLive && (
              <div className={icons}>
                <span className={'live-icon'}>LIVE</span>
              </div>
            )}
        </div>

        {/* Card Text */}
        {!bannerCard &&
          !showDesc && (
            <>
              <p className={'title'}>{description}</p>

              {/* show date */}
              {showDate === 'upcoming' ? (
                <p className={'time'}>{dateFormat(data.startTime * 1000, 'ddd, d mmm HH:MM')}</p>
              ) : // :
              // showDate === 'highlights' && data.startTime ?
              //   <p className={'time'}>FT, {dateFormat(data.startTime * 1000, 'd mmm yyyy')}</p>
              null}
              {contentLeagueType ? (
                <p className={'league'}>
                  {data.league.attributes.name} - {videoType}
                </p>
              ) : null}

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
          )}

        {/* Card Short Description */}
        {!bannerCard &&
          showDesc && (
            <>
              <p className={'title'}>{description}</p>
              <p className={'shortDesc'}>{data.shortDescription}</p>
            </>
          )}
      </div>
    )
  }
}

export default PlaylistCard

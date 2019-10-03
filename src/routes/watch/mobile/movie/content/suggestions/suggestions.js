import React from 'react'
const { getComponent } = require('@supersoccer/gandalf')
const VideoThumbnail = getComponent('video-thumbnail')

import LazyLoad from '@components/common/Lazyload'
import { unavailableImg } from '@global/imageUrl'
import Link from '@components/Link'
import {
  videoSuggestionTitle,
  videoSuggestionContainer,
  videoSuggestionWrapper,
  videoSuggestionPlayerDetail,
  titleSuggestions,
  titleWrapper,
  videoSuggestionIcon,
} from './style'

const Suggestions = ({ style = {}, videos = [] }) => {
  return (
    <>
      <div className={videoSuggestionTitle}>
        {/* <span className={videoSuggestionIcon}>Suggestions </span> */}
        <span>Suggestions </span>
      </div>
      <LazyLoad containerClassName={videoSuggestionContainer}>
        <div className={videoSuggestionWrapper} style={style}>
          {videos.map(({ video_id, cover_landscape, title }) => {
            const imageSource = cover_landscape || unavailableImg
            return (
              <Link to={`/watch?v=${video_id}`} key={video_id}>
                <VideoThumbnail
                  thumbnailUrl={`${imageSource}?w=720`}
                  thumbnailPosition="top"
                  className={videoSuggestionPlayerDetail}
                >
                  <div className={titleWrapper}>
                    <div className={titleSuggestions}> {title} </div>
                  </div>
                </VideoThumbnail>
              </Link>
            )
          })}
        </div>
      </LazyLoad>
    </>
  )
}

export default Suggestions

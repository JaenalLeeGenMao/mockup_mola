import React from 'react'
const { getComponent } = require('@supersoccer/gandalf')
const VideoThumbnail = getComponent('video-thumbnail')

import LazyLoad from '@components/common/Lazyload'
import { unavailableImg } from '@global/imageUrl'
import Link from '@components/Link'
import { videoSuggestionTitle, videoSuggestionContainer, videoSuggestionWrapper, videoSuggestionPlayerDetail, titleSuggestions, titleWrapper, videoSuggestionIcon } from './style'

const Suggestions = ({ style = {}, videos = [] }) => {
  return (
    <>
      <h2 className={videoSuggestionTitle}>
        <span className={videoSuggestionIcon} />Suggestions
      </h2>
      <LazyLoad containerClassName={videoSuggestionContainer}>
        <div className={videoSuggestionWrapper} style={style}>
          {videos.map(({ id, background, title }) => {
            const imageSource = background.landscape || unavailableImg
            return (
              <Link to={`/movie-detail/${id}`} key={id}>
                <VideoThumbnail thumbnailUrl={imageSource} thumbnailPosition="top" className={videoSuggestionPlayerDetail}>
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

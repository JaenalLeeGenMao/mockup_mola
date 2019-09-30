import React from 'react'
const { getComponent } = require('@supersoccer/gandalf')
const VideoThumbnail = getComponent('video-thumbnail')

import { getContentTypeName } from '@source/lib/globalUtil'

// import { unavailableImg } from '@global/imageUrl'
import Carousel from '@components/carousel'
import PlaylistCard from '@components/playlist-card'
import VideoCard from '@components/video-card'
import Link from '@components/Link'
import {
  videoSuggestionContainer,
  videoSuggestionWrapper,
  videoSuggestionInnerWrapper,
  videoSuggestionPlayer,
  videoSuggestionPlayerDetail,
  titleSuggestions,
  imageWrapper,
  playIcon,
} from './style'

const Suggestions = ({ style = {}, videos = [], contentType = '' }) => {
  const contentTypeName = getContentTypeName(contentType),
    isPortrait = contentTypeName === 'movie' || contentTypeName === 'vod' ? true : false
  return (
    <Carousel
      className={videoSuggestionContainer}
      wrap={false}
      autoplay={false}
      sliderCoin={true}
      dragging={true}
      withoutControls={true}
      slidesToShow={6.5}
      transitionMode={'scroll'}
    >
      {videos.map(obj => {
        if (isPortrait) {
          return (
            <Link to={`/watch?v=${obj.video_id}`} key={obj.video_id}>
              <VideoCard
                key={obj.video_id}
                alt={obj.title}
                description={obj.title}
                src={`${obj.cover_portrait}?w=540`}
              />
            </Link>
          )
        } else {
          return (
            <Link to={`/watch?v=${obj.video_id}`} key={obj.video_id}>
              <PlaylistCard
                key={obj.video_id}
                alt={obj.title}
                description={obj.title}
                src={`${obj.cover_landscape}?w=720`}
              />
            </Link>
          )
        }
      })}
    </Carousel>
  )
}

export default Suggestions

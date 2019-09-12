import React from 'react'
const { getComponent } = require('@supersoccer/gandalf')
const VideoThumbnail = getComponent('video-thumbnail')

// import { unavailableImg } from '@global/imageUrl'
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

const Suggestions = ({ style = {}, videos = [] }) => {
  return (
    <>
      <div className={videoSuggestionContainer}>
        <div className={videoSuggestionWrapper} style={style}>
          <div className={videoSuggestionInnerWrapper}>
            {videos.map(({ video_id, cover_landscape, title }) => {
              const imageSource = cover_landscape
              return (
                <Link to={`/watch?v=${video_id}`} key={video_id} className={videoSuggestionPlayer}>
                  <VideoThumbnail
                    thumbnailUrl={imageSource}
                    thumbnailPosition="wrap"
                    className={videoSuggestionPlayerDetail}
                    imgWrapperClassName={imageWrapper}
                    // detailStyle={{ position: 'absolute' }}
                  >
                    <div>
                      <span className={playIcon} />
                      <div className={titleSuggestions}>
                        {' '}
                        <span>{title}</span>
                      </div>
                    </div>
                  </VideoThumbnail>
                </Link>
              )
            })}
          </div>
        </div>
      </div>
    </>
  )
}

export default Suggestions

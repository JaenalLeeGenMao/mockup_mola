import React from 'react'
const { getComponent } = require('@supersoccer/gandalf')
const VideoThumbnail = getComponent('video-thumbnail')

import LazyLoad from '@components/common/Lazyload'
import { unavailableImg } from '@global/imageUrl'
import Link from '@components/Link'
import { videoSuggestionContainer, videoSuggestionWrapper, videoSuggestionInnerWrapper, videoSuggestionPlayer, videoSuggestionPlayerDetail, titleSuggestions, imageWrapper, playIcon } from './style'

const Suggestions = ({ style = {}, videos = [] }) => {
  return (
    <>
      <LazyLoad containerClassName={videoSuggestionContainer}>
        <div className={videoSuggestionWrapper} style={style}>
          <div className={videoSuggestionInnerWrapper}>
            {videos.map(({ id, background, title }) => {
              const imageSource = background.landscape || unavailableImg
              return (
                <Link to={`/movie-detail/${id}`} key={id} className={videoSuggestionPlayer}>
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
      </LazyLoad>
    </>
  )
}

export default Suggestions

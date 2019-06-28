import React from 'react'
const { getComponent } = require('@supersoccer/gandalf')
const VideoThumbnail = getComponent('video-thumbnail')

import LazyLoad from '@components/common/Lazyload'
import { unavailableImg } from '@global/imageUrl'
import Link from '@components/Link'
import { trailerTitle, trailerContainer, trailerWrapper, trailerPlayerDetail, titleTrailer, titleWrapper, trailerIcon } from './style'

const Trailer = ({ style = {}, videos = [] }) => {
  return (
    <>
      <h2 className={trailerTitle}>
        <span className={trailerIcon} />Trailers
      </h2>
      <LazyLoad containerClassName={trailerContainer}>
        <div className={trailerWrapper} style={style}>
          {videos.map(trailerData => {
            const { id, attributes: { images: { thumbnails: { preview } }, title } } = trailerData
            return (
              <Link to={`/movie-detail/${id}`} key={id}>
                <VideoThumbnail thumbnailUrl={preview} thumbnailPosition="top" className={trailerPlayerDetail}>
                  <div className={titleWrapper}>
                    <div className={titleTrailer}> {title} </div>
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

export default Trailer

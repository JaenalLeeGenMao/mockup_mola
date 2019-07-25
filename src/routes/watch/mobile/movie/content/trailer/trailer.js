import React from 'react'
const { getComponent } = require('@supersoccer/gandalf')
const VideoThumbnail = getComponent('video-thumbnail')

import LazyLoad from '@components/common/Lazyload'
import Link from '@components/Link'
import { trailerTitle, trailerContainer, trailerWrapper, trailerPlayerDetail, titleTrailer, titleWrapper } from './style'

const Trailer = ({ style = {}, videos = [] }) => {
  return (
    <>
      <div className={trailerTitle}>
        {/* <span className={trailerIcon} /> */}
        Trailers
      </div>
      <LazyLoad containerClassName={trailerContainer}>
        <div className={trailerWrapper} style={style}>
          {videos.map(trailerData => {
            const { id, attributes: { images: { thumbnails: { preview } }, title } } = trailerData
            return (
              <Link to={`/watch?v=${id}`} key={id}>
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

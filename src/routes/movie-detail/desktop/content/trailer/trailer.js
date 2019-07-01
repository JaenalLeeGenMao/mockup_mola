import React from 'react'
const { getComponent } = require('@supersoccer/gandalf')
const VideoThumbnail = getComponent('video-thumbnail')

const LazyLoad = getComponent('lazyload')
import Link from '@components/Link'
import { contentTrailerContainer, contentNoTrailer, trailerContainer, trailerWrapper, trailerInnerWrapper, trailerPlayer, trailerPlayerDetail, titleTrailer, imageWrapper, playIcon } from './style'

const Trailer = ({ data }) => {
  return (
    <>
      {data.length === 0 && (
        <div className={contentTrailerContainer}>
          <LazyLoad>
            <h1 className={contentNoTrailer}>Trailers are not available</h1>
          </LazyLoad>
        </div>
      )}
      {data.length > 0 && (
        <div className={trailerContainer}>
          <div className={trailerWrapper}>
            <div className={trailerInnerWrapper}>
              {data.map(trailerData => {
                const { id, attributes: { images: { thumbnails: { preview } }, title } } = trailerData
                return (
                  <Link to={`/movie-detail/${id}`} key={id} className={trailerPlayer}>
                    <VideoThumbnail thumbnailUrl={preview} thumbnailPosition="wrap" className={trailerPlayerDetail} imgWrapperClassName={imageWrapper}>
                      <div>
                        <span className={playIcon} />
                        <div className={titleTrailer}>
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
      )}
    </>
  )
}

export default Trailer

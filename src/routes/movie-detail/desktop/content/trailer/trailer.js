import React from 'react'
import LazyLoad from '@components/common/Lazyload'
import { contentTrailerContainer, contentNoTrailer } from './style'

const Trailer = ({ data }) => {
  return (
    <div className={contentTrailerContainer}>
      <LazyLoad>
        <h1 className={contentNoTrailer}>Trailers are not available</h1>
      </LazyLoad>
    </div>
  )
}

export default Trailer

import React from 'react'

import MolaLayout from '@components/Molalayout'

import MovieDetailDesktop from './desktop'
import MovieDetailMobile from './mobile'
import Mola from '../../api/mola'

const movieDetailTitle = 'Movie Detail'
const description = 'Movie Details Casters Writers Directors and Sponsors'

async function action({ isMobile, pathname }) {
  const pathnameArr = pathname.split('/')
  const movieId = pathnameArr[2]
  const movieDetail = await Mola.getMovieDetail({ id: movieId })
  const title = movieDetail.data[0].title
  const thumbnail = movieDetail.data[0].images.cover.background.mobile.portrait

  return {
    chunks: ['movie-detail'],
    title: title ? title : movieDetailTitle,
    image: thumbnail,
    description,
    component: isMobile ? (
      <MolaLayout>
        <MovieDetailMobile pathLoc={pathnameArr[1]} movieId={pathnameArr[2]} movieData={movieDetail} />
      </MolaLayout>
    ) : (
      <MolaLayout>
        <MovieDetailDesktop pathLoc={pathnameArr[1]} movieId={pathnameArr[2]} movieData={movieDetail} />
      </MolaLayout>
    ),
  }
}

export default action

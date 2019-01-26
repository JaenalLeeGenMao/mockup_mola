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
  const { data: [{ title, images: { cover: { thumbnail } } }] } = await Mola.getMovieDetail({ id: movieId })

  return {
    chunks: ['movie-detail'],
    title: title ? title : movieDetailTitle,
    image: thumbnail,
    description,
    component: isMobile ? (
      <MolaLayout>
        <MovieDetailMobile pathLoc={pathnameArr[1]} movieId={pathnameArr[2]} />
      </MolaLayout>
    ) : (
      <MolaLayout>
        <MovieDetailDesktop pathLoc={pathnameArr[1]} movieId={pathnameArr[2]} />
      </MolaLayout>
    ),
  }
}

export default action

import React from 'react'

import MolaLayout from '@components/Molalayout'

import MovieDetailDesktop from './desktop'
import MovieDetailMobile from './mobile'

import Mola from '@api/mola'

async function action({ isMobile, pathname }) {
  const pathnameArr = pathname.split('/'),
    id = pathnameArr[2]

  const details = await Mola.getMovieDetail({ id }),
    isFetched = details.data.length > 0,
    title = isFetched ? details.data[0].title : 'Movie Detail',
    description = isFetched ? details.data[0].description : 'Movie Details Casters Writers Directors and Sponsors',
    image = isFetched ? details.data[0].images.cover.background.desktop.landscape : '',
    url = pathname

  return {
    chunks: ['movie-detail'],
    title,
    description,
    image,
    url,
    component: isMobile ? (
      <MolaLayout>
        <MovieDetailMobile pathLoc={pathnameArr[1]} movieId={id} />
      </MolaLayout>
    ) : (
      <MolaLayout>
        <MovieDetailDesktop pathLoc={pathnameArr[1]} movieId={id} />
      </MolaLayout>
    ),
  }
}

export default action

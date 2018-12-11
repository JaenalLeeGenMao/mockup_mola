import React from 'react'

import MolaLayout from '@components/Molalayout'

import MovieDetailDesktop from './desktop'
import MovieDetailMobile from './mobile'

const title = 'Movie Detail'
const description = 'Movie Details Casters Writers Directors and Sponsors'

function action({ isMobile, pathname }) {
  const pathnameArr = pathname.split('/')
  return {
    chunks: ['movie-detail'],
    title,
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

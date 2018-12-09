import React from 'react'
import MovieLibrary from './Library'

const title = 'Movie Library'
const description = "List of all movies you've desired"

function action({ isMobile, pathname }) {
  const pathnameArr = pathname.split('/')
  return {
    chunks: ['movie-library'],
    title,
    description,
    component: <MovieLibrary isMobile={isMobile} genreId={pathnameArr[2]} />,
  }
}

export default action

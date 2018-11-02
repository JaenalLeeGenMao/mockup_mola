import React from 'react';
import MovieLibrary from './Library';

const title = 'Movie Library';

function action({ isMobile, pathname }) {
  const pathnameArr = pathname.split('/');
  return {
    chunks: ['movie-library'],
    title,
    component: <MovieLibrary isMobile={isMobile} genreId={pathnameArr[2]} />
  };
}

export default action;

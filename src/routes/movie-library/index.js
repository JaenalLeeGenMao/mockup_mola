import React from 'react';
import MovieLibrary from './Library';

const title = 'Movie Library';

function action({ isMobile, pathname }) {
  const pathnameArr = pathname.split('/');
  return {
    chunks: ['admin'],
    title,
    component: <MovieLibrary isMobile={isMobile} genreId={pathnameArr[2]} />
  };
}

export default action;

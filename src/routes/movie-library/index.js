import React from 'react';
import MovieLibrary from './Library';

const title = 'Movie Library';

function action({ isMobile }) {
  return {
    // chunks: ['admin'],
    title,
    component: <MovieLibrary title={title} isMobile={isMobile} />,
  };
}

export default action;

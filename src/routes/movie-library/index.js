import React from 'react';
import MovieLibrary from './Library';

const title = 'Movie Detail';

function action() {
  return {
    // chunks: ['admin'],
    title,
    component: <MovieLibrary />,
  };
}

export default action;

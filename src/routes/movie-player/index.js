import React from 'react';
import Movieplayer from './movie-player';

const title = 'History';

function action({ pathname }) {
  const pathnameArr = pathname.split("/");
  return {
    chunks: ['movie-player'],
    title,
    component: (
      <Movieplayer movieId={pathnameArr[2]}/>
    ),
  };
}

export default action;

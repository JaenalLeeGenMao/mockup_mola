import React from 'react';
import Movieplayer from './movie-player';
import MolaLayout from '@components/Molalayout';
const title = 'Videos';

function action({ isMobile, pathname }) {
  const pathnameArr = pathname.split('/');
  return {
    chunks: ['movie-player'],
    title,
    component: (
      <MolaLayout>
        <Movieplayer movieId={pathnameArr[2]} isMobile={isMobile} />
      </MolaLayout>
    )
  };
}

export default action;

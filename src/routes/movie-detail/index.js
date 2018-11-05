import React from 'react';
import Moviedetail from './Moviedetail';
import Mobile from './mobile';

const title = 'Movie Detail';

function action({ isMobile, pathname }) {
  const pathnameArr = pathname.split('/');
  console.log('path', pathname);
  return {
    chunks: ['movie-detail'],
    title,
    // component: <Moviedetail />,
    component: isMobile ? <Mobile pathLoc={pathnameArr[1]} movieId={pathnameArr[2]} /> : <Moviedetail pathLoc={pathnameArr[1]} movieId={pathnameArr[2]} />
  };
}

export default action;

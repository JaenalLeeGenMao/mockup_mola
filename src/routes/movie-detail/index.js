import React from 'react';
import Moviedetail from './Moviedetail';
import Mobile from './mobile';

const title = 'Movie Detail';

function action({ isMobile, pathname }) {
  const pathnameArr = pathname.split("/");
  return {
    // chunks: ['admin'],
    title,
    // component: <Moviedetail />,
    component: isMobile ? <Mobile movieId={pathnameArr[2]} /> : <Moviedetail movieId={pathnameArr[2]} />,
  };
}

export default action;

import React from 'react';
import Moviedetail from './Moviedetail';
import MolaLayout from '@components/Molalayout';
import Mobile from './mobile';

const title = 'Movie Detail';

function action({ isMobile, pathname }) {
  const pathnameArr = pathname.split('/');
  console.log('path', pathname);
  return {
    chunks: ['movie-detail'],
    title,
    // component: <Moviedetail />,
    component: (
      // isMobile ?
      // <MolaLayout><Mobile pathLoc={pathnameArr[1]} movieId={pathnameArr[2]} /></MolaLayout> :
      <MolaLayout>
        <Moviedetail pathLoc={pathnameArr[1]} movieId={pathnameArr[2]} />
      </MolaLayout>
    )
  };
}

export default action;

import React from 'react';
import Moviedetail from './Moviedetail';
import Mobile from './mobile';

const title = 'Movie Detail';

function action({ isMobile }) {
  return {
    // chunks: ['admin'],
    title,
    // component: <Moviedetail />,
    component: isMobile ? <Mobile /> : <Moviedetail />,
  };
}

export default action;

import React from 'react';
import Moviedetail from './Moviedetail';

const title = 'Movie Detail';

function action() {
  return {
    // chunks: ['admin'],
    title,
    component: <Moviedetail />,
  };
}

export default action;

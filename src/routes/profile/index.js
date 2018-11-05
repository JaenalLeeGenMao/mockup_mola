import React from 'react';
import Container from './container';

import MolaLayout from '@components/Molalayout';

const title = 'Profile';
function action({ isMobile }) {
  return {
    chunks: ['profile'],
    title,
    component: (
      <MolaLayout>
        <Container isMobile={isMobile} />
      </MolaLayout>
    )
  };
}

export default action;

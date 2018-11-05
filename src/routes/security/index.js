import React from 'react';
import Container from './container';

import MolaLayout from '@components/Molalayout';

const title = 'Security';
function action({ isMobile }) {
  return {
    chunks: ['security'],
    title,
    component: (
      <MolaLayout>
        <Container isMobile={isMobile} />
      </MolaLayout>
    )
  };
}

export default action;

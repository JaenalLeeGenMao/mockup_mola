import React from 'react';
import Container from './container';

import MolaLayout from '@components/Molalayout';

const title = 'Setting';
function action({ isMobile }) {
  return {
    chunks: ['setting'],
    title,
    component: (
      <MolaLayout>
        <Container isMobile={isMobile} />
      </MolaLayout>
    )
  };
}

export default action;

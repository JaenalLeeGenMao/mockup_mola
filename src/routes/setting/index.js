import React from 'react';
import Container from './container';

import Layout from '@components/Layout';

const title = 'Setting';
function action({ isMobile }) {
  return {
    chunks: ['setting'],
    title,
    component: (
      <Layout>
        <Container isMobile={isMobile} />
      </Layout>
    )
  };
}

export default action;
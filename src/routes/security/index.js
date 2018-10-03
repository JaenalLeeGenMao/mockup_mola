import React from 'react';
import Container from './container';

import Layout from '@components/Layout';

const title = 'Security';
function action({ isMobile }) {
  return {
    chunks: ['accounts-security'],
    title,
    component: (
      <Layout>
        <Container isMobile={isMobile} />
      </Layout>
    )
  };
}

export default action;

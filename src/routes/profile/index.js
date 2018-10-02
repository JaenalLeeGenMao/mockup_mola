import React from 'react';
import Container from './container';

import Layout from '@components/Layout';

const title = 'Profile';
function action({ isMobile }) {
  return {
    chunks: ['accounts-profile'],
    title,
    component: (
      <Layout>
        <Container isMobile={isMobile} />
      </Layout>
    )
  };
}

export default action;

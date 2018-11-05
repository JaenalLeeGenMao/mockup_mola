import React from 'react';
import Layout from '../../components/Layout';
import History from './History';

const title = 'History';

function action({ isMobile }) {
  return {
    chunks: ['history'],
    title,
    component: (
      <Layout>
        <History isMobile={isMobile}/>
      </Layout>
    ),
  };
}

export default action;

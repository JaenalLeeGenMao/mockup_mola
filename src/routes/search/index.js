import React from 'react';
import Layout from '../../components/Layout';
import Search from './Search';

const title = 'Search';

function action() {
  return {
    chunks: ['search'],
    title,
    component: (
      <Layout>
        <Search title={title} />
      </Layout>
    ),
  };
}

export default action;
